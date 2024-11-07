import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import vocabularyLessonsQuery from '@dc/graphql/user/queries/vocabularyLessons';
import { AFFECTED_RESOURCES_FILED } from '@dc/resources/constants';

import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';

AdminLessonsFormItemsVocabularyForm.propTypes = {
  errors: PropTypes.shape({
    definition: PropTypes.string,
    term: PropTypes.string,
  }),
  id: PropTypes.string,
  onCancel: PropTypes.func,
  submit: PropTypes.func,
  touched: PropTypes.shape({
    definition: PropTypes.bool,
    term: PropTypes.bool,
  }),
};

function AdminLessonsFormItemsVocabularyForm({ id, errors, touched, onCancel, submit }) {
  const [definitionInput, , definitionHelpers] = useField('definition');
  const { t } = useTranslation();
  const { isSubmitting } = useFormikContext();

  return (
    <div className='admin-form' data-testid='lesson-item-form'>
      <div className='flex flex-col gap-sm'>
        <SharedFormTextInput
          data-testid='vocabulary-term-input'
          isRequired={true}
          label={t('admin.lessons.items.vocabulary.term')}
          name='term'
        />
        <SharedTextEditor
          data-testid='vocabxulary-definition-input'
          editorConfig={{ ...definitionInput, onChange: definitionHelpers.setValue }}
          errorMessage={touched.definition && errors.definition}
          isRequired={true}
          label={t('admin.lessons.items.vocabulary.definition')}
        />
      </div>
      {id && (
        <AffectedResources
          id={id}
          query={vocabularyLessonsQuery}
          resourcesField={AFFECTED_RESOURCES_FILED.LESSONS}
        />
      )}
      <div className='flex gap-sm justify-end w-full mt-sm'>
        <SharedButton
          data-testid='lesson-item-form-cancel'
          isLoading={isSubmitting}
          minWidth='lg'
          type='button'
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
    </div>
  );
}

export default AdminLessonsFormItemsVocabularyForm;
