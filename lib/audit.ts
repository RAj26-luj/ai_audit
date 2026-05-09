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

  spendPerEmployee: number;
  benchmarkMessage: string;
  totalPotentialSavings: number;

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
      "Your AI spend per employee is within a normal startup range.";

  } else {

    benchmarkMessage =
      "Your AI spend per employee is higher than average and may indicate overlapping subscriptions or inefficient tool allocation.";
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

  if (
    llmTools.length > 1
  ) {

    waste += 15;

    rec.push({
      title:
        "Reduce Tool Overlap",

      description:
        "Multiple general-purpose AI assistants overlap heavily in functionality and may create unnecessary recurring costs.",

      impact: "High",

      savings: Math.round(
        totalMonthlySpend *
          0.15
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
          `Cursor Business is likely unnecessary for a ${t.seats}-person team. Cursor Pro can provide similar value at a significantly lower cost.`,

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
        (25 - 20) *
        t.seats;

      waste += 10;

      rec.push({
        title:
          "Switch ChatGPT Team to Plus",

        description:
          "ChatGPT Team pricing is inefficient for very small teams with limited collaboration needs.",

        impact: "Medium",

        savings: save,
      });
    }

    if (
      t.name === "Claude" &&
      t.plan === "Max" &&
      teamSize <= 3
    ) {

      waste += 10;

      rec.push({
        title:
          "Review Claude Max Usage",

        description:
          "Claude Max is expensive for smaller teams and may be unnecessary unless usage volume is extremely high.",

        impact: "Medium",

        savings: 50,
      });
    }

    if (
      t.name === "v0.dev" &&
      useCase !== "coding"
    ) {

      waste += 6;

      rec.push({
        title:
          "v0.dev Workflow Mismatch",

        description:
          "v0.dev is primarily valuable for frontend and engineering workflows.",

        impact: "Low",

        savings: 20,
      });
    }

    if (
      t.name === "GitHub Copilot" &&
      tools.some(
        (x) =>
          x.name === "Cursor"
      )
    ) {

      waste += 8;

      rec.push({
        title:
          "Coding Assistant Overlap",

        description:
          "Cursor and GitHub Copilot provide overlapping coding assistance features for many teams.",

        impact: "Medium",

        savings: 15,
      });
    }

    if (
      t.name === "OpenAI API" &&
      tools.some(
        (x) =>
          x.name === "ChatGPT"
      )
    ) {

      waste += 8;

      rec.push({
        title:
          "API + Subscription Overlap",

        description:
          "Using both ChatGPT subscriptions and direct OpenAI API access may create duplicated spending.",

        impact: "Medium",

        savings: 25,
      });
    }

    if (
      t.seats >
      teamSize
    ) {

      waste += 5;

      rec.push({
        title:
          `Reduce ${t.name} Seats`,

        description:
          `You are currently paying for ${t.seats} seats while your team size is only ${teamSize}.`,

        impact: "Medium",

        savings:
          t.pricePerSeat,
      });
    }

    if (
      t.pricePerSeat > 80
    ) {

      waste += 5;

      rec.push({
        title:
          `Review ${t.name} Pricing`,

        description:
          `${t.name} has a relatively high monthly cost and should be reviewed for utilization and ROI.`,

        impact: "Low",

        savings: Math.round(
          t.pricePerSeat *
            0.1
        ),
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
        "Cursor is optimized primarily for engineering workflows and may not be cost-effective for writing-focused teams.",

      impact: "Medium",

      savings: Math.round(
        totalMonthlySpend *
          0.08
      ),
    });
  }

  if (
    useCase ===
      "coding" &&
    tools.some((t) =>
      t.id.includes(
        "copilot"
      )
    ) &&
    tools.some((t) =>
      t.id.includes(
        "cursor"
      )
    )
  ) {

    waste += 10;

    rec.push({
      title:
        "Coding Tool Overlap",

      description:
        "GitHub Copilot and Cursor provide overlapping coding assistance features for many engineering workflows.",

      impact: "Medium",

      savings: Math.round(
        totalMonthlySpend *
          0.1
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
        "Annual contracts or consolidated billing may reduce recurring AI subscription costs.",

      impact: "Low",

      savings: Math.round(
        totalMonthlySpend *
          0.1
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

  const totalPotentialSavings =
    rec.reduce(
      (a, r) =>
        a +
        (r.savings || 0),
      0
    ) * 12;

  const summary = `
Your team currently spends around $${totalYearlySpend.toLocaleString()} yearly on AI tools.

The audit identified approximately $${totalPotentialSavings.toLocaleString()} in possible yearly savings through plan optimization, seat reduction, and removing overlapping subscriptions.

Your current AI spend per employee is $${spendPerEmployee}/month.

${benchmarkMessage}
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

    recommendations: rec,
  };
}