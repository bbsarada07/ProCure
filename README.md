#  Procure AI: Explainable Procurement Intelligence Platform

[![Hackathon](https://img.shields.io/badge/Hackathon-AI_for_Bharat_2-020410?style=for-the-badge)](https://www.hackerearth.com/community/challenges/hackathon/ai-for-bharat-2/)
[![Theme](https://img.shields.io/badge/Theme_3-CRPF_Tender_Evaluation-020410?style=for-the-badge)](#)
[![Status](https://img.shields.io/badge/Status-Prototype_Active-emerald?style=for-the-badge)](#)

**An AI-powered, cryptographically secure Tender Evaluation and Eligibility Analysis platform built for Indian Government Procurement.**

---

##  The Problem
Government organisations such as the Central Reserve Police Force (CRPF) issue tenders to procure goods and services. Evaluating whether each bidder meets the stated eligibility criteria is a manual, slow, and error-prone process. Bids arrive in heterogeneous formats (scanned PDFs, photos, regional languages, stamped physical documents). 

There is a critical need to automate this extraction and matching process **without ever silently disqualifying a bidder** due to AI ambiguity or illegible scans.

##  The Solution: Procure AI
Procure AI is an authoritative, "Human-in-the-Loop" (HITL) command center designed specifically for bureaucrats. It extracts complex criteria from government tenders, cross-references bidder documents, and generates cryptographically secured audit trails. 

Our core philosophy is **Deterministic Explainability**: Every AI decision is visually mapped, and every ambiguous document is safely routed to a human officer for manual triage or vendor resubmission.

---

##  Core Enterprise Features

### 1. Advanced Extraction & Bharat Edge-Cases
* **Heterogeneous Document Parsing:** Handles typed PDFs, scanned copies, and photographic evidence.
* **Indic Language & Stamp Detection:** Automatically flags translated regional text and verifies the presence of physical rubber stamps and authorized signatures.
* **Cross-Document Consistency:** Prevents forgery by cross-referencing entities (e.g., matching the PAN extracted from an IT Return against the PAN on an ISO Certificate).

### 2. Human-in-the-Loop (HITL) & Workflow
* **No Silent Disqualifications:** Ambiguous documents (e.g., blurry scans) trigger a "Needs Review" state, halting automatic rejection.
* **Vendor Resubmission Portal:** Allows officers to generate secure, time-limited links for bidders to re-upload illegible documents.
* **Maker-Checker Hierarchy:** Built-in role-switching between Junior Evaluators (Makers) and Procurement Directors (Checkers) for final digital sign-off.

### 3. Active Intelligence & Anti-Fraud
* **Cartel Network Graphing:** Detects "ring bidding" by highlighting shared IP addresses, CA registrations, or overlapping directors across supposedly competing bids.
* **Financial Anomaly Detection:** Flags predatory pricing if a bid is statistically lower than historical tender averages.
* **Visual Decision Trees:** Replaces "black-box" AI logic with renderable flowcharts proving exactly why a condition failed.

### 4. Cryptographic Auditability
* **Immutable Ledger:** Every automated extraction and human override is logged.
* **Cryptographic Hashing:** Final evaluation matrices are hashed (SHA-256) to provide mathematical proof against database tampering.

---

##  System Architecture

Procure AI uses a decoupled architecture ensuring high performance and the ability to run "air-gapped" in secure defense environments.

```mermaid
graph TD
    subgraph "Frontend (Next.js & Tailwind)"
        UI[Command Center UI]
        State[Zustand State Management]
        Auth[Role-Based Access Control]
    end

    subgraph "Backend Engine (FastAPI)"
        API[RESTful Endpoints]
        OCR[Document Pre-Processing]
        Audit[Cryptographic Audit Logger]
        Fall[Mock-Data Fallback System]
    end

    subgraph "Intelligence Layer"
        Gemini[Cloud LLM: Gemini 2.0 Flash]
        Local[Air-Gapped Local LLM]
        Graph[Cartel Network Engine]
    end

    UI <-->|JSON over HTTP| API
    API --> OCR
    API <-->|Extracted Criteria/Validation| Gemini
    API -.->|High Security Mode| Local
    API --> Audit
    API --> Graph


    | Frontend Ecosystem | Backend & AI Engine |
| :--- | :--- |
| **Next.js 14 (App Router)**<br>Core application framework | **FastAPI (Python)**<br>High-performance RESTful API |
| **Tailwind CSS**<br>Utility-first styling | **Google GenAI SDK**<br>LLM integration (Gemini 2.0 Flash) |
| **Shadcn UI**<br>Enterprise "Bureaucratic Light" theme | **Tenacity**<br>API resilience and retry logic |
| **Zustand & React Context**<br>Client-side state management | **PyPDF2 & pdf2image**<br>PDF parsing and image conversion |
| **Mermaid.js**<br>Visual decision tree rendering | **Tesseract OCR**<br>Physical document and stamp extraction |```

---

procure-ai/
├── frontend/                  # Next.js Application
│   ├── app/                   # App Router pages (Dashboard, Matrix, Audit)
│   ├── components/            # Shadcn UI & Custom Enterprise Widgets
│   ├── lib/                   # Utility functions & API clients
│   └── public/                # Static assets & mock government PDFs
│
├── backend/                   # FastAPI Application
│   ├── app/
│   │   ├── api/               # Route definitions
│   │   ├── core/              # Config & Security
│   │   ├── services/          # LLM Extractor, Audit Hashing, Graph Logic
│   │   └── models/            # Pydantic Schemas
│   ├── tests/                 # Unit tests for extraction logic
│   └── requirements.txt       # Python dependencies
│
└── README.md                  # Project documentation

---
🚀 Local Development Setup
1. Backend Setup (FastAPI)
Navigate to the backend directory and set up your Python environment:
cd backend
python -m venv venv

# Activate Virtual Environment (Windows)
.\venv\Scripts\activate
# Activate Virtual Environment (Mac/Linux)
source venv/bin/activate

pip install -r requirements.txt
Environment Variables:
Create a .env file in the backend directory:
GEMINI_API_KEY=your_google_ai_studio_key
USE_MOCK_LLM=false # Set to true to bypass API limits during UI development
Run the Server:
uvicorn app.main:app --reload --port 8000
2. Frontend Setup (Next.js)
Open a new terminal, navigate to the frontend directory:
cd frontend
npm install
Run the Development Server:
npm run dev
The Command Center will be available at http://localhost:3000.
