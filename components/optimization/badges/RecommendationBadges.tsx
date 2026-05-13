import {
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

//badges
export default function RecommendationBadges({
  active,
  savings,
  risk,
}: {
  active: boolean;
  savings?: number;
  risk: string;
}) {

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">

      {/* status */}
      <div
        className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold ${
          active
            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20"
            : "bg-slate-800 text-slate-300 border border-slate-700"
        }`}
      >

        {active
          ? <CheckCircle2 size={13} />
          : <AlertTriangle size={13} />
        }

        {active
          ? "Enabled"
          : "Disabled"}

      </div>

      {/* savings */}
      <div className="text-indigo-300 font-bold text-xs sm:text-sm">
        ${Math.round(savings || 0).toLocaleString()}/month
      </div>

      {/* risk */}
      <div
        className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-bold border ${
          risk === "High"
            ? "bg-red-500/10 border-red-500/20 text-red-300"
            : risk === "Medium"
            ? "bg-amber-500/10 border-amber-500/20 text-amber-300"
            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
        }`}
      >

        {risk} Risk

      </div>

    </div>
  );
}