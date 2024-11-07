import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import pathwaysQuery from '@dc/graphql/user/queries/pathways';
import SharedImageInput from '@dc/shared/ImageInput/ImageInput';
import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import { PUBLISHING_STATUSES, COURSE_TYPES } from '@dc/resources/constants';
import { shapeCourseForm } from '@dc/resources/typeDefs';
import { useCollections } from '@dc/graphql/shared/hooks/useCollections';

import SharedFormTextarea from '@shared/components/FormTextarea/FormTextarea';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import { Select } from '@shared/components/Select';
import { ToggleSwitchTile } from '@shared/components/ToggleSwitchTile';

AdminCoursesFormDetails.propTypes = shapeCourseForm;

function AdminCoursesFormDetails({ errors, touched }) {
  const [imageInput, , imageHelpers] = useField('imageData');
  const { data, loading } = useQuery(pathwaysQuery);
  const { data: collectionsData, loading: collectionsLoading } = useCollections();
  const [descriptionInput, , descriptionHelpers] = useField('description');
  const [statusInput, , statusHelpers] = useField('status');
  const [pathwayInput, , pathwayHelpers] = useField('pathway');
  const [typeInput, , typeHelpers] = useField('type');
  const [isGlobalInput, , isGlobalHelpers] = useField('isGlobal');
  const [collectionInput, , collectionHelpers] = useField('collection');
  const { t } = useTranslation();

  const courseStatusOptions = [
    { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
    { value: PUBLISHING_STATUSES.PUBLISHED, label: t('common.publishingStatuses.published') },
  ];

  const toggleType = ({ target: { checked } }) => {
    const typeToSet = checked ? COURSE_TYPES.MIDDLE_SCHOOL : COURSE_TYPES.HIGH_SCHOOL;

    typeHelpers.setValue(typeToSet);
  };

  const toggleGlobal = ({ target: { checked } }) => {
    isGlobalHelpers.setValue(checked);
  };

  const collectionOptions =
    collectionsData?.collections.map((collection) => ({
      label: collection.name,
      value: collection.id,
    })) || [];

  return (
    <>
      <div className='items-start mb-sm flex flex-row gap-lg'>
        <SharedImageInput
          data-testid='courses-image-input'
          errorMessage={touched.imageData && errors.imageData}
          inputConfig={{ ...imageInput, onChange: imageHelpers.setValue }}
        />
        <div className='grid grid-cols-2 gap-x-md gap-y-sm  w-full z-lower'>
          <SharedFormTextInput
            data-testid='courses-name-input'
            isRequired={true}
            label={t('common.fields.common.name')}
            name='name'
          />
          <SharedFormTextInput
            data-testid='courses-displayName-input'
            isRequired={true}
            label={t('common.fields.common.displayName')}
            name='displayName'
          />
          <SharedFormTextInput
            isRequired={false}
            label={t('admin.courses.averageSalary')}
            name='averageSalary'
          />
          <SharedFormTextInput
            isRequired={false}
            label={t('admin.courses.outlook')}
            name='outlook'
          />
          <SharedFormTextInput
            isRequired={false}
            label={t('admin.courses.jobZone')}
            name='jobZone'
          />
          <SharedFormTextInput
            isRequired={false}
            label={t('admin.courses.onetCode')}
            name='onetCode'
          />
          <Select
            {...statusInput}
            errorMessage={touched.status && errors.status}
            isRequired={true}
            label={t('common.fields.common.status')}
            options={courseStatusOptions}
            onChange={statusHelpers.setValue}
          />
          <Select
            {...pathwayInput}
            errorMessage={touched.pathway && errors.pathway}
            isLoading={loading}
            isRequired={false}
            label={t('admin.courses.pathway')}
            options={
              loading ? [] : data.pathways.map(({ name, id }) => ({ id, label: name, value: name }))
            }
            onChange={pathwayHelpers.setValue}
          />
          <div className='col-span-2'>
            <Select
              {...collectionInput}
              errorMessage={touched.collection && errors.collection}
              isLoading={collectionsLoading}
              isRequired={true}
              label={t('common.fields.common.collection')}
              menuPortalTarget={document.body}
              options={collectionOptions}
              onChange={collectionHelpers.setValue}
            />
          </div>
          <ToggleSwitchTile
            key='type'
            data-testid='type-switch'
            description={t('admin.courses.middleSchoolDescription')}
            isEnabled={typeInput.value === COURSE_TYPES.MIDDLE_SCHOOL}
            name='type'
            title={t('admin.courses.middleSchool')}
            onChange={toggleType}
          />
          <ToggleSwitchTile
            key='isGlobal'
            data-testid='isGlobal-switch'
            description={t('admin.courses.isGlobalDescription')}
            isEnabled={isGlobalInput.value}
            name='isGlobal'
            title={t('admin.courses.isGlobal')}
            onChange={toggleGlobal}
          />
        </div>
      </div>
      <div className='flex flex-col gap-sm'>
        <SharedTextEditor
          data-testid='courses-introduction-input'
          editorConfig={{ ...descriptionInput, onChange: descriptionHelpers.setValue }}
          errorMessage={touched.description && errors.description}
          isRequired={false}
          label={t('common.fields.common.description')}
        />
        <SharedFormTextarea label={t('admin.courses.altNames')} name='alternativeTitles' />
      </div>
    </>
  );
}

export default AdminCoursesFormDetails;
