# Prompts

## Executive Summary Prompt

The AI summary feature generates a short business-focused explanation of the audit results.

---

## Main Prompt

```txt
You are generating an executive summary for a startup AI spend audit.

Inputs:
- yearly AI spend
- estimated waste percentage
- optimization recommendations
- potential savings

Requirements:
- keep the summary under 120 words
- professional and concise tone
- explain the biggest optimization opportunities
- avoid exaggerated claims
- make it understandable for non-technical founders
- focus on cost efficiency and operational clarity
```

---

## Why I Designed It This Way

The prompt was intentionally kept:
- short
- structured
- deterministic

Short prompts produced more stable outputs across different LLM providers.

The summaries only need to:
- explain savings opportunities
- summarize recommendations
- improve readability of the report

The audit calculations themselves remain rule-based.

---

## What I Tried That Did Not Work

### Overly Long Prompts

Long prompts caused:
- inconsistent formatting
- hallucinated recommendations
- exaggerated financial claims
- repetitive summaries

---

### Fully AI-Generated Audits

Using AI for the actual audit logic performed poorly because:
- calculations became inconsistent
- recommendations were difficult to verify
- financial reasoning was unreliable

Rule-based calculations worked much better for deterministic audit results.

---

## Failure Handling

Fallback summaries are used when:
- API requests fail
- rate limits occur
- invalid responses are returned
- external AI providers become unavailable

This ensures the app remains usable even without AI responses.

---

## Providers Tested

During development, the following providers were tested:
- OpenAI
- Gemini
- HuggingFace
- OpenRouter

The final implementation focuses only on lightweight AI summaries instead of AI-generated financial logic.