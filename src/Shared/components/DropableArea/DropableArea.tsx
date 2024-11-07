import cx from 'classnames';
import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { FileError, useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { ReactComponent as Video } from '@shared/svg/video_placeholder.svg';
import { ReactComponent as FileIcon } from '@shared/svg/file.svg';
import { ReactComponent as ImagePlaceholder } from '@shared/svg/image_placeholder.svg';
import { ReactComponent as UploadFile } from '@shared/assets/icons/upload_thumbnail.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { DropableAreaInfo } from '@shared/components/DropableArea/DropableAreaInfo';
import { DropLoader } from '@shared/components/DropableArea/DropLoader';
import { DropableButtons } from '@shared/components/DropableArea/DropableButtons';
import { callToast } from '@shared/components/Toaster/Toaster';

import styles from './DropableArea.module.sass';

type Props = {
  accept?: string;
  assetType?: 'image' | 'video' | 'general' | 'file';
  disabled?: boolean;
  dropText?: string;
  isLoading?: boolean;
  onClear?: () => void;
  onDrop?: (files: File[]) => void;
  label?: string | ReactNode;
  multiple?: boolean;
  previewUrl?: string;
  previewStyle?: 'fill' | 'contain';
  shape?: 'square' | 'rounded' | 'landscape';
  value?: File[];
  progress?: number;
  errorMessage?: string;
  className?: string;
  validator?: (file: File) => FileError | null;
  withPreview?: boolean;
};

function SharedDropableArea({
  accept,
  assetType = 'general',
  errorMessage,
  disabled,
  dropText,
  isLoading,
  multiple,
  onClear,
  onDrop,
  label,
  previewStyle,
  previewUrl,
  value,
  shape = 'landscape',
  progress,
  className,
  validator,
  withPreview = false,
}: Props) {
  const isLandscape = shape === 'landscape';
  const isSquare = shape === 'square';
  const isRounded = shape === 'rounded';
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [draggingOver, setDraggingOver] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleOnDrop = (files: File[]) => {
    if (typeof onDrop === 'function') {
      onDrop(files);

      const [firstFile] = files;

      if (withPreview && firstFile && firstFile.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(firstFile);
      } else {
        setPreviewImage('');
      }
    }
    setDraggingOver(false);
  };

  const onDragEnter = () => setDraggingOver(true);
  const onDragLeave = () => setDraggingOver(false);

  const {
    getRootProps,
    getInputProps,
    fileRejections,
    isDragActive,
    rootRef: container,
  } = useDropzone({
    onDrop: handleOnDrop,
    multiple,
    onDragEnter,
    onDragLeave,
    disabled: disabled || isLoading,
    accept,
    validator,
  });

  const IconToRender = {
    image: ImagePlaceholder,
    general: UploadFile,
    file: FileIcon,
    video: Video,
  }[assetType];

  const computedPreviewUrl = previewUrl || previewImage;

  useEffect(() => {
    const wrapper = container?.current;

    if (wrapper && computedPreviewUrl) {
      wrapper.style.backgroundImage = `url(${computedPreviewUrl})`;
    }

    return () => {
      if (wrapper && computedPreviewUrl) {
        wrapper.style.backgroundImage = '';
      }
    };
  }, [computedPreviewUrl]);

  useEffect(() => {
    if (!isEmpty(fileRejections)) {
      fileRejections.forEach((file) => {
        if (!isEmpty(file.errors)) {
          file.errors.forEach((error) => {
            callToast('error', error.message);
          });
        }
      });
    }
  }, [fileRejections]);

  const shapeClass = cx('!p-0 !pt-[100%]', {
    '!rounded-full': isRounded,
  });

  const containerStyles = cx(
    'bg-center bg-cover bg-white',
    'flex items-center justify-center group',
    'rounded-sm cursor-pointer border-2 border-dashed border-neutral-300',
    'hover:bg-neutral-200 hover:border-primary-500',
    'relative p-0 pt-[50%]',
    'text-center text-xs xxxl:text-sm',
    {
      [shapeClass]: isRounded || isSquare,
      [styles.fillBackground]: previewStyle === 'fill',
      [styles.containBackground]: previewStyle === 'contain',
      'cursor-default': isLoading,
    },
    className
  );
  const contentStyles = cx('flex flex-col justify-center items-center h-full p-sm', {
    ['invisible group-hover:visible relative']: computedPreviewUrl,
    '!visible !bg-overlay-modal/85': draggingOver,
  });
  const iconStyles = cx(
    'p-xs mb-xs text-primary-500 bg-primary-200 rounded-full group-hover:bg-white',
    {
      'bg-white !text-neutral-700 z-lowest': computedPreviewUrl,
      '!bg-danger-100 !text-danger-500': !!errorMessage,
    }
  );
  const textWrapperStyles = cx('text-primary-500 m-0 z-lowest', {
    'text-white': draggingOver,
    'group-hover:text-white': !isEmpty(value),
  });
  const linkStyles = cx('text-primary-500 underline', {
    'text-white': draggingOver,
    'group-hover:text-white': !isEmpty(value),
  });
  const overlayClassName = cx(
    'absolute rounded-sm inset-0 p-sm bg-overlay-modal/50 invisible group-hover:!visible',
    {
      '!visible text-white !bg-overlay-modal/85': draggingOver,
      'rounded-sm': isSquare,
      '!rounded-full': isRounded,
    }
  );
  const removeIconClass = cx('absolute invisible group-hover:visible', {
    '-translate-x-1/2 translate-y-1/2 custom-icon-transform pr-0': isRounded,
    'right-sm top-sm': !isRounded,
  });
  const iconSize = isFullHD ? 'lg' : 'md';

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (onClear) {
      setPreviewImage('');
      onClear();
    } else {
      return callToast('error', t('dropableArea.errorOnClear'));
    }
  };

  return (
    <>
      {label && !isLoading && (
        <div className='flex justify-between mb-xs'>
          {label && <label htmlFor={`drop-zone-input-${label}`}>{label}</label>}
        </div>
      )}
      <div className={containerStyles} data-testid='drop-container' {...getRootProps()}>
        {!isEmpty(value) && <div className={overlayClassName} />}
        <div className='absolute inset-0'>
          <input
            data-testid='drop-zone-input'
            id={`drop-zone-input-${label}`}
            {...getInputProps()}
          />
          <div className={contentStyles}>
            {isLoading ? (
              <DropLoader assetType={assetType} progress={progress} />
            ) : (
              <DropableAreaInfo
                IconToRender={IconToRender}
                dropText={dropText}
                error={errorMessage}
                iconStyles={iconStyles}
                isDragActive={isDragActive}
                linkStyles={linkStyles}
                textWrapperStyles={textWrapperStyles}
              />
            )}
          </div>
        </div>
        {computedPreviewUrl && (
          <DropableButtons
            buttonClassStyles={removeIconClass}
            iconSize={iconSize}
            isLandscape={isLandscape}
            isSquare={isSquare}
            onClear={handleClear}
          />
        )}
      </div>
    </>
  );
}

export default SharedDropableArea;
