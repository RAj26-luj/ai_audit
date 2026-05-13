# Claude Notes

## Purpose

This document describes how AI models are used within StackAudit, specifically for generating summaries and enhancing report readability.

It focuses on the role of LLMs in the system rather than core business logic.

---

## AI Usage in the System

AI is used only for narrative and explanation purposes, including:

- generating executive summaries
- translating structured audit results into readable insights
- improving clarity of optimization reports

The actual audit computation layer remains fully rule-based to ensure deterministic and explainable financial outputs.

---

## Why AI Is Limited

AI is intentionally not used for financial decision-making or core calculations.

This design choice ensures:

- consistent and repeatable outputs across runs
- explainable recommendations tied to deterministic rules
- reduced dependency on external model behavior
- resilience against API instability or rate limits

---

## Provider Experiments

During development, multiple LLM providers were evaluated, including:

- OpenAI
- Google Gemini
- HuggingFace models
- OpenRouter

The final system uses lightweight AI calls only for summary generation rather than full-stack reasoning.

This keeps the system fast, stable, and cost-efficient.

---

## Fallback Strategy

To ensure reliability, the system includes fallback behavior when AI services fail.

Fallbacks are triggered when:

- API requests fail or timeout
- rate limits are exceeded
- invalid or incomplete responses are returned
- external providers are unavailable

In such cases, predefined summary templates are used so the user experience remains uninterrupted.

---

## Future Improvements

Planned enhancements for AI usage include:

- benchmarking-based summaries across organizations
- deeper usage-aware optimization explanations
- AI-assisted forecasting of potential savings
- richer executive-level reporting layers