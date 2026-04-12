// Source: kaleidoscope/src/demos/selection-menu.tsx (Ink -> web port)
import { useEffect, useRef, useState } from 'react';

const items = [
  { id: 'new',    label: 'New task',          hint: 'create empty task file' },
  { id: 'edit',   label: 'Edit current task', hint: 'open in $EDITOR' },
  { id: 'switch', label: 'Switch project',    hint: 'list and pick' },
  { id: 'search', label: 'Search everywhere', hint: 'fulltext across tasks' },
  { id: 'exit',   label: 'Quit',              hint: 'ctrl-c also works' },
];

export default function SelectionMenu() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      // Only handle keys when the menu area has focus/hover
      if (!ref.current?.matches(':hover') && document.activeElement !== ref.current) return;
      if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); setActive(a => (a + 1) % items.length); }
      if (e.key === 'ArrowUp'   || e.key === 'k') { e.preventDefault(); setActive(a => (a - 1 + items.length) % items.length); }
      if (/^[1-9]$/.test(e.key)) { const i = parseInt(e.key, 10) - 1; if (i < items.length) setActive(i); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div ref={ref} tabIndex={0} style={{
      padding: 12, background: '#0a0a0a', color: '#e2e8f0',
      borderRadius: 6, fontFamily: 'ui-monospace, Consolas, monospace',
      fontSize: 14, outline: 'none', width: 360,
    }}>
      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8 }}>
        Hover or focus. Use ↑↓ / j k / number keys.
      </div>
      {items.map((it, i) => {
        const isActive = i === active;
        return (
          <div key={it.id} onClick={() => setActive(i)} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '5px 10px', borderRadius: 4, cursor: 'pointer',
            background: isActive ? 'rgba(96,165,250,0.12)' : 'transparent',
            color: isActive ? '#dbeafe' : '#cbd5e1',
          }}>
            <span style={{ color: '#64748b', width: 14 }}>{i + 1}</span>
            <span style={{ color: isActive ? '#60a5fa' : '#475569' }}>{isActive ? '▸' : ' '}</span>
            <span style={{ flex: 1 }}>{it.label}</span>
            <span style={{ fontSize: 11, color: isActive ? '#93c5fd' : '#64748b' }}>{it.hint}</span>
          </div>
        );
      })}
    </div>
  );
}
