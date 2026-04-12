// Source: kaleidoscope/src/demos/loading-skeleton.tsx (Ink -> web port)
import { useEffect, useState } from 'react';

const lines = [
  { width: '70%', h: 18 },
  { width: '92%', h: 14 },
  { width: '88%', h: 14 },
  { width: '55%', h: 14 },
];

export default function LoadingSkeleton() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf = 0, last = performance.now();
    const step = (now: number) => {
      setT(prev => (prev + (now - last) * 0.2) % 2000);
      last = now;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const shimmerX = (t / 2000) * 150 - 25;

  return (
    <div style={{
      padding: 20, background: '#0a0a0a',
      borderRadius: 8, width: 360, display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {lines.map((l, i) => (
        <div key={i} style={{
          width: l.width, height: l.h, borderRadius: 4, overflow: 'hidden',
          position: 'relative', background: '#1e293b',
        }}>
          <div style={{
            position: 'absolute', top: 0, bottom: 0, width: '40%',
            left: `${shimmerX}%`,
            background: 'linear-gradient(90deg, transparent, rgba(148,163,184,0.15), transparent)',
          }} />
        </div>
      ))}
    </div>
  );
}
