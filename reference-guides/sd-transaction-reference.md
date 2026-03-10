# SAP SD Transaction Code Quick Reference

> Prashanth Goud — Senior SAP SD / S/4HANA Consultant  
> Comprehensive reference covering all key SD transactions used in daily consulting and delivery work.

---

## Sales Order Processing

| T-Code | Description | Key Use |
|---|---|---|
| VA01 | Create Sales Order | Standard order entry, all order types |
| VA02 | Change Sales Order | Modify open orders, pricing update, delivery date change |
| VA03 | Display Sales Order | Read-only view, pricing analysis, document flow |
| VA05 | List of Sales Orders | Mass display/selection by sales org, customer, material |
| VA07 | Compare Sales Orders with Purchase Orders | 3rd party / individual PO comparison |
| VA11 | Create Inquiry | Pre-sales inquiry document |
| VA12 | Change Inquiry | |
| VA13 | Display Inquiry | |
| VA21 | Create Quotation | Customer quotation |
| VA22 | Change Quotation | |
| VA23 | Display Quotation | |
| VA41 | Create Contract | Quantity / value contracts |
| VA42 | Change Contract | |
| VA43 | Display Contract | |
| VA45 | List of Contracts | |
| VA51 | Create Item Proposal | |
| VOV8 | Define Sales Document Types | Config: order type controls |
| VOV4 | Assign Item Categories | Config: item cat determination |
| VOV6 | Define Schedule Line Categories | |
| OVAZ | Assign Blocking Reasons | Config: delivery/billing block |

---

## Pricing & Condition Technique

| T-Code | Description | Key Use |
|---|---|---|
| VK11 | Create Condition Records | Maintain prices, discounts, surcharges |
| VK12 | Change Condition Records | Mass changes, validity updates |
| VK13 | Display Condition Records | Diagnostic — verify record exists and is valid |
| VK14 | Create Condition Records with Template | Mass creation from reference records |
| VK15 | Create Condition Records (Worklist) | |
| V/06 | Define Condition Types | Config: condition type master settings |
| V/07 | Define Access Sequences | Config: search strategy per condition type |
| V/03 | Create Condition Table | Config: field combination for key |
| V/04 | Change Condition Table | |
| V/05 | Display Condition Table | |
| V/08 | Maintain Pricing Procedures | Config: step, counter, condition type, requirements |
| OVKK | Define Pricing Procedure Determination | Config: SOrg + DChannel + DocPricProc + CustPricProc → Procedure |
| VK31 | Create Condition Records (Internet) | |
| VOFM | Maintain Requirements and Formulas | Config: routines for pricing requirements, formulas, alt calc types |
| V/LD | List Condition Records | Diagnostic — see all records for a condition type |
| PRCA | Pricing Report | Analyse pricing across orders |

---

## Delivery & Logistics Execution

| T-Code | Description | Key Use |
|---|---|---|
| VL01N | Create Outbound Delivery (ref. to Sales Order) | Standard delivery creation |
| VL02N | Change Outbound Delivery | PGI, picking confirmation, route change |
| VL03N | Display Outbound Delivery | |
| VL04 | Collective Processing of Delivery Documents | Mass delivery creation |
| VL06O | Outbound Delivery Monitor | Worklist: deliveries to pick, pack, PGI |
| VL06G | Goods Issue Monitor | Monitor PGI'd deliveries |
| VL09 | Cancel Goods Issue | Reverse PGI for a delivery |
| VL10A | Create Deliveries for Sales Orders | Collective delivery creation |
| VL10B | Create Deliveries (Purchase Orders) | |
| VL71 | Output from Delivery | Print / send delivery notes, shipping docs |
| OVLT | Define Delivery Types | Config |
| OVLP | Define Item Categories for Deliveries | Config |
| OVL2 | Shipping Point Determination | Config: shipping point assignment |
| OVL3 | Route Determination | Config: departure zone + destination + shipping cond |
| OVL6 | Working Times for Shipping Points | Config: shipping point calendars |
| OVL7 | Loading Times | Config: loading time per shipping point |
| OVL8 | Pick/Pack Times | Config |
| SE38 | ABAP Editor | Run: RM_DELIVERY_CANCEL (cancel multiple deliveries) |

---

## Billing

| T-Code | Description | Key Use |
|---|---|---|
| VF01 | Create Billing Document | Manual billing — single |
| VF02 | Change Billing Document | Cancel, correct billing docs |
| VF03 | Display Billing Document | Verify FI posting, pricing |
| VF04 | Maintain Billing Due List | Collective billing run — daily job |
| VF05 | List of Billing Documents | |
| VF06 | Billing Documents Backlog | |
| VF11 | Cancel Billing Document | Creates cancellation document |
| VF21 | Create Invoice List | Group invoices for factoring / collective output |
| VF22 | Change Invoice List | |
| VF23 | Display Invoice List | |
| VF26 | Cancel Invoice List | |
| VOFA | Define Billing Types | Config: billing type controls |
| OVV8 | Assign Billing Types | Config: from delivery type or order type |
| VKOA | Revenue Account Determination | Config: account assignment group → GL account |
| VFX3 | List Blocked Billing Docs | Worklist: billing blocks |
| VF31 | Output from Billing Documents | Print / email invoices |

---

## Credit Management

| T-Code | Description | Key Use |
|---|---|---|
| FD32 | Credit Management — Change Customer | Set credit limit, risk category (classic SD credit mgmt) |
| FD33 | Credit Management — Display Customer | |
| FD10N | Customer Balance Display | |
| FBL5N | Customer Line Item Display | AR open items |
| VKM1 | Released SD Documents from Credit | Blocked orders for credit review |
| VKM2 | Released SD Documents | |
| VKM3 | Sales Orders Blocked for Credit | Worklist |
| VKM4 | Deliveries Blocked for Credit | |
| OVA8 | Automatic Credit Control | Config: credit check settings per credit control area |
| OVAD | Assign Credit Limit Check | Config: order type / delivery type credit check |

---

## Output & Forms

| T-Code | Description | Key Use |
|---|---|---|
| NACE | Condition Records for Output Control | Config: output determination, condition records |
| VV11 | Create Output Condition Records (Sales) | Maintain output records |
| VV12 | Change Output Condition Records (Sales) | |
| VV13 | Display Output Condition Records (Sales) | |
| VV21 | Create Output Condition Records (Delivery) | |
| VV31 | Create Output Condition Records (Billing) | |
| V/40 | Output Types for Sales Documents | Config: define output types |
| V/46 | Output Determination Procedures | Config: assign output procedure |

---

## Master Data

| T-Code | Description | Key Use |
|---|---|---|
| XD01 | Create Customer (Central) | Customer master (ECC) |
| XD02 | Change Customer (Central) | |
| XD03 | Display Customer (Central) | |
| VD01 | Create Customer (Sales Area) | Customer master SD view |
| VD02 | Change Customer (Sales Area) | |
| VD03 | Display Customer (Sales Area) | |
| BP | Business Partner | S/4HANA customer master |
| MM01 | Create Material Master | |
| MM02 | Change Material Master | |
| MM03 | Display Material Master | |
| VD51 | Create Customer-Material Info Record | Customer-specific material descriptions |
| VD52 | Change Customer-Material Info Record | |
| VD53 | Display Customer-Material Info Record | |

---

## Configuration (SPRO Paths)

| T-Code / Path | Description |
|---|---|
| SPRO | Implementation Guide (Customising) |
| OVAZ | Blocking Reasons for Deliveries / Billing |
| OVX5 | Assign Sales Area to Sales Document Types |
| OVX2 | Assign Distribution Channel to Sales Org |
| OVXG | Assign Division to Sales Org |
| OVA0 | Assign Enterprise Structure (Sales) |
| SM30 | Table Maintenance (generic) — for condition tables etc |
| SE16 / SE16N | Table Browser — diagnostic: check table contents |
| SE37 | Function Module Browser |
| SE38 | ABAP Editor |

---

## Diagnostics & Troubleshooting

| T-Code | Description | When to Use |
|---|---|---|
| V.02 | Incomplete Sales Orders | Find all orders with incompletion |
| V.03 | Backorders | Identify delivery-blocked orders |
| VL06O | Delivery Monitor | Full outbound delivery worklist |
| VFX3 | Blocked Billing Documents | Find billing-blocked items |
| VKM1 | Credit-Blocked Orders | Worklist of credit holds |
| SWI2_DIAG | Workflow Diagnosis | If workflow blocking OTC steps |
| WE02 | IDoc Display | Check EDI/IDoc status and errors |
| WE05 | IDoc Lists | Mass display IDocs by type |
| SM50 | Process Overview | Check active system processes |
| SM37 | Background Job Monitor | Verify batch jobs (VF04, output) |
| SLG1 | Application Log | Check for errors in background processes |
| ST22 | ABAP Dump Analysis | Short dump investigation |
| SCOT | SAPconnect (Output) | Email/fax output communication errors |

---

## S/4HANA Specific

| T-Code / App | Description |
|---|---|
| BP | Business Partner (replaces XD01/VD01) |
| LTMC | SAP S/4HANA Migration Cockpit |
| FIORI Launchpad | Access all S/4HANA Fiori apps |
| /UI2/FLP | Fiori Launchpad (SAP GUI access) |
| STC01 | Task Manager for S/4HANA Readiness |
| SPDD / SPAU | Modification adjustment after upgrade |
| ATC | ABAP Test Cockpit (custom code checks) |

---

> *This reference covers transactions used across SAP ECC 6.0 (EHP7/8) and S/4HANA 2020–2023. Some ECC transactions are replaced or supplemented by Fiori apps in S/4HANA.*
