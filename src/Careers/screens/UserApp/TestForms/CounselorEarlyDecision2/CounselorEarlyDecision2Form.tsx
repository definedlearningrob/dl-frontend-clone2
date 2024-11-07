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
import { Select, SelectOption } from '@shared/components/Select';

import {
  counselorEarlyDecision2FormSchema,
  counselorEarlyDecision2FormUiSchema,
  counselorEarlyDecisionForm2RawQuestions,
} from './CounselorEarlyDecision2Schemas';
import styles from './CounselorEarlyDecision2.module.sass';

type Props = {
  initialData: FormsInitialData;
  institutions: SelectOption[];
};

export const CounselorEarlyDecision2Form = (props: Props) => {
  const { studentUuid } = useParams<{ studentUuid: string }>();
  const { t } = useTranslation();
  const formRef = useRef(null);
  const { saveForm, extraErrors, isSaving } = useFormSave<typeof counselorEarlyDecision2FormSchema>(
    {
      formType: COMMON_APP_FORM_TYPES.COUNSELOR_EARLY_DECISION_2,
      formRef,
    }
  );
  const [submit, { loading: isSubmitting }] = useSubmitQuestions();
  const [formData, setFormData] = useState(props.initialData);
  const [institution, setInstitution] = useState<string>();
  const history = useHistory();

  const onSave = async () => {
    const parsedFormData = parseUsedFormData(
      formRef,
      counselorEarlyDecision2FormSchema,
      counselorEarlyDecisionForm2RawQuestions
    );

    return saveForm(parsedFormData);
  };

  const onSubmit = async () => {
    const response = await onSave();

    if (!institution) {
      callToast(
        'error',
        t('user.postSecondary.commonAppForms.error.savedButMissingInstitutionError')
      );

      return;
    }

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
            type: COMMON_APP_FORM_TYPES.COUNSELOR_EARLY_DECISION_2,
            studentUuid,
            institutionId: institution,
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
    <div className={styles.formWrapper}>
      <Select
        label={t('user.postSecondary.commonAppForms.error.formNotValidError')}
        name='Label'
        options={props.institutions}
        onChange={(e) => setInstitution(e?.value as string)}
      />
      <JsonForm
        actions={actions}
        additionalActions={additionalActions}
        extraErrors={extraErrors}
        formData={formData}
        formRef={formRef}
        isSubmitDisabled={isSaving || isSubmitting}
        schema={counselorEarlyDecision2FormSchema}
        uiSchema={counselorEarlyDecision2FormUiSchema}
        onChange={(data) => {
          setFormData(data.formData);
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};
