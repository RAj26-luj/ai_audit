# Engineering Tradeoffs

## Extending the existing architecture instead of rewriting

I intentionally extended the existing Round 1 architecture instead of rebuilding the audit engine or introducing separate infrastructure layers.

This reduced regression risk, preserved deployment stability, and allowed faster iteration within the assignment timeline while keeping the implementation production-safe.

The re-audit workflow was designed as a natural extension of the original audit pipeline rather than a disconnected parallel system.

---

## Why pricing snapshots + snapshot diff detection

Instead of building a semantic recommendation diff engine, I used persisted pricing snapshots combined with direct snapshot comparison.

This approach is:

- deterministic
- easy to validate
- reviewer-friendly
- production-safe
- simple to debug

Each audit stores the exact pricing snapshot used during generation. Re-audits are triggered when the stored snapshot differs from the current pricing configuration.

This keeps recommendation invalidation explainable because changes can always be traced back to pricing updates.

---

## Why lightweight scheduling infrastructure

I used Vercel Cron Jobs instead of introducing queues, workers, or orchestration infrastructure.

This kept the implementation:

- lightweight
- deployable inside the existing stack
- easy for reviewers to test
- production-compatible
- low-overhead

The system remains extensible if more advanced infrastructure is needed later.

---

## Reliability over infrastructure complexity

I intentionally prioritized:

- end-to-end functionality
- stable deployments
- reviewer-verifiable workflows
- readable implementation
- production validation
- minimal operational complexity

instead of building:

- distributed workers
- queue orchestration
- analytics pipelines
- retry systems
- event buses

The main goal was delivering a complete and reliable re-audit workflow within the assignment constraints.

---

## Email provider migration during production testing

The initial implementation used Resend, but repeated production validation exposed delivery instability during rapid audit simulations.

To improve reliability during testing, I migrated the notification workflow to Brevo SMTP API.

This preserved the same user-facing functionality while improving operational stability during deployment verification.

---

## Type-safety hardening during production builds

As persistence and re-audit flows expanded, several assumptions in the original audit engine became unsafe under strict TypeScript validation.

I refactored parts of the pipeline to normalize:

- pricing fields
- seat counts
- optional tool properties
- audit payload formats
- recommendation inputs

This improved production reliability and reduced inconsistencies between local and deployed environments.

---

## Use of AI tools during development

I used ChatGPT extensively during implementation for:

- debugging TypeScript issues
- refactoring repetitive UI components
- validating architectural tradeoffs
- generating boilerplate patterns
- improving developer iteration speed
- identifying deployment edge cases

However, all architectural decisions, system integration, debugging validation, production testing, and final implementation choices were manually reviewed and adapted during development.

The final system required substantial manual debugging and iteration across:

- Supabase persistence
- pricing snapshot synchronization
- production deployment behavior
- API integration
- re-audit workflow correctness
- email delivery validation
- TypeScript hardening
- end-to-end testing

AI assistance primarily accelerated implementation speed and iteration quality rather than replacing engineering decision-making.

---

## Production learnings

Several deployment-oriented issues surfaced while validating the full workflow end-to-end:

- environment variable mismatches
- provider validation failures
- payload normalization bugs
- strict TypeScript build failures
- server-side initialization differences
- stale audit persistence edge cases
- pricing snapshot synchronization bugs

These were resolved incrementally while continuously validating both local and production behavior.

This significantly improved the stability and reliability of the final implementation.

---

## Final reflection

The final system focuses on shipping a complete and production-safe re-audit workflow rather than maximizing infrastructure complexity.

The implementation now supports:

- persistent audit storage
- pricing snapshot persistence
- historical comparison
- automated pricing-change detection
- compare-page generation
- email notifications
- scheduled re-check infrastructure
- public pricing update tracking
- production deployment validation

while remaining intentionally simple enough to reason about, validate, test, and extend incrementally.