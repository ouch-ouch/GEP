'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Search, Globe, DollarSign, Shield, Truck, FileText,
  ArrowRight, ArrowDown, Brain, Zap, Database, BarChart3,
  Users, AlertTriangle, CheckCircle2, Activity
} from 'lucide-react';

const AGENT_STEPS = [
  { Icon: Search, step: '01', title: 'Disruption Search', desc: 'Queries live supply chain disruption databases for active logistics, geopolitical, and weather-related events.' },
  { Icon: Globe, step: '02', title: 'Geopolitical Risk', desc: 'Evaluates political stability, sanctions exposure, and trade war impact for the supplier\'s HQ country.' },
  { Icon: DollarSign, step: '03', title: 'Financial Health', desc: 'Pulls credit ratings, revenue trends, debt ratios, and liquidity indicators from financial intelligence sources.' },
  { Icon: Shield, step: '04', title: 'Compliance Scan', desc: 'Checks ESG ratings, labor violations, environmental flags, and regulatory compliance status.' },
  { Icon: Truck, step: '05', title: 'Logistics Risk', desc: 'Analyzes lead time variance, port concentration, transport mode diversity, and single-source dependencies.' },
  { Icon: FileText, step: '06', title: 'Risk Report', desc: 'Synthesizes all findings into a structured, actionable risk profile with scores and mitigation priorities.' },
];

const STATS = [
  { value: '$4.2T', label: 'Lost annually to supply chain disruptions' },
  { value: '73%', label: 'Of companies experienced disruptions in 2024' },
  { value: '11 weeks', label: 'Average recovery time from major disruption' },
  { value: '6 tools', label: 'Called autonomously per analysis' },
];

const TECH_STACK = [
  { name: 'Next.js 15', desc: 'App Router + streaming API routes', color: 'bg-slate-900 text-white' },
  { name: 'Groq API', desc: 'LLaMA 3.3 70B — ultra-fast inference', color: 'bg-orange-600 text-white' },
  { name: 'Framer Motion', desc: 'Smooth animated agent step UI', color: 'bg-purple-600 text-white' },
  { name: 'Vercel', desc: 'Zero-config global deployment', color: 'bg-blue-900 text-white' },
  { name: 'TypeScript', desc: 'End-to-end type safety', color: 'bg-blue-600 text-white' },
  { name: 'Tailwind CSS', desc: 'Enterprise design system', color: 'bg-teal-600 text-white' },
];

const GEP_FIT = [
  { Icon: Brain, title: 'Aligned with GEP SMART Platform', desc: 'This agent mirrors the risk intelligence layer that GEP SMART offers to 550+ enterprise clients — making supplier evaluation proactive, not reactive.' },
  { Icon: Zap, title: 'Agentic AI Architecture', desc: 'Demonstrates autonomous multi-step reasoning with tool calling — the exact capability GEP is integrating into next-gen procurement workflows.' },
  { Icon: BarChart3, title: 'Real Procurement Metrics', desc: 'Risk scores, ESG ratings, lead time variance, and supplier concentration match the KPIs GEP customers track in their spend management dashboards.' },
  { Icon: Users, title: 'Buyer-Facing Value', desc: 'Procurement teams can analyze any supplier in seconds instead of weeks of manual RFI processes — directly reducing sourcing cycle times.' },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  );
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <FadeIn>
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100 uppercase tracking-wide mb-5">
                Architecture & Concept
              </span>
              <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
                How the Supply Chain<br />Risk Agent Works
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed">
                An agentic AI system that autonomously orchestrates six specialized tools to produce a real-time supply chain risk assessment — no human-in-the-loop required.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-800">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label }, i) => (
              <FadeIn key={label} delay={i * 0.08}>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white mb-1">{value}</p>
                  <p className="text-blue-200 text-sm">{label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">The Problem</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Procurement teams at enterprises manage hundreds of suppliers across dozens of countries. Manually assessing supply chain risk for each supplier requires weeks of research across financial databases, news feeds, compliance registries, and logistics tracking systems.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                By the time the assessment is complete, the risk landscape has already changed. Companies need <strong className="text-slate-800">real-time, autonomous intelligence</strong> — not quarterly PDF reports.
              </p>
              <div className="space-y-3">
                {[
                  'Manual RFI processes take 4–12 weeks per supplier',
                  'Risk signals are siloed across disconnected data sources',
                  'Procurement teams react to disruptions instead of preventing them',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4 text-sm">The Solution</h3>
              <div className="space-y-3">
                {[
                  'Autonomous 6-tool agent analyzes a supplier in under 30 seconds',
                  'Aggregates data from disruption databases, financial indices, ESG platforms, and logistics trackers',
                  'Produces prioritized risk scores and mitigation recommendations instantly',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-600">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Agent Steps */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">How the Agent Reasons</h2>
              <p className="text-slate-500 max-w-xl mx-auto">The LLaMA 3.3 70B model autonomously decides which tools to call, in which order, and synthesizes the results — no pre-scripted workflow.</p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-5">
            {AGENT_STEPS.map(({ Icon, step, title, desc }, i) => (
              <FadeIn key={step} delay={i * 0.07}>
                <div className="relative bg-slate-50 rounded-2xl border border-slate-200 p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-colors group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-blue-800 rounded-xl flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">Step {step}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeIn>
          <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">System Architecture</h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="flex flex-col lg:flex-row items-center gap-4 justify-center">
              {/* User */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200">
                  <Users className="w-6 h-6 text-slate-600" />
                </div>
                <span className="text-xs font-semibold text-slate-600">User</span>
                <span className="text-xs text-slate-400 text-center max-w-[80px]">Types supplier name</span>
              </div>

              <ArrowRight className="w-5 h-5 text-slate-300 lg:block hidden" />
              <ArrowDown className="w-5 h-5 text-slate-300 lg:hidden" />

              {/* Next.js */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-slate-600">Next.js API</span>
                <span className="text-xs text-slate-400 text-center max-w-[80px]">SSE streaming route</span>
              </div>

              <ArrowRight className="w-5 h-5 text-slate-300 lg:block hidden" />
              <ArrowDown className="w-5 h-5 text-slate-300 lg:hidden" />

              {/* Groq */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-slate-600">Groq + LLaMA</span>
                <span className="text-xs text-slate-400 text-center max-w-[80px]">Agent reasoning loop</span>
              </div>

              <ArrowRight className="w-5 h-5 text-slate-300 lg:block hidden" />
              <ArrowDown className="w-5 h-5 text-slate-300 lg:hidden" />

              {/* Tools */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-blue-800 rounded-2xl flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-slate-600">Tool Executors</span>
                <span className="text-xs text-slate-400 text-center max-w-[80px]">6 intelligence sources</span>
              </div>

              <ArrowRight className="w-5 h-5 text-slate-300 lg:block hidden" />
              <ArrowDown className="w-5 h-5 text-slate-300 lg:hidden" />

              {/* Dashboard */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-slate-600">Dashboard</span>
                <span className="text-xs text-slate-400 text-center max-w-[80px]">Live risk report</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Protocol</p>
                <p className="text-sm text-slate-800 font-medium">Server-Sent Events (SSE)</p>
                <p className="text-xs text-slate-400">Real-time streaming to browser</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Model</p>
                <p className="text-sm text-slate-800 font-medium">LLaMA 3.3 70B Versatile</p>
                <p className="text-xs text-slate-400">Via Groq — parallel tool calls</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Latency</p>
                <p className="text-sm text-slate-800 font-medium">{"<"} 30 seconds end-to-end</p>
                <p className="text-xs text-slate-400">Groq delivers 300+ tok/sec</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Why GEP */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Why This Fits GEP</h2>
              <p className="text-slate-500 max-w-xl mx-auto">This project directly maps to GEP Worldwide's mission of bringing AI-native intelligence to enterprise procurement and supply chain management.</p>
            </div>
          </FadeIn>
          <div className="grid lg:grid-cols-2 gap-5">
            {GEP_FIT.map(({ Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-200 transition-colors">
                  <div className="w-10 h-10 bg-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1.5 text-sm">{title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <FadeIn>
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Tech Stack</h2>
        </FadeIn>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_STACK.map(({ name, desc, color }, i) => (
            <FadeIn key={name} delay={i * 0.06}>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className={`px-2.5 py-1 rounded-lg text-xs font-bold ${color}`}>{name}</div>
                <p className="text-xs text-slate-500 leading-tight">{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-800">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-white mb-3">See It in Action</h2>
            <p className="text-blue-200 mb-7 max-w-md mx-auto">Run a live analysis on any supplier and watch the agent reason through 6 intelligence tools in real time.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-900 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-sm text-sm"
            >
              Launch Agent Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
