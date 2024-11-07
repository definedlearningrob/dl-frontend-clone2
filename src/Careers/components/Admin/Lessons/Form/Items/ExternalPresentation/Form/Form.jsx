import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import externalPresentationLessonsQuery from '@dc/graphql/user/queries/externalPresentationLessons';
import { AFFECTED_RESOURCES_FILED } from '@dc/resources/constants';
import { AdminFormWrapper } from '@dc/components/Admin/AdminFormWrapper/AdminFormWrapper';

import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import Switch from '@shared/components/Switch/Switch';

AdminLessonsFormItemsExternalPresentationForm.propTypes = {
  id: PropTypes.string,
  onCancel: PropTypes.func,
  submit: PropTypes.func,
};

function AdminLessonsFormItemsExternalPresentationForm({ id, onCancel, submit }) {
  const { t } = useTranslation();
  const { isSubmitting, values, setFieldValue } = useFormikContext();

  return (
    <AdminFormWrapper data-testid='presentation-form'>
      <div className='flex gap-sm'>
        <SharedFormTextInput
          data-testid='presentation-name-input'
          isRequired={true}
          label={t('common.fields.common.name')}
          name='name'
        />
        <SharedFormTextInput
          data-testid='presentation-display-name-input'
          isRequired={true}
          label={t('common.fields.common.displayName')}
          name='displayName'
        />
      </div>
      <SharedFormTextInput
        data-testid='presentation-source-input'
        isRequired={true}
        label={t('admin.lessons.items.presentation.source')}
        name='source'
        type='url'
      />

      <Switch
        additionalLabel={t('admin.lessons.items.presentation.expandable')}
        name='isExpandable'
        value={values.isExpandable}
        onChange={() => setFieldValue('isExpandable', !values.isExpandable)}
      />
      {id && (
        <AffectedResources
          id={id}
          query={externalPresentationLessonsQuery}
          resourcesField={AFFECTED_RESOURCES_FILED.LESSONS}
        />
      )}
      <div className='flex gap-sm justify-end w-full mt-sm'>
        <SharedButton
          data-testid='presentation-form-cancel'
          isLoading={isSubmitting}
          minWidth='lg'
          variant='primary-outlined'
          onClick={onCancel}>
          {t('common.actions.cancel')}
        </SharedButton>
        <SharedButton
          data-testid='presentation-form-submit'
          isLoading={isSubmitting}
          minWidth='lg'
          value='Save'
          variant='primary'
          onClick={submit}>
          {t('common.actions.save')}
        </SharedButton>
      </div>
    </AdminFormWrapper>
  );
}

export default AdminLessonsFormItemsExternalPresentationForm;
