import type { Tool } from "../types/Tool";

import {
  RecommendationAction,
  type Recommendation,
} from "../types/Recommendation";

//apply changes
export default function applyRecommendations(
  stack: Tool[],
  recommendations: Recommendation[]
) {

  let optimizedStack =
    JSON.parse(JSON.stringify(stack));

  //apply actions
  recommendations.forEach((rec) => {
    const action = rec.action;

    //remove tools
    if (
      action.type === RecommendationAction.CANCEL ||
      action.type === RecommendationAction.CONSOLIDATE
    ) {

      optimizedStack = optimizedStack.filter(
        (tool: Tool) =>
          !action.targetIds?.includes(tool.id)
      );
    }

    //reduce seats
    if (action.type === RecommendationAction.REDUCE_SEATS) {

      optimizedStack = optimizedStack.map((tool: Tool) => {

        if (tool.name === action.tool) {
          return { ...tool, seats: Math.max(1, tool.seats - (action.seatsToRemove || 0)) };
        }

        return tool;
      });
    }

    //downgrade plan
    if (action.type === RecommendationAction.DOWNGRADE) {

      optimizedStack = optimizedStack.map((tool: Tool) => {

        if (tool.name === action.tool) {
          return { ...tool, plan: action.toPlan, pricePerSeat: action.recommendedPrice || tool.pricePerSeat };
        }

        return tool;
      });
    }
  });

  return optimizedStack;
}