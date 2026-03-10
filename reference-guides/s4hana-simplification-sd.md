# Case Study: S/4HANA Migration — SD Workstream Lead

> **Role:** SAP SD Workstream Lead  
> **Programme Type:** ECC 6.0 → S/4HANA 2022 Brownfield Conversion  
> **Industry:** Global Manufacturing (Sanitised)  
> **Duration:** 14 months (Prepare → Hypercare Closure)  
> **Scope:** 3 Sales Organisations · 2 Distribution Channels · 18 Plant combinations

---

## Executive Summary

Led the end-to-end SAP SD workstream on a global S/4HANA brownfield conversion for a manufacturing client operating across Europe and Asia-Pacific. Accountable for workstream scoping, fit-to-standard facilitation, configuration ownership, testing strategy, cutover planning, and a 4-week hypercare stabilisation period.

**Result:** On-time go-live with zero Priority-1 production incidents in hypercare. SD workstream closed with full business sign-off within target window.

---

## Programme Context

### Background
The client had been running SAP ECC 6.0 (EHP7) for 12 years with significant customisation debt — over 300 Z-reports, heavily modified output routines, and a pricing landscape that had grown organically to 180+ active condition types across 6 pricing procedures. The board mandate was a clean-core S/4HANA conversion with minimal new customisation.

### My Mandate
- Own the SD workstream across all phases of SAP Activate
- Lead fit-to-standard workshops across all OTC process areas
- Drive configuration and testing to production readiness
- Deliver cutover and own post-go-live stabilisation

---

## Phase-by-Phase Delivery

### Phase 1: Prepare (Weeks 1–6)

**Scope Definition Workshop**
Ran a 3-day scope definition workshop with the SD business owner, key users from 4 business units, and the programme PMO. Output: agreed scope boundary document locking 47 in-scope OTC processes, 12 out-of-scope items parked for Phase 2, and 8 open items requiring Architecture Board decision.

**Inventory & Assessment**
- Catalogued all existing SD configuration objects (document types, item categories, condition types, output types, copy control variants)
- Ran the SAP Simplification Item Check against the existing ECC landscape — identified 14 SD-relevant simplification items requiring action
- Assessed Business Partner conversion impact: client had 42,000 customer master records using classic customer account groups — mapped conversion requirements to BP groupings and BP roles

**Key Simplification Items Actioned (SD)**
| Simplification Item | ECC Behaviour | S/4HANA Impact | Action Taken |
|---|---|---|---|
| Business Partner | Customer master (XD01) | BP mandatory (BP) | BP grouping mapped, conversion script tested |
| Availability Check | Classic ATP | aATP enabled | Checking rules validated per plant |
| Credit Management | FD32 | FSCM-based | Business decision: retain SD credit mgmt initially |
| Customer-Material Info | Separate infos | Harmonised | No impact to config |
| Intercompany Pricing | ZIC procedure | Requires clean setup | Procedure reviewed, redundant steps removed |

---

### Phase 2: Explore — Fit-to-Standard Workshops (Weeks 7–14)

Ran 11 fit-to-standard workshops covering all OTC sub-processes:

| Workshop | Process Area | Outcome |
|---|---|---|
| FTS-01 | Sales Document Types & Ordering | 3 standard doc types retained; 4 Z-variants retired |
| FTS-02 | Item Categories & Copy Control | Rationalised from 22 item cat variants to 14 |
| FTS-03 | Advanced Pricing Architecture | Pricing redesign agreed (see separate case study) |
| FTS-04 | Availability Check & ATP | aATP enabled for 2 plants; standard ATP retained for 6 |
| FTS-05 | Credit & Risk Management | Existing SD credit mgmt retained; FSCM deferred |
| FTS-06 | Delivery & Logistics Execution | Shipping point determination reviewed; 2 routes added |
| FTS-07 | Billing & Revenue | Billing plan consolidation; VKOA remapped |
| FTS-08 | Output & Forms | NACE replaced with BRF+/Output Management in S/4 |
| FTS-09 | SD–FI Integration | Account determination revalidated end-to-end |
| FTS-10 | Intercompany & 3rd Party | 3rd party scenario redesigned for clean-core |
| FTS-11 | Reporting & Analytics | 18 Z-reports retired; Fiori analytical apps validated |

**Fit-to-Standard Gap Register**
Identified 23 gaps from standard S/4HANA behaviour. Classified and resolved:
- **14 gaps:** Closed via standard configuration (no development)
- **6 gaps:** Approved as enhancements (WRICEF items raised)
- **3 gaps:** Business process change accepted by business owner

---

### Phase 3: Realize — Configuration & Build (Weeks 15–36)

#### Configuration Ownership

Owned configuration across the full SD object hierarchy:

**Sales:**
- Defined sales document type landscape: 8 order types (OR, RO, CS, CR, DR, RE, IR, ZNB)
- Item category determination — maintained 47 assignment rows covering all doc type / item cat group / usage combinations
- Copy control: configured 23 copy control routes (order→delivery, order→billing, delivery→billing); defined item-level data transfer routines
- Incompletion procedures: defined 6 incompletion profiles covering sales orders, deliveries, billing; assigned status groups blocking delivery/billing where critical fields incomplete
- Partner determination: configured 6 partner function schemas across customer account groups

**Pricing:**
- Redesigned pricing procedure landscape (see Advanced Pricing Architecture case study)
- Migrated 140+ condition types to rationalised 84-type landscape
- Built condition record migration scripts for 96,000 active condition records
- Implemented condition record governance model with validity management SOP

**Delivery & LE:**
- Configured shipping point determination: 3 shipping points, 14 shipping condition / loading group combinations
- Route determination: defined 22 routes across 3 departure zones; configured transit time matrix
- Delivery scheduling: validated backward scheduling logic against plant calendars and shipping point working hours
- Transfer order configuration for LE-WM integration (non-S/4 WM; retained classic WM for Phase 1)

**Billing:**
- Configured billing type landscape: 7 billing types (F2, G2, L2, RE, S1, IV, MIRO-adjacent)
- Revenue account determination: remapped VKOA assignment for 4 chart of accounts / condition type combinations; validated with FI lead
- Billing document splitting rules for intercompany scenarios

#### WRICEF Delivery Coordination
Owned SD WRICEF scope (12 items):
- 4 Reports: OTC backlog report, pricing analysis report, delivery schedule report, billing cockpit
- 3 Interfaces: EDI output for 3 key customers (IDoc INVOIC02, DESADV)
- 2 Enhancements: custom pricing formula (VOFM routine), custom incompletion check
- 2 Forms: invoice layout, delivery note (SmartForms → Adobe Forms migration)
- 1 Conversion: condition record mass load via LSMW

---

### Phase 4: Testing (Weeks 30–42)

#### SIT (System Integration Testing)
- Authored 84 SIT test scripts covering full OTC flow with positive/negative scenarios
- Coordinated with MM, FI/CO, and PP consultants on integration test scenarios
- Managed SIT defect log: 47 defects raised, 44 resolved, 3 deferred to UAT
- Zero open critical defects at SIT exit gate

#### UAT (User Acceptance Testing)
- Worked with business UAT coordinator to design 6 test cycles across business units
- Supported business users during execution: 3 UAT war room sessions
- UAT sign-off achieved: 156 test cases executed, 148 passed, 8 defects (all P3/P4), business sign-off obtained

#### Performance & Regression
- Participated in volume test: validated pricing determination performance for 500-line sales orders
- Regression tested all WRICEF enhancements post-transport

---

### Phase 5: Deploy — Cutover (Weeks 43–46)

#### Cutover Planning
Built the SD cutover runbook covering:
- **Pre-cutover freeze:** Open sales order, delivery, and billing document management — defined handling for 1,247 open OTC documents
- **System close:** Open delivery processing, final billing run, clearing open credits
- **Data migration:** Condition record load (96,000 records via LSMW), customer-material info record migration
- **Business Partner conversion:** Validated BP conversion for 42,000 customers including BP role assignment and address harmonisation
- **Post-cutover validation:** 34-step SD validation checklist (pricing, order creation, delivery, billing, FI posting end-to-end)

#### Cutover Dress Rehearsals
- **Dress Rehearsal 1:** Identified 6 sequencing gaps and 2 missing transport steps — corrected
- **Dress Rehearsal 2:** Full cutover completed in 31 hours against 36-hour window — 5 hours contingency retained

#### Go-Live Weekend
- On-site war room presence for 38-hour cutover window
- SD validation checklist completed: all 34 items passed
- First productive sales order created at T+2h post go-live: clean end-to-end
- Go/No-Go approved at scheduled decision point

---

### Phase 6: Hypercare (Weeks 47–50)

#### Hypercare Structure
- Daily 8am SD stand-up: open incidents, P1/P2 triage, day's priority actions
- SLA targets: P1 < 4h, P2 < 8h, P3 < 2 business days
- Escalation path: Consultant → Programme Manager → Client IT Director

#### Incident Summary (4-Week Hypercare)

| Priority | Raised | Resolved | Root Cause Categories |
|---|---|---|---|
| P1 | 0 | 0 | — |
| P2 | 4 | 4 | Pricing (2), Output (1), Delivery scheduling (1) |
| P3 | 18 | 18 | User training (8), Config (6), Data (4) |
| P4 | 31 | 29 | Minor enhancements, cosmetic |

**Notable P2 resolutions:**
- *Pricing P2:* Condition record for a customer group not loading due to missing access sequence step — root cause was a transport dependency gap in condition table assignment. Fixed via emergency transport, 2.5 hours to resolution.
- *Delivery Scheduling P2:* Incorrect material availability dates on orders for one plant — root cause: shipping point calendar not updated for holiday calendar. Configuration corrected, historical orders re-triggered.

#### Hypercare Closure
- Formal hypercare exit achieved Week 4
- Handover documentation completed: known issue register, config change log, monitoring runbook
- All open items transferred to BAU support with full context notes
- Business sponsor sign-off obtained

---

## Key Deliverables Produced

| Deliverable | Format | Purpose |
|---|---|---|
| SD Scope Boundary Document | Word | Locked scope for all phases |
| Fit-to-Standard Gap Register | Excel | 23 gaps tracked to resolution |
| Configuration Design Document | Word/Excel | Full config decisions documented |
| Business Partner Conversion Mapping | Excel | 42k customer records scoped |
| SIT Test Script Pack (84 scripts) | Excel | System integration test execution |
| UAT Test Pack (156 cases) | Excel/HP ALM | Business user acceptance |
| Cutover Runbook | Excel | 34-step validated execution guide |
| Hypercare Incident Log | Excel | 4-week incident tracking |
| Knowledge Transfer Pack | Word | BAU handover documentation |

---

## Lessons Learned

1. **Business Partner conversion scope must be locked early.** BP grouping decisions have downstream impacts on output determination, credit management, and partner function schema — changes late in the project are expensive.

2. **Condition record volume drives cutover duration.** 96,000 records via LSMW took 4.2 hours in dress rehearsal. Run parallel loads where data integrity allows.

3. **Open document handling is the most politically complex cutover workstream.** Defining the business rules for how to handle ~1,200 open OTC documents at cutover requires early business engagement — this is not a technical decision.

4. **Output management in S/4HANA (BRF+) is a significant change from NACE.** Allocate dedicated workshops for output redesign — it is not a like-for-like migration.

5. **aATP adoption needs change management, not just config.** The checking rule change impacts confirmed dates — business users need to understand and accept this before go-live.

---

> *All client, company, system landscape, and volume data has been sanitised or generalised. This case study reflects real delivery patterns and methodology from live programme experience.*
