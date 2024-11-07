import { useRef, useState } from 'react';
import { ApolloError } from '@apollo/client';
import { isEmpty, omit } from 'lodash-es';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  FormsInitialData,
  parseUsedFormData,
  useFormSave,
} from '@dc/screens/UserApp/TestForms/forms';
import {
  teacherEvaluationRawQuestions,
  teQuestionsSchema,
  teQuestionsUISchema,
} from '@dc/screens/UserApp/TestForms/TeQuestions/TeQuestionsSchemas';
import { JsonForm } from '@dc/screens/UserApp/TestForms/JsonForm/JsonForm';
import { useSubmitQuestions } from '@dc/screens/UserApp/TestForms/useSubmitQuestions';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

import SharedButton from '@shared/components/Button/Button';
import { callToast } from '@shared/components/Toaster/Toaster';

type Props = {
  initialData: FormsInitialData;
};

const neededQuestionsFromPreviousForm = [1397];

export const TeQuestionsForm = (props: Props) => {
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { t } = useTranslation();
  const formRef = useRef(null);

  const history = useHistory();
  const [formData, setFormData] = useState(props.initialData);
  const [submit, { loading: isSubmitting }] = useSubmitQuestions();
  const { saveForm, extraErrors, isSaving } = useFormSave<typeof teQuestionsSchema>({
    formType: COMMON_APP_FORM_TYPES.TEACHER_RECOMMENDATION,
    formRef,
  });

  const onSave = async () => {
    const formData = parseUsedFormData(formRef, teQuestionsSchema, teacherEvaluationRawQuestions);
    const filteredFormData = omit(formData, neededQuestionsFromPreviousForm) as FormData;

    return saveForm(filteredFormData);
  };

  const onSubmit = async () => {
    const response = await onSave();

    if (!response?.data) {
      return;
    }

    const data = response.data.saveCommonAppFormResponses;
    const hasAnyError =
      !isEmpty(response.errors) ||
      data.errorCode ||
      !isEmpty(data.incompleteResponses) ||
      !isEmpty(data.invalidResponses);

    if (hasAnyError) {
      callToast('error', t('user.postSecondary.commonAppForms.error.formNotValidError'));

      return;
    }

    try {
      await submit({
        variables: {
          input: {
            type: COMMON_APP_FORM_TYPES.TEACHER_RECOMMENDATION,
            studentUuid,
          },
        },
      });
      history.goBack();
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.error.unknown'));
      }
    }
  };

  const actions = (
    <SharedButton
      disabled={isSaving}
      id='form-save-button'
      type='button'
      variant='primary-outlined'
      onClick={onSave}>
      {t('common.actions.save')}
    </SharedButton>
  );

  const additionalActions = (
    <SharedButton
      id='form-back-button'
      type='button'
      variant='primary-outlined'
      onClick={() => history.goBack()}>
      {t('common.actions.back')}
    </SharedButton>
  );

  return (
    <div>
      <JsonForm
        actions={actions}
        additionalActions={additionalActions}
        extraErrors={extraErrors}
        formData={formData}
        formRef={formRef}
        isSubmitDisabled={isSaving || isSubmitting}
        schema={teQuestionsSchema}
        uiSchema={teQuestionsUISchema}
        onChange={(data) => {
          setFormData(data.formData);
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};
