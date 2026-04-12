// Source: atrium/frontend/src/components/ActivityFeed.jsx (simplified)

interface Entry {
  taskId: string;
  taskTitle: string;
  action: string;
  author: string;
  ts: Date;
}

function timeAgo(d: Date) {
  const ms = Date.now() - d.getTime();
  const min = Math.floor(ms / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function groupByBucket(entries: Entry[]) {
  const today: Entry[] = [], yesterday: Entry[] = [], earlier: Entry[] = [];
  const now = Date.now();
  for (const e of entries) {
    const age = now - e.ts.getTime();
    if (age < 24 * 3600 * 1000) today.push(e);
    else if (age < 48 * 3600 * 1000) yesterday.push(e);
    else earlier.push(e);
  }
  return { today, yesterday, earlier };
}

const sample: Entry[] = [
  { taskId: 'feat-port-046', taskTitle: 'Light mode toggle',        action: 'Status → review',      author: 'opus-agent',  ts: new Date(Date.now() -   3 * 60 * 1000) },
  { taskId: 'bug-port-009',  taskTitle: 'Admin link scheme bug',    action: 'Status → review',      author: 'opus-agent',  ts: new Date(Date.now() -  18 * 60 * 1000) },
  { taskId: 'bug-port-009',  taskTitle: 'Admin link scheme bug',    action: 'Created',              author: 'RogerSquare', ts: new Date(Date.now() -  25 * 60 * 1000) },
  { taskId: 'feat-auth-001', taskTitle: 'JWT login',                action: 'Status → in_progress', author: 'Agent-FE',    ts: new Date(Date.now() -   2 * 3600 * 1000) },
  { taskId: 'feat-auth-001', taskTitle: 'JWT login',                action: 'Priority → high',      author: 'RogerSquare', ts: new Date(Date.now() -   3 * 3600 * 1000) },
  { taskId: 'opt-perf-004',  taskTitle: 'Memoize TaskCard',         action: 'Status → done',        author: 'RogerSquare', ts: new Date(Date.now() -  26 * 3600 * 1000) },
  { taskId: 'ui-filters-003',taskTitle: 'Saved filter presets',     action: 'Created',              author: 'RogerSquare', ts: new Date(Date.now() -  73 * 3600 * 1000) },
];

export default function ActivityFeed() {
  const { today, yesterday, earlier } = groupByBucket(sample);
  return (
    <div style={{
      background: '#0f172a', color: '#e2e8f0',
      border: '1px solid #1e293b', borderRadius: 8,
      padding: 12, fontSize: 13,
      width: '100%', maxWidth: 420,
    }}>
      {[['Today', today], ['Yesterday', yesterday], ['Earlier', earlier]].map(([label, items]: any) => items.length > 0 && (
        <div key={label} style={{ marginBottom: 12 }}>
          <div style={{
            fontSize: 10, color: '#64748b', textTransform: 'uppercase',
            letterSpacing: '0.06em', fontWeight: 600, marginBottom: 6,
          }}>{label}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {items.map((e: Entry, i: number) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '5px 8px', borderRadius: 4,
                fontSize: 12,
              }}>
                <span style={{ color: '#64748b', fontFamily: 'ui-monospace, monospace', fontSize: 11, minWidth: 110 }}>{e.taskId}</span>
                <span style={{ flex: 1, color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.action}</span>
                <span style={{ color: '#94a3b8', fontSize: 11 }}>@{e.author}</span>
                <span style={{ color: '#64748b', fontSize: 11, minWidth: 50, textAlign: 'right' }}>{timeAgo(e.ts)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
