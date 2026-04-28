'use client';

import { motion } from 'framer-motion';
import { Globe, DollarSign, Shield, Truck, GitBranch, Leaf } from 'lucide-react';
import type { RiskReport } from '@/lib/types';

const CATEGORIES = [
  { key: 'geopolitical_risk', label: 'Geopolitical', Icon: Globe, desc: 'Country & trade risk' },
  { key: 'financial_risk', label: 'Financial', Icon: DollarSign, desc: 'Solvency & credit' },
  { key: 'compliance_risk', label: 'Compliance', Icon: Shield, desc: 'Regulatory & legal' },
  { key: 'logistics_risk', label: 'Logistics', Icon: Truck, desc: 'Lead time & transport' },
  { key: 'concentration_risk', label: 'Concentration', Icon: GitBranch, desc: 'Single-source exposure' },
  { key: 'esg_risk', label: 'ESG', Icon: Leaf, desc: 'Environmental & social' },
] as const;

function scoreColor(score: number) {
  if (score >= 75) return { bar: 'bg-red-500', text: 'text-red-600', badge: 'bg-red-50 text-red-700 border-red-200' };
  if (score >= 50) return { bar: 'bg-amber-500', text: 'text-amber-600', badge: 'bg-amber-50 text-amber-700 border-amber-200' };
  return { bar: 'bg-emerald-500', text: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
}

function scoreLabel(score: number) {
  if (score >= 75) return 'High';
  if (score >= 50) return 'Medium';
  return 'Low';
}

interface Props {
  report: RiskReport;
}

export default function RiskCategoryGrid({ report }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {CATEGORIES.map(({ key, label, Icon, desc }, i) => {
        const score = report[key] as number;
        const colors = scoreColor(score);

        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 + 0.2, duration: 0.4 }}
            className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">{label}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colors.badge}`}>
                {scoreLabel(score)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${colors.bar}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 0.8, delay: i * 0.07 + 0.4, ease: 'easeOut' }}
                />
              </div>
              <span className={`text-sm font-bold tabular-nums ${colors.text}`}>{score}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
