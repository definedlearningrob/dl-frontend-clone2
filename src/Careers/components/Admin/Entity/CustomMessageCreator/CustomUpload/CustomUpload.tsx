import { useRef, ChangeEvent, useState } from 'react';
import { useField } from 'formik';
import { useMutation } from '@apollo/client';
import { snakeCase } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { ReactComponent as UploadIcon } from '@dc/assets/icons/upload_on_cloud.svg';
import generatePresignedUploadUrl from '@dc/graphql/user/mutations/generatePresignedUploadUrl';
import { fileUpload } from '@dc/services/aws';
import { AssetType, ResourceClass } from '@dc/resources/enums';
import { ReactComponent as RemoveIcon } from '@dc/assets/icons/clear.svg';

import Card from '@shared/components/Card/Card';
import SharedButton from '@shared/components/Button/Button';
import Image from '@shared/components/Image/Image';
import { callToast } from '@shared/components/Toaster/Toaster';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';

type Props = {
  logoOrIcon?: string | undefined;
  fallback: string;
  description: string;
  actionTitle: string;
  name: string;
  initialImage?: string;
};

export const CustomUpload = ({ description, actionTitle, name, fallback }: Props) => {
  const { t } = useTranslation();
  const [field, _, fieldHelpers] = useField(name);
  const fileInput = useRef<HTMLInputElement>(null);
  const tempFile = new File([], '');
  const [tempFileSrc, setTempFileSrc] = useState<{
    file: File;
    src: string | ArrayBuffer | null | undefined;
  }>({
    file: tempFile,
    src: undefined,
  });
  const [getPresignedUrl] = useMutation(generatePresignedUploadUrl);

  const convertToUpperCase = (name: string) => snakeCase(name).toUpperCase();
  const getFileUrl = async (file: File, name: string) => {
    const assetValue = convertToUpperCase(name);

    if (!file) return;
    const response = await fileUpload(
      file,
      getPresignedUrl,
      ResourceClass.ENTITY,
      AssetType[assetValue as keyof typeof AssetType]
    );

    await response?.promise;

    return { uuid: response?.uuid, filename: file?.name, url: response.url };
  };

  const handleImagePreview = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || !files.length) {
      callToast('error', t('common.notifications.error.noFile'));

      return;
    }

    const [readyFile] = files;

    if (files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const { result } = event.target as FileReader;
        setTempFileSrc({ file: readyFile, src: result });
      };
      reader.readAsDataURL(readyFile);
    }
    const response = await getFileUrl(readyFile, name);
    fieldHelpers.setValue(response);
  };

  const openFileUploadDialog = () => {
    if (fileInput && fileInput.current) {
      fileInput.current.click();
    }
  };

  const imagePreview = tempFileSrc?.src || field.value.url;

  const handleDelete = () => {
    setTempFileSrc({ file: tempFile, src: '' });
    fieldHelpers.setValue({ uuid: null, filename: null, url: '' });
  };

  return (
    <Card className='border rounded-sm border-neutral-300' withoutPadding={true}>
      <div className='flex p-sm xxxl:p-base items-stretch gap-md'>
        <div className='flex justify-center w-1/3 p-xs items-center gap-sm border border-dashed rounded-sm border-neutral-300 h-[135px]'>
          <Image
            key={field.value.url}
            className='object-scale-down w-fit h-full'
            src={imagePreview || fallback}
          />
          <input
            ref={fileInput}
            className='hidden'
            name={name}
            type='file'
            onChange={handleImagePreview}
          />
        </div>
        <div className='flex w-2/3 flex-col gap-sm'>
          <div className='flex gap-sm justify-between'>
            <SharedButton
              Icon={UploadIcon}
              className='w-fit'
              size='sm'
              variant='primary'
              onClick={openFileUploadDialog}>
              {actionTitle}
            </SharedButton>
            {imagePreview && (
              <DeprecatedIconButton
                icon={<RemoveIcon />}
                size='xs'
                type='button'
                variant='primary-outlined'
                onClick={handleDelete}
              />
            )}
          </div>
          <p className='text-xxs xxxl:text-xs font-regular leading-lg text-neutral-700 mb-0'>
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};
