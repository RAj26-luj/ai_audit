import type { AuditRule } from "../types/AuditRule";
import type { Recommendation } from "../types/Recommendation";
import type { AuditInput } from "../types/AuditInput";

import {
  RecommendationAction,
} from "../types/Recommendation";

import isDevTool from "../helpers/isDevTool";

//seat check
export default class SeatUtilizationRule
  implements AuditRule {

  id = "seat-utilization";

 //run rule
  evaluate(
    input: AuditInput
  ): Recommendation[] {

    const recs: Recommendation[] = [];

    //check tools
    for (const tool of input.stack) {

      const logicalSeats =
        isDevTool(tool.name)
          ? input.engineeringTeamSize
          : input.teamSize;

      //extra seats
      if ((tool.seats || 0) > logicalSeats) {

        const excessSeats =
          (tool.seats || 0) - logicalSeats;

        const savings =
          excessSeats *
          (tool.pricePerSeat || 0);

        //add recommendation
        recs.push({
          id: `${this.id}-${tool.id}`,

          title:
            `Reduce unused ${tool.name} seats`,

          description:
            `Your company has ${logicalSeats} likely active users but is paying for ${tool.seats} seats.`,

          savings,
          confidenceScore: 0.96,
          productivityRisk: "Low",

          action: {
            type:
              RecommendationAction.REDUCE_SEATS,

            tool: tool.name,
            seatsToRemove:
              excessSeats,
          },
        });
      }
    }

    return recs;
  }
}