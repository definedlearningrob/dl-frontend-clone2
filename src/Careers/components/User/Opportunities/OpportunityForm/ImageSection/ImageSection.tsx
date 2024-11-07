import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import DropableArea from '@shared/components/DropableArea/DropableArea';
import { prepareFile } from '@shared/services/aws';
import { ASSET_TYPE, RESOURCE_CLASS } from '@shared/resources/enums';
import useGeneratePresignedUploadUrl from '@shared/graphql/hooks/useGeneratePresignedUploadUrl';
import Switch from '@shared/components/Switch/Switch';

const typesToContain = ['image/svg+xml', 'image/png'];

type Props = {
  resourceClass: RESOURCE_CLASS;
};

export const ImageSection = ({ resourceClass }: Props) => {
  const [imageInput, imageMeta, imageHelpers] = useField('imageData');
  const [imageFitToContainerInput, , imageFitToContainerHelpers] = useField('imageFitToContainer');

  const { t } = useTranslation();

  const hasImage = Boolean(imageInput.value.url || imageInput.value.file);
  const imageErrorMessage = imageMeta.touched ? imageMeta.error : undefined;
  const [getPresignedUrl] = useGeneratePresignedUploadUrl();

  const fitToContainer = imageFitToContainerInput.value;

  const handleImageDrop = async (files: File[]) => {
    const [file] = files;

    if (!file) return;

    const { uuid, url } = await prepareFile(file, getPresignedUrl, resourceClass, ASSET_TYPE.IMAGE);

    imageHelpers.setValue({
      uuid,
      filename: file.name,
      urlForUpload: url,
      file,
    });

    imageFitToContainerHelpers.setValue(!typesToContain.includes(file.type));
  };

  const handleImageClear = () => {
    imageHelpers.setValue({ uuid: null, filename: null, url: null, file: null });
  };

  return (
    <div className='w-full h-full'>
      <div className='mb-sm xxxl:mb-base'>
        <DropableArea
          accept='image/*'
          assetType='image'
          errorMessage={imageErrorMessage}
          previewStyle={fitToContainer ? 'fill' : 'contain'}
          previewUrl={imageInput.value.url}
          shape='landscape'
          withPreview={true}
          {...(hasImage && { value: [imageInput.value.file || imageInput.value.url] })}
          className='!p-0 h-[280px] xxxl:h-[420px]'
          onClear={handleImageClear}
          onDrop={handleImageDrop}
        />
      </div>
      <Switch
        additionalLabel={t('common.actions.fillToContainer')}
        value={imageFitToContainerInput.value}
        onChange={() => imageFitToContainerHelpers.setValue(!imageFitToContainerInput.value)}
      />
    </div>
  );
};
