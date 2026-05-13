import type { AuditRule } from "../types/AuditRule";
import type { Recommendation } from "../types/Recommendation";
import type { AuditInput } from "../types/AuditInput";

import {
  RecommendationAction,
} from "../types/Recommendation";

//plan downgrade
export default class PlanDowngradeRule
  implements AuditRule {

  id = "plan-downgrade";

 //run rule
  evaluate(
    input: AuditInput
  ): Recommendation[] {

    const recs: Recommendation[] = [];

    //check tools
    for (const tool of input.stack) {

      //cursor downgrade
      if (
        tool.name === "Cursor" &&
        tool.plan === "Business" &&
        tool.seats <= 10
      ) {

        recs.push({
          id: `${this.id}-${tool.id}`,

          title:
            "Downgrade Cursor Business",

          description:
            `Cursor Pro provides similar productivity for smaller engineering teams.`,

          savings:
            (tool.pricePerSeat - 20) *
            tool.seats,

          confidenceScore: 0.9,
          productivityRisk: "Low",

          action: {
            type: RecommendationAction.DOWNGRADE,
            tool: tool.name,
            toPlan: "Pro",
            recommendedPrice: 20,
          },
        });
      }

      //claude downgrade
      if (
        tool.name === "Claude" &&
        tool.plan === "Max"
      ) {

        recs.push({
          id: `${this.id}-${tool.id}`,

          title:
            "Downgrade Claude Max",

          description:
            `Claude Pro is sufficient for most startup workflows.`,

          savings:
            (tool.pricePerSeat - 20) *
            tool.seats,

          confidenceScore: 0.83,
          productivityRisk: "Medium",

          action: {
            type: RecommendationAction.DOWNGRADE,
            tool: tool.name,
            toPlan: "Pro",
            recommendedPrice: 20,
          },
        });
      }
    }

    return recs;
  }
}