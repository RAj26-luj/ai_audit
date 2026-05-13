import { ArrowRight } from "lucide-react";

interface Props {
  showPlan: boolean;
  toggle: () => void;
}

//toggle button
export default function ToggleButton({
  showPlan,
  toggle,
}: Props) {

  return (

    <button
      onClick={toggle}
      className="mt-6 w-full rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all py-4 font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
    >

      {showPlan
        ? "Hide Optimization Plan"
        : "Generate Optimized Stack"}

      <ArrowRight size={18} />

    </button>
  );
}