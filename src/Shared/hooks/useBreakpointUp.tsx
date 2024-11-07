import { useLayoutEffect, useState } from 'react';
import { debounce } from 'lodash-es';

type Props = {
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';
};

//based on _variables.sass!
const breakpointMap = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
  xxxl: 1920,
};

export const useBreakpointUp = ({ breakpoint }: Props) => {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }

    const debouncedUpdateSize = debounce(updateSize, 750);

    window.addEventListener('resize', debouncedUpdateSize);

    return () => window.removeEventListener('resize', debouncedUpdateSize);
  }, []);

  return width !== 0
    ? width >= breakpointMap[breakpoint]
    : window.innerWidth >= breakpointMap[breakpoint];
};
