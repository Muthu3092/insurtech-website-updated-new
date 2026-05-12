import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;
  
  const sizeClasses = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
    '4xl': 'sm:max-w-4xl',
  };
  
  return (
    <div className="elstar-modal-overlay" onClick={onClose}>
      <div 
        className={`elstar-modal ${sizeClasses[size]} animate-fade-in`} 
        onClick={e => e.stopPropagation()}
      >
        <div className="elstar-modal-header flex items-center justify-between">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button 
            type="button"
            onClick={onClose} 
            className="p-1 hover:bg-secondary rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
