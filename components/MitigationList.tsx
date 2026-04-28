'use client';

import { motion } from 'framer-motion';
import { Zap, Clock, Calendar, Lightbulb } from 'lucide-react';
import type { Recommendation } from '@/lib/types';

const URGENCY_CONFIG = {
  immediate: { label: 'Immediate', Icon: Zap, badge: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' },
  'short-term': { label: 'Short-term', Icon: Clock, badge: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  'long-term': { label: 'Long-term', Icon: Calendar, badge: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-400' },
};

interface Props {
  recommendations: Recommendation[];
}

export default function MitigationList({ recommendations }: Props) {
  const sorted = [...recommendations].sort((a, b) => {
    const order = { immediate: 0, 'short-term': 1, 'long-term': 2 };
    return order[a.urgency] - order[b.urgency];
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 text-sm">Mitigation Recommendations</h3>
          <p className="text-xs text-slate-500">{recommendations.length} actions identified</p>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {sorted.map((rec, i) => {
          const cfg = URGENCY_CONFIG[rec.urgency] ?? URGENCY_CONFIG['long-term'];
          const { Icon } = cfg;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              className="flex gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${cfg.dot}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-semibold text-slate-800 leading-tight">{rec.title}</p>
                  <span className={`flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${cfg.badge}`}>
                    <Icon className="w-3 h-3" />
                    {cfg.label}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-1.5">{rec.description}</p>
                <span className="text-xs text-slate-400 font-medium">{rec.category}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
