import { useQuery } from '@apollo/client';

import { CAREER_REVIEW_SURVEY_LESSON } from '@dc/graphql/user/queries/careerReviewSurveyLesson';

export const useCareerReviewSurveyLessonQuery = () => useQuery(CAREER_REVIEW_SURVEY_LESSON);
