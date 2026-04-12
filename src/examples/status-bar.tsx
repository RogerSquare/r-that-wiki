// Source: kaleidoscope/src/demos/status-bar.tsx + header.tsx (Ink) -> web port
import { useEffect, useState } from 'react';

export default function StatusBarAndHeader() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      background: '#0a0a0a', color: '#e2e8f0',
      borderRadius: 6, overflow: 'hidden', width: '100%',
      fontFamily: 'ui-monospace, monospace', fontSize: 12,
      border: '1px solid #1e293b',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 12px', borderBottom: '1px solid #1e293b',
        background: '#020617',
      }}>
        <span style={{ color: '#60a5fa', fontWeight: 600 }}>atrium</span>
        <span style={{ color: '#475569' }}>›</span>
        <span style={{ color: '#cbd5e1' }}>cairn</span>
        <span style={{ color: '#475569' }}>›</span>
        <span style={{ color: '#f1f5f9' }}>bug-port-009</span>
        <div style={{ flex: 1 }} />
        <span style={{ color: '#fbbf24', fontSize: 11 }}>● unsaved</span>
      </div>

      {/* Content area (placeholder) */}
      <div style={{ padding: 20, color: '#64748b', fontSize: 13, minHeight: 80 }}>
        (content)
      </div>

      {/* Status bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '5px 12px', borderTop: '1px solid #1e293b',
        background: '#1e293b', fontSize: 11,
      }}>
        <span style={{ color: '#10b981' }}>● NORMAL</span>
        <span style={{ color: '#64748b' }}>utf-8</span>
        <span style={{ color: '#64748b' }}>ts</span>
        <div style={{ flex: 1 }} />
        <span style={{ color: '#94a3b8' }}>12:42 / 480</span>
        <span style={{ color: '#64748b', fontVariantNumeric: 'tabular-nums' }}>{time}</span>
      </div>
    </div>
  );
}
