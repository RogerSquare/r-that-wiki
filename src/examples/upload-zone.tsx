// Source: artifex/frontend/src/components/UploadZone.jsx (simplified)
import { useState } from 'react';

interface Upload {
  id: number;
  name: string;
  size: string;
  progress: number;    // 0..100
  status: 'queued' | 'uploading' | 'processing' | 'done' | 'error';
}

const sampleStart: Upload[] = [
  { id: 1, name: 'moonlit-forest-v1.png',   size: '3.2 MB', progress: 100, status: 'done' },
  { id: 2, name: 'moonlit-forest-v2.png',   size: '3.1 MB', progress: 100, status: 'processing' },
  { id: 3, name: 'neon-skyline-001.png',    size: '5.8 MB', progress: 64,  status: 'uploading' },
  { id: 4, name: 'neon-skyline-002.png',    size: '6.0 MB', progress: 0,   status: 'queued' },
];

function StatusBadge({ status }: { status: Upload['status'] }) {
  const map: Record<Upload['status'], { label: string; color: string }> = {
    queued:     { label: 'queued',     color: '#64748b' },
    uploading:  { label: 'uploading',  color: '#3b82f6' },
    processing: { label: 'processing', color: '#f59e0b' },
    done:       { label: 'done',       color: '#10b981' },
    error:      { label: 'error',      color: '#ef4444' },
  };
  const s = map[status];
  return (
    <span style={{
      padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 500,
      background: s.color + '22', color: s.color,
    }}>{s.label}</span>
  );
}

export default function UploadZone() {
  const [hovered, setHovered] = useState(false);
  const [items] = useState(sampleStart);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'system-ui', fontSize: 13 }}>
      {/* Drop zone */}
      <div
        onDragEnter={() => setHovered(true)}
        onDragLeave={() => setHovered(false)}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); setHovered(false); }}
        style={{
          padding: 24, borderRadius: 10, textAlign: 'center',
          border: `2px dashed ${hovered ? '#60a5fa' : '#334155'}`,
          background: hovered ? 'rgba(96, 165, 250, 0.05)' : '#0f172a',
          color: hovered ? '#dbeafe' : '#94a3b8',
          transition: 'all 120ms',
        }}
      >
        <div style={{ fontSize: 30, marginBottom: 6 }}>⬆</div>
        <div style={{ fontWeight: 500, color: '#e2e8f0' }}>Drop images to upload</div>
        <div style={{ fontSize: 11, marginTop: 4 }}>or click to browse — PNG / JPG / WEBP / MP4 — max 50 MB</div>
      </div>

      {/* Progress list */}
      <div style={{
        background: '#0f172a', color: '#e2e8f0',
        border: '1px solid #1e293b', borderRadius: 8,
        padding: 6,
      }}>
        {items.map(it => (
          <div key={it.id} style={{
            display: 'grid', gridTemplateColumns: '1fr 90px 120px 80px',
            gap: 8, padding: '7px 10px', alignItems: 'center',
            borderBottom: '1px solid #1e293b', fontSize: 12,
          }}>
            <span style={{ color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {it.name}
            </span>
            <span style={{ color: '#64748b', fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>
              {it.size}
            </span>
            <div style={{
              position: 'relative', height: 6, borderRadius: 3,
              background: '#1e293b', overflow: 'hidden',
            }}>
              <div style={{
                width: `${it.progress}%`, height: '100%',
                background: it.status === 'done' ? '#10b981'
                           : it.status === 'error' ? '#ef4444' : '#3b82f6',
                transition: 'width 200ms ease-out',
              }} />
            </div>
            <StatusBadge status={it.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
