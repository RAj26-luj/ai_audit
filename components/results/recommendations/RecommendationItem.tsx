"use client";

import RecommendationHeader from "./RecommendationHeader";
import RecommendationWarning from "./RecommendationWarning";
import RecommendationFooter from "./RecommendationFooter";

interface Props {
  rec: any;
  index: number;
  handleOpen: (index: number) => void;
}

//item
export default function RecommendationItem({
  rec,
  index,
  handleOpen,
}: Props) {

  const yearly = (rec.savings || 0) * 12;
  const risk = rec.risk || "Low";

  return (

    <button
      onClick={() => handleOpen(index)}
      className="w-full text-left bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/[0.03] transition-all duration-300 group"
    >

      {/* header */}
      <RecommendationHeader
        risk={risk}
        savings={rec.savings || 0}
      />

      {/* title */}
      <h4 className="font-black text-4xl mt-8 text-white tracking-tight leading-tight">
        {rec.title}
      </h4>

      {/* description */}
      <p className="text-lg text-gray-400 mt-6 leading-9">
        {rec.description}
      </p>

      {/* warning */}
      {risk === "High" && <RecommendationWarning />}

      {/* footer */}
      <RecommendationFooter
        yearly={yearly}
        monthly={rec.savings || 0}
      />

    </button>
  );
}