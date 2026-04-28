'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Circle, AlertCircle, Brain, Search, Globe, DollarSign, Shield, Truck, FileText } from 'lucide-react';
import type { ToolCallEvent } from '@/lib/types';

const TOOL_META: Record<string, { label: string; description: string; Icon: React.ElementType }> = {
  search_supply_disruptions: { label: 'Disruption Search', description: 'Scanning global disruption databases…', Icon: Search },
  assess_geopolitical_risk: { label: 'Geopolitical Risk', description: 'Evaluating country stability & trade exposure…', Icon: Globe },
  check_financial_health: { label: 'Financial Health', description: 'Pulling credit ratings & financial indicators…', Icon: DollarSign },
  scan_compliance_issues: { label: 'Compliance Scan', description: 'Checking ESG ratings & regulatory flags…', Icon: Shield },
  analyze_logistics_risk: { label: 'Logistics Risk', description: 'Analyzing lead times & port exposure…', Icon: Truck },
  generate_risk_report: { label: 'Generating Report', description: 'Synthesizing all findings into risk report…', Icon: FileText },
};

interface Props {
  toolCalls: ToolCallEvent[];
  isRunning: boolean;
}

export default function AgentThinkingPanel({ toolCalls, isRunning }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isRunning ? 'bg-blue-50' : 'bg-slate-50'}`}>
          <Brain className={`w-4 h-4 ${isRunning ? 'text-blue-600' : 'text-slate-400'}`} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 text-sm">Agent Reasoning</h3>
          <p className="text-xs text-slate-500">
            {isRunning ? 'Analyzing in progress…' : toolCalls.length > 0 ? 'Analysis complete' : 'Waiting to start'}
          </p>
        </div>
        {isRunning && (
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-xs text-blue-600 font-medium">Live</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2 max-h-[480px] overflow-y-auto scrollbar-thin">
        <AnimatePresence initial={false}>
          {toolCalls.map((tc, i) => {
            const meta = TOOL_META[tc.name] ?? { label: tc.name, description: 'Processing…', Icon: Brain };
            const { Icon } = meta;

            return (
              <motion.div
                key={tc.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className={`flex gap-3 p-3 rounded-xl border transition-colors ${
                  tc.status === 'running'
                    ? 'bg-blue-50 border-blue-200'
                    : tc.status === 'done'
                      ? 'bg-slate-50 border-slate-200'
                      : tc.status === 'error'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-white border-slate-100'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {tc.status === 'pending' && <Circle className="w-4 h-4 text-slate-300" />}
                  {tc.status === 'running' && <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />}
                  {tc.status === 'done' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {tc.status === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Icon className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-700">{meta.label}</span>
                    <span className="ml-auto text-xs text-slate-400 font-mono">Step {i + 1}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {tc.status === 'running' ? meta.description : tc.resultSummary || meta.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {toolCalls.length === 0 && (
          <div className="py-8 text-center text-slate-400 text-sm">
            <Brain className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>Agent steps will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
