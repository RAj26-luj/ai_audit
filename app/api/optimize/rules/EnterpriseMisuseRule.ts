import type { AuditRule } from "../types/AuditRule";
import type { Recommendation } from "../types/Recommendation";
import type { AuditInput } from "../types/AuditInput";

import {
  RecommendationAction,
} from "../types/Recommendation";

//enterprise check
export default class EnterpriseMisuseRule
  implements AuditRule {

  id = "enterprise-misuse";

 //run rule
  evaluate(
    input: AuditInput
  ): Recommendation[] {

    const recs: Recommendation[] = [];

    //check tools
    for (const tool of input.stack) {

      const isEnterprise =
        tool.plan.toLowerCase() ===
        "enterprise";

      if (!isEnterprise) {
        continue;
      }

      //small teams
      if (tool.seats <= 20) {

        let downgradePlan = "Team";
        let recommendedPrice = 30;

        //chatgpt pricing
        if (tool.name === "ChatGPT") {
          downgradePlan = "Team";
          recommendedPrice = 25;
        }

       //cursor pricing
        if (tool.name === "Cursor") {
          downgradePlan = "Business";
          recommendedPrice = 40;
        }

        //claude pricing
        if (tool.name === "Claude") {
          downgradePlan = "Team";
          recommendedPrice = 30;
        }

        //calc savings
        const savings =
          (
            tool.pricePerSeat -
            recommendedPrice
          ) * tool.seats;

        if (savings <= 0) {
          continue;
        }

        //add recommendation
        recs.push({
          id: `${this.id}-${tool.id}`,

          title:
            `Downgrade ${tool.name} Enterprise`,

          description:
            `Enterprise plans usually make sense for larger organizations needing advanced compliance or procurement workflows.`,

          savings,
          confidenceScore: 0.88,
          productivityRisk: "Medium",

          action: {
            type: RecommendationAction.DOWNGRADE,
            tool: tool.name,
            toPlan: downgradePlan,
            recommendedPrice,
          },
        });
      }
    }

    return recs;
  }
}