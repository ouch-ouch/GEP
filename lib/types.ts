export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type Urgency = 'immediate' | 'short-term' | 'long-term';
export type ToolStatus = 'pending' | 'running' | 'done' | 'error';

export interface ToolCallEvent {
  id: string;
  name: string;
  input: Record<string, unknown>;
  status: ToolStatus;
  resultSummary?: string;
  startedAt?: number;
  doneAt?: number;
}

export interface RiskScores {
  overall: number;
  geopolitical: number;
  financial: number;
  compliance: number;
  logistics: number;
  concentration: number;
  esg: number;
}

export interface NewsItem {
  title: string;
  severity: RiskLevel;
  source: string;
  date: string;
  summary: string;
}

export interface SupplierProfile {
  name: string;
  hq_country: string;
  industry: string;
  tier: string;
  annual_revenue: string;
  employees: string;
  founded: string;
  key_facts: string[];
}

export interface Recommendation {
  title: string;
  description: string;
  urgency: Urgency;
  category: string;
}

export interface RiskReport {
  supplier_name: string;
  hq_country: string;
  industry: string;
  tier: string;
  annual_revenue: string;
  employees: string;
  founded: string;
  key_facts: string[];
  overall_risk: number;
  geopolitical_risk: number;
  financial_risk: number;
  compliance_risk: number;
  logistics_risk: number;
  concentration_risk: number;
  esg_risk: number;
  news: NewsItem[];
  recommendations: Recommendation[];
}

export interface AnalysisMetrics {
  sourcesChecked: number;
  dataPoints: number;
  processingTimeSec: number;
}

export type SSEEventType = 'tool_call' | 'tool_result' | 'risk_data' | 'done' | 'error';

export interface SSEEvent {
  type: SSEEventType;
  data: unknown;
}
