'use client';

import { motion } from 'framer-motion';
import { Database, Clock, BarChart2 } from 'lucide-react';

interface Props {
  sourcesChecked: number;
  dataPoints: number;
  processingTimeSec: number;
}

export default function MetricsBar({ sourcesChecked, dataPoints, processingTimeSec }: Props) {
  const metrics = [
    { Icon: Database, label: 'Sources Checked', value: sourcesChecked.toLocaleString(), unit: '' },
    { Icon: BarChart2, label: 'Data Points', value: dataPoints.toLocaleString(), unit: '' },
    { Icon: Clock, label: 'Analysis Time', value: processingTimeSec.toFixed(1), unit: 's' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-blue-800 rounded-2xl p-5"
    >
      <div className="grid grid-cols-3 divide-x divide-blue-700">
        {metrics.map(({ Icon, label, value, unit }, i) => (
          <div key={label} className={`flex items-center gap-3 ${i > 0 ? 'pl-6' : ''} ${i < 2 ? 'pr-6' : ''}`}>
            <div className="w-9 h-9 bg-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-blue-200" />
            </div>
            <div>
              <p className="text-xs text-blue-300 font-medium">{label}</p>
              <p className="text-xl font-bold text-white tabular-nums">
                {value}
                <span className="text-sm font-medium text-blue-300 ml-0.5">{unit}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
