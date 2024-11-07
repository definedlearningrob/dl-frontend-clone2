import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import AffectedResources from '@dc/components/Admin/Shared/AffectedResources/AffectedResources';
import assignmentLessonsQuery from '@dc/graphql/user/queries/assignmentLessons';
import FilterProvider from '@dc/components/Admin/Lessons/Form/Items/Shared/FilterProvider/FilterProvider';
import Rubrics from '@dc/components/Admin/Products/Form/Rubrics/Rubrics';
import { RUBRICS } from '@dc/graphql/user/queries/rubrics';
import SharedFormDivider from '@dc/shared/FormDivider/FormDivider';
import SharedTextEditor from '@dc/shared/TextEditor/TextEditor';
import useScrollToInvalidFormElement from '@dc/hooks/useScrollToInvalidFormElement';
import { AFFECTED_RESOURCES_FILED, ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { BadgesSelector } from '@dc/components/Admin/BadgeManagement/BadgesSelector/BadgesSelector';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedButton from '@shared/components/Button/Button';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import { useToggle } from '@shared/hooks/useToggle';
import Card from '@shared/components/Card/Card';

AdminLessonsFormItemsAssignmentForm.propTypes = {
  errors: PropTypes.shape({
    assetName: PropTypes.string,
    description: PropTypes.string,
    displayName: PropTypes.string,
  }),
  id: PropTypes.string,
  onCancel: PropTypes.func,
  submit: PropTypes.func,
  touched: PropTypes.shape({
    assetName: PropTypes.bool,
    description: PropTypes.bool,
    displayName: PropTypes.bool,
  }),
};

function AdminLessonsFormItemsAssignmentForm({ errors, id, touched, onCancel, submit }) {
  const [descriptionInput, , descriptionHelpers] = useField('description');
  const { t } = useTranslation();
  const { isSubmitting } = useFormikContext();
  const [isWithCopies, toggleIsWithCopies] = useToggle(false);

  useScrollToInvalidFormElement();

  return (
    <div className='admin-form' data-testid='assignment-form'>
      <div className='admin-form__inputs-row mb-sm'>
        <SharedFormTextInput
          data-testid='assignment-name-input'
          isRequired={true}
          label={t('common.fields.common.name')}
          name='assetName'
        />
        <SharedFormTextInput
          data-testid='assignment-display-name-input'
          isRequired={true}
          label={t('common.fields.common.displayName')}
          name='displayName'
        />
      </div>
      <SharedTextEditor
        data-testid='assignment-description-input'
        editorConfig={{ ...descriptionInput, onChange: descriptionHelpers.setValue }}
        errorMessage={touched.description && errors.description}
        isRequired={true}
        label={t('common.fields.common.description')}
      />
      <SharedFormDivider />
      <FilterProvider omitUrl={true}>
        {({ SearchBar, filter }) => {
          const variables = useMemo(
            () => ({
              filter,
              scope: ARCHIVABLE_STATUSES.ACTIVE.value,
              withCopies: isWithCopies,
            }),
            [filter, isWithCopies]
          );

          return (
            <SharedPaginatedLoader
              omitUrl={true}
              options={{
                variables,
              }}
              query={RUBRICS}>
              {(props) => (
                <Rubrics
                  SearchBar={SearchBar}
                  isWithCopies={isWithCopies}
                  pagingProps={props}
                  toggleIsWithCopies={toggleIsWithCopies}
                />
              )}
            </SharedPaginatedLoader>
          );
        }}
      </FilterProvider>
      <Card>
        <BadgesSelector />
      </Card>

      {id && (
        <AffectedResources
          id={id}
          query={assignmentLessonsQuery}
          resourcesField={AFFECTED_RESOURCES_FILED.LESSONS}
        />
      )}

      <div className='flex gap-sm justify-end mt-base'>
        <SharedButton
          data-testid='assignment-form-cancel'
          isLoading={isSubmitting}
          minWidth='lg'
          variant='primary-outlined'
          onClick={onCancel}>
          {t('common.actions.cancel')}
        </SharedButton>
        <SharedButton
          data-testid='assignment-form-submit'
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

export default AdminLessonsFormItemsAssignmentForm;
