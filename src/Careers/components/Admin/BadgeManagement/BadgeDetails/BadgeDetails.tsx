import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { isEmpty } from 'lodash-es';

import generatePresignedUploadUrl from '@dc/graphql/user/mutations/generatePresignedUploadUrl';

import { TextInput } from '@shared/components/TextInput/TextInput';
import SharedTextarea from '@shared/components/FormTextarea/FormTextarea';
import DropableArea from '@shared/components/DropableArea/DropableArea';
import { prepareFile } from '@shared/services/aws';
import { ASSET_TYPE, RESOURCE_CLASS } from '@shared/resources/enums';

export const BadgeDetails = () => {
  const { t } = useTranslation();
  const [imageField, imageMeta, imageHelpers] = useField('imageData');
  const [nameInput, nameMeta, nameHelpers] = useField('name');
  const hasImage = !isEmpty(imageField.value.file) || !isEmpty(imageField.value.url);
  const [getPresignedUrl] = useMutation(generatePresignedUploadUrl);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    nameHelpers.setValue(e.target.value);
  };

  const handleImageDrop = async (files: File[]) => {
    const [file] = files;

    if (!file) return;

    const { uuid, url } = await prepareFile(
      file,
      getPresignedUrl,
      RESOURCE_CLASS.BADGE,
      ASSET_TYPE.IMAGE
    );

    imageHelpers.setValue({
      uuid,
      filename: file.name,
      urlForUpload: url,
      file,
    });
  };

  const handleImageClear = () => {
    imageHelpers.setValue({ uuid: null, filename: null, url: null, file: null });
  };

  return (
    <div className='flex gap-base text-xs xxxl:text-sm items-start'>
      <div className='w-[180px] xxxl:w-[240px] shrink-0'>
        <DropableArea
          accept='image/*'
          assetType='image'
          errorMessage={imageMeta?.error}
          previewStyle='fill'
          previewUrl={imageField.value.url}
          shape='square'
          withPreview={true}
          {...(hasImage && { value: [imageField.value.file] })}
          onClear={handleImageClear}
          onDrop={handleImageDrop}
        />
      </div>
      <div className='justify-center grow flex flex-col gap-sm'>
        <TextInput
          className='w-full'
          errorMessage={nameMeta.error}
          field={nameInput}
          isRequired={true}
          label={t('admin.badges.badgeName')}
          placeholder={t('admin.badges.badgeNamePlaceholder')}
          value={nameInput.value}
          onChange={handleNameChange}
        />
        <SharedTextarea
          isRequired={true}
          label={t('common.fields.common.description')}
          name='description'
        />
      </div>
    </div>
  );
};
