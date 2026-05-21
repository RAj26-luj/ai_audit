# ROUND 2 DEVLOG

## Hour 1 — Persistent audit storage

Integrated Supabase persistence directly into the existing audit pipeline.

Each completed audit now stores:

- audit input JSON
- generated recommendations
- pricing snapshot
- pricing version
- user email
- timestamps

Implemented:
- persistent audit storage
- audit retrieval
- audit linking
- audit history support

Primary focus:
- extend existing Round 1 architecture cleanly
- avoid unnecessary rewrites
- preserve deployment stability

Files:
- `app/api/optimize/route.ts`
- `lib/db/saveAudit.ts`

---

## Hour 1.5 — Pricing change detection

Implemented:

```bash
POST /api/detect-changes
```

The endpoint:

- loads persisted audits
- compares stored pricing snapshots
- detects stale audits
- regenerates recommendations
- stores updated audit results
- triggers notification workflows

Initially implemented version-based detection, then refactored to true snapshot diff comparison after production validation.

Focused on:
- deterministic detection
- explainable behavior
- reviewer-verifiable flows
- low infrastructure complexity

Files:
- `app/api/detect-changes/route.ts`

---

## Hour 2 — Pricing simulation infrastructure

Implemented:

```bash
POST /api/simulate-price-change
```

The endpoint mutates pricing inside `TOOLS_CONFIG` to simulate real-world AI pricing changes.

Used this flow to validate:
- stale audit detection
- re-audit generation
- comparison rendering
- email notifications
- persistence synchronization

Files:
- `app/api/simulate-price-change/route.ts`
- `data/tools.ts`

---

## Hour 2.5 — Compare/re-audit experience

Built compare page support using:

```bash
/audit/[id]/compare
```

Focused on:
- readable comparison layout
- recommendation visibility
- savings comparison
- audit history preservation
- production-safe rendering

Implemented:
- old vs updated recommendation views
- savings delta calculation
- updated audit visualization

Skipped advanced visual diff tooling in favor of a simpler and more reliable implementation.

Files:
- `app/audit/[id]/compare/page.tsx`

---

## Hour 3 — Email notification workflow

Initially integrated Resend for transactional email delivery.

During production testing, repeated audit simulations exposed:
- validation instability
- delivery inconsistencies
- rate-limit problems

Migrated notification delivery to Brevo SMTP API for improved reliability during deployment validation.

Implemented:
- pricing change notifications
- compare-page links
- pricing delta visibility
- audit-specific notifications

Files:
- `lib/email/sendAuditEmail.ts`

---

## Hour 3.5 — Lead capture + persistence fixes

Several persistence inconsistencies surfaced during end-to-end testing.

Resolved issues including:
- lead email synchronization
- audit email persistence
- team size persistence
- stale NULL audit rows
- inconsistent payload formats

Refactored the lead capture flow to ensure:
- audit persistence remains correct
- lead metadata syncs properly
- compare flows remain stable

Files:
- `hooks/useHomeAudit.ts`
- `components/lead-modal/*`
- `app/api/lead/route.ts`

---

## Hour 4 — Production hardening

Major debugging effort focused on stabilizing production builds and deployment behavior.

Resolved issues including:
- payload normalization mismatches (`stack` vs `tools`)
- pricing field inconsistencies
- undefined tool properties
- strict TypeScript failures
- server-side initialization behavior
- deployment-specific runtime bugs
- snapshot synchronization issues

Normalized audit inputs to ensure pricing calculations behave consistently between local and deployed environments.

Focused heavily on:
- deterministic production behavior
- deployment-safe data handling
- reviewer reproducibility

---

## Hour 4.5 — Scheduling automation

Added Vercel Cron configuration for automated re-audit checks.

Initially attempted:

```json
{
  "path": "/api/detect-changes",
  "schedule": "0 */6 * * *"
}
```

Production deployment exposed Vercel Hobby plan cron limitations because Hobby plans only allow daily cron execution.

Adjusted the implementation to a once-per-day schedule to remain fully compatible with Hobby deployment constraints while preserving automated re-audit functionality.

Files:
- `vercel.json`

## Hour 5 — Public pricing updates page

Implemented:

```bash
/changes
```

Added a lightweight public pricing update feed showing simulated AI pricing changes.

Purpose:
- reviewer visibility
- easier validation
- clearer demonstration of pricing mutations

Files:
- `app/changes/page.tsx`

---

## Hour 5.5 — End-to-end production validation

Validated complete workflow in deployed production environment:

- audit creation
- persistence
- lead capture
- pricing simulation
- snapshot diff detection
- re-audit generation
- email delivery
- compare page rendering
- public pricing updates page
- production cron compatibility

Final validation included:
- Supabase persistence checks
- deployment verification
- API testing through terminal
- compare-page correctness
- email delivery testing
- stale audit cleanup

The final implementation now supports a complete persistent re-audit workflow with production deployment validation.