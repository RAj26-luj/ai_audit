export interface Recommendation {
  title: string;

  description: string;

  impact: "High" | "Medium" | "Low";
}

export interface AuditResult {
  totalMonthlySpend: number;

  totalYearlySpend: number;

  estimatedWasteMonthly: number;

  estimatedWasteYearly: number;

  optimizationScore: number;

  potentialSavingsPercentage: number;

  summary: string;

  recommendations: Recommendation[];
}

export interface ToolSelection {
  id: string;

  name: string;

  plan: string;

  pricePerSeat: number;

  seats: number;
}

export interface AuditInput {
  tools: ToolSelection[];

  teamSize: number;
}

const WASTE_BENCHMARK = 0.22;

export function generateAudit(
  data: AuditInput
): AuditResult {
  const { tools, teamSize } = data;

  const totalMonthlySpend =
    tools.reduce((acc, tool) => {
      return (
        acc +
        tool.pricePerSeat *
          tool.seats
      );
    }, 0);

  const totalYearlySpend =
    totalMonthlySpend * 12;

  let wasteFactor =
    WASTE_BENCHMARK;

  const llmTools = [
    "chatgpt",
    "claude",
    "gemini",
  ].filter((id) =>
    tools.some((t) =>
      t.id
        .toLowerCase()
        .includes(id)
    )
  );

  if (llmTools.length > 1) {
    wasteFactor +=
      (llmTools.length - 1) *
      0.05;
  }

  const estimatedWasteMonthly =
    totalMonthlySpend *
    wasteFactor;

  const estimatedWasteYearly =
    estimatedWasteMonthly * 12;

  const optimizationScore =
    Math.max(
      0,
      Math.min(
        100,
        Math.round(
          100 - wasteFactor * 200
        )
      )
    );

  const recommendations: Recommendation[] =
    [];

  if (llmTools.length > 1) {
    recommendations.push({
      title:
        "Consolidate AI Workflows",

      description:
        "You are paying for multiple overlapping AI platforms. Standardizing your stack can reduce costs significantly.",

      impact: "High",
    });
  }

  tools.forEach((tool) => {
    if (
      tool.seats >
      teamSize * 1.1
    ) {
      recommendations.push({
        title: `Reduce ${tool.name} Seats`,

        description: `You currently have ${tool.seats} seats allocated for a ${teamSize}-member team.`,

        impact: "Medium",
      });
    }
  });

  if (
    totalYearlySpend > 5000
  ) {
    recommendations.push({
      title:
        "Switch to Annual Billing",

      description:
        "Annual contracts could reduce your AI operational spend by 15-20%.",

      impact: "Low",
    });
  }

  const summary = `
Your organization currently spends approximately $${Math.round(
    totalYearlySpend
  ).toLocaleString()} annually on AI tools.

Our engine estimates that nearly ${Math.round(
    wasteFactor * 100
  )}% of this spend may be optimized through billing improvements, seat consolidation, and removing overlapping services.
`;

  return {
    totalMonthlySpend,

    totalYearlySpend,

    estimatedWasteMonthly,

    estimatedWasteYearly,

    optimizationScore,

    potentialSavingsPercentage:
      Math.round(
        wasteFactor * 100
      ),

    summary,

    recommendations,
  };
}