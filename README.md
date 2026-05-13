# StackAudit

StackAudit is an AI spend auditing tool built for startups and small teams. It analyzes AI subscription costs, detects overspending, and recommends better pricing or tool configurations.

The project is built as a lead-generation product for Credex by helping teams understand and optimize their AI stack spending.

---

## Problem

Startups and engineering teams often overspend on overlapping AI subscriptions such as ChatGPT, Claude, Cursor, Copilot, and Gemini without clear visibility into redundancy or actual usage efficiency.

As teams adopt more AI tools, they frequently end up paying for multiple services with similar capabilities, leading to unnecessary recurring costs and reduced ROI clarity.

---

## Solution

StackAudit analyzes AI tool usage, pricing, seat allocation, and overlap between tools to generate optimization recommendations and estimated savings.

The system combines deterministic rule-based financial analysis with AI-generated summaries to produce clear and actionable optimization reports.

---

## Features

- AI tool spend audit
- Savings estimation and analysis
- Tool overlap detection
- Plan downgrade recommendations
- AI-generated executive summaries
- Shareable audit report pages
- Lead capture integration with Supabase
- Benchmarking insights
- Spend-per-employee metrics
- Optimization scoring system
- PDF export support
- Shareable audit links
- Rule-based recommendation engine
- Audit engine testing with Jest

---

## Screenshots

### Landing Page
![Landing](public/screenshots/landing.png)

### Dashboard
![Dashboard](public/screenshots/dashboard.png)

### Optimization View
![Optimization](public/screenshots/optimization.png)

### Mobile View
![Mobile](public/screenshots/mobile.png)

---

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
- OpenRouter API
- Jest
- html2canvas
- jsPDF

---

## Architecture Overview

User Input → Audit Engine → Recommendation Generator → AI Summary → Results Dashboard / PDF Export

---

## Project Structure

- `app/` → routes and API endpoints
- `components/` → reusable UI components
- `lib/` → core business logic and audit engine
- `hooks/` → custom React hooks
- `data/` → pricing and tool configuration
- `types/` → shared TypeScript definitions

---

## Local Setup

```bash
npm install
npm run dev