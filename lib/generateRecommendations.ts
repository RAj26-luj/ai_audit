import type {
  ToolSelection,
  Recommendation,
} from "./audit";

export function generateRecommendations(
  tools: ToolSelection[]
): Recommendation[] {

  const recommendations:
    Recommendation[] = [];

  const hasCursor =
    tools.some(
      (t) =>
        t.name ===
        "Cursor"
    );

  tools.forEach(
    (tool, index) => {

      // REMOVE COPILOT IF CURSOR EXISTS

      if (
        tool.name ===
          "GitHub Copilot" &&
        hasCursor
      ) {

        recommendations.push({

          id:
            `rec-remove-${index}`,

          title:
            "Remove GitHub Copilot",

          description:
            "Cursor already overlaps heavily with Copilot workflows and functionality.",

          impact:
            "High",

          savings:
            tool.pricePerSeat *
            tool.seats,

          action: {

            type:
              "remove_tool",

            tool:
              tool.name,
          },
        });
      }

      // CURSOR BUSINESS -> PRO

      if (
        tool.name ===
          "Cursor" &&
        tool.plan ===
          "Business"
      ) {

        const recommendedPrice =
          20;

        const savings =
          (
            tool.pricePerSeat -
            recommendedPrice
          ) *
          tool.seats;

        if (
          savings > 0
        ) {

          recommendations.push({

            id:
              `rec-cursor-${index}`,

            title:
              "Downgrade Cursor Plan",

            description:
              "Cursor Pro provides similar value for smaller engineering teams.",

            impact:
              "Medium",

            savings,

            action: {

              type:
                "downgrade_plan",

              tool:
                tool.name,

              currentPlan:
                tool.plan,

              currentPrice:
                tool.pricePerSeat,

              toPlan:
                "Pro",

              recommendedPrice,
            },
          });
        }
      }

      // CHATGPT TEAM -> PLUS

      if (
        tool.name ===
          "ChatGPT" &&
        tool.plan ===
          "Team"
      ) {

        const recommendedPrice =
          20;

        const savings =
          (
            tool.pricePerSeat -
            recommendedPrice
          ) *
          tool.seats;

        if (
          savings > 0
        ) {

          recommendations.push({

            id:
              `rec-chatgpt-${index}`,

            title:
              "Downgrade ChatGPT Team",

            description:
              "Most smaller teams underutilize collaboration features.",

            impact:
              "Medium",

            savings,

            action: {

              type:
                "downgrade_plan",

              tool:
                tool.name,

              currentPlan:
                tool.plan,

              currentPrice:
                tool.pricePerSeat,

              toPlan:
                "Plus",

              recommendedPrice,
            },
          });
        }
      }

      // CLAUDE MAX -> PRO

      if (
        tool.name ===
          "Claude" &&
        tool.plan ===
          "Max"
      ) {

        const recommendedPrice =
          20;

        const savings =
          (
            tool.pricePerSeat -
            recommendedPrice
          ) *
          tool.seats;

        if (
          savings > 0
        ) {

          recommendations.push({

            id:
              `rec-claude-${index}`,

            title:
              "Downgrade Claude Max",

            description:
              "Claude Pro is sufficient for most standard workflows.",

            impact:
              "Medium",

            savings,

            action: {

              type:
                "downgrade_plan",

              tool:
                tool.name,

              currentPlan:
                tool.plan,

              currentPrice:
                tool.pricePerSeat,

              toPlan:
                "Pro",

              recommendedPrice,
            },
          });
        }
      }

      // SEAT REDUCTION

      if (
        tool.seats >= 5
      ) {

        const removable =
          Math.max(
            1,
            Math.floor(
              tool.seats * 0.2
            )
          );

        const savings =
          removable *
          tool.pricePerSeat;

        recommendations.push({

          id:
            `rec-seat-${index}`,

          title:
            `Reduce ${tool.name} Seats`,

          description:
            "Potential inactive or unused licenses detected.",

          impact:
            "Low",

          savings,

          action: {

            type:
              "reduce_seats",

            tool:
              tool.name,

            currentSeats:
              tool.seats,

            seatsToRemove:
              removable,

            maxSeatsReducible:
              Math.max(
                removable * 2,
                1
              ),
          },
        });
      }
    }
  );

  return recommendations;
}