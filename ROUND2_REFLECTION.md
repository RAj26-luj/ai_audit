# Engineering Tradeoffs

## Extending the existing architecture instead of rewriting

I intentionally extended the existing Round 1 architecture instead of rebuilding the audit engine or introducing a separate service layer.

This reduced regression risk, preserved deployment stability, and allowed faster iteration within the assignment timeline while keeping the implementation production-safe.

The re-audit system was designed as an incremental evolution of the existing audit pipeline rather than a parallel system.

---

## Why pricing snapshots + version comparison

Instead of building a semantic recommendation diff engine, I used pricing snapshot persistence combined with pricing-version comparison.

This approach is:

- deterministic
- easy to debug
- reviewer-friendly
- reliable under deployment constraints

It also keeps the re-audit flow explainable because recommendation invalidation can always be traced back to pricing changes.

---

## Why lightweight cron infrastructure

I used Vercel Cron Jobs instead of introducing queues, workers, or orchestration infrastructure.

This kept the implementation:

- lightweight
- deployable in the existing stack
- easy to validate
- production-compatible

The system is intentionally designed to remain extensible if more advanced scheduling infrastructure is needed later.

---

## Reliability over infrastructure complexity

I intentionally prioritized:

- stable deployments
- end-to-end functionality
- reviewer-verifiable flows
- readable implementation
- minimal operational overhead

instead of building:

- queue systems
- retry orchestration
- event buses
- analytics pipelines
- distributed workers

The primary goal was shipping a complete and reliable workflow rather than partially implementing large-scale infrastructure patterns.

---

## Email provider migration during production validation

The initial implementation used Resend, but repeated production testing exposed delivery instability during rapid audit simulations.

To improve reliability during the assignment window, I migrated the notification workflow to Brevo SMTP API.

This preserved the same user-facing functionality while reducing operational instability during deployment validation.

---

## Type-safety hardening during production builds

As persistence and re-audit flows expanded, several assumptions in the original audit rules became unsafe under strict TypeScript validation.

I refactored parts of the audit pipeline to normalize:

- pricing fields
- seat counts
- optional tool properties
- audit payload formats

This improved deployment reliability and reduced inconsistencies between local and production environments.

---

## Production learnings

Several deployment-oriented issues surfaced while validating the full workflow end-to-end:

- environment variable mismatches
- provider validation failures
- payload normalization bugs
- strict TypeScript build failures
- differences between local and deployed server initialization

These were resolved incrementally while continuously validating both local and production behavior.

This significantly improved the stability and reliability of the final implementation.

---

## Final reflection

The final system focuses on delivering a complete and production-safe re-audit workflow rather than maximizing infrastructure complexity.

The implementation now supports:

- persistent audit storage
- historical comparison
- pricing snapshot persistence
- automated re-audit detection
- compare-page generation
- email notifications
- scheduled re-check infrastructure
- production deployment validation

while remaining intentionally simple enough to reason about, validate, and extend incrementally.