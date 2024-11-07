import { ApolloError } from '@apollo/client';
import { useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import {
  FormsInitialData,
  parseUsedFormData,
  useFormSave,
} from '@dc/screens/UserApp/TestForms/forms';
import { JsonForm } from '@dc/screens/UserApp/TestForms/JsonForm/JsonForm';
import { useSubmitQuestions } from '@dc/screens/UserApp/TestForms/useSubmitQuestions';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

import SharedButton from '@shared/components/Button/Button';
import { callToast } from '@shared/components/Toaster/Toaster';

import {
  counselorOptionalReport2FormRawQuestions,
  counselorOptionalReport2FormSchema,
  counselorOptionalReport2FormUiSchema,
} from './CounselorOptionalReport2Schemas';
import styles from './CounselorOptionalReport2.module.sass';

type Props = {
  initialData: FormsInitialData;
};
export const CounselorOptionalReport2Form = (props: Props) => {
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { t } = useTranslation();
  const formRef = useRef(null);
  const { saveForm, extraErrors, isSaving } = useFormSave<
    typeof counselorOptionalReport2FormSchema
  >({
    formType: COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT_2,
    formRef,
  });
  const [submit, { loading: isSubmitting }] = useSubmitQuestions();
  const [formData, setFormData] = useState(props.initialData);
  const history = useHistory();

  const onSave = async () => {
    const parsedFormData = parseUsedFormData(
      formRef,
      counselorOptionalReport2FormSchema,
      counselorOptionalReport2FormRawQuestions
    );

    return saveForm(parsedFormData);
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
            type: COMMON_APP_FORM_TYPES.COUNSELOR_OPTIONAL_REPORT_2,
            studentUuid,
          },
        },
      });
      callToast('success', 'Form submitted successfully');
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
    <SharedButton id='form-save-button' type='button' variant='primary-outlined' onClick={onSave}>
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
    <div className={styles.formWrapper}>
      <JsonForm
        actions={actions}
        additionalActions={additionalActions}
        extraErrors={extraErrors}
        formData={formData}
        formRef={formRef}
        isSubmitDisabled={isSaving || isSubmitting}
        schema={counselorOptionalReport2FormSchema}
        uiSchema={counselorOptionalReport2FormUiSchema}
        onChange={(data) => {
          setFormData(data.formData);
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};
