'use client';

import { motion } from 'framer-motion';
import { Building2, MapPin, Layers, Users, Calendar, TrendingUp } from 'lucide-react';
import type { RiskReport } from '@/lib/types';

interface Props {
  report: RiskReport;
}

export default function SupplierProfile({ report }: Props) {
  const fields = [
    { Icon: MapPin, label: 'HQ Country', value: report.hq_country },
    { Icon: Layers, label: 'Industry', value: report.industry },
    { Icon: Building2, label: 'Supplier Tier', value: report.tier },
    { Icon: TrendingUp, label: 'Annual Revenue', value: report.annual_revenue },
    { Icon: Users, label: 'Employees', value: report.employees },
    { Icon: Calendar, label: 'Founded', value: report.founded },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-800 rounded-xl flex items-center justify-center">
          <Building2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">{report.supplier_name}</h3>
          <p className="text-xs text-slate-500">{report.industry}</p>
        </div>
      </div>

      <div className="p-5 grid grid-cols-2 gap-x-6 gap-y-4">
        {fields.map(({ Icon, label, value }) => (
          <div key={label} className="flex items-start gap-2.5">
            <div className="w-6 h-6 bg-slate-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon className="w-3 h-3 text-slate-500" />
            </div>
            <div>
              <p className="text-xs text-slate-400">{label}</p>
              <p className="text-sm font-medium text-slate-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {report.key_facts?.length > 0 && (
        <div className="px-5 pb-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Key Procurement Facts</p>
          <ul className="space-y-1.5">
            {report.key_facts.map((fact, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                {fact}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
