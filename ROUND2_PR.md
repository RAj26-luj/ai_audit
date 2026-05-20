# Round 2 — Persistent Re-Audit System

## What this PR does

This PR adds a persistent AI audit re-check system to StackAudit.

The system now:

- stores completed audits in Supabase
- stores pricing snapshots used during audit generation
- detects pricing changes against stored snapshots
- supports re-audit comparison pages
- triggers email notifications when recommendations change

The implementation focuses on reliability and simplicity over infrastructure complexity.

---

## Why

AI pricing changes frequently.

Teams making optimization decisions based on stale pricing data can lose savings opportunities or receive outdated recommendations.

This system allows StackAudit to:

- persist audit history
- compare old vs new recommendations
- notify users when pricing changes affect optimization opportunities

---

## How it works

### 1. Persistent audit storage

Completed audits are stored in Supabase with:

- audit input
- audit result
- pricing snapshot
- email
- timestamp

---

### 2. Pricing snapshot comparison

A new endpoint:

`POST /api/detect-changes`

checks all stored audits against current pricing configuration.

Current implementation uses simple JSON snapshot comparison.

---

### 3. Email notifications

When pricing changes are detected:

- affected audits are identified
- notification emails are triggered using Resend
- users receive a compare link

---

### 4. Compare page

New route:

`/audit/[id]/compare`

Displays stored recommendations and savings information.

---

## What I intentionally cut

To prioritize shipping a reliable end-to-end flow within time constraints, I intentionally skipped:

- cron infrastructure
- unsubscribe flow
- advanced diff engine
- semantic recommendation comparison
- queue system
- retry infrastructure
- background jobs
- pricing versioning system
- historical pricing timeline
- advanced dashboard UI

The system is designed to be cron-compatible later.

---

## How to test manually

### Create audit

Run:

```bash
curl -X POST http://localhost:3000/api/optimize \
-H "Content-Type: application/json" \
-d '{...}'