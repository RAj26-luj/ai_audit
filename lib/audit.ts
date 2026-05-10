export interface RecommendationAction {

  type:
    | "remove_tool"
    | "downgrade_plan"
    | "reduce_seats"
    | "merge_tools";

  tool?: string;

  fromPlan?: string;

  toPlan?: string;

  availablePlans?: string[];

  seatsToRemove?: number;

  maxSeatsReducible?: number;

  secondaryTool?: string;
}

export interface Recommendation {

  id: string;

  title: string;

  description: string;

  impact:
    | "High"
    | "Medium"
    | "Low";

  savings?: number;

  action?: RecommendationAction;
}

export interface ToolSelection {

  id: string;

  name: string;

  plan: string;

  pricePerSeat: number;

  seats: number;
}

export interface AuditResult {

  totalMonthlySpend: number;

  totalYearlySpend: number;

  estimatedWasteMonthly: number;

  estimatedWasteYearly: number;

  optimizationScore: number;

  potentialSavingsPercentage: number;

  spendPerEmployee: number;

  benchmarkMessage: string;

  totalPotentialSavings: number;

  summary: string;

  recommendations:
    Recommendation[];

  tools:
    ToolSelection[];
}

export interface AuditInput {

  tools:
    ToolSelection[];

  teamSize: number;

  useCase:
    | "coding"
    | "writing"
    | "research"
    | "data"
    | "mixed";
}

export function generateAudit(
  data: AuditInput
): AuditResult {

  const {
    tools,
    teamSize,
    useCase,
  } = data;

  let waste = 0;

  const rec:
    Recommendation[] = [];

  const totalMonthlySpend =
    tools.reduce(
      (a, t) =>
        a +
        t.pricePerSeat *
          t.seats,
      0
    );

  const totalYearlySpend =
    totalMonthlySpend * 12;

  const spendPerEmployee =
    Math.round(
      totalMonthlySpend /
        Math.max(teamSize, 1)
    );

  let benchmarkMessage =
    "";

  if (
    spendPerEmployee < 40
  ) {

    benchmarkMessage =
      "Your AI spend per employee is below typical startup spending levels.";

  } else if (
    spendPerEmployee < 80
  ) {

    benchmarkMessage =
      "Your AI spend per employee is within a healthy startup range.";

  } else {

    benchmarkMessage =
      "Your AI spend per employee is significantly above average and likely contains optimization opportunities.";
  }

  const llmTools =
    tools.filter((t) =>
      [
        "chatgpt",
        "claude",
        "gemini",
      ].some((x) =>
        t.id
          .toLowerCase()
          .includes(x)
      )
    );

  // overlap
  if (
    llmTools.length > 1
  ) {

    waste += 15;

    rec.push({

      id:
        "reduce-overlap",

      title:
        "Reduce Tool Overlap",

      description:
        "Multiple general-purpose AI assistants overlap heavily in functionality and may create unnecessary recurring costs.",

      impact:
        "High",

      savings:
        Math.round(
          totalMonthlySpend *
            0.15
        ),

      action: {

        type:
          "merge_tools",

        tool:
          llmTools[0]?.name,

        secondaryTool:
          llmTools[1]?.name,
      },
    });
  }

  tools.forEach((t) => {

    // Cursor
    if (
      t.name ===
        "Cursor" &&
      t.plan ===
        "Business"
    ) {

      const save =
        (40 - 20) *
        t.seats;

      waste += 15;

      rec.push({

        id:
          `cursor-${t.id}`,

        title:
          "Downgrade Cursor Plan",

        description:
          `Cursor Business is likely unnecessary for a ${t.seats}-person team.`,

        impact:
          "High",

        savings:
          save,

        action: {

          type:
            "downgrade_plan",

          tool:
            "Cursor",

          fromPlan:
            "Business",

          toPlan:
            "Pro",
        },
      });
    }

    // ChatGPT
    if (
      t.name ===
        "ChatGPT" &&
      t.plan ===
        "Team"
    ) {

      const save =
        (25 - 20) *
        t.seats;

      waste += 10;

      rec.push({

        id:
          `chatgpt-${t.id}`,

        title:
          "Switch ChatGPT Team to Plus",

        description:
          "ChatGPT Team pricing is inefficient for small teams.",

        impact:
          "Medium",

        savings:
          save,

        action: {

          type:
            "downgrade_plan",

          tool:
            "ChatGPT",

          fromPlan:
            "Team",

          toPlan:
            "Plus",
        },
      });
    }

    // unused seats
    if (
      t.seats >
      teamSize
    ) {

      const removeSeats =
        t.seats -
        teamSize;

      waste += 5;

      rec.push({

        id:
          `reduce-seats-${t.id}`,

        title:
          `Reduce ${t.name} Seats`,

        description:
          `You are paying for ${t.seats} seats while your active team size is ${teamSize}.`,

        impact:
          "Medium",

        savings:
          removeSeats *
          t.pricePerSeat,

        action: {

          type:
            "reduce_seats",

          tool:
            t.name,

          seatsToRemove:
            removeSeats,
        },
      });
    }
  });

  if (
    rec.length === 0
  ) {

    rec.push({

      id:
        "healthy-stack",

      title:
        "Efficient AI Stack",

      description:
        "Your current AI tooling configuration appears well optimized.",

      impact:
        "Low",

      savings: 0,
    });
  }

  waste = Math.min(
    waste,
    45
  );

  const estimatedWasteMonthly =
    Math.round(
      totalMonthlySpend *
        (waste / 100)
    );

  const estimatedWasteYearly =
    estimatedWasteMonthly *
    12;

  const optimizationScore =
    Math.max(
      55,
      100 - waste
    );

  const totalPotentialSavings =
    rec.reduce(
      (a, r) =>
        a +
        (r.savings || 0),
      0
    ) * 12;

  const summary = `
Your team is currently spending approximately $${totalYearlySpend.toLocaleString()} annually across AI subscriptions and infrastructure tools.

The audit identified around $${totalPotentialSavings.toLocaleString()} in potential yearly savings through plan optimization, removing overlapping subscriptions, and improving seat allocation efficiency.
`;

  return {

    totalMonthlySpend,

    totalYearlySpend,

    estimatedWasteMonthly,

    estimatedWasteYearly,

    optimizationScore,

    potentialSavingsPercentage:
      waste,

    spendPerEmployee,

    benchmarkMessage,

    totalPotentialSavings,

    summary,

    recommendations:
      rec,

    tools,
  };
}