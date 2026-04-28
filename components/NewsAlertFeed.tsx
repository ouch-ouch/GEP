'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, CheckCircle, Newspaper } from 'lucide-react';
import type { NewsItem } from '@/lib/types';

const SEVERITY_CONFIG = {
  critical: { Icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-600 text-white' },
  high: { Icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-500 text-white' },
  medium: { Icon: Info, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-400 text-white' },
  low: { Icon: CheckCircle, color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-200', badge: 'bg-slate-400 text-white' },
};

interface Props {
  items: NewsItem[];
}

export default function NewsAlertFeed({ items }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
          <Newspaper className="w-4 h-4 text-slate-500" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 text-sm">Risk Alerts & News</h3>
          <p className="text-xs text-slate-500">{items.length} items found</p>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {items.map((item, i) => {
          const cfg = SEVERITY_CONFIG[item.severity] ?? SEVERITY_CONFIG.low;
          const { Icon } = cfg;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${cfg.bg} ${cfg.border} border`}>
                  <Icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-slate-800 leading-tight">{item.title}</p>
                    <span className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${cfg.badge}`}>
                      {item.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-2">{item.summary}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-medium">{item.source}</span>
                    <span>·</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
