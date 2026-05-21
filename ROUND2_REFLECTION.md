# ROUND 2 REFLECTION

## 1. What was the most uncomfortable trade-off you made because of the time pressure?

The biggest trade-off was choosing deterministic pricing snapshot comparison instead of building a more intelligent semantic recommendation diff engine.

Originally I considered building a system that would analyze whether recommendations themselves had meaningfully changed, but I realized very quickly that this would add a large amount of complexity around explainability, edge cases, and debugging. Under the assignment timeline, I prioritized reliability and reviewer-verifiable behavior over a more ambitious but riskier implementation.

I instead stored pricing snapshots directly inside persisted audits and compared snapshots against the current pricing configuration during re-audit detection. This made the system far simpler to reason about and significantly easier to validate in production.

The trade-off is that the current implementation is more infrastructure-oriented than intelligence-oriented. It works reliably, but it does not yet understand nuanced recommendation changes beyond pricing-driven invalidation.

Given the timeline, I think this was the correct decision because it allowed me to ship a complete end-to-end workflow instead of a partially working experimental system.

---

## 2. If we extended the deadline by another 24 hours right now, what's the first thing you'd do?

The first thing I would do is redesign the re-audit detection pipeline to support batched and queued processing instead of synchronous execution.

Right now, the detection flow loops through audits sequentially and performs regeneration inline during the request lifecycle. This works well for the current assignment scope and reviewer validation, but it would not scale cleanly if audit volume increased significantly.

I would introduce:
- queued re-audit jobs
- batched email delivery
- retry handling
- audit processing status tracking

This would improve:
- reliability
- observability
- scalability
- operational safety

I intentionally avoided building this during the assignment because I wanted to prioritize a stable production-safe implementation first.

The current implementation focuses on correctness and end-to-end functionality, but the processing architecture is the first thing I would evolve if given additional time.

---

## 3. Looking back at your Round 1 codebase as a now-experienced user of it: what's one thing your Round 1 self made harder for your Round 2 self?

The biggest issue my Round 1 implementation created was inconsistent payload structure and weak normalization around audit inputs.

Different parts of the system referred to audit data as:
- `stack`
- `tools`
- partially normalized tool objects

Pricing fields were also inconsistent between:
- `monthlyCost`
- `monthlyPrice`
- `pricePerSeat`

This became painful once persistence and re-audit logic were introduced because production flows depended on deterministic audit reconstruction.

A large amount of Round 2 debugging time was spent normalizing:
- pricing fields
- seat handling
- audit payload formats
- persistence behavior

The Round 1 system was optimized for fast iteration and feature velocity, but Round 2 exposed how important stable schemas become once persistence, automation, and historical comparisons are added.

That experience changed how I think about data contracts and normalization boundaries in production systems.