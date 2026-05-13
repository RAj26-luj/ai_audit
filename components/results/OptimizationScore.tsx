import { Sparkles, ShieldAlert, ShieldCheck } from "lucide-react";

type Props = {
  score: number;
};

//optimization score
export default function OptimizationScore({
  score,
}: Props) {

  const status =
    score >= 85 ? "Excellent" :
    score >= 70 ? "Balanced" :
    score >= 50 ? "Aggressive" : "Risky";

  const Icon = score >= 70 ? ShieldCheck : ShieldAlert;

  return (

    <div className="p-6 rounded-3xl bg-white/5 border border-white/10">

      {/* header */}
      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-2 text-amber-400 font-bold">
          <Sparkles size={20} />
          Optimization Score
        </div>

        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          score >= 85
            ? "bg-emerald-500/10 text-emerald-300"
            : score >= 70
            ? "bg-indigo-500/10 text-indigo-300"
            : score >= 50
            ? "bg-amber-500/10 text-amber-300"
            : "bg-red-500/10 text-red-300"
        }`}>
          {status}
        </div>

      </div>

      {/* score */}
      <div className="flex items-end gap-2">

        <span className="text-5xl font-black">
          {Math.round(score || 0)}
        </span>

        <span className="text-gray-500 mb-1">
          /100
        </span>

      </div>

      {/* progress */}
      <div className="w-full h-2 bg-white/10 rounded-full mt-5 overflow-hidden">

        <div
          className={`h-2 rounded-full ${
            score >= 85
              ? "bg-emerald-400"
              : score >= 70
              ? "bg-indigo-400"
              : score >= 50
              ? "bg-amber-400"
              : "bg-red-400"
          }`}
          style={{ width: `${Math.min(score || 0, 100)}%` }}
        />

      </div>

      {/* footer */}
      <div className="mt-5 flex items-start gap-3">

        <Icon
          size={18}
          className={score >= 70 ? "text-emerald-400" : "text-amber-400"}
        />

        <p className="text-sm text-gray-400 leading-7">
          Higher scores indicate better cost efficiency without negatively affecting team productivity.
        </p>

      </div>

    </div>
  );
}