import { useField } from 'formik';

import SharedImageInput from '@dc/shared/ImageInput/ImageInput';

type TNewImage = {
  file: File;
  src: string;
};

type TImage = TNewImage | string;

const ExtensionsModalImagePicker = () => {
  const [imageField, imageMeta, imageHelpers] = useField<TImage>('image');

  const getImageValue = () => {
    if (typeof imageField.value === 'string') {
      return {
        src: imageField.value,
        file: {
          name: imageField.value,
        },
      };
    }

    return imageField.value;
  };

  const error = imageMeta.touched && imageMeta.error ? imageMeta.error : '';

  return (
    <SharedImageInput
      data-testid='extension-image-input'
      errorMessage={error}
      inputConfig={{
        ...imageField,
        value: getImageValue(),
        onChange: imageHelpers.setValue,
        placeholder: '',
        icon: '',
      }}
      label=''
    />
  );
};

export default ExtensionsModalImagePicker;
