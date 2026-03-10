# Cutover Planning & Execution Playbook — SAP SD Workstream

> Author: Prashanth Goud — Senior SAP SD / S/4HANA Consultant  
> Scope: SD Workstream Cutover — applicable to S/4HANA migration and major ECC go-lives  
> Version: 3.1 (refined across 8 programme go-lives)

---

## Overview

Cutover is the highest-risk phase of any SAP programme. Every decision made in configuration, testing, and data preparation is tested in a compressed, pressure-filled window where the cost of failure is maximum and the tolerance for error is zero.

This playbook captures the structured approach I use to plan, rehearse, and execute SD workstream cutovers. It is built from real programme delivery — not theory.

> "A cutover does not succeed by luck. It succeeds by rehearsal, documentation, and ruthless clarity about who does what, in what sequence, and what 'done' looks like."

---

## Part 1: Cutover Planning Principles

### The Five Laws of SD Cutover

**Law 1: Document open documents before you touch anything.**  
Before cutover begins, you must know exactly what open OTC documents exist and have a business-agreed handling rule for every category. An open sales order at cutover is not a technical problem — it is a business decision.

**Law 2: The cutover sequence is a dependency graph, not a list.**  
Tasks have dependencies. Task B cannot start until Task A is complete and validated. Build your runbook as a dependency-aware sequence, not a flat list. Sequence errors are the most common cause of cutover overruns.

**Law 3: Every task must have a named owner and a defined "done" state.**  
"Check pricing" is not a task. "Prashanth to create test order VA01 for SOrg 1000 / customer 1001 / material A, confirm price = 100 EUR, delivery date confirmed, and log result in validation sheet" is a task.

**Law 4: Dress rehearsals are mandatory, not optional.**  
Run at least two dress rehearsals in a system that mirrors production. The first finds the sequencing gaps. The second validates the fixes and establishes your time baseline.

**Law 5: Go/No-Go is a business decision, informed by technical facts.**  
The cutover team presents the facts — open critical issues, validation status, system health. The business owner makes the Go/No-Go call. Prepare the Go/No-Go criteria document weeks before cutover, not the morning of.

---

## Part 2: Pre-Cutover Preparation (T-8 Weeks to T-2 Weeks)

### Open Document Management

At T-8 weeks, run an analysis of all open OTC documents:

```sql
-- Documents to analyse (T-codes and reports):
VA05  -- Open Sales Orders
VL06O -- Open Outbound Deliveries  
VF04  -- Billing Due List
VKM1  -- Sales Orders blocked for credit
VA14L -- Sales Documents blocked for delivery
```

**For each open document category, define:**

| Question | Who Decides | Documentation |
|---|---|---|
| Will this document migrate as-is or be closed pre-cutover? | Business Owner | Handling Matrix |
| If migrated: which LSMW/LTMC program loads it? | Technical Lead | Migration Runbook |
| If closed: what is the business process to close? | Process Owner | Closure SOP |
| What is the validation check post-cutover? | SD Consultant | Validation Script |

**Typical SD Open Document Handling Matrix:**

| Document Type | Typical Handling | Rationale |
|---|---|---|
| Open Sales Orders (no delivery) | Migrate via LSMW | Business continuity |
| Open Deliveries (not yet PGI'd) | Complete PGI pre-cutover or migrate | Depends on cutover window |
| Deliveries PGI'd, not billed | Bill before cutover | Simplifies billing migration |
| Open Billing Documents | Complete billing before cutover | FI close-out |
| Blocked Sales Orders (credit) | Release or document list | Business decision |
| Returns / Credit Memos in progress | Complete before cutover where possible | Reduces complexity |

### Configuration Transport Lock

At T-4 weeks: **configuration transport freeze for SD.**

No configuration changes to production after this point without a formal Change Request, Impact Assessment, and Transport Board approval. Build this into the programme governance calendar.

Exception process: P1 break/fix transports only — with dual approval.

### Data Migration Readiness

**Condition Records (if migrating to new system/client):**
- Final extraction from source: T-5 days
- LSMW/LTMC load test in production-equivalent system: T-3 days
- Reconciliation check (record count, sample price verification): T-2 days
- Go-live load window: Day 1 of cutover

**Customer Master / Business Partner:**
- BP conversion for all customers validated in Quality: T-3 weeks
- BP conversion transport to Pre-Production: T-2 weeks
- BP conversion in Production: Day 1 of cutover (early in sequence)

---

## Part 3: Cutover Runbook Structure

### SD Cutover Runbook Template

Each row in the runbook follows this structure:

```
| Seq | Task | Owner | Depends On | Duration | Start | End | Status | Notes |
```

**Standard SD Cutover Task Sequence:**

#### PRE-CUTOVER (T-5 to T-1 days)

| Seq | Task | Owner |
|---|---|---|
| 01 | Final open document analysis — count and status | SD Consultant |
| 02 | Business approval of open document handling decisions | Business Owner |
| 03 | Configuration transport freeze confirmed | Programme Manager |
| 04 | Final condition record extract from source system | SD Consultant / Technical |
| 05 | SD cutover runbook distributed to all task owners | SD Lead |
| 06 | War room setup confirmed (location, access, comms) | PM |
| 07 | Go/No-Go criteria document distributed and approved | Programme Manager |

#### CUTOVER EXECUTION — SYSTEM CLOSE

| Seq | Task | Owner | Depends On |
|---|---|---|---|
| 10 | Business systems freeze communicated to users | PM / Business | — |
| 11 | Final billing run (VF04) for all due billing items | Finance / SD | 10 |
| 12 | Confirm all billing documents posted; FI period closed | FI Lead | 11 |
| 13 | Final credit management snapshot exported | Credit Control | 11 |
| 14 | Block all sales org / dist channels (transaction OVX5 or via auth) | Basis / SD | 12 |
| 15 | Final open delivery check — confirm count and handling | SD Consultant | 14 |

#### CUTOVER EXECUTION — MIGRATION & CONFIGURATION

| Seq | Task | Owner | Depends On |
|---|---|---|---|
| 20 | Business Partner conversion (if applicable) | Technical / SD | 15 |
| 21 | BP conversion validation — sample customer check (XD03 / BP) | SD Consultant | 20 |
| 22 | Condition record load — pricing (LSMW / LTMC) | Technical | 20 |
| 23 | Condition record load validation — spot check 20 records (VK13) | SD Consultant | 22 |
| 24 | Customer-material info record load | Technical | 20 |
| 25 | Transport sequence — SD configuration transports (if applicable) | Basis | 15 |
| 26 | Transport validation — smoke test config post-import | SD Consultant | 25 |

#### CUTOVER EXECUTION — OPEN DOCUMENT MIGRATION

| Seq | Task | Owner | Depends On |
|---|---|---|---|
| 30 | Open sales order migration (LSMW / manual) | Technical | 22, 26 |
| 31 | Open sales order validation — count reconciliation | SD Consultant | 30 |
| 32 | Open delivery migration (if applicable) | Technical | 30 |
| 33 | Open delivery validation | SD Consultant | 32 |

#### CUTOVER EXECUTION — VALIDATION

| Seq | Task | Owner | Depends On |
|---|---|---|---|
| 40 | SD Validation Script execution (see below) | SD Consultant | 26 |
| 41 | FI Validation — first test posting | FI Consultant | 40 |
| 42 | Integration validation — full OTC end-to-end test order | SD + FI | 40, 41 |
| 43 | Output validation — test invoice print / send | SD Consultant | 42 |
| 44 | Credit management validation | SD / Finance | 42 |
| 45 | Batch job validation — VF04, output jobs scheduled and confirmed | Basis / SD | 43 |

#### GO / NO-GO DECISION

| Seq | Task | Owner | Depends On |
|---|---|---|---|
| 50 | Go/No-Go status compiled and presented | SD Lead + PM | 40–45 |
| 51 | Go/No-Go decision by Business Owner | Business Owner | 50 |
| 52 | System unblocked for business use | Basis | 51 (Go) |
| 53 | Communication to business: system live | PM / Business | 52 |

---

## Part 4: Go-Live Validation Script (SD)

The SD Go-Live Validation Script must be executed sequentially. Each step has a pass/fail criterion. Any fail triggers an immediate escalation.

### Validation Checklist

**Organisational & Master Data**
- [ ] Sales Organisation visible and active in system
- [ ] All Distribution Channels and Divisions accessible
- [ ] Customer master records accessible (spot check 5 customers — VD03)
- [ ] Business Partner records correct (spot check 5 — BP)
- [ ] Material master SD views active for test materials
- [ ] Plant / Shipping Point assignments verified

**Pricing**
- [ ] Pricing procedure determination correct for test sales area (OVKK test via VA01)
- [ ] Base price condition record found for test material (VK13)
- [ ] Customer discount found for test customer (VK13)
- [ ] Pricing analysis on test order shows expected pricing breakdown
- [ ] Tax calculation (MWST) correct for test scenario

**Order Management**
- [ ] VA01: Create standard order (type OR) — no errors
- [ ] Confirm order pricing, delivery date, item category
- [ ] Incompletion check passed (no mandatory fields missing)
- [ ] Credit check result as expected (not blocking where not expected)
- [ ] ATP check result: confirmed qty and date reasonable

**Delivery**
- [ ] VL01N: Create delivery from test order — no errors
- [ ] Shipping point determination correct
- [ ] Delivery date and route determination correct
- [ ] Transfer order creation (if WM in scope) — successful
- [ ] VL02N: Post Goods Issue — completes without error
- [ ] Inventory updated in MM (MMBE verification)

**Billing**
- [ ] VF01: Create billing document from delivery — no errors
- [ ] Billing document pricing matches sales order
- [ ] FI posting generated — check document (FB03)
- [ ] Revenue posted to correct GL account (per VKOA)
- [ ] Customer open item created in AR (FBL5N)

**Output**
- [ ] Invoice output triggered (NACE / Output Management)
- [ ] Output form renders correctly (spot check PDF)
- [ ] EDI output (if applicable): IDoc generated in outbound queue

**Batch Jobs**
- [ ] VF04 (Collective Billing) batch job scheduled and confirmed
- [ ] Output processing batch job scheduled
- [ ] Credit check batch job scheduled (if applicable)

---

## Part 5: Hypercare Setup

### Hypercare Structure

**Duration:** Minimum 4 weeks; recommend 6 weeks for complex landscapes

**Daily Cadence:**
- 08:00 — Hypercare stand-up: open incidents, P1/P2 status, plan for the day
- 16:00 — End-of-day update: incidents resolved today, new issues, next-day priorities
- Daily incident summary to Programme Manager / Business Sponsor

**SLA Targets:**
| Priority | Response | Resolution |
|---|---|---|
| P1 (Production stopped) | 30 minutes | 4 hours |
| P2 (Major impact, workaround exists) | 2 hours | 8 hours |
| P3 (Minor impact, workaround exists) | 4 hours | 2 business days |
| P4 (Cosmetic / enhancement) | Next business day | Planned sprint |

**Escalation Path:**
P1 → SD Consultant (immediate) → Programme Manager (30 min) → IT Director (1 hour) → Business Sponsor (if business impact)

### Hypercare Exit Criteria

Hypercare is formally closed when ALL of the following are met:
- [ ] Zero open P1 or P2 incidents
- [ ] P3 incident volume trending downward for 2 consecutive weeks
- [ ] All critical business processes validated as working (sign-off per process area)
- [ ] BAU support team trained and confident on top 10 issue types
- [ ] On-call escalation path documented and agreed for post-hypercare
- [ ] Knowledge transfer document completed and accepted
- [ ] Business Sponsor formal sign-off obtained

---

> *This playbook is a living document refined across 8+ full-lifecycle SAP programme go-lives. Adjust sequence, task owners, and timing to match the specific programme context. The principles are transferable; the task details are starting points.*
