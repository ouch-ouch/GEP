'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import AgentThinkingPanel from '@/components/AgentThinkingPanel';
import RiskGauge from '@/components/RiskGauge';
import RiskCategoryGrid from '@/components/RiskCategoryGrid';
import NewsAlertFeed from '@/components/NewsAlertFeed';
import SupplierProfile from '@/components/SupplierProfile';
import MitigationList from '@/components/MitigationList';
import MetricsBar from '@/components/MetricsBar';
import type { ToolCallEvent, RiskReport } from '@/lib/types';

const SAMPLE_SUPPLIERS = ['Samsung Electronics', 'TSMC', 'Foxconn', 'Maersk', 'Intel', 'Tata Steel'];

type Status = 'idle' | 'loading' | 'done' | 'error';

export default function DashboardPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [toolCalls, setToolCalls] = useState<ToolCallEvent[]>([]);
  const [report, setReport] = useState<RiskReport | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const upsertToolCall = useCallback((patch: Partial<ToolCallEvent> & { id: string }) => {
    setToolCalls(prev => {
      const idx = prev.findIndex(t => t.id === patch.id);
      if (idx === -1) {
        const base: ToolCallEvent = { id: patch.id, name: patch.name ?? '', input: patch.input ?? {}, status: 'pending' };
        return [...prev, { ...base, ...patch }];
      }
      const updated = [...prev];
      updated[idx] = { ...updated[idx], ...patch };
      return updated;
    });
  }, []);

  const analyze = useCallback(async (supplierName: string) => {
    if (!supplierName.trim() || status === 'loading') return;

    setStatus('loading');
    setToolCalls([]);
    setReport(null);
    setErrorMsg('');

    const t0 = Date.now();
    setStartTime(t0);
    timerRef.current = setInterval(() => setElapsed(Date.now() - t0), 200);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supplier: supplierName }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Request failed');
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No response body');

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;

          try {
            const event = JSON.parse(raw);

            if (event.type === 'tool_call') {
              upsertToolCall({
                id: event.data.id,
                name: event.data.name,
                input: event.data.input,
                status: 'running',
                startedAt: Date.now(),
              });
            }

            if (event.type === 'tool_result') {
              upsertToolCall({
                id: event.data.id,
                status: 'done',
                resultSummary: event.data.summary,
                doneAt: Date.now(),
              });
            }

            if (event.type === 'risk_data') {
              setReport(event.data as RiskReport);
              setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
            }

            if (event.type === 'done') {
              setStatus('done');
              if (timerRef.current) clearInterval(timerRef.current);
              setElapsed(Date.now() - t0);
            }

            if (event.type === 'error') {
              throw new Error(event.data.message);
            }
          } catch (parseErr) {
            if (parseErr instanceof SyntaxError) continue;
            throw parseErr;
          }
        }
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Analysis failed');
      setStatus('error');
    } finally {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [status, upsertToolCall]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    analyze(query);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100 uppercase tracking-wide">
                Agentic AI
              </span>
              <span className="text-xs text-slate-400">Powered by Groq × LLaMA 3.3 70B</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-3 text-balance">
              Supply Chain Risk<br />Intelligence Agent
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Enter any supplier and watch the AI agent autonomously call tools, reason over real-time data, and generate a comprehensive risk report in seconds.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="e.g. Samsung Electronics, TSMC, Maersk…"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
                  disabled={status === 'loading'}
                />
              </div>
              <button
                type="submit"
                disabled={!query.trim() || status === 'loading'}
                className="flex items-center gap-2 px-6 py-3 bg-blue-800 text-white text-sm font-semibold rounded-xl hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing…</>
                ) : (
                  <>Analyze <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-medium">Try:</span>
              {SAMPLE_SUPPLIERS.map(s => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); analyze(s); }}
                  disabled={status === 'loading'}
                  className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-40"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Error */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-6 pt-6"
          >
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <strong>Error:</strong> {errorMsg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Panel */}
      <AnimatePresence>
        {(status === 'loading' || status === 'done' || toolCalls.length > 0) && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-6 py-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Thinking panel */}
              <div className="lg:col-span-2">
                <AgentThinkingPanel toolCalls={toolCalls} isRunning={status === 'loading'} />
              </div>

              {/* Risk overview */}
              <div className="lg:col-span-3 space-y-5">
                {report ? (
                  <>
                    <MetricsBar
                      sourcesChecked={14}
                      dataPoints={Math.round(elapsed / 10)}
                      processingTimeSec={elapsed / 1000}
                    />
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                      <h3 className="font-semibold text-slate-900 mb-5 text-sm">Overall Risk Assessment</h3>
                      <div className="flex flex-col items-center mb-6">
                        <RiskGauge score={report.overall_risk} size={220} />
                      </div>
                      <RiskCategoryGrid report={report} />
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 flex flex-col items-center justify-center text-center gap-3">
                    <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                    <p className="text-sm text-slate-500 font-medium">Agent is gathering data…</p>
                    <p className="text-xs text-slate-400">Risk dashboard will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Full report */}
      <AnimatePresence>
        {report && status === 'done' && (
          <motion.section
            ref={resultsRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-7xl mx-auto px-6 pb-16"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium px-3">Full Report</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <SupplierProfile report={report} />
              </div>
              <div className="lg:col-span-2 space-y-6">
                {report.news?.length > 0 && <NewsAlertFeed items={report.news} />}
                {report.recommendations?.length > 0 && <MitigationList recommendations={report.recommendations} />}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Idle state */}
      {status === 'idle' && (
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center gap-3 text-center text-slate-400">
          <ChevronDown className="w-6 h-6 animate-bounce" />
          <p className="text-sm">Enter a supplier name above to begin your agentic AI analysis</p>
        </div>
      )}
    </div>
  );
}
