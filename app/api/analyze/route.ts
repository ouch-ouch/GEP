import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';
import { TOOL_DEFINITIONS, SYSTEM_PROMPT, executeToolCall } from '@/lib/tools';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const { supplier } = await req.json();

  if (!supplier?.trim()) {
    return new Response(JSON.stringify({ error: 'Supplier name is required' }), { status: 400 });
  }

  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
    return new Response(JSON.stringify({ error: 'GROQ_API_KEY not configured. Add it to .env.local' }), {
      status: 500,
    });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: object) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
        } catch {
          // client disconnected
        }
      };

      try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const messages: Groq.Chat.ChatCompletionMessageParam[] = [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Perform a complete supply chain risk analysis for: ${supplier.trim()}` },
        ];

        let iterations = 0;
        const MAX_ITERATIONS = 8;

        while (iterations < MAX_ITERATIONS) {
          iterations++;

          const response = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages,
            tools: TOOL_DEFINITIONS,
            tool_choice: 'auto',
            max_tokens: 8000,
            temperature: 0.2,
          });

          const choice = response.choices[0];

          if (!choice.message.tool_calls?.length || choice.finish_reason === 'stop') {
            break;
          }

          messages.push(choice.message as Groq.Chat.ChatCompletionMessageParam);

          for (const toolCall of choice.message.tool_calls) {
            const toolName = toolCall.function.name;
            let toolArgs: Record<string, unknown> = {};

            try {
              toolArgs = JSON.parse(toolCall.function.arguments);
            } catch {
              toolArgs = {};
            }

            send({ type: 'tool_call', data: { id: toolCall.id, name: toolName, input: toolArgs } });

            const result = executeToolCall(toolName, toolArgs);

            if (toolName === 'generate_risk_report') {
              send({ type: 'risk_data', data: toolArgs });
            }

            send({
              type: 'tool_result',
              data: { id: toolCall.id, name: toolName, summary: summarizeResult(toolName, result) },
            });

            messages.push({
              role: 'tool',
              tool_call_id: toolCall.id,
              content: JSON.stringify(result),
            });

            if (toolName === 'generate_risk_report') {
              send({ type: 'done', data: null });
              controller.close();
              return;
            }
          }
        }

        send({ type: 'done', data: null });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Analysis failed';
        send({ type: 'error', data: { message } });
      } finally {
        try { controller.close(); } catch { /* already closed */ }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}

function summarizeResult(toolName: string, result: unknown): string {
  const r = result as Record<string, unknown>;
  switch (toolName) {
    case 'search_supply_disruptions': {
      const n = (r.total_found as number) || 0;
      return `Found ${n} active disruption${n !== 1 ? 's' : ''} in the region`;
    }
    case 'assess_geopolitical_risk':
      return `Risk level: ${r.risk_level} (score: ${r.risk_score}/100)`;
    case 'check_financial_health':
      return `Credit rating: ${r.credit_rating} — ${r.revenue_trend} revenue trend`;
    case 'scan_compliance_issues':
      return `ESG rating: ${r.esg_rating} — ${(r.issues as unknown[])?.length || 0} compliance flag(s)`;
    case 'analyze_logistics_risk':
      return `Logistics risk: ${r.risk_level} — avg lead time ${r.lead_time_avg_days} days`;
    case 'generate_risk_report':
      return 'Risk report compiled successfully';
    default:
      return 'Completed';
  }
}
