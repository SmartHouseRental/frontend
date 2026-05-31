import { useEffect, useRef, useState } from 'react';
import { useInView, motion } from 'framer-motion';

/**
 * Animated number counter — triggers when scrolled into view.
 */
export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
  label,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
  const isDecimal = String(value).includes('.');
  const hasPlus = String(value).includes('+');
  const hasM = String(value).toUpperCase().includes('M');
  const hasK = String(value).toUpperCase().includes('K');

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - (1 - progress) ** 3;
      start = numericValue * eased;
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, numericValue, duration]);

  const formatDisplay = () => {
    if (hasM) return `${prefix}${Math.round(display)}M${hasPlus ? '+' : ''}${suffix}`;
    if (hasK) return `${prefix}${Math.round(display)}K${hasPlus ? '+' : ''}${suffix}`;
    if (isDecimal) return `${prefix}${display.toFixed(1)}${suffix}`;
    return `${prefix}${Math.round(display)}${hasPlus ? '+' : ''}${suffix}`;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <p className="text-2xl font-bold tracking-tight tabular-nums md:text-3xl lg:text-4xl">
        {formatDisplay()}
      </p>
      {label && (
        <p className="mt-1 text-xs font-medium text-white/70 md:text-sm">{label}</p>
      )}
    </motion.div>
  );
}

export default AnimatedCounter;
