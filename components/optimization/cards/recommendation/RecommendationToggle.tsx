import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface Props {
  active: boolean;

  recommendationId: string;

  toggle: (
    id: string
  ) => void;
}

//toggle btn
export default function RecommendationToggle({
  active,
  recommendationId,
  toggle,
}: Props) {

  return (
    <button
      onClick={() =>
        toggle(recommendationId)
      }

      className={`mt-5 sm:mt-6 w-full rounded-2xl px-4 py-3 sm:px-5 sm:py-4 font-bold transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base ${
        active
          ? "bg-emerald-500 text-black hover:bg-emerald-400"
          : "bg-slate-800 text-white hover:bg-slate-700"
      }`}
    >

      {active ? (
        <>
          <CheckCircle2 size={18} />
          Enabled
        </>
      ) : (
        <>
          <XCircle size={18} />
          Disabled
        </>
      )}

    </button>
  );
}