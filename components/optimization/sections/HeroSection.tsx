import { Sparkles } from "lucide-react";

interface Props {
  monthlySavings: number;
  yearlySavings: number;
}

export default function HeroSection({
  monthlySavings,
  yearlySavings,
}: Props) {

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 px-5 py-5 sm:px-7 sm:py-6">

      {/* glow */}
      <div className="absolute right-0 top-0 h-40 w-40 sm:h-56 sm:w-56 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

        {/* left */}
        <div className="max-w-3xl">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] sm:text-xs mb-3">
            <Sparkles size={13} />
            AI Optimization
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            Optimized AI Stack
          </h1>

          <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-xl">
            Simulate and reduce AI spend with real-time optimization insights.
          </p>

        </div>

        {/* right */}
        <div className="grid grid-cols-2 gap-3 w-full xl:w-auto">

          {/* monthly */}
          <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3">
            <p className="text-[11px] text-slate-400">Monthly</p>
            <p className="text-2xl font-black text-emerald-400">
              ${Math.round(monthlySavings).toLocaleString()}
            </p>
          </div>

          {/* yearly */}
          <div className="rounded-2xl bg-indigo-500/10 border border-indigo-500/20 px-4 py-3">
            <p className="text-[11px] text-slate-400">Yearly</p>
            <p className="text-2xl font-black text-indigo-400">
              ${Math.round(yearlySavings).toLocaleString()}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}