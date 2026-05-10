import Results from "@/components/results/Results";

import type {
  AuditResult,
} from "@/lib/audit";

const demoData:
  AuditResult & {
    id: string;
  } = {

  id: "demo",

  totalMonthlySpend: 1240,

  totalYearlySpend: 14880,

  estimatedWasteMonthly: 420,

  estimatedWasteYearly: 5040,

  optimizationScore: 72,

  potentialSavingsPercentage: 34,

  spendPerEmployee: 103,

  benchmarkMessage:
    "Your AI spend per employee is significantly above average and likely contains optimization opportunities.",

  totalPotentialSavings: 6240,

  summary: `
Your engineering and product teams are currently overspending across overlapping AI subscriptions and inefficient pricing plans.

The audit identified more than $6,000 in potential yearly savings through plan optimization, reducing duplicate tooling, and improving seat allocation efficiency.

The largest savings opportunities currently come from consolidating coding assistants and optimizing enterprise-tier subscriptions.
`,

  recommendations: [

    {
      id:
        "reduce-overlap",

      title:
        "Reduce Tool Overlap",

      description:
        "Multiple AI assistants overlap heavily in functionality and create duplicated recurring costs.",

      impact:
        "High",

      savings:
        180,

      action: {

        type:
          "merge_tools",

        tool:
          "ChatGPT",

        secondaryTool:
          "Claude",
      },
    },

    {
      id:
        "cursor-downgrade",

      title:
        "Downgrade Cursor Plan",

      description:
        "Cursor Business is likely unnecessary for a small engineering team and can be replaced with Cursor Pro.",

      impact:
        "High",

      savings:
        120,

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
    },

    {
      id:
        "openai-optimization",

      title:
        "Optimize OpenAI API Usage",

      description:
        "OpenAI API usage appears high relative to current team size and may benefit from consolidated usage limits.",

      impact:
        "Medium",

      savings:
        70,
    },

    {
      id:
        "reduce-seats",

      title:
        "Reduce Unused Seats",

      description:
        "Several subscriptions currently exceed active team allocation requirements.",

      impact:
        "Medium",

      savings:
        50,

      action: {

        type:
          "reduce_seats",

        tool:
          "ChatGPT",

        seatsToRemove:
          2,
      },
    },
  ],

  tools: [

    {
      id:
        "cursor",

      name:
        "Cursor",

      plan:
        "Business",

      pricePerSeat:
        40,

      seats:
        3,
    },

    {
      id:
        "chatgpt",

      name:
        "ChatGPT",

      plan:
        "Team",

      pricePerSeat:
        25,

      seats:
        4,
    },

    {
      id:
        "openai-api",

      name:
        "OpenAI API",

      plan:
        "Pay As You Go",

      pricePerSeat:
        60,

      seats:
        1,
    },
  ],
};

export default function DemoPage() {

  return (
    <Results
      data={demoData}
    />
  );
}