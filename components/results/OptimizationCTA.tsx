"use client";

import {
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

type Props = {
  savings: number;
  recommendations: any[];
  auditId: string;
};

export default function OptimizationCTA({
  savings,
  recommendations,
  auditId,
}: Props) {

  const router =
    useRouter();

  const [showPlan, setShowPlan] =
    useState(false);

  const optimizedPlan =
    useMemo(() => {

      const r =
        recommendations?.[0];

      if (!r) {

        return {

          current:
            "Current AI Stack",

          recommended:
            "Optimized AI Stack",

          reason:
            "The optimization engine identified additional savings opportunities.",
        };
      }

      return {

        current:
          r.current || "Current Stack",

        recommended:
          r.recommended || "Optimized Stack",

        reason:
          r.description ||
          "AI optimization recommendation generated dynamically.",
      };

    }, [recommendations]);

  const risk =
    savings > 60
      ? "High"
      : savings > 35
      ? "Medium"
      : "Low";

  return (

    <motion.section

      initial={{
        opacity: 0,
        y: 12,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.3,
      }}

      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
    >

      {/* top */}

      <div className="flex items-start gap-4">

        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">

          <ShieldCheck
            size={20}
            className="text-indigo-400"
          />

        </div>

        <div>

          <p className="text-[11px] uppercase tracking-[0.25em] text-indigo-400 font-semibold">

            Optimization Engine

          </p>

          <h3 className="mt-2 text-2xl font-bold text-white">

            AI Stack Optimization

          </h3>

        </div>

      </div>

      {/* desc */}

      <p className="mt-5 text-sm text-gray-400 leading-7">

        Dynamic optimization recalculates your entire AI stack
        every time you change seats,
        plans,
        or subscriptions.

      </p>

      {/* savings */}

      <div className="mt-6 rounded-2xl border border-white/5 bg-black/20 p-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-wider text-gray-500">

              Estimated Savings

            </p>

            <div className="mt-2 flex items-end gap-1">

              <span className="text-5xl font-black text-white leading-none">

                $
                {Math.round(
                  savings || 0
                ).toLocaleString()}

              </span>

              <span className="text-xl text-gray-400 mb-1">

                /mo

              </span>

            </div>

          </div>

          <div className={`px-4 py-2 rounded-2xl text-sm font-semibold border ${
            risk === "High"
              ? "bg-red-500/10 border-red-500/20 text-red-300"
              : risk === "Medium"
              ? "bg-amber-500/10 border-amber-500/20 text-amber-300"
              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
          }`}>

            {risk} Risk

          </div>

        </div>

      </div>

      {/* warning */}

      {risk === "High" && (

        <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">

          <div className="flex items-start gap-3">

            <AlertTriangle
              size={18}
              className="text-amber-300 mt-0.5"
            />

            <p className="text-sm text-amber-100/80 leading-7">

              Aggressive optimization may reduce productivity,
              AI usage limits,
              or collaboration workflows.

            </p>

          </div>

        </div>
      )}

      {/* preview */}

      {showPlan && (

        <motion.div

          initial={{
            opacity: 0,
            y: 10,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className="mt-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.03] p-5"
        >

          <p className="text-sm font-semibold text-emerald-400">

            Recommended Configuration

          </p>

          <div className="mt-5 rounded-2xl border border-white/5 bg-black/20 p-5">

            <div>

              <p className="text-xs uppercase tracking-wider text-gray-500">

                Current

              </p>

              <p className="mt-2 text-2xl font-bold text-white">

                {optimizedPlan.current}

              </p>

            </div>

            <div className="mt-6">

              <p className="text-xs uppercase tracking-wider text-gray-500">

                Recommended

              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-400">

                {optimizedPlan.recommended}

              </p>

            </div>

            <p className="mt-6 text-sm text-gray-400 leading-7">

              {optimizedPlan.reason}

            </p>

          </div>

          <button
            onClick={() =>
              router.push(
                `/optimize/${auditId}`
              )
            }
            className="mt-5 w-full rounded-2xl border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all px-5 py-4 text-indigo-300 font-semibold text-sm flex items-center justify-center gap-2"
          >

            Open Full Optimization Center

            <ChevronRight size={18} />

          </button>

        </motion.div>
      )}

      {/* toggle */}

      <button

        onClick={() =>
          setShowPlan(
            !showPlan
          )
        }

        className="mt-6 w-full rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all py-4 font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
      >

        {showPlan
          ? "Hide Optimization Plan"
          : "Generate Optimized Stack"}

        <ArrowRight size={18} />

      </button>

    </motion.section>
  );
}