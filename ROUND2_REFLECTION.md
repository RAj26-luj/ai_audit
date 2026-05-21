# Engineering Tradeoffs

## Build on existing architecture instead of rewriting

I intentionally extended the existing Round 1 architecture instead of rebuilding the audit engine or introducing a separate microservice structure.

This reduced regression risk, preserved deployment stability, and allowed faster iteration under the assignment timeline.

---

## Why pricing-version + snapshot comparison

Instead of building a semantic recommendation diff engine, I used pricing snapshot storage combined with pricing-version comparison.

This approach is:

- deterministic
- easy to debug
- reviewer-friendly
- reliable under deployment constraints

It also keeps the re-audit system explainable since recommendation invalidation can always be traced back to a pricing change.

---

## Why scheduled cron over external job infrastructure

I used Vercel Cron Jobs instead of introducing queues or background worker systems.

This kept the implementation:

- lightweight
- deployable in the existing stack
- production-compatible
- simple for reviewers to validate

The cron job triggers `/api/detect-changes` every 6 hours.

---

## Reliability over infrastructure complexity

I intentionally prioritized:

- stable deployments
- end-to-end functionality
- readable code organization
- reviewer-verifiable workflows
- minimal infrastructure overhead

instead of building:

- queue systems
- retry orchestration
- event buses
- analytics dashboards
- distributed workers

---

## Email provider migration during implementation

Initial implementation used Resend, but production testing exposed validation and rate-limit issues during repeated audit simulations.

To maintain reliable delivery during the assignment window, I migrated the notification flow to Brevo SMTP API.

This reduced operational instability while preserving the same user-facing workflow.

---

## Type safety refactor during production hardening

As the persistence layer expanded, several assumptions in the original audit rules became unsafe under strict TypeScript builds.

I refactored the audit pipeline to normalize:

- pricing fields
- seat counts
- optional tool properties

This improved production stability and prevented runtime inconsistencies between local and deployed environments.

---

## Production learnings

Several deployment-specific issues surfaced while validating the full workflow:

- environment variable mismatches
- API provider validation failures
- payload normalization bugs
- strict TypeScript build failures
- server-side initialization differences between local and production

I resolved these incrementally while continuously validating both local and deployed flows.

This significantly improved the reliability of the final implementation.