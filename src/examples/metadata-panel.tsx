// Source: artifex/frontend/src/components/MetadataPanel.jsx (simplified)
import { useState } from 'react';

const sample = {
  prompt: "a moonlit forest, cinematic lighting, 8k, highly detailed, atmospheric fog",
  negative_prompt: "blurry, low quality, watermark, signature",
  model: "sd_xl_base_1.0.safetensors",
  sampler: "Euler a",
  steps: 32,
  cfg_scale: 7.5,
  seed: 4827193840,
  width: 1024,
  height: 1024,
  file_size: "3.2 MB",
  tags: ['landscape', 'forest', 'night', 'atmospheric', 'cinematic'],
};

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean; }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid #1e293b' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 12px', fontSize: 11,
        background: 'transparent', border: 'none', cursor: 'pointer',
        color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600,
      }}>
        <span style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 120ms', fontSize: 9 }}>▸</span>
        <span style={{ flex: 1, textAlign: 'left' }}>{title}</span>
      </button>
      {open && <div style={{ padding: '0 12px 12px 24px' }}>{children}</div>}
    </div>
  );
}

function KV({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 10, padding: '3px 0', fontSize: 12 }}>
      <span style={{ color: '#64748b', minWidth: 80 }}>{k}</span>
      <span style={{ color: '#e2e8f0', fontFamily: 'ui-monospace, monospace', fontSize: 11 }}>{v}</span>
    </div>
  );
}

export default function MetadataPanel() {
  return (
    <div style={{
      background: '#0f172a', color: '#e2e8f0',
      border: '1px solid #1e293b', borderRadius: 8,
      width: 320, overflow: 'hidden', fontFamily: 'system-ui', fontSize: 13,
    }}>
      <Section title="Prompt">
        <div style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.5 }}>{sample.prompt}</div>
        <div style={{ color: '#64748b', fontSize: 11, marginTop: 6, lineHeight: 1.5 }}>
          <span style={{ color: '#f87171' }}>negative:</span> {sample.negative_prompt}
        </div>
      </Section>
      <Section title="Params">
        <KV k="Model" v={sample.model} />
        <KV k="Sampler" v={sample.sampler} />
        <KV k="Steps" v={sample.steps} />
        <KV k="CFG" v={sample.cfg_scale} />
        <KV k="Seed" v={sample.seed} />
      </Section>
      <Section title="File" defaultOpen={false}>
        <KV k="Size" v={`${sample.width}×${sample.height}`} />
        <KV k="Bytes" v={sample.file_size} />
      </Section>
      <Section title="Tags">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {sample.tags.map(t => (
            <span key={t} style={{
              padding: '2px 7px', borderRadius: 999,
              background: 'rgba(96, 165, 250, 0.14)',
              color: '#93c5fd', fontSize: 11,
            }}>{t}</span>
          ))}
        </div>
      </Section>
    </div>
  );
}
