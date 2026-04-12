// Source: cairn/ts/src/sections/Header.tsx (Ink) → web adaptation

import { useEffect, useRef, useState } from 'react';

interface Props {
  text?: string;
  fontSize?: number;
  speed?: number;       // degrees per second for the hue cycle
}

export default function GradientTitle({ text = 'Roger Ochoa', fontSize = 48, speed = 30 }: Props) {
  const [t, setT] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT(prev => (prev + speed * dt) % 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [speed]);

  return (
    <div style={{
      padding: 24, background: '#0a0a0a', borderRadius: 8,
      border: '1px solid #1e293b', textAlign: 'center',
    }}>
      <h1 style={{
        fontSize, margin: 0, fontWeight: 700, letterSpacing: '-0.02em',
        lineHeight: 1.1,
        fontFamily: 'Inter, system-ui',
      }}>
        {[...text].map((ch, i) => {
          const hue = (t + i * 8) % 360;
          return (
            <span key={i} style={{
              color: `hsl(${hue}, 70%, 65%)`,
              transition: 'color 80ms linear',
            }}>{ch === ' ' ? '\u00A0' : ch}</span>
          );
        })}
      </h1>
    </div>
  );
}
