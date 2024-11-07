import * as Yup from 'yup';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { GraphQLError } from 'graphql';
import { useParams } from 'react-router-dom';
import { useToggle } from 'react-use';
import { isEmpty } from 'lodash-es';

import { CheckInQuestionForm } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/CheckInQuestion/CheckInQuestionForm/CheckInQuestionForm';
import { TeamSubmissionsModal } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/CheckInQuestion/TeamSubmissionsModal';
import { useProjectIsAssigned } from '@dc/components/Admin/Tasks/PresentationBuilder/Template/CheckInQuestion/hooks/useProjectIsAssigned';

import useUserInfo from '@pbl/hooks/useUserInfo';
import { useSubmitCheckInQuestionAnswer } from '@pbl/hooks/useSubmitCheckInQuestionAnswer';

import { TCheckInQuestion } from '@shared/components/CheckIns/types';
import { TCurrentUserInfo } from '@shared/components/Portfolio/types';
import { getFormErrors } from '@shared/utils/graphql';
import { useRole } from '@shared/hooks/useRole';

import { CheckInQuestionHeader } from './CheckInQuestionHeader';
import { CheckInQuestionFormStatus } from './CheckInQuestionFormStatus/CheckInQuestionFormStatus';

type Props = {
  checkInQuestion: TCheckInQuestion;
  hideAllSubmissionsButton?: boolean;
};

type FormValues = {
  id?: string;
  answer: string;
};

export const CheckInQuestion = ({ checkInQuestion, hideAllSubmissionsButton }: Props) => {
  const { t } = useTranslation();

  const { userInfo } = useUserInfo<TCurrentUserInfo>();
  const [isTeamSubmissionsModalOpen, toggleTeamSubmissionsModal] = useToggle(false);
  const { teamId } = useParams<{ teamId: string }>();
  const { isStudent } = useRole();

  const projectIsAssigned = useProjectIsAssigned();

  const [submitCheckInAnswer] = useSubmitCheckInQuestionAnswer({
    checkInQuestion,
  });

  const { answer, teamSubmission } = checkInQuestion;

  const validationSchema = Yup.object().shape({
    answer: Yup.string().trim().required(t('validation.messages.required')),
  });

  const initialValues = useMemo(() => {
    const initialAnswer = teamId
      ? teamSubmission?.answers.find((answer) => answer.student.uuid === userInfo?.uuid)
      : answer;

    if (initialAnswer) {
      return {
        id: initialAnswer.id,
        answer: initialAnswer.answer,
      };
    }

    return { answer: '' };
  }, [teamId, teamSubmission, answer]);

  const handleOnSubmit = async (values: FormValues, actions: { setErrors?: Function }) => {
    const { setErrors } = actions;

    if (values.answer === initialValues.answer) {
      return;
    }

    try {
      submitCheckInAnswer(values);
    } catch (error) {
      const errors = getFormErrors(error as { graphQLErrors: GraphQLError[] });
      setErrors && setErrors(errors);
    }
  };

  const shouldShowTeamSubmissionsModal =
    teamId && !isEmpty(teamSubmission) && isTeamSubmissionsModalOpen && userInfo;

  const properAnswer = useMemo(
    () => (teamId ? teamSubmission : answer),
    [answer, teamId, teamSubmission]
  );

  return (
    <div>
      <div className='flex gap-sm justify-between mb-sm'>
        <CheckInQuestionHeader checkInQuestion={checkInQuestion} />
        {isStudent && projectIsAssigned && (
          <div className='text-neutral-800 text-left flex items-start'>
            <CheckInQuestionFormStatus answer={properAnswer} showAnswersCount={true} />
          </div>
        )}
      </div>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleOnSubmit(values, actions)}>
          <CheckInQuestionForm
            answer={properAnswer}
            canSubmit={teamSubmission && teamSubmission.canSubmit}
            hideAllSubmissionsButton={hideAllSubmissionsButton}
            toggleTeamSubmissionsModal={toggleTeamSubmissionsModal}
          />
        </Formik>
        {shouldShowTeamSubmissionsModal && (
          <TeamSubmissionsModal
            teamSubmission={teamSubmission}
            toggleTeamSubmissionsModal={toggleTeamSubmissionsModal}
            userUuid={userInfo?.uuid}
          />
        )}
      </div>
    </div>
  );
};
