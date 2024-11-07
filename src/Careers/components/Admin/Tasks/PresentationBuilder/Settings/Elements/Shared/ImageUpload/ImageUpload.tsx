import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';
import type { TTaskPresentationImageStyle } from '@dc/graphql/user/queries/taskPresentation';
import { IMAGE_SLIDE_STYLE, IMAGE_SLIDE_POSITION } from '@dc/resources/constants';

import { ReactComponent as ImagePlaceholder } from '@shared/svg/image_placeholder.svg';
import DropableArea from '@shared/components/DropableArea/DropableArea';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';

import styles from './ImageUpload.module.sass';

type Props = {
  contentId: string;
  showImagePositionActions?: boolean;
};

// Image index is for multiple choice slide when there will be more than one image inputs in one slide
function AdminTasksPresentationBuilderSettingsElementsImageUpload({
  contentId,
  showImagePositionActions = false,
}: Props) {
  const { t } = useTranslation();
  const {
    currentSlide,
    handleImagePosition,
    handleImageStyleUpdate,
    handleImageUpload,
    handleSlideImageArchive,
    imagePosition,
    imagesUploading,
    setImagePosition,
  } = usePresentationBuilder();
  const image = currentSlide?.content.images.find(
    ({ contentId: cId }: { contentId: string }) => cId === contentId
  );
  const savingImage = imagesUploading.find(
    (img: { contentId: string; progress: number }) => img.contentId === contentId
  );

  const [imageStyle, setImageStyle] = useState<TTaskPresentationImageStyle>(
    image?.style || (IMAGE_SLIDE_STYLE.FILL as TTaskPresentationImageStyle)
  );
  const containImageStyleSelected = image
    ? image.style === IMAGE_SLIDE_STYLE.CONTAIN
    : imageStyle === IMAGE_SLIDE_STYLE.CONTAIN;
  const fillImageStyleSelected = image
    ? image.style === IMAGE_SLIDE_STYLE.FILL
    : imageStyle === IMAGE_SLIDE_STYLE.FILL;
  const imagePositionLeft = image
    ? image.position === IMAGE_SLIDE_POSITION.LEFT
    : imagePosition === IMAGE_SLIDE_POSITION.LEFT;
  const imagePositionCenter = image
    ? image.position === IMAGE_SLIDE_POSITION.CENTER
    : imagePosition === IMAGE_SLIDE_POSITION.CENTER;
  const imagePositionRight = image
    ? image.position === IMAGE_SLIDE_POSITION.RIGHT
    : imagePosition === IMAGE_SLIDE_POSITION.RIGHT;

  const handleSetImagePosition = async (position: string) => {
    if (image) {
      await handleImagePosition(image.id, position);
    } else setImagePosition(position);
  };

  const setContainImageStyle = async () => {
    if (image) {
      await handleImageStyleUpdate(image, IMAGE_SLIDE_STYLE.CONTAIN as TTaskPresentationImageStyle);
    }

    setImageStyle('contain');
  };

  const setFillImageStyle = async () => {
    if (image) {
      await handleImageStyleUpdate(image, IMAGE_SLIDE_STYLE.FILL as TTaskPresentationImageStyle);
    }

    setImageStyle('fill');
  };

  const onClearImage = async () => {
    if (image) {
      await handleSlideImageArchive(image.id);

      setImagePosition(IMAGE_SLIDE_POSITION.RIGHT);
    }
  };

  const onDrop = async (files: File[]) => {
    const [file] = files;

    if (image) {
      await handleSlideImageArchive(image.id);
    }

    if (file) {
      await handleImageUpload(file, imageStyle, contentId);
    }
  };

  const InputLabel = () => (
    <span className={styles.label}>
      <SharedIcon className={styles.icon} icon={<ImagePlaceholder />} size='xs' />
      <span>{t('admin.tasks.presentation.imageLabel')}</span>
    </span>
  );

  const fillButtonClasses = cx(styles.button, {
    [styles.selected]: fillImageStyleSelected,
  });
  const containButtonClasses = cx(styles.button, {
    [styles.selected]: containImageStyleSelected,
  });
  const leftButtonClasses = cx(styles.button, {
    [styles.selected]: imagePositionLeft,
  });
  const centerButtonClasses = cx(styles.button, {
    [styles.selected]: imagePositionCenter,
  });
  const rightButtonClasses = cx(styles.button, {
    [styles.selected]: imagePositionRight,
  });

  return (
    <section className='mb-base'>
      <DropableArea
        accept='image/*'
        assetType='image'
        isLoading={!!savingImage}
        label={<InputLabel />}
        multiple={false}
        previewStyle={imageStyle}
        previewUrl={image?.url}
        progress={savingImage?.progress}
        //@ts-ignore don't wan't to touch it :grimacing:
        value={image ? [image] : []}
        withPreview={true}
        onClear={onClearImage}
        onDrop={onDrop}
      />
      <span className={styles.styleLabel}>{t('admin.tasks.presentation.imageStyleLabel')}</span>
      <div className={styles.styleButtons}>
        <SharedButton
          className={fillButtonClasses}
          size='sm'
          variant='primary-outlined'
          onClick={setFillImageStyle}>
          {t('admin.tasks.presentation.fill')}
        </SharedButton>
        <SharedButton
          className={containButtonClasses}
          variant='primary-outlined'
          onClick={setContainImageStyle}>
          {t('admin.tasks.presentation.contain')}
        </SharedButton>
      </div>
      {showImagePositionActions && (
        <>
          <span className={styles.positionLabel}>
            {t('admin.tasks.presentation.imagePositionLabel')}
          </span>
          <div className={styles.positionButtons}>
            <SharedButton
              className={rightButtonClasses}
              variant='primary-outlined'
              onClick={() => handleSetImagePosition(IMAGE_SLIDE_POSITION.RIGHT)}>
              {t('admin.tasks.presentation.right')}
            </SharedButton>
            {image && (
              <>
                <SharedButton
                  className={leftButtonClasses}
                  variant='primary-outlined'
                  onClick={() => handleSetImagePosition(IMAGE_SLIDE_POSITION.LEFT)}>
                  {t('admin.tasks.presentation.left')}
                </SharedButton>
                <SharedButton
                  className={centerButtonClasses}
                  variant='primary-outlined'
                  onClick={() => handleSetImagePosition(IMAGE_SLIDE_POSITION.CENTER)}>
                  {t('admin.tasks.presentation.center')}
                </SharedButton>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
}

export default AdminTasksPresentationBuilderSettingsElementsImageUpload;
