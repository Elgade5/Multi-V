'use client'

import { ToastMessage } from '@/types'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const icons = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
  error:   <AlertCircle  className="w-5 h-5 text-red-400" />,
  info:    <Info         className="w-5 h-5 text-accent" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-400" />,
}

const borders = {
  success: 'border-l-emerald-500',
  error:   'border-l-red-500',
  info:    'border-l-accent',
  warning: 'border-l-amber-500',
}

export default function Toast({ toast, onClose }: { toast: ToastMessage; onClose: () => void }) {
  return (
    <div
      className={`pointer-events-auto animate-slide-in-right bg-elevated border border-border border-l-4 ${borders[toast.type]} rounded-xl shadow-2xl p-4 flex items-start gap-3`}
    >
      <span className="mt-0.5 shrink-0">{icons[toast.type]}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary font-body">{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-text-secondary mt-0.5">{toast.message}</p>
        )}
      </div>
      <button onClick={onClose} className="shrink-0 text-text-muted hover:text-text-primary transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
