// Source: artifex/frontend/src/components/MasonryGrid.jsx (simplified)
// CSS columns approach (simpler than @tanstack/react-virtual's absolute-positioned version).

const items = [
  { id: 1, h: 180, hue: 210 },  { id: 2, h: 240, hue: 280 }, { id: 3, h: 160, hue: 340 },
  { id: 4, h: 300, hue: 40  },  { id: 5, h: 200, hue: 150 }, { id: 6, h: 220, hue: 100 },
  { id: 7, h: 180, hue: 260 },  { id: 8, h: 260, hue: 10  }, { id: 9, h: 200, hue: 320 },
  { id:10, h: 240, hue: 180 },  { id:11, h: 170, hue: 60  }, { id:12, h: 210, hue: 220 },
];

export default function MasonryGrid() {
  return (
    <div style={{
      columnCount: 4, columnGap: 8,
      padding: 8, background: '#020617', borderRadius: 8,
    }}>
      {items.map(it => (
        <div key={it.id} style={{
          breakInside: 'avoid', marginBottom: 8,
          borderRadius: 6, overflow: 'hidden',
          background: `linear-gradient(135deg, hsl(${it.hue}, 65%, 50%), hsl(${(it.hue + 40) % 360}, 65%, 40%))`,
          height: it.h, display: 'flex', alignItems: 'flex-end',
          padding: 10, fontSize: 11, color: 'rgba(255,255,255,0.75)',
          fontFamily: 'ui-monospace, monospace',
        }}>
          <span>image-{String(it.id).padStart(3, '0')} · {it.h}px</span>
        </div>
      ))}
    </div>
  );
}
