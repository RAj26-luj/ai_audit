import type {
  ToolSelection,
} from "./audit";

export type OptimizedTool = {
  name: string;

  currentPlan: string;
  recommendedPlan: string;

  currentCost: number;
  optimizedCost: number;

  savings: number;

  reason: string;
};

export type OptimizationResult = {
  currentMonthlySpend: number;

  optimizedMonthlySpend: number;

  totalSavings: number;

  tools: OptimizedTool[];
};

export function generateOptimizedStack(
  tools: ToolSelection[] = []
): OptimizationResult {

  if (!tools.length) {

    return {
      currentMonthlySpend: 0,
      optimizedMonthlySpend: 0,
      totalSavings: 0,
      tools: [],
    };
  }

  const optimizedTools:
    OptimizedTool[] = [];

  let currentTotal = 0;

  let optimizedTotal = 0;

  const hasCursor =
    tools.some(
      (t) =>
        t.name === "Cursor"
    );



  tools.forEach((tool) => {

    const currentCost =
      tool.pricePerSeat *
      tool.seats;

    let optimizedPlan =
      tool.plan;

    let optimizedPrice =
      tool.pricePerSeat;

    let optimizedSeats =
      tool.seats;

    let reason =
      "Current setup already appears efficient.";

    // Cursor optimization
    if (
      tool.name ===
        "Cursor" &&
      tool.plan ===
        "Business"
    ) {

      optimizedPlan =
        "Pro";

      optimizedPrice = 20;

      reason =
        "Cursor Pro provides nearly identical value for smaller engineering teams.";
    }

    // ChatGPT optimization
    if (
      tool.name ===
        "ChatGPT" &&
      tool.plan ===
        "Team"
    ) {

      optimizedPlan =
        "Plus";

      optimizedPrice = 20;

      reason =
        "ChatGPT Plus is more cost efficient for smaller collaborative teams.";
    }

    // Claude optimization
    if (
      tool.name ===
        "Claude" &&
      tool.plan ===
        "Max"
    ) {

      optimizedPlan =
        "Pro";

      optimizedPrice = 20;

      reason =
        "Claude Pro is sufficient unless usage volume is extremely high.";
    }

    // Remove duplicate coding assistant
    if (
      tool.name ===
        "GitHub Copilot" &&
      hasCursor
    ) {

      optimizedPrice = 0;

      optimizedSeats = 0;

      optimizedPlan =
        "Removed";

      reason =
        "Cursor already overlaps heavily with GitHub Copilot functionality.";
    }

    // Reduce excessive seats
    if (
      tool.seats >= 5
    ) {

      optimizedSeats =
        Math.max(
          2,
          tool.seats - 1
        );

      reason +=
        " Reduced unused seat allocation.";
    }

    const optimizedCost =
      optimizedPrice *
      optimizedSeats;

    const savings =
      currentCost -
      optimizedCost;

    currentTotal +=
      currentCost;

    optimizedTotal +=
      optimizedCost;

    optimizedTools.push({
      name: tool.name,

      currentPlan:
        `${tool.plan} • ${tool.seats} seats`,

      recommendedPlan:
        `${optimizedPlan} • ${optimizedSeats} seats`,

      currentCost,

      optimizedCost,

      savings,

      reason,
    });
  });

  return {
    currentMonthlySpend:
      currentTotal,

    optimizedMonthlySpend:
      optimizedTotal,

    totalSavings:
      currentTotal -
      optimizedTotal,

    tools:
      optimizedTools,
  };
}