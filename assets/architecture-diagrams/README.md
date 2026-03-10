# Architecture Diagrams — SAP SD / S/4HANA

> Prashanth Goud — Senior SAP SD / S/4HANA Consultant  
> Process flow and architecture diagrams rendered via Mermaid

---

## Diagram 1: End-to-End OTC Process Flow

```mermaid
flowchart TD
    A([Customer]) -->|Request| B[Inquiry\nVA11]
    B --> C[Quotation\nVA21]
    C --> D[Sales Order\nVA01]

    D --> D1{Credit Check}
    D1 -->|Approved| D2{ATP Check}
    D1 -->|Blocked| D3[Credit Block\nVKM1]
    D3 -->|Released| D2

    D2 -->|Confirmed| E[Outbound Delivery\nVL01N]
    D2 -->|Partial| E

    E --> F[Picking\nLT0A / LT1A]
    F --> G[Packing\nVL02N]
    G --> H[Post Goods Issue\nVL02N]

    H --> I[Billing Document\nVF01 / VF04]
    I --> J[FI Posting\nFB03]
    J --> K[Customer AR\nFBL5N]
    K --> L([Payment\nF-28])

    style A fill:#1a3a6b,color:#fff
    style L fill:#1a3a6b,color:#fff
    style D3 fill:#c8893a,color:#fff
```

---

## Diagram 2: Condition Technique — Pricing Determination Flow

```mermaid
flowchart LR
    A[Sales Order\nCreated] --> B[Pricing Procedure\nDetermination]
    
    B --> B1{OVKK Lookup\nSOrg + DCh + Div\n+ DocPricProc\n+ CustPricProc}
    B1 -->|Match Found| C[Pricing Procedure\nZPRICE]
    B1 -->|No Match| ERR1[Error: No\nPricing Procedure]

    C --> D[Step 10: PR00\nBase Price]
    D --> D1[Access Sequence\nPR02]
    D1 --> D2{Search Priority}
    D2 -->|1st: Customer+Mat| D3{Record\nFound?}
    D2 -->|2nd: PriceList+Mat| D3
    D2 -->|3rd: SOrg+Mat| D3
    D3 -->|Yes| D4[Apply Price\nAmount]
    D3 -->|No| D5[Condition\nInactive]

    C --> E[Step 40: K007\nCustomer Discount]
    E --> E1{Exclusion\nGroup 01}
    E1 -->|Best Discount\nWins| E2[Apply Discount\nPercentage]

    D4 --> F[Net Price\nCalculation]
    E2 --> F
    F --> G[MWST Tax\nCalculation]
    G --> H[Final Document\nPricing]

    style A fill:#1a3a6b,color:#fff
    style H fill:#1a3a6b,color:#fff
    style ERR1 fill:#ef4444,color:#fff
    style D5 fill:#f59e0b,color:#fff
```

---

## Diagram 3: S/4HANA Migration — SD Workstream Phases

```mermaid
gantt
    title S/4HANA Migration — SD Workstream Timeline
    dateFormat  YYYY-MM
    axisFormat  %b %Y

    section Prepare
    Scope Definition Workshop    :done, 2023-01, 2w
    Simplification Item Review   :done, 2023-01, 3w
    BP Conversion Planning       :done, 2023-02, 3w

    section Explore
    Fit-to-Standard Workshops (11):done, 2023-02, 6w
    Gap Register & Resolution    :done, 2023-03, 4w
    Design Document Sign-off     :done, 2023-04, 2w

    section Realize
    Configuration Build          :done, 2023-04, 10w
    WRICEF Development (SD)      :done, 2023-05, 8w
    Unit Testing                 :done, 2023-06, 4w

    section Test
    SIT Execution                :done, 2023-07, 6w
    UAT Execution                :done, 2023-08, 6w
    Performance Testing          :done, 2023-09, 2w

    section Deploy
    Cutover Dress Rehearsal 1    :done, 2023-10, 1w
    Cutover Dress Rehearsal 2    :done, 2023-10, 1w
    Go-Live Cutover              :milestone, 2023-11, 0d

    section Run
    Hypercare (4 weeks)          :active, 2023-11, 4w
    BAU Handover                 :2023-12, 2w
```

---

## Diagram 4: Shipping Point & Route Determination

```mermaid
flowchart TD
    A[Sales Order Item\nwith Plant] --> B[Shipping Point\nDetermination]
    
    B --> B1{Shipping Condition\nfrom Customer Master\nShipping tab}
    B1 --> B2{Loading Group\nfrom Material Master\nSales:General/Plant}
    B2 --> B3{Delivering Plant\nfrom Sales Order}
    B3 --> B4[Shipping Point\nDetermined\nOVL2 Table]

    B4 --> C[Route Determination\nOVL3]
    C --> C1{Departure Zone\nfrom Shipping Point}
    C1 --> C2{Transportation Zone\nfrom Customer Master\nShipping tab}
    C2 --> C3{Shipping Condition\nfrom Customer}
    C3 --> C4[Route Determined\ne.g. DE001]

    C4 --> D[Delivery Scheduling]
    D --> D1[Transit Time\nfrom Route]
    D1 --> D2[Loading Time\nfrom Shipping Point]
    D2 --> D3[Pick/Pack Time\nfrom Shipping Point]
    D3 --> D4[Confirmed Delivery Date\nCalculated]

    style A fill:#1a3a6b,color:#fff
    style D4 fill:#1a3a6b,color:#fff
```

---

## Diagram 5: SD–FI Account Determination Flow

```mermaid
flowchart TD
    A[Billing Document\nVF01] --> B[Revenue Account\nDetermination]
    
    B --> B1[VKOA Procedure\nKOFI00 / KOFI01]
    B1 --> B2{Access Sequence}
    
    B2 --> C1{App+CondType+\nSalesOrg+AcctAssGrp\nCust+AcctAssGrp Mat\n→ GL Account}
    B2 --> C2{Less Specific\nCombinations}
    
    C1 -->|Found| D[GL Account\nPosting]
    C2 -->|Found| D
    
    D --> E1[Revenue Account\ne.g. 800000]
    D --> E2[COGS Account\nvia GBB/VAX]
    D --> E3[Tax Account\nvia MWS]
    
    E1 --> F[FI Document\nCreated]
    E2 --> F
    E3 --> F
    
    F --> G[Customer AR\nOpen Item]
    F --> H[Revenue\nPosted to P&L]

    style A fill:#1a3a6b,color:#fff
    style F fill:#1a3a6b,color:#fff
```

---

## Diagram 6: Hypercare Incident Triage Flow

```mermaid
flowchart TD
    A([User Reports\nIssue]) --> B[Log Ticket\nin ServiceNow]
    B --> C{Priority\nAssessment}
    
    C -->|P1: Production\nStopped| D[Immediate Page\nSD Consultant]
    C -->|P2: Major\nImpact| E[SD Consultant\nWithin 2 Hours]
    C -->|P3/P4| F[Daily Triage\nStand-up 8am]

    D --> G[Root Cause\nAnalysis]
    E --> G
    F --> G

    G --> H{Fix Type?}
    H -->|Config Change| I[Fix in QA\nPeer Review\nTransport to Prod]
    H -->|Data Fix| J[Data Correction\nWith FI sign-off\nif financial impact]
    H -->|User Training| K[Knowledge Article\nSuper User Coaching]
    H -->|Enhancement| L[Log for Sprint\nBacklog]

    I --> M[Resolution\nConfirmed by User]
    J --> M
    K --> M
    M --> N[Ticket Closed\nRoot Cause Documented]

    N --> O{Pattern?\nSame issue\n3+ times?}
    O -->|Yes| P[Systemic Fix\nor Training Action]
    O -->|No| Q([Closed])

    style A fill:#1a3a6b,color:#fff
    style Q fill:#22c55e,color:#fff
    style P fill:#c8893a,color:#fff
```

---

> *Diagrams rendered via GitHub Mermaid. If a diagram doesn't render in your viewer, the Mermaid source above can be pasted into [mermaid.live](https://mermaid.live) to view.*
