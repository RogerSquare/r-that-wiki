// Source: artifex/frontend/src/components/CollectionsPage.jsx (simplified)

const collections = [
  { id: 1, name: 'Landscapes',      count: 48,  cover: 210 },
  { id: 2, name: 'Neon city',       count: 31,  cover: 280 },
  { id: 3, name: 'Portraits',       count: 72,  cover: 340 },
  { id: 4, name: 'Studio tests',    count: 18,  cover: 40  },
  { id: 5, name: 'Archive',         count: 204, cover: 150 },
  { id: 6, name: 'Drafts',          count: 9,   cover: 100 },
];

export default function CollectionsPage() {
  return (
    <div style={{
      background: '#020617', color: '#e2e8f0',
      borderRadius: 8, border: '1px solid #1e293b',
      padding: 14, fontFamily: 'system-ui', fontSize: 13,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ fontWeight: 500, fontSize: 15 }}>Collections</span>
        <button style={{
          padding: '5px 12px', borderRadius: 6,
          background: '#60a5fa', color: '#000', border: 'none',
          fontSize: 12, fontWeight: 500, cursor: 'pointer',
        }}>+ New collection</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
        {collections.map(c => (
          <div key={c.id} style={{
            background: '#0f172a', borderRadius: 8,
            border: '1px solid #1e293b', overflow: 'hidden',
            cursor: 'pointer', transition: 'border-color 120ms',
          }}>
            <div style={{
              height: 100,
              background: `linear-gradient(135deg, hsl(${c.cover}, 65%, 50%), hsl(${(c.cover + 40) % 360}, 65%, 35%))`,
            }} />
            <div style={{ padding: 10 }}>
              <div style={{ fontWeight: 500, color: '#f1f5f9' }}>{c.name}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{c.count} images</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
