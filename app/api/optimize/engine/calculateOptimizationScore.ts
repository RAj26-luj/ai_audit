import type { Recommendation } from "../types/Recommendation";

//score calculator
export default function calculateOptimizationScore({
  originalSpend,
  savings,
  recommendations,
}: {
  originalSpend: number;
  savings: number;
  recommendations: Recommendation[];
}) {

 //default score
  if (originalSpend <= 0) {
    return 95;
  }

  const wasteRatio =
    savings / originalSpend;

  let score = 100;

 //reduce by waste
  score -= wasteRatio * 45;

   //many issues
  if (recommendations.length >= 6) {
    score -= 10;
  }

  //enterprise misuse
  const hasEnterpriseDowngrade =
    recommendations.some(
      (r) =>
        r.title.toLowerCase().includes("enterprise") ||
       r.description.toLowerCase().includes("enterprise")
    );

  if (hasEnterpriseDowngrade) {
    score -= 12;
  }

 //final score
  return Math.max(
    35,
    Math.min(98, Math.round(score))
  );
}