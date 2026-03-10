# Go-Live Readiness Checklist — SAP SD Workstream

> Author: Prashanth Goud — Senior SAP SD / S/4HANA Consultant  
> This checklist is a production-gate document. Every item must be ✅ before SD workstream declares Go-Live Ready.  
> Last used: S/4HANA 2022 Brownfield Conversion · Manufacturing Programme

---

## How to Use This Checklist

- Complete this checklist at **T-5 business days** before go-live
- Each item has an **Owner** and a **Verification Method**
- Items marked ❌ or 🔶 (in progress) at T-2 days are **escalation items** for Go/No-Go review
- Any item marked ❌ at the Go/No-Go meeting is a **go-live blocker** unless formally accepted by the Business Sponsor

**Status Codes:**
- ✅ Complete and verified
- 🔶 In progress — on track
- ❌ Not complete / failing
- ⏸️ Deferred — with risk acceptance

---

## Section 1: Configuration Completeness

| # | Check Item | Owner | Verification | Status |
|---|---|---|---|---|
| 1.01 | All sales document types configured and assigned to sales areas | SD Consultant | VA01 test per doc type | |
| 1.02 | Item category determination complete for all doc type / ICG / usage combinations | SD Consultant | VOV4 review + test order | |
| 1.03 | Copy control configured for all order→delivery and delivery→billing routes | SD Consultant | Test full OTC flow per billing type | |
| 1.04 | Pricing procedure determination (OVKK) complete for all sales areas | SD Consultant | VA01 for each SOrg / DChannel / DDivision — confirm correct procedure | |
| 1.05 | All condition types in pricing procedures have access sequences assigned | SD Consultant | V/08 review — no blank access seq on active cond types | |
| 1.06 | Shipping point determination complete for all shipping condition / loading group combos | SD Consultant | VL01N test for all product groups | |
| 1.07 | Route determination configured for all departure zones / destinations | SD Consultant | Delivery creation test per route | |
| 1.08 | Delivery scheduling configured: forward/backward scheduling, plant calendars | SD Consultant | VA01 — confirm delivery date calculation | |
| 1.09 | Revenue account determination (VKOA) complete for all account assignment group combos | SD Consultant + FI | FI sign-off matrix completed | |
| 1.10 | Partner function determination configured for all customer account groups | SD Consultant | VD03 — partner functions showing correctly | |
| 1.11 | Output determination configured for all relevant output types (invoice, delivery note, order confirmation) | SD Consultant | Test output trigger per document type | |
| 1.12 | Incompletion procedures assigned and tested — status groups correct | SD Consultant | Create incomplete order — confirm block works | |
| 1.13 | Credit management configuration active and tested (automatic credit check) | SD Consultant + Finance | Test credit-blocked order scenario | |
| 1.14 | Billing type assignments correct for all delivery types and order types | SD Consultant | VF01 test for all billing type scenarios | |
| 1.15 | Intercompany / 3rd party configuration tested (if in scope) | SD Consultant | End-to-end test for intercompany scenario | |

---

## Section 2: Master Data Readiness

| # | Check Item | Owner | Verification | Status |
|---|---|---|---|---|
| 2.01 | All customer master records migrated / created in production | Data Migration | Record count reconciliation vs source | |
| 2.02 | Business Partner conversion complete (S/4HANA) — BP roles and groupings correct | SD + Technical | BP spot check for 20 customers | |
| 2.03 | Customer credit limits loaded and active in production | Finance / Credit | FD33 — sample credit limit verification | |
| 2.04 | Customer pricing procedure set in customer master (Sales Area view) | SD / Data Team | VD03 spot check — 10 customers | |
| 2.05 | Material master SD views active for all in-scope materials | MM Consultant | MM03 spot check — SD views tab | |
| 2.06 | Customer-material info records loaded (if in scope) | SD / Data Team | VD53 spot check | |
| 2.07 | Condition records loaded — pricing (PR00, price lists) | SD Consultant | VK13 — verify 20 spot check records | |
| 2.08 | Condition records loaded — customer discounts | SD Consultant | VK13 — verify discount records for key customers | |
| 2.09 | Condition records loaded — freight and surcharges | SD Consultant | VK13 spot check | |
| 2.10 | Condition record validity dates correct (not expired) | SD Consultant | VK13 — check validity period for loaded records | |
| 2.11 | Output condition records maintained (VV11 / VV21 / VV31) | SD Consultant | NACE — verify output records per output type | |
| 2.12 | Open sales order migration complete (if applicable) | Technical / SD | Record count reconciliation; VA05 check | |

---

## Section 3: Testing Sign-Off

| # | Check Item | Owner | Verification | Status |
|---|---|---|---|---|
| 3.01 | SIT completed — all test scripts executed and passed | SD Consultant | SIT summary sign-off document | |
| 3.02 | SIT defects — all P1/P2 defects closed | SD Consultant | Defect log — zero open P1/P2 | |
| 3.03 | UAT completed — all UAT test cases executed | Business UAT Lead | UAT execution report | |
| 3.04 | UAT business sign-off obtained from all process areas | Business Owner | Signed UAT sign-off document | |
| 3.05 | Regression testing complete for all WRICEF items | SD + Technical | Regression test report | |
| 3.06 | Performance testing complete — pricing determination within SLA for large orders | Technical + SD | Performance test results documented | |
| 3.07 | Cutover dress rehearsal 1 completed | SD Lead + PM | Dress rehearsal 1 report | |
| 3.08 | Cutover dress rehearsal 2 completed — within target window | SD Lead + PM | Dress rehearsal 2 report + timing | |
| 3.09 | All P1/P2 defects from dress rehearsals resolved | SD Consultant | Defect log — all DR issues closed | |

---

## Section 4: Integration Readiness

| # | Check Item | Owner | Verification | Status |
|---|---|---|---|---|
| 4.01 | SD–FI integration tested end-to-end (VA01 → VF01 → FI posting verified) | SD + FI | Integration test sign-off | |
| 4.02 | SD–MM integration tested (VA01 → VL01N → PGI → inventory reduction) | SD + MM | MM integration test sign-off | |
| 4.03 | EDI / IDoc outbound tested for all relevant message types | Technical / SD | IDoc test in production environment | |
| 4.04 | EDI / IDoc inbound tested (if applicable) | Technical | Inbound IDoc test | |
| 4.05 | Third-party interfaces tested and signed off | Technical | Interface test documentation | |
| 4.06 | Credit management integration with FI (FSCM) tested — if applicable | SD + FI | Credit management scenario test | |

---

## Section 5: Batch Jobs & Scheduling

| # | Check Item | Owner | Verification | Status |
|---|---|---|---|---|
| 5.01 | VF04 (Collective Billing) batch job scheduled in Production | Basis | SM37 — job confirmed scheduled |  |
| 5.02 | Output processing batch job scheduled (if applicable) | Basis | SM37 — job confirmed | |
| 5.03 | Credit check batch job scheduled (if applicable) | Basis | SM37 — job confirmed | |
| 5.04 | Condition record background job (mass update) tested if applicable | SD / Basis | Test run confirmed | |
| 5.05 | All batch jobs tested in pre-production with production-equivalent data | Basis | Job test log reviewed | |

---

## Section 6: Cutover Readiness

| # | Check Item | Owner | Verification | Status |
|---|---|---|---|---|
| 6.01 | SD cutover runbook finalised and distributed to all owners | SD Lead | Runbook distribution confirmed | |
| 6.02 | Open document handling decisions signed off by business | Business Owner | Signed handling matrix | |
| 6.03 | Go/No-Go criteria document approved by all stakeholders | PM + Business | Signed G/NG criteria doc | |
| 6.04 | War room logistics confirmed (location, tools, access, comms) | PM | Confirmation document | |
| 6.05 | Fallback / rollback plan documented and approved | PM + Technical | Rollback plan document | |
| 6.06 | All cutover task owners confirmed and briefed | SD Lead + PM | Task owner acknowledgement | |
| 6.07 | Transport sequence locked and reviewed by all consultants | All Functional | Transport sequence document | |

---

## Section 7: User Readiness & Training

| # | Check Item | Owner | Verification | Status |
|---|---|---|---|---|
| 7.01 | End-user training completed for all OTC process users | Training Lead | Training completion report | |
| 7.02 | Super users / key users trained and confident on all SD processes | SD Consultant | Super user sign-off | |
| 7.03 | User access provisioned in Production (roles and authorisations) | Basis / Security | Access matrix verified for sample users | |
| 7.04 | Quick reference guides / job aids distributed to users | Training Lead | Distribution confirmation | |
| 7.05 | Post-go-live support model communicated to business | PM / SD Lead | Communication sent and acknowledged | |

---

## Section 8: Hypercare Readiness

| # | Check Item | Owner | Verification | Status |
|---|---|---|---|---|
| 8.01 | Hypercare team rota confirmed (consultant availability for 4 weeks) | SD Lead / PM | Rota document | |
| 8.02 | Incident management process and SLAs communicated to business | PM | Communication confirmed | |
| 8.03 | Escalation path documented and all named contacts confirmed | PM | Escalation document signed | |
| 8.04 | Hypercare daily stand-up cadence confirmed with business | SD Lead | Invitation sent | |
| 8.05 | ServiceNow / ticketing system configured for hypercare tickets | IT Service Mgmt | Queue confirmed | |

---

## Go/No-Go Summary

At the Go/No-Go meeting, this section is completed:

| Section | Total Items | ✅ Pass | 🔶 In Progress | ❌ Fail | Recommendation |
|---|---|---|---|---|---|
| 1. Configuration | 15 | | | | |
| 2. Master Data | 12 | | | | |
| 3. Testing | 9 | | | | |
| 4. Integration | 6 | | | | |
| 5. Batch Jobs | 5 | | | | |
| 6. Cutover | 7 | | | | |
| 7. User Readiness | 5 | | | | |
| 8. Hypercare | 5 | | | | |
| **TOTAL** | **64** | | | | |

**SD Workstream Go-Live Recommendation:**

- [ ] ✅ **GO** — All items passed or risk-accepted open items documented
- [ ] ❌ **NO-GO** — Open blockers require resolution before go-live

**SD Workstream Lead Sign-off:**  `_________________________`  Date: `___________`

**Business Owner Sign-off:**  `_________________________`  Date: `___________`

**Programme Manager Sign-off:**  `_________________________`  Date: `___________`

---

> *This checklist is a starting point and should be adapted for each programme's specific scope, scale, and risk profile. Add or remove items to reflect in-scope processes.*
