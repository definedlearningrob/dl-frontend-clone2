import cx from 'classnames';
import { useEffect, useRef } from 'react';

import type {
  TTaskPresentationImage,
  TTaskPresentationSlideContent,
} from '@dc/graphql/user/queries/taskPresentation';

import { ReactComponent as ImagePlaceholder } from '@shared/svg/image_placeholder.svg';

import styles from './Image.module.sass';

type Props = {
  imageContentId: string;
  content: TTaskPresentationSlideContent;
};

function AdminTasksPresentationBuilderTemplate2ProductChoicePreviewImage({
  imageContentId,
  content,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
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

    if (wrapper && image) {
      wrapper.style.backgroundImage = `url(${image.url})`;
    }

    return () => {
      if (wrapper) {
        wrapper.style.backgroundImage = '';
      }
    };
  }, [image]);

  return (
    <div>
      <div className={styles.imageWrapper}>
        <div ref={wrapperRef} className={classes}>
          {!image && <ImagePlaceholder className={styles.icon} />}
        </div>
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplate2ProductChoicePreviewImage;
