# Round 2 — Persistent Re-Audit System

## Overview

This PR extends StackAudit with a persistent re-audit workflow that allows previously generated AI stack audits to be stored, re-evaluated against updated pricing data, and compared over time.

The implementation focuses on shipping a reliable end-to-end system with production-safe architecture and reviewer-verifiable flows.

---

# What This Adds

## Persistent Audit Storage

Completed audits are now stored in Supabase with:

- original audit input
- generated recommendations
- pricing snapshot
- pricing version
- user email
- timestamps

This enables historical comparison and future re-audits.

---

## Re-Audit Detection System

Added:

```bash
POST /api/detect-changes