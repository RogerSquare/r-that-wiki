// Source: atrium/frontend/src/components/ChatPanel.jsx (simplified)
// Mocks the socket with a local state; no real realtime.

import { useState } from 'react';

interface Message {
  id: number;
  author: string;
  text: string;
  ts: string;
  isAgent?: boolean;
}

const initial: Message[] = [
  { id: 1, author: 'RogerSquare', text: 'Can you look at bug-port-009?', ts: '10:42', isAgent: false },
  { id: 2, author: 'opus-agent',  text: "On it. Admin link field rejects scheme-less URLs — same root cause as the double-scheme bug. I'll normalize on save.", ts: '10:43', isAgent: true },
  { id: 3, author: 'opus-agent',  text: 'Fixed. Pushed as d701781 and deployed.', ts: '11:02', isAgent: true },
];

export default function ChatPanel() {
  const [msgs, setMsgs] = useState(initial);
  const [draft, setDraft] = useState('');
  const [soundOn, setSoundOn] = useState(true);
  const send = () => {
    if (!draft.trim()) return;
    const now = new Date();
    setMsgs([...msgs, {
      id: Date.now(),
      author: 'RogerSquare',
      text: draft,
      ts: `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`,
    }]);
    setDraft('');
  };
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      background: '#0f172a', color: '#e2e8f0',
      border: '1px solid #1e293b', borderRadius: 8,
      width: '100%', maxWidth: 420, height: 360,
      fontSize: 13,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '10px 12px', borderBottom: '1px solid #1e293b',
      }}>
        <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, color: '#94a3b8' }}>Chat</span>
        <button onClick={() => setSoundOn(s => !s)} title={soundOn ? 'Sound on' : 'Sound off'}
          style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 14 }}>
          {soundOn ? '🔔' : '🔕'}
        </button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.map(m => (
          <div key={m.id} style={{
            alignSelf: m.isAgent ? 'flex-start' : 'flex-end',
            maxWidth: '78%',
          }}>
            <div style={{
              fontSize: 11, color: m.isAgent ? '#60a5fa' : '#94a3b8',
              marginBottom: 2, fontWeight: 500,
            }}>{m.author} · <span style={{ color: '#64748b', fontFamily: 'ui-monospace, monospace' }}>{m.ts}</span></div>
            <div style={{
              padding: '7px 10px', borderRadius: 8,
              background: m.isAgent ? '#1e293b' : '#1e3a8a',
              color: m.isAgent ? '#e2e8f0' : '#dbeafe',
              lineHeight: 1.4,
            }}>{m.text}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, padding: 10, borderTop: '1px solid #1e293b' }}>
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Message..."
          style={{
            flex: 1, padding: '6px 10px', borderRadius: 6,
            background: '#1e293b', color: '#e2e8f0',
            border: '1px solid #334155', fontSize: 13,
          }}
        />
        <button onClick={send} disabled={!draft.trim()} style={{
          padding: '6px 12px', borderRadius: 6,
          background: '#60a5fa', color: '#000', border: 'none',
          cursor: draft.trim() ? 'pointer' : 'default', fontSize: 12, fontWeight: 500,
          opacity: draft.trim() ? 1 : 0.5,
        }}>Send</button>
      </div>
    </div>
  );
}
