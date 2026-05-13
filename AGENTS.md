# Agents

This document describes the core system components that power StackAudit.  
While they are referred to as agents, most of the current implementation is rule-based and deterministic to ensure consistency, explainability, and stable financial outputs.

---

## Audit Engine

The Audit Engine is the core system responsible for analyzing an AI tool stack and producing structured optimization insights.

It handles:

- Calculating monthly and yearly spend across tools
- Detecting inefficiencies such as overlapping tools, underutilized seats, and inefficient plans
- Generating optimization recommendations based on rule-based logic
- Estimating productivity risk when changes are applied

The implementation is intentionally rule-based so that outputs remain:
- deterministic
- explainable
- consistent across runs

This is important because financial recommendations need to be predictable and auditable.

---

## AI Summary Agent

The AI Summary Agent converts structured audit results into human-readable summaries.

Its role is limited to narration and explanation, not decision-making.

It is responsible for:
- summarizing key savings opportunities
- explaining optimization results in simple business language
- generating executive-friendly summaries from structured data

If external AI services fail, the system falls back to predefined templates to ensure reliability.

---

## Recommendation Logic

The recommendation system generates actionable optimization suggestions based on detected inefficiencies.

It currently supports:

- plan downgrade recommendations (for cost optimization)
- seat reduction suggestions for underutilized tools
- tool overlap detection and consolidation opportunities
- estimated monthly and yearly savings per recommendation

Each recommendation is designed to be:
- traceable to a specific rule
- tied to a measurable cost impact
- understandable without technical knowledge

---

## Future Agent Ideas

Planned improvements include additional intelligence layers such as:

- benchmarking across similar companies
- AI ROI analysis comparing cost vs productivity impact
- seat utilization analysis based on usage behavior
- pricing trend tracking across tools and vendors
- anomaly detection for unusual spending patterns

These enhancements will gradually move the system from rule-based optimization toward adaptive, usage-aware financial intelligence.