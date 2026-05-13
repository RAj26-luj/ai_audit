import { ChevronRight } from "lucide-react";

interface Props {
  risk: string;
  savings: number;
}

//header
export default function RecommendationHeader({
  risk,
  savings,
}: Props) {

  return (

    <div className="flex items-center justify-between gap-4">

      {/* left */}
      <div className="flex items-center gap-4 flex-wrap">

        <span
          className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border
          ${
            risk === "High"
              ? "bg-red-500/10 text-red-400 border-red-500/20"
              : risk === "Medium"
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          }`}
        >
          {risk} Risk
        </span>

        {savings ? (
          <p className="text-emerald-400 font-bold text-lg">
            ↗ Save ${Math.round(savings).toLocaleString()}/mo
          </p>
        ) : null}

      </div>

      {/* arrow */}
      <ChevronRight
        size={20}
        className="text-gray-500 group-hover:text-indigo-400 transition-colors"
      />

    </div>
  );
}