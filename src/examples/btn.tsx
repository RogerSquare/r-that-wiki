// Source: cairn/ts/src/components/PhotoViewer.jsx, artifex/frontend/src/components/PhotoViewer.jsx
// Simplified for the wiki: removed app-specific styling variables, inlined the button classes.

import type { ReactNode, MouseEventHandler, ComponentPropsWithoutRef } from 'react';

interface BtnProps extends Omit<ComponentPropsWithoutRef<'button'>, 'onClick' | 'children'> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  children: ReactNode;
}

const base: React.CSSProperties = {
  padding: '6px',
  borderRadius: 6,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  transition: 'all 200ms',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 14,
};

export default function Btn({ onClick, active, children, ...props }: BtnProps) {
  return (
    <button
      onClick={onClick}
      style={{
        ...base,
        color: active ? 'white' : 'rgba(255,255,255,0.55)',
        background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; }}
      {...props}
    >
      {children}
    </button>
  );
}
