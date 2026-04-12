// Source: kaleidoscope/src/demos/progress-bar.tsx (Ink)
// Web port uses CSS clip; in Ink the 9 block elements make this technique work cleanly.
import { useEffect, useState } from 'react';

const BLOCKS = ['', '▏', '▎', '▍', '▌', '▋', '▊', '▉', '█'];
const WIDTH = 28;

function renderBar(progress: number) {
  const totalSubUnits = WIDTH * 8;
  const filledSubUnits = Math.round(progress * totalSubUnits);
  const fullCells = Math.floor(filledSubUnits / 8);
  const remainder = filledSubUnits % 8;
  const partial = BLOCKS[remainder];
  const empty = WIDTH - fullCells - (partial ? 1 : 0);
  return '█'.repeat(fullCells) + partial + ' '.repeat(Math.max(0, empty));
}

export default function ProgressBarSubpixel() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000; last = now;
      setP(prev => {
        const next = prev + dt * 0.25;
        return next > 1 ? 0 : next;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div style={{
      padding: 16, background: '#0a0a0a', color: '#e2e8f0',
      borderRadius: 6, fontFamily: 'ui-monospace, Consolas, monospace',
      fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 10,
    }}>
      <span style={{ color: '#60a5fa' }}>{renderBar(p)}</span>
      <span style={{ color: '#94a3b8', fontSize: 13, fontVariantNumeric: 'tabular-nums' }}>
        {(p * 100).toFixed(1)}%
      </span>
    </div>
  );
}
