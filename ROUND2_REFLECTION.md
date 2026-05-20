# Engineering Tradeoffs

## Why manual trigger instead of cron
Given the assignment timeline, I optimized for a reviewer-verifiable and production-safe workflow using a manual trigger endpoint instead of introducing scheduled infrastructure complexity.

## Why snapshot comparison
I intentionally used pricing snapshot comparison instead of semantic recommendation diffing to keep the re-audit system deterministic, explainable, and reliable under time constraints.

## Incremental architecture extension
Instead of rewriting the application, I extended the existing Round 1 architecture to reduce regression risk and ship a stable end-to-end workflow faster.

## Reliability over infrastructure complexity
I prioritized:
- production stability
- readable PRs
- deployment reliability
- verifiable reviewer testing

over adding queues, cron systems, dashboards, or advanced orchestration layers.

## Production learnings
Several production-specific issues surfaced during implementation, including environment variable handling and server-side initialization behavior. These were fixed incrementally while validating both local and deployed builds.