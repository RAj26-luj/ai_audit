# Reflection

## 1. The hardest bug I hit this week

The hardest issue was debugging production build failures after restructuring the project into smaller components and hooks. The application worked correctly in development, but production builds repeatedly failed due to broken imports, missing files, and TypeScript path mismatches.

At first, I assumed it was a Next.js caching issue, so I repeatedly deleted `.next` and rebuilt the project. When that did not work, I manually traced dependencies using `grep` and inspected every imported module across components and hooks.

Eventually, I discovered several outdated imports and references to files that had been moved or removed during refactoring. Fixing these resolved the build failures.

The key lesson was that large-scale refactoring introduces hidden dependency chains that are easy to break, especially while simultaneously learning a framework.

---

## 2. A decision I reversed mid-week

Initially, I tried building the audit system as a fully AI-driven engine where an LLM would generate financial reasoning and optimization recommendations.

However, after testing multiple models, I found that outputs were inconsistent and sometimes produced unrealistic financial assumptions. API rate limits and provider differences also introduced variability in results.

I reversed this approach and moved the core audit logic to a deterministic, rule-based system. AI was retained only for generating executive summaries and improving readability.

This decision significantly improved stability, explainability, and debugging simplicity.

---

## 3. What I would build in week 2

If I had another week, I would focus on improving product maturity and SaaS readiness.

Key improvements would include:

- a proper analytics dashboard
- stronger benchmarking system
- transactional email flows
- organization-level reporting features
- improved PDF formatting and layout
- Open Graph preview support for shared links
- better mobile responsiveness
- rate limiting and abuse protection

I would also enhance the recommendation engine to rely more on realistic usage-based signals instead of partially fixed thresholds.

---

## 4. How I used AI tools

I used AI tools extensively during development for:

- debugging TypeScript and Next.js issues
- restructuring components and hooks
- fixing runtime and build errors
- improving documentation quality
- refining UI layout and responsiveness

However, I did not rely on AI for:

- financial calculations
- pricing accuracy
- core architectural decisions without verification

One major mistake was following AI suggestions to remove unused files that were still indirectly referenced. This caused production build failures and required manual dependency tracing to restore functionality.

This reinforced an important lesson: AI can accelerate development, but its suggestions must be validated carefully in a production codebase.

---

## 5. Self-rating

### Discipline — 8/10

Consistent execution across development cycles with structured progress tracking even while learning new technologies.

### Code Quality — 7/10

Refactoring improved structure significantly, but some coupling between modules still exists.

### Design Sense — 7/10

UI design improved notably, especially in the optimization dashboard, though mobile refinement can still be improved.

### Problem Solving — 8/10

Handled multiple issues involving builds, imports, APIs, and state management while learning the stack.

### Entrepreneurial Thinking — 6/10

Improved through GTM and economics work, but still an area for continued growth.