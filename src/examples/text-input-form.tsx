// Source: kaleidoscope/src/demos/text-input-form.tsx (Ink) -> web port
import { useRef, useState } from 'react';

interface Field {
  name: string;
  label: string;
  placeholder: string;
  type?: 'text' | 'email';
  validate?: (v: string) => string | null;
}

const fields: Field[] = [
  { name: 'name',  label: 'Name',   placeholder: 'Required', validate: v => !v ? 'required' : null },
  { name: 'email', label: 'Email',  placeholder: 'you@example.com', type: 'email',
    validate: v => !v ? 'required' : !/^[^@]+@[^@]+\.[^@]+$/.test(v) ? 'invalid email' : null },
  { name: 'bio',   label: 'Bio',    placeholder: '1-2 lines (optional)' },
];

export default function TextInputForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [focus, setFocus] = useState(0);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const errs = fields.map(f => f.validate?.(values[f.name] ?? '') ?? null);
  const allValid = errs.every(e => !e);

  return (
    <div style={{
      padding: 16, background: '#0a0a0a', color: '#e2e8f0',
      borderRadius: 6, fontFamily: 'ui-monospace, Consolas, monospace',
      fontSize: 13, width: 380, display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      {fields.map((f, i) => {
        const v = values[f.name] ?? '';
        const err = errs[i];
        const showErr = err && v.length > 0;
        return (
          <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <label style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {f.label}
            </label>
            <input
              ref={el => { refs.current[i] = el; }}
              value={v}
              onFocus={() => setFocus(i)}
              onChange={e => setValues(x => ({ ...x, [f.name]: e.target.value }))}
              onKeyDown={e => {
                if (e.key === 'Tab' && !e.shiftKey && i < fields.length - 1) {
                  e.preventDefault();
                  refs.current[i + 1]?.focus();
                }
              }}
              placeholder={f.placeholder}
              style={{
                padding: '6px 8px', background: '#020617', color: '#e2e8f0',
                border: `1px solid ${showErr ? '#f87171' : focus === i ? '#60a5fa' : '#334155'}`,
                borderRadius: 4, fontFamily: 'inherit', fontSize: 13, outline: 'none',
                transition: 'border-color 120ms',
              }}
            />
            <div style={{ fontSize: 10, color: showErr ? '#f87171' : '#64748b', height: 12 }}>
              {showErr ? err : ''}
            </div>
          </div>
        );
      })}
      <button disabled={!allValid} style={{
        padding: '6px 12px', borderRadius: 4, border: 'none',
        background: allValid ? '#60a5fa' : '#334155',
        color: allValid ? '#000' : '#64748b',
        cursor: allValid ? 'pointer' : 'default', fontSize: 12, fontWeight: 500,
        marginTop: 4, alignSelf: 'flex-start',
      }}>Submit</button>
    </div>
  );
}
