import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import { IMAGE_SLIDE_STYLE, IMAGE_SLIDE_POSITION } from '@dc/resources/constants';
import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import { ReactComponent as ImagePlaceholder } from '@shared/svg/image_placeholder.svg';

import Links from '../../Shared/LinksSection/Nav/Nav';
import TextItem from '../../Shared/TextItem/Basic/Basic';
import ImageFallbackHandler from '../../Shared/ImageFallbackHandler/ImageFallbackHandler';

import styles from './Nav.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent?: (object: { id: string; type: string }) => void;
  slides?: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplateImageTextNav({ slide: { content } }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { imagePosition } = usePresentationBuilder();
  const [src, setSrc] = useState<string>();
  const [header, description] = content.texts;

  const image = content.images.find((img) => img.contentId === '1');

  const containerClasses = cx(styles.imageTextContainer, {
    [styles.left]: image
      ? image.position === IMAGE_SLIDE_POSITION.LEFT
      : imagePosition === IMAGE_SLIDE_POSITION.LEFT,
    [styles.right]: image
      ? image.position === IMAGE_SLIDE_POSITION.RIGHT
      : imagePosition === IMAGE_SLIDE_POSITION.RIGHT,
  });

  const classes = cx(styles.iconWrapper, 'presentation__image', {
    [styles.fill]: image?.style === IMAGE_SLIDE_STYLE.FILL,
    [styles.contain]: image?.style === IMAGE_SLIDE_STYLE.CONTAIN,
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
    <div className={containerClasses}>
      <ImageFallbackHandler image={image} setSrc={setSrc} src={src} />
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
          <Links links={content.links} />
        </div>
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplateImageTextNav;
