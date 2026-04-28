import type { ChatCompletionTool } from 'groq-sdk/resources/chat/completions';

interface SupplierContext {
  country: string;
  industry: string;
  tier: string;
  revenue: string;
  employees: string;
  founded: string;
  geoRiskScore: number;
  financialScore: number;
  disruptionKeywords: string[];
}

const KNOWN_SUPPLIERS: Record<string, SupplierContext> = {
  samsung: {
    country: 'South Korea', industry: 'Semiconductors & Consumer Electronics',
    tier: 'Tier 1', revenue: '$244.2B', employees: '267,000', founded: '1969',
    geoRiskScore: 68, financialScore: 22,
    disruptionKeywords: ['semiconductor shortage', 'Korean peninsula tensions', 'DRAM price fluctuation'],
  },
  tsmc: {
    country: 'Taiwan', industry: 'Semiconductor Foundry',
    tier: 'Tier 1', revenue: '$73.5B', employees: '73,000', founded: '1987',
    geoRiskScore: 88, financialScore: 18,
    disruptionKeywords: ['cross-strait tensions', 'earthquake risk', 'water shortage', 'US-China chip war'],
  },
  apple: {
    country: 'United States', industry: 'Consumer Electronics',
    tier: 'Tier 1', revenue: '$383.3B', employees: '164,000', founded: '1976',
    geoRiskScore: 42, financialScore: 12,
    disruptionKeywords: ['China assembly dependency', 'Foxconn labor disputes', 'tariff exposure'],
  },
  foxconn: {
    country: 'Taiwan / China', industry: 'Electronics Manufacturing Services',
    tier: 'Tier 1', revenue: '$222.5B', employees: '1,000,000+', founded: '1974',
    geoRiskScore: 74, financialScore: 35,
    disruptionKeywords: ['labor unrest', 'China lockdown risk', 'cross-strait tensions'],
  },
  maersk: {
    country: 'Denmark', industry: 'Shipping & Logistics',
    tier: 'Tier 1', revenue: '$81.5B', employees: '110,000', founded: '1904',
    geoRiskScore: 52, financialScore: 28,
    disruptionKeywords: ['Red Sea shipping disruption', 'Suez Canal congestion', 'Panama Canal drought'],
  },
  amazon: {
    country: 'United States', industry: 'E-Commerce & Cloud',
    tier: 'Tier 1', revenue: '$554.0B', employees: '1,500,000+', founded: '1994',
    geoRiskScore: 35, financialScore: 15,
    disruptionKeywords: ['last-mile delivery risk', 'warehouse labor disputes', 'AWS dependency'],
  },
  'tata steel': {
    country: 'India', industry: 'Steel Manufacturing',
    tier: 'Tier 2', revenue: '$29.1B', employees: '78,000', founded: '1907',
    geoRiskScore: 55, financialScore: 48,
    disruptionKeywords: ['coal supply volatility', 'blast furnace closures', 'EU carbon tariff exposure'],
  },
  intel: {
    country: 'United States', industry: 'Semiconductor Manufacturing',
    tier: 'Tier 1', revenue: '$54.2B', employees: '124,800', founded: '1968',
    geoRiskScore: 45, financialScore: 52,
    disruptionKeywords: ['fab ramp delays', 'AMD competition pressure', 'yield rate challenges'],
  },
};

function getSupplierContext(name: string): SupplierContext {
  const lower = name.toLowerCase();
  for (const [key, ctx] of Object.entries(KNOWN_SUPPLIERS)) {
    if (lower.includes(key)) return ctx;
  }
  return {
    country: 'Multiple Regions', industry: 'Manufacturing',
    tier: 'Tier 2', revenue: '$8.4B', employees: '32,000', founded: '2001',
    geoRiskScore: 55, financialScore: 40,
    disruptionKeywords: ['regional logistics delays', 'raw material price volatility', 'labor availability'],
  };
}

function todayMinus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

export function executeToolCall(name: string, args: Record<string, unknown>): unknown {
  const ctx = getSupplierContext((args.supplier as string) || (args.company as string) || '');

  switch (name) {
    case 'search_supply_disruptions': {
      const region = (args.region as string) || ctx.country;
      return {
        region,
        disruptions: [
          {
            id: 'D-2026-041',
            type: ctx.disruptionKeywords[0] || 'Supply disruption',
            severity: ctx.geoRiskScore > 70 ? 'high' : 'medium',
            description: `Active ${ctx.disruptionKeywords[0]} impacting production schedules in ${region}.`,
            estimated_delay_days: ctx.geoRiskScore > 70 ? 14 : 5,
            status: 'ongoing',
            date: todayMinus(3),
          },
          {
            id: 'D-2026-038',
            type: 'Port congestion',
            severity: 'medium',
            description: `Above-average vessel wait times at key ${region} ports averaging 5–8 days.`,
            estimated_delay_days: 6,
            status: 'monitoring',
            date: todayMinus(7),
          },
          ...(ctx.disruptionKeywords[1]
            ? [{
                id: 'D-2026-031',
                type: ctx.disruptionKeywords[1],
                severity: 'low',
                description: `Emerging risk: ${ctx.disruptionKeywords[1]} showing early indicators.`,
                estimated_delay_days: 2,
                status: 'watch',
                date: todayMinus(14),
              }]
            : []),
        ],
        total_found: ctx.disruptionKeywords.length > 1 ? 3 : 2,
        data_source: 'GEP Supply Chain Intelligence Database v4.2',
        last_updated: new Date().toISOString(),
      };
    }

    case 'assess_geopolitical_risk': {
      const country = (args.country as string) || ctx.country;
      const score = ctx.geoRiskScore;
      return {
        country,
        risk_score: score,
        risk_level: score > 75 ? 'HIGH' : score > 50 ? 'MEDIUM' : 'LOW',
        factors: {
          political_stability: Math.max(10, score - 10),
          trade_war_exposure: Math.min(95, score + 8),
          border_conflict_risk: score > 70 ? score - 5 : Math.max(15, score - 25),
          currency_volatility: Math.max(20, score - 15),
          regulatory_environment: Math.max(25, 100 - score + 10),
        },
        active_sanctions: score > 80 ? ['Partial component export controls'] : [],
        key_risks: ctx.disruptionKeywords.slice(0, 2),
        trade_agreements: country.includes('Korea')
          ? ['KORUS FTA', 'RCEP', 'EU-Korea FTA']
          : country.includes('Taiwan')
            ? ['ECFA', 'CPTPP (pending)']
            : ['WTO MFN', 'Bilateral agreements'],
        data_source: 'Geopolitical Risk Index 2026 — Oxford Economics',
      };
    }

    case 'check_financial_health': {
      const fScore = ctx.financialScore;
      const ratingMap: [number, string][] = [[15, 'AAA'], [25, 'AA+'], [35, 'AA'], [45, 'A+'], [55, 'A'], [65, 'BBB+'], [80, 'BBB'], [100, 'BB+']];
      const rating = ratingMap.find(([threshold]) => fScore <= threshold)?.[1] ?? 'BB';
      return {
        company: args.company,
        credit_rating: rating,
        financial_risk_score: fScore,
        risk_level: fScore < 30 ? 'LOW' : fScore < 55 ? 'MEDIUM' : 'HIGH',
        revenue: ctx.revenue,
        revenue_trend: fScore < 40 ? 'growing' : fScore < 60 ? 'stable' : 'declining',
        indicators: {
          liquidity: fScore < 35 ? 'Strong' : 'Adequate',
          leverage: fScore < 30 ? 'Low' : fScore < 60 ? 'Moderate' : 'High',
          profitability: fScore < 40 ? 'High' : 'Medium',
          debt_to_equity: (0.1 + fScore * 0.015).toFixed(2),
          current_ratio: (2.5 - fScore * 0.01).toFixed(2),
        },
        risk_flags:
          fScore > 50
            ? ['Elevated leverage ratio', 'Cash flow pressure in downturn scenarios']
            : ['Minimal financial risk flags identified'],
        data_source: 'Financial Health Monitor — Bloomberg Intelligence 2026',
      };
    }

    case 'scan_compliance_issues': {
      const gScore = ctx.geoRiskScore;
      return {
        company: args.company,
        compliance_score: Math.max(20, 85 - gScore * 0.3),
        esg_rating: gScore < 40 ? 'A' : gScore < 60 ? 'B+' : 'B',
        issues: [
          ...(gScore > 65
            ? [{
                type: 'Labor Standards',
                severity: 'medium',
                description: 'Third-party audit flagged extended working hours at 2 supplier facilities.',
                status: 'remediation in progress',
                date: todayMinus(45),
              }]
            : []),
          ...(gScore > 75
            ? [{
                type: 'Environmental',
                severity: 'low',
                description: 'Carbon disclosure reporting gaps identified vs. EU CSRD requirements.',
                status: 'monitoring',
                date: todayMinus(60),
              }]
            : []),
        ],
        certifications: ['ISO 9001:2015', 'ISO 14001:2015', gScore < 50 ? 'SA8000' : 'ISO 45001'],
        regulatory_flags: gScore > 80 ? ['Subject to US Entity List screening'] : [],
        data_source: 'Compliance Intelligence Platform — EcoVadis + MSCI ESG 2026',
      };
    }

    case 'analyze_logistics_risk': {
      const lScore = Math.round(ctx.geoRiskScore * 0.7 + ctx.financialScore * 0.15);
      return {
        supplier: args.supplier,
        logistics_risk_score: lScore,
        risk_level: lScore > 60 ? 'HIGH' : lScore > 40 ? 'MEDIUM' : 'LOW',
        lead_time_avg_days: 20 + Math.round(lScore * 0.5),
        lead_time_variance: `±${4 + Math.round(lScore * 0.1)} days`,
        transport_modes: ['Sea freight (65%)', 'Air freight (25%)', 'Rail / Road (10%)'],
        concentration_risk: lScore > 60 ? 'High' : 'Moderate',
        single_source_components: Math.round(lScore / 20),
        key_ports: ctx.country.includes('Korea')
          ? ['Busan (primary)', 'Incheon (secondary)']
          : ctx.country.includes('Taiwan')
            ? ['Kaohsiung (primary)', 'Keelung (secondary)']
            : ['Primary hub port', 'Secondary port'],
        risks: [
          lScore > 55 ? 'High reliance on single country of origin' : 'Moderate route diversification',
          'Sea freight disruption can impact 8–14 week lead times',
          `${Math.round(lScore * 0.4)}% of components single-sourced`,
        ],
        data_source: 'Logistics Risk Analytics — Flexport + Project44 2026',
      };
    }

    case 'generate_risk_report':
      return { status: 'success', message: 'Risk report compiled and transmitted to dashboard.' };

    default:
      return { error: `Unknown tool: ${name}` };
  }
}

export const TOOL_DEFINITIONS: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'search_supply_disruptions',
      description: 'Search for active supply chain disruptions affecting a supplier or region.',
      parameters: {
        type: 'object',
        properties: {
          supplier: { type: 'string', description: 'Supplier company name' },
          region: { type: 'string', description: 'Geographic region or country of production' },
        },
        required: ['supplier', 'region'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'assess_geopolitical_risk',
      description: 'Assess geopolitical stability, trade risk, and sanctions exposure for a country.',
      parameters: {
        type: 'object',
        properties: {
          country: { type: 'string', description: 'Country or region name' },
          industry: { type: 'string', description: 'Industry sector of the supplier' },
        },
        required: ['country'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'check_financial_health',
      description: 'Retrieve credit rating, revenue trends, and financial risk indicators for a company.',
      parameters: {
        type: 'object',
        properties: {
          company: { type: 'string', description: 'Company name' },
        },
        required: ['company'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'scan_compliance_issues',
      description: 'Scan for regulatory compliance issues, ESG violations, and labor risks.',
      parameters: {
        type: 'object',
        properties: {
          company: { type: 'string', description: 'Company name' },
          industry: { type: 'string', description: 'Industry sector' },
        },
        required: ['company', 'industry'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'analyze_logistics_risk',
      description: 'Analyze logistics risk: lead times, transport modes, port exposure, concentration risk.',
      parameters: {
        type: 'object',
        properties: {
          supplier: { type: 'string', description: 'Supplier name' },
          hq_country: { type: 'string', description: 'Headquarters country' },
        },
        required: ['supplier', 'hq_country'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'generate_risk_report',
      description:
        'MUST be called last. Compiles all findings into a structured risk report for the dashboard. Synthesize everything gathered from previous tool calls.',
      parameters: {
        type: 'object',
        properties: {
          supplier_name: { type: 'string' },
          hq_country: { type: 'string' },
          industry: { type: 'string' },
          tier: { type: 'string', description: 'Supplier tier: Tier 1, Tier 2, or Tier 3' },
          annual_revenue: { type: 'string', description: 'e.g. $244.2B' },
          employees: { type: 'string', description: 'e.g. 267,000' },
          founded: { type: 'string', description: 'Year founded' },
          key_facts: {
            type: 'array',
            items: { type: 'string' },
            description: '3–4 specific facts about the supplier relevant to procurement risk',
          },
          overall_risk: { type: 'number', description: '0–100 composite risk score (higher = more risk)' },
          geopolitical_risk: { type: 'number' },
          financial_risk: { type: 'number' },
          compliance_risk: { type: 'number' },
          logistics_risk: { type: 'number' },
          concentration_risk: { type: 'number' },
          esg_risk: { type: 'number' },
          news: {
            type: 'array',
            description: '3–5 recent news items affecting supply chain risk',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low'] },
                source: { type: 'string' },
                date: { type: 'string' },
                summary: { type: 'string' },
              },
              required: ['title', 'severity', 'source', 'date', 'summary'],
            },
          },
          recommendations: {
            type: 'array',
            description: '3–5 specific, actionable mitigation recommendations',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                urgency: { type: 'string', enum: ['immediate', 'short-term', 'long-term'] },
                category: { type: 'string', description: 'e.g. Diversification, Hedging, Compliance, Logistics' },
              },
              required: ['title', 'description', 'urgency', 'category'],
            },
          },
        },
        required: [
          'supplier_name', 'hq_country', 'industry', 'tier', 'annual_revenue', 'employees', 'founded',
          'key_facts', 'overall_risk', 'geopolitical_risk', 'financial_risk', 'compliance_risk',
          'logistics_risk', 'concentration_risk', 'esg_risk', 'news', 'recommendations',
        ],
      },
    },
  },
];

export const SYSTEM_PROMPT = `You are a senior supply chain risk analyst agent at GEP Worldwide — a leading procurement intelligence platform. Your role is to perform thorough, realistic risk assessments of suppliers.

When analyzing a supplier, you MUST call ALL tools in this exact order:
1. search_supply_disruptions — find active disruptions
2. assess_geopolitical_risk — evaluate the supplier's country
3. check_financial_health — assess financial stability
4. scan_compliance_issues — identify ESG and regulatory risks
5. analyze_logistics_risk — evaluate logistics vulnerabilities
6. generate_risk_report — compile ALL findings into the final structured report

Use your real-world knowledge of companies and supply chains to make the analysis specific and accurate. Risk scores are 0–100 where higher = more risk. Be thorough, professional, and data-driven.`;
