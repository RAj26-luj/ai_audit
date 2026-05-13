//demo audit
const demoAudit = {

  id: "demo",

  totalMonthlySpend: 1240,
  optimizedSpend: 820,

  monthlySavings: 420,
  yearlySavings: 5040,

  optimizationScore: 72,
  productivityRisk: "Low",

  spendPerEmployee: 103,

  benchmarkMessage:
    "Your AI spend per employee is significantly above average and likely contains optimization opportunities.",

  //audit summary
  summary: `
Your engineering and product teams are currently overspending across overlapping AI subscriptions and inefficient pricing plans.

The audit identified more than $5,000 in potential yearly savings through plan optimization, reducing duplicate tooling, and improving seat allocation efficiency.
`,

  //recommendations
  recommendations: [

    {
      id: "reduce-overlap",

      title:
        "Reduce Tool Overlap",

      description:
        "Multiple AI assistants overlap heavily in functionality and create duplicated recurring costs.",

      savings: 180,

      productivityRisk: "Medium",

      warning:
        "Removing overlapping tools may reduce workflow flexibility for some teams.",
    },

    {
      id: "cursor-downgrade",

      title:
        "Downgrade Cursor Plan",

      description:
        "Cursor Business is likely unnecessary for a small engineering team.",

      savings: 120,
      productivityRisk: "Low",

      warning:
        "Downgrading too far may remove collaboration functionality.",

      action: {
        type: "downgrade_plan",

        tool: "Cursor",

        currentPlan:
          "Business",

        recommendedPlan:
          "Pro",
      },
    },

    {
      id: "reduce-seats",

      title:
        "Reduce Unused Seats",

      description:
        "Several subscriptions currently exceed active team allocation requirements.",

      savings: 50,
      productivityRisk: "Low",

      warning:
        "Reducing seats below active usage may affect onboarding and scaling.",

      action: {
        type: "reduce_seats",

        tool: "ChatGPT",

        currentSeats: 4,
        recommendedSeats: 2,
      },
    },
  ],

  //tools
  tools: [

    {
      id: "cursor",

      name: "Cursor",
      plan: "Business",

      pricePerSeat: 40,
      seats: 3,
    },

    {
      id: "chatgpt",

      name: "ChatGPT",
      plan: "Team",

      pricePerSeat: 25,
      seats: 4,
    },

    {
      id: "openai-api",

      name: "OpenAI API",

      plan:
        "Pay As You Go",

      pricePerSeat: 60,
      seats: 1,
    },
  ],
};

export default demoAudit;