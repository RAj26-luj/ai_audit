"use client";

import {
  CheckCircle2,
  XCircle,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

interface Props {

  rec: {
    id: string;

    title: string;

    description: string;

    savings?: number;

    productivityRisk?: string;

    warning?: string;
  };

  active: boolean;

  toggle: (
    id: string
  ) => void;
}

export default function RecommendationCard({
  rec,
  active,
  toggle,
}: Props) {

  return (

    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

        <div className="flex-1">

          <div className="flex items-center gap-4 mb-5">

            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center">

              <Sparkles
                className="text-indigo-300"
                size={24}
              />

            </div>

            <div>

              <h3 className="text-2xl font-black text-white">

                {rec.title}

              </h3>

              <p className="text-slate-400">

                AI Optimization Recommendation

              </p>

            </div>

          </div>

          <p className="text-slate-300 text-lg leading-relaxed">

            {rec.description}

          </p>

          {rec.warning && (

            <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-start gap-3">

              <AlertTriangle
                className="text-amber-300 mt-1"
                size={18}
              />

              <p className="text-sm text-amber-100/80 leading-6">

                {rec.warning}

              </p>

            </div>

          )}

        </div>

        <div className="w-full lg:w-[260px]">

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">

            <p className="text-slate-400 text-sm mb-2">

              Estimated Savings

            </p>

            <div className="text-5xl font-black text-emerald-400">

              $
              {Math.round(
                rec.savings || 0
              ).toLocaleString()}

            </div>

            <div className="mt-3 text-sm text-indigo-300 font-semibold">

              Productivity Risk:
              {" "}
              {rec.productivityRisk || "Low"}

            </div>

            <button
              onClick={() =>
                toggle(rec.id)
              }
              className={`mt-6 w-full rounded-2xl px-5 py-4 font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                active
                  ? "bg-emerald-500 text-black hover:bg-emerald-400"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >

              {active ? (
                <>
                  <CheckCircle2
                    size={20}
                  />

                  Enabled
                </>
              ) : (
                <>
                  <XCircle
                    size={20}
                  />

                  Disabled
                </>
              )}

            </button>

          </div>

        </div>

      </div>

    </div>

  );
}