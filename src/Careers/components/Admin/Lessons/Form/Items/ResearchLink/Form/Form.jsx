import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import researchLinkLessonsQuery from '@dc/graphql/user/queries/researchLinkLessons';
import { AFFECTED_RESOURCES_FILED } from '@dc/resources/constants';
import { AdminFormWrapper } from '@dc/components/Admin/AdminFormWrapper/AdminFormWrapper';

import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

AdminLessonsFormItemsResearchLinkForm.propTypes = {
  id: PropTypes.string,
  onCancel: PropTypes.func,
  submit: PropTypes.func,
};

function AdminLessonsFormItemsResearchLinkForm({ id, onCancel, submit }) {
  const { t } = useTranslation();
  const { isSubmitting } = useFormikContext();

  return (
    <AdminFormWrapper data-testid='research-link-form'>
      <div className='admin-form__inputs-row'>
        <SharedFormTextInput
          data-testid='research-link-author-input'
          isRequired={true}
          label={t('admin.lessons.items.researchLink.author')}
          name='author'
        />
        <SharedFormTextInput
          data-testid='research-link-name-input'
          isRequired={true}
          label={t('common.fields.common.name')}
          name='name'
        />
      </div>
      <div className='admin-form__inputs-row'>
        <SharedFormTextInput
          data-testid='research-link-display-name-input'
          isRequired={true}
          label={t('common.fields.common.displayName')}
          name='displayName'
        />
        <SharedFormTextInput
          data-testid='research-link-source-name-input'
          isRequired={true}
          label={t('admin.lessons.items.researchLink.sourceName')}
          name='sourceName'
        />
      </div>
      <SharedFormTextInput
        data-testid='research-link-resource-link-input'
        isRequired={true}
        label={t('admin.lessons.items.researchLink.resourceLink')}
        name='resourceLink'
      />

      {id && (
        <AffectedResources
          id={id}
          query={researchLinkLessonsQuery}
          resourcesField={AFFECTED_RESOURCES_FILED.LESSONS}
        />
      )}
      <div className='flex gap-sm justify-end w-full mt-sm'>
        <SharedButton
          data-testid='research-link-form-cancel'
          isLoading={isSubmitting}
          minWidth='lg'
          variant='primary-outlined'
          onClick={onCancel}>
          {t('common.actions.cancel')}
        </SharedButton>
        <SharedButton
          data-testid='lesson-item-form-submit'
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

export default AdminLessonsFormItemsResearchLinkForm;
