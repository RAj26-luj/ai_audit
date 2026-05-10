import type {
  Recommendation,
  ToolSelection,
} from "./audit";

export interface OptimizationState {

  tools:
    ToolSelection[];

  monthlySpend:
    number;

  yearlySpend:
    number;

  savings:
    number;

  optimizationScore:
    number;
}

export function simulateOptimization(

  originalTools:
    ToolSelection[],

  recommendations:
    Recommendation[],

  enabledIds:
    string[]
): OptimizationState {

  const tools =
    JSON.parse(
      JSON.stringify(
        originalTools
      )
    ) as ToolSelection[];

  let savings = 0;

  recommendations.forEach(
    (rec) => {

      if (
        !enabledIds.includes(
          rec.id
        )
      ) {
        return;
      }

      if (
        !rec.action
      ) {
        return;
      }

      const action =
        rec.action;

      // downgrade plan
      if (
        action.type ===
        "downgrade_plan"
      ) {

        const tool =
          tools.find(
            (t) =>
              t.name ===
              action.tool
          );

        if (!tool) {
          return;
        }

        const oldCost =
          tool.pricePerSeat;

        // dynamic pricing
        let newCost =
          oldCost;

        if (
          action.toPlan ===
          "Pro"
        ) {
          newCost = 20;
        }

        if (
          action.toPlan ===
          "Plus"
        ) {
          newCost = 20;
        }

        if (
          action.toPlan ===
          "Free"
        ) {
          newCost = 0;
        }

        tool.plan =
          action.toPlan ||
          tool.plan;

        tool.pricePerSeat =
          newCost;

        savings +=
          (
            oldCost -
            newCost
          ) *
          tool.seats;
      }

      // reduce seats
      if (
        action.type ===
        "reduce_seats"
      ) {

        const tool =
          tools.find(
            (t) =>
              t.name ===
              action.tool
          );

        if (!tool) {
          return;
        }

        const remove =
          action.seatsToRemove ||
          0;

        tool.seats =
          Math.max(
            1,
            tool.seats -
              remove
          );

        savings +=
          remove *
          tool.pricePerSeat;
      }

      // remove tool
      if (
        action.type ===
        "remove_tool"
      ) {

        const index =
          tools.findIndex(
            (t) =>
              t.name ===
              action.tool
          );

        if (
          index !== -1
        ) {

          const removed =
            tools[index];

          savings +=
            removed.pricePerSeat *
            removed.seats;

          tools.splice(
            index,
            1
          );
        }
      }

      // merge tools
      if (
        action.type ===
        "merge_tools"
      ) {

        const secondary =
          tools.findIndex(
            (t) =>
              t.name ===
              action.secondaryTool
          );

        if (
          secondary !==
          -1
        ) {

          const removed =
            tools[
              secondary
            ];

          savings +=
            removed.pricePerSeat *
            removed.seats;

          tools.splice(
            secondary,
            1
          );
        }
      }
    }
  );

  const monthlySpend =
    tools.reduce(
      (a, t) =>
        a +
        t.pricePerSeat *
          t.seats,
      0
    );

  const yearlySpend =
    monthlySpend * 12;

  // smarter score
  const reductionPercent =
    Math.round(
      (
        savings /
        (
          monthlySpend +
          savings
        )
      ) * 100
    );

  const optimizationScore =
    Math.min(
      98,
      65 +
        reductionPercent
    );

  return {

    tools,

    monthlySpend,

    yearlySpend,

    savings:
      Math.round(
        savings
      ),

    optimizationScore,
  };
}