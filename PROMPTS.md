# Prompts

## Executive Summary Prompt

The AI summary system receives:
- yearly spend
- estimated waste
- optimization score
- recommendations
- savings opportunities

The model is prompted to generate:
- a short professional summary
- under 120 words
- focused on cost optimization and efficiency
- easy for non-technical teams to understand

## Prompt Design Decisions

The prompts were intentionally kept simple and structured because:
- shorter prompts produced more stable outputs
- external AI APIs were inconsistent
- overly complex prompts increased hallucinations
- concise summaries worked better for report readability

## Fallback Handling

Fallback summaries are used when:
- AI APIs fail
- rate limits are hit
- responses are invalid
- external providers become unavailable

## Why Rule-Based Auditing Was Used

The audit calculations themselves are rule-based instead of AI-generated because:
- financial calculations require deterministic outputs
- optimization logic should remain explainable
- recommendations need consistent scoring
- rule-based systems are easier to test and debug