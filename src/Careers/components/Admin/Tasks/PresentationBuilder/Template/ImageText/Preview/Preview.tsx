import cx from 'classnames';
import { useEffect, useRef } from 'react';

import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';
import { IMAGE_SLIDE_STYLE, IMAGE_SLIDE_POSITION } from '@dc/resources/constants';

import { ReactComponent as ImagePlaceholder } from '@shared/svg/image_placeholder.svg';

import Links from '../../Shared/LinksSection/Preview/Preview';
import TextItem from '../../Shared/TextItem/Basic/Basic';

import styles from './Preview.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent?: (object: { id: string; type: string }) => void;
  slides: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplateImageTextPreview({
  slide: { content },
  slides,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [header, description] = content.texts;

  const image = content.images.find((img) => img.contentId === '1');

  const containerClasses = cx(styles.imageTextContainer, {
    [styles.left]: image && image.position === IMAGE_SLIDE_POSITION.LEFT,
    [styles.right]: !image || (image && image.position === IMAGE_SLIDE_POSITION.RIGHT),
  });

  const classes = cx(styles.iconWrapper, 'presentation__image', {
    [styles.fill]: image?.style === IMAGE_SLIDE_STYLE.FILL,
    [styles.contain]: image?.style === IMAGE_SLIDE_STYLE.CONTAIN,
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
    <div className={containerClasses}>
      <div className={styles.imageWrapper}>
        <div ref={wrapperRef} className={classes}>
          {!image && <ImagePlaceholder className={styles.icon} />}
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className='titleContainer'>
          <TextItem item={header} />
        </div>
        <div className={styles.descriptionWrapper}>
          <TextItem item={description} />
        </div>
        <div className={styles.links}>
          <Links links={content.links} slides={slides} />
        </div>
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplateImageTextPreview;
