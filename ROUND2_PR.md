# Persistent Re-Audit System

## What this PR does

This PR adds a persistent re-audit workflow to StackAudit.

Audits are now stored in Supabase with their pricing snapshot and can be automatically re-evaluated when AI tool pricing changes. Users receive email alerts and can compare their original audit against the updated recommendations through a diff view.

The system supports:
- persistent audit storage
- pricing change detection
- automated re-audit generation
- email notifications
- audit comparison UI

---

## Why

AI pricing changes frequently and static audits become outdated quickly.

A one-time audit is useful initially, but loses value once providers change pricing or plans. This PR keeps audits live by detecting pricing changes and regenerating recommendations automatically.

I optimized for:
- end-to-end functionality
- reviewer-verifiable flows
- extending the existing Round 1 architecture cleanly
- minimum additional infrastructure

---

## How it works

### Audit persistence

Every completed audit is now stored in Supabase with:
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

### Pricing change simulation

A manual endpoint was added to simulate AI pricing updates:

```bash
POST /api/simulate-price-change

## Reviewer quick verification

### 1. Create a real audit

Open:

https://ai-audit-kappa.vercel.app

Create an audit and save it with your own email.

Expected:
- audit saved successfully
- redirected to audit page

---

### 2. Trigger pricing change

Run:

```bash
curl -X POST https://ai-audit-kappa.vercel.app/api/simulate-price-change
```

Expected:
- pricing version increments
- pricing values mutate

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

https://ai-audit-kappa.vercel.app/audit/[auditId]/compare

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

https://ai-audit-kappa.vercel.app/changes

Expected:
- pricing change feed visible
- simulated updates displayed