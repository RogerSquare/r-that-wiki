// Source: artifex/frontend/src/components/CollectionDetail.jsx (simplified)

import { useState } from 'react';

const samples = [
  { id: 1, h: 180, hue: 210 },  { id: 2, h: 240, hue: 280 }, { id: 3, h: 160, hue: 340 },
  { id: 4, h: 300, hue: 40  },  { id: 5, h: 200, hue: 150 }, { id: 6, h: 220, hue: 100 },
];

export default function CollectionDetail() {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('Landscapes');
  const [desc, setDesc] = useState('Outdoor scenes, mostly atmospheric. Updated semi-regularly.');

  return (
    <div style={{
      background: '#000', color: '#e2e8f0',
      borderRadius: 8, border: '1px solid #1e293b',
      overflow: 'hidden', fontFamily: 'system-ui', fontSize: 13,
    }}>
      {/* Header */}
      <header style={{ padding: 16, borderBottom: '1px solid #1e293b' }}>
        <a href="#" style={{ fontSize: 11, color: '#64748b', textDecoration: 'none' }}>← collections</a>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginTop: 8 }}>
          <div style={{ flex: 1 }}>
            {editing ? (
              <>
                <input value={name} onChange={e => setName(e.target.value)} style={{
                  fontSize: 20, fontWeight: 600, background: 'transparent', color: '#f1f5f9',
                  border: 'none', borderBottom: '1px solid #334155',
                  padding: 2, fontFamily: 'inherit', width: '100%',
                }} />
                <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} style={{
                  marginTop: 6, width: '100%', background: '#0f172a', color: '#cbd5e1',
                  border: '1px solid #334155', borderRadius: 4, padding: '6px 8px',
                  fontSize: 12, fontFamily: 'inherit', resize: 'none',
                }} />
              </>
            ) : (
              <>
                <h2 style={{ margin: 0, fontSize: 20, color: '#f1f5f9', fontWeight: 600 }}>{name}</h2>
                <p style={{ margin: '6px 0 0 0', fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>{desc}</p>
              </>
            )}
            <div style={{ marginTop: 8, fontSize: 11, color: '#64748b' }}>{samples.length * 8} images · updated 3 days ago</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setEditing(e => !e)} style={{
              padding: '5px 11px', borderRadius: 5, fontSize: 12,
              background: editing ? '#10b981' : 'transparent',
              color: editing ? '#000' : '#94a3b8',
              border: '1px solid ' + (editing ? '#10b981' : '#334155'),
              cursor: 'pointer',
            }}>{editing ? 'Save' : 'Edit'}</button>
            <button style={{
              padding: '5px 11px', borderRadius: 5, fontSize: 12,
              background: 'transparent', color: '#f87171',
              border: '1px solid #334155', cursor: 'pointer',
            }}>Delete</button>
          </div>
        </div>
      </header>

      {/* Grid */}
      <div style={{
        padding: 8, columnCount: 3, columnGap: 6,
        background: '#020617',
      }}>
        {samples.map(it => (
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
