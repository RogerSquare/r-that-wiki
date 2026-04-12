// Source: atrium/frontend/src/components/ListView.jsx
// Simplified: no sort, no group, no virtualization — just the visual shape.

interface Task {
  id: string;
  title: string;
  status: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  type?: string;
}

const priorityDot: Record<Task['priority'], string> = {
  low: '#64748b', medium: '#f59e0b', high: '#ef4444',
};

const statusColor: Record<string, string> = {
  todo: '#94a3b8', in_progress: '#3b82f6',
  review: '#f59e0b', done: '#10b981',
};

export default function ListView({ tasks }: { tasks: Task[] }) {
  return (
    <div style={{
      background: '#0f172a', color: '#e2e8f0',
      borderRadius: 8, border: '1px solid #1e293b',
      fontSize: 13, overflow: 'hidden',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '20px 120px 1fr 110px 90px 110px',
        gap: 12, padding: '8px 12px', alignItems: 'center',
        fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em',
        borderBottom: '1px solid #1e293b', fontWeight: 600,
      }}>
        <span></span>
        <span>ID</span>
        <span>Title</span>
        <span>Status</span>
        <span>Type</span>
        <span>Assignee</span>
      </div>
      {tasks.map((t, i) => (
        <div key={t.id} style={{
          display: 'grid',
          gridTemplateColumns: '20px 120px 1fr 110px 90px 110px',
          gap: 12, padding: '10px 12px', alignItems: 'center',
          background: i % 2 === 0 ? 'transparent' : '#0b1220',
          borderBottom: '1px solid #1e293b',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: priorityDot[t.priority],
          }} title={`priority: ${t.priority}`} />
          <span style={{ color: '#64748b', fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>{t.id}</span>
          <span style={{ color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.title}</span>
          <span>
            <span style={{
              padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 500,
              background: statusColor[t.status] + '22', color: statusColor[t.status],
            }}>{t.status.replace('_',' ')}</span>
          </span>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>{t.type ?? '—'}</span>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>{t.assignee ? `@${t.assignee}` : '—'}</span>
        </div>
      ))}
    </div>
  );
}
