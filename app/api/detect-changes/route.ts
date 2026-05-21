import { NextResponse } from "next/server";

import { supabase }
from "@/lib/supabase";

import { TOOLS_CONFIG }
from "@/data/tools";

import { sendAuditEmail }
from "@/lib/email/sendAuditEmail";

import AIAuditEngine
from "../optimize/engine/AIAuditEngine";

import SeatUtilizationRule
from "../optimize/rules/SeatUtilizationRule";

import EnterpriseMisuseRule
from "../optimize/rules/EnterpriseMisuseRule";

import ToolOverlapRule
from "../optimize/rules/ToolOverlapRule";

import PlanDowngradeRule
from "../optimize/rules/PlanDowngradeRule";

import calcMonthlySpend
from "../optimize/helpers/calcMonthlySpend";

import calculateOptimizationScore
from "../optimize/engine/calculateOptimizationScore";

import calculateRisk
from "../optimize/utils/calculateRisk";

import calculateBenchmarks
from "../optimize/utils/calculateBenchmarks";

import applyRecommendations
from "../optimize/utils/applyRecommendations";

import { getSimulatedVersion }
from "../simulate-price-change/route";

export async function POST(){

  try{

    const { data:audits,error } =
      await supabase
        .from("audits")
        .select("*");

    if(error){
      throw error;
    }

    const changedAudits = [];

    for(const audit of audits || []){

      //real snapshot diff
      if(

        JSON.stringify(
          audit.pricing_snapshot
        ) !==
        JSON.stringify(
          TOOLS_CONFIG
        )

      ){

        const stack =
          audit.input_json?.tools ||
          audit.input_json?.stack ||
          [];

        const teamSize =
          audit.input_json?.teamSize || 1;

        const engineeringTeamSize =
          audit.input_json
            ?.engineeringTeamSize ||

          Math.max(
            1,
            Math.floor(
              teamSize * 0.4
            )
          );

        const primaryUseCase =
          audit.input_json
            ?.primaryUseCase ||

          "General";

        //audit engine
        const engine =
          new AIAuditEngine([
            new SeatUtilizationRule(),
            new EnterpriseMisuseRule(),
            new ToolOverlapRule(),
            new PlanDowngradeRule(),
          ]);

        //recommendations
        const recommendations =
          engine.run({
            stack,
            teamSize,
            engineeringTeamSize,
            primaryUseCase,
          });

        //optimized stack
        const optimizedStack =
          applyRecommendations(
            stack,
            recommendations
          );

        //spend
        const originalSpend =
          calcMonthlySpend(
            stack
          );

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

        //score
        const optimizationScore =
          calculateOptimizationScore({

            originalSpend,

            savings:
              monthlySavings,

            recommendations,
          });

        //risk
        const productivityRisk =
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

        //updated result
        const updatedResult = {

          originalStack:
            stack,

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
        };

        //update audit
        await supabase
          .from("audits")
          .update({

            updated_result_json:
              updatedResult,

            pricing_snapshot:
              JSON.parse(
                JSON.stringify(
                  TOOLS_CONFIG
                )
              ),

            pricing_version:
              getSimulatedVersion(),
          })
          .eq(
            "id",
            audit.id
          );

        //send email
        if(audit.email){

          await sendAuditEmail({

            to:
              audit.email,

            auditId:
              audit.id,
          });
        }

        changedAudits.push({

          auditId:
            audit.id,

          email:
            audit.email,
        });
      }
    }

    return NextResponse.json({

      success:true,

      changedAudits,

      total:
        changedAudits.length,
    });

  }catch(err){

    console.error(err);

    return NextResponse.json(
      {
        error:
          "detect changes failed",
      },
      {
        status:500,
      }
    );
  }
}