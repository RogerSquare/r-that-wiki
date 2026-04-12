// Source: artifex/frontend/src/components/CompareView.jsx (simplified)
import { useState, useRef, useEffect } from 'react';

type Mode = 'side' | 'slider';

function GradientImage({ hueA, hueB }: { hueA: number; hueB: number }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: `linear-gradient(135deg, hsl(${hueA}, 70%, 55%), hsl(${hueB}, 70%, 55%))`,
    }} />
  );
}

export default function CompareView() {
  const [mode, setMode] = useState<Mode>('side');
  const [sliderPos, setSliderPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setSliderPos(Math.max(0, Math.min(100, x)));
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  return (
    <div style={{
      background: '#000', color: '#e2e8f0',
      borderRadius: 8, border: '1px solid #1e293b',
      overflow: 'hidden', fontFamily: 'system-ui',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', padding: 8, gap: 8,
        borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 12,
      }}>
        <span style={{ fontWeight: 500 }}>Compare</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>moonlit-forest-v1.png vs moonlit-forest-v2.png</span>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: 6, padding: 2 }}>
          <button onClick={() => setMode('side')} style={{
            padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 500,
            background: mode === 'side' ? 'rgba(255,255,255,0.12)' : 'transparent',
            color: mode === 'side' ? 'white' : 'rgba(255,255,255,0.5)',
            border: 'none', cursor: 'pointer',
          }}>Side by side</button>
          <button onClick={() => setMode('slider')} style={{
            padding: '4px 10px', borderRadius: 4, fontSize: 11, fontWeight: 500,
            background: mode === 'slider' ? 'rgba(255,255,255,0.12)' : 'transparent',
            color: mode === 'slider' ? 'white' : 'rgba(255,255,255,0.5)',
            border: 'none', cursor: 'pointer',
          }}>Slider</button>
        </div>
      </div>

      <div ref={containerRef} style={{
        position: 'relative', width: '100%', height: 240,
        overflow: 'hidden', userSelect: 'none',
      }}>
        {mode === 'side' ? (
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <GradientImage hueA={210} hueB={280} />
            </div>
            <div style={{ flex: 1 }}>
              <GradientImage hueA={340} hueB={40} />
            </div>
          </div>
        ) : (
          <>
            <div style={{ position: 'absolute', inset: 0 }}>
              <GradientImage hueA={210} hueB={280} />
            </div>
            <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${sliderPos}%)` }}>
              <GradientImage hueA={340} hueB={40} />
            </div>
            <div
              onMouseDown={() => setDragging(true)}
              style={{
                position: 'absolute', top: 0, bottom: 0, left: `${sliderPos}%`,
                width: 2, background: 'white', cursor: 'ew-resize',
                transform: 'translateX(-1px)',
              }}
            >
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 24, height: 24, borderRadius: 12,
                background: 'white', color: '#000', fontSize: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}>↔</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
