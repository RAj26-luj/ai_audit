import Link from "next/link";

import {
  ArrowLeft,
  Sparkles,
} from "lucide-react";

import type {
  AuditResult,
} from "@/lib/audit";

import { supabase } from "@/lib/supabase";

import InteractiveOptimizer from "@/components/optimization/InteractiveOptimizer";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

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

export default async function OptimizePage({
  params,
}: Props) {

  const { id } =
    await params;

  let result:
    AuditResult & {
      id?: string;
    };

  // demo
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

        {/* nav */}
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

        {/* hero */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-white/[0.02] p-10">

          <p className="text-indigo-400 uppercase tracking-[0.25em] text-sm font-bold">

            Interactive AI Optimization

          </p>

          <h1 className="mt-5 text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">

            Build Your
            <br />
            Optimized AI Stack

          </h1>

          <p className="mt-6 text-lg text-gray-400 max-w-3xl leading-8">

            Enable or ignore recommendations,
            simulate AI infrastructure optimizations,
            and dynamically calculate savings in real time.

          </p>

        </section>

        {/* optimizer */}
        <div className="mt-10">

          <InteractiveOptimizer
            audit={result}
          />

        </div>

      </div>

    </div>
  );
}