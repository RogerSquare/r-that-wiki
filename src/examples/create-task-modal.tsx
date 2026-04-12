// Source: atrium/frontend/src/components/CreateTaskModal.jsx (simplified)
import { useState, useMemo } from 'react';

const categories = ['feat', 'bug', 'comp', 'ui', 'opt', 'devops', 'mobile'];
const priorities = ['low', 'medium', 'high'];

function suggestId(category: string, title: string) {
  const slug = (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .join('-')
    .slice(0, 16);
  return slug ? `${category}-${slug}-001` : `${category}-----001`;
}

export default function CreateTaskModal() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('feat');
  const [priority, setPriority] = useState('medium');
  const [project, setProject] = useState('atb');
  const [tagsStr, setTagsStr] = useState('');
  const suggested = useMemo(() => suggestId(category, title), [category, title]);

  return (
    <div style={{
      background: '#1e293b', color: '#e2e8f0',
      borderRadius: 10, border: '1px solid #334155',
      width: '100%', maxWidth: 460, padding: 18,
      fontSize: 13, fontFamily: 'system-ui',
    }}>
      <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 14 }}>New task</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Field label="Title">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Short, actionable"
            style={inputStyle}
          />
        </Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Field label="Category">
            <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Priority">
            <select value={priority} onChange={e => setPriority(e.target.value)} style={inputStyle}>
              {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Project">
          <select value={project} onChange={e => setProject(e.target.value)} style={inputStyle}>
            <option value="root">Unassigned</option>
            <option value="atb">Atrium (atb)</option>
            <option value="portfolio">Cairn (portfolio)</option>
            <option value="artifex">Artifex (artifex)</option>
          </select>
        </Field>
        <Field label="Tags (comma separated)">
          <input
            value={tagsStr}
            onChange={e => setTagsStr(e.target.value)}
            placeholder="react, auth, jwt"
            style={inputStyle}
          />
        </Field>
        <div style={{
          padding: '8px 10px', borderRadius: 6,
          background: '#0f172a', border: '1px solid #334155',
          display: 'flex', alignItems: 'center', gap: 8, fontSize: 11,
        }}>
          <span style={{ color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Suggested id</span>
          <span style={{ fontFamily: 'ui-monospace, monospace', color: '#60a5fa' }}>{suggested}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, marginTop: 4 }}>
          <button style={{ ...btn, background: 'transparent', color: '#94a3b8', border: '1px solid #334155' }}>Cancel</button>
          <button style={{ ...btn, background: '#60a5fa', color: '#000' }}>Create</button>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '7px 9px', borderRadius: 6,
  background: '#0f172a', color: '#e2e8f0',
  border: '1px solid #334155', fontSize: 13, fontFamily: 'inherit',
};

const btn: React.CSSProperties = {
  padding: '6px 14px', borderRadius: 6, border: 'none',
  fontSize: 12, fontWeight: 500, cursor: 'pointer',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{
        fontSize: 10, color: '#94a3b8', textTransform: 'uppercase',
        letterSpacing: '0.06em', fontWeight: 600, marginBottom: 4,
      }}>{label}</div>
      {children}
    </div>
  );
}
