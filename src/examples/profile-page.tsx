// Source: artifex/frontend/src/components/ProfilePage.jsx (simplified)

const sampleImages = [
  { id: 1, h: 170, hue: 210 }, { id: 2, h: 220, hue: 280 },
  { id: 3, h: 150, hue: 340 }, { id: 4, h: 260, hue: 40 },
  { id: 5, h: 190, hue: 150 }, { id: 6, h: 200, hue: 100 },
];

export default function ProfilePage() {
  return (
    <div style={{
      background: '#000', color: '#e2e8f0',
      borderRadius: 8, border: '1px solid #1e293b',
      overflow: 'hidden', fontFamily: 'system-ui', fontSize: 13,
    }}>
      {/* Header banner */}
      <div style={{
        height: 90, background: 'linear-gradient(135deg, hsl(210, 60%, 30%), hsl(280, 60%, 25%))',
      }} />
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: 14, marginTop: -30 }}>
        <div style={{
          width: 60, height: 60, borderRadius: '50%',
          background: 'linear-gradient(135deg, #3b82f6, #a78bfa)',
          border: '3px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 600, color: 'white',
        }}>
          R
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#f1f5f9' }}>RogerSquare</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>joined Jan 2026 · 4,127 images · 31 collections</div>
        </div>
        <button style={{
          padding: '6px 14px', borderRadius: 6, fontSize: 12,
          background: '#60a5fa', color: '#000', border: 'none',
          cursor: 'pointer', fontWeight: 500,
        }}>Follow</button>
      </div>
      <div style={{ padding: 8, columnCount: 3, columnGap: 6 }}>
        {sampleImages.map(it => (
          <div key={it.id} style={{
            breakInside: 'avoid', marginBottom: 6,
            height: it.h, borderRadius: 5,
            background: `linear-gradient(135deg, hsl(${it.hue}, 65%, 50%), hsl(${(it.hue + 40) % 360}, 65%, 35%))`,
          }} />
        ))}
      </div>
    </div>
  );
}
