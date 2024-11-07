import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BackgroundImagePicker from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Slide/BackgroundImagePIcker/BackgroundImagePicker';
import SlideNameInput from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Slide/SlideNameInput/SlideNameInput';
import usePresentationBuilder from '@dc/hooks/usePresentationBuilder';

import themeSettings from '@shared/components/Presentations/Themes/Themes';

import EditOverlay from '../EditOverlay/EditOverlay';

AdminTasksPresentationBuilderSettingsSlideSettings.propTypes = {
  editionDisabled: PropTypes.bool,
};

function AdminTasksPresentationBuilderSettingsSlideSettings({ editionDisabled }) {
  const { t } = useTranslation();
  const { currentSlide, currentPresentation, handleUpdateSlide, taskId } = usePresentationBuilder();
  const imageIconRef = useRef(null);
  const imagePickerRef = useRef(null);
  const imageRef = useRef(null);
  const sketchIconRef = useRef(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBackgroundImagePicker, setShowBackgroundImagePicker] = useState(false);
  const [color, setColor] = useState(null);
  const themeDefaultSlideBackground = themeSettings.backgrounds[currentPresentation?.typography];

  const defaultSlideBackgroundImage =
    themeDefaultSlideBackground ||
    'https://app.definedcareers.com/static/media/assessment_step_1_bg.0a8b08bf.svg';
  const currentSlideBackgroundImage = currentSlide?.backgroundImage;

  const handleClickOutsideSketchPicker = (event) => {
    if (sketchIconRef.current && !sketchIconRef.current.contains(event.target)) {
      setShowColorPicker(false);
    }

    if (
      imageIconRef.current &&
      !imageIconRef.current.contains(event.target) &&
      imagePickerRef.current &&
      !imagePickerRef.current.contains(event.target)
    ) {
      setShowBackgroundImagePicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideSketchPicker, true);

    return () => {
      document.removeEventListener('click', handleClickOutsideSketchPicker, true);
    };
  }, []);

  if (!currentSlide) {
    const placeholder = taskId
      ? t('admin.tasks.presentation.noSlideInCurrentPresentation')
      : t('admin.tasks.presentation.noSlideInSlideLibrary');

    return <p>{placeholder}</p>;
  }

  useEffect(() => {
    if (currentSlide && currentSlide.backgroundColor !== color) {
      setColor(currentSlide.backgroundColor);
    }
  }, [currentSlide?.id]);

  useEffect(() => {
    const wrapper = imageRef.current;

    if (wrapper && currentSlideBackgroundImage) {
      wrapper.style.backgroundImage = `url(${currentSlideBackgroundImage})`;
    } else {
      wrapper.style.backgroundImage = `url(${defaultSlideBackgroundImage})`;
    }

    return () => {
      if (wrapper) {
        wrapper.style.backgroundImage = '';
      }
    };
  }, [currentSlideBackgroundImage]);

  const handleShowColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleShowBackgroundImagePicker = () => {
    setShowBackgroundImagePicker(!showBackgroundImagePicker);
  };

  const handleOnChangeComplete = (hex, url) => {
    handleUpdateSlide(null, { backgroundColor: hex ?? '#F0F2F7', backgroundImage: url });
  };

  return (
    <div className='animate-fadeDropIn'>
      {editionDisabled && <EditOverlay />}
      <SlideNameInput currentSlide={currentSlide} />
      <p className='mt-sm text-xs xxxl:text-sm'>{t('admin.tasks.presentation.backgroundStyle')}</p>
      <div className='background-styles-wrapper'>
        <div ref={sketchIconRef} className='background-color-wrapper'>
          <div className='background-color-wrapper__action-border' onClick={handleShowColorPicker}>
            <div className='background-color-wrapper__action-border__body' />
          </div>
          {showColorPicker && (
            <SketchPicker
              color={color}
              disableAlpha={true}
              onChange={setColor}
              onChangeComplete={({ hex }) => handleOnChangeComplete(hex, null)}
            />
          )}
        </div>
        <div ref={imageIconRef} className='background-image-wrapper'>
          <div
            className='background-image-wrapper__action-border '
            data-testid='image-picker-trigger'
            onClick={handleShowBackgroundImagePicker}>
            <div ref={imageRef} className='background-image-wrapper__action-border__body' />
          </div>
        </div>
      </div>
      {showBackgroundImagePicker && (
        <BackgroundImagePicker
          forwardRef={imagePickerRef}
          onChangeComplete={(url) => handleOnChangeComplete(null, url)}
        />
      )}
    </div>
  );
}

export default AdminTasksPresentationBuilderSettingsSlideSettings;
