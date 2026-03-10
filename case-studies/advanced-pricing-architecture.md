# Case Study: Advanced Pricing Architecture & Governance

> **Role:** SAP SD Pricing Lead  
> **Programme Type:** Pricing Rationalisation & Governance Programme  
> **Industry:** Global FMCG Distribution (Sanitised)  
> **Duration:** 6 months  
> **Scope:** 6 Sales Organisations · 4 Distribution Channels · 140+ active condition types

---

## Executive Summary

Led a full rationalisation of a legacy SAP ECC pricing landscape that had grown organically over 8 years into an unmaintainable, poorly documented condition procedure maze. Redesigned the architecture from first principles — reducing active condition types by 43%, eliminating 3 redundant pricing procedures, and delivering a governance model that the business could own and maintain post-project.

**Result:** Pricing determination errors reduced to near-zero post-implementation. Business able to maintain condition records independently. Audit trail fully established.

---

## The Problem: Organic Pricing Debt

When I joined this engagement the pricing landscape looked like this:

```
Before Rationalisation:
──────────────────────

Pricing Procedures:    6 active (3 functionally redundant)
Condition Types:       183 active (many duplicated or unused)
Access Sequences:      47 (26 with overlapping field combinations)
Condition Tables:      89 (31 with zero active condition records)
Active Cond. Records:  ~110,000
Documentation:         Minimal — no procedure rationale, no ownership log
Business complaints:   Frequent — "wrong price on order", "discount not applying"
Support tickets:       ~40 pricing-related tickets per month

Known issues:
- Exclusion group conflicts causing incorrect discount stacking
- Condition records with expired validity dates still interfering
- Access sequence priorities not aligned to business pricing hierarchy
- No governance over who creates/changes condition records
- VOFM routines undocumented; original developer had left
```

---

## Approach: Architecture Before Configuration

### Step 1: Pricing Landscape Discovery (Weeks 1–3)

Ran a structured discovery across all pricing-relevant configuration and master data:

**Configuration Audit**
- Extracted all condition types from T685 and cross-referenced against actual usage in T683S (pricing procedure steps)
- Identified 47 condition types defined in config but never used in any pricing procedure — flagged for deactivation
- Mapped all 6 pricing procedures against their assigned sales areas and customer pricing procedure combinations (T683V)
- Documented every VOFM formula and requirement routine assigned in the procedures

**Condition Record Analysis**
- Analysed active condition records by condition type: 23 condition types had zero active records
- Identified 8,400 condition records with validity end dates in the past (still loaded, causing performance overhead)
- Identified duplicate condition records: same key combination, overlapping validity — creating non-deterministic pricing outcomes

**Business Pricing Logic Interviews**
- Conducted 8 interviews across sales, finance, and pricing administration teams
- Mapped actual business pricing intent: base price → customer group discount → material group discount → volume scale → freight → tax
- Identified 6 scenarios where SAP pricing was producing incorrect results vs business intent — root-caused each to specific configuration gaps

### Step 2: Target Architecture Design (Weeks 4–6)

**Pricing Hierarchy Design**

Designed a clean condition type hierarchy aligned to business intent:

```
Pricing Procedure: ZPRICE (New Rationalised Procedure)
═══════════════════════════════════════════════════════

Step  Ctr  CTyp  Description                    From  To  Req  Alt  AltCV  Print  Stat
  10    0  PR00  Base Price (Material/SOrg)        -    -    -    -     -     X      -
  20    0  ZPRL  Price List (PricGrp/Matl)          -    -    -    -     -     X      -
  30    0  ZVKP  Customer-Specific Price            -    -    -    -     -     X      -
  ──  subtotal: Gross Price (SubTo A)
  40    0  K007  Customer Discount (%)            10    -    -    -     -     X      -
  50    0  K004  Material Discount (%)            10    -    -    1     -     X      -
  60    0  K020  Price Group Discount (%)         10    -    -    2     -     X      -
  70    0  K032  Price Grp/Matl Disc (%)          10    -    -    3     -     X      -
  ──  subtotal: Net Price after Discounts (SubTo B)
  80    0  ZSCL  Volume Scale Discount            40    -   B01   -     -     X      -
  90    0  ZFRG  Freight Surcharge                 -    -    -    -     -     X      -
 100    0  MWST  Tax (Output)                     80    -    -    -     -     X      -
 110    0  VPRS  Cost (Statistical)                -    -    -    -     1     -      X
 120    0  SKTO  Cash Discount (Statistical)      80    -    -    -     -     -      X
 130    0  NETW  Net Value                         -    -    -    -     -     -      X

Exclusion Groups:
  Group 1: K004, K020, K032  (best customer/material disc, not stacked)
  Group 2: (none — ZSCL additive to best discount)
```

**Access Sequence Rationalisation**

| Old Access Sequences | New Rationalised | Reduction |
|---|---|---|
| 47 total | 19 retained / redesigned | 60% reduction |
| 26 with field overlap | 0 overlap conflicts | Eliminated |
| Mixed search priorities | Documented priority logic | Standardised |

**Condition Table Rationalisation**

Identified the minimum required field combination set:

```
Priority 1 (Most Specific):  Customer + Material               [KUNNR + MATNR]
Priority 2:                  Customer + Material Group          [KUNNR + MATKL]  
Priority 3:                  Price Group + Material             [KPEIN + MATNR]
Priority 4:                  Price Group + Material Group       [KPEIN + MATKL]
Priority 5 (Most General):   Sales Org + Material              [VKORG + MATNR]
Priority 6:                  Sales Org only (floor price)       [VKORG]
```

This replaced 23 different table configurations with inconsistent field combinations — many tables were functionally identical, causing the access sequence to perform redundant lookups.

### Step 3: Configuration Implementation (Weeks 7–14)

**What Was Changed**

| Object | Before | After | Change |
|---|---|---|---|
| Pricing Procedures | 6 | 3 | 3 retired (absorbed into main) |
| Condition Types | 183 | 104 | 79 deactivated (47 unused + 32 duplicates) |
| Access Sequences | 47 | 19 | 28 consolidated |
| Condition Tables | 89 | 41 | 48 retired (zero records) |
| VOFM Routines | 12 | 8 | 4 retired; 8 documented with logic comments |

**Condition Record Migration**
- Expired condition records (8,400): batch-deactivated via mass processing (VK12 + LSMW)
- Duplicate condition records: resolved through validity period splitting where business intent was to transition between values; deleted where genuinely redundant
- Active record migration to new table structures: 96,400 records migrated via LSMW with full reconciliation check

**Exclusion Group Fix**
The original pricing procedure had no exclusion groups configured. This meant customers were receiving all three discount condition types simultaneously — price group discount, material group discount, and customer discount — stacked, which was not the business intent.

Implemented exclusion group logic:
- Exclusion Group 01 assigned to K004, K020, K032
- Exclusion type A (best condition wins) — system selects highest-value discount and excludes others
- Tested across 40 customer/material combinations: all scenarios now produce single best-discount outcome

### Step 4: Governance Model (Weeks 15–18)

The technical rationalisation alone wouldn't last without a governance model. Built and handed over:

**Condition Record Ownership Matrix**

| Condition Type | Who Creates | Who Approves | Validity Rule | Review Cycle |
|---|---|---|---|---|
| PR00 (Base Price) | Pricing Admin | Commercial Director | Max 1 year | Quarterly |
| K007 (Cust Disc) | Key Account Mgr | Sales Director | Max 6 months | Monthly |
| K004 (Matl Disc) | Pricing Admin | Pricing Manager | Max 12 months | Quarterly |
| ZSCL (Volume Scale) | Pricing Analyst | Finance Director | Annual | Annual |
| MWST (Tax) | Finance | Tax Team | Statutory periods | As required |

**Change Control SOP**
- New condition type requests: Architecture Board sign-off required (not ad-hoc additions)
- New condition table requests: Pricing Lead + IT approval
- Condition record mass changes: dual-control — requestor + authoriser + documented business justification
- Quarterly condition record review: expired records purged, zero-usage records reviewed

**Pricing Troubleshooting Guide**
Documented a systematic pricing diagnostic methodology (see separate reference guide) — so business and support team can self-serve diagnosis before raising a consultant ticket.

---

## Pricing Troubleshooting Methodology

When a pricing error is reported ("wrong price on order"), follow this systematic diagnostic:

```
STEP 1: IDENTIFY THE SYMPTOM
├── Price too high / too low?
├── Discount missing / wrong discount?
├── Tax incorrect?
└── Total net value wrong?

STEP 2: ANALYSE THE PRICING ANALYSIS (VA02 > Item > Conditions > Analysis)
├── Check which condition types are ACTIVE vs INACTIVE
├── Check which condition types show "Condition record found" vs "Not found"
├── Check access sequence hits — which access found the record?
└── Check exclusion group outcomes — what was excluded and why?

STEP 3: VALIDATE CONDITION RECORD (VK13)
├── Does a record exist for this customer / material / sales area?
├── Is the validity date current (today within from/to dates)?
├── Is the amount correct?
└── Is the condition record in the correct currency / unit?

STEP 4: VALIDATE ACCESS SEQUENCE (V/07)
├── Is the search priority correct? (Most specific first)
├── Are all required fields present in the sales order header/item?
└── Is there a more specific record that should have been found first?

STEP 5: VALIDATE PRICING PROCEDURE ASSIGNMENT (OVKK)
├── Sales Area + Document Pricing Procedure + Customer Pricing Procedure → Procedure
├── Is the correct procedure assigned for this sales area and document type?
└── Is the customer pricing procedure set correctly in customer master (VD03)?

STEP 6: CHECK REQUIREMENTS AND ROUTINES (VOFM)
├── Are there requirement routines on the condition step that might exclude it?
├── Are there calculation type routines that modify the base amount?
└── Are there alternative condition value routines affecting the final value?

STEP 7: CHECK EXCLUSION GROUPS
├── Is the condition type in an exclusion group?
├── Was it excluded because a higher-value condition in the same group was found?
└── Is the exclusion group logic (A/B/C) producing the intended business outcome?
```

---

## Results

| Metric | Before | After | Improvement |
|---|---|---|---|
| Active Condition Types | 183 | 104 | 43% reduction |
| Active Pricing Procedures | 6 | 3 | 50% reduction |
| Monthly Pricing Support Tickets | ~40 | ~6 | 85% reduction |
| Pricing Determination Time (avg) | 1.8s (500-line order) | 0.9s | 50% faster |
| Condition Records with Issues | 8,400+ | 0 | Fully cleaned |
| Configuration Documentation | Minimal | Complete | 100% documented |

---

## Key Takeaways for Pricing Architecture

1. **Never add a condition type without justification.** Every condition type adds access sequence lookups and performance overhead. The test should be: "What business pricing scenario does this enable that cannot be achieved with existing types?"

2. **Access sequence field priorities must mirror the business pricing hierarchy.** If the business intends customer-specific price to override price list price, the access sequence must reflect this. Misalignment is the root cause of most pricing errors.

3. **Exclusion groups are essential for discount stacking control.** Without them, multiple discount condition types will all apply simultaneously — which is almost never the business intent.

4. **Expired condition records degrade pricing performance.** The access sequence evaluates validity dates on every lookup. A clean, current condition record landscape is a performance optimisation, not just housekeeping.

5. **Governance without process is worthless.** The ownership matrix and change control SOP only work if there is a named owner, a review cycle, and a mechanism to enforce it. Build the process and the training, not just the documentation.

---

> *All client, company, sales organisation, and volume data has been sanitised. Condition type names and configuration values reflect real SAP standard and custom type patterns used in enterprise pricing landscapes.*
