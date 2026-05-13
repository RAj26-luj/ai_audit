export default function fallbackSummary(
  yearlySpend: number,
  waste: number
) {

  return `
Your organization currently spends approximately $${yearlySpend?.toLocaleString()} annually on AI tooling.

The audit identified optimization opportunities across overlapping subscriptions, pricing inefficiencies, and seat allocation.

An estimated ${waste}% reduction in AI spend may be achievable while maintaining productivity and workflow quality.
`.trim();
}