# Architecture

Project Overview

This project is an AI Spend Audit Platform built using Next.js, TypeScript, Tailwind CSS, Supabase, and OpenAI API.

The application helps startups and teams analyze their AI tool spending and identify opportunities to reduce unnecessary costs.

Users can:
- select AI tools
- choose plans
- enter monthly spend
- enter seat count
- generate audit reports
- receive AI-generated summaries
- save reports using email capture

---

System Flow

```mermaid
flowchart TD
    A[User Input Form] --> B[Audit Engine]
    B --> C[Audit Report UI]
    C --> D[AI Summary API]
    D --> E[OpenAI API]
    C --> F[Email Lead Capture]
    F --> G[Supabase Database]