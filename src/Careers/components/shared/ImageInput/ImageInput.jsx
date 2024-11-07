import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { ReactComponent as CameraPlaceholder } from '@dc/svg/temp/camera.svg';

import SharedIcon from '@shared/components/Icon/Icon';
import SharedModal from '@shared/components/Modal/Modal';

SharedImageInput.propTypes = {
  errorMessage: PropTypes.string,
  inputConfig: PropTypes.object,
  inputProps: PropTypes.object,
  label: PropTypes.string,
};

function SharedImageInput({
  errorMessage,
  inputConfig: { icon, name, onBlur, onChange, placeholder, value },
  label,
  ...attributes
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState({});
  const fileInput = useRef(null);
  const { t } = useTranslation();

  const handleImagePreview = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setPreviewImage({ file: file, src: event.target.result });
        setModalVisible(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const openInput = () => fileInput.current.click();
  const closeModal = () => setModalVisible(false);
  const acceptPhoto = () => {
    onChange(previewImage);
    closeModal();
  };

  const discardPhoto = () => {
    fileInput.current.value = '';

    setPreviewImage({});
    closeModal();
  };

  const handleCloseModal = () => {
    discardPhoto();
  };

  return (
    <div className='image-input' data-error={errorMessage}>
      <label className='image-input__label' htmlFor={label}>
        {label}
      </label>
      <div className='image-input__placeholder' onClick={openInput}>
        {value?.src ? (
          <img alt={value.name} className='image-input__image-placeholder' src={value.src} />
        ) : (
          <SharedIcon
            data-testid='image-placeholder'
            icon={icon ? icon : <CameraPlaceholder data-testid='image-placeholder' />}
            placeholder={placeholder}
          />
        )}
      </div>
      <input
        ref={fileInput}
        accept='image/*'
        className='image-input__input'
        data-testid='image-input'
        id={label}
        name={name}
        type='file'
        onBlur={onBlur}
        onChange={handleImagePreview}
        {...attributes}
      />
      <SharedModal isOpen={modalVisible} onDismiss={handleCloseModal}>
        <SharedModal.Header>
          <SharedModal.Heading>{t('shared.imageInput.preview')}</SharedModal.Heading>
        </SharedModal.Header>
        <SharedModal.Body>
          <div className='image-input__preview-wrapper'>
            <img alt={previewImage.name} className='image-input__preview' src={previewImage.src} />
          </div>
        </SharedModal.Body>
        <SharedModal.Footer>
          <div className='image-input__footer-buttons'>
            <SharedModal.Button
              className='image-input__preview-button'
              data-testid='accept-button'
              variant='primary'
              onClick={acceptPhoto}>
              {t('shared.imageInput.accept')}
            </SharedModal.Button>
            <SharedModal.Button
              className='image-input__preview-button -reject'
              data-testid='reject-button'
              onClick={handleCloseModal}>
              {t('shared.imageInput.reject')}
            </SharedModal.Button>
          </div>
        </SharedModal.Footer>
      </SharedModal>
      {!isEmpty(errorMessage) && <div className='text-danger-600 text-xxs'>{errorMessage}</div>}
    </div>
  );
}

export default SharedImageInput;
