import {
  Sparkles,
} from "lucide-react";

interface Props {
  title: string;
}

//header
export default function RecommendationHeader({
  title,
}: Props) {

  return (
    <div className="flex items-start gap-3 sm:gap-4 mb-4">

      <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center">

        <Sparkles
          className="text-indigo-300"
          size={20}
        />

      </div>

      <div className="min-w-0">

        <h3 className="text-lg sm:text-2xl font-black text-white leading-tight break-words">
          {title}
        </h3>

        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          AI Optimization Recommendation
        </p>

      </div>

    </div>
  );
}