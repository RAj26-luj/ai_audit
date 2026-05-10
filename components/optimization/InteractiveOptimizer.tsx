"use client";

import React, { useMemo, useState } from "react";

import {
  Sparkles,
  ShieldCheck,
  X,
  Zap,
  SlidersHorizontal,
  Download,
  TrendingDown,
  DollarSign,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

type ActionType =
  | "reduce_seats"
  | "downgrade_plan"
  | "remove_tool"
  | "merge_tools";

export interface Tool {
  id: string;
  name: string;
  plan: string;
  pricePerSeat: number;
  seats: number;
  category?: string;
}

export interface RecommendationAction {
  type?: ActionType;

  targetToolId?: string;

  seatsToRemove?: number;

  maxSeatsReducible?: number;

  toPlan?: string;

  availablePlans?:
    | {
        name: string;
        price: number;
      }[]
    | string[];
}

export interface Recommendation {
  id: string;

  title: string;

  description: string;

  savings?: number;

  action?: RecommendationAction;
}

export interface AuditResult {
  totalMonthlySpend: number;

  tools: Tool[];

  recommendations: Recommendation[];
}

const MOCK_AUDIT: AuditResult = {
  totalMonthlySpend: 8450,

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
      name: "ChatGPT Team",
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
        "Optimize Copilot Licenses",

      description:
        "Unused Copilot licenses detected across engineering teams.",

      savings: 936,

      action: {
        type:
          "reduce_seats",

        targetToolId:
          "t1",

        seatsToRemove: 24,

        maxSeatsReducible: 40,
      },
    },

    {
      id: "r2",

      title:
        "Downgrade Midjourney Tier",

      description:
        "Your design workload is below current GPU usage limits.",

      savings: 300,

      action: {
        type:
          "downgrade_plan",

        targetToolId:
          "t4",

        toPlan: "Pro",

        availablePlans: [
          {
            name: "Pro",
            price: 60,
          },

          {
            name: "Standard",
            price: 30,
          },
        ],
      },
    },

    {
      id: "r3",

      title:
        "Remove Jasper AI",

      description:
        "ChatGPT Team overlaps with Jasper functionality.",

      savings: 590,

      action: {
        type:
          "remove_tool",

        targetToolId:
          "t3",
      },
    },
  ],
};

function simulateOptimization(
  tools: Tool[],
  recommendations: Recommendation[],
  enabledIds: string[]
) {

  let optimizedTools =
    tools.map((t) => ({
      ...t,
    }));

  let totalSavings = 0;

  enabledIds.forEach(
    (id) => {

      const rec =
        recommendations.find(
          (r) =>
            r.id === id
        );

      if (
        !rec ||
        !rec.action ||
        !rec.action.targetToolId
      ) {
        return;
      }

      const toolIdx =
        optimizedTools.findIndex(
          (t) =>
            t.id ===
            rec.action!
              .targetToolId
        );

      if (
        toolIdx === -1
      ) {
        return;
      }

      const tool =
        optimizedTools[
          toolIdx
        ];

      const originalCost =
        tool.seats *
        tool.pricePerSeat;

      if (
        rec.action.type ===
          "reduce_seats" &&
        rec.action
          .seatsToRemove
      ) {

        tool.seats =
          Math.max(
            1,
            tool.seats -
              rec.action
                .seatsToRemove
          );
      }

      else if (
        rec.action.type ===
          "downgrade_plan" &&
        rec.action.toPlan &&
        rec.action
          .availablePlans
      ) {

        const plans =
          rec.action
            .availablePlans;

        const newPlan =
          plans.find(
            (p) =>
              typeof p !==
                "string" &&
              p.name ===
                rec.action!
                  .toPlan
          );

        if (
          newPlan &&
          typeof newPlan !==
            "string"
        ) {

          tool.plan =
            newPlan.name;

          tool.pricePerSeat =
            newPlan.price;
        }
      }

      else if (
        rec.action.type ===
        "remove_tool"
      ) {

        tool.seats = 0;
      }

      const newCost =
        tool.seats *
        tool.pricePerSeat;

      totalSavings +=
        originalCost -
        newCost;
    }
  );

  optimizedTools =
    optimizedTools.filter(
      (t) => t.seats > 0
    );

  const currentSpend =
    tools.reduce(
      (acc, t) =>
        acc +
        t.seats *
          t.pricePerSeat,
      0
    );

  return {
    tools:
      optimizedTools,

    monthlySpend:
      currentSpend -
      totalSavings,

    savings:
      totalSavings,
  };
}

export default function InteractiveOptimizer({
  audit = MOCK_AUDIT,
}: {
  audit?: AuditResult;
}) {

  const [
    enabled,
    setEnabled,
  ] = useState<string[]>(
    audit.recommendations.map(
      (r) => r.id
    )
  );

  const [
    seatAdjustments,
    setSeatAdjustments,
  ] = useState<
    Record<string, number>
  >({});

  const [
    selectedPlans,
    setSelectedPlans,
  ] = useState<
    Record<string, string>
  >({});

  const dynamicRecommendations =
    useMemo(() => {

      return audit.recommendations.map(
        (rec) => {

          const clone: Recommendation =
            JSON.parse(
              JSON.stringify(
                rec
              )
            );

          if (
            clone.action
              ?.type ===
            "reduce_seats"
          ) {

            clone.action.seatsToRemove =
              seatAdjustments[
                clone.id
              ] ??
              clone.action
                .seatsToRemove;

            const tool =
              audit.tools.find(
                (t) =>
                  t.id ===
                  clone.action
                    ?.targetToolId
              );

            clone.savings =
              (
                clone.action
                  .seatsToRemove ||
                0
              ) *
              (
                tool?.pricePerSeat ||
                0
              );
          }

          if (
            clone.action
              ?.type ===
              "downgrade_plan"
          ) {

            clone.action.toPlan =
              selectedPlans[
                clone.id
              ] ??
              clone.action
                .toPlan;

            const tool =
              audit.tools.find(
                (t) =>
                  t.id ===
                  clone.action
                    ?.targetToolId
              );

            const plans =
              clone.action
                .availablePlans;

            const newPlan =
              plans?.find(
                (p) =>
                  typeof p !==
                    "string" &&
                  p.name ===
                    clone.action
                      ?.toPlan
              );

            if (
              tool &&
              newPlan &&
              typeof newPlan !==
                "string"
            ) {

              clone.savings =
                (
                  tool.pricePerSeat -
                  newPlan.price
                ) *
                tool.seats;
            }
          }

          return clone;
        }
      );

    }, [
      audit,
      seatAdjustments,
      selectedPlans,
    ]);

  const result =
    useMemo(() => {

      return simulateOptimization(
        audit.tools,
        dynamicRecommendations,
        enabled
      );

    }, [
      audit,
      enabled,
      dynamicRecommendations,
    ]);

  const yearlySavings =
    result.savings * 12;

  const toggle = (
    id: string
  ) => {

    setEnabled(
      (prev) => {

        if (
          prev.includes(id)
        ) {

          return prev.filter(
            (x) =>
              x !== id
          );
        }

        return [
          ...prev,
          id,
        ];
      }
    );
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 print:bg-white print:text-black">

      <div className="max-w-7xl mx-auto space-y-8">

        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/50 p-10 print:bg-white">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">

                <Sparkles size={16} />

                <span>
                  AI Infrastructure Audit
                </span>

              </div>

              <h1 className="text-5xl font-black">

                Optimization Plan

              </h1>

              <p className="mt-5 text-slate-400 text-lg max-w-2xl">

                We identified optimization opportunities
                that can reduce recurring AI infrastructure costs.

              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="rounded-3xl bg-emerald-500/[0.06] border border-emerald-500/10 px-8 py-7 min-w-[260px]">

                <p className="text-sm text-slate-400">

                  Monthly Savings

                </p>

                <p className="mt-4 text-5xl font-black text-emerald-400">

                  $
                  {Math.round(
                    result.savings
                  ).toLocaleString()}

                </p>

              </div>

              <div className="rounded-3xl bg-indigo-500/[0.06] border border-indigo-500/10 px-8 py-7 min-w-[260px]">

                <p className="text-sm text-slate-400">

                  Yearly Savings

                </p>

                <p className="mt-4 text-5xl font-black text-indigo-400">

                  $
                  {Math.round(
                    yearlySavings
                  ).toLocaleString()}

                </p>

              </div>

            </div>

          </div>

        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">

                  Current Spend

                </p>

                <h2 className="text-4xl font-black mt-2">

                  $
                  {audit.totalMonthlySpend.toLocaleString()}

                </h2>

              </div>

              <DollarSign className="text-indigo-400" />

            </div>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">

                  Optimized Spend

                </p>

                <h2 className="text-4xl font-black mt-2 text-emerald-400">

                  $
                  {Math.round(
                    result.monthlySpend
                  ).toLocaleString()}

                </h2>

              </div>

              <TrendingDown className="text-emerald-400" />

            </div>

          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">

                  Active Optimizations

                </p>

                <h2 className="text-4xl font-black mt-2 text-indigo-400">

                  {enabled.length}

                </h2>

              </div>

              <BarChart3 className="text-indigo-400" />

            </div>

          </div>

        </section>

        <section className="space-y-6">

          <div className="flex items-center gap-3">

            <SlidersHorizontal
              size={20}
              className="text-indigo-400"
            />

            <h2 className="text-2xl font-bold">

              Recommended Actions

            </h2>

          </div>

          <div className="grid gap-6">

            {dynamicRecommendations.map(
              (rec) => {

                const active =
                  enabled.includes(
                    rec.id
                  );

                return (

                  <div
                    key={rec.id}
                    className={`rounded-[1.5rem] border p-8 transition-all duration-300 ${
                      active
                        ? "border-emerald-500/30 bg-emerald-950/20"
                        : "border-slate-800 bg-slate-900/40 opacity-70"
                    }`}
                  >

                    <div className="flex flex-col xl:flex-row gap-8">

                      <div className="flex-1">

                        <div className="flex items-center gap-4 flex-wrap">

                          <button
                            onClick={() =>
                              toggle(
                                rec.id
                              )
                            }

                            className={`relative inline-flex h-7 w-12 rounded-full transition-colors ${
                              active
                                ? "bg-emerald-500"
                                : "bg-slate-700"
                            }`}
                          >

                            <span
                              className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                                active
                                  ? "translate-x-5"
                                  : "translate-x-0"
                              }`}
                            />

                          </button>

                          <span className={`text-sm font-bold uppercase ${
                            active
                              ? "text-emerald-400"
                              : "text-slate-500"
                          }`}>

                            {
                              active
                                ? "Applied"
                                : "Ignored"
                            }

                          </span>

                          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/50 border border-slate-800">

                            <Zap
                              size={14}
                              className="text-indigo-400"
                            />

                            <span className="text-sm font-semibold text-white">

                              Save $
                              {Math.round(
                                rec.savings || 0
                              ).toLocaleString()}
                              /mo

                            </span>

                          </div>

                        </div>

                        <h3 className="text-3xl font-black text-white mt-6">

                          {rec.title}

                        </h3>

                        <p className="mt-4 text-slate-400 text-lg leading-8 max-w-3xl">

                          {
                            rec.description
                          }

                        </p>

                      </div>

                      <div className={`xl:w-80 ${
                        active
                          ? "opacity-100"
                          : "opacity-40 pointer-events-none"
                      }`}>

                        {rec.action?.type ===
                          "reduce_seats" && (

                          <div className="rounded-2xl bg-slate-950/50 border border-slate-800 p-5">

                            <div className="flex items-center justify-between mb-5">

                              <div>

                                <p className="text-sm font-medium text-slate-400">
                                  Unused Seats
                                </p>

                                <p className="text-xs text-slate-500 mt-1">
                                  Recommended licenses to reclaim
                                </p>

                              </div>

                              <div className="text-right">

                                <p className="text-4xl font-black text-white">
                                  {rec.action.seatsToRemove}
                                </p>

                                <p className="text-xs uppercase tracking-wider text-slate-500">
                                  seats
                                </p>

                              </div>

                            </div>

                            <div className="space-y-3">

                              <input
                                type="range"

                                min={1}

                                max={
                                  rec.action
                                    .maxSeatsReducible || 10
                                }

                                value={
                                  rec.action
                                    .seatsToRemove
                                }

                                onChange={(e) =>
                                  setSeatAdjustments(
                                    {
                                      ...seatAdjustments,

                                      [rec.id]:
                                        Number(
                                          e.target
                                            .value
                                        ),
                                    }
                                  )
                                }

                                className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                              />

                              <div className="flex justify-between text-xs text-slate-500">

                                <span>
                                  1 seat
                                </span>

                                <span>
                                  Max {rec.action.maxSeatsReducible}
                                </span>

                              </div>

                            </div>

                            <div className="mt-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4">

                              <div className="flex items-center justify-between">

                                <div>

                                  <p className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                                    Estimated Savings
                                  </p>

                                  <p className="text-sm text-slate-400 mt-1">
                                    Monthly recurring reduction
                                  </p>

                                </div>

                                <p className="text-2xl font-black text-emerald-400">

                                  $
                                  {Math.round(
                                    rec.savings || 0
                                  ).toLocaleString()}

                                </p>

                              </div>

                            </div>

                          </div>
                        )}

                        {rec.action?.type ===
                          "downgrade_plan" && (

                          <div className="rounded-2xl bg-slate-950/50 border border-slate-800 p-5">

                            <label className="block text-sm text-slate-400 mb-4">

                              Select Plan

                            </label>

                            <select
                              value={
                                rec.action
                                  .toPlan
                              }

                              onChange={(e) =>
                                setSelectedPlans(
                                  {
                                    ...selectedPlans,

                                    [rec.id]:
                                      e.target
                                        .value,
                                  }
                                )
                              }

                              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white"
                            >

                              {rec.action.availablePlans?.map(
                                (
                                  plan
                                ) => {

                                  if (
                                    typeof plan ===
                                    "string"
                                  ) {

                                    return (
                                      <option
                                        key={plan}
                                        value={plan}
                                      >
                                        {plan}
                                      </option>
                                    );
                                  }

                                  return (
                                    <option
                                      key={
                                        plan.name
                                      }

                                      value={
                                        plan.name
                                      }
                                    >

                                      {
                                        plan.name
                                      }
                                      {" "}
                                      ($
                                      {
                                        plan.price
                                      }
                                      /seat)

                                    </option>
                                  );
                                }
                              )}

                            </select>

                            <div className="mt-5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-4">

                              <div className="flex items-center justify-between">

                                <div>

                                  <p className="text-xs uppercase tracking-wider text-indigo-400 font-bold">
                                    Estimated Savings
                                  </p>

                                  <p className="text-sm text-slate-400 mt-1">
                                    Monthly recurring reduction
                                  </p>

                                </div>

                                <p className="text-2xl font-black text-indigo-400">

                                  $
                                  {Math.round(
                                    rec.savings || 0
                                  ).toLocaleString()}

                                </p>

                              </div>

                            </div>

                          </div>
                        )}

                        {rec.action?.type ===
                          "remove_tool" && (

                          <div className="rounded-2xl bg-rose-950/20 border border-rose-900/30 p-5 flex flex-col items-center justify-center text-center h-full min-h-[120px]">

                            <X
                              className="text-rose-400 mb-2"
                              size={24}
                            />

                            <p className="text-sm text-rose-300">

                              Tool will be removed

                            </p>

                            <div className="mt-4 flex items-center gap-2 text-rose-400 font-bold">

                              <CheckCircle2 size={16} />

                              $
                              {Math.round(
                                rec.savings || 0
                              ).toLocaleString()}
                              /mo saved

                            </div>

                          </div>
                        )}

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </section>

        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/40 p-10">

          <h2 className="text-3xl font-black mb-8">

            Stack Breakdown

          </h2>

          <div className="space-y-4">

            {result.tools.map(
              (tool) => {

                const cost =
                  tool.seats *
                  tool.pricePerSeat;

                return (

                  <div
                    key={tool.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950/50 p-6 flex items-center justify-between"
                  >

                    <div>

                      <h3 className="text-xl font-bold">

                        {tool.name}

                      </h3>

                      <p className="text-slate-400 mt-1">

                        {tool.plan}
                        {" • "}
                        {tool.seats} seats

                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-3xl font-black text-white">

                        $
                        {cost.toLocaleString()}

                      </p>

                      <p className="text-sm text-slate-500">

                        monthly

                      </p>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </section>

        <section className="rounded-[2rem] border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-slate-900/50 p-8 lg:p-12 text-center">

          <div className="max-w-3xl mx-auto">

            <div className="mx-auto w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30 text-indigo-400">

              <ShieldCheck size={32} />

            </div>

            <h3 className="text-3xl font-black text-white mb-4">

              Ready to apply these optimizations?

            </h3>

            <p className="text-slate-400 text-lg mb-8 leading-relaxed">

              Applying the current configuration would reduce your annual AI infrastructure spend by
              {" "}
              <span className="text-emerald-400 font-bold">

                $
                {Math.round(
                  yearlySavings
                ).toLocaleString()}

              </span>

            </p>

            <button
              onClick={exportPDF}
              className="bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-4 rounded-xl font-bold tracking-wide transition-all inline-flex items-center gap-3"
            >

              <Download size={18} />

              Export Optimization Plan PDF

            </button>

          </div>

        </section>

      </div>

    </div>
  );
}