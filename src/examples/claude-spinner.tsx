// Source: kaleidoscope/src/demos/claude-spinner.tsx (Ink) -> browser port
import { useEffect, useState } from 'react';

const FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const VERBS = ['Thinking', 'Analyzing', 'Considering', 'Drafting', 'Crafting', 'Composing'];

export default function ClaudeSpinner({ frameMs = 80, verbMs = 1800 }: { frameMs?: number; verbMs?: number }) {
  const [frame, setFrame] = useState(0);
  const [verbIdx, setVerbIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFrame(f => (f + 1) % FRAMES.length), frameMs);
    return () => clearInterval(t);
  }, [frameMs]);

  useEffect(() => {
    const t = setInterval(() => setVerbIdx(v => (v + 1) % VERBS.length), verbMs);
    return () => clearInterval(t);
  }, [verbMs]);

  return (
    <div style={{
      padding: 16, background: '#0a0a0a', color: '#e2e8f0',
      borderRadius: 6, fontFamily: 'ui-monospace, Consolas, monospace',
      fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 10,
    }}>
      <span style={{ color: '#f59e0b', fontSize: 18 }}>{FRAMES[frame]}</span>
      <span style={{ color: '#94a3b8' }}>{VERBS[verbIdx]}...</span>
    </div>
  );
}
