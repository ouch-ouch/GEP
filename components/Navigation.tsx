'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Activity, BarChart3, Linkedin } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
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

        {/* Right side: nav links + author pill together */}
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

          {/* Divider */}
          <div className="w-px h-6 bg-slate-200 mx-2" />

          {/* Author tag — LinkedIn branded */}
          <a
            href="https://www.linkedin.com/in/sushant-burkule/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl transition-all hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: '#0A66C2' }}
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden ring-2 flex-shrink-0" style={{ ringColor: 'rgba(255,255,255,0.3)' }}>
              <Image
                src="/sushant.png"
                alt="Sushant Burkule"
                fill
                className="object-cover"
              />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-white">Sushant Burkule</p>
              <p className="text-[10px] text-blue-200">Built by</p>
            </div>
            <Linkedin className="w-3.5 h-3.5 text-white opacity-80 ml-0.5" />
          </a>
        </div>

      </div>
    </nav>
  );
}
