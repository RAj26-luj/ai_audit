import { useEffect, useMemo, useState } from "react";
import { MOCK_AUDIT } from "../data/mockAudit";
import type { AuditResult, Tool } from "../types";
import { optimizeAudit } from "../services/optimizeAudit";

export function useOptimizer(audit: AuditResult = MOCK_AUDIT) {

  const initialTools = useMemo(
    () => JSON.parse(JSON.stringify(audit.tools || [])),
    [audit.tools]
  );

  const [currentTools, setCurrentTools] = useState<Tool[]>(initialTools);
  const [optimizedStack, setOptimizedStack] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [enabled, setEnabled] = useState<string[]>([]);
  const [optimizedSpend, setOptimizedSpend] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [productivityRisk, setProductivityRisk] = useState("Low");
  const [loading, setLoading] = useState(false);

  const originalSpend = initialTools.reduce(
    (acc: number, tool: Tool) =>
      acc + (tool.pricePerSeat || 0) * (tool.seats || 0),
    0
  );

  const runOptimization = async (stack: Tool[], enabledIds: string[]) => {
    try {
      setLoading(true);

      const data = await optimizeAudit({
        stack,
        enabledRecommendations: enabledIds,
      });

      setCurrentTools(Array.isArray(stack) ? stack : []);
      setOptimizedStack(Array.isArray(data.optimizedStack) ? data.optimizedStack : []);
      setRecommendations(Array.isArray(data.recommendations) ? data.recommendations : []);
      setOptimizedSpend(Number(data.optimizedSpend) || 0);
      setMonthlySavings(Number(data.monthlySavings) || 0);
      setProductivityRisk(data.productivityRisk || "Low");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await optimizeAudit({
          stack: initialTools,
          enabledRecommendations: [],
        });

        const allIds = Array.isArray(data.recommendations)
          ? data.recommendations.map((r: any) => r.id)
          : [];

        setEnabled(allIds);
        await runOptimization(initialTools, allIds);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [initialTools]);

  const handleStackChange = (updatedTools: Tool[]) =>
    runOptimization(updatedTools, enabled);

  const handleToggle = (id: string) => {
    const updated = enabled.includes(id)
      ? enabled.filter((x) => x !== id)
      : [...enabled, id];

    setEnabled(updated);
    runOptimization(currentTools, updated);
  };

  const resetToRecommended = async () => {
    try {
      const data = await optimizeAudit({
        stack: initialTools,
        enabledRecommendations: [],
      });

      const allIds = Array.isArray(data.recommendations)
        ? data.recommendations.map((r: any) => r.id)
        : [];

      setEnabled(allIds);
      await runOptimization(initialTools, allIds);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    currentTools,
    optimizedStack,
    recommendations,
    enabled,
    optimizedSpend,
    monthlySavings,
    productivityRisk,
    loading,
    originalSpend,
    handleStackChange,
    handleToggle,
    resetToRecommended,
  };
}