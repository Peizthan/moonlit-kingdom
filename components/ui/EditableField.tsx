'use client';

import { useState, useRef, KeyboardEvent, CSSProperties, ElementType } from 'react';
import { useAdmin } from '@/lib/AdminContext';

interface EditableFieldProps {
  /** Unique key used to store/retrieve the override */
  id: string;
  /** Default value from static data */
  value: string | number;
  /** 'text' renders an <input>, 'textarea' renders a <textarea> */
  type?: 'text' | 'textarea' | 'number';
  /** Wrapper element rendered in view mode */
  tag?: ElementType;
  className?: string;
  style?: CSSProperties;
}

const editInputStyle: CSSProperties = {
  background: 'rgb(var(--tone-line)/0.06)',
  border: '1px solid rgb(var(--tone-line)/0.4)',
  borderRadius: '2px',
  padding: '2px 6px',
  outline: 'none',
  width: '100%',
  minWidth: 0,
};

export function EditableField({
  id,
  value,
  type = 'text',
  tag: Tag = 'span',
  className,
  style,
}: EditableFieldProps) {
  const { isEditMode, getOverride, setOverride } = useAdmin();
  const current = getOverride(id, value);
  if (!isEditMode) {
    return (
      <Tag className={className} style={style}>
        {String(current)}
      </Tag>
    );
  }

  return <FieldEditor key={`${id}:${String(current)}`} id={id} current={current} value={value} type={type} className={className} style={style} setOverride={setOverride} />;
}

function FieldEditor({ id, current, value, type, className, style, setOverride }: {
  id: string; current: string | number; value: string | number;
  type: NonNullable<EditableFieldProps['type']>;
  className?: string; style?: CSSProperties;
  setOverride: (id: string, value: string | number) => void;
}) {
  const [draft, setDraft] = useState(current);
  const cancelled = useRef(false);
  function commit(val: string) {
    if (cancelled.current) { cancelled.current = false; return; }
    const numeric = Number.parseFloat(val);
    setOverride(id, type === 'number' ? (Number.isFinite(numeric) ? numeric : value) : val);
  }
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (event.key === 'Enter' && type !== 'textarea') {
      event.preventDefault(); event.currentTarget.blur();
    }
    if (event.key === 'Escape') {
      cancelled.current = true; setDraft(current); event.currentTarget.blur();
    }
  }
  const combinedStyle: CSSProperties = {
    ...editInputStyle,
    color: style?.color ?? 'var(--tone-fg)',
    fontSize: style?.fontSize ?? 'inherit',
    fontFamily: style?.fontFamily ?? 'inherit',
  };

  if (type === 'textarea') {
    return (
      <textarea
        className={className}
        style={{ ...combinedStyle, resize: 'vertical', minHeight: '3em' }}
        value={String(draft)}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={(e) => commit(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    );
  }

  return (
    <input
      type={type === 'number' ? 'number' : 'text'}
      className={className}
      style={combinedStyle}
      value={String(draft)}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={(e) => commit(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
