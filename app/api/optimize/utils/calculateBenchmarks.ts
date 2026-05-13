//benchmark calc
export default function calculateBenchmarks({
  originalSpend,
  teamSize,
  engineeringTeamSize,
}: {
  originalSpend: number;
  teamSize: number;
  engineeringTeamSize: number;
}) {

  const aiSpendPerEmployee =
    originalSpend / Math.max(teamSize, 1);

  const aiSpendPerEngineer =
    originalSpend / Math.max(engineeringTeamSize, 1);

  let benchmarkStatus = "Average";

  if (aiSpendPerEmployee > 60) {
    benchmarkStatus = "Over Spending";
  }

  if (aiSpendPerEmployee < 20) {
    benchmarkStatus = "Optimized";
  }

  return {
    aiSpendPerEmployee,
    aiSpendPerEngineer,
    benchmarkStatus,
  };
}