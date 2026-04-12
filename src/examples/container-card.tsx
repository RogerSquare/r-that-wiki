// Source: dockview/public/app.js (vanilla DOM -> React for the wiki demo)
// Simplified: static data, no controls.

import { useState } from 'react';

interface Container {
  id: string;
  name: string;
  image: string;
  state: 'running' | 'stopped' | 'paused' | 'restarting' | 'exited';
  uptime: string;
  cpu: number;
  mem: { used: string; pct: number };
}

const samples: Container[] = [
  { id: 'a1', name: 'portfolio-web',  image: 'node:22-alpine',  state: 'running',   uptime: '8d 4h',   cpu: 0.6, mem: { used: '78 MB', pct: 12 } },
  { id: 'b2', name: 'atrium-backend', image: 'node:20',         state: 'running',   uptime: '2h 14m',  cpu: 1.2, mem: { used: '142 MB', pct: 22 } },
  { id: 'c3', name: 'immich-server',  image: 'immich:v1.160',   state: 'running',   uptime: '14d',     cpu: 4.8, mem: { used: '1.8 GB', pct: 56 } },
  { id: 'd4', name: 'old-artifex',    image: 'artifex:prev',    state: 'stopped',   uptime: '—',       cpu: 0,   mem: { used: '0 MB', pct: 0 } },
];

function StateDot({ state }: { state: Container['state'] }) {
  const color = state === 'running' ? '#10b981' : state === 'paused' ? '#f59e0b' : state === 'stopped' || state === 'exited' ? '#64748b' : '#60a5fa';
  return (
    <span style={{
      display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
      background: color,
      boxShadow: state === 'running' ? `0 0 6px ${color}` : 'none',
    }} />
  );
}

function Meter({ pct, label, color }: { pct: number; label: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#94a3b8' }}>
      <span style={{ minWidth: 32 }}>{label}</span>
      <div style={{ flex: 1, height: 4, borderRadius: 2, background: '#1e293b', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, transition: 'width 200ms' }} />
      </div>
      <span style={{ fontFamily: 'ui-monospace, monospace', fontVariantNumeric: 'tabular-nums', minWidth: 30, textAlign: 'right' }}>
        {pct.toFixed(0)}%
      </span>
    </div>
  );
}

export default function ContainerCard() {
  const [acting, setActing] = useState<string | null>(null);

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10,
      padding: 12, background: '#020617', borderRadius: 8,
      fontFamily: 'system-ui', fontSize: 13,
    }}>
      {samples.map(c => (
        <div key={c.id} style={{
          padding: 12, borderRadius: 8,
          background: '#0f172a', border: '1px solid #1e293b',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <StateDot state={c.state} />
            <span style={{ fontWeight: 500, color: '#f1f5f9' }}>{c.name}</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, color: '#64748b' }}>{c.uptime}</span>
          </div>
          <div style={{ fontSize: 11, color: '#64748b', fontFamily: 'ui-monospace, monospace' }}>{c.image}</div>
          <Meter pct={c.cpu * 10} label="cpu" color="#60a5fa" />
          <Meter pct={c.mem.pct} label="mem" color="#a78bfa" />
          <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
            {(['Start', 'Stop', 'Restart', 'Logs'] as const).map(a => (
              <button key={a} onClick={() => { setActing(a + c.id); setTimeout(() => setActing(null), 700); }} style={{
                padding: '3px 8px', borderRadius: 4, border: '1px solid #334155',
                background: acting === a + c.id ? '#334155' : 'transparent',
                color: '#cbd5e1', fontSize: 11, cursor: 'pointer',
              }}>
                {a}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
