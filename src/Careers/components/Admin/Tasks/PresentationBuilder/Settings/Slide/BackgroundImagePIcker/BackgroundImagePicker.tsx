import cx from 'classnames';
import { LegacyRef } from 'react';

import BackgroundImageUpload from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Slide/BackgroundImagePIcker/BackgroundImageUpload/BackgroundImageUpload';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as DeleteIcon } from '@shared/svg/delete_outlined.svg';

import styles from './BackgroundImagePicker.module.sass';

type Props = {
  forwardRef?: LegacyRef<HTMLInputElement>;
  onChangeComplete: (url: string) => void;
};

function BackgroundImagePicker({ forwardRef, onChangeComplete }: Props) {
  const { currentPresentation, currentSlide, handleSlideBackgroundImageArchive } =
    usePresentationBuilder();
  const images =
    currentPresentation?.slideBackgroundImages || currentSlide?.slideBackgroundImages || [];

  const backgroundImages = [
    {
      id: 'default-0',
      url: 'https://app.definedcareers.com/static/media/assessment_step_1_bg.0a8b08bf.svg',
    },
    {
      id: 'default-1',
      url: 'https://s3.amazonaws.com/media-p.slid.es/uploads/1485050/images/8083804/blue-slide-background-wide.jpg',
    },
    ...images,
  ];

  const backgroundImageWrapperClasses = (image: { id: string }) =>
    cx({
      [styles.defaultBackgroundImageWrapper]: !parseInt(image.id),
      [styles.uploadedBackgroundImageWrapper]: parseInt(image.id),
    });

  const backgroundImageClasses = (image: { url: string }) =>
    cx(styles.image, {
      [styles.imageIsSelected]: image.url === currentSlide?.backgroundImage,
    });

  return (
    <div ref={forwardRef} className={styles.backgroundImagePicker} data-testid='image-picker'>
      {backgroundImages.map((image) => (
        <div key={image.id} className={backgroundImageWrapperClasses(image)}>
          <img
            className={backgroundImageClasses(image)}
            data-testid='image-picker-item'
            src={image.url}
            title={image.url}
            onClick={() => onChangeComplete(image.url)}
          />
          <DeprecatedIconButton
            className={styles.archiveBackgroundImage}
            data-testid='archive-slide-background-image'
            icon={<DeleteIcon />}
            size='xs'
            onClick={() => handleSlideBackgroundImageArchive(image.id)}
          />
        </div>
      ))}
      <BackgroundImageUpload />
    </div>
  );
}

export default BackgroundImagePicker;
