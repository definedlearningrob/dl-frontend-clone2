import { ApolloError, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { CREATE_CAREER_REVIEW_SURVEY_ATTEMPT } from '@dc/graphql/student/mutations/createCareerReviewSurveyAttempt';
import { CAREER_REVIEW_SURVEY_ANSWER_CONTEXT_TYPES } from '@dc/resources/enums';
import lessonInCourseQuery from '@dc/graphql/student/queries/lessonInCourse';
import { VIRTUAL_INTERNSHIP_LESSON_QUERY } from '@dc/graphql/student/queries/virtualInternshipLesson';

import { callToast } from '@shared/components/Toaster/Toaster';

type Params = {
  contextType: CAREER_REVIEW_SURVEY_ANSWER_CONTEXT_TYPES;
  contextId: string;
};

export const useCreateCareerReviewSurveyAttempt = () => {
  const [createCareerReviewSurveyAttempt, { loading }] = useMutation(
    CREATE_CAREER_REVIEW_SURVEY_ATTEMPT
  );

  const { t } = useTranslation();

  const { courseId, lessonId, opportunityId } =
    useParams<{ courseId: string; lessonId: string; opportunityId: string }>();

  const createSurveyAttempt = async ({ contextType, contextId }: Params) => {
    const queryToRefetch =
      contextType === CAREER_REVIEW_SURVEY_ANSWER_CONTEXT_TYPES.COURSE
        ? {
            query: lessonInCourseQuery,
            variables: { courseId, lessonId, track: true },
          }
        : {
            query: VIRTUAL_INTERNSHIP_LESSON_QUERY,
            variables: { lessonId, opportunityId, track: true },
          };

    try {
      await createCareerReviewSurveyAttempt({
        variables: {
          input: {
            contextType,
            contextId,
          },
        },
        refetchQueries: [queryToRefetch],
        awaitRefetchQueries: true,
      });

      callToast('info', t('careerReviewSurvey.retakeInfo'));
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        callToast('error', error.message);
      } else {
        callToast('error', t('common.notifications.error.unknown'));
      }
    }
  };

  return [createSurveyAttempt, { loading }] as const;
};
