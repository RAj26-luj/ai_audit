import Link from "next/link";

import Results from "@/components/results/Results";

import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// DEMO DATA

const demoData = {

  id: "demo",

  originalSpend: 1240,

  optimizedSpend: 820,

  monthlySavings: 420,

  yearlySavings: 5040,

  savingsPercentage: 34,

  optimizationScore: 72,

  productivityRisk: "Low",

  warnings: [

    "ChatGPT and Claude overlap in several workflows.",
  ],

  summary: `
Your engineering and product teams are currently overspending across overlapping AI subscriptions and inefficient pricing plans.

The optimization engine identified major savings opportunities through seat optimization, plan restructuring, and removing duplicate tooling.

The highest recurring waste currently comes from overlapping coding assistants and enterprise-tier subscriptions.
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

      risk:
        "Medium",

      current:
        "ChatGPT + Claude",

      recommended:
        "ChatGPT Only",

      savings:
        180,
    },

    {
      id:
        "cursor-downgrade",

      title:
        "Optimize Cursor",

      description:
        "Cursor Business is likely unnecessary for your current engineering workflow.",

      impact:
        "High",

      risk:
        "Low",

      current:
        "Business • 3 seats",

      recommended:
        "Pro • 3 seats",

      savings:
        120,
    },

    {
      id:
        "reduce-seats",

      title:
        "Reduce Unused Seats",

      description:
        "Several subscriptions currently exceed active allocation requirements.",

      impact:
        "Medium",

      risk:
        "Low",

      current:
        "6 seats",

      recommended:
        "4 seats",

      savings:
        50,
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

export default async function AuditPage({
  params,
}: Props) {

  const { id } =
    await params;

  // DEMO PAGE

  if (id === "demo") {

    return (
      <Results
        data={demoData}
      />
    );
  }

  // DATABASE FETCH

  const {
    data,
    error,
  } =
    await supabase
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

  // ERROR

  if (
    error ||
    !data
  ) {

    return (

      <div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center px-4 text-center">

        <h1 className="text-5xl font-black tracking-tight">

          Audit Not Found

        </h1>

        <p className="mt-4 text-gray-400 max-w-lg text-lg leading-8">

          This audit may have expired,
          been deleted,
          or the link may be invalid.

        </p>

        <Link
          href="/"

          className="mt-8 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:scale-105 transition-transform"
        >

          Return Home

        </Link>

      </div>
    );
  }

  // NORMALIZE DB DATA

  const result = {

    id,

    originalSpend:
      data.result
        ?.originalSpend ||

      data.result
        ?.totalMonthlySpend ||

      0,

    optimizedSpend:
      data.result
        ?.optimizedSpend ||

      0,

    monthlySavings:
      data.result
        ?.monthlySavings ||

      data.result
        ?.estimatedWasteMonthly ||

      0,

    yearlySavings:
      data.result
        ?.yearlySavings ||

      data.result
        ?.estimatedWasteYearly ||

      0,

    savingsPercentage:
      data.result
        ?.savingsPercentage ||

      data.result
        ?.potentialSavingsPercentage ||

      0,

    optimizationScore:
      data.result
        ?.optimizationScore ||

      70,

    productivityRisk:
      data.result
        ?.productivityRisk ||

      "Low",

    warnings:
      data.result
        ?.warnings || [],

    summary:
      data.result
        ?.summary ||

      "AI optimization analysis completed.",

    recommendations:
      data.result
        ?.recommendations || [],

    tools:
      data.result
        ?.tools || [],
  };

  return (
    <Results
      data={result}
    />
  );
}