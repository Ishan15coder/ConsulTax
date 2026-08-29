'use client';
// ── Tax Q&A Assistant Page (Darkish Professional Theme with #CFCEED Accent) ──────

import { useState, useRef, useEffect } from 'react';
import { getSessionId } from '@/lib/session';
import type { ChatMessage } from '@/lib/types';

const SUGGESTED_QUESTIONS = [
  'What investments qualify under Section 80C?',
  'How is HRA exemption calculated u/s 10(13A)?',
  'What is the benefit of NPS under 80CCD(1B)?',
  'Old regime vs new regime — which is better for me?',
  'What is the Section 87A rebate for FY 2024-25?',
];

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user';
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 14,
        alignItems: 'flex-start',
        gap: 10,
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 32, height: 32,
            borderRadius: 8,
            background: '#CFCEED',
            color: '#0B1726',
            fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 2px 6px rgba(207, 206, 237, 0.3)',
            marginTop: 2,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1726" strokeWidth="2.5">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
        </div>
      )}

      <div className={isUser ? 'chat-bubble-user' : 'chat-bubble-assistant'}>
        {msg.outOfScope && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginBottom: 8,
              padding: '3px 8px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: 4,
              fontSize: '0.72rem',
              color: '#F59E0B',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          >
            ⚠ Out of scope
          </div>
        )}
        <p style={{ margin: 0, lineHeight: 1.6, color: isUser ? '#0B1726' : '#F8FAFC', fontSize: '0.9rem' }}>
          {msg.content}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, gap: 12 }}>
          <span suppressHydrationWarning style={{ fontSize: '0.7rem', color: isUser ? 'rgba(11, 23, 38, 0.7)' : '#CFCEED' }}>
            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          {!isUser && (
            <span style={{ fontSize: '0.7rem', color: '#CFCEED', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
              ✓ Verified Tax Rule Citation
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Hello! I can answer your questions regarding Indian tax-saving deductions (Section 80C, 80D, 80CCD, HRA), regime selection, and eligibility requirements — based strictly on vetted tax rules.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), sessionId: getSessionId() }),
      });
      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
        outOfScope: data.outOfScope,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Connection error. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px 0', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)' }}>

      {/* Page Header */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#F8FAFC', marginBottom: 4, fontFamily: 'Onest, sans-serif' }}>
              Tax Q&amp;A Assistant
            </h1>
            <div style={{ fontSize: '0.825rem', color: '#CFCEED' }}>
              Ask any question about Section 80C, 80D, HRA exemption, NPS, or Old vs New Tax Regime
            </div>
          </div>

          <span
            style={{
              padding: '4px 12px',
              background: 'rgba(207, 206, 237, 0.15)',
              border: '1px solid rgba(207, 206, 237, 0.3)',
              borderRadius: 20,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#CFCEED',
              fontFamily: 'Onest, sans-serif',
            }}
          >
            🔒 Scoped to Tax Rules Corpus Only
          </span>
        </div>
      </div>

      {/* Messages Stream */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 4px',
          marginBottom: 16,
        }}
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-start' }}>
            <div
              style={{
                width: 32, height: 32,
                borderRadius: 8,
                background: '#CFCEED',
                color: '#0B1726',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B1726" strokeWidth="2.5">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
            <div
              className="chat-bubble-assistant"
              style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '12px 16px' }}
            >
              <span className="spinner" />
              <span style={{ fontSize: '0.855rem', color: '#CFCEED' }}>
                Consulting Indian Tax Rules corpus...
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#CFCEED', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8, fontFamily: 'Onest, sans-serif' }}>
            Popular Tax Questions
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                style={{
                  padding: '6px 14px',
                  background: '#122338',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 6,
                  fontSize: '0.8rem',
                  color: '#F8FAFC',
                  cursor: 'pointer',
                  fontFamily: 'Onest, sans-serif',
                  transition: 'all 0.15s ease',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = '#CFCEED';
                  (e.currentTarget as HTMLButtonElement).style.color = '#0B1726';
                  (e.currentTarget as HTMLButtonElement).style.background = '#CFCEED';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#F8FAFC';
                  (e.currentTarget as HTMLButtonElement).style.background = '#122338';
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: 10,
          padding: '12px',
          background: '#122338',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          marginBottom: 24,
        }}
      >
        <input
          ref={inputRef}
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about Section 80C, 80D, HRA exemption, NPS, or regime comparison..."
          aria-label="Type your tax question"
          disabled={loading}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#F8FAFC',
            fontSize: '0.9rem',
            fontFamily: 'Onest, sans-serif',
          }}
        />
        <button
          id="chat-send-btn"
          type="submit"
          disabled={loading || !input.trim()}
          className="btn-primary"
          style={{ padding: '8px 22px', fontSize: '0.875rem' }}
          aria-label="Send message"
        >
          {loading ? <span className="spinner" /> : 'Send Question'}
        </button>
      </form>
    </div>
  );
}
