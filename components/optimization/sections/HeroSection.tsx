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

    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 px-8 py-7 glass card-shadow">

      {/* BACKGROUND GLOW */}

      <div className="absolute right-0 top-0 h-64 w-64 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

        {/* LEFT */}

        <div className="max-w-3xl">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4">

            <Sparkles size={14} />

            Interactive AI Optimization

          </div>

          <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">

            Get Your Optimized AI Stack

          </h1>

          <p className="mt-3 text-sm lg:text-base text-slate-400 leading-relaxed max-w-2xl">

            Simulate AI infrastructure optimizations, customize recommendations,
            and dynamically calculate savings in real time.

          </p>

        </div>

        {/* RIGHT */}

        <div className="grid grid-cols-2 gap-3 shrink-0">

          {/* MONTHLY */}

          <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-5 py-4 min-w-[180px]">

            <p className="text-xs text-slate-400">

              Monthly Savings

            </p>

            <p className="mt-2 text-4xl font-black text-emerald-400 leading-none">

              $
              {Math.round(
                monthlySavings
              ).toLocaleString()}

            </p>

          </div>

          {/* YEARLY */}

          <div className="rounded-2xl bg-indigo-500/10 border border-indigo-500/20 px-5 py-4 min-w-[180px]">

            <p className="text-xs text-slate-400">

              Yearly Savings

            </p>

            <p className="mt-2 text-4xl font-black text-indigo-400 leading-none">

              $
              {Math.round(
                yearlySavings
              ).toLocaleString()}

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}