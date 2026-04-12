// Source: atrium/frontend/src/components/TerminalTab.jsx (simplified mock)
// The real version uses xterm.js + socket.io for a live PTY; this is a static visual.

const sampleLines = [
  '$ opencode "Please review task bug-port-009: Admin project link field rejects scheme-less URLs. Check the Atrium task markdown file for details."',
  '',
  '✻ Thinking...',
  '',
  'I\'ll look at the admin project link field bug.',
  '',
  '  Read ts/src/web-server.ts (admin routes, lines 1325-1375)',
  '  Read ts/src/web-server.ts (public renderer, lines 590-650)',
  '',
  'Root cause found: input type="url" rejects scheme-less format, renderer prepends https://',
  'to whatever\'s stored. Double-scheme results when full URLs are entered.',
  '',
  'Proposed fix: normalize on save (strip http(s):// prefix), change input to type="text".',
  '',
  '  Edit ts/src/web-server.ts:1333 (input type)',
  '  Edit ts/src/web-server.ts:1341 (normalizeLink helper)',
  '',
  '$ ',
];

export default function TerminalTab() {
  return (
    <div style={{
      background: '#0a0f1a', color: '#e2e8f0',
      border: '1px solid #1e293b', borderRadius: 8,
      fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
      fontSize: 12, lineHeight: 1.5,
      padding: 12, overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', gap: 6, marginBottom: 10, paddingBottom: 8,
        borderBottom: '1px solid #1e293b',
      }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
        <span style={{ marginLeft: 10, color: '#64748b', fontSize: 11 }}>bug-port-009 · xterm · live</span>
      </div>
      <div style={{ whiteSpace: 'pre', maxHeight: 260, overflow: 'auto' }}>
        {sampleLines.map((line, i) => {
          let color = '#cbd5e1';
          if (line.startsWith('$ ')) color = '#60a5fa';
          else if (line.startsWith('  Read ') || line.startsWith('  Edit ')) color = '#94a3b8';
          else if (line.startsWith('✻')) color = '#fbbf24';
          else if (line.startsWith('Root cause')) color = '#f87171';
          else if (line.startsWith('Proposed')) color = '#34d399';
          return <div key={i} style={{ color }}>{line || '\u00A0'}</div>;
        })}
      </div>
    </div>
  );
}
