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
  teacherProfileRawQuestions,
  teacherQuestionsSchema,
  teacherQuestionsUISchema,
} from '@dc/screens/UserApp/TestForms/TeacherProfile/TeacherProfileSchemas';
import { JsonForm } from '@dc/screens/UserApp/TestForms/JsonForm/JsonForm';
import { COMMON_APP_FORM_TYPES } from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';
import useUserInfo from '@dc/hooks/useUserInfo';
import { RECOMMENDATION_REQUEST_QUERY } from '@dc/graphql/user/queries/recommendationRequest';

import SharedButton from '@shared/components/Button/Button';

type Props = {
  initialData: FormsInitialData;
};

export const TeacherProfileForm = (props: Props) => {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const client = useApolloClient();
  const { userInfo } = useUserInfo();
  const { saveForm, extraErrors, isSaving } = useFormSave<typeof teacherQuestionsSchema>({
    formType: COMMON_APP_FORM_TYPES.TEACHER_PROFILE,
    formRef,
    refetchQueries: [RECOMMENDATION_REQUEST_QUERY],
  });
  const [formData, setFormData] = useState(props.initialData);
  const history = useHistory();

  const onSave = async () => {
    const parsedFormData = parseUsedFormData(
      formRef,
      teacherQuestionsSchema,
      teacherProfileRawQuestions
    );

    return saveForm(parsedFormData)
      ?.then(() => {
        client.cache.modify({
          id: client.cache.identify({ uuid: userInfo.uuid, __typename: 'UserInfo' }),
          fields: {
            commonAppData: (cached) => ({ ...cached, hasTeacherProfileFormCompleted: true }),
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
    <div className='mb-sm'>
      <JsonForm
        additionalActions={additionalActions}
        extraErrors={extraErrors}
        formData={formData}
        formRef={formRef}
        isSubmitDisabled={isSaving}
        schema={teacherQuestionsSchema}
        uiSchema={teacherQuestionsUISchema}
        onChange={(data) => {
          setFormData(data.formData);
        }}
        onSubmit={onSave}
      />
    </div>
  );
};
