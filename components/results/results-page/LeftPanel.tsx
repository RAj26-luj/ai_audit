import ExecutiveSummary from "../ExecutiveSummary";
import SpendAnalysis from "../SpendAnalysis";
import BenchmarkInsights from "../BenchmarkInsights";

interface Props {
  data: any;
  spendPerEmployee: number;
}

//left panel
export default function LeftPanel({
  data,
  spendPerEmployee,
}: Props) {

  return (

    <div className="xl:col-span-8 space-y-8 print:space-y-6">

      {/* summary */}
      <ExecutiveSummary
        summary={
          data.summary?.trim()
            ? data.summary
            : `
## AI Spend Analysis

Your AI stack was analyzed for optimization opportunities.

The system reviewed:
- subscription overlap
- pricing inefficiencies
- unused seats
- tooling redundancy

Potential savings and optimization insights are shown below.
              `
        }
        savings={data.monthlySavings || 0}
      />

      {/* spend */}
      <SpendAnalysis
        monthly={data.originalSpend || 0}
        yearly={(data.originalSpend || 0) * 12}
        spendPerEmployee={spendPerEmployee}
        benchmarkMessage={
          data.savingsPercentage > 0
            ? `Your stack has a ${data.savingsPercentage}% optimization opportunity compared to similar AI-first teams.`
            : "Your current AI stack already appears highly optimized."
        }
      />

      {/* benchmark */}
      <BenchmarkInsights
        spendPerEmployee={spendPerEmployee}
        optimizationScore={data.optimizationScore || 0}
        wastePercentage={data.savingsPercentage || 0}
      />

    </div>
  );
}