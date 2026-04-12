// Source: kaleidoscope/src/demos/split-pane.tsx (Ink) -> web port
import { useState } from 'react';

export default function SplitPaneLayout() {
  const [ratio, setRatio] = useState(0.35);

  return (
    <div style={{
      display: 'flex', height: 220, width: '100%',
      background: '#0a0a0a', color: '#e2e8f0',
      borderRadius: 6, overflow: 'hidden',
      fontFamily: 'ui-monospace, monospace', fontSize: 13,
      border: '1px solid #1e293b',
    }}>
      <div style={{
        flex: `0 0 ${ratio * 100}%`,
        padding: 12, borderRight: '1px solid #1e293b',
        overflow: 'auto', background: '#020617',
      }}>
        <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
          left pane
        </div>
        <div style={{ color: '#93c5fd' }}>feat-auth-001</div>
        <div style={{ color: '#cbd5e1' }}>feat-ui-ok-002</div>
        <div style={{ color: '#cbd5e1' }}>bug-port-009</div>
        <div style={{ color: '#cbd5e1' }}>opt-perf-004</div>
      </div>
      <div
        onMouseDown={e => {
          const parent = (e.currentTarget.parentElement as HTMLElement);
          const rect = parent.getBoundingClientRect();
          const move = (ev: MouseEvent) => {
            const r = (ev.clientX - rect.left) / rect.width;
            setRatio(Math.max(0.15, Math.min(0.75, r)));
          };
          const up = () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', up);
          };
          window.addEventListener('mousemove', move);
          window.addEventListener('mouseup', up);
        }}
        style={{
          width: 4, cursor: 'ew-resize',
          background: '#1e293b', userSelect: 'none',
        }}
      />
      <div style={{ flex: 1, padding: 14, overflow: 'auto' }}>
        <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
          right pane
        </div>
        <div style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 500 }}>feat-auth-001: Implement JWT Login</div>
        <div style={{ color: '#94a3b8', marginTop: 8, lineHeight: 1.5 }}>
          Implement the login form and token storage.
          Connect to backend API. Implement secure localStorage wrapper.
        </div>
        <div style={{ fontSize: 11, color: '#64748b', marginTop: 10 }}>
          Drag the divider to resize ↔
        </div>
      </div>
    </div>
  );
}
