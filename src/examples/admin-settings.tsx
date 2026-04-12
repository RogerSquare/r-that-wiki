// Source: artifex/frontend/src/components/AdminSettings.jsx (simplified)

import { useState } from 'react';

type Tab = 'users' | 'jobs' | 'federation';

export default function AdminSettings() {
  const [tab, setTab] = useState<Tab>('users');

  return (
    <div style={{
      background: '#0f172a', color: '#e2e8f0',
      border: '1px solid #1e293b', borderRadius: 8,
      fontFamily: 'system-ui', fontSize: 13, overflow: 'hidden',
    }}>
      {/* Tabs */}
      <div style={{ display: 'flex', padding: '0 10px', borderBottom: '1px solid #1e293b' }}>
        {(['users', 'jobs', 'federation'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '12px 14px', background: 'transparent',
            border: 'none', cursor: 'pointer',
            color: tab === t ? '#60a5fa' : '#94a3b8',
            borderBottom: tab === t ? '2px solid #60a5fa' : '2px solid transparent',
            marginBottom: -1, fontSize: 12, fontWeight: 500,
            textTransform: 'capitalize',
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: 14 }}>
        {tab === 'users' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 140px', gap: 8, fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, padding: '6px 2px', borderBottom: '1px solid #1e293b' }}>
              <span>User</span><span>Role</span><span>Status</span><span>Actions</span>
            </div>
            {[{u:'RogerSquare', r:'admin', s:'active'}, {u:'guest-eve', r:'member', s:'active'}, {u:'spam-bot-04', r:'member', s:'disabled'}].map(u => (
              <div key={u.u} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 140px', gap: 8, padding: '8px 2px', fontSize: 12, borderBottom: '1px solid #1e293b', alignItems: 'center' }}>
                <span style={{ color: '#e2e8f0' }}>{u.u}</span>
                <span style={{ color: u.r === 'admin' ? '#fbbf24' : '#94a3b8' }}>{u.r}</span>
                <span style={{ color: u.s === 'active' ? '#10b981' : '#f87171' }}>{u.s}</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button style={btn}>Role</button>
                  <button style={btn}>Disable</button>
                  <button style={{ ...btn, color: '#f87171' }}>Purge</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === 'jobs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[{n:'Tag jobs', p:47, f:2, s:128}, {n:'Caption jobs', p:43, f:0, s:132}, {n:'NSFW jobs', p:45, f:0, s:130}].map(j => (
              <div key={j.n} style={{ padding: 10, background: '#020617', borderRadius: 6, border: '1px solid #1e293b' }}>
                <div style={{ fontWeight: 500, marginBottom: 6 }}>{j.n}</div>
                <div style={{ display: 'flex', gap: 14, fontSize: 11, color: '#94a3b8' }}>
                  <span>pending <span style={{ color: '#e2e8f0', fontFamily: 'ui-monospace, monospace' }}>{j.p}</span></span>
                  <span>failed <span style={{ color: '#f87171', fontFamily: 'ui-monospace, monospace' }}>{j.f}</span></span>
                  <span>done <span style={{ color: '#10b981', fontFamily: 'ui-monospace, monospace' }}>{j.s}</span></span>
                </div>
                <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                  <button style={btn}>Retry failed</button>
                  <button style={btn}>Cleanup</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === 'federation' && (
          <div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 10 }}>
              Peers your instance syncs with. <a href="#" style={{ color: '#60a5fa' }}>Add peer</a>
            </div>
            {[{u:'alice.example', s:'online', l:'2 min ago'}, {u:'bob.test',   s:'online',  l:'8 min ago'}, {u:'carol.home', s:'offline', l:'3 hours ago'}].map(p => (
              <div key={p.u} style={{ padding: '8px 10px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.s === 'online' ? '#10b981' : '#64748b' }} />
                <span style={{ flex: 1 }}>{p.u}</span>
                <span style={{ fontSize: 11, color: '#64748b' }}>last seen {p.l}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const btn: React.CSSProperties = {
  padding: '3px 8px', borderRadius: 4, fontSize: 11,
  background: 'transparent', color: '#94a3b8',
  border: '1px solid #334155', cursor: 'pointer',
};
