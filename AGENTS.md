# Agents

## Audit Engine

The audit engine is responsible for:
- analyzing AI tool stacks
- calculating monthly and yearly spend
- detecting overlap between tools
- generating optimization recommendations
- estimating productivity risk

The current implementation is primarily rule-based for deterministic outputs.

---

## AI Summary Agent

The AI summary system generates short executive summaries for audit reports.

Responsibilities:
- summarize savings opportunities
- explain optimization recommendations
- generate readable business-focused insights

Fallback summaries are used when external AI APIs fail.

---

## Recommendation Logic

Recommendation generation currently supports:
- plan downgrade suggestions
- seat reduction suggestions
- overlap detection
- savings calculations

Future versions may support:
- usage-aware recommendations
- benchmark-based optimization
- organization-wide analysis

---

## Future Agent Ideas

Potential future agents:
- benchmarking agent
- AI ROI analysis agent
- seat utilization agent
- pricing trend analysis agent
- subscription anomaly detection