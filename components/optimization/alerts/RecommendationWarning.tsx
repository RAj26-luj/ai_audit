import {
  AlertTriangle,
} from "lucide-react";

//warning box
export default function RecommendationWarning({
  warning,
}: {
  warning: string;
}) {

  return (
    <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-3">

      <div className="flex items-start gap-2">

        <AlertTriangle
          className="text-amber-300 mt-0.5 shrink-0"
          size={14}
        />

        <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed break-words">
          {warning}
        </p>

      </div>

    </div>
  );
}