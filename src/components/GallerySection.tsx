'use client'

import { useState } from 'react'
import { Image as ImageIcon, X } from 'lucide-react'
import { galleryItems, GalleryItem } from '@/data/gallery'

const categoryColors: Record<string, string> = {
  verification: 'bg-accent/20 text-accent-bright border-accent/30',
  logs:         'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  setup:        'bg-amber-500/20 text-amber-400 border-amber-500/30',
  captcha:      'bg-purple-500/20 text-purple-400 border-purple-500/30',
  other:        'bg-text-muted/20 text-text-muted border-text-muted/30',
}

function PlaceholderImage({ item }: { item: GalleryItem }) {
  return (
    <div className="w-full aspect-video bg-elevated border border-border rounded-xl flex flex-col items-center justify-center gap-2 text-text-muted">
      <ImageIcon className="w-8 h-8 opacity-30" />
      <p className="text-xs font-body opacity-50">Screenshot coming soon</p>
    </div>
  )
}

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  return (
    <section id="gallery" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent-bright text-xs font-body font-medium mb-4">
            Gallery
          </span>
          <h2 className="font-display font-bold text-4xl text-text-primary mb-4">
            See MultiV in action
          </h2>
          <p className="text-text-secondary font-body max-w-lg mx-auto">
            Real screenshots from MultiV across different verification methods and features.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => item.image && setLightbox(item)}
              className={`group bg-card border border-border hover:border-primary/40 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${item.image ? 'cursor-pointer' : ''}`}
            >
              {item.image ? (
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-base/0 group-hover:bg-base/20 transition-colors" />
                </div>
              ) : (
                <div className="p-4"><PlaceholderImage item={item} /></div>
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-semibold text-text-primary text-sm">{item.title}</h3>
                  <span className={`shrink-0 text-[10px] font-body font-medium px-2 py-0.5 rounded-full border capitalize ${categoryColors[item.category]}`}>
                    {item.category}
                  </span>
                </div>
                <p className="text-xs font-body text-text-secondary leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-base/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-elevated border border-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.image!}
              alt={lightbox.title}
              className="w-full rounded-2xl border border-border shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="font-display font-semibold text-text-primary text-lg">{lightbox.title}</h3>
              <p className="text-text-secondary font-body text-sm mt-1">{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
