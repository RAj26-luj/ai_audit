# Round 2 — Persistent Re-Audit System

## What this PR does

This PR extends the existing StackAudit codebase with a persistent re-audit workflow that keeps AI spend recommendations up to date when tooling prices change.

The system now:

- stores completed audits in Supabase
- stores pricing snapshots used during audit generation
- detects pricing changes against stored snapshots
- supports automated re-audit detection
- sends notification emails to affected users
- supports compare/re-audit flows
- includes scheduled cron-based monitoring

The implementation focuses on shipping a reliable end-to-end workflow within the assignment constraints.

---

# Why

AI tooling prices change frequently.

A one-time audit quickly becomes stale, especially for startups actively optimizing AI spend.

This system keeps audits useful over time by:

- persisting audit history
- detecting outdated recommendations
- notifying users automatically
- allowing re-audit comparison flows

---

# Architecture

## Persistent audit storage

Completed audits are stored in Supabase with:

- audit input JSON
- audit result JSON
- pricing snapshot
- pricing version
- user email
- timestamps

---

## Pricing-change detection

A detection endpoint:

POST /api/detect-changes

checks stored pricing snapshots against the current pricing configuration.

Current implementation uses pricing version + snapshot comparison to determine whether an audit has become stale.

---

## Email notification flow

When pricing changes affect saved audits:

- affected audits are detected
- users receive notification emails using Brevo SMTP API
- emails include direct compare/re-audit links

To avoid spam, notifications are grouped per user instead of per audit.

---

## Compare page

New compare route:

/audit/[id]/compare

allows users to revisit previous audits and compare updated recommendations.

The compare workflow highlights:

- updated savings
- changed recommendations
- new optimization opportunities

---

# Scheduling

A Vercel cron job now automatically triggers:

/api/detect-changes

every 6 hours.

This keeps saved audits continuously monitored without manual intervention.

---

# Engineering decisions

I intentionally optimized for:

- reliability
- shipping speed
- minimal infrastructure complexity
- extending the existing Round 1 architecture cleanly

instead of introducing heavy background processing systems.

---

# What I intentionally cut

To prioritize a complete working workflow within the time constraint, I intentionally skipped:

- real external pricing APIs
- advanced semantic diff engine
- retry queue infrastructure
- unsubscribe preferences UI
- historical pricing analytics
- admin dashboard metrics
- advanced visual comparison UI

The current implementation is designed so these can be added incrementally later.

---

# Major debugging challenges

## Pricing normalization bug

The optimize endpoint originally expected `stack`, while frontend/test payloads used `tools`.

This caused audits to save successfully but produce zero savings calculations.

Fixed by:

- supporting both `stack` and `tools`
- normalizing pricing fields
- standardizing `monthlyPrice`, `monthlyCost`, and `pricePerSeat`

---

## Email provider migration

Initial implementation used Resend but encountered validation and rate-limit issues during testing.

Migrated to Brevo SMTP API for more reliable delivery during the assignment window.

---

## TypeScript migration cleanup

Several rule engines assumed fields were always defined.

Refactored audit logic to safely handle optional pricing + seat fields and standardized Tool typing across rules.

---

# How to test manually

## 1. Generate an audit

Use the app normally and submit an audit.

Confirm the audit row appears in Supabase.

---

## 2. Trigger pricing change

Call:

```bash
curl -X POST https://ai-audit-kappa.vercel.app/api/simulate-price-change