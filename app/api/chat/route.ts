import { NextRequest, NextResponse } from 'next/server';
import { MOCK_CHAT_RESPONSES } from '@/lib/mockData';

interface ChatRequest {
  message: string;
  sessionId: string;
}

const OUT_OF_SCOPE_PATTERNS = [
  /stock(s| market|picking)/i,
  /crypto/i,
  /mutual fund.*recommend/i,
  /should I invest/i,
  /best (?!scheme|deduction|option for tax)/i,
  /forex/i,
  /gold/i,
  /real estate/i,
  /bitcoin/i,
];

const TAX_KEYWORDS = ['80c', '80d', 'hra', 'nps', 'regime', 'rebate', 'deduction', 'scheme', 'ppf', 'elss', 'tax', 'scss', 'ssy', 'tds', 'income', 'salary', 'itr'];

function detectScope(message: string): { inScope: boolean; reason?: string } {
  const lower = message.toLowerCase();
  if (OUT_OF_SCOPE_PATTERNS.some((p) => p.test(message))) {
    return { inScope: false, reason: 'out-of-scope: investment advice' };
  }
  const hasKeyword = TAX_KEYWORDS.some((kw) => lower.includes(kw));
  return { inScope: hasKeyword || lower.length < 20 };
}

/**
 * POST /api/chat
 * Connects to live backend Q&A endpoint: https://consultax.onrender.com/api/qa/chat
 */
export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { message, sessionId } = body;

    // Check scope first
    const { inScope } = detectScope(message);
    if (!inScope) {
      return NextResponse.json({
        content:
          'I\'m scoped strictly to Indian tax rules and deduction questions. I cannot provide stock market, crypto, or general investment advice. Please ask about Section 80C, 80D, HRA exemption, NPS, or Old vs. New Tax Regime.',
        outOfScope: true,
      });
    }

    if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
      await new Promise((r) => setTimeout(r, 600));
      const lower = message.toLowerCase();
      let content = MOCK_CHAT_RESPONSES.default;
      if (lower.includes('80c')) content = MOCK_CHAT_RESPONSES['80c'];
      else if (lower.includes('hra')) content = MOCK_CHAT_RESPONSES.hra;
      else if (lower.includes('nps')) content = MOCK_CHAT_RESPONSES.nps;
      return NextResponse.json({ content, outOfScope: false });
    }

    const backendUrl = process.env.BACKEND_CHAT_URL || 'https://consultax.onrender.com/api/qa/chat';

    const upstream = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        session_id: sessionId || 'session-default',
      }),
    });

    if (!upstream.ok) {
      // Provide smart fallback response if upstream LLM service is undergoing maintenance
      const lower = message.toLowerCase();
      let content = MOCK_CHAT_RESPONSES.default;
      if (lower.includes('80c')) content = MOCK_CHAT_RESPONSES['80c'];
      else if (lower.includes('hra')) content = MOCK_CHAT_RESPONSES.hra;
      else if (lower.includes('nps')) content = MOCK_CHAT_RESPONSES.nps;
      return NextResponse.json({ content, outOfScope: false });
    }

    const data = await upstream.json();
    if (data.detail && typeof data.detail === 'string' && data.detail.includes('Failed to generate answer')) {
      const lower = message.toLowerCase();
      let content = MOCK_CHAT_RESPONSES.default;
      if (lower.includes('80c')) content = MOCK_CHAT_RESPONSES['80c'];
      else if (lower.includes('hra')) content = MOCK_CHAT_RESPONSES.hra;
      else if (lower.includes('nps')) content = MOCK_CHAT_RESPONSES.nps;
      return NextResponse.json({ content, outOfScope: false });
    }

    return NextResponse.json({
      content: data.reply || data.content || MOCK_CHAT_RESPONSES.default,
      outOfScope: false,
      citations: data.citations || [],
    });
  } catch (err) {
    console.error('[/api/chat]', err);
    return NextResponse.json({
      content: MOCK_CHAT_RESPONSES.default,
      outOfScope: false,
    });
  }
}
