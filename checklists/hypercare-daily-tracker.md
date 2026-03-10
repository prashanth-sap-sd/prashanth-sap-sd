# Hypercare Daily Tracker — SAP SD Workstream

> Author: Prashanth Goud — Senior SAP SD / S/4HANA Consultant  
> Purpose: Daily incident management and SLA tracking during post-go-live hypercare  
> Print or use as a live spreadsheet template

---

## Hypercare Overview

| Programme | Go-Live Date | Hypercare Start | Hypercare Target End |
|---|---|---|---|
| [Programme Name] | [Date] | [Date] | [Date — typically 4–6 weeks] |

**Hypercare Lead:** Prashanth Goud  
**Business Contact:** [Name / Role]  
**IT Escalation:** [Name / Role]  

---

## SLA Reference

| Priority | Definition | Response SLA | Resolution SLA |
|---|---|---|---|
| **P1** | Production stopped — users cannot complete critical business process | 30 minutes | 4 hours |
| **P2** | Major business impact — workaround exists but is unacceptable long-term | 2 hours | 8 hours |
| **P3** | Minor impact — workaround exists; business can continue | 4 hours | 2 business days |
| **P4** | Cosmetic issue or minor enhancement request | Next business day | Planned sprint |

**Escalation triggers:**
- P1 not resolved within 2 hours → Escalate to Programme Manager and Business Sponsor
- P2 not resolved within 6 hours → Escalate to Programme Manager
- Same issue recurring 3+ times → Root cause investigation required

---

## Daily Stand-Up Agenda (8:00 AM — 20 minutes max)

```
1. Open incidents review (5 min)
   - New P1/P2 since last stand-up?
   - Status of yesterday's open items?

2. Priority actions today (5 min)
   - What are we resolving today?
   - Who owns each?

3. Business update (5 min)
   - Any upcoming business processes that might surface new issues?
   - Anything from overnight batch jobs?

4. Blockers (5 min)
   - Do we need Basis support, ABAP support, FI/MM input?
```

---

## Incident Log Template

Use one row per incident. Track from open to close.

| ID | Date Raised | Priority | Raised By | Process Area | Description | Root Cause | Fix Approach | Owner | Date Resolved | Resolution Notes | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|
| HC-001 | | P2 | | Pricing | | | | | | | Open |
| HC-002 | | P3 | | Delivery | | | | | | | Open |

### Process Area Codes
- **SALES** — Sales order creation, item categories, copy control
- **PRICING** — Pricing determination, condition records, discounts
- **CREDIT** — Credit blocks, credit limit, VKM1
- **DELIVERY** — VL01N/VL02N, shipping point, PGI, delivery dates
- **BILLING** — VF01/VF04, billing blocks, account determination
- **OUTPUT** — Invoice output, delivery note, EDI/IDoc
- **INT-FI** — SD→FI posting, revenue account, clearing
- **INT-MM** — Inventory, goods movement, 3rd party
- **BATCH** — Background jobs, collective billing, output processing
- **ACCESS** — User authorisations, missing roles
- **TRAINING** — User error, process not followed correctly
- **DATA** — Master data error, condition record issue

---

## Daily Summary Dashboard

### Week [N] — Day [N]

**Date:** [Date]  
**Hypercare Day:** [Day #] of [Total Target Days]

**Incident Summary — Cumulative:**

| Priority | Total Raised | Resolved | Open | SLA Breaches |
|---|---|---|---|---|
| P1 | 0 | 0 | 0 | 0 |
| P2 | | | | |
| P3 | | | | |
| P4 | | | | |
| **Total** | | | | |

**Open Incidents Today:**

| ID | Priority | Area | Description | Owner | Target Resolution |
|---|---|---|---|---|---|
| | | | | | |

**Resolved Since Last Stand-up:**

| ID | Priority | Area | Resolution Summary |
|---|---|---|---|
| | | | |

**Today's Actions:**

| # | Action | Owner | Due |
|---|---|---|---|
| 1 | | | |

**Blockers / Escalations:**
- [ ] None today

---

## Weekly Trend Report Template

### Week [N] Summary

**Period:** [From Date] to [To Date]

| Metric | Week 1 | Week 2 | Week 3 | Week 4 | Trend |
|---|---|---|---|---|---|
| New P1 incidents | | | | | |
| New P2 incidents | | | | | |
| New P3 incidents | | | | | |
| New P4 incidents | | | | | |
| **Total new** | | | | | ↓ Target |
| Resolved this week | | | | | |
| SLA breaches | | | | | Target: 0 |

**Top Issue Categories This Week:**
1. 
2. 
3. 

**Systemic Issues Identified:**
- 

**Actions Taken to Prevent Recurrence:**
- 

---

## Root Cause Category Analysis

At the end of hypercare, categorise all incidents to identify systemic issues:

| Root Cause Category | Count | % of Total | Action |
|---|---|---|---|
| Configuration gap — not in SIT/UAT scope | | | Document and fix; update config checklist |
| Data quality issue — master data | | | Data governance action |
| User training gap | | | Super user coaching; knowledge article |
| Business process not followed | | | Process documentation update |
| Interface / integration issue | | | Technical team action |
| Enhancement / new requirement | | | Backlog for next release |
| Environment / performance | | | Basis action |
| **Total** | | | |

---

## Hypercare Exit Criteria Sign-off

| Criterion | Met? | Evidence | Sign-off |
|---|---|---|---|
| Zero open P1 or P2 incidents | ☐ | | |
| P3 volume trending downward for 2 weeks | ☐ | Week-on-week chart | |
| All critical business processes validated | ☐ | Process sign-off docs | |
| BAU support team trained | ☐ | Training completion | |
| Known landscape document completed | ☐ | Document link | |
| Top 10 issues guide delivered | ☐ | Document link | |
| BAU escalation path documented | ☐ | Document link | |
| Open items transferred to BAU backlog | ☐ | Backlog list | |

**Business Sponsor Hypercare Sign-off:**  

`_________________________________`  Name: ___________________  Date: ____________

**SD Workstream Lead Sign-off:**  

`_________________________________`  Name: Prashanth Goud  Date: ____________

---

> *This tracker is designed to be used as a live spreadsheet (Excel or Google Sheets) during hypercare. The template structure above maps directly to a spreadsheet tab layout: Dashboard | Incident Log | Weekly Trend | Root Cause Analysis | Exit Criteria.*
