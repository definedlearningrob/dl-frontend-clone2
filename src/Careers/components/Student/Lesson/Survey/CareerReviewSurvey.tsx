import { Formik } from 'formik';
import { castArray, isEmpty, map } from 'lodash-es';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ApolloError } from '@apollo/client';

import { ReactComponent as TableOfContentIcon } from '@dc/svg/table_of_content.svg';
import { SurveyForm } from '@dc/components/Student/Lesson/Survey/Form/SurveyForm';
import { OPPORTUNITY_QUERY } from '@dc/graphql/student/queries/opportunity';
import { VIRTUAL_INTERNSHIP_CONTENT_QUERY } from '@dc/graphql/student/queries/virtualInternshipContent';
import currentCoursesQuery from '@dc/graphql/student/queries/currentCourses';
import { useCreateCareerReviewSurveyAnswers } from '@dc/graphql/student/hooks/useCreateCareerReviewSurveyAnswers';
import { CAREER_REVIEW_SURVEY_ANSWER_CONTEXT_TYPES } from '@dc/resources/enums';
import { SurveySummary } from '@dc/components/Student/Lesson/Survey/SurveySummary';
import { TCareerReviewSurvey } from '@dc/components/Student/Lesson/types';
import { RetakeConfirmationModal } from '@dc/components/Student/Lesson/Survey/RetakeConfirmationModal/RetakeConfirmationModal';

import { ReactComponent as RefreshIcon } from '@shared/svg/refresh.svg';
import { ReactComponent as EyeIcon } from '@shared/svg/eye.svg';
import SharedButton from '@shared/components/Button/Button';
import { callToast } from '@shared/components/Toaster/Toaster';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';
import { useToggle } from '@shared/hooks/useToggle';
import { PartiallyOptional } from '@shared/utils/types';

import Card from '../shared/Card/Card';

type Props = {
  careerReviewSurvey: PartiallyOptional<TCareerReviewSurvey, 'performed' | 'version'> | null;
  courseName: string;
  previousItemsCompleted?: boolean;
  previewOnly?: boolean;
  resourceId: string;
};

export type SurveyFormType = Record<
  string,
  {
    answers: string[] | string;
    otherAnswer: string;
  }
>;

export const CareerReviewSurvey = ({
  careerReviewSurvey,
  courseName,
  resourceId,
  previewOnly,
  previousItemsCompleted,
}: Props) => {
  const { courseId, opportunityId } = useParams<{ courseId: string; opportunityId: string }>();
  const history = useHistory();
  const { t } = useTranslation();
  const [isRetakeConfirmationModalOpen, toggleIsRetakeConfirmationModalOpen] = useToggle(false);

  if (!careerReviewSurvey) return null;

  const { questions } = careerReviewSurvey;

  const virtualInternshipRefetchQueries = [
    { query: OPPORTUNITY_QUERY, variables: { id: opportunityId } },
    { query: VIRTUAL_INTERNSHIP_CONTENT_QUERY, variables: { opportunityId } },
  ];

  const courseRefetchQuery = [{ query: currentCoursesQuery }];

  const refetchQueries = courseId ? courseRefetchQuery : virtualInternshipRefetchQueries;

  const [createCareerReviewSurveyAnswers, { loading }] = useCreateCareerReviewSurveyAnswers({
    refetchQueries,
  });

  const initialValues: SurveyFormType = questions.reduce((acc, { id, type }) => {
    const answers = type === 'single_choice' ? '' : [];

    return { ...acc, [id]: { answers, otherAnswer: '' } };
  }, {});

  const onSuccess = () => {
    if (previousItemsCompleted) {
      const location = courseId
        ? {
            pathname: `/courses/${courseId}/complete`,
            state: { courseName },
          }
        : `/opportunities/${opportunityId}/virtual-internship`;

      history.push(location);
    } else {
      history.goBack();
    }
  };

  const handleSubmit = (values: SurveyFormType) => {
    const hasAllAnswers = Object.values(values).every((question) => {
      const hasAnyAnswers = question.answers.length > 0;

      if (question.answers.includes('Other')) {
        return hasAnyAnswers && !isEmpty(question.otherAnswer);
      }

      return hasAnyAnswers;
    });

    if (!hasAllAnswers) {
      callToast('error', t('careerReviewSurvey.notAllAnswersNotification'));

      return;
    }

    const payload = map(values, (question, questionId) => {
      let answers = castArray(question.answers).filter((answer) => answer !== 'Other');

      if (question.answers.includes('Other') && !isEmpty(question?.otherAnswer)) {
        answers.push(question?.otherAnswer);
      }

      return {
        answer: answers,
        questionId: String(questionId),
      };
    });

    const context = courseId ? 'COURSE' : 'VIRTUAL_INTERNSHIP';

    createCareerReviewSurveyAnswers({
      contextId: resourceId,
      contextType: CAREER_REVIEW_SURVEY_ANSWER_CONTEXT_TYPES[context],
      answers: payload,
    })
      .then(() => {
        callToast('success', t('careerReviewSurvey.completedSuccessfullyNotification'));
        onSuccess();
      })
      .catch((e) => {
        if (e instanceof ApolloError) callToast('error', e.message);
      });
  };

  const summaryMode = careerReviewSurvey.performed;

  const retakeAvailable = summaryMode && !previewOnly;

  const contextType = history.location.pathname.includes('virtual-internship')
    ? CAREER_REVIEW_SURVEY_ANSWER_CONTEXT_TYPES.VIRTUAL_INTERNSHIP
    : CAREER_REVIEW_SURVEY_ANSWER_CONTEXT_TYPES.COURSE;

  return (
    <div className='flex flex-col gap-base xxxl:gap-md'>
      <Card className='!mb-0'>
        <div className='flex justify-between items-center mb-md'>
          <div className='flex w-full'>
            <IconContainer
              Icon={TableOfContentIcon}
              className='bg-primary-200 rounded-sm mr-sm text-primary-500'
            />
            <div className='text-800 border-l-2 border-neutral-200 pl-sm'>
              <span className='leading-lg text-xs'>{courseName}</span>
              <h5 className='leading-lg text-sm mb-0'>{t('careerReviewSurvey.surveyTitle')}</h5>
            </div>
            {retakeAvailable && (
              <SharedButton
                Icon={RefreshIcon}
                className='ms-auto'
                iconPlacement='start'
                variant='primary-outlined'
                onClick={toggleIsRetakeConfirmationModalOpen}>
                {t('careerReviewSurvey.retake')}
              </SharedButton>
            )}
          </div>
          {previewOnly && (
            <div className='py-xxs px-xs border border-secondary-500 rounded-full min-w-fit'>
              <Tooltip
                message={t('careerReviewSurvey.surveyPreviewModeInfo')}
                side='bottom'
                sideOffset={8}>
                <div className='flex items-center text-secondary-500 font-medium'>
                  <IconContainer Icon={EyeIcon} className='mr-xxs' paddingSize='none' size='sm' />
                  <p className='mb-0 leading-lg'>{t('careerReviewSurvey.surveyPreviewMode')}</p>
                </div>
              </Tooltip>
            </div>
          )}
        </div>
        {summaryMode && <SurveySummary questions={questions} />}
        {!summaryMode && (
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <SurveyForm
              isSaving={loading}
              previewOnly={previewOnly}
              questions={questions}
              version={careerReviewSurvey.version}
            />
          </Formik>
        )}
      </Card>
      {summaryMode && (
        <SharedButton className='ml-auto' variant='primary' onClick={onSuccess}>
          {previousItemsCompleted
            ? t('careerReviewSurvey.endCourse')
            : t('careerReviewSurvey.exitSurvey')}
        </SharedButton>
      )}
      {retakeAvailable && (
        <RetakeConfirmationModal
          contextId={resourceId}
          contextType={contextType}
          isOpen={isRetakeConfirmationModalOpen}
          onDismiss={toggleIsRetakeConfirmationModalOpen}
        />
      )}
    </div>
  );
};
