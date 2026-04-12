// Source: atrium/frontend/src/components/TaskModal.jsx
// Simplified: static content, no save wiring, no history API, no markdown editor.

import { useState } from 'react';

type Tab = 'details' | 'comments' | 'history' | 'raw';

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  assignee?: string;
  tags?: string[];
  description?: string;
  activity_log?: { timestamp: string; action: string }[];
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'details',  label: 'Details' },
  { id: 'comments', label: 'Comments' },
  { id: 'history',  label: 'History' },
  { id: 'raw',      label: 'Raw YAML' },
];

export default function TaskModal({ task }: { task: Task }) {
  const [active, setActive] = useState<Tab>('details');
  return (
    <div style={{
      background: '#1e293b', color: '#e2e8f0',
      borderRadius: 10, border: '1px solid #334155',
      width: '100%', maxWidth: 640,
      display: 'flex', flexDirection: 'column',
      fontSize: 13, fontFamily: 'system-ui',
    }}>
      {/* Header */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #334155' }}>
        <div style={{ fontSize: 11, color: '#64748b', fontFamily: 'ui-monospace, monospace' }}>{task.id}</div>
        <div style={{ fontSize: 16, fontWeight: 500, color: '#f1f5f9', marginTop: 2 }}>{task.title}</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 8, fontSize: 11 }}>
          <span style={{ padding: '2px 8px', borderRadius: 999, background: '#3b82f622', color: '#60a5fa' }}>{task.status}</span>
          <span style={{ padding: '2px 8px', borderRadius: 999, background: '#f59e0b22', color: '#fbbf24' }}>{task.priority}</span>
          {task.assignee && <span style={{ color: '#94a3b8', marginLeft: 'auto' }}>@{task.assignee}</span>}
        </div>
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #334155', padding: '0 10px' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)} style={{
            padding: '10px 14px', background: 'transparent',
            border: 'none', cursor: 'pointer', fontSize: 12,
            color: active === t.id ? '#60a5fa' : '#94a3b8',
            borderBottom: active === t.id ? '2px solid #60a5fa' : '2px solid transparent',
            marginBottom: -1,
          }}>{t.label}</button>
        ))}
      </div>
      {/* Body */}
      <div style={{ padding: 18, minHeight: 140, fontSize: 13, lineHeight: 1.5 }}>
        {active === 'details' && (
          <div>
            <p style={{ color: '#cbd5e1' }}>{task.description ?? 'No description.'}</p>
            {task.tags && task.tags.length > 0 && (
              <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {task.tags.map(t => <span key={t} style={{ fontSize: 11, color: '#64748b' }}>#{t}</span>)}
              </div>
            )}
          </div>
        )}
        {active === 'comments' && <div style={{ color: '#94a3b8', fontStyle: 'italic' }}>Agent + human comments would stream here.</div>}
        {active === 'history' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {(task.activity_log ?? []).slice(-5).reverse().map((e, i) => (
              <div key={i} style={{ fontSize: 11, color: '#94a3b8' }}>
                <span style={{ color: '#64748b', fontFamily: 'ui-monospace, monospace' }}>{e.timestamp.slice(0, 16).replace('T', ' ')}</span>
                {' '}· {e.action}
              </div>
            ))}
          </div>
        )}
        {active === 'raw' && (
          <pre style={{ fontSize: 11, color: '#cbd5e1', fontFamily: 'ui-monospace, monospace' }}>
{`id: ${task.id}
title: ${task.title}
status: ${task.status}
priority: ${task.priority}${task.assignee ? `\nassignee: ${task.assignee}` : ''}`}
          </pre>
        )}
      </div>
    </div>
  );
}
