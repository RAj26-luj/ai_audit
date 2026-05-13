export default function HealthSummary() {

  return (

    <div className="rounded-3xl bg-black/30 border border-white/5 p-6">

      {/* title */}
      <h4 className="text-xl font-bold mb-5">
        AI Stack Health Summary
      </h4>

      {/* content */}
      <div className="space-y-4 text-sm text-gray-300 leading-7">

        <p>
          Your AI stack has been dynamically analyzed using optimization simulations
          across pricing,
          usage efficiency,
          seat allocation,
          and workflow overlap.
        </p>

        <p>
          The optimizer continuously balances maximum savings with minimum productivity loss,
          ensuring cost reduction does not negatively impact operational workflows.
        </p>

        <p>
          Any manual deviation from recommended plans or seat allocations
          dynamically recalculates savings,
          optimization score,
          and productivity safety in real time.
        </p>

      </div>

    </div>
  );
}