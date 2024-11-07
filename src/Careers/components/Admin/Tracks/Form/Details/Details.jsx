import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { isEmpty } from 'lodash-es';

import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import { PUBLISHING_STATUSES, TRACK_GRADES } from '@dc/resources/constants';
import { shapeTrackForm } from '@dc/resources/typeDefs';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import { Select } from '@shared/components/Select';
import { ASSET_TYPE, RESOURCE_CLASS, SERVICE_NAME } from '@shared/resources/enums';
import Card from '@shared/components/Card/Card';
import DropableArea from '@shared/components/DropableArea/DropableArea';
import useGeneratePresignedUploadUrl from '@shared/graphql/hooks/useGeneratePresignedUploadUrl';
import { fileUpload } from '@shared/services/aws';
import SharedTextarea from '@shared/components/Textarea/Textarea';

AdminTracksFormDetails.propTypes = {
  ...shapeTrackForm,
};

function AdminTracksFormDetails({ errors, touched, isEdit }) {
  const [imageInput, imageMeta, imageHelpers] = useField('imageData');
  const [statusInput, , statusHelpers] = useField('status');
  const [gradesInput, , gradesHelpers] = useField('grades');
  const [descriptionInput, , descriptionHelpers] = useField('description');
  const [shortDescriptionInput] = useField('shortDescription');
  const [serviceInput, , serviceHelpers] = useField('service');

  const { t } = useTranslation();
  const [previewImage, setPreviewImage] = useState({
    src: '',
    file: {},
  });

  const tackStatusOptions = [
    { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
    { value: PUBLISHING_STATUSES.PUBLISHED, label: t('common.publishingStatuses.published') },
  ];
  const serviceOptions = [
    { value: SERVICE_NAME.LEARNING, label: t('common.services.learning') },
    { value: SERVICE_NAME.CAREERS, label: t('common.services.careers') },
  ];
  const hasImage = !isEmpty(imageInput.value.file) || !isEmpty(imageInput.value.url);
  const [getPresignedUrl] = useGeneratePresignedUploadUrl();

  const fileReader = new FileReader();

  const handleImagePreview = (file) => {
    fileReader.onload = (event) => {
      const { result } = event.target;

      setPreviewImage({ file, src: result });
    };

    fileReader.readAsDataURL(file);
  };

  const handleImageDrop = async (files) => {
    const [file] = files;

    if (!file) return;

    handleImagePreview(file);

    const response = await fileUpload(
      file,
      getPresignedUrl,
      RESOURCE_CLASS.TRACK,
      ASSET_TYPE.IMAGE
    );

    imageHelpers.setValue({
      uuid: response.uuid,
      filename: response?.file.name,
      url: response.url,
      file,
    });
  };
  const handleImageClear = () => {
    setPreviewImage({});

    imageHelpers.setValue({ uuid: null, filename: null, url: null, file: null });
  };

  const errorMessage =
    imageMeta.touched && !hasImage && (isEdit ? errors.imageData?.url : errors.imageData?.uuid);

  return (
    <div className='flex flex-col gap-base'>
      <Card className='flex gap-base xxxl:gap-lg'>
        <div className='w-[180px] xxxl:w-[240px] shrink-0'>
          <DropableArea
            accept='image/*'
            assetType='image'
            errorMessage={errorMessage}
            previewStyle='fill'
            previewUrl={previewImage.src || imageInput.value.url}
            shape='square'
            withPreview={true}
            {...(hasImage && { value: [imageInput.value.file] })}
            onClear={handleImageClear}
            onDrop={handleImageDrop}
          />
        </div>
        <div className='grow flex flex-col gap-sm'>
          <h4 className='font-bold text-sm xxxl:text-base leading-base'>
            {t('common.fields.common.mainInformation')}
          </h4>
          <div className='flex gap-sm pb-sm'>
            <SharedFormTextInput
              data-testid='tracks-name-input'
              isRequired={true}
              label={t('common.fields.common.name')}
              name='name'
            />
            <SharedFormTextInput
              isRequired={false}
              label={t('common.fields.common.displayName')}
              name='displayName'
            />
          </div>
          <div className='flex gap-sm'>
            <Select
              {...statusInput}
              errorMessage={touched.status && errors.status}
              isRequired={true}
              label={t('common.fields.common.status')}
              menuPortalTarget={document.body}
              options={tackStatusOptions}
              wrapperClassName='w-1/3'
              onChange={statusHelpers.setValue}
            />
            <Select
              {...gradesInput}
              errorMessage={touched.grades && errors.grades}
              isMulti={true}
              label={t('admin.tracks.grades')}
              menuPortalTarget={document.body}
              options={TRACK_GRADES}
              wrapperClassName='w-1/3'
              onChange={gradesHelpers.setValue}
            />
            <Select
              {...serviceInput}
              errorMessage={touched.service && errors.service}
              isDisabled={isEdit}
              isRequired={true}
              label={t('sharedCommon.service')}
              menuPortalTarget={document.body}
              options={serviceOptions}
              wrapperClassName='w-1/3'
              onChange={serviceHelpers.setValue}
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
            {t('admin.tracks.trackDescription')}
          </p>
        </div>
        <SharedTextEditor
          data-testid='tracks-description-input'
          editorConfig={{ ...descriptionInput, onChange: descriptionHelpers.setValue }}
          errorMessage={touched.description && errors.description}
        />
      </Card>
      <Card className='flex gap-base xxxl:gap-lg'>
        <div className='w-1/4 xxxl:w-1/6'>
          <h4 className='font-bold text-sm xxxl:text-base leading-base'>
            {t('common.fields.common.shortDescription')}
          </h4>
          <p className='text-xs xxxl:text-sm font-regular leading-lg text-neutral-700'>
            {t('admin.tracks.shortTrackDescription')}
          </p>
        </div>
        <SharedTextarea
          className='w-full'
          data-testid='tracks-shortDescription-input'
          field={shortDescriptionInput}
          placeholder={t('common.fields.common.shortDescription')}
        />
      </Card>
    </div>
  );
}

export default AdminTracksFormDetails;
