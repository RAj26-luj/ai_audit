# Architecture

This document explains the high-level architecture and data flow of StackAudit.

The system is designed to be simple, deterministic, and easy to extend while still supporting AI-assisted reporting and optimization insights.

---

## System Flow

```mermaid
flowchart TD

A[User Input Form] --> B[Audit Engine]
B --> C[Recommendation Generator]
C --> D[AI Summary API]
D --> E[Results Page]
E --> F[Lead Capture Modal]
F --> G[Supabase Database]
E --> H[Shareable Audit URL]