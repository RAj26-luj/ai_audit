//demo audit
const demoAudit = {
  id: "demo",

  originalSpend: 1240,
  optimizedSpend: 820,

  monthlySavings: 420,
  yearlySavings: 5040,

  savingsPercentage: 34,
  optimizationScore: 72,

  productivityRisk: "Low",

  //warnings
  warnings: [
    "ChatGPT and Claude overlap in several workflows.",
  ],

  //audit summary
  summary: `
Your engineering and product teams are currently overspending across overlapping AI subscriptions and inefficient pricing plans.

The optimization engine identified major savings opportunities through seat optimization, plan restructuring, and removing duplicate tooling.

The highest recurring waste currently comes from overlapping coding assistants and enterprise-tier subscriptions.
`,

  //recommendations
  recommendations: [
    {
      id: "reduce-overlap",

      title:
        "Reduce Tool Overlap",

      description:
        "Multiple AI assistants overlap heavily in functionality and create duplicated recurring costs.",

      impact: "High",
      risk: "Medium",

      current:
        "ChatGPT + Claude",

      recommended:
        "ChatGPT Only",

      savings: 180,
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
  ],
};

export default demoAudit;