# Reflection

## 1. The hardest bug I hit this week

The hardest issue was debugging production build failures after restructuring the project into smaller components and hooks. The app worked locally in development mode, but production builds kept failing because of broken imports, removed files still being referenced, and TypeScript path issues.

My first assumption was that the issue came from Next.js caching, so I deleted `.next` and rebuilt multiple times. After that failed, I started tracing every import manually using `grep` and checking which files were still referenced inside hooks and components. I eventually found several old utility files and deleted modules still imported in the optimization flow.

The biggest lesson was that refactoring large projects creates hidden dependency problems very easily, especially when learning a framework at the same time.

---

## 2. A decision I reversed mid-week

Initially I tried making the audit system heavily AI-driven, where the LLM itself would generate optimization recommendations and financial reasoning.

After experimenting with different APIs, I realized the outputs were inconsistent and sometimes financially unrealistic. Different models also behaved differently under rate limits and failed requests.

I reversed that decision and moved the core audit logic to deterministic rule-based calculations instead. AI was kept only for executive summaries and readability improvements.

That decision made the product much more stable, explainable, and easier to debug.

---

## 3. What I would build in week 2

If I had another week, I would focus on making the product feel closer to a real SaaS platform.

Main improvements:
- proper analytics dashboard
- better benchmarking system
- transactional email flow
- organization-wide reporting
- improved PDF formatting
- Open Graph preview generation
- better mobile responsiveness
- stronger abuse protection and rate limiting

I would also improve the recommendation engine so it uses more realistic usage-based reasoning instead of partially hardcoded thresholds.

---

## 4. How I used AI tools

I used ChatGPT heavily throughout development for:
- debugging TypeScript issues
- understanding Next.js patterns
- restructuring components
- fixing runtime errors
- improving documentation
- improving UI responsiveness

I did not trust AI tools for:
- financial calculations
- pricing accuracy
- architectural decisions without verification

One important mistake AI made was suggesting that several unused files were safe to remove. After deleting them, the build failed because one hook still referenced an older utility file indirectly. I had to manually trace imports and restore the missing logic.

That experience taught me that AI accelerates development, but blindly accepting suggestions can easily break production builds.

---

## 5. Self-rating

### Discipline — 8/10

I worked consistently across multiple days and kept detailed progress logs even while learning unfamiliar technologies.

### Code Quality — 7/10

The project structure became much cleaner after refactoring, but some logic is still more coupled than I would like.

### Design Sense — 7/10

The UI became significantly cleaner during development, especially the optimization dashboard, though mobile polish can still improve.

### Problem Solving — 8/10

I handled multiple debugging issues involving builds, imports, API failures, and state synchronization while learning the stack.

### Entrepreneurial Thinking — 6/10

I improved a lot while working on the GTM, economics, and product reasoning documents, but this is still an area I want to strengthen further.