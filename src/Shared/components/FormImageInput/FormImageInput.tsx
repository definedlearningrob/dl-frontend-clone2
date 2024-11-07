import { useField } from 'formik';
import { useState } from 'react';
import { isEmpty } from 'lodash-es';

import DropableArea from '@shared/components/DropableArea/DropableArea';
import { callToast } from '@shared/components/Toaster/Toaster';

type Props = {
  errorMessage?: string;
  inputConfig: any;
  label?: string;
  onChange: (previewImage: { file: File | null; src: string | ArrayBuffer | null }) => void;
  withPreview?: boolean;
};

const FormImageInput = ({
  errorMessage,
  onChange,
  inputConfig: { value, onClear },
  label,
  ...attributes
}: Props) => {
  const [, , projectImageHelpers] = useField('imageData');
  const [previewErrorMessage, setIsPreviewImageError] = useState<string | undefined>();
  const handleImagePreview = async (files: File[]) => {
    setIsPreviewImageError(undefined);

    if (!isEmpty(files)) {
      const [readyFile] = files;

      try {
        const reader = new FileReader();

        reader.onload = (event) => {
          const { result } = event.target as FileReader;

          onChange({ file: readyFile, src: result });
          projectImageHelpers.setValue({ file: readyFile, src: result });
        };
        reader.readAsDataURL(readyFile);
      } catch (error) {
        if (error instanceof Error) {
          setIsPreviewImageError(error.message);
        } else {
          callToast('error', errorMessage);
        }
      }
    }
  };
  const discardPhoto = () => {
    onClear();
    onChange({ file: null, src: '' });
    projectImageHelpers.setValue({ file: null, src: '' });
  };

  const imageInput = value ? value.src : null;
  const imagePreview = !!previewErrorMessage ? null : imageInput;

  return (
    <div className='w-1/2 h-1/2'>
      <DropableArea
        accept='.jpeg, .jpg, .png'
        assetType='file'
        data-testid='image-input'
        errorMessage={previewErrorMessage}
        label={label}
        value={imageInput}
        // @ts-ignore
        {...attributes}
        previewUrl={imagePreview}
        shape='square'
        onClear={discardPhoto}
        onDrop={handleImagePreview}
      />
    </div>
  );
};

export default FormImageInput;
