import cx from 'classnames';
import { useEffect, useRef } from 'react';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import { IMAGE_SLIDE_STYLE, IMAGE_SLIDE_POSITION } from '@dc/resources/constants';
import type { TTaskPresentationSlide } from '@dc/graphql/user/queries/taskPresentation';

import { ReactComponent as ImagePlaceholder } from '@shared/svg/image_placeholder.svg';
import ProgressBar from '@shared/components/ProgressBar/ProgressBar';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

import Links from '../../Shared/LinksSection/Editor/Editor';
import TextItem from '../../Shared/TextItem/Interactive/Interactive';

import styles from './Editor.module.sass';

type Props = {
  slide: TTaskPresentationSlide;
  handleSelectSlideContent: (object: { id: string; type: string } | null) => void;
  slides?: TTaskPresentationSlide[];
};

function AdminTasksPresentationBuilderTemplateImageTextEditor({
  slide: { content },
  handleSelectSlideContent,
}: Props) {
  const { selectedSlideContent, imagesUploading, dispatchOverflowingItems, imagePosition } =
    usePresentationBuilder();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const textsWrapper = useRef<HTMLDivElement | null>(null);

  const handleSelectImage = () => handleSelectSlideContent({ type: 'image', id: '1' });
  const isImageSelected =
    selectedSlideContent?.type === 'image' && selectedSlideContent?.id === '1';
  const image = content.images.find((img) => img.contentId === '1');
  const uploadingImage = imagesUploading.find(
    (img: { contentId: string; progress: number }) => img.contentId === '1'
  );

  const setTextOverflowing = (isOverflowing: boolean) =>
    dispatchOverflowingItems({
      type: 'SET_OVERFLOWING_ITEM',
      payload: { 2: isOverflowing },
    });

  const [header, description] = content.texts;
  const imagePositionLeft = image
    ? image.position === IMAGE_SLIDE_POSITION.LEFT
    : imagePosition === IMAGE_SLIDE_POSITION.LEFT;
  const imagePositionRight = image
    ? image.position === IMAGE_SLIDE_POSITION.RIGHT
    : imagePosition === IMAGE_SLIDE_POSITION.RIGHT;

  const containerClasses = cx(styles.imageTextContainer, {
    [styles.left]: imagePositionLeft,
    [styles.right]: imagePositionRight,
  });
  const iconWrapperClasses = cx(styles.iconWrapper, 'presentation__image', {
    [styles.fill]: image?.style === IMAGE_SLIDE_STYLE.FILL,
    [styles.contain]: image?.style === IMAGE_SLIDE_STYLE.CONTAIN,
    [styles.hiddenBackground]: image,
  });
  const imageWrapperClasses = cx(styles.imageWrapper, 'presentation__image__wrapper', {
    [styles.selectedContent]: isImageSelected,
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
      <div className={imageWrapperClasses}>
        <div ref={wrapperRef} className={iconWrapperClasses} onClick={handleSelectImage}>
          {!image && !uploadingImage && <ImagePlaceholder className={styles.icon} />}
          {!!uploadingImage && <SharedLoadingSpinner color='white' />}
        </div>
        {!!uploadingImage && (
          <div className={styles.progressWrapper}>
            <ProgressBar progress={uploadingImage.progress} />
          </div>
        )}
      </div>
      <div className={styles.contentWrapper}>
        <div className='titleContainer'>
          <TextItem handleSelectSlideContent={handleSelectSlideContent} item={header} />
        </div>
        <div ref={textsWrapper} className={styles.descriptionWrapper}>
          <TextItem
            handleSelectSlideContent={handleSelectSlideContent}
            item={description}
            percentageBreakpoint={100}
            wrapper={textsWrapper}
            onOverflowChange={setTextOverflowing}
          />
        </div>
        <div className={styles.links}>
          <Links handleSelectSlideContent={handleSelectSlideContent} links={content.links} />
        </div>
      </div>
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplateImageTextEditor;
