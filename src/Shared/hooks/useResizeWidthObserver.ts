import { useEffect, useState } from 'react';

export const useResizeWidthObserver = (ref: { current: HTMLElement | null }) => {
  const [widthObserver, setWidthObserver] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setWidthObserver(entries[0].contentRect.width);
    });

    if (ref.current) {
      observer.observe(ref.current);

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
        observer.disconnect();
      };
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return widthObserver;
};
