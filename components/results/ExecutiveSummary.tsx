// ai summary section

import { Sparkles } from "lucide-react";

type Props = {
  summary?: string;
  savings?: number;
};

export default function ExecutiveSummary({
  summary,
  savings,
}: Props) {

  return (
    <section className="bg-white/5 rounded-3xl p-8 border border-white/10">

      <div className="flex items-center justify-between gap-4 mb-5">

        <h3 className="text-2xl font-bold flex items-center gap-2">

          <Sparkles
            className="text-indigo-400"
            size={22}
          />

          AI Executive Summary
        </h3>

        {savings &&
          savings > 500 && (
            <div className="text-xs font-semibold px-3 py-2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              High Savings Opportunity
            </div>
          )}
      </div>

      <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-line">

        {summary ||
          "Your organization may be overspending on AI tooling."}
      </p>

      {savings &&
        savings > 500 && (
          <div className="mt-6 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">

            <p className="text-sm text-indigo-300 leading-6">

              Your projected savings exceed $500/month. 
              Credex may help reduce costs further through discounted AI infrastructure credits.
            </p>
          </div>
        )}
    </section>
  );
}