# StackAudit

StackAudit is an AI spend auditing tool built for startups and small teams to analyze AI subscription costs, detect overspending, and recommend better pricing or tool choices.

The project is designed as a lead-generation product for Credex by helping teams understand where they can optimize their AI stack spending.

---

## Features

- AI tool spend audit
- Savings analysis
- Tool overlap detection
- Plan downgrade recommendations
- AI-generated executive summaries
- Shareable audit result pages
- Lead capture with Supabase
- CI/CD pipeline with GitHub Actions
- Benchmark analysis
- Spend-per-employee metrics
- Optimization scoring
- PDF export support
- Share/copy audit links
- Rule-based recommendation engine
- Audit engine testing with Jest

---

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- HuggingFace 
- Jest
- html2canvas
- jsPDF

---

## Project Structure

- `app/` → Next.js routes and pages
- `components/` → reusable UI sections
- `lib/` → audit engine and business logic
- `hooks/` → custom React hooks
- `data/` → AI pricing data
- `types/` → shared TypeScript types

---

## Local Setup

```bash
npm install
npm run dev