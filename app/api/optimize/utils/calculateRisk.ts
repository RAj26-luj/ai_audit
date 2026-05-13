import type {
  ProductivityRisk,
  Recommendation,
} from "../types/Recommendation";

//risk calc
export default function calculateRisk(
  recommendations: Recommendation[]
): ProductivityRisk {

  let risk: ProductivityRisk = "Low";

  const highRiskCount =
    recommendations.filter(
      (r) => r.productivityRisk === "High"
    ).length;

  const mediumRiskCount =
    recommendations.filter(
      (r) => r.productivityRisk === "Medium"
    ).length;

  if (highRiskCount >= 1) {
    risk = "High";
  } else if (mediumRiskCount >= 2) {
    risk = "Medium";
  }

  return risk;
}