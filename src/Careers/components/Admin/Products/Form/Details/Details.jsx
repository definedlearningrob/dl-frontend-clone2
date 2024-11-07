import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import { PUBLISHING_STATUSES } from '@dc/resources/constants';
import { shapeProductForm } from '@dc/resources/typeDefs';

import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import { Select } from '@shared/components/Select';

AdminProductsFormDetails.propTypes = {
  ...shapeProductForm,
};

function AdminProductsFormDetails({ errors, touched }) {
  const [statusInput, , statusHelpers] = useField('status');
  const [descriptionInput, , descriptionHelpers] = useField('description');
  const { t } = useTranslation();

  const productStatusOptions = [
    { value: PUBLISHING_STATUSES.DRAFT, label: t('common.publishingStatuses.draft') },
    { value: PUBLISHING_STATUSES.PUBLISHED, label: t('common.publishingStatuses.published') },
  ];

  return (
    <>
      <div className='flex flex-col gap-sm'>
        <div className='flex gap-base'>
          <SharedFormTextInput
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
        <div className='flex flex-col gap-sm'>
          <SharedFormTextInput
            isRequired={false}
            label={t('common.fields.product.rubricsUrl')}
            name='rubricsUrl'
          />
          <Select
            {...statusInput}
            errorMessage={touched.status && errors.status}
            isRequired={true}
            label={t('common.fields.common.status')}
            menuPortalTarget={document.body}
            options={productStatusOptions}
            onChange={statusHelpers.setValue}
          />
        </div>
      </div>
      <SharedTextEditor
        editorConfig={{ ...descriptionInput, onChange: descriptionHelpers.setValue }}
        errorMessage={touched.description && errors.description}
        label={t('common.fields.common.description')}
      />
    </>
  );
}

export default AdminProductsFormDetails;
