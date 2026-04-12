// Source: cairn/ts/src/web-server.ts — theme toggle button
// Simplified: operates on a local state instead of document.documentElement.

import { useEffect, useState } from 'react';

const light = {
  bg: '#ffffff', surface: '#f8fafc',
  text: '#0f172a', muted: '#64748b',
  border: '#e2e8f0', accent: '#2563eb',
};
const dark = {
  bg: '#0a0a0a', surface: '#1e293b',
  text: '#e2e8f0', muted: '#94a3b8',
  border: '#334155', accent: '#60a5fa',
};

export default function LightDarkToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const t = theme === 'dark' ? dark : light;

  // Smooth transition on the demo container
  useEffect(() => {}, [theme]);

  return (
    <div style={{
      padding: 20, borderRadius: 8,
      background: t.bg, color: t.text,
      border: `1px solid ${t.border}`,
      transition: 'background 240ms, color 240ms, border-color 240ms',
      fontFamily: 'Inter, system-ui', fontSize: 14,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontWeight: 600 }}>Roger Ochoa</span>
        <span style={{ color: t.muted, fontSize: 12 }}>Software Engineer</span>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          style={{
            marginLeft: 'auto',
            width: 32, height: 32, borderRadius: 6,
            background: t.surface, color: t.text,
            border: `1px solid ${t.border}`,
            cursor: 'pointer', fontSize: 16,
            transition: 'background 240ms, color 240ms',
          }}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
      <p style={{ color: t.muted, marginTop: 12, lineHeight: 1.5 }}>
        Click the <span style={{ color: t.accent }}>sun/moon</span> to toggle. The transition is 240ms on
        background, text, and border — long enough to register, short enough not to feel laggy.
      </p>
    </div>
  );
}
