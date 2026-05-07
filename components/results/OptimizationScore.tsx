// optimization score card

import {
  Sparkles,
} from "lucide-react";

type Props = {
  score: number;
};

export default function OptimizationScore({
  score,
}: Props) {

  return (
    <div className="p-6 rounded-3xl bg-white/5 border border-white/10">

      <div className="flex items-center gap-2 text-amber-400 font-bold mb-4">

        <Sparkles size={20} />

        Optimization Score
      </div>

      <div className="flex items-end gap-2">

        <span className="text-5xl font-black">

          {score}
        </span>

        <span className="text-gray-500">

          /100
        </span>
      </div>

      <div className="w-full h-2 bg-white/10 rounded-full mt-5">

        <div
          className="h-2 rounded-full bg-amber-400"

          style={{
            width: `${score}%`,
          }}
        />
      </div>
    </div>
  );
}