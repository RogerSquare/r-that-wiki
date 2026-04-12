// Source: cairn/ts/src/web-server.ts — PCB-trace background SVG
// Simplified: small fixed canvas, fewer traces, gentler animation.

import { useEffect, useRef } from 'react';

interface Trace {
  x1: number; y1: number;
  x2: number; y2: number;
  delay: number;
}

function generateTraces(width: number, height: number, count: number): Trace[] {
  const traces: Trace[] = [];
  for (let i = 0; i < count; i++) {
    const horiz = Math.random() > 0.5;
    if (horiz) {
      const y = Math.floor(Math.random() * (height / 20)) * 20;
      const x1 = Math.random() * width * 0.2;
      const x2 = x1 + 100 + Math.random() * (width * 0.6);
      traces.push({ x1, y1: y, x2, y2: y, delay: i * 0.2 });
    } else {
      const x = Math.floor(Math.random() * (width / 20)) * 20;
      const y1 = Math.random() * height * 0.2;
      const y2 = y1 + 60 + Math.random() * (height * 0.6);
      traces.push({ x1: x, y1, x2: x, y2, delay: i * 0.2 });
    }
  }
  return traces;
}

export default function PCBTraceBackground() {
  const ref = useRef<SVGSVGElement>(null);
  const W = 640, H = 240;

  useEffect(() => {
    // Re-generate on mount so each demo render is different
    const traces = generateTraces(W, H, 14);
    const svg = ref.current;
    if (!svg) return;
    svg.innerHTML = '';
    for (const t of traces) {
      const len = Math.hypot(t.x2 - t.x1, t.y2 - t.y1);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', String(t.x1));
      line.setAttribute('y1', String(t.y1));
      line.setAttribute('x2', String(t.x2));
      line.setAttribute('y2', String(t.y2));
      line.setAttribute('stroke', 'rgba(96, 165, 250, 0.28)');
      line.setAttribute('stroke-width', '1.5');
      line.setAttribute('stroke-linecap', 'round');
      line.setAttribute('stroke-dasharray', String(len));
      line.setAttribute('stroke-dashoffset', String(len));
      line.style.animation = `trace-draw 2.2s ${t.delay}s ease-out forwards`;
      svg.appendChild(line);

      // Pad at each endpoint
      for (const [cx, cy] of [[t.x1, t.y1], [t.x2, t.y2]]) {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', String(cx));
        c.setAttribute('cy', String(cy));
        c.setAttribute('r', '2.5');
        c.setAttribute('fill', 'rgba(96, 165, 250, 0.5)');
        c.style.opacity = '0';
        c.style.animation = `trace-pad 0.4s ${t.delay + 2.2}s forwards`;
        svg.appendChild(c);
      }
    }
  }, []);

  return (
    <div style={{
      position: 'relative', width: W, height: H,
      background: '#0a0a0a', borderRadius: 8, overflow: 'hidden',
      border: '1px solid #1e293b',
    }}>
      <svg ref={ref} width={W} height={H} style={{ display: 'block' }} />
      <style>{`
        @keyframes trace-draw { to { stroke-dashoffset: 0; } }
        @keyframes trace-pad  { to { opacity: 1; } }
      `}</style>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        color: '#94a3b8', fontSize: 12, fontFamily: 'ui-monospace, monospace',
        pointerEvents: 'none',
      }}>
        {/* just a visual reminder this is a backdrop */}
        &#x2190; animated backdrop
      </div>
    </div>
  );
}
