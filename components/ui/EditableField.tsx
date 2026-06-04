'use client';

import { useState, useEffect, KeyboardEvent, CSSProperties, ElementType } from 'react';
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
  background: 'rgba(176,141,87,0.06)',
  border: '1px solid rgba(176,141,87,0.4)',
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
  const [draft, setDraft] = useState<string | number>(current);

  // Sync draft when override changes (e.g. after reset)
  useEffect(() => {
    setDraft(getOverride(id, value));
  }, [id, value, getOverride]);

  function commit(val: string) {
    const committed = type === 'number' ? (parseFloat(val) || value) : val;
    setOverride(id, committed);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (e.key === 'Enter' && type !== 'textarea') {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
    if (e.key === 'Escape') {
      setDraft(getOverride(id, value));
      (e.target as HTMLElement).blur();
    }
  }

  if (!isEditMode) {
    return (
      <Tag className={className} style={style}>
        {String(current)}
      </Tag>
    );
  }

  const combinedStyle: CSSProperties = {
    ...editInputStyle,
    color: style?.color ?? '#D8C3A5',
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
