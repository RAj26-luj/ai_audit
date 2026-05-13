import { AlertTriangle } from "lucide-react";

export default function ProductivityWarning() {

  return (
    <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2">

      <div className="flex items-start gap-2">

        <AlertTriangle
          className="text-amber-300 mt-0.5 shrink-0"
          size={14}
        />

        <div className="min-w-0">

          <p className="text-[11px] font-semibold text-amber-200">
            Productivity Warning
          </p>

          <p className="text-[11px] text-amber-100/70 mt-0.5 leading-relaxed">
            This configuration is below the AI engine recommendation and may reduce productivity or workflow quality.
          </p>

        </div>

      </div>

    </div>
  );
}