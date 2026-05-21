import { NextResponse } from "next/server";

import AIAuditEngine from "./engine/AIAuditEngine";

import calcMonthlySpend
from "./helpers/calcMonthlySpend";

import calculateOptimizationScore
from "./engine/calculateOptimizationScore";

import calculateRisk
from "./utils/calculateRisk";

import calculateBenchmarks
from "./utils/calculateBenchmarks";

import applyRecommendations
from "./utils/applyRecommendations";

import SeatUtilizationRule
from "./rules/SeatUtilizationRule";

import EnterpriseMisuseRule
from "./rules/EnterpriseMisuseRule";

import ToolOverlapRule
from "./rules/ToolOverlapRule";

import PlanDowngradeRule
from "./rules/PlanDowngradeRule";

import type { Tool }
from "./types/Tool";

import type { ProductivityRisk }
from "./types/Recommendation";

import { saveAudit }
from "@/lib/db/saveAudit";

import { TOOLS_CONFIG }
from "@/data/tools";

//audit route
export async function POST(
  req: Request
){

  try{

    //request body
    const body =
      await req.json();

    //support both stack and tools
    const rawStack =
  body.stack ||
  body.tools ||
  [];

const stack: Tool[] =
  rawStack.map((tool:any)=>({

    id:
      tool.id ||
      tool.name,

    name:
      tool.name,

    plan:
      tool.plan,

    seats:
      tool.seats || 1,

    monthlyPrice:
      tool.monthlyPrice || 0,

    monthlyCost:
      tool.monthlyCost ||
      tool.monthlyPrice ||
      0,

    pricePerSeat:
      tool.pricePerSeat ||
      tool.monthlyPrice ||
      0,
  }));
    const teamSize =
      body.teamSize || 1;

    //engineering size
    const engineeringTeamSize =
      body.engineeringTeamSize ||
      Math.max(
        1,
        Math.floor(teamSize * 0.4)
      );

    const primaryUseCase =
      body.primaryUseCase ||
      "General";

    //backup stack
    const originalStack =
      JSON.parse(
        JSON.stringify(stack)
      );

    //current spend
    const originalSpend =
      calcMonthlySpend(stack);

    //audit engine
    const engine =
      new AIAuditEngine([
        new SeatUtilizationRule(),
        new EnterpriseMisuseRule(),
        new ToolOverlapRule(),
        new PlanDowngradeRule(),
      ]);

    //run audit
    const recommendations =
      engine.run({
        stack,
        teamSize,
        engineeringTeamSize,
        primaryUseCase,
      });

    //apply changes
    const optimizedStack =
      applyRecommendations(
        stack,
        recommendations
      );

    //final spend
    const optimizedSpend =
      calcMonthlySpend(
        optimizedStack
      );

    //savings
    const monthlySavings =
      originalSpend -
      optimizedSpend;

    const yearlySavings =
      monthlySavings * 12;

    const savingsPercentage =
      originalSpend > 0
        ? Math.round(
            (
              monthlySavings /
              originalSpend
            ) * 100
          )
        : 0;

    //audit score
    const optimizationScore =
      calculateOptimizationScore({
        originalSpend,
        savings:
          monthlySavings,
        recommendations,
      });

    //risk level
    const productivityRisk:
      ProductivityRisk =
        calculateRisk(
          recommendations
        );

    //benchmarks
    const benchmarks =
      calculateBenchmarks({
        originalSpend,
        teamSize,
        engineeringTeamSize,
      });

    //save audit
    const auditRecord =
      await saveAudit({

        email:
          body.email ||
          "demo@stackaudit.dev",

        inputJson:body,

        resultJson:{
          originalStack,
          optimizedStack,
          originalSpend,
          optimizedSpend,
          monthlySavings,
          yearlySavings,
          savingsPercentage,
          optimizationScore,
          productivityRisk,
          recommendations,
          benchmarks,
        },

        pricingSnapshot:
          JSON.parse(
            JSON.stringify(
              TOOLS_CONFIG
            )
          ),

        pricingVersion:1,
      });

    //response
    return NextResponse.json({
      originalStack,
      optimizedStack,

      originalSpend,
      optimizedSpend,

      monthlySavings,
      yearlySavings,

      savingsPercentage,

      optimizationScore,

      productivityRisk,

      recommendations,

      benchmarks,

      auditId:
        auditRecord?.id,
    });

  }catch(err){

    console.error(err);

    return NextResponse.json(
      {
        error:
          "Optimization failed",
      },
      {
        status:500,
      }
    );
  }
}