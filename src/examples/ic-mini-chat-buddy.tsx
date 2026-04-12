// Source: cairn/ts/src/ChatBuddy.tsx (Ink) — browser port, canned responses.

import { useState } from 'react';

const snarks = [
  "You typed ssh r-that.com? On purpose? Bold.",
  "Welcome to my portfolio. I'd give you a tour but I was coded an hour ago.",
  "Have you considered that you could be doing literally anything else right now?",
  "I'm a chat buddy. I exist. That's about the extent of my ambitions.",
  "Great question. The answer is 'it depends'. Always is.",
  "Rendering at 30 FPS over your network. Sorry about your data plan.",
  "You want the Projects section. Everyone wants the Projects section. The About section weeps.",
];

export default function ICMiniChatBuddy() {
  const [line, setLine] = useState(0);
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      padding: 12, background: '#0a0a0a', color: '#e2e8f0',
      border: '1px solid #1e293b', borderRadius: 8,
      fontFamily: 'ui-monospace, monospace', fontSize: 13,
      minHeight: 80,
    }}>
      {/* Ascii-ish mascot */}
      <pre style={{ margin: 0, fontFamily: 'inherit', color: '#60a5fa', lineHeight: 1.1, fontSize: 11 }}>
{`  ___
 |o o|
 (_-_)
 /| |\\`}
      </pre>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>IC-mini:</div>
        <div style={{ color: '#cbd5e1', lineHeight: 1.5 }}>
          {snarks[line]}
        </div>
        <button
          onClick={() => setLine((line + 1) % snarks.length)}
          style={{
            marginTop: 8, padding: '4px 10px', borderRadius: 4,
            background: '#1e293b', color: '#94a3b8',
            border: '1px solid #334155', cursor: 'pointer',
            fontSize: 11, fontFamily: 'inherit',
          }}
        >Say another one</button>
      </div>
    </div>
  );
}
