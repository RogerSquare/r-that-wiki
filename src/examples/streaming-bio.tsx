// Source: cairn/ts/src/sections/About.tsx (Ink version) → web port
// Longer-form text reveal with pacing variation at sentence ends.

import { useEffect, useRef, useState } from 'react';

const defaultBio =
  "Software Engineer building full-stack applications, terminal UIs, and AI-powered tools. " +
  "With a foundation in enterprise infrastructure and systems engineering, I bring a strong focus " +
  "on automation, reliability, and scalable architecture to every project I build. " +
  "I work across the stack — from React and Swift frontends to Node.js and Go backends.";

interface Props {
  text?: string;
  cps?: number;       // base characters per second
}

export default function StreamingBio({ text = defaultBio, cps = 55 }: Props) {
  const [revealed, setRevealed] = useState('');
  const idxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    idxRef.current = 0;
    setRevealed('');

    const tick = () => {
      const i = idxRef.current;
      if (i >= text.length) return;
      const next = text.slice(0, i + 1);
      idxRef.current = i + 1;
      setRevealed(next);

      // Pace: slower at sentence ends for natural rhythm
      const ch = text[i];
      let delay = 1000 / cps;
      if (ch === '.' || ch === '—') delay += 150;
      else if (ch === ',' || ch === ';') delay += 60;

      timerRef.current = setTimeout(tick, delay);
    };

    timerRef.current = setTimeout(tick, 200);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [text, cps]);

  const done = revealed.length === text.length;
  return (
    <div style={{
      padding: 20, background: '#0a0a0a', color: '#e2e8f0',
      borderRadius: 8, border: '1px solid #1e293b',
      fontSize: 15, lineHeight: 1.7,
      fontFamily: 'Inter, system-ui',
      minHeight: 180,
    }}>
      <span>{revealed}</span>
      {!done && (
        <span style={{
          display: 'inline-block', width: 8, height: '1.1em', background: '#60a5fa',
          verticalAlign: 'text-bottom', marginLeft: 2,
          animation: 'bio-caret 0.9s steps(2) infinite',
        }} />
      )}
      <style>{`@keyframes bio-caret { 50% { opacity: 0; } }`}</style>
    </div>
  );
}
