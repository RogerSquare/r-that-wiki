// Source: dockview/public/app.js (vanilla DOM) -> React demo
// Shows the same pattern: update via data-attribute, CSS drives the visual.
import { useState, useEffect } from 'react';

function Bar({ pct, label, color }: { pct: number; label: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#94a3b8' }}>
      <span style={{ minWidth: 40 }}>{label}</span>
      <div style={{ flex: 1, height: 8, borderRadius: 4, background: '#1e293b', overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`, height: '100%', background: color,
          transition: 'width 400ms ease-out',
        }} />
      </div>
      <span style={{ fontFamily: 'ui-monospace, monospace', fontVariantNumeric: 'tabular-nums', minWidth: 42, textAlign: 'right' }}>
        {pct.toFixed(1)}%
      </span>
    </div>
  );
}

export default function ProgressBarVanillaJS() {
  const [cpu, setCpu] = useState(24);
  const [mem, setMem] = useState(58);
  const [disk, setDisk] = useState(41);

  useEffect(() => {
    const t = setInterval(() => {
      setCpu(v => Math.max(5, Math.min(95, v + (Math.random() - 0.5) * 20)));
      setMem(v => Math.max(10, Math.min(90, v + (Math.random() - 0.5) * 8)));
      setDisk(v => Math.max(20, Math.min(88, v + (Math.random() - 0.5) * 2)));
    }, 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 8,
      padding: 16, background: '#0f172a',
      border: '1px solid #1e293b', borderRadius: 8,
      fontFamily: 'system-ui',
    }}>
      <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: 4 }}>
        Live metrics · updating
      </div>
      <Bar pct={cpu} label="CPU"    color="#60a5fa" />
      <Bar pct={mem} label="Memory" color="#a78bfa" />
      <Bar pct={disk} label="Disk"  color="#10b981" />
    </div>
  );
}
