export default function OptimizationToolbar({
  loading,
  onReset,
}: {
  loading: boolean;
  onReset: () => void;
}) {

  return (
    <div className="flex items-center gap-3">

      {loading && (
        <div className="text-sm text-indigo-300 animate-pulse">
          Recalculating stack...
        </div>
      )}

      <button
        onClick={onReset}
        className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all duration-300 px-5 py-3 text-indigo-200 font-bold"
      >
        Reset To AI Recommendation
      </button>

    </div>
  );
}