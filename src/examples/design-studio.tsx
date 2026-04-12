// Source: atrium/frontend/src/components/DesignStudio.jsx (simplified)
import { useState } from 'react';

const defaultVars = {
  '--accent':       '#60a5fa',
  '--bg':           '#0f172a',
  '--surface':      '#1e293b',
  '--border':       '#334155',
  '--text':         '#e2e8f0',
  '--text-muted':   '#94a3b8',
};

export default function DesignStudio() {
  const [vars, setVars] = useState(defaultVars);
  const [message, setMessage] = useState('');
  const [thinking, setThinking] = useState(false);
  const [proposal, setProposal] = useState<string | null>(null);

  const fakePropose = () => {
    setThinking(true);
    setProposal(null);
    setTimeout(() => {
      setThinking(false);
      setProposal(
        'Proposed: bump accent to #818cf8 (indigo-ish), soften surface to #1a2234, ' +
        'slightly warmer muted text #a1a9b8.'
      );
    }, 900);
  };

  const apply = () => {
    setVars({
      ...vars,
      '--accent':     '#818cf8',
      '--surface':    '#1a2234',
      '--text-muted': '#a1a9b8',
    });
    setProposal(null);
    setMessage('');
  };

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '280px 1fr', gap: 16,
      background: vars['--bg'], color: vars['--text'],
      border: `1px solid ${vars['--border']}`, borderRadius: 10,
      padding: 16, fontSize: 13,
    }}>
      {/* Left: chat + variables */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 11, color: vars['--text-muted'], textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
          Design Studio
        </div>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="e.g. warmer, less chrome"
          rows={3}
          style={{
            background: vars['--surface'], color: vars['--text'],
            border: `1px solid ${vars['--border']}`, borderRadius: 6,
            padding: 8, fontFamily: 'inherit', fontSize: 13, resize: 'vertical',
          }}
        />
        <button onClick={fakePropose} disabled={!message || thinking} style={{
          padding: '6px 12px', borderRadius: 6,
          background: vars['--accent'], color: '#000',
          border: 'none', cursor: message && !thinking ? 'pointer' : 'default',
          opacity: message && !thinking ? 1 : 0.5, fontSize: 12, fontWeight: 500,
        }}>
          {thinking ? 'Thinking...' : 'Propose changes'}
        </button>
        {proposal && (
          <div style={{ fontSize: 12, color: vars['--text-muted'], lineHeight: 1.5 }}>
            {proposal}
            <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
              <button onClick={apply} style={{
                padding: '4px 10px', borderRadius: 4, fontSize: 11,
                background: '#10b981', color: '#000', border: 'none', cursor: 'pointer',
              }}>Apply</button>
              <button onClick={() => setProposal(null)} style={{
                padding: '4px 10px', borderRadius: 4, fontSize: 11,
                background: 'transparent', color: vars['--text-muted'],
                border: `1px solid ${vars['--border']}`, cursor: 'pointer',
              }}>Reject</button>
            </div>
          </div>
        )}
        <div style={{ fontSize: 11, color: vars['--text-muted'], borderTop: `1px solid ${vars['--border']}`, paddingTop: 8 }}>
          Current variables:
        </div>
        {Object.entries(vars).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'ui-monospace, monospace' }}>
            <span style={{ display: 'inline-block', width: 14, height: 14, background: v, borderRadius: 3, border: `1px solid ${vars['--border']}` }} />
            <span style={{ color: vars['--text-muted'] }}>{k}</span>
            <span style={{ marginLeft: 'auto', color: vars['--text'] }}>{v}</span>
          </div>
        ))}
      </div>
      {/* Right: preview */}
      <div style={{
        background: vars['--bg'], border: `1px solid ${vars['--border']}`, borderRadius: 6,
        padding: 14, minHeight: 200, transition: 'all 300ms',
      }}>
        <div style={{ fontSize: 11, color: vars['--text-muted'], textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: 10 }}>
          Live preview
        </div>
        <div style={{
          background: vars['--surface'], padding: 12, borderRadius: 6,
          border: `1px solid ${vars['--border']}`,
        }}>
          <div style={{ color: vars['--accent'], fontWeight: 500, marginBottom: 6 }}>Sample task</div>
          <div>Implement JWT Login</div>
          <div style={{ color: vars['--text-muted'], fontSize: 12, marginTop: 6 }}>
            Assigned to Agent-FE · Priority: high
          </div>
          <button style={{
            marginTop: 10, padding: '4px 10px', borderRadius: 4, fontSize: 11,
            background: vars['--accent'], color: '#000', border: 'none', cursor: 'pointer',
          }}>Open</button>
        </div>
      </div>
    </div>
  );
}
