"use client";

import { Sparkles } from "lucide-react";
import RecommendationItem from "../items/RecommendationItem";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  savings?: number;
  severity?: string;
  productivityRisk?: string;
  warning?: string;
  action?: {
    type?: string;
    tool?: string;
    seatsToRemove?: number;
    recommendedSeats?: number;
    currentSeats?: number;
    toPlan?: string;
    recommendedPlan?: string;
  };
}

interface Props {
  recommendations: Recommendation[];
  enabled: string[];
  toggle: (id: string) => void;
  updateSeatReduction: (id: string, seats: number) => void;
  updatePlan: (id: string, plan: string) => void;
}

export default function RecommendationsSection({
  recommendations,
  enabled,
  toggle,
  updateSeatReduction,
  updatePlan,
}: Props) {

  return (
    <section className="mt-2 w-full">

      {/* header */}
      <div className="mb-4">

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white flex items-center gap-2">
          <Sparkles className="text-indigo-400" size={20} />
          Recommendations
        </h2>

        <p className="text-slate-400 mt-1 text-xs sm:text-sm">
          Dynamic AI optimization suggestions
        </p>

      </div>

      {/* list */}
      <div className="space-y-3">

        {recommendations.map((rec) => {
          const active = enabled.includes(rec.id);

          return (
            <RecommendationItem
              key={rec.id}
              rec={rec}
              active={active}
              toggle={toggle}
              updateSeatReduction={updateSeatReduction}
              updatePlan={updatePlan}
            />
          );
        })}

      </div>

    </section>
  );
}