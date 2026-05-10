"use client";

import {
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useMemo,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import type {
  Recommendation,
} from "@/lib/audit";

type Props = {
  savings: number;
  recommendations: Recommendation[];
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
        recommendations[0];

      if (!r) {

        return {
          current:
            "Current AI stack",

          recommended:
            "Optimized AI stack",

          reason:
            "Your stack can be optimized for lower recurring costs.",
        };
      }

      if (
        r.title.includes(
          "Cursor"
        )
      ) {

        return {
          current:
            "Cursor Business",

          recommended:
            "Cursor Pro",

          reason:
            "Reduce unnecessary enterprise plan overhead.",
        };
      }

      if (
        r.title.includes(
          "ChatGPT"
        )
      ) {

        return {
          current:
            "ChatGPT Team",

          recommended:
            "ChatGPT Plus",

          reason:
            "Collaboration features appear underutilized.",
        };
      }

      if (
        r.title.includes(
          "Claude"
        )
      ) {

        return {
          current:
            "Claude Max",

          recommended:
            "Claude Pro",

          reason:
            "Current usage does not justify higher tier pricing.",
        };
      }

      if (
        r.title.includes(
          "Seat"
        )
      ) {

        return {
          current:
            "Unused subscriptions",

          recommended:
            "Reduced seat allocation",

          reason:
            "Inactive seats are increasing recurring spend.",
        };
      }

      if (
        r.title.includes(
          "Overlap"
        )
      ) {

        return {
          current:
            "Overlapping AI tools",

          recommended:
            "Consolidated stack",

          reason:
            "Multiple tools provide similar functionality.",
        };
      }

      return {
        current:
          r.title,

        recommended:
          "Optimized pricing",

        reason:
          r.description,
      };

    }, [recommendations]);

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

        Analyze subscription overlap,
        optimize plan allocation,
        and reduce recurring AI infrastructure costs.

      </p>

      {/* savings */}
      <div className="mt-6 rounded-2xl border border-white/5 bg-black/20 p-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-wider text-gray-500">

              Optimization Potential

            </p>

            <div className="mt-2 flex items-end gap-1">

              <span className="text-5xl font-black text-white leading-none">

                {savings || 0}

              </span>

              <span className="text-xl text-gray-400 mb-1">

                %

              </span>

            </div>

          </div>

          <div className="w-28 h-2 rounded-full bg-white/10 overflow-hidden">

            <div
              className="h-full rounded-full bg-indigo-500"
              style={{
                width: `${Math.min(
                  savings,
                  100
                )}%`,
              }}
            />

          </div>

        </div>

      </div>

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