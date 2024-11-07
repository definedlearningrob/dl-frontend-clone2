import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';

import type {
  TTaskPresentationImage,
  TTaskPresentationSlideContent,
} from '@dc/graphql/user/queries/taskPresentation';

import { ReactComponent as ImagePlaceholder } from '@shared/svg/image_placeholder.svg';

import ImageFallbackHandler from '../../Shared/ImageFallbackHandler/ImageFallbackHandler';

import styles from './Image.module.sass';

type Props = {
  imageContentId: string;
  content: TTaskPresentationSlideContent;
};

function AdminTasksPresentationBuilderTemplate4ProductChoiceNavImage({
  imageContentId,
  content,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [src, setSrc] = useState<string>();
  const image = content.images.find(
    (img: TTaskPresentationImage) => img.contentId === imageContentId
  );
  const classes = cx(styles.iconWrapper, 'presentation__image', {
    [styles.fill]: image?.style === 'fill',
    [styles.contain]: image?.style === 'contain',
    [styles.hiddenBackground]: image,
  });

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (wrapper && src) {
      wrapper.style.backgroundImage = `url(${src})`;
    }

    return () => {
      if (wrapper) {
        wrapper.style.backgroundImage = '';
      }
    };
  }, [src]);

  return (
    <div>
      <ImageFallbackHandler image={image} setSrc={setSrc} src={src} />
      <div className={styles.imageWrapper}>
        <div ref={wrapperRef} className={classes}>
          {!image && <ImagePlaceholder className={styles.icon} />}
        </div>
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplate4ProductChoiceNavImage;
