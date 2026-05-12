# Claude Notes

## Purpose

This document contains notes related to AI-generated summaries and LLM usage inside StackAudit.

---

## AI Usage

AI is used primarily for:
- executive summaries
- readable optimization explanations
- report enhancement

The core audit calculations themselves remain rule-based.

---

## Why AI Was Limited

The project intentionally avoids depending entirely on LLMs for financial calculations because:
- deterministic outputs are important
- financial recommendations should remain explainable
- AI responses can become inconsistent
- external APIs may fail or rate limit

---

## API Experiments

Different providers were tested during development, including:
- OpenAI
- Gemini
- HuggingFace
- OpenRouter

The final implementation focuses on lightweight summary generation instead of full AI-driven auditing.

---

## Fallback Strategy

Fallback summaries are generated when:
- API requests fail
- rate limits occur
- providers become unavailable
- invalid responses are returned

This ensures the application remains functional even without AI responses.

---

## Future Improvements

Potential future improvements:
- benchmarking summaries
- organization-wide optimization reports
- usage-aware AI recommendations
- AI-generated savings forecasting