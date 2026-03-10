# OTC Delivery Governance Framework

> Author: Prashanth Goud — Senior SAP SD / S/4HANA Consultant  
> Purpose: End-to-end delivery model for SAP SD / OTC workstream governance  
> Version: 4.0 — refined across 8+ full-lifecycle programme deliveries

---

## What This Framework Is

This is the delivery model I use to govern an SAP SD / OTC workstream from the first workshop to the last hypercare ticket. It covers the **what**, **how**, and **who** for every phase of an SAP Activate-aligned OTC delivery.

It is not a theoretical framework. Every element has been tested in production delivery — the governance structures, artefact requirements, decision protocols, and quality gates are real and have been refined through experience.

---

## Framework Overview

```
PHASE 1          PHASE 2           PHASE 3          PHASE 4       PHASE 5
PREPARE          EXPLORE           REALIZE          DEPLOY        RUN
───────────      ─────────────     ─────────────    ──────────    ──────────
Scope lock       Fit-to-Standard   Configuration    Cutover       Hypercare
Inventory        Gap register      WRICEF build     Validation    Stabilise
Assessment       Design doc        SIT/UAT          Go/No-Go      BAU handover
BP mapping       Sign-offs         Transport mgmt   Monitoring    
```

---

## Phase 1: Prepare

### What I Deliver in Prepare

**1. Scope Boundary Document**
A signed, version-controlled document that defines:
- In-scope OTC processes (enumerated, not summarised)
- Out-of-scope items (explicitly stated)
- Deferred items (labelled as Phase 2 / later)
- Open items requiring Architecture Board decision

*Why it matters:* Scope creep kills programmes. A signed scope boundary prevents the "but we always did it this way" conversations from expanding the build in Realize.

**2. Configuration & Master Data Inventory**
- Full extract of existing SD configuration objects (ECC source)
- Master data volumes: customers, materials, condition records, output records
- WRICEF inventory: all Z-programs, interfaces, forms touching SD processes

**3. Simplification Item Assessment (S/4HANA migrations)**
- Run STC01 (Readiness Check) on source ECC system
- Review all SD-relevant simplification items
- Classify each: No Action / Action Required / Business Decision

**4. Stakeholder Map**
- Business process owners per OTC area
- IT contacts (Basis, ABAP, Security)
- Testing leads (SIT coordinator, UAT lead)
- Programme governance contacts

### Prepare Quality Gate

Before proceeding to Explore:
- [ ] Scope Boundary Document signed by Business Owner and Programme Manager
- [ ] Simplification item assessment reviewed and business decisions captured
- [ ] Workstream plan (phases, milestones, resource) approved

---

## Phase 2: Explore — Fit-to-Standard Workshops

### Workshop Design Principles

**Principle 1: Start with the standard, not the exception.**
Show the business how standard S/4HANA handles their process before discussing gaps. Most "we can't live without this customisation" positions soften once people see the standard works 90% of the time.

**Principle 2: Decisions must be made in the room.**
Every workshop must end with documented decisions — not "we'll think about it." Unresolved decisions become risks. The facilitator's job is to reach a decision, not to defer.

**Principle 3: Document everything, especially what was rejected.**
The business will ask later "why don't we have X?" Being able to show a signed workshop record where they decided not to have X is invaluable.

### Standard OTC Workshop Series

| Workshop | Area | Core Questions Answered | Key Participants |
|---|---|---|---|
| FTS-01 | Sales Document Types | What order types? Standard or Z? Copy control approach? | Sales Lead, IT SD |
| FTS-02 | Item Categories | What line item behaviours are needed? Custom item cats? | Sales Ops, IT SD |
| FTS-03 | Pricing Architecture | What is the pricing hierarchy? How are discounts layered? | Pricing Manager, Finance, IT SD |
| FTS-04 | Credit & Risk Mgmt | Credit check type, limits, block/release process | Credit Control, Finance, IT SD |
| FTS-05 | ATP & Delivery Scheduling | What ATP check type? How are delivery dates calculated? | Logistics/Supply Chain, IT SD/MM |
| FTS-06 | Delivery & LE | Shipping points, routes, picking/packing, PGI process | Warehouse, Logistics, IT SD |
| FTS-07 | Billing & Revenue | Billing types, billing plans, FI integration, account det. | Finance/AR, IT SD/FI |
| FTS-08 | Output & Forms | What documents are printed/emailed? EDI requirements? | Sales Ops, IT SD, IT Basis |
| FTS-09 | Intercompany / 3rd Party | Is intercompany in scope? Trading partner structure? | Finance, IT SD |
| FTS-10 | Reporting & Analytics | What SD reports are needed? Fiori apps vs Z-reports? | Sales Mgmt, Finance, IT SD |

### Gap Register Management

Every gap identified in a workshop is logged in the Gap Register:

| Field | Purpose |
|---|---|
| Gap ID | Unique reference |
| Workshop | Which FTS workshop identified it |
| Description | What the business wants that standard doesn't provide |
| Standard Behaviour | What S/4HANA standard does |
| Gap Owner | Who is accountable for resolution |
| Resolution Type | Standard Config / Enhancement / Business Process Change / Defer |
| Status | Open / In Progress / Closed |
| Resolution Notes | How it was closed |
| Sign-off | Who approved the resolution |

**Gap resolution targets:**
- All gaps must have a resolution type by end of Explore
- No un-owned gaps at Explore exit
- Enhancements must be approved by Architecture Board before build starts

---

## Phase 3: Realize — Configuration Governance

### Configuration Management Standards

Every configuration object I create or change follows these standards:

**Naming Convention:**
- Customer objects: Z prefix (document types, item categories, condition types)
- Transport description format: `[Programme]-[Module]-[Area]-[Brief Description]-[Config/Dev]`
- Example: `SAPBUILD-SD-PRICING-AddCondType-ZFRT-Config`

**Change Documentation:**
Every significant configuration decision is documented in the Configuration Design Document:
- Object name and technical ID
- Business requirement driving the change
- Why the standard was not sufficient (if custom object)
- Configuration details (key fields and values)
- Test case reference

**Transport Discipline:**
- One workstream = one or more dedicated transport layers (Dev → QA → Pre-Prod → Production)
- No direct changes in QA or Production — everything via Transport Management System (TMS)
- Transport sequence documented and locked before cutover

### WRICEF Governance

For each WRICEF item:

| Phase | Activity |
|---|---|
| Explore | WRICEF item identified; functional spec initiated |
| Realize (start) | Functional spec completed and signed off by business |
| Realize (build) | Technical spec + development |
| Realize (test) | Unit test by developer; functional test by SD consultant |
| Test | SIT execution; UAT included in test pack |
| Deploy | Transport to production; regression tested |

**Functional Spec minimum content:**
- Business process context (why this is needed)
- Business rules (exact logic, not vague descriptions)
- Input data (where does the data come from?)
- Output / result (what should the system do / produce?)
- Error handling (what happens if data is missing or invalid?)
- Test scenarios (minimum 3: positive, negative, edge case)

---

## Phase 4: Testing

### SIT Approach

**SIT Objective:** Confirm all configured processes work correctly in the integrated system — including SD–FI, SD–MM, and WRICEF items.

**SIT Script Standard:**
Each SIT test script contains:
- Test script ID (e.g., SIT-SD-001)
- Process area (Sales / Pricing / Delivery / Billing)
- Preconditions (required master data, existing documents)
- Step-by-step execution instructions (T-codes, field values)
- Expected result (specific, measurable)
- Actual result (populated during execution)
- Pass / Fail status
- Defect reference (if fail)

**SIT Coverage Minimum:**
- All sales document types: create, change, confirm pricing, create delivery, PGI, bill, verify FI posting
- All billing types: create from delivery, from order, credit/debit memos
- All pricing scenarios: base price, discount, freight, tax — for all key customer groups
- Credit management: approve, block, release scenarios
- All output types: trigger, transmit, verify receipt/print

### UAT Management

**My UAT coordination approach:**
1. UAT test pack built from SIT scripts, simplified for business user execution
2. UAT kick-off: 90-minute session explaining the process, the tool, and what "pass" means
3. War room availability during UAT cycles — 2-3 sessions where I'm on-site with business users
4. Daily defect triage: review raised defects, classify (config vs training vs data vs enhancement), action
5. UAT sign-off: per-process-area sign-off documents, then overall business owner sign-off

**UAT Exit Criteria:**
- All critical (P1/P2) defects closed
- Business Owner sign-off obtained per process area
- No open items that would prevent the business from operating post-go-live

---

## Phase 5: Hypercare

### Hypercare Governance Model

**Week 1:** Maximum support intensity
- SD consultant on-site or on-call full time
- Daily stand-up: 8am (morning triage) and 4pm (end-of-day update)
- P1 SLA: identify and begin fix within 30 minutes

**Weeks 2–3:** Structured support
- Daily morning stand-up retained
- Afternoon call as needed (based on volume)
- Begin training super users to handle P3/P4 self-service

**Week 4:** Transition to BAU
- Daily stand-up frequency reduces to every 2 days
- Super users handling P3/P4 tickets directly
- SD consultant available for escalations
- BAU documentation finalised

### What Gets Documented at Hypercare Close

Before hypercare is formally closed, I produce:

1. **Known Landscape Document** — current state of all SD configuration, with transport log of all changes made post-go-live
2. **Top 10 Issues Guide** — the 10 most common issues reported in hypercare, with diagnostic steps and resolutions
3. **Configuration Change Log** — every transport applied to production during hypercare, with business justification
4. **Open Items Register** — all P3/P4 items not resolved in hypercare, classified as BAU backlog
5. **BAU Escalation Path** — who to call for what, SLA expectations, emergency contact list

---

## Governance Artefact Checklist

| Artefact | Phase | Owner | Purpose |
|---|---|---|---|
| Scope Boundary Document | Prepare | SD Lead | Lock scope; prevent creep |
| Simplification Item Assessment | Prepare | SD Lead | S/4 migration risk visibility |
| Fit-to-Standard Workshop Records | Explore | SD Lead | Decisions documented |
| Gap Register | Explore → Realize | SD Lead | Gap tracking and resolution |
| Configuration Design Document | Realize | SD Lead | Config decisions documented |
| WRICEF Functional Specs | Realize | SD Lead + ABAP | Build alignment |
| SIT Test Scripts | Realize → Test | SD Lead | SIT execution |
| UAT Test Pack | Test | SD Lead | Business acceptance |
| UAT Sign-off Documents | Test | Business | Formal acceptance |
| Cutover Runbook | Deploy | SD Lead | Cutover execution |
| Go/No-Go Criteria | Deploy | PM + SD Lead | Decision framework |
| Hypercare Incident Log | Run | SD Lead | Issue tracking |
| Known Landscape Document | Run | SD Lead | BAU handover |

---

> *This framework reflects real delivery practice from 10+ full-lifecycle SAP programmes. Adapt to the specific programme scale, governance structure, and SAP Activate phase gates in use.*
