const demoData = {

  id: "demo",

  totalMonthlySpend: 1240,

  optimizedSpend: 820,

  monthlySavings: 420,

  yearlySavings: 5040,

  optimizationScore: 72,

  productivityRisk: "Low",

  recommendations: [

    {
      id:
        "cursor-downgrade",

      title:
        "Downgrade Cursor Plan",

      description:
        "Cursor Business is likely unnecessary for a small engineering team.",

      savings:
        120,

      productivityRisk:
        "Low",

      warning:
        "Downgrading too aggressively may remove advanced collaboration functionality.",

      action: {

        type:
          "downgrade_plan",

        tool:
          "Cursor",

        currentPlan:
          "Business",

        recommendedPlan:
          "Pro",
      },
    },

    {
      id:
        "reduce-seats",

      title:
        "Reduce Unused Seats",

      description:
        "Several subscriptions currently exceed active allocation requirements.",

      savings:
        50,

      productivityRisk:
        "Medium",

      warning:
        "Reducing too many seats can impact scaling and onboarding.",

      action: {

        type:
          "reduce_seats",

        tool:
          "ChatGPT",

        currentSeats:
          4,

        recommendedSeats:
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
        "claude",

      name:
        "Claude",

      plan:
        "Max",

      pricePerSeat:
        100,

      seats:
        1,
    },
  ],
};

export default demoData;