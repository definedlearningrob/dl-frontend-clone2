import { BaseSyntheticEvent, useEffect } from 'react';

import type { TTaskPresentationImage } from '@dc/graphql/user/queries/taskPresentation';

type Props = {
  src?: string;
  setSrc: (src: string) => void;
  image?: TTaskPresentationImage;
};

function AdminTasksPresentationBuilderTemplateSharedImageFallbackHandler({
  src,
  setSrc,
  image,
}: Props) {
  useEffect(() => {
    setSrc(image?.thumbnailUrl || image?.url || '');
  }, [image]);

  const handleImageFallback = (event: BaseSyntheticEvent<Event>) => {
    if (event.type === 'error') {
      setSrc(image?.url || '');
    }
  };

  return src ? (
    <img alt='slide image' src={src} style={{ display: 'none' }} onError={handleImageFallback} />
  ) : null;
}

export default AdminTasksPresentationBuilderTemplateSharedImageFallbackHandler;
