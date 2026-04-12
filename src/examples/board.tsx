// Source: atrium/frontend/src/components/Board.jsx
// Simplified: no drag-drop library, no socket subscriptions, no filters. Just the visual shape.

import TaskCard from './task-card';

const columns = ['todo', 'in_progress', 'review', 'done'] as const;
type Status = typeof columns[number];

interface Task {
  id: string;
  title: string;
  status: Status;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  type?: string;
  tags?: string[];
}

const columnLabels: Record<Status, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'Review',
  done: 'Done',
};

export default function Board({ tasks }: { tasks: Task[] }) {
  const byStatus = columns.reduce<Record<Status, Task[]>>((acc, c) => {
    acc[c] = tasks.filter(t => t.status === c);
    return acc;
  }, { todo: [], in_progress: [], review: [], done: [] });

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
      padding: 16, background: '#0f172a', borderRadius: 8,
      color: '#e2e8f0', fontSize: 13,
    }}>
      {columns.map(col => (
        <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 300 }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '4px 8px', fontSize: 11, fontWeight: 600,
            color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            <span>{columnLabels[col]}</span>
            <span style={{ fontFamily: 'ui-monospace, monospace' }}>{byStatus[col].length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {byStatus[col].map(t => <TaskCard key={t.id} task={t} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
