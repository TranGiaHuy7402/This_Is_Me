// src/components/Gallery.tsx
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type MediaType = "image" | "video";

type MediaObj = {
  id: string;
  src: string;
  name?: string;
  type: MediaType;
  description: string;
};

const VIDEO_EXTS = ["mp4", "webm", "ogg", "mov", "m4v"];

function getExtension(path: string) {
  const parts = path.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
}

function isVideo(path: string) {
  const ext = getExtension(path);
  return VIDEO_EXTS.includes(ext);
}

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [items, setItems] = useState<MediaObj[]>([]);

  // lightbox state: index of opened media
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    // load both images + videos from src/assets/media
    const modules = import.meta.glob("../assets/media/**/*.{png,jpg,jpeg,webp,svg,mp4,webm,ogg,mov,m4v}", {
      eager: true,
    }) as Record<string, any>;

    const entries = Object.entries(modules).map(([path, mod]) => {
      const src = (mod && (mod.default || mod)) || "";
      const parts = path.split("/");
      const filename = parts[parts.length - 1];
      const name = filename.replace(/\.[^/.]+$/, "");
      const type: MediaType = isVideo(filename) ? "video" : "image";
      return { path, src: String(src), name, type };
    });

    // sort by filename (optional) to keep stable order
    entries.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    // combine with descriptions from i18n (by index)
    const list: MediaObj[] = entries.map((e, idx) => {
      const i18nDesc = t.gallery.photos[idx]?.description || `Mô tả ${idx + 1}`;
      return {
        id: e.name || e.src,
        src: e.src,
        name: e.name,
        type: e.type,
        description: i18nDesc,
      };
    });

    setItems(list);
  }, [t]);

  // Lightbox handlers
  const openLightbox = (index: number) => setOpenIndex(index);
  const closeLightbox = () => setOpenIndex(null);
  const showPrev = () =>
    setOpenIndex((cur) => (cur === null ? null : (cur - 1 + items.length) % items.length));
  const showNext = () => setOpenIndex((cur) => (cur === null ? null : (cur + 1) % items.length));

  // keyboard handling for lightbox
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (openIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, items.length]);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-r from-[#FF6FD8] via-[#FF8C00] to-[#FFD700]" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
            {t.gallery.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.gallery.subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((media, index) => (
            <button
              key={media.id}
              onClick={() => openLightbox(index)}
              className={`group bg-background rounded-3xl overflow-hidden shadow-lg transition-all duration-700 border-2 border-border hover:border-primary hover:-translate-y-2 focus:outline-none ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
              aria-label={`Open media ${index + 1}`}
            >
              <div className="relative overflow-hidden aspect-[3/4] flex items-center justify-center bg-gray-50">
                {media.type === "image" ? (
                  <img
                    src={media.src}
                    alt={media.description || `media-${index + 1}`}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    style={{ display: "block" }}
                  />
                ) : (
                  // muted video preview (no sound) — plays a short loop as preview (if browser allows)
                  <video
                    src={media.src}
                    className="w-full h-full object-contain"
                    muted
                    playsInline
                    preload="metadata"
                    // autoplay may be blocked; try play on hover via JS if desired
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-6 space-y-3">
                {/* read-only description under the media */}
                <p className="text-foreground/80 leading-relaxed text-center">{media.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox modal (image OR video) */}
      {openIndex !== null && items[openIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Media lightbox"
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeLightbox}
            aria-hidden="true"
          />

          {/* content */}
          <div
            className="relative z-10 max-w-6xl mx-4 w-full rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* close */}
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-20 rounded-full bg-black/40 hover:bg-black/60 text-white p-2 focus:outline-none"
              aria-label="Close"
            >
              ✕
            </button>

            {/* prev / next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 text-white p-3 focus:outline-none"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 text-white p-3 focus:outline-none"
              aria-label="Next"
            >
              ›
            </button>

            {/* main display: center media only */}
            <div className="bg-transparent flex items-center justify-center p-6">
              {items[openIndex].type === "image" ? (
                <img
                  src={items[openIndex].src}
                  alt={items[openIndex].description || `media-${openIndex + 1}`}
                  className="max-h-[90vh] w-auto max-w-full object-contain rounded-md"
                  style={{ display: "block" }}
                />
              ) : (
                <video
                  src={items[openIndex].src}
                  controls
                  autoPlay
                  className="max-h-[90vh] w-auto max-w-full object-contain rounded-md bg-black"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
