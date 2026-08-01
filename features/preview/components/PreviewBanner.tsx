"use client";

import { usePathname } from "next/navigation";

export const PreviewBanner = () => {
  const pathname = usePathname();

  const handleExit = () => {
    window.location.href = `/api/preview/exit?returnTo=${encodeURIComponent(pathname)}`;
  };

  return (
    <div className="preview-banner" role="status" aria-live="polite">
      <span className="preview-banner-text">
        <span className="preview-banner-dot" aria-hidden="true" />
        Modo vista previa activo — estás viendo contenido no publicado
      </span>
      <button className="preview-banner-btn" onClick={handleExit} type="button">
        Salir del preview
      </button>
    </div>
  );
};
