export default function OptimizedEmptyState() {

  return (
    <div className="col-span-12 xl:col-span-7 rounded-3xl border border-emerald-500/10 bg-emerald-500/[0.03] p-10 flex flex-col items-center justify-center text-center min-h-[500px]">

      <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />

        </svg>

      </div>

      <h2 className="text-5xl font-black text-white tracking-tight">
        Stack Already Optimized
      </h2>

      <p className="text-slate-400 mt-6 max-w-2xl leading-8 text-lg">
        The AI optimization engine did not detect pricing inefficiencies, duplicate subscriptions, unnecessary seat allocation, or downgrade opportunities in your current AI stack.
      </p>

      <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-4 text-emerald-300 font-semibold text-lg">

        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />

        Optimization Score Excellent

      </div>

      <p className="text-slate-500 text-sm mt-5">
        No critical optimization actions required.
      </p>

    </div>
  );
}