import { NextResponse } from "next/server";

import {
  TOOLS_CONFIG,
} from "@/data/tools";

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();

    const stack =
      body.stack || [];

    const enabledRecommendations =
      body.enabledRecommendations || [];

    // ORIGINAL USER STACK

    const originalStack =
      JSON.parse(
        JSON.stringify(stack)
      );

    // FINAL STACK
    // THIS WILL CHANGE ONLY
    // AFTER ENABLED RECOMMENDATIONS

    let optimizedStack =
      JSON.parse(
        JSON.stringify(stack)
      );

    const recommendations:
      any[] = [];

    const warnings:
      string[] = [];

    // ORIGINAL SPEND

    const originalSpend =
      stack.reduce(
        (
          acc: number,
          tool: any
        ) => {

          return (
            acc +
            tool.pricePerSeat *
            tool.seats
          );

        },
        0
      );

    // =========================
    // GENERATE RECOMMENDATIONS
    // =========================

    stack.forEach(
      (tool: any) => {

        const db =
          TOOLS_CONFIG.find(
            (t) =>
              t.name === tool.name
          );

        if (!db) {
          return;
        }

        // CURSOR

        if (
          tool.name === "Cursor" &&
          tool.plan === "Business"
        ) {

          recommendations.push({

            id:
              `cursor-plan-${tool.id}`,

            title:
              "Downgrade Cursor",

            description:
              "Cursor Pro gives similar productivity for most teams.",

            savings:
              (
                tool.pricePerSeat -
                20
              ) * tool.seats,

            productivityRisk:
              "Low",

            action: {

              type:
                "downgrade_plan",

              tool:
                tool.name,

              toPlan:
                "Pro",

              recommendedPrice:
                20,
            },
          });
        }

        // CHATGPT

        if (
          tool.name === "ChatGPT" &&
          tool.plan === "Enterprise"
        ) {

          recommendations.push({

            id:
              `chatgpt-plan-${tool.id}`,

            title:
              "Downgrade ChatGPT",

            description:
              "Team plan is enough for most companies.",

            savings:
              (
                tool.pricePerSeat -
                25
              ) * tool.seats,

            productivityRisk:
              "Low",

            action: {

              type:
                "downgrade_plan",

              tool:
                tool.name,

              toPlan:
                "Team",

              recommendedPrice:
                25,
            },
          });
        }

        // CLAUDE

        if (
          tool.name === "Claude" &&
          tool.plan === "Max"
        ) {

          recommendations.push({

            id:
              `claude-plan-${tool.id}`,

            title:
              "Downgrade Claude",

            description:
              "Claude Pro is enough for normal workflows.",

            savings:
              (
                tool.pricePerSeat -
                20
              ) * tool.seats,

            productivityRisk:
              "Medium",

            action: {

              type:
                "downgrade_plan",

              tool:
                tool.name,

              toPlan:
                "Pro",

              recommendedPrice:
                20,
            },
          });
        }

        // SEATS

        if (
          tool.seats >= 10
        ) {

          recommendations.push({

            id:
              `seats-${tool.id}`,

            title:
              `Reduce ${tool.name} Seats`,

            description:
              "Unused licenses detected.",

            savings:
              tool.pricePerSeat * 2,

            productivityRisk:
              tool.seats >= 100
                ? "High"
                : tool.seats >= 25
                ? "Medium"
                : "Low",

            action: {

              type:
                "reduce_seats",

              tool:
                tool.name,

              seatsToRemove:
                tool.seats >= 100
                  ? 15
                  : tool.seats >= 25
                  ? 5
                  : 2,
            },
          });
        }

      }
    );

    // OVERLAP

    const hasCursor =
      stack.some(
        (t: any) =>
          t.name === "Cursor"
      );

    const hasCopilot =
      stack.some(
        (t: any) =>
          t.name ===
          "GitHub Copilot"
      );

    if (
      hasCursor &&
      hasCopilot
    ) {

      const copilot =
        stack.find(
          (t: any) =>
            t.name ===
            "GitHub Copilot"
        );

      recommendations.push({

        id:
          "remove-copilot",

        title:
          "Remove GitHub Copilot",

        description:
          "Cursor overlaps heavily with Copilot.",

        savings:
          copilot.pricePerSeat *
          copilot.seats,

        productivityRisk:
          "Medium",

        action: {

          type:
            "remove_tool",

          tool:
            "GitHub Copilot",
        },
      });
    }

    // =========================
    // APPLY ENABLED RECOMMENDATIONS
    // =========================

    recommendations.forEach(
      (rec: any) => {

        const active =
          enabledRecommendations.includes(
            rec.id
          );

        if (!active) {
          return;
        }

        const action =
          rec.action;

        if (!action) {
          return;
        }

        // REMOVE TOOL

        if (
          action.type ===
          "remove_tool"
        ) {

          optimizedStack =
            optimizedStack.filter(
              (t: any) =>
                t.name !==
                action.tool
            );
        }

        // REDUCE SEATS

        if (
          action.type ===
          "reduce_seats"
        ) {

          optimizedStack =
            optimizedStack.map(
              (t: any) => {

                if (
                  t.name ===
                  action.tool
                ) {

                  return {

                    ...t,

                    seats:
                      Math.max(
                        1,
                        t.seats -
                        (
                          action.seatsToRemove || 0
                        )
                      ),
                  };
                }

                return t;
              }
            );
        }

        // DOWNGRADE PLAN

        if (
          action.type ===
          "downgrade_plan"
        ) {

          optimizedStack =
            optimizedStack.map(
              (t: any) => {

                if (
                  t.name ===
                  action.tool
                ) {

                  return {

                    ...t,

                    plan:
                      action.toPlan,

                    pricePerSeat:
                      action.recommendedPrice,
                  };
                }

                return t;
              }
            );
        }

      }
    );

    // =========================
    // FINAL CALCULATIONS
    // =========================

    const optimizedSpend =
      optimizedStack.reduce(
        (
          acc: number,
          tool: any
        ) => {

          return (
            acc +
            tool.pricePerSeat *
            tool.seats
          );

        },
        0
      );

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

    let productivityRisk =
      "Low";

    if (
      savingsPercentage >= 50
    ) {

      productivityRisk =
        "High";

    } else if (
      savingsPercentage >= 30
    ) {

      productivityRisk =
        "Medium";
    }

    let optimizationScore =
      100;

    optimizationScore -=
      savingsPercentage > 50
        ? 25
        : 0;

    optimizationScore -=
      savingsPercentage < 5
        ? 20
        : 0;

    optimizedStack.forEach(
      (tool: any) => {

        if (
          tool.plan === "Free"
        ) {

          optimizationScore -= 10;
        }

        if (
          tool.seats <= 1
        ) {

          optimizationScore -= 3;
        }

      }
    );

    optimizationScore =
      Math.max(
        35,
        Math.min(
          98,
          Math.round(
            optimizationScore
          )
        )
      );

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

      warnings,

      recommendations,
    });

  } catch (err) {

    console.error(err);

    return NextResponse.json(
      {
        error:
          "Optimization failed",
      },
      {
        status: 500,
      }
    );
  }
}