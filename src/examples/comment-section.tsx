// Source: artifex/frontend/src/components/CommentSection.jsx (simplified)
import { useState } from 'react';

interface Comment { id: number; user: string; text: string; ts: string; }

const seed: Comment[] = [
  { id: 1, user: 'RogerSquare', text: 'Love the atmospheric fog on this one. What seed?', ts: '2 days ago' },
  { id: 2, user: 'alice',       text: 'Seed 4827193840 — I tried 10 variations before this.', ts: '1 day ago' },
];

export default function CommentSection() {
  const [comments, setComments] = useState(seed);
  const [draft, setDraft] = useState('');
  const submit = () => {
    if (!draft.trim()) return;
    setComments([...comments, { id: Date.now(), user: 'you', text: draft, ts: 'just now' }]);
    setDraft('');
  };

  return (
    <div style={{
      background: '#0f172a', color: '#e2e8f0',
      border: '1px solid #1e293b', borderRadius: 8,
      padding: 12, fontFamily: 'system-ui', fontSize: 13, width: '100%', maxWidth: 460,
    }}>
      <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: 10 }}>
        Comments · {comments.length}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {comments.map(c => (
          <div key={c.id}>
            <div style={{ fontSize: 12, marginBottom: 2 }}>
              <span style={{ color: c.user === 'you' ? '#60a5fa' : '#f1f5f9', fontWeight: 500 }}>{c.user}</span>
              <span style={{ color: '#64748b', marginLeft: 6, fontSize: 11 }}>{c.ts}</span>
            </div>
            <div style={{ color: '#cbd5e1', lineHeight: 1.5, fontSize: 13 }}>{c.text}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 12, paddingTop: 10, borderTop: '1px solid #1e293b' }}>
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Add a comment..."
          style={{
            flex: 1, padding: '6px 10px', borderRadius: 5,
            background: '#020617', color: '#e2e8f0',
            border: '1px solid #1e293b', fontSize: 13,
          }}
        />
        <button onClick={submit} disabled={!draft.trim()} style={{
          padding: '6px 12px', borderRadius: 5,
          background: '#60a5fa', color: '#000',
          border: 'none', cursor: draft.trim() ? 'pointer' : 'default',
          opacity: draft.trim() ? 1 : 0.5, fontSize: 12, fontWeight: 500,
        }}>Post</button>
      </div>
    </div>
  );
}
