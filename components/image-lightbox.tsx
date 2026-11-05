"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Maximize2, Minimize2, X } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";

type LightboxItem = {
  src: string;
  kind: "image" | "video";
  captionEn: string;
  captionZh: string;
};

const videoPattern = /\.(mp4|webm|mov)$/i;

/**
 * One site-wide media viewer. Any `<a data-lightbox href="/uploads/...">` opens
 * here instead of navigating to the bare file, so readers stay on the page.
 * Videos (`data-lightbox="video"`, or any link to a video under /uploads/) play
 * in place.
 * Images open fitted to the screen; clicking the image or the zoom button
 * shows it at full size in a scrollable stage, and clicking again fits it.
 * Clicking outside the media, pressing Escape or the close button dismisses it.
 * Modified clicks (new tab, download) keep the browser's default behaviour.
 */
export function ImageLightbox() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [item, setItem] = useState<LightboxItem | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const resetViewer = useCallback(() => {
    if (!document.documentElement.classList.contains("lightbox-open")) {
      return;
    }

    document.documentElement.classList.remove("lightbox-open");
    setItem(null);
    setZoomed(false);
    openerRef.current?.focus({ preventScroll: true });
  }, []);

  const closeViewer = useCallback(() => {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
    }

    resetViewer();
  }, [resetViewer]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      const src = link?.getAttribute("href");

      if (!link || !src || link.closest(".lightbox")) {
        return;
      }

      // Plain links to uploaded videos (body text, the demo link) open here too,
      // instead of sending the reader to the bare file.
      const uploadedVideo = src.startsWith("/uploads/") && videoPattern.test(src);

      if (!link.hasAttribute("data-lightbox") && !uploadedVideo) {
        return;
      }

      event.preventDefault();
      openerRef.current = link;
      const captionEn = link.dataset.captionEn ?? "";
      const kind = link.dataset.lightbox === "video" || videoPattern.test(src) ? "video" : "image";
      setZoomed(false);
      setItem({ src, kind, captionEn, captionZh: link.dataset.captionZh || captionEn });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    // Escape fires `cancel`; route it through the same cleanup as every other close.
    function handleCancel(event: Event) {
      event.preventDefault();
      closeViewer();
    }

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("close", resetViewer);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("close", resetViewer);
    };
  }, [closeViewer, resetViewer]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (item && dialog && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add("lightbox-open");
    }
  }, [item]);

  function handleDialogClick(event: React.MouseEvent<HTMLDialogElement>) {
    const target = event.target as HTMLElement;

    if (target === event.currentTarget || target.classList.contains("lightbox-stage")) {
      closeViewer();
    }
  }

  const isImage = item?.kind === "image";

  return (
    <dialog ref={dialogRef} className="lightbox" aria-label="Media viewer" onClick={handleDialogClick}>
      {item ? (
        <>
          <div className={zoomed ? "lightbox-stage is-zoomed" : "lightbox-stage"}>
            {isImage ? (
              <>
                {/* The original upload is shown as-is; next/image would need fixed dimensions here. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.captionEn}
                  className="lightbox-image"
                  onClick={() => setZoomed((value) => !value)}
                />
              </>
            ) : (
              <video
                key={item.src}
                src={item.src}
                className="lightbox-video"
                controls
                autoPlay
                playsInline
                preload="metadata"
              />
            )}
          </div>
          <div className="lightbox-bar">
            {item.captionEn ? (
              <p className="lightbox-caption">
                <BilingualText en={item.captionEn} zh={item.captionZh} />
              </p>
            ) : (
              <span />
            )}
            <div className="lightbox-actions">
              {isImage ? (
                <button
                  type="button"
                  onClick={() => setZoomed((value) => !value)}
                  className="lightbox-action"
                  aria-pressed={zoomed}
                  aria-label={zoomed ? "Fit image to screen" : "Show image at full size"}
                >
                  {zoomed ? <Minimize2 size={16} aria-hidden="true" /> : <Maximize2 size={16} aria-hidden="true" />}
                  {zoomed ? <BilingualText en="Fit" zh="适应屏幕" /> : <BilingualText en="Full size" zh="原始大小" />}
                </button>
              ) : null}
              <a href={item.src} target="_blank" rel="noreferrer" className="lightbox-action">
                <BilingualText en="Original" zh="原文件" />
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <button type="button" onClick={closeViewer} className="lightbox-action" aria-label="Close viewer">
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </dialog>
  );
}
