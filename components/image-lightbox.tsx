"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { BilingualText } from "@/components/bilingual-text";

type LightboxImage = {
  src: string;
  captionEn: string;
  captionZh: string;
};

/**
 * One site-wide image viewer. Any `<a data-lightbox href="/uploads/...">` opens
 * here instead of navigating to the bare file, so readers stay on the page.
 * Clicking outside the image, pressing Escape or the close button dismisses it.
 * Modified clicks (new tab, download) keep the browser's default behaviour.
 */
export function ImageLightbox() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [image, setImage] = useState<LightboxImage | null>(null);

  const resetViewer = useCallback(() => {
    if (!document.documentElement.classList.contains("lightbox-open")) {
      return;
    }

    document.documentElement.classList.remove("lightbox-open");
    setImage(null);
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

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[data-lightbox]");
      const src = link?.getAttribute("href");

      if (!link || !src) {
        return;
      }

      event.preventDefault();
      openerRef.current = link;
      const captionEn = link.dataset.captionEn ?? "";
      setImage({ src, captionEn, captionZh: link.dataset.captionZh || captionEn });
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

    if (image && dialog && !dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add("lightbox-open");
    }
  }, [image]);

  function handleDialogClick(event: React.MouseEvent<HTMLDialogElement>) {
    const target = event.target as HTMLElement;

    if (target === event.currentTarget || target.classList.contains("lightbox-stage")) {
      closeViewer();
    }
  }

  return (
    <dialog ref={dialogRef} className="lightbox" aria-label="Image viewer" onClick={handleDialogClick}>
      {image ? (
        <>
          <div className="lightbox-stage">
            {/* The original upload is shown as-is; next/image would need fixed dimensions here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt={image.captionEn} className="lightbox-image" />
          </div>
          <div className="lightbox-bar">
            {image.captionEn ? (
              <p className="lightbox-caption">
                <BilingualText en={image.captionEn} zh={image.captionZh} />
              </p>
            ) : (
              <span />
            )}
            <div className="lightbox-actions">
              <a href={image.src} target="_blank" rel="noreferrer" className="lightbox-action">
                <BilingualText en="Original" zh="原图" />
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <button type="button" onClick={closeViewer} className="lightbox-action" aria-label="Close image">
                <X size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </dialog>
  );
}
