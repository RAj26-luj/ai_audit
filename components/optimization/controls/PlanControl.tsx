import { SlidersHorizontal } from "lucide-react";

export default function PlanControl({
  recommendationId,
  selectedPlan,
  updatePlan,
}: {
  recommendationId: string;
  selectedPlan: string;
  updatePlan: (id: string, plan: string) => void;
}) {

  return (
    <div className="rounded-xl border border-slate-700/70 bg-slate-950/60 p-3 mb-4">

      <div className="flex items-center gap-2 mb-3">

        <SlidersHorizontal
          className="text-indigo-300 shrink-0"
          size={15}
        />

        <h4 className="font-bold text-xs sm:text-sm text-white">
          Plan Optimization
        </h4>

      </div>

      <select
        value={selectedPlan}
        onChange={(e) =>
          updatePlan(recommendationId, e.target.value)
        }
        className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/10"
      >

        {["Enterprise", "Business", "Team", "Pro", "Plus", "Free"].map(
          (opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          )
        )}

      </select>

    </div>
  );
}