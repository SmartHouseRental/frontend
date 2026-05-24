import { useEffect, useState } from 'react';
import { PLACEHOLDER_IMAGE, resolveImageUrl } from '@/lib/resolveImageUrl';

/**
 * Image with resolved URL and fallback when src is missing or fails to load.
 */
export default function SafeImage({ src, alt = '', className, ...props }) {
  const resolved = resolveImageUrl(src) || PLACEHOLDER_IMAGE;
  const [currentSrc, setCurrentSrc] = useState(resolved);

  useEffect(() => {
    setCurrentSrc(resolveImageUrl(src) || PLACEHOLDER_IMAGE);
  }, [src]);

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (currentSrc !== PLACEHOLDER_IMAGE) {
          setCurrentSrc(PLACEHOLDER_IMAGE);
        }
      }}
    />
  );
}
