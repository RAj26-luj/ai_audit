# ROUND 2 DEVLOG

## 2026-05-20 10:00 - Start

Read the assignment carefully before coding.

Main decision:
focus on building a real persistent re-audit workflow instead of only UI polish.

Goals:
- persistent audit storage
- automated re-audit detection
- production-safe deployment
- reviewer-verifiable testing

Spent initial time planning architecture and identifying the smallest reliable implementation.

---

## 2026-05-20 10:40 - Decided implementation approach

Chose:
- Supabase for persistence
- Vercel deployment
- Vercel Cron for scheduling
- existing Round 1 audit engine as foundation

Decided to extend the current architecture instead of rewriting the audit pipeline from scratch.

Wanted to avoid:
- regression risk
- duplicated logic
- unnecessary infrastructure complexity

---

## 2026-05-20 11:30 - Persistent audits working

Integrated audit persistence into the optimization flow.

Each audit now stores:
- audit input
- recommendations
- pricing snapshot
- pricing version
- timestamps
- user email

First major issue:
payload inconsistencies between `stack` and `tools`.

Spent time normalizing audit input formats.

---

## 2026-05-20 12:20 - Built compare flow

Implemented:

```bash
/audit/[id]/compare
```

Focused on:
- readable recommendation comparison
- savings delta visibility
- preserving historical audit output

Initially kept the UI intentionally simple to reduce instability during deployment testing.

---

## 2026-05-20 13:00 - Re-audit detection endpoint

Implemented:

```bash
POST /api/detect-changes
```

The endpoint:
- loads stored audits
- checks pricing changes
- regenerates recommendations
- stores updated audit results
- triggers notifications

Initially implemented pricing-version comparison only.

---

## 2026-05-20 13:45 - Email workflow integration

Integrated Resend first for email delivery.

Local testing worked, but production testing exposed:
- delivery inconsistencies
- validation failures
- repeated rate-limit issues during simulations

Lost significant time debugging provider behavior.

---

## 2026-05-20 14:30 - Migrated to Brevo

Switched notification delivery to Brevo SMTP API.

This stabilized:
- production delivery
- rapid testing
- repeated re-audit notifications

Implemented:
- pricing change alerts
- compare-page links
- audit-specific notifications

---

## 2026-05-20 15:15 - Production debugging

Large amount of time spent debugging deployment-specific issues.

Resolved:
- TypeScript build failures
- undefined pricing fields
- payload normalization bugs
- deployment-only runtime behavior
- Supabase persistence inconsistencies

Biggest issue:
local behavior differed from deployed production behavior.

---

## 2026-05-20 16:00 - Cron scheduling blocker

Initially configured:

```json
{
  "path": "/api/detect-changes",
  "schedule": "0 */6 * * *"
}
```

Deployment exposed Hobby plan cron limitations because Hobby only supports daily execution.

Adjusted scheduling implementation to remain compatible with deployment constraints.

Lost time here but kept the automation flow functional.

---

## 2026-05-20 16:45 - Lead persistence bugs

Discovered several persistence issues during end-to-end testing:
- audit email not syncing correctly
- team size storing incorrectly
- stale NULL audit rows
- inconsistent lead linkage

Spent significant time debugging state synchronization between:
- lead modal
- audit persistence
- Supabase updates

These bugs only appeared during full workflow testing.

---

## 2026-05-20 17:30 - Snapshot diff refactor

Realized version comparison alone was not enough.

Refactored detection logic to compare:
- stored pricing snapshots
vs
- current pricing configuration

This fixed real pricing-change detection behavior.

One of the most important architecture fixes during implementation.

---

## 2026-05-20 18:15 - Real pricing mutation simulation

Implemented actual pricing mutation logic instead of fake version increments.

Added:

```bash
POST /api/simulate-price-change
```

This allowed:
- real snapshot diffs
- realistic re-audit triggering
- compare-page validation
- notification testing

At this point the re-audit workflow finally worked end-to-end.

---

## 2026-05-20 19:15 - Added pricing updates page

Implemented:

```bash
/changes
```

Purpose:
- reviewer visibility
- easier debugging
- bonus feature support
- visual verification of pricing mutations

Wanted reviewers to immediately see pricing updates without needing database access.

---

## 2026-05-20 20:00 - Documentation pass

Spent significant time improving:
- PR structure
- reviewer testing instructions
- reflection notes
- engineering tradeoff explanations
- deployment validation steps

Focused heavily on making the project:
- easy to review quickly
- easy to validate
- easy to reason about

---

## 2026-05-20 21:00 - Final production validation

Validated:
- audit persistence
- lead capture
- compare flows
- pricing simulations
- snapshot diff detection
- email delivery
- production deployment
- cron compatibility

Used terminal testing heavily with:
- curl
- deployed endpoints
- Supabase validation
- production verification

Final cleanup included:
- removing stale audit rows
- fixing snapshot synchronization
- validating compare-page correctness

---

## 2026-05-21 09:00 - Final review

Did final pass on:
- documentation quality
- reviewer testing flow
- deployment stability
- compare-page correctness
- production API behavior

Checked:
- clean git state
- successful production build
- deployed endpoint behavior
- reviewer verification flow

Project ready for submission.

---

## 2026-05-21 17:00 - Submission

Final review completed.

Submitted:
- persistent re-audit system
- pricing snapshot persistence
- snapshot diff detection
- compare-page workflow
- email notifications
- production deployment
- reviewer testing instructions
- engineering reflections
- development log