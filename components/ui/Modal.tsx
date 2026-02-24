'use client';

import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  children?: ReactNode;
  onClose: () => void;
};

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-950/90 border border-slate-800 px-6 py-5 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-100 transition-colors"
        >
          ×
        </button>
        {title ? (
          <h2 className="mb-3 text-lg font-semibold text-slate-100">
            {title}
          </h2>
        ) : null}
        <div className="text-sm text-slate-300">{children}</div>
      </div>
    </div>
  );
}

