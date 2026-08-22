"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryItem } from "@/lib/projects";

export default function ProjectGallery({ gallery, title }: { gallery: GalleryItem[]; title: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const imageIndexes = gallery.reduce<number[]>((acc, item, i) => {
    if (item.type === "image") acc.push(i);
    return acc;
  }, []);

  function stepImage(direction: 1 | -1) {
    setOpenIndex((current) => {
      if (current === null) return current;
      const pos = imageIndexes.indexOf(current);
      const nextPos = (pos + direction + imageIndexes.length) % imageIndexes.length;
      return imageIndexes[nextPos];
    });
  }

  useEffect(() => {
    if (openIndex === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") stepImage(1);
      if (e.key === "ArrowLeft") stepImage(-1);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  const openItem = openIndex !== null ? gallery[openIndex] : null;

  return (
    <>
      {gallery.map((item, i) => (
        <div key={i}>
          {i > 0 && <div className="divider" />}
          <div
            className={`relative w-full overflow-hidden rounded-lg border border-slate-800 ${
              item.type === "video" ? "aspect-[16/9]" : "aspect-[16/10] cursor-zoom-in"
            }`}
            onClick={item.type === "image" ? () => setOpenIndex(i) : undefined}
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                poster={item.poster}
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.alt || title}
                fill
                className="object-cover border border-slate-700 rounded-lg"
                priority={i === 0}
              />
            )}
          </div>
          {item.caption && <p className="text-sm text-slate-400 mt-3">{item.caption}</p>}
        </div>
      ))}

      {openItem && openItem.type === "image" && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-10"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            className="absolute top-4 right-4 text-slate-300 hover:text-white"
            aria-label="關閉"
          >
            <X className="w-8 h-8" />
          </button>

          {imageIndexes.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  stepImage(-1);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                aria-label="上一張"
              >
                <ChevronLeft className="w-10 h-10" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  stepImage(1);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                aria-label="下一張"
              >
                <ChevronRight className="w-10 h-10" />
              </button>
            </>
          )}

          <div
            className="relative max-w-5xl w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={openItem.src}
              alt={openItem.alt || title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
