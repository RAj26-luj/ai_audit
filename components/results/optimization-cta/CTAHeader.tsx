import { ShieldCheck } from "lucide-react";

//header
export default function CTAHeader() {

  return (

    <div className="flex items-start gap-4">

      {/* icon */}
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
        <ShieldCheck size={20} className="text-indigo-400" />
      </div>

      {/* text */}
      <div>

        <p className="text-[11px] uppercase tracking-[0.25em] text-indigo-400 font-semibold">
          Optimization Engine
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          AI Stack Optimization
        </h3>

      </div>

    </div>
  );
}