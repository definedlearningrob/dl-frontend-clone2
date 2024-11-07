import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';

import {
  FormsInitialData,
  parseUsedFormData,
  useFormSave,
} from '@dc/screens/UserApp/TestForms/forms';
import {
  counselorProfileRawQuestions,
  counselorProfileSchema,
  counselorProfileUiSchema,
} from '@dc/screens/UserApp/TestForms/CounselorProfile/CounselorProfileSchemas';
import { JsonForm } from '@dc/screens/UserApp/TestForms/JsonForm/JsonForm';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';
import useUserInfo from '@dc/hooks/useUserInfo';
import { RECOMMENDATION_REQUEST_QUERY } from '@dc/graphql/user/queries/recommendationRequest';

import SharedButton from '@shared/components/Button/Button';

import styles from './CounselorProfile.module.sass';

type Props = {
  initialData: FormsInitialData;
};

export const CounselorProfileForm = (props: Props) => {
  const { t } = useTranslation();
  const client = useApolloClient();
  const { userInfo } = useUserInfo();

  const [formData, setFormData] = useState(props.initialData);
  const formRef = useRef(null);
  const history = useHistory();
  const { saveForm, extraErrors, isSaving } = useFormSave<typeof counselorProfileSchema>({
    formType: COMMON_APP_FORM_TYPES.COUNSELOR_PROFILE,
    formRef,
    refetchQueries: [RECOMMENDATION_REQUEST_QUERY],
  });

  const onSave = async () => {
    const parsedFormData = parseUsedFormData(
      formRef,
      counselorProfileSchema,
      counselorProfileRawQuestions
    );

    return saveForm(parsedFormData)!
      .then(() => {
        client.cache.modify({
          id: client.cache.identify({ uuid: userInfo.uuid, __typename: 'UserInfo' }),
          fields: {
            commonAppData: (cached) => ({ ...cached, hasCounselorProfileFormCompleted: true }),
          },
        });
      })
      .then(() => {
        history.goBack();
      });
  };

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
        additionalActions={additionalActions}
        extraErrors={extraErrors}
        formData={formData}
        formRef={formRef}
        isSubmitDisabled={isSaving}
        schema={counselorProfileSchema}
        uiSchema={counselorProfileUiSchema}
        onChange={(data) => {
          setFormData(data.formData);
        }}
        onSubmit={onSave}
      />
    </div>
  );
};
