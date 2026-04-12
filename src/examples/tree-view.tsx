// Source: atrium/frontend/src/components/TreeView.jsx
// Simplified: static expansion, no drag, no edit.

import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  parent?: string;
  status: string;
}

const statusColor: Record<string, string> = {
  todo: '#94a3b8', in_progress: '#3b82f6',
  review: '#f59e0b', done: '#10b981',
};

function buildTree(tasks: Task[]) {
  const byParent: Record<string, Task[]> = {};
  for (const t of tasks) {
    const key = t.parent ?? '_root';
    (byParent[key] = byParent[key] ?? []).push(t);
  }
  return byParent;
}

function Row({
  task, children, depth, expanded, onToggle,
}: {
  task: Task; children: Task[]; depth: number;
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const hasChildren = children.length > 0;
  const isOpen = expanded[task.id] ?? true;
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '6px 8px', paddingLeft: 8 + depth * 20,
        fontSize: 13, borderLeft: `2px solid ${statusColor[task.status]}`,
      }}>
        <button onClick={() => hasChildren && onToggle(task.id)} style={{
          width: 16, height: 16, border: 'none', cursor: hasChildren ? 'pointer' : 'default',
          background: 'transparent', color: '#64748b', fontSize: 10, padding: 0,
          visibility: hasChildren ? 'visible' : 'hidden',
        }}>
          {isOpen ? '▾' : '▸'}
        </button>
        <span style={{ fontSize: 11, color: '#64748b', fontFamily: 'ui-monospace, monospace', minWidth: 110 }}>{task.id}</span>
        <span style={{ color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{task.title}</span>
      </div>
    </div>
  );
}

export default function TreeView({ tasks }: { tasks: Task[] }) {
  const byParent = buildTree(tasks);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setExpanded(e => ({ ...e, [id]: !(e[id] ?? true) }));

  function render(parent: string, depth: number): JSX.Element[] {
    const rows = byParent[parent] ?? [];
    return rows.flatMap(t => {
      const children = byParent[t.id] ?? [];
      const isOpen = expanded[t.id] ?? true;
      return [
        <Row key={t.id} task={t} children={children} depth={depth} expanded={expanded} onToggle={toggle} />,
        ...(isOpen ? render(t.id, depth + 1) : []),
      ];
    });
  }

  return (
    <div style={{
      background: '#0f172a', color: '#e2e8f0',
      borderRadius: 8, border: '1px solid #1e293b',
      padding: 4,
    }}>
      {render('_root', 0)}
    </div>
  );
}
