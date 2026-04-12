// Source: cairn/ts/src/Portfolio.tsx (Ink) — ported to browser React
// Terminal version uses Ink's <Box> + raw input; this uses divs + buttons.

import { useEffect, useState } from 'react';

interface Tab { id: string; label: string; hint?: string; body: string; }

const defaultTabs: Tab[] = [
  { id: 'about',      label: 'About',      body: 'Software Engineer building full-stack applications, terminal UIs, and AI-powered tools.' },
  { id: 'projects',   label: 'Projects',   body: 'Atrium · Cairn · Artifex · Kaleidoscope · markstack · dockview · Lumeo · mdtask' },
  { id: 'experience', label: 'Experience', body: 'Ten years in systems engineering and VDI platforms. Transitioning into full-stack software engineering.' },
  { id: 'contact',    label: 'Contact',    body: 'rog@r-that.com · github.com/RogerSquare · r-that.com' },
];

export default function TabPanelNavigation({ tabs = defaultTabs }: { tabs?: Tab[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ']') setActive(a => (a + 1) % tabs.length);
      if (e.key === 'ArrowLeft'  || e.key === '[') setActive(a => (a - 1 + tabs.length) % tabs.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tabs.length]);

  const current = tabs[active];
  return (
    <div style={{
      background: '#0a0a0a', color: '#e2e8f0',
      border: '1px solid #1e293b', borderRadius: 8,
      fontFamily: 'ui-monospace, Consolas, monospace', fontSize: 13,
      padding: 14, minHeight: 180,
    }}>
      <div style={{ display: 'flex', gap: 2, borderBottom: '1px solid #1e293b', paddingBottom: 8 }}>
        {tabs.map((t, i) => (
          <button key={t.id} onClick={() => setActive(i)} style={{
            padding: '4px 10px',
            background: i === active ? '#1e3a8a' : 'transparent',
            color: i === active ? '#dbeafe' : '#94a3b8',
            border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 12, fontWeight: 500,
            borderRadius: 4,
          }}>
            {i === active ? `[${t.label}]` : ` ${t.label} `}
          </button>
        ))}
      </div>
      <div style={{ padding: '14px 4px', color: '#e2e8f0', lineHeight: 1.6 }}>
        {current.body}
      </div>
      <div style={{ fontSize: 11, color: '#475569', textAlign: 'right', marginTop: 8 }}>
        ← → or [ ] to navigate
      </div>
    </div>
  );
}
