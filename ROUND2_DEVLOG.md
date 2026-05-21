# ROUND 2 DEVLOG

## Hour 1 — Persistent audit storage

Integrated Supabase persistence into the existing audit pipeline.

Each completed audit now stores:

- audit input JSON
- audit output JSON
- pricing snapshot
- pricing version
- user email
- timestamps

Focused on extending the existing Round 1 architecture cleanly instead of rewriting audit generation logic.

---

## Hour 1.5 — Pricing change detection

Implemented `/api/detect-changes`.

The endpoint:

- loads stored audits
- compares pricing versions/snapshots
- identifies stale audits
- triggers notification workflow

Used deterministic snapshot comparison instead of semantic recommendation diffing to keep the system explainable and easier to debug.

---

## Hour 2 — Compare/re-audit flow

Built compare page support using:

`/audit/[id]/compare`

Focused on:

- readable comparison flow
- recommendation visibility
- savings comparison
- preserving audit history

Skipped advanced visual diffing in favor of a simpler production-safe implementation.

---

## Hour 2.5 — Email notification system

Initially integrated Resend for transactional emails.

During production testing, repeated simulations exposed:

- validation failures
- rate-limit issues
- inconsistent delivery behavior

Migrated the notification workflow to Brevo SMTP API for more reliable delivery during the assignment timeline.

Implemented:

- notification emails
- compare links
- grouped user notifications

---

## Hour 3 — Production hardening

Major debugging work focused on stabilizing production builds.

Resolved issues including:

- payload normalization mismatches (`stack` vs `tools`)
- pricing field inconsistencies
- strict TypeScript failures
- undefined tool properties
- server-side initialization behavior
- deployment-specific runtime issues

Normalized audit input so pricing calculations behave consistently between local and deployed environments.

---

## Hour 3.5 — Scheduling automation

Added Vercel Cron configuration:

```json
{
  "crons": [
    {
      "path": "/api/detect-changes",
      "schedule": "0 */6 * * *"
    }
  ]
}