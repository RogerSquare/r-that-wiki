// Source: atrium/frontend/src/components/Sidebar.jsx
// Simplified: no search, no collapse, no drag-reorder.

import { useState } from 'react';

interface Project {
  id: string;
  name: string;
  folder: string;
  count?: number;
}

const defaultProjects: Project[] = [
  { id: 'root',      name: 'Unassigned',          folder: 'Root',                count: 7 },
  { id: 'atb',       name: 'Atrium',              folder: 'Atrium',              count: 34 },
  { id: 'artifex',   name: 'Artifex',             folder: 'Artifex',             count: 89 },
  { id: 'portfolio', name: 'Cairn',               folder: 'Cairn',               count: 92 },
  { id: 'gcm',       name: 'GitHub Collab Manager', folder: 'GitHub Collab Manager', count: 3 },
  { id: 'tui',       name: 'Kaleidoscope',        folder: 'Kaleidoscope',        count: 12 },
];

export default function Sidebar({ projects = defaultProjects }: { projects?: Project[] }) {
  const [active, setActive] = useState('portfolio');
  return (
    <nav style={{
      background: '#0f172a', color: '#e2e8f0',
      borderRight: '1px solid #1e293b',
      padding: 12, width: 240, minHeight: 360,
      fontSize: 13, display: 'flex', flexDirection: 'column', gap: 2,
    }}>
      <div style={{
        fontSize: 11, color: '#475569', textTransform: 'uppercase',
        letterSpacing: '0.06em', fontWeight: 600, padding: '4px 8px', marginBottom: 4,
      }}>Projects</div>
      {projects.map(p => {
        const isActive = active === p.id;
        return (
          <button key={p.id} onClick={() => setActive(p.id)} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '7px 8px', borderRadius: 6,
            background: isActive ? '#1e293b' : 'transparent',
            border: 'none', cursor: 'pointer',
            color: isActive ? '#f1f5f9' : '#cbd5e1',
            textAlign: 'left', fontSize: 13,
          }}>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {p.name}
            </span>
            {p.id !== 'root' && (
              <span style={{
                fontSize: 10, padding: '1px 6px', borderRadius: 999,
                background: isActive ? '#334155' : '#1e293b',
                color: '#94a3b8', fontFamily: 'ui-monospace, monospace',
              }}>{p.id}</span>
            )}
            <span style={{ fontSize: 11, color: '#64748b', minWidth: 18, textAlign: 'right' }}>
              {p.count}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
