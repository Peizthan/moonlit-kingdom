'use client';

import { Plus, X } from 'lucide-react';

interface AddButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

export function AddButton({ label, onClick, className }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-widest rounded-sm transition-colors duration-200 ${className ?? ''}`}
      style={{
        border: '1px dashed rgba(176,141,87,0.4)',
        color: '#B08D57',
        background: 'rgba(176,141,87,0.05)',
      }}
    >
      <Plus size={12} />
      {label}
    </button>
  );
}

interface DeleteButtonProps {
  onClick: () => void;
  title?: string;
  confirmMessage?: string;
}

export function DeleteButton({ onClick, title = 'Eliminar', confirmMessage = '¿Eliminar este elemento?' }: DeleteButtonProps) {
  function handleClick() {
    if (window.confirm(confirmMessage)) onClick();
  }

  return (
    <button
      onClick={handleClick}
      title={title}
      type="button"
      className="flex items-center justify-center rounded-full flex-shrink-0 transition-colors duration-200"
      style={{
        width: '22px',
        height: '22px',
        color: '#8E8A86',
        border: '1px solid rgba(142,138,134,0.25)',
        background: 'rgba(78,31,45,0.08)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#D8C3A5';
        e.currentTarget.style.borderColor = 'rgba(78,31,45,0.6)';
        e.currentTarget.style.background = 'rgba(78,31,45,0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#8E8A86';
        e.currentTarget.style.borderColor = 'rgba(142,138,134,0.25)';
        e.currentTarget.style.background = 'rgba(78,31,45,0.08)';
      }}
    >
      <X size={12} />
    </button>
  );
}
