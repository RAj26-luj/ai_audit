"use client";

import { Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Props = {
  summary?: string;
  savings?: number;
};

//executive summary
export default function ExecutiveSummary({
  summary,
  savings,
}: Props) {

  return (

    <section className="bg-white/5 rounded-3xl p-8 border border-white/10">

      {/* header */}
      <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">

        <h3 className="text-2xl font-bold flex items-center gap-2">

          <Sparkles className="text-indigo-400" size={22} />

          Executive Summary

        </h3>

        {savings && savings > 500 && (
          <div className="text-xs font-semibold px-3 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            High Savings Opportunity
          </div>
        )}

      </div>

      {/* content */}
      <div className="space-y-5">

        {/* markdown */}
        <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-p:leading-8 prose-strong:text-white prose-li:text-gray-300">

          <ReactMarkdown>
            {summary || "Your organization may be overspending on AI tooling."}
          </ReactMarkdown>

        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="rounded-2xl bg-black/30 border border-white/5 p-5">

            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Optimization Focus
            </p>

            <p className="text-sm text-gray-300 leading-6">
              The audit identified opportunities across subscription overlap, seat utilization, and workflow-tool alignment.
            </p>

          </div>

          <div className="rounded-2xl bg-black/30 border border-white/5 p-5">

            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
              Financial Impact
            </p>

            <p className="text-sm text-gray-300 leading-6">
              Reducing duplicated tooling and optimizing plans can significantly improve operational efficiency and recurring AI spend.
            </p>

          </div>

        </div>

        {/* savings note */}
        {savings && savings > 500 && (
          <div className="mt-2 p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
            <p className="text-sm text-indigo-300 leading-7">
              Your projected savings exceed $500/month. The current tool stack likely contains overlapping subscriptions, inefficient pricing tiers, or underutilized seats.
            </p>
          </div>
        )}

      </div>

    </section>
  );
}