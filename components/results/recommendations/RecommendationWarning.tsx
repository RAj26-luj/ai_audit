import { AlertTriangle } from "lucide-react";

//warning
export default function RecommendationWarning() {

  return (

    <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">

      {/* row */}
      <div className="flex items-start gap-3">

        <AlertTriangle size={16} className="text-amber-300 mt-0.5" />

        <p className="text-sm text-amber-100/80 leading-6">
          This optimization may reduce productivity, collaboration efficiency, or AI usage limits.
        </p>

      </div>

    </div>
  );
}