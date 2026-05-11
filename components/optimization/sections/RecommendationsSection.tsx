"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  Minus,
  Plus,
} from "lucide-react";

import RecommendationCard from "../cards/RecommendationCard";

interface Recommendation {
  id: string;

  title: string;

  description: string;

  savings?: number;

  severity?: string;

  productivityRisk?: string;

  warning?: string;

  action?: {
    type?: string;

    tool?: string;

    seatsToRemove?: number;

    recommendedSeats?: number;

    currentSeats?: number;

    toPlan?: string;

    recommendedPlan?: string;
  };
}

interface Props {

  recommendations: Recommendation[];

  enabled: string[];

  toggle: (
    id: string
  ) => void;

  updateSeatReduction: (
    id: string,
    seats: number
  ) => void;

  updatePlan: (
    id: string,
    plan: string
  ) => void;
}

export default function RecommendationsSection({
  recommendations,
  enabled,
  toggle,
  updateSeatReduction,
  updatePlan,
}: Props) {

  return (

    <section className="mt-2">

      <div className="mb-3">

        <h2 className="text-3xl font-black flex items-center gap-2 text-white">

          <Sparkles
            className="text-indigo-400"
            size={26}
          />

          Optimization Recommendations

        </h2>

        <p className="text-slate-400 mt-1 text-sm">

          Every change recalculates the entire AI stack dynamically.

        </p>

      </div>

      <div className="space-y-3 max-w-full">

        {recommendations.map(
          (rec) => {

            const active =
              enabled.includes(
                rec.id
              );

            const isSeatReduction =
              rec.action?.type ===
              "reduce_seats";

            const isDowngrade =
              rec.action?.type ===
              "downgrade_plan";

            const risk =
              rec.productivityRisk ||
              "Low";

            return (

              <div
                key={rec.id}
                className={`rounded-2xl border transition-all duration-300 glass card-shadow hover-lift hover:shadow-xl hover:shadow-black/20 ${
                  active
                    ? "border-emerald-500/30 bg-emerald-500/10"
                    : "border-slate-800 bg-slate-900/50"
                }`}
              >

                <RecommendationCard
                  rec={rec}
                  active={active}
                  toggle={toggle}
                />

                <div className="px-4 pb-4">

                  <div className="flex flex-wrap items-center gap-3 mb-4">

                    <div
                      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        active
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}
                    >

                      {active ? (
                        <CheckCircle2
                          size={14}
                        />
                      ) : (
                        <AlertTriangle
                          size={14}
                        />
                      )}

                      {active
                        ? "Enabled"
                        : "Disabled"}

                    </div>

                    <div className="text-indigo-300 font-bold text-sm">

                      $
                      {Math.round(
                        rec.savings || 0
                      ).toLocaleString()}
                      /month

                    </div>

                    <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                      risk === "High"
                        ? "bg-red-500/10 border-red-500/30 text-red-300"
                        : risk === "Medium"
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                        : "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    }`}>

                      {risk} Risk

                    </div>

                  </div>

                  {isSeatReduction && active && (

                    <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-3 mb-4">

                      <div className="flex items-center gap-2 mb-3">

                        <SlidersHorizontal
                          className="text-indigo-300"
                          size={16}
                        />

                        <h4 className="font-bold text-sm text-white">

                          Seat Optimization

                        </h4>

                      </div>

                      <div className="flex items-center justify-between gap-3">

                        <button
                          onClick={() =>
                            updateSeatReduction(
                              rec.id,
                              Math.max(
                                1,
                                (
                                  rec.action
                                    ?.recommendedSeats || 1
                                ) - 1
                              )
                            )
                          }
                          className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all"
                        >

                          <Minus
                            size={15}
                            className="text-white"
                          />

                        </button>

                        <input
                          type="number"
                          min={1}
                          value={
                            rec.action
                              ?.recommendedSeats || 1
                          }
                          onChange={(e) =>
                            updateSeatReduction(
                              rec.id,
                              Math.max(
                                1,
                                Number(
                                  e.target.value
                                ) || 1
                              )
                            )
                          }
                          className="w-20 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-center text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10"
                        />

                        <button
                          onClick={() =>
                            updateSeatReduction(
                              rec.id,
                              (
                                rec.action
                                  ?.recommendedSeats || 1
                              ) + 1
                            )
                          }
                          className="w-9 h-9 rounded-lg bg-indigo-500 hover:bg-indigo-400 flex items-center justify-center transition-all"
                        >

                          <Plus
                            size={15}
                            className="text-white"
                          />

                        </button>

                      </div>

                    </div>

                  )}

                  {isDowngrade && active && (

                    <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-3 mb-4">

                      <div className="flex items-center gap-2 mb-3">

                        <SlidersHorizontal
                          className="text-indigo-300"
                          size={16}
                        />

                        <h4 className="font-bold text-sm text-white">

                          Plan Optimization

                        </h4>

                      </div>

                      <select
                        value={
                          rec.action
                            ?.recommendedPlan
                        }
                        onChange={(e) =>
                          updatePlan(
                            rec.id,
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10"
                      >

                        <option value="Enterprise">
                          Enterprise
                        </option>

                        <option value="Business">
                          Business
                        </option>

                        <option value="Team">
                          Team
                        </option>

                        <option value="Pro">
                          Pro
                        </option>

                        <option value="Plus">
                          Plus
                        </option>

                        <option value="Free">
                          Free
                        </option>

                      </select>

                    </div>

                  )}

                  {rec.warning && (

                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-2.5">

                      <div className="flex items-start gap-2">

                        <AlertTriangle
                          className="text-amber-300 mt-0.5"
                          size={14}
                        />

                        <p className="text-xs text-amber-100/80 leading-relaxed">

                          {rec.warning}

                        </p>

                      </div>

                    </div>

                  )}

                </div>

              </div>

            );
          }
        )}

      </div>

    </section>
  );
}