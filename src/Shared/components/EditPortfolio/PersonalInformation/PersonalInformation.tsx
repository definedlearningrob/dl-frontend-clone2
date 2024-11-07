import { useTranslation } from 'react-i18next';
import { FieldArray, useField } from 'formik';
import { isEmpty } from 'lodash-es';
import { useState } from 'react';

import { EditPortfolioCard } from '@shared/components/EditPortfolio/EditPortfolioCard';
import { EditPortfolioLink } from '@shared/components/EditPortfolio/EditPortfolioLink';
import { TextInput } from '@shared/components/TextInput/TextInput';
import SharedTextarea from '@shared/components/Textarea/Textarea';
import DropableArea from '@shared/components/DropableArea/DropableArea';
import { ASSET_TYPE, RESOURCE_CLASS } from '@shared/resources/enums';
import { fileUpload } from '@shared/services/aws';
import useGeneratePresignedUploadUrl from '@shared/graphql/hooks/useGeneratePresignedUploadUrl';

export const PersonalInformation = () => {
  const { t } = useTranslation();

  const [nameField, nameMeta] = useField('name');
  const [bioField] = useField('bio');
  const [avatarField, _, avatarFieldHelpers] = useField('avatar');

  const [previewImage, setPreviewImage] = useState<{
    file?: File;
    src?: string | ArrayBuffer | null;
  }>({});

  const [getPresignedUrl] = useGeneratePresignedUploadUrl();

  const fileReader = new FileReader();

  const handleImagePreview = (file: File) => {
    fileReader.onload = (event) => {
      const { result } = event.target as FileReader;

      setPreviewImage({ file, src: result });
    };

    fileReader.readAsDataURL(file);
  };

  const handleAvatarDrop = async (files: File[]) => {
    const [file] = files;

    if (!file) return;

    handleImagePreview(file);

    const response = await fileUpload(
      file,
      getPresignedUrl,
      RESOURCE_CLASS.NEW_RESUME,
      ASSET_TYPE.AVATAR
    );

    avatarFieldHelpers.setValue({
      uuid: response.uuid,
      filename: response?.file.name,
      url: response.url,
      file,
      isUpdated: true,
    });
  };

  const handleAvatarClear = () => {
    setPreviewImage({});

    avatarFieldHelpers.setValue({
      uuid: null,
      filename: null,
      url: null,
      file: null,
      isUpdated: true,
    });
  };

  const hasAvatar = !isEmpty(avatarField.value.file) || !isEmpty(avatarField.value.url);

  return (
    <EditPortfolioCard className='flex gap-base xxxl:gap-md'>
      <div className='w-[180px] xxxl:w-[240px] shrink-0'>
        <DropableArea
          accept='image/*'
          assetType='image'
          previewStyle='fill'
          previewUrl={previewImage.src || avatarField.value.url}
          shape='rounded'
          withPreview={true}
          {...(hasAvatar && { value: [avatarField.value.file] })}
          onClear={handleAvatarClear}
          onDrop={handleAvatarDrop}
        />
      </div>
      <div className='w-full'>
        <h2 className='text-sm xxxl:text-base mb-xs'>
          {t('portfolio.creator.personalInformation')}
        </h2>
        <p className='text-font-secondary'>{t('portfolio.creator.personalInformationInfo')}</p>
        <div className='flex flex-col gap-sm mb-base xxxl:mb-md'>
          <TextInput
            errorMessage={nameMeta.touched && nameMeta.error ? nameMeta.error : undefined}
            field={nameField}
            isRequired={true}
            label={t('portfolio.creator.displayName')}
          />
          <SharedTextarea
            field={bioField}
            label={t('portfolio.creator.bioNote')}
            textareaClassName='!p-xs h-[205px] xxxl:h-[185px] leading-lg text-xs xxxl:text-sm font-regular'
          />
        </div>
        <h2 className='text-sm xxxl:text-base mb-xs'>{t('portfolio.creator.contactsAndLinks')}</h2>
        <p className='text-font-secondary'>{t('portfolio.creator.contactsAndLinksInfo')}</p>
        <FieldArray name='contactLinks' render={(props) => <EditPortfolioLink {...props} />} />
      </div>
    </EditPortfolioCard>
  );
};
