// Source: atrium/frontend/src/components/TaskCard.jsx
// Simplified for the wiki: removed drag handlers, auth context, flash animations.

import type { ReactNode } from 'react';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  tags?: string[];
  type?: string;
}

const statusColor: Record<Task['status'], string> = {
  todo: '#94a3b8',        // slate-400
  in_progress: '#3b82f6', // blue-500
  review: '#f59e0b',      // amber-500
  done: '#10b981',        // emerald-500
};

const priorityDot: Record<Task['priority'], string> = {
  low: '#64748b',
  medium: '#f59e0b',
  high: '#ef4444',
};

function Badge({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '2px 8px', borderRadius: 999,
      fontSize: 11, fontWeight: 500,
      background: color + '22', color,
    }}>
      {children}
    </span>
  );
}

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div style={{
      background: '#1e293b', borderRadius: 8, padding: 12,
      border: '1px solid #334155', color: '#e2e8f0',
      fontSize: 13, lineHeight: 1.4,
      display: 'flex', flexDirection: 'column', gap: 8,
      width: '100%', maxWidth: 280,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: priorityDot[task.priority], flexShrink: 0,
        }} title={`priority: ${task.priority}`} />
        <span style={{ fontSize: 11, color: '#64748b', fontFamily: 'ui-monospace, monospace' }}>
          {task.id}
        </span>
      </div>
      <div style={{ fontWeight: 500, color: '#f1f5f9' }}>{task.title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
        <Badge color={statusColor[task.status]}>{task.status.replace('_', ' ')}</Badge>
        {task.type && <Badge color="#a78bfa">{task.type}</Badge>}
        {task.assignee && (
          <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 'auto' }}>
            @{task.assignee}
          </span>
        )}
      </div>
      {task.tags && task.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {task.tags.map(t => (
            <span key={t} style={{ fontSize: 10, color: '#64748b' }}>#{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}
