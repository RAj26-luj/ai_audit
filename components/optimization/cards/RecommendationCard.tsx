import React from "react";
import {
  AlertTriangle,
  TrendingDown,
  Check,
} from "lucide-react";

//header
const RecommendationHeader = ({ title }: any) => (
  <h3 className="text-xl font-bold text-white mb-2">
    {title}
  </h3>
);

//desc
const RecommendationDescription = ({ description }: any) => (
  <p className="text-slate-400 text-sm leading-relaxed mb-4">
    {description}
  </p>
);

//warning
const RecommendationWarning = ({ warning }: any) => (
  <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">

    <AlertTriangle
      size={16}
      className="text-amber-500 shrink-0 mt-0.5"
    />

    <p className="text-xs text-amber-200/80">
      {warning}
    </p>

  </div>
);

//savings
const RecommendationSavings = ({
  savings,
  productivityRisk,
}: any) => (
  <div className="mb-4">

    <div className="flex justify-between items-end mb-1">

      <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">
        Est. Savings
      </span>

      <span className="text-2xl font-black text-emerald-400 leading-none">
        ${savings}
      </span>

    </div>

    {productivityRisk && (
      <div className="flex items-center gap-1.5 text-[10px] text-rose-400 font-medium">

        <TrendingDown size={10} />

        {productivityRisk} Risk

      </div>
    )}

  </div>
);

//toggle
const RecommendationToggle = ({
  active,
  recommendationId,
  toggle,
}: any) => (
  <button
    onClick={() => toggle(recommendationId)}
    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
      active
        ? "bg-indigo-600 text-white"
        : "bg-slate-800 text-slate-400 hover:bg-slate-700"
    }`}
  >
    {active ? (
      <>
        <Check size={14} />
        Applied
      </>
    ) : (
      "Apply Recommendation"
    )}
  </button>
);

//card
export default function RecommendationCard({
  rec,
  active,
  toggle,
}: any) {

  return (
    <div className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 lg:p-8">

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 lg:gap-8">

        {/* content */}
        <div className="flex-1 min-w-0">

          <RecommendationHeader title={rec.title} />

          <RecommendationDescription description={rec.description} />

          {rec.warning && (
            <RecommendationWarning warning={rec.warning} />
          )}

        </div>

        {/* action */}
        <div className="w-full lg:w-[240px] shrink-0">

          <div className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-950 p-4 sm:p-6">

            <RecommendationSavings
              savings={rec.savings}
              productivityRisk={rec.productivityRisk}
            />

            <RecommendationToggle
              active={active}
              recommendationId={rec.id}
              toggle={toggle}
            />

          </div>

        </div>

      </div>

    </div>
  );
}