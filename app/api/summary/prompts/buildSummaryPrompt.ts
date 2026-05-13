//prompt builder
export default function buildSummaryPrompt(
  yearlySpend: number,
  waste: number,
  recommendations: any[]
) {

  const formattedRecommendations =
    recommendations.length
      ? recommendations
          .map(
            (r: any) =>
              `- ${r.title}: ${r.description}`
          )
          .join("\n")
      : "- No major optimization recommendations detected.";

  //final prompt
  return `
You are an expert AI SaaS optimization consultant.

Generate a concise executive summary for a company AI infrastructure audit.

Requirements:
- professional tone
- executive-friendly
- concise
- under 150 words
- mention savings opportunity
- explain major inefficiencies
- summarize key recommendation impact

Company AI Spend:
$${yearlySpend}

Optimization Opportunity:
${waste}%

Recommendations:
${formattedRecommendations}
`;
}