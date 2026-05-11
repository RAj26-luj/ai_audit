import { AuditResult } from "../types";

export const MOCK_AUDIT: AuditResult = {

  totalMonthlySpend: 8450,

  optimizedSpend: 6120,

  monthlySavings: 2330,

  yearlySavings: 27960,

  optimizationScore: 91,

  productivityRisk: "Low",

  tools: [

    {
      id: "t1",

      name: "GitHub Copilot",

      plan: "Enterprise",

      pricePerSeat: 39,

      seats: 100,

      category: "Engineering",
    },

    {
      id: "t2",

      name: "ChatGPT",

      plan: "Team",

      pricePerSeat: 25,

      seats: 50,

      category: "Productivity",
    },

    {
      id: "t3",

      name: "Jasper AI",

      plan: "Pro",

      pricePerSeat: 59,

      seats: 10,

      category: "Marketing",
    },

    {
      id: "t4",

      name: "Midjourney",

      plan: "Mega",

      pricePerSeat: 120,

      seats: 5,

      category: "Design",
    },
  ],

  recommendations: [

    {
      id: "r1",

      title:
        "Reduce GitHub Copilot Seats",

      description:
        "Several engineering licenses appear inactive and can be optimized safely.",

      savings: 936,

      warning:
        "Reducing too many seats below active developer count may impact engineering workflow.",

      action: {

        type:
          "reduce_seats",

        tool:
          "GitHub Copilot",

        currentSeats: 100,

        recommendedSeats: 76,
      },
    },

    {
      id: "r2",

      title:
        "Downgrade Midjourney Plan",

      description:
        "Current GPU usage does not justify the Mega subscription tier.",

      savings: 300,

      warning:
        "Downgrading too aggressively may reduce rendering speed and concurrent generations.",

      action: {

        type:
          "downgrade_plan",

        tool:
          "Midjourney",

        currentPlan:
          "Mega",

        recommendedPlan:
          "Pro",
      },
    },

    {
      id: "r3",

      title:
        "Remove Jasper AI",

      description:
        "ChatGPT already overlaps heavily with Jasper workflows.",

      savings: 590,

      warning:
        "Removing Jasper may impact specialized marketing automation workflows.",
    },
  ],
};