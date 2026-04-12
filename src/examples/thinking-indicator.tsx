// Source: kaleidoscope/src/demos/thinking-indicator.tsx (Ink -> web port)
// Three variants: shimmer, braille, pulse.
import { useEffect, useState } from 'react';

function Shimmer({ text }: { text: string }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0, last = performance.now();
    const step = (now: number) => {
      setT(prev => (prev + (now - last) * 0.05) % (text.length * 20));
      last = now;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text.length]);
  return (
    <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 15 }}>
      {[...text].map((c, i) => {
        const dist = Math.abs(i - (t / 20));
        const intensity = Math.max(0, 1 - dist / 4);
        const gray = 150 + Math.round(100 * intensity);
        return <span key={i} style={{ color: `rgb(${gray},${gray},${gray + 10})` }}>{c}</span>;
      })}
    </span>
  );
}

const BRAILLE = ['⠋','⠙','⠹','⠸','⠼','⠴','⠦','⠧','⠇','⠏'];
function Braille() {
  const [f, setF] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setF(f => (f + 1) % BRAILLE.length), 90);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 16 }}>
      <span style={{ color: '#f59e0b' }}>{BRAILLE[f]}</span>{' '}
      <span style={{ color: '#94a3b8' }}>thinking</span>
    </span>
  );
}

function Pulse() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0, last = performance.now();
    const step = (now: number) => {
      setT(prev => (prev + (now - last) * 0.002) % (Math.PI * 2));
      last = now;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);
  const opacity = 0.4 + 0.6 * (Math.sin(t) * 0.5 + 0.5);
  return (
    <span style={{
      fontFamily: 'ui-monospace, monospace', fontSize: 15,
      color: '#60a5fa', opacity,
    }}>● thinking</span>
  );
}

export default function ThinkingIndicator() {
  return (
    <div style={{
      padding: 16, background: '#0a0a0a', color: '#e2e8f0',
      borderRadius: 6,
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <Shimmer text="processing..." />
      <Braille />
      <Pulse />
    </div>
  );
}
