# GEP Supply Chain Risk Intelligence Agent

An agentic AI system that autonomously analyzes supply chain risk for any supplier — powered by Groq's LLaMA 3.3 70B model with real-time tool calling and a live streaming dashboard.

Built as a demonstration of agentic AI capabilities for enterprise procurement and supply chain management, aligned with GEP Worldwide's mission of bringing AI-native intelligence to sourcing and supplier management.

---

## What It Does

Enter any supplier name and the AI agent autonomously:

1. **Searches** for active supply chain disruptions in the supplier's region
2. **Assesses** geopolitical stability, sanctions exposure, and trade risk for their country
3. **Pulls** financial health indicators — credit ratings, revenue trends, debt ratios
4. **Scans** for ESG violations, labor issues, and regulatory compliance flags
5. **Analyzes** logistics risk — lead time variance, port concentration, single-source dependencies
6. **Generates** a structured risk report with scores, news alerts, and prioritized mitigation recommendations

All of this happens autonomously, streamed live to the dashboard so you can watch the agent reason step-by-step in real time.

---

## Features

- **Live Agent Thinking Panel** — each tool call appears as an animated step with status (running → done)
- **Overall Risk Gauge** — animated SVG arc, color-coded green / amber / red
- **6-Category Risk Breakdown** — Geopolitical, Financial, Compliance, Logistics, Concentration, ESG
- **Analysis Metrics** — sources checked, data points scanned, processing time
- **News & Alerts Feed** — severity-badged disruption news with source and date
- **Supplier Profile** — HQ country, industry, tier, revenue, employee count, key procurement facts
- **Mitigation Recommendations** — prioritized actions tagged Immediate / Short-term / Long-term
- **How It Works page** — full concept, architecture diagram, problem statement, and tech stack

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| AI Model | LLaMA 3.3 70B via Groq API |
| Streaming | Server-Sent Events (SSE) |
| Animations | Framer Motion |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Language | TypeScript |
| Deployment | Vercel |

---

## How the Agent Works

The agent runs an autonomous loop using Groq's tool-calling API:

```
User Input → Next.js API Route → Groq (LLaMA 3.3 70B)
                                      ↓
                              Calls tool #1: search_supply_disruptions
                                      ↓
                              Calls tool #2: assess_geopolitical_risk
                                      ↓
                              Calls tool #3: check_financial_health
                                      ↓
                              Calls tool #4: scan_compliance_issues
                                      ↓
                              Calls tool #5: analyze_logistics_risk
                                      ↓
                              Calls tool #6: generate_risk_report
                                      ↓
                         Streams each step → Dashboard renders live
```

Each tool call is streamed back to the frontend as a Server-Sent Event, making the agent's reasoning visible in real time — not just the final output.

---

## Use Cases

- **Procurement teams** assessing new suppliers before onboarding
- **Supply chain managers** monitoring active supplier risk during geopolitical events
- **Category managers** comparing risk profiles across supplier shortlists
- **Sourcing analysts** generating risk briefings for quarterly reviews
- **CPOs and executives** getting an instant risk snapshot before strategic decisions

---

## Getting Started

### Prerequisites

- Node.js 18+
- A free Groq API key from [console.groq.com](https://console.groq.com)

### Installation

```bash
git clone <your-repo-url>
cd gep-supply-agent
npm install
```

### Configuration

Create a `.env.local` file in the root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and enter any supplier name to begin.

---

## Deployment on Vercel

```bash
npx vercel --prod
```

Add `GROQ_API_KEY` as an environment variable in your Vercel project dashboard under **Settings → Environment Variables**.

---

## Project Structure

```
├── app/
│   ├── page.tsx                  # Main agent dashboard
│   ├── how-it-works/page.tsx     # Concept & architecture page
│   ├── api/analyze/route.ts      # SSE streaming agent endpoint
│   └── layout.tsx
├── components/
│   ├── AgentThinkingPanel.tsx    # Live tool call visualization
│   ├── RiskGauge.tsx             # Animated SVG risk meter
│   ├── RiskCategoryGrid.tsx      # 6-category risk breakdown
│   ├── NewsAlertFeed.tsx         # Disruption news cards
│   ├── SupplierProfile.tsx       # Supplier info card
│   ├── MitigationList.tsx        # Prioritized recommendations
│   ├── MetricsBar.tsx            # Analysis stats
│   └── Navigation.tsx
└── lib/
    ├── tools.ts                  # Tool definitions + smart mock executors
    └── types.ts                  # Shared TypeScript types
```

---

## Author

**Sushant**
Built as a portfolio project demonstrating agentic AI applied to enterprise supply chain risk management.

---

## License

MIT
