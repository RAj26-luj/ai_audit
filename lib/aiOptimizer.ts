import { PLAN_DATABASE } from "./planDatabase";

export interface StackTool {

  id: string;

  name: string;

  plan: string;

  seats: number;

  pricePerSeat: number;
}

export interface Recommendation {

  id: string;

  title: string;

  description: string;

  savings?: number;

  severity?: string;

  action?: {

    type?: string;

    tool?: string;

    fromPlan?: string;

    toPlan?: string;

    seatsToRemove?: number;
  };
}

export interface OptimizationResult {

  optimizedStack: StackTool[];

  monthlySpend: number;

  monthlySavings: number;

  yearlySavings: number;

  optimizationScore: number;

  productivityRisk: string;

  recommendations: Recommendation[];
}

export function optimizeAIStack(
  stack: StackTool[]
): OptimizationResult {

  // ORIGINAL SPEND

  const originalSpend =
    stack.reduce(
      (
        acc: number,
        tool: StackTool
      ) => {

        return (
          acc +
          tool.pricePerSeat *
            tool.seats
        );
      },
      0
    );

  // COPY STACK

  const optimizedStack:
    StackTool[] =
      JSON.parse(
        JSON.stringify(
          stack
        )
      );

  // RECOMMENDATIONS

  const recommendations:
    Recommendation[] = [];

  // ENGINE

  optimizedStack.forEach(
    (
      tool: StackTool
    ) => {

      // CURSOR DOWNGRADE

      if (
        tool.name ===
          "Cursor" &&
        tool.plan ===
          "Business"
      ) {

        recommendations.push({

          id:
            crypto.randomUUID(),

          title:
            "Downgrade Cursor Plan",

          description:
            "Cursor Business is more expensive than necessary for current usage.",

          severity:
            "medium",

          savings:
            (
              tool.pricePerSeat -
              PLAN_DATABASE
                .Cursor.Pro
            ) * tool.seats,

          action: {

            type:
              "downgrade_plan",

            tool:
              tool.name,

            fromPlan:
              "Business",

            toPlan:
              "Pro",
          },
        });

        tool.plan =
          "Pro";

        tool.pricePerSeat =
          PLAN_DATABASE
            .Cursor.Pro;
      }

      // CLAUDE DOWNGRADE

      if (
        tool.name ===
          "Claude" &&
        tool.plan ===
          "Max"
      ) {

        recommendations.push({

          id:
            crypto.randomUUID(),

          title:
            "Downgrade Claude Plan",

          description:
            "Claude Max is likely unnecessary for current team usage.",

          severity:
            "medium",

          savings:
            (
              tool.pricePerSeat -
              PLAN_DATABASE
                .Claude.Pro
            ) * tool.seats,

          action: {

            type:
              "downgrade_plan",

            tool:
              tool.name,

            fromPlan:
              "Max",

            toPlan:
              "Pro",
          },
        });

        tool.plan =
          "Pro";

        tool.pricePerSeat =
          PLAN_DATABASE
            .Claude.Pro;
      }

      // SEAT REDUCTION

      if (
        tool.seats > 5
      ) {

        const removeSeats =
          2;

        recommendations.push({

          id:
            crypto.randomUUID(),

          title:
            "Reduce Unused Seats",

          description:
            "Several seats appear underutilized and can be optimized safely.",

          severity:
            "low",

          savings:
            removeSeats *
            tool.pricePerSeat,

          action: {

            type:
              "reduce_seats",

            tool:
              tool.name,

            seatsToRemove:
              removeSeats,
          },
        });

        tool.seats =
          Math.max(
            1,
            tool.seats -
              removeSeats
          );
      }
    }
  );

  // OPTIMIZED SPEND

  const optimizedSpend =
    optimizedStack.reduce(
      (
        acc: number,
        tool: StackTool
      ) => {

        return (
          acc +
          tool.pricePerSeat *
            tool.seats
        );
      },
      0
    );

  // SAVINGS

  const monthlySavings =
    Math.max(
      0,
      originalSpend -
        optimizedSpend
    );

  const yearlySavings =
    monthlySavings * 12;

  // SAVINGS %

  const savingsPercent =
    originalSpend > 0
      ? (
          monthlySavings /
          originalSpend
        ) * 100
      : 0;

  // SCORE

  let optimizationScore =
    96;

  // LOW SAVINGS

  if (
    savingsPercent < 5
  ) {

    optimizationScore -= 8;
  }

  // OVER OPTIMIZATION

  if (
    savingsPercent > 45
  ) {

    optimizationScore -= 15;
  }

  // PRODUCTIVITY RISK

  let productivityRisk =
    "Low";

  if (
    savingsPercent > 50
  ) {

    productivityRisk =
      "High";

    optimizationScore -= 10;
  }

  // FINAL SCORE

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

  return {

    optimizedStack,

    monthlySpend:
      optimizedSpend,

    monthlySavings,

    yearlySavings,

    optimizationScore,

    productivityRisk,

    recommendations,
  };
}