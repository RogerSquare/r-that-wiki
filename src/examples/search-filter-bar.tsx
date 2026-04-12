// Source: artifex/frontend/src/components/SearchFilterBar.jsx (simplified)
import { useState } from 'react';

const tags = { models: ['sd_xl', 'flux_dev', 'dall-e-3'], samplers: ['Euler a', 'DPM++ 2M', 'DDIM'] };

export default function SearchFilterBar() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  const setFilter = (k: string, v: string) => {
    setFilters(f => {
      const next = { ...f };
      if (!v) delete next[k]; else next[k] = v;
      return next;
    });
  };
  const activeCount = Object.keys(filters).length;

  const pillStyle: React.CSSProperties = {
    padding: '4px 10px', borderRadius: 999, fontSize: 12,
    background: '#1e293b', color: '#cbd5e1', border: '1px solid #334155',
    cursor: 'pointer', whiteSpace: 'nowrap',
  };
  const activeStyle: React.CSSProperties = {
    ...pillStyle, background: 'rgba(96,165,250,0.18)', color: '#93c5fd', borderColor: '#60a5fa',
  };

  return (
    <div style={{
      background: '#0f172a', color: '#e2e8f0',
      border: '1px solid #1e293b', borderRadius: 8,
      padding: 10, fontFamily: 'system-ui', fontSize: 13,
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search prompts, tags, filenames..."
          style={{
            flex: 1, padding: '7px 10px', borderRadius: 6,
            background: '#020617', color: '#e2e8f0',
            border: '1px solid #1e293b', fontSize: 13,
          }}
        />
        <select value={filters.sort ?? ''} onChange={e => setFilter('sort', e.target.value)} style={{
          padding: '7px 10px', borderRadius: 6, fontSize: 12,
          background: '#020617', color: '#e2e8f0',
          border: '1px solid #1e293b', cursor: 'pointer',
        }}>
          <option value="">Sort: newest</option>
          <option value="oldest">Oldest</option>
          <option value="largest">Largest</option>
          <option value="random">Random</option>
        </select>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: 4 }}>Model</span>
        {tags.models.map(m => (
          <button key={m} onClick={() => setFilter('model', filters.model === m ? '' : m)}
            style={filters.model === m ? activeStyle : pillStyle}>
            {m}
          </button>
        ))}
        <span style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 4px 0 10px' }}>Sampler</span>
        {tags.samplers.map(s => (
          <button key={s} onClick={() => setFilter('sampler', filters.sampler === s ? '' : s)}
            style={filters.sampler === s ? activeStyle : pillStyle}>
            {s}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: '#64748b' }}>
          {query ? `"${query}" ` : ''}{activeCount > 0 ? `+ ${activeCount} filter${activeCount > 1 ? 's' : ''}` : ''}
        </span>
      </div>
    </div>
  );
}
