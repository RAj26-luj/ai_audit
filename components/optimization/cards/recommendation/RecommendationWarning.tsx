import {
  AlertTriangle,
} from "lucide-react";

interface Props {
  warning: string;
}

//warning
export default function RecommendationWarning({
  warning,
}: Props) {

  return (
    <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-3 sm:p-4 flex items-start gap-3">

      <AlertTriangle
        className="text-amber-300 mt-0.5 shrink-0"
        size={16}
      />

      <p className="text-xs sm:text-sm text-amber-100/80 leading-6 break-words">
        {warning}
      </p>

    </div>
  );
}