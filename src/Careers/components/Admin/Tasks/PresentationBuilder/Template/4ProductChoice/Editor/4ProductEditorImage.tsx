import cx from 'classnames';
import { useEffect, useRef } from 'react';

import type { TTaskPresentationImage } from '@dc/graphql/user/queries/taskPresentation';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import { ReactComponent as ImagePlaceholder } from '@shared/svg/image_placeholder.svg';
import ProgressBar from '@shared/components/ProgressBar/ProgressBar';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';

import styles from './Image.module.sass';

type Props = {
  handleSelectSlideContent: (object: { id: string; type: string } | null) => void;
  imageContentId: string;
};

function AdminTasksPresentationBuilderTemplate4ProductChoiceEditorImage({
  handleSelectSlideContent,
  imageContentId,
}: Props) {
  const { selectedSlideContent, imagesUploading, currentSlide } = usePresentationBuilder();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const image = currentSlide?.content.images.find(
    (img: TTaskPresentationImage) => img.contentId === imageContentId
  );
  const uploadingImage = imagesUploading.find(
    (img: { contentId: string; progress: number }) => img.contentId === imageContentId
  );

  const handleSelectImage = () => handleSelectSlideContent({ type: 'image', id: imageContentId });
  const isImageSelected =
    selectedSlideContent?.type === 'image' && selectedSlideContent?.id === imageContentId;

  const classes = cx(styles.iconWrapper, 'presentation__image', {
    [styles.fill]: image?.style === 'fill',
    [styles.contain]: image?.style === 'contain',
    [styles.hiddenBackground]: image,
  });
  const wrapperClasses = cx(styles.imageWrapper, {
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
    <div>
      <div className={wrapperClasses}>
        <div ref={wrapperRef} className={classes} onClick={handleSelectImage}>
          {!image && !uploadingImage && <ImagePlaceholder className={styles.icon} />}
          {!!uploadingImage && <SharedLoadingSpinner color='white' />}
        </div>
      </div>
      {!!uploadingImage && (
        <div className={styles.progressWrapper}>
          <ProgressBar progress={uploadingImage.progress} />
        </div>
      )}
    </div>
  );
}

export default AdminTasksPresentationBuilderTemplate4ProductChoiceEditorImage;
