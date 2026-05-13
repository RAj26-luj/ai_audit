import { AlertTriangle } from "lucide-react";

//warning
export default function RiskWarning() {

  return (

    <div className="mt-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">

      {/* row */}
      <div className="flex items-start gap-3">

        <AlertTriangle size={18} className="text-amber-300 mt-0.5" />

        <p className="text-sm text-amber-100/80 leading-6">
          Aggressive optimization may reduce productivity, AI usage limits, or collaboration workflows.
        </p>

      </div>

    </div>
  );
}