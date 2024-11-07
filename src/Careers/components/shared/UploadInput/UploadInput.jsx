import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as Clear } from '@dc/svg/clear.svg';
import { ReactComponent as Document } from '@dc/svg/temp/doc.svg';
import { ReactComponent as File } from '@dc/svg/temp/file.svg';
import { ReactComponent as Image } from '@dc/svg/temp/gallery.svg';
import { ReactComponent as Pdf } from '@dc/svg/temp/pdf.svg';
import { ReactComponent as Video } from '@dc/svg/temp/video.svg';

import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';

SharedUploadInput.propTypes = {
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  extensions: PropTypes.arrayOf(PropTypes.string),
  inputConfig: PropTypes.object,
  inputProps: PropTypes.object,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  onRemove: PropTypes.func,
  progress: PropTypes.number,
};

SharedUploadInput.defaultProps = {
  multiple: true,
};

// TODO will need to connect to BE logic after implemented
function SharedUploadInput({
  disabled,
  label,
  errorMessage,
  extensions,
  inputConfig: { name, onBlur, onChange, value } = {},
  multiple,
  onRemove,
  progress,
  ...attributes
}) {
  const fileInput = useRef(null);
  const { t } = useTranslation();

  const handleSelectedFile = (event) => {
    const selectedFileNames = value.map(({ name }) => name);
    const filesToAdd = Object.values(event.target.files).filter(
      ({ name }) => !selectedFileNames.includes(name)
    );

    const newFiles = multiple ? [...value, ...filesToAdd] : [...filesToAdd];
    onChange(newFiles);
  };

  const removeFile = (file) => () => {
    const newFiles = value.filter(({ name }) => name !== file.name);
    onChange(newFiles);
    onRemove && onRemove(file);
    // It is to force onChange trigger after clearing particural elements
    fileInput.current.value = '';
  };

  const getIcon = (file) => {
    if (Boolean(file.type.match(/video/i))) {
      return <Video />;
    } else if (Boolean(file.type.match(/document/i))) {
      return <Document />;
    } else if (Boolean(file.type.match(/pdf/i))) {
      return <Pdf />;
    } else if (Boolean(file.type.match(/image/i))) {
      return <Image />;
    }

    return <File />;
  };

  return (
    <div className='upload-input'>
      <label className='upload-input__label' htmlFor={label}>
        {label}
      </label>
      <div className='upload-input__preview'>
        {progress ? (
          <span className='upload-input__progress'>{progress}%</span>
        ) : (
          value.map((file) => (
            <div key={file.name} className='upload-input__file'>
              <SharedIcon className='upload-input__icon' icon={getIcon(file)} />
              <div className='upload-input__file-info'>
                <p className='upload-input__file-name' data-testid='file-name'>
                  {file.name}
                </p>
                {!disabled && (
                  <Clear
                    className='upload-input__clear'
                    data-testid='file-clear'
                    onClick={removeFile(file)}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <input
        ref={fileInput}
        accept={extensions ? extensions.join(',') : '*'}
        className='upload-input__input'
        data-testid='input'
        id={label}
        multiple={multiple ? true : ''}
        name={name}
        type='file'
        onBlur={onBlur}
        onChange={handleSelectedFile}
        {...attributes}
      />
      <SharedButton
        className='upload-input__button'
        disabled={disabled}
        variant='primary'
        onClick={() => fileInput.current.click()}>
        {t('uploadInput.text')}
      </SharedButton>
      {errorMessage && <div className='input-error-message'>{errorMessage}</div>}
    </div>
  );
}

export default SharedUploadInput;
