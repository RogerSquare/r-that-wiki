// Source: artifex/frontend/src/components/StatsDashboard.jsx (simplified)

function Tile({ label, value, sub }: { label: string; value: string; sub?: string; }) {
  return (
    <div style={{
      padding: 14, background: '#0f172a',
      border: '1px solid #1e293b', borderRadius: 8,
      display: 'flex', flexDirection: 'column', gap: 4,
    }}>
      <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 600, color: '#f1f5f9', fontFamily: 'ui-monospace, monospace' }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: '#94a3b8' }}>{sub}</div>}
    </div>
  );
}

function Spark({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values, 1);
  const w = 140, h = 32, step = w / (values.length - 1);
  const points = values.map((v, i) => `${i * step},${h - (v / max) * h}`).join(' ');
  return (
    <svg width={w} height={h}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function StatsDashboard() {
  const daily = [12, 8, 14, 22, 18, 25, 32, 28, 34, 40, 38, 45];
  return (
    <div style={{ fontFamily: 'system-ui', fontSize: 13, color: '#e2e8f0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8 }}>
        <Tile label="Total images" value="4,127" sub="+42 this week" />
        <Tile label="Storage" value="18.6 GB" sub="of 100 GB" />
        <Tile label="Collections" value="31" />
        <Tile label="Uploads today" value="45" sub="yesterday: 38" />
      </div>
      <div style={{
        marginTop: 10, padding: 14,
        background: '#0f172a', border: '1px solid #1e293b', borderRadius: 8,
      }}>
        <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: 10 }}>Uploads over last 12 days</div>
        <Spark values={daily} color="#60a5fa" />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#64748b', fontFamily: 'ui-monospace, monospace', marginTop: 4 }}>
          <span>12 days ago</span>
          <span>today</span>
        </div>
      </div>
    </div>
  );
}
