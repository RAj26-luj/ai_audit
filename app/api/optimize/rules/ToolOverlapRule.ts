import type { AuditRule } from "../types/AuditRule";
import type { Recommendation } from "../types/Recommendation";
import type { AuditInput } from "../types/AuditInput";

import {
  RecommendationAction,
} from "../types/Recommendation";

//overlap check
export default class ToolOverlapRule
  implements AuditRule {

  id = "tool-overlap";

 //run rule
  evaluate(
    input: AuditInput
  ): Recommendation[] {

    const recs: Recommendation[] = [];

    //coding tools
    const hasCursor =
      input.stack.some(
        (t) => t.name === "Cursor"
      );

    const hasCopilot =
      input.stack.some(
        (t) =>
          t.name === "GitHub Copilot"
      );

    //cursor + copilot
    if (hasCursor && hasCopilot) {

      const copilot =
        input.stack.find(
          (t) =>
            t.name === "GitHub Copilot"
        );

      if (copilot) {

        recs.push({
          id:
            `${this.id}-cursor-copilot`,

          title:
            "Consolidate AI coding assistants",

          description:
            `Cursor and GitHub Copilot overlap heavily for autocomplete and code generation workflows.`,

          savings:
            copilot.pricePerSeat *
            copilot.seats,

          confidenceScore: 0.84,
          productivityRisk: "Medium",

          action: {
            type:
              RecommendationAction.CONSOLIDATE,

            targetIds: [copilot.id],
          },
        });
      }
    }

    //chat tools
    const chatTools =
      input.stack.filter(
        (t) =>
          [
            "ChatGPT",
            "Claude",
            "Gemini",
          ].includes(t.name)
      );

    //too many llms
    if (chatTools.length >= 3) {

      const sorted =
        [...chatTools].sort(
          (a, b) =>
            a.pricePerSeat * a.seats -
            b.pricePerSeat * b.seats
        );

      const cheapest = sorted[0];

      recs.push({
        id:
          `${this.id}-chat-stack`,

        title:
          "Reduce overlapping premium LLM subscriptions",

        description:
          `Multiple premium chatbot subscriptions were detected.`,

        savings:
          cheapest.pricePerSeat *
          cheapest.seats,

          confidenceScore: 0.8,
         productivityRisk: "Low",

        action: {
          type:
            RecommendationAction.CONSOLIDATE,

          targetIds: [cheapest.id],
        },
      });
    }

    return recs;
  }
}