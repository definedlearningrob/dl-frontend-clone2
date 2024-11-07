import { RefObject, useEffect, useState } from 'react';

type Params = {
  ref: RefObject<HTMLElement>;
  isLoading?: boolean;
  mode?: 'single-line' | 'multi-line';
};

export const useIsTruncated = ({ ref, isLoading, mode = 'multi-line' }: Params) => {
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = ref?.current;

    if (!element) return;

    const observer = new ResizeObserver(() => {
      const shouldBeTruncated =
        mode === 'single-line'
          ? element.offsetWidth < element.scrollWidth + 1
          : element.scrollHeight > element.clientHeight + 1;

      setIsTruncated(shouldBeTruncated);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, isLoading]);

  return isTruncated;
};
