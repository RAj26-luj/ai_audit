import RecommendationCard from "../cards/RecommendationCard";
import RecommendationBadges from "../badges/RecommendationBadges";
import SeatControl from "../controls/SeatControl";
import PlanControl from "../controls/PlanControl";
import RecommendationWarning from "../alerts/RecommendationWarning";

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

//item
export default function RecommendationItem({
  rec,
  active,
  toggle,
  updateSeatReduction,
  updatePlan,
}: {
  rec: Recommendation;
  active: boolean;
  toggle: (id: string) => void;
  updateSeatReduction: (id: string, seats: number) => void;
  updatePlan: (id: string, plan: string) => void;
}) {

  const isSeatReduction = rec.action?.type === "reduce_seats";
  const isDowngrade = rec.action?.type === "downgrade_plan";
  const risk = rec.productivityRisk || "Low";

  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all ${
        active
          ? "border-emerald-500/20 bg-emerald-500/[0.04]"
          : "border-slate-800 bg-slate-900/40"
      }`}
    >

      <RecommendationCard rec={rec} active={active} toggle={toggle} />

      <div className="px-3 sm:px-4 pb-4">

        <RecommendationBadges active={active} savings={rec.savings} risk={risk} />

        {active && isSeatReduction && (
          <SeatControl
            seats={rec.action?.recommendedSeats || 1}
            recommendationId={rec.id}
            updateSeatReduction={updateSeatReduction}
          />
        )}

        {active && isDowngrade && (
          <PlanControl
            recommendationId={rec.id}
            selectedPlan={rec.action?.recommendedPlan || "Pro"}
            updatePlan={updatePlan}
          />
        )}

        {rec.warning && (
          <RecommendationWarning warning={rec.warning} />
        )}

      </div>
    </div>
  );
}