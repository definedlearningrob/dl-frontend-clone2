import { FieldArray, Form } from 'formik';
import { useParams } from 'react-router-dom';
import { times } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { useCheckInsOverviewQuery } from '@graphql/shared/users/hooks';

import { CheckInQuestionSettingsInputs } from '@dc/components/Admin/Tasks/PresentationBuilder/Settings/Elements/CheckInQuestion/CheckInQuestionSettingsInputs';

import { CHECKINS_PER_SLIDE_COUNT } from '@shared/resources/constants';

export const CheckInQuestionSettingsForm = () => {
  const { t } = useTranslation();
  const { taskId, projectId } = useParams<{ taskId: string; projectId: string }>();

  const { data } = useCheckInsOverviewQuery({ variables: { id: taskId || projectId } });

  const checkInQuestions = data?.task?.checkInQuestions;

  if (!checkInQuestions) return <p>{t('presentation.noCheckInQuestionsInTask')}</p>;

  return (
    <Form>
      <FieldArray
        name='checkInItems'
        render={() => (
          <div className='flex flex-col gap-sm'>
            {times(CHECKINS_PER_SLIDE_COUNT, (index) => (
              <CheckInQuestionSettingsInputs key={index} index={index} />
            ))}
          </div>
        )}
      />
    </Form>
  );
};
