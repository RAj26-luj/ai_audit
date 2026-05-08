export interface Recommendation {
  title: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  savings?: number;
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

  let waste = 12;

  const rec: Recommendation[] =
    [];

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

  if (llmTools.length > 1) {

    waste += 15;

    rec.push({
      title:
        "Reduce Tool Overlap",

      description:
        "Multiple general-purpose AI assistants overlap heavily in functionality.",

      impact: "High",

      savings: Math.round(
        totalMonthlySpend * 0.15
      ),
    });
  }

  tools.forEach((t) => {

    if (
      t.name === "Cursor" &&
      t.plan ===
        "Business" &&
      t.seats <= 2
    ) {

      const save =
        (40 - 20) *
        t.seats;

      waste += 15;

      rec.push({
        title:
          "Downgrade Cursor Plan",

        description:
          `Cursor Business is unnecessary for a ${t.seats}-person team. Cursor Pro provides similar value at a lower cost.`,

        impact: "High",

        savings: save,
      });
    }

    if (
      t.name ===
        "ChatGPT" &&
      t.plan === "Team" &&
      t.seats <= 2
    ) {

      const save =
        (30 - 20) *
        t.seats;

      waste += 10;

      rec.push({
        title:
          "Switch ChatGPT Team to Plus",

        description:
          `ChatGPT Team pricing is inefficient for very small teams.`,

        impact: "Medium",

        savings: save,
      });
    }

    if (
      t.seats >
      teamSize
    ) {

      waste += 5;

      rec.push({
        title: `Reduce ${t.name} Seats`,

        description:
          `You are paying for more seats than your team size.`,

        impact: "Medium",

        savings:
          t.pricePerSeat,
      });
    }
  });

  if (
    useCase ===
      "writing" &&
    tools.some((t) =>
      t.id.includes(
        "cursor"
      )
    )
  ) {

    waste += 8;

    rec.push({
      title:
        "Developer Tool Mismatch",

      description:
        "Cursor is optimized for coding teams, not writing workflows.",

      impact: "Medium",

      savings: Math.round(
        totalMonthlySpend * 0.08
      ),
    });
  }

  if (
    totalYearlySpend >
    5000
  ) {

    rec.push({
      title:
        "Consider Annual Billing",

      description:
        "Annual contracts may reduce costs further.",

      impact: "Low",

      savings: Math.round(
        totalMonthlySpend * 0.1
      ),
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
    100 - waste;

  const summary = `
Your team spends around $${totalYearlySpend.toLocaleString()} yearly on AI tools.

We identified opportunities to reduce overlapping subscriptions, optimize seat allocation, and better align tools with your workflow.
`;

  return {
    totalMonthlySpend,
    totalYearlySpend,
    estimatedWasteMonthly,
    estimatedWasteYearly,
    optimizationScore,
    potentialSavingsPercentage:
      waste,
    summary,
    recommendations: rec,
  };
}