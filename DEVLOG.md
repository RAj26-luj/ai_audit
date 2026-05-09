## Day 1 — 2026-05-07

Hours worked: 8
What I did:
- Started learning the basics of Next.js and TypeScript before continuing development because I had almost no prior experience with either of them
- Learned how Next.js handles routing, components, client-side rendering, and project structure
- Learned basic TypeScript concepts like props typing, state typing, and reusable type definitions
- After understanding the basics, started restructuring the StackAudit frontend architecture
- Broke large components like Landing, Navbar, Inputs, Loading, Results, and modal flows into smaller reusable sections
- Created a cleaner folder-based structure to make debugging and future scaling easier
- Moved audit-related logic into custom hooks to separate business logic from UI
- Connected Supabase setup and cleaned several state management flows
- Fixed multiple import and path issues created during refactoring
- Used AI tools like ChatGPT to better understand Next.js concepts, debug TypeScript issues, improve component structure, and rewrite code into cleaner and more maintainable patterns

What I learned:
- Next.js project structure becomes much easier to manage when components are modular and responsibilities are separated
- TypeScript helps make state management and props handling safer in larger React applications
- Refactoring existing code carefully is often harder than writing the initial version
- Separating business logic from UI improves readability and debugging speed significantly
- AI tools can speed up learning and debugging, but understanding the final code structure personally is still very important

Blockers:
- Ran into many broken imports after moving files into nested folders
- Understanding TypeScript errors took extra time because I am still new to the ecosystem
- Some components still need cleanup before the production build works correctly

Plan for tomorrow:
- Finish fixing remaining import/build issues
- Run a successful production build
- Continue improving understanding of Next.js and TypeScript patterns
- Start documenting architecture and setup decisions
- Begin adding testing structure for the audit engine

## Day 2 — 2026-05-08

**Hours worked:** 5

**What I did:**
- Improved the audit engine and recommendation logic
- Added better savings calculations and overlap detection
- Worked on AI-generated summaries using different LLM APIs
- Tried OpenAI, Gemini, and HuggingFace integrations and handled multiple API and quota issues
- Added fallback summaries so the app still works even if AI APIs fail
- Fixed many TypeScript, ESLint, and CI/CD build issues
- Configured GitHub Actions and fixed production build problems with Supabase environment variables
- Improved project structure and cleaned up several components and hooks

**What I learned:**
- CI/CD builds can fail even when local development works fine
- External AI APIs are unreliable without proper fallback handling
- Rule-based audit logic works better for financial reasoning than depending fully on AI
- Managing environment variables correctly is important for production builds

**Blockers / what I'm stuck on:**
- Free AI APIs are heavily limited and unstable
- The audit engine still needs more realistic financial analysis and benchmarking
- Need to add tests, transactional emails, and Open Graph support

**Plan for tomorrow:**
- Improve audit reasoning and recommendation quality
- Add benchmark-style insights and better savings explanations
- Start writing audit engine tests
- Begin documentation files like PRICING_DATA.md and ARCHITECTURE.md

## Day 3 — 2026-05-09

Hours worked: 8
What I did:
* Improved audit and recommendation logic
* Added benchmark insights and savings metrics
* Added PDF export and share feature
* Wrote audit engine tests using Jest
* Improved results UI and report sections
* Fixed TypeScript, hydration, and PDF rendering issues
* Updated documentation and cleaned components

What I learned:

* PDF export in React is tricky with modern CSS
* Better UI structure improves readability a lot
* Testing helps catch logic issues early

Blockers:

* PDF formatting still needs improvement
* Some recommendation logic is still hardcoded
* Mobile responsiveness needs more polish

Plan for tomorrow:

* Deploy project
* Improve mobile UI
* Add email flow and rate limiting
* Continue polishing documentation