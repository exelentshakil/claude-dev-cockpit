# Product Requirements Document (PRD)
## Claude Developer Certification Workbench & Production Cockpit (`claude-dev-cockpit`)

**Document Ref:** `BS-2026-CLAUDE-CERT-001`  
**Author:** Shakil Ahmed, Founder & Principal Systems Architect · BarakahSoft LLC  
**Date:** September 15, 2026  
**Target Milestone:** 7-Day Completion Window ($700 Fixed: $350 Upfront / $350 Final)  
**Live URL:** https://claude-dev-cockpit.vercel.app  
**Public Repo:** https://github.com/exelentshakil/claude-dev-cockpit  

---

### 1. Executive Summary & Defensibility Hook
The client seeks experienced software engineers with proven, hands-on production experience using the **Claude API** and **Claude Code** to:
1. Review certification requirements and outline a disciplined study plan.
2. Complete all preparation, training labs, and practical code exercises.
3. Pass the official Claude Developer Certification legitimately under their own name.
4. Complete an in-depth, post-certification questionnaire providing actionable evaluation data.

**The Client's Core Vulnerability & Defensibility Hook:**
> *"We’re looking for someone who will understand the material—not simply obtain the credential. At the end of the project, you get to keep the highly valuable credential for yourself... practical experience building with Claude, such as API integrations, tool use, or AI-powered applications."*

Most applicants are paper-credential hunters who cram dumps or lack real system engineering experience. This project delivers an operational **Claude Developer Certification Workbench & Production Cockpit** built prior to contract award. It demonstrates mastery across all Anthropic developer domains: Messages API, ephemeral prompt caching, multi-turn tool loops, Claude Code CLI automation, and structured evaluation.

---

### 2. The 100-Person Virtual Studio Team Discovery Standard

| Specialist Perspective | Architectural Focus & Key Decisions |
|---|---|
| **1. Lead Product Designer** | Lovable/Vercel AI software lab archetype. Pitch Obsidian (`#08090a`), Anthropic Coral (`#d97757`), Supabase Emerald (`#10b981`), Cyber Violet (`#8b5cf6`). Strict 12px+ typography scale (`12/14/16/20/24/32`), monospace tabular numbers (`font-mono tabular-nums`). Zero AI slop, zero broken button wraps. |
| **2. Systems Architect** | Event-driven dual AI fallback pipeline (OpenAI gpt-4o-mini + Gemini 2.0 Flash) with native HTTP fetch, zero bloat SDKs. Sub-second latency telemetry, prompt caching cost simulation (90% discount on cache hits), and zero-credential fallback simulator. |
| **3. Full-Stack Programmer** | Next.js 15 App Router, TypeScript 5.7+, zod defensive parsing, zero runtime exceptions, localStorage state persistence across browser refresh, zero console warnings. |
| **4. AI Research Specialist** | Deep Anthropic Messages API architecture: `cache_control: {"type": "ephemeral"}` 5-min TTL, tool definitions with strict JSON schemas, XML tag boundary enforcement (`<thinking>`, `<context>`, `<output>`), model tier trade-offs (Opus 5 vs Sonnet 5 vs Haiku 4.5). |
| **5. Motion / Animation Designer** | Living n8n/Make.com-style animated SVG flow pipeline (`WorkflowCanvas.tsx`) showing traveling data packets through 5 execution stages with ambient glowing energy and node state transitions. |
| **6. Product Marketer & Closer** | Zero proposal text inside the application UI. The app stands 100% on its own as an authentic, high-value developer workbench. Full attribution in engineering specifications footer. |
| **7. End-User / QA Engineer** | One-click exportable study plans and code blueprints (Markdown, TypeScript tool runner, Claude Code CLAUDE.md). Interactive prompt caching ROI calculator, live event stream drawer, and mock post-certification questionnaire. |

---

### 3. Core Functional Domains & Certification Curriculum

The certification workbench covers the complete spectrum of official Claude Developer competencies:

#### Domain 1: Anthropic Messages API Architecture
- Endpoint: `POST /v1/messages` with `anthropic-version: 2023-06-01`
- Streaming with Server-Sent Events (`stream: true`, `content_block_delta`, `message_delta`)
- Ephemeral Prompt Caching (`cache_control: {"type": "ephemeral"}`): 5-minute TTL, minimum token thresholds (1,024 for Sonnet/Opus, 2,048 for Haiku), reducing input costs by 90% ($0.30/M cached vs $3.00/M uncached).

#### Domain 2: Tool Use, Function Calling & MCP
- Tool schema definitions using JSON Schema standard (`name`, `description`, `input_schema`).
- Tool choice constraints (`auto`, `any`, specific tool locking).
- Multi-turn agentic execution loop (`client.beta.messages.tool_runner` & manual dispatch).
- Model Context Protocol (MCP) clients, servers, transports (stdio, SSE), and resource schemas.

#### Domain 3: Claude Code CLI & Agent SDK
- Headless command execution (`claude -p "..."`), slash commands (`/review`, `/init`), project context via `CLAUDE.md`.
- Hooks system (`SessionStart`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`).
- Persistent file-based memory architecture and token-efficient subagent orchestration.

#### Domain 4: Model Selection & Context Windows
- Claude Opus 5 (Deep reasoning, architectural synthesis, complex refactoring).
- Claude Sonnet 5 (High-throughput coding, agentic workflows, best price-performance balance).
- Claude Haiku 4.5 (Sub-second classification, fast routing, instant edge summaries).
- Extended 1M token context window management and needle-in-a-haystack retrieval.

#### Domain 5: Safety, Guardrails & System Prompts
- XML tag structuring (`<system>`, `<context>`, `<instructions>`, `<examples>`, `<thinking>`).
- Prompt injection defense, constitutional AI safety filters, and structured JSON output validation.

---

### 4. 7-Day Execution Schedule & Hour Budget (19.5 Hours Total)

```
Day 1: Account Setup & Syllabus Discovery (2.5 hrs)
  ├── Provision official study account & sandbox credentials
  ├── Review official certification syllabus & exam blueprint
  └── Initialize local lab workspace with Claude Code & API test harness

Day 2: Messages API & Prompt Caching Mastery (3.0 hrs)
  ├── Implement streaming SSE client with backpressure handling
  ├── Benchmark ephemeral prompt caching across 100k+ token prompts
  └── Calculate cache hit rates, latency differentials, and cost savings

Day 3: Tool Use, Agent Loops & MCP Integration (3.5 hrs)
  ├── Build multi-turn tool calling state machine with JSON schema validation
  ├── Configure stdio and SSE Model Context Protocol (MCP) servers
  └── Implement computer use & bash execution sandboxing

Day 4: Claude Code CLI & Agent SDK (3.5 hrs)
  ├── Configure custom CLAUDE.md memory, project instructions, and hooks
  ├── Build custom slash commands and token-optimized subagent workflows
  └── Test headless CI/CD integration and PR review automation

Day 5: Production System Design & Practice Assessments (3.0 hrs)
  ├── Complete official practice assessments and domain diagnostic tests
  ├── Review edge-case failure modes (rate limits, timeouts, tool retries)
  └── Final review of Constitutional AI, safety guardrails, and XML boundaries

Day 6: Official Certification Exam Execution (2.0 hrs)
  ├── Take proctored/official Claude Developer Certification exam
  ├── Complete assessment legitimately under candidate's verified name
  └── Secure official passing score confirmation and digital credential badge

Day 7: Comprehensive Follow-Up Questionnaire (2.0 hrs)
  ├── Complete in-depth questionnaire evaluating curriculum, tooling, and DX
  ├── Provide actionable feedback on API ergonomics, caching, and documentation
  └── Submit final project milestone package for completion sign-off
```

---

### 5. Acceptance Criteria Checklist

- [x] **Criterion 1: Working Live Cockpit** — Fully deployed on Vercel with zero runtime errors.
- [x] **Criterion 2: Live AI Integration** — Real dual-provider LLM inference (OpenAI + Gemini fallback) with latency telemetry.
- [x] **Criterion 3: Interactive Curriculum Matrix** — 5 full certification domains with code samples and readiness tests.
- [x] **Criterion 4: Living Animated Pipeline** — SVG canvas visualizing the 7-day study-to-certification lifecycle.
- [x] **Criterion 5: Prompt Caching Economics** — Real-time ROI and token burn calculator demonstrating 90% cache savings.
- [x] **Criterion 6: 7-Day Milestone Roadmap** — Granular schedule allocating 19.5 hours across the 7-day deadline.
- [x] **Criterion 7: Structured Questionnaire Preview** — Actionable post-certification survey component.
- [x] **Criterion 8: 1-Click Code Blueprints** — Downloadable Study Plan, Tool Runner boilerplate, and CLAUDE.md config.
- [x] **Criterion 9: Single-Page PDF Estimate** — Strictly formatted 1-page PDF proposal estimate.
- [x] **Criterion 10: Cover Letter Proposal** — Concise, lowercase, first-person proposal in `docs/PROPOSAL.md`.
