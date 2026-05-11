import Link from "next/link";

import {
  ArrowLeft,
  Sparkles,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

import InteractiveOptimizer from "@/components/optimization/InteractiveOptimizer";

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

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OptimizePage({
  params,
}: Props) {

  const { id } =
    await params;

  let result: any;

  if (id === "demo") {

    result =
      demoData;

  } else {

    const {
      data,
      error,
    } =
      await supabase
        .from("audits")
        .select("*")
        .eq("id", id)
        .single();

    if (
      error ||
      !data
    ) {

      return (
        <div className="min-h-screen bg-[#020205] text-white flex items-center justify-center text-3xl font-black">

          Optimization Report Not Found

        </div>
      );
    }

    result = {
      ...data.result,
      id,
    };
  }

  return (

    <div className="min-h-screen bg-[#020205] text-white px-6 py-12">

      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-10">

          <Link
            href={
              id === "demo"
                ? "/demo"
                : `/audit/${id}`
            }
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >

            <ArrowLeft size={18} />

            Back to Audit

          </Link>

          <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">

            <Sparkles size={16} />

            Interactive Optimization Engine

          </div>

        </div>

        <div className="mt-10">

          <InteractiveOptimizer
            audit={result}
          />

        </div>

      </div>

    </div>

  );
}