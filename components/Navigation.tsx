'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, BarChart3 } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">GEP</span>
            <span className="text-slate-400 text-sm ml-1 font-light">Risk Intelligence</span>
          </div>
          <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
            Agentic AI
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/'
                ? 'bg-blue-50 text-blue-800'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/how-it-works"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/how-it-works'
                ? 'bg-blue-50 text-blue-800'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4" />
            How It Works
          </Link>
        </div>
      </div>
    </nav>
  );
}
