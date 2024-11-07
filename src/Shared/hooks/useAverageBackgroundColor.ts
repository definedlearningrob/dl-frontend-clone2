import { useEffect, useRef } from 'react';
import { FastAverageColor } from 'fast-average-color';

export const useAverageBackgroundColor = () => {
  const fastAverageColor = new FastAverageColor();

  const imageRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = imageRef.current;
    const wrapperElement = wrapperRef.current || node?.parentElement;

    if (!wrapperElement || !node) {
      return;
    }

    const canvasElement = document.createElement('canvas');

    wrapperElement.classList.add('relative');
    canvasElement.classList.add('absolute', 'top-0', 'left-0');

    wrapperElement?.appendChild(canvasElement);

    const canvasContext = canvasElement.getContext('2d');

    if (!canvasContext) {
      return;
    }

    fastAverageColor
      .getColorAsync(node, {
        algorithm: 'dominant',
        ignoredColor: [[0, 0, 0]],
      })
      .then((color) => {
        canvasElement.height = wrapperElement.offsetHeight;
        canvasElement.width = wrapperElement.offsetWidth;

        const gradient = canvasContext.createLinearGradient(0, 0, 0, wrapperElement.offsetWidth);

        const topColor = `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, 0.64)`;
        const bottomColor = `rgba(${color.value[0]}, ${color.value[1]}, ${color.value[2]}, 0.08)`;

        gradient.addColorStop(0, topColor);
        gradient.addColorStop(0.6, bottomColor);

        canvasContext.fillStyle = gradient;

        canvasContext.fillRect(0, 0, wrapperElement.clientWidth, wrapperElement.clientHeight);
      });
  }, []);

  return { imageRef, wrapperRef };
};
