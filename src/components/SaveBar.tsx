'use client'

import { Save, X } from 'lucide-react'

interface SaveBarProps {
  onSave: () => void
  onDiscard: () => void
  saving?: boolean
}

export default function SaveBar({ onSave, onDiscard, saving }: SaveBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-elevated/95 backdrop-blur-xl border-t border-primary/30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <p className="text-sm font-body font-medium text-text-secondary">
              You have unsaved changes
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onDiscard}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-body font-medium text-text-secondary hover:text-text-primary hover:bg-card border border-border transition-all disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              Discard
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-body font-semibold bg-primary hover:bg-primary-hover text-white transition-all shadow-lg shadow-primary/25 disabled:opacity-50"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
