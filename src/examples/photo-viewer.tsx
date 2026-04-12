// Source: artifex/frontend/src/components/PhotoViewer.jsx (simplified)
// Static toolbar + zoom state; no keyboard nav, no real image.

import { useState } from 'react';

const Btn = ({ active, children, onClick, title }: { active?: boolean; children: React.ReactNode; onClick?: () => void; title?: string; }) => (
  <button onClick={onClick} title={title} style={{
    padding: 6, borderRadius: 6, border: 'none',
    background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
    color: active ? 'white' : 'rgba(255,255,255,0.55)',
    cursor: 'pointer', fontSize: 13, lineHeight: 1,
    display: 'inline-flex', alignItems: 'center', gap: 4,
  }}>{children}</button>
);

export default function PhotoViewer() {
  const [zoom, setZoom] = useState(1);
  const [favorited, setFavorited] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div style={{
      background: '#000', color: '#e2e8f0',
      borderRadius: 8, border: '1px solid #1e293b',
      overflow: 'hidden', fontFamily: 'system-ui',
    }}>
      {/* Top toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: 8, borderBottom: '1px solid rgba(255,255,255,0.05)', gap: 4 }}>
        <Btn title="Close">✕</Btn>
        <span style={{ fontSize: 13, fontWeight: 500, marginLeft: 8 }}>moonlit-forest.png</span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginLeft: 6 }}>3 of 42</span>
        <div style={{ flex: 1 }} />
        <Btn active={favorited} onClick={() => setFavorited(f => !f)} title={favorited ? 'Unfavorite' : 'Favorite'}>
          {favorited ? '♥' : '♡'}
        </Btn>
        <Btn title="Add to collection">▣</Btn>
        <Btn title="Share link">↗</Btn>
        <Btn title="Download">⤓</Btn>
        <Btn title="Delete" >✕</Btn>
      </div>

      {/* Zoom row */}
      <div style={{ display: 'flex', alignItems: 'center', padding: 4, borderBottom: '1px solid rgba(255,255,255,0.05)', gap: 4, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
        <Btn onClick={() => setZoom(z => Math.min(5, z + 0.5))}>＋</Btn>
        <Btn onClick={() => setZoom(z => Math.max(0.5, z - 0.5))}>－</Btn>
        <Btn onClick={() => setZoom(1)} title="Fit">▢</Btn>
        <span style={{ marginLeft: 4, fontFamily: 'ui-monospace, monospace' }}>{Math.round(zoom * 100)}%</span>
        <div style={{ flex: 1 }} />
        <span>2048×2048 · 3.2 MB · PNG</span>
        <Btn active={showInfo} onClick={() => setShowInfo(v => !v)} title="Info">ⓘ</Btn>
      </div>

      {/* Image area */}
      <div style={{ display: 'flex', minHeight: 240 }}>
        <div style={{
          flex: 1,
          background: 'radial-gradient(ellipse at center, #334155 0%, #0f172a 70%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', position: 'relative',
        }}>
          <div style={{
            width: 180 * zoom, height: 180 * zoom,
            background: 'linear-gradient(135deg, #3b82f6, #a78bfa, #f59e0b)',
            borderRadius: 12, transition: 'width 150ms, height 150ms',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          }} />
        </div>
        {showInfo && (
          <aside style={{
            width: 220, padding: 14, fontSize: 11, lineHeight: 1.5,
            background: 'rgba(255,255,255,0.02)', borderLeft: '1px solid rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.72)',
          }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>Generation</div>
            <div><b>Model</b> sd_xl_base_1.0</div>
            <div><b>Sampler</b> Euler a</div>
            <div><b>Steps</b> 32 · <b>CFG</b> 7.5</div>
            <div><b>Seed</b> 4827193840</div>
            <div style={{ marginTop: 10, color: 'rgba(255,255,255,0.5)' }}>"a moonlit forest, cinematic, 8k, highly detailed"</div>
          </aside>
        )}
      </div>
    </div>
  );
}
