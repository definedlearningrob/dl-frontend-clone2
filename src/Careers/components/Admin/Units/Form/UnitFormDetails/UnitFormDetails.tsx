import { useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import { PUBLISHING_STATUSES } from '@dc/resources/constants';
import { FormValues } from '@dc/components/Admin/Units/New/New';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import { Select } from '@shared/components/Select';
import { ASSET_TYPE, RESOURCE_CLASS, SERVICE_NAME } from '@shared/resources/enums';
import Card from '@shared/components/Card/Card';
import DropableArea from '@shared/components/DropableArea/DropableArea';
import useGeneratePresignedUploadUrl from '@shared/graphql/hooks/useGeneratePresignedUploadUrl';
import { prepareFile } from '@shared/services/aws';

type Props = {
  isEdit: boolean;
};

export const UnitFormDetails = ({ isEdit }: Props) => {
  const { errors, touched } = useFormikContext<FormValues>();
  const [imageInput, imageMeta, imageHelpers] = useField('imageData');
  const [statusInput, statusMeta, statusHelpers] = useField('status');
  const [descriptionInput, , descriptionHelpers] = useField('description');
  const [serviceInput, serviceMeta, serviceHelpers] = useField('service');
  const { t } = useTranslation();

  const unitStatusOptions = [
    { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
    { value: PUBLISHING_STATUSES.PUBLISHED, label: t('common.publishingStatuses.published') },
  ];

  const serviceOptions = [
    { value: SERVICE_NAME.LEARNING, label: t('common.services.learning') },
    { value: SERVICE_NAME.CAREERS, label: t('common.services.careers') },
  ];
  const hasImage = !isEmpty(imageInput.value.file) || !isEmpty(imageInput.value.url);
  const [getPresignedUrl] = useGeneratePresignedUploadUrl();

  const handleImageDrop = async (files: File[]) => {
    const [file] = files;

    if (!file) return;

    const { uuid, url } = await prepareFile(
      file,
      getPresignedUrl,
      RESOURCE_CLASS.UNIT,
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

  const imageErrorMessage = imageMeta.touched ? imageMeta.error : undefined;

  return (
    <div className='flex flex-col gap-base'>
      <Card className='flex gap-base xxxl:gap-lg'>
        <div className='w-[180px] xxxl:w-[240px] shrink-0'>
          <DropableArea
            accept='image/*'
            assetType='image'
            errorMessage={imageErrorMessage}
            previewStyle='fill'
            previewUrl={imageInput.value.url}
            shape='square'
            withPreview={true}
            {...(hasImage && { value: [imageInput.value.file] })}
            onClear={handleImageClear}
            onDrop={handleImageDrop}
          />
        </div>

        <div className='flex flex-col w-full'>
          <h4 className='font-bold text-sm xxxl:text-base leading-base'>
            {t('common.fields.common.mainInformation')}
          </h4>
          <div className='flex gap-sm pb-sm'>
            <SharedFormTextInput
              className='!w-1/2'
              data-testid='units-name-input'
              isRequired={true}
              label={t('common.fields.common.name')}
              name='name'
            />
            <Select
              isRequired={true}
              {...statusInput}
              errorMessage={statusMeta.touched ? statusMeta.error : ''}
              label={t('common.fields.common.status')}
              options={unitStatusOptions}
              wrapperClassName='w-1/2'
              onChange={(newValue) => statusHelpers.setValue(newValue)}
            />
          </div>
          <div className='flex gap-sm'>
            <SharedFormTextInput
              className='!w-1/2'
              isRequired={false}
              label={t('common.fields.common.displayName')}
              name='displayName'
            />
            <Select
              isDisabled={isEdit}
              isRequired={true}
              menuPortalTarget={document.body}
              wrapperClassName='w-1/2'
              {...serviceInput}
              errorMessage={serviceMeta.touched ? serviceMeta.error : ''}
              label={t('sharedCommon.service')}
              options={serviceOptions}
              onChange={(newValue) => serviceHelpers.setValue(newValue)}
            />
          </div>
        </div>
      </Card>
      <Card className='flex gap-base xxxl:gap-lg'>
        <div className='w-1/4 xxxl:w-1/6'>
          <h4 className='font-bold text-sm xxxl:text-base leading-base'>
            {t('common.fields.common.description')}
          </h4>
          <p className='text-xs xxxl:text-sm font-regular leading-lg text-neutral-700'>
            {t('admin.units.unitDescription')}
          </p>
        </div>
        <SharedTextEditor
          data-testid='units-description-input'
          editorConfig={{
            value: descriptionInput.value,
            onChange: descriptionHelpers.setValue,
          }}
          errorMessage={touched.description && errors.description}
        />
      </Card>
    </div>
  );
};
