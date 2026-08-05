"use client";

import { useState } from "react";

type VideoPlayerProps = {
  videoUrl: string;
  thumbnailUrl?: string;
  fallbackImageSrc: string;
  fallbackImageAlt: string;
  title: string;
};

const resolveEmbedUrl = (url: string): string => {
  if (!url) return "";
  if (url.includes("youtube.com/embed/")) return url;
  const watchMatch = url.match(/youtube\.com\/watch\?(?:.*&)?v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1`;
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1`;
  return url;
};

export const VideoPlayer = ({
  videoUrl,
  thumbnailUrl,
  fallbackImageSrc,
  fallbackImageAlt,
  title,
}: VideoPlayerProps) => {
  const embedUrl = resolveEmbedUrl(videoUrl);
  const [playing, setPlaying] = useState(false);

  const posterSrc = thumbnailUrl || fallbackImageSrc;
  const posterAlt = thumbnailUrl ? title : fallbackImageAlt;

  if (!embedUrl) {
    return (
      <div className="accreditation-img-wrapper">
        <img src={posterSrc} alt={posterAlt} />
        <div className="accreditation-play">
          <span>&#9654;</span>
        </div>
      </div>
    );
  }

  if (playing) {
    return (
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      />
    );
  }

  return (
    <div
      className="accreditation-img-wrapper"
      onClick={() => setPlaying(true)}
      style={{ cursor: "pointer" }}
      role="button"
      aria-label={`Reproducir video: ${title}`}
    >
      <img src={posterSrc} alt={posterAlt} />
      <div className="accreditation-play">
        <span>&#9654;</span>
      </div>
    </div>
  );
};
