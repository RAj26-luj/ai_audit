# Persistent Re-Audit System

## What this PR does

This PR adds a persistent re-audit workflow to StackAudit.

Completed audits are now stored with pricing snapshots and can automatically be re-evaluated when AI tool pricing changes. Users receive email notifications and can compare their original audit against updated recommendations through a compare view.

The implementation adds:
- persistent audit storage
- pricing snapshot persistence
- automated re-audit detection
- email notifications
- compare-page generation
- pricing update tracking

---

## Why

AI pricing changes frequently and static audits lose value quickly once provider pricing changes.

The goal of this PR was to make audits persistent and “live” instead of one-time reports. I assumed users would care more about being notified when their stack becomes inefficient again than only seeing a snapshot once.

I prioritized:
- end-to-end functionality
- reviewer-verifiable flows
- production-safe implementation
- minimal additional infrastructure

---

## How it works

### Audit persistence

Every completed audit now stores:
- audit input JSON
- generated recommendations
- pricing snapshot
- pricing version
- user email
- timestamps

Files:
- `app/api/optimize/route.ts`
- `lib/db/saveAudit.ts`

---

### Pricing simulation

Implemented:

```bash
POST /api/simulate-price-change
```

This mutates pricing inside `TOOLS_CONFIG` to simulate real-world pricing updates.

File:
- `app/api/simulate-price-change/route.ts`

---

### Re-audit detection

Implemented:

```bash
POST /api/detect-changes
```

The endpoint:
- loads stored audits
- compares stored pricing snapshots against current pricing config
- regenerates recommendations
- stores updated audit results
- sends email notifications

File:
- `app/api/detect-changes/route.ts`

---

### Compare flow

Implemented:

```bash
/audit/[id]/compare
```

This page shows:
- original recommendations
- updated recommendations
- savings deltas
- pricing impact changes

File:
- `app/audit/[id]/compare/page.tsx`

---

### Notification workflow

Users receive pricing change emails containing:
- pricing change summary
- compare-page link
- updated audit notification

Provider:
- Brevo SMTP API

File:
- `lib/email/sendAuditEmail.ts`

---

### Public pricing updates page

Implemented:

```bash
/changes
```

This acts as a lightweight public pricing update feed for reviewer visibility and debugging.

File:
- `app/changes/page.tsx`

---

## What I cut

- No unsubscribe workflow for notification emails
- No batched/queued background re-audit processing
- No admin analytics dashboard
- No semantic recommendation diff engine
- No retry queue infrastructure for failed notifications

I prioritized shipping a complete and reliable end-to-end workflow over adding more infrastructure complexity.

---

## How to test it manually

### 1. Create an audit

Open:

```bash
https://ai-audit-kappa.vercel.app
```

Create an audit and save it with your own email.

Expected:
- audit saved successfully
- redirected to audit page

---

### 2. Trigger pricing changes

Run:

```bash
curl -X POST https://ai-audit-kappa.vercel.app/api/simulate-price-change
```

Expected:
- pricing version increments
- pricing values mutate

Example response:

```json
{
  "success": true,
  "pricingVersion": 2
}
```

---

### 3. Trigger re-audit detection

Run:

```bash
curl -X POST https://ai-audit-kappa.vercel.app/api/detect-changes
```

Expected:
- changed audits returned
- updated recommendations generated
- email notifications triggered

Example:

```json
{
  "success": true,
  "changedAudits": [
    {
      "auditId": "...",
      "email": "reviewer@email.com"
    }
  ],
  "total": 1
}
```

---

### 4. Verify compare page

Open:

```bash
https://ai-audit-kappa.vercel.app/audit/[auditId]/compare
```

Expected:
- original recommendations shown
- updated recommendations shown
- savings delta visible

---

### 5. Verify email delivery

Use the same email entered during audit creation.

After running:

```bash
curl -X POST https://ai-audit-kappa.vercel.app/api/detect-changes
```

Expected:
- pricing change email received
- compare link works correctly
- old price → new price shown in email

---

### 6. Verify pricing updates page

Open:

```bash
https://ai-audit-kappa.vercel.app/changes
```

Expected:
- pricing change feed visible
- simulated updates displayed

---

## What's tested

Tested manually:
- audit persistence
- lead capture flow
- pricing snapshot storage
- pricing mutation simulation
- snapshot diff detection
- re-audit generation
- compare-page rendering
- email delivery
- production deployment behavior
- Supabase persistence
- cron compatibility

I did not add automated integration tests due to time constraints.

If I extended testing further, I would first add:
- snapshot diff detection tests
- compare-page rendering tests
- persistence consistency tests
- email workflow integration tests

---

## Open questions / risks

- Re-audit processing is synchronous and would need queue infrastructure at larger scale
- Pricing simulation currently mutates local config instead of consuming external provider APIs
- Notification delivery currently does not support retries or batching