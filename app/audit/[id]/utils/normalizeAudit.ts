//normalize audit
export default function normalizeAudit(
  id: string,
  result: any
) {

  return {
    id,

    originalSpend:
      result?.originalSpend ||
      result?.totalMonthlySpend || 0,

    optimizedSpend:
      result?.optimizedSpend || 0,

    monthlySavings:
      result?.monthlySavings ||
      result?.estimatedWasteMonthly || 0,

    yearlySavings:
      result?.yearlySavings ||
      result?.estimatedWasteYearly || 0,

    savingsPercentage:
      result?.savingsPercentage ||
      result?.potentialSavingsPercentage || 0,

    optimizationScore:
      result?.optimizationScore || 70,

    productivityRisk:
      result?.productivityRisk || "Low",

    warnings:
      result?.warnings || [],

    summary:
      result?.summary ||
      "AI optimization analysis completed.",

    recommendations:
      result?.recommendations || [],

    tools:
      result?.tools || [],
  };
}