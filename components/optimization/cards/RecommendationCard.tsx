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

    <div className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 lg:p-8">

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 lg:gap-8">

        {/* LEFT */}

        <div className="flex-1 min-w-0">

          {/* HEADER */}

          <div className="flex items-start gap-3 sm:gap-4 mb-4">

            <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center">

              <Sparkles
                className="text-indigo-300"
                size={20}
              />

            </div>

            <div className="min-w-0">

              <h3 className="text-lg sm:text-2xl font-black text-white leading-tight break-words">

                {rec.title}

              </h3>

              <p className="text-slate-400 text-xs sm:text-sm mt-1">

                AI Optimization Recommendation

              </p>

            </div>

          </div>

          {/* DESCRIPTION */}

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-7 break-words">

            {rec.description}

          </p>

          {/* WARNING */}

          {rec.warning && (

            <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3 sm:p-4 flex items-start gap-3">

              <AlertTriangle
                className="text-amber-300 mt-0.5 shrink-0"
                size={16}
              />

              <p className="text-xs sm:text-sm text-amber-100/80 leading-6 break-words">

                {rec.warning}

              </p>

            </div>

          )}

        </div>

        {/* RIGHT */}

        <div className="w-full lg:w-[240px] shrink-0">

          <div className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-950 p-4 sm:p-6">

            <p className="text-slate-400 text-xs sm:text-sm mb-2">

              Estimated Savings

            </p>

            <div className="text-3xl sm:text-5xl font-black text-emerald-400 break-all leading-none">

              $
              {Math.round(
                rec.savings || 0
              ).toLocaleString()}

            </div>

            <div className="mt-3 text-xs sm:text-sm text-indigo-300 font-semibold leading-relaxed">

              Productivity Risk:
              {" "}
              {rec.productivityRisk || "Low"}

            </div>

            <button
              onClick={() =>
                toggle(rec.id)
              }
              className={`mt-5 sm:mt-6 w-full rounded-2xl px-4 py-3 sm:px-5 sm:py-4 font-bold transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base ${
                active
                  ? "bg-emerald-500 text-black hover:bg-emerald-400"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >

              {active ? (
                <>
                  <CheckCircle2
                    size={18}
                  />

                  Enabled
                </>
              ) : (
                <>
                  <XCircle
                    size={18}
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