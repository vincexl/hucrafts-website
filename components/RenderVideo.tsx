'use client';
import { useEffect, useRef } from 'react';

export default function RenderVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // Autoplay only when the user hasn't asked for reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    ref.current?.play().catch(() => {
      /* autoplay blocked — controls remain available */
    });
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      controls
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
