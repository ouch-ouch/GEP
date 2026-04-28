'use client';

import { motion } from 'framer-motion';

interface Props {
  score: number;
  size?: number;
}

function getRiskLabel(score: number) {
  if (score >= 75) return { label: 'High Risk', color: '#dc2626', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
  if (score >= 50) return { label: 'Medium Risk', color: '#d97706', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
  return { label: 'Low Risk', color: '#16a34a', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
}

export default function RiskGauge({ score, size = 200 }: Props) {
  const { label, color, bg, text, border } = getRiskLabel(score);

  // Circle geometry — center is shifted up so the open gap sits below the visible area
  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * 0.75;           // 270° visible arc
  const offset = arc - (arc * Math.min(score, 100)) / 100;
  const cx = size / 2;
  const cy = size / 2;

  // Crop below the arc endpoints (which sit at cy + 0.707*r) — use 0.76 to ensure both ends are hidden
  const visibleHeight = size * 1;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Gauge — clip bottom so the open gap is hidden */}
      <div className="relative overflow-hidden" style={{ width: size, height: visibleHeight }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Background track */}
          <circle
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${arc} ${circumference - arc}`}
            strokeDashoffset={0}
            transform={`rotate(135 ${cx} ${cy})`}
          />
          {/* Foreground fill */}
          <motion.circle
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${arc} ${circumference - arc}`}
            initial={{ strokeDashoffset: arc }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
            transform={`rotate(135 ${cx} ${cy})`}
          />
        </svg>

        {/* Centered score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold text-slate-900 leading-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-slate-400 font-medium mt-1">out of 100</span>
        </div>
      </div>

      {/* Risk label badge — cleanly below the gauge */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className={`px-4 py-1.5 rounded-full border text-sm font-semibold ${bg} ${text} ${border}`}
      >
        {label}
      </motion.div>
    </div>
  );
}
