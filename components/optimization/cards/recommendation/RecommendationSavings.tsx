interface Props {
  savings?: number;
  productivityRisk?: string;
}

//savings
export default function RecommendationSavings({
  savings,
  productivityRisk,
}: Props) {

  return (
    <>

      <p className="text-slate-400 text-xs sm:text-sm mb-2">
        Estimated Savings
      </p>

      <div className="text-3xl sm:text-5xl font-black text-emerald-400 break-all leading-none">
        ${Math.round(savings || 0).toLocaleString()}
      </div>

      <div className="mt-3 text-xs sm:text-sm text-indigo-300 font-semibold leading-relaxed">
        Productivity Risk: {productivityRisk || "Low"}
      </div>

    </>
  );
}