import { BaseSyntheticEvent, forwardRef, ImgHTMLAttributes, useEffect, useState } from 'react';

import defaultThumbnail from '@shared/assets/images/default-thumbnail.svg';

type ImageSrc = string | null | undefined;

interface SharedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  'data-testid'?: string;
  fallbackSrc?: ImageSrc;
}

type Props = Omit<SharedImageProps, 'src'> & { src: ImageSrc };

const SharedImage = forwardRef<HTMLImageElement, Props>(
  ({ 'data-testid': dataTestId, fallbackSrc, src, ...rest }: Props, ref) => {
    const [imageSource, setImageSource] = useState<ImageSrc>(src);

    const fallbackImage = fallbackSrc || defaultThumbnail;

    useEffect(() => {
      setImageSource(src ? src : fallbackImage);
    }, [src]);

    const handleImageFallback = (event: BaseSyntheticEvent<Event>) => {
      if (event.type === 'error') {
        setImageSource(fallbackImage);
      }
    };

    return (
      <img
        ref={ref}
        data-testid={dataTestId}
        src={imageSource!}
        onError={handleImageFallback}
        {...rest}
      />
    );
  }
);

export default SharedImage;
