# Pricing Troubleshooting Guide — SAP SD Condition Technique

> Author: Prashanth Goud — Senior SAP SD / S/4HANA Consultant  
> Purpose: Systematic diagnostic methodology for SAP SD pricing issues  
> Built from: 10+ years of pricing incident resolution across ECC and S/4HANA landscapes

---

## The Golden Rule of SAP Pricing Diagnosis

> **Never guess. Always analyse.**
>
> The pricing analysis screen (VA02 → Item → Conditions → Analysis button) tells you exactly what happened — which condition types were evaluated, which found records, which were inactive, and why. Start here before touching any configuration.

---

## Quick Diagnostic Decision Tree

```
REPORTED ISSUE: "Pricing is wrong on the sales order"
                          │
           ┌──────────────┴──────────────┐
           │                             │
    Wrong amount                  Condition not
    on existing                   appearing at all
    condition type                      │
           │                    ┌───────┴────────┐
    ▶ Check condition        No record      Record found
      record (VK13)          found          but inactive
      Validity? Amount?          │               │
      Key fields?            ▶ Check         ▶ Check
                               access seq    requirements
                               Did it        routine (Req)
                               search?       in procedure
                               Correct key?  Check active/
                                            inactive flag
                                            Check manual
                                            change override
```

---

## Symptom Reference Guide

### Symptom 1: Condition type shows "No condition record found" in analysis

**Most Likely Causes (in order of frequency):**

1. **Condition record does not exist** — VK13 shows nothing for the key combination
   - Fix: Create the condition record (VK11) with correct key

2. **Validity date expired or not yet started** — Record exists but today's date falls outside the from/to dates
   - Fix: Extend validity (VK12) or create new record with correct dates

3. **Access sequence not searching the right key combination** — The condition type's access sequence priorities don't include the key combination you created the record for
   - Check: V/07 — view the access sequence. Are the field combinations in the right priority order?

4. **Sales-area fields missing or wrong on the order** — The access sequence requires Sales Org + Distribution Channel but one is missing from the order header
   - Check: VA03 header — confirm all org data is populated

5. **Condition record in wrong sales area** — Record created for SOrg 1000 / CH 10, but order is for SOrg 1000 / CH 20
   - Fix: VK11 — create record for the correct combination

6. **Incorrect customer pricing procedure** — Access sequence searches for the customer's pricing procedure as a key field; customer has wrong value in master
   - Check: VD03 → Sales tab → Customer pricing procedure

### Symptom 2: Condition type shows as "Inactive" in analysis

**Diagnostic Steps:**

```
In the pricing analysis (VA02 > Item > Conditions > Analysis):
Inactive reasons shown in the Inactive column:
  
  A = Condition excluded (exclusion group)
  B = Manual entry overrides automatic condition
  C = Condition deactivated manually in the document
  D = Condition locked (scale not filled, for example)
  G = Condition not copied from reference document
  H = Preliminary pricing run
  I = Copied conditions have been changed by pricing type
```

| Inactive Code | Meaning | Fix |
|---|---|---|
| A | Excluded by exclusion group — another condition in the group won for this item | Check if the exclusion outcome is correct (intentional). If not: review exclusion group assignment (V/08) |
| B | Manual price entry exists — manual price overrides automatic | Check if manual override is correct. Remove manual price if automatic pricing should apply (VA02 > Item > Conditions > delete manual entry) |
| C | Condition deactivated by user in the document | User manually deactivated it. Re-activate or rerun pricing |
| D | Scale not fulfilled — below minimum quantity | Check the scale threshold (VK13 → scale view) vs actual order quantity |

### Symptom 3: Wrong price amount (record found but amount is incorrect)

**Diagnostic Steps:**

1. **Verify condition record amount (VK13)**
   - Is the amount in the record what you expect?
   - Is there more than one active record for the same key? Overlapping validity periods can cause non-deterministic results.

2. **Verify unit of measure**
   - Condition record maintained per EA (each) but order is in TO (tonne)?
   - Check: does the conversion factor in material master align with the pricing UoM?

3. **Check rounding rule**
   - Pricing procedure step: is a rounding routine (VOFM) assigned to this condition type?
   - Rounding routines can modify the calculated amount before display

4. **Check calculation type in condition type (V/06)**
   - Is it: A (percentage), B (fixed amount), C (quantity-dependent)?
   - If percentage: what is the "From" step it calculates from? Is that base amount correct?

5. **Check currency / exchange rate**
   - Condition record currency vs document currency — exchange rate at order creation date

### Symptom 4: Pricing procedure not determined (order created with empty pricing)

**Diagnostic Steps:**

1. **Check OVKK — Pricing Procedure Determination**
   - Navigation: SPRO → SD → Basic Functions → Pricing → Pricing Control → Define and assign pricing procedures → Define pricing procedure determination
   - Key: Sales Org + Distribution Channel + Division + Document Pricing Procedure + Customer Pricing Procedure → Pricing Procedure
   - Is there an entry for the exact combination on this order?

2. **Check Document Pricing Procedure**
   - The sales document type (VOV8) carries a Document Pricing Procedure indicator (e.g., A for standard)
   - Is the document pricing procedure field set on the order type?

3. **Check Customer Pricing Procedure**
   - The customer master (VD03 → Sales area data → Sales tab) carries a Customer Pricing Procedure
   - Is it set? Is it the value expected in OVKK?

4. **Check Division**
   - OVKK determination can include Division. If the entry in OVKK has Division = blank (= all), that's a wildcard. If it's specific, the order's division must match.

### Symptom 5: Tax (MWST) not calculating

**Diagnostic Steps:**

1. **Check Tax Classification in Material Master**
   - MM03 → Sales Org 2 view → Tax Data tab
   - Tax classification must be set (e.g., 1 = full tax) for the correct country

2. **Check Tax Classification in Customer Master**
   - VD03 → Sales area data → Billing tab
   - Tax classification must be set for the customer's departure country

3. **Check Tax condition record (VK13 for MWST)**
   - Access sequence: Country + Tax classification (customer) + Tax classification (material) → tax rate
   - Condition record: does it exist for this combination? Is the rate correct?

4. **Check Country assignment**
   - Billing document checks the departure country (from shipping point) and destination country (from sold-to address)
   - Is the ship-to party's country set correctly?

---

## Pricing Analysis Screen — Field Guide

When you open the Pricing Analysis (VA02 → Item → Conditions → Analysis):

| Column | What It Shows | What to Look For |
|---|---|---|
| **Condition Type** | The cond. type being evaluated | All condition types in the procedure appear here |
| **Description** | Name of the condition type | — |
| **Condition Record Found** | ✓ or blank | If blank: no record found for any access |
| **Which Access** | Which access in the seq found the record | Higher priority access found first — is this correct? |
| **Condition Record Key** | The key of the found record | Verify: is this the record you expect? |
| **Amount** | The value from the record | Matches VK13? |
| **Active/Inactive** | Is the condition active or inactive? | If inactive: see Inactive Code above |
| **Inactive Reason** | Code A/B/C/D/G/H/I | Tells you exactly why it's inactive |

---

## Common Pricing Configuration Traps

### Trap 1: Access Sequence with no "Exclusion" flag on a step
If an access sequence step is not flagged as "Exclusive" (E), the system continues searching even after finding a record. This means a lower-priority access might overwrite a higher-priority record. Set the Exclusive flag on accesses where the first match should stop the search.

### Trap 2: Condition type calculation type set to "C" (quantity-based) but condition record maintained as a percentage
The condition type control in V/06 overrides the record. If the type says quantity-based, but you created a % record, the system ignores the %.

### Trap 3: Pricing type on copy control
When copying a document (e.g., quotation to order), the pricing type on copy control (VTAA) determines how prices are redetermined:
- **A** = Copy pricing unchanged
- **B** = Redetermine prices
- **C** = Copy manually, redetermine automatic
- **G** = Redetermine freight
Know which type is set and whether it matches the business expectation.

### Trap 4: Statistical condition type contributing to a subtotal
If a condition type is statistical (checkbox in V/08), its value doesn't appear in the item total — but it can feed into a subtotal that other conditions calculate from. Always check the From/To fields in V/08 when a calculation-type condition produces an unexpected result.

### Trap 5: Condition with requirement routine blocking determination
Requirement routines (field "Req" in V/08) can conditionally block a condition type from being determined based on document data. If a condition type never appears even though the record exists, check the requirement routine in the pricing procedure step. VOFM → Requirements shows the logic.

---

## The 7-Step Pricing Diagnostic Protocol

Use this for any pricing issue — it is systematic and covers all root causes:

```
STEP 1  Open VA02 (or VA03) → Line Item → Conditions → F6 (Analysis)
        Read the analysis screen. Note: which conditions are active/inactive,
        which have records found, which have nothing.

STEP 2  Identify the specific condition type with the problem.
        Is it: no record found / inactive / wrong amount?

STEP 3  If no record: VK13 → enter condition type and key fields.
        Does a record exist? Check validity dates. Check amount.

STEP 4  If record exists but not found: V/07 → view access sequence.
        What key fields is it searching? Are those fields populated on the order?
        Is the record created for the combination being searched?

STEP 5  If record found but inactive: check inactive code.
        A = exclusion group. B = manual override. C = deactivated.
        D = scale not met. Address the specific cause.

STEP 6  If record found, active, but wrong amount:
        VK13 → verify amount. Check UoM, currency, rounding.
        V/08 → check calculation type (From/To/base), requirements, routines.

STEP 7  If procedure not determining at all:
        OVKK → verify SOrg + DCh + Div + DocPricProc + CustPricProc mapping.
        VD03 → verify customer pricing procedure.
        VOV8 → verify document pricing procedure on order type.
```

---

> *This guide reflects real diagnostic patterns from pricing incident resolution across 10+ years and multiple SAP landscapes. The systematic approach applies equally to ECC and S/4HANA.*
