# Metrics

## North Star Metric

The primary metric for StackAudit is:

**Completed audits per week that capture a lead**

This metric matters because the product is fundamentally a lead-generation tool for Credex. A completed audit alone is not valuable unless the user also shares contact information after receiving value from the report.

---

## Input Metrics

### 1. Audit Completion Rate

Percentage of users who finish the full audit flow after landing on the site.

This measures:
- onboarding clarity
- UX quality
- form friction
- perceived value

---

### 2. Lead Capture Rate

Percentage of completed audits that convert into captured leads.

This measures:
- trust in the product
- perceived usefulness
- report quality
- effectiveness of the value-before-email flow

---

### 3. Share Rate

Percentage of audits shared publicly through the generated report URL.

This measures:
- virality potential
- screenshot/share quality
- usefulness of the final report

---

## What I Would Instrument First

The first analytics events I would track:

- landing page visits
- audit started
- audit completed
- lead submitted
- report shared
- PDF exported
- Credex CTA clicked

These events provide visibility into the full conversion funnel.

---

## Pivot Decision

A pivot would be considered if:
- audit completion rate stays below 25%
- lead conversion remains below 10%
- users complete audits but do not share reports
- optimization recommendations fail to produce meaningful savings

This would suggest the product is not generating enough real value for users.