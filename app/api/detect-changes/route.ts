import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

import { sendAuditEmail }
from "@/lib/email/sendAuditEmail";

import {
  getSimulatedVersion
} from "../simulate-price-change/route";

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

import applyRecommendations
from "../optimize/utils/applyRecommendations";

import calcMonthlySpend
from "../optimize/helpers/calcMonthlySpend";

export async function POST() {

  try {

    const { data: audits, error } =
      await supabase
        .from("audits")
        .select("*");

    if (error) {
      throw error;
    }

    const changedAudits = [];

    for (const audit of audits || []) {

      if (
        audit.pricing_version !==
        getSimulatedVersion()
      ) {

        //original stack
        const stack =
          audit.input_json?.tools ||
          audit.input_json?.stack ||
          [];

        const teamSize =
          audit.input_json?.teamSize ||
          1;

        const engineeringTeamSize =
          audit.input_json
            ?.engineeringTeamSize ||
          Math.max(
            1,
            Math.floor(teamSize * 0.4)
          );

        const primaryUseCase =
          audit.input_json
            ?.primaryUseCase ||
          "General";

        //rerun audit engine
        const engine =
          new AIAuditEngine([
            new SeatUtilizationRule(),
            new EnterpriseMisuseRule(),
            new ToolOverlapRule(),
            new PlanDowngradeRule(),
          ]);

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

        //spend calculations
        const originalSpend =
          calcMonthlySpend(stack);

        const optimizedSpend =
          calcMonthlySpend(
            optimizedStack
          );

        const updatedResult = {

          originalStack:
            stack,

          optimizedStack,

          originalSpend,

          optimizedSpend,

          monthlySavings:
            originalSpend -
            optimizedSpend,

          yearlySavings:
            (
              originalSpend -
              optimizedSpend
            ) * 12,

          recommendations,
        };

        //save updated result
        await supabase
          .from("audits")
          .update({

            updated_result_json:
              updatedResult,

            pricing_version:
              getSimulatedVersion(),

          })
          .eq("id", audit.id);

        //send email
        if (audit.email) {

          await sendAuditEmail({
            to: audit.email,
            auditId: audit.id,
          });
        }

        changedAudits.push({
          auditId: audit.id,
          email: audit.email,
        });
      }
    }

    return NextResponse.json({
      success: true,
      changedAudits,
      total:
        changedAudits.length,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        error:
          "detect changes failed",
      },
      {
        status: 500,
      }
    );
  }
}