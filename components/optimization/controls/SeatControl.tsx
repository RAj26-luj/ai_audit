import { Minus, Plus, SlidersHorizontal } from "lucide-react";

export default function SeatControl({
  seats,
  recommendationId,
  updateSeatReduction,
}: {
  seats: number;
  recommendationId: string;
  updateSeatReduction: (id: string, seats: number) => void;
}) {

  return (
    <div className="rounded-xl border border-slate-700/70 bg-slate-950/60 p-3 mb-4">

      <div className="flex items-center gap-2 mb-3">

        <SlidersHorizontal
          className="text-indigo-300 shrink-0"
          size={15}
        />

        <h4 className="font-bold text-xs sm:text-sm text-white">
          Seat Optimization
        </h4>

      </div>

      <div className="flex items-center justify-between gap-2">

        <button
          onClick={() =>
            updateSeatReduction(
              recommendationId,
              Math.max(1, seats - 1)
            )
          }
          className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all shrink-0"
        >
          <Minus size={14} className="text-white" />
        </button>

        <input
          type="number"
          min={1}
          value={seats}
          onChange={(e) =>
            updateSeatReduction(
              recommendationId,
              Math.max(1, Number(e.target.value) || 1)
            )
          }
          className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-center text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10"
        />

        <button
          onClick={() =>
            updateSeatReduction(recommendationId, seats + 1)
          }
          className="w-10 h-10 rounded-lg bg-indigo-500 hover:bg-indigo-400 flex items-center justify-center transition-all shrink-0"
        >
          <Plus size={14} className="text-white" />
        </button>

      </div>

    </div>
  );
}