export default function OptimizedNotice() {

  return (

    <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-8">

      {/* title */}
      <h3 className="text-2xl font-bold text-emerald-300">
        Stack Already Optimized
      </h3>

      {/* message */}
      <p className="mt-3 text-gray-300 leading-7">
        Our optimization engine did not detect any major pricing inefficiencies, subscription overlap, or unused seat allocations in your current AI stack.
      </p>

    </div>
  );
}