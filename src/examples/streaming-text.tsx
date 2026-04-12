// Source: kaleidoscope/src/demos/streaming-text.tsx
// Simplified for the wiki: terminal → browser. Same reveal logic, different rendering.

import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  speed?: number;      // ms between characters
  onDone?: () => void;
}

export default function StreamingText({ text, speed = 18, onDone }: Props) {
  const [revealed, setRevealed] = useState('');
  const idxRef = useRef(0);

  useEffect(() => {
    idxRef.current = 0;
    setRevealed('');
    const tick = () => {
      if (idxRef.current >= text.length) { onDone?.(); return; }
      idxRef.current += 1;
      setRevealed(text.slice(0, idxRef.current));
    };
    const id = setInterval(tick, speed);
    return () => clearInterval(id);
  }, [text, speed, onDone]);

  const done = revealed.length === text.length;
  return (
    <span style={{ fontFamily: 'ui-monospace, monospace', whiteSpace: 'pre-wrap' }}>
      {revealed}
      {!done && (
        <span style={{
          display: 'inline-block', width: '0.5ch', height: '1em',
          background: 'currentColor', verticalAlign: 'text-bottom',
          animation: 'blink 1s steps(2, start) infinite',
        }} />
      )}
      <style>{`@keyframes blink { to { visibility: hidden; } }`}</style>
    </span>
  );
}
