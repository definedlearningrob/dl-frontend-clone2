import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
};

export const AnimateHeight = ({ children, className, duration = 0.5 }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        // We only have one entry, so we can use entries[0].
        const observedHeight = entries[0].contentRect.height;
        setHeight(observedHeight);
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        // Cleanup the observer when the component is unmounted
        resizeObserver.disconnect();
      };
    }
  }, []);

  return (
    <motion.div
      animate={{ height }}
      className={classNames(className, 'overflow-hidden')}
      style={{ height }}
      transition={{ ease: 'easeOut', duration }}>
      <div ref={containerRef}>{children}</div>
    </motion.div>
  );
};
