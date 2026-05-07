// optimization button card

import {
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

type Props = {
  savings: number;
};

export default function OptimizationCTA({
  savings,
}: Props) {

  return (
    <section className="bg-white/5 rounded-3xl p-8 border border-white/10 text-center">

      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">

        <ShieldCheck
          size={30}
          className="text-indigo-400"
        />
      </div>

      <h3 className="text-3xl font-black mb-3">

        Ready to Optimize?
      </h3>

      <button className="w-full py-4 bg-indigo-600 rounded-2xl font-bold text-lg flex items-center justify-center gap-2">

        Apply Optimizations

        <ArrowRight size={20} />
      </button>

      <p className="mt-4 text-xs text-gray-500">

        Estimated savings:
        {" "}
        {savings || 0}%
      </p>
    </section>
  );
}