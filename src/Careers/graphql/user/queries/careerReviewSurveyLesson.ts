import { gql, TypedDocumentNode } from '@apollo/client';

export const CAREER_REVIEW_SURVEY_LESSON: TypedDocumentNode<
  TCareerReviewSurveyLessonData,
  null
> = gql`
  query CareerReviewSurveyLesson {
    careerReviewSurveyLesson {
      archivedAt
      id
      imageUrl
      name
      type
    }
  }
`;

export type TCareerReviewSurveyLessonData = {
  careerReviewSurveyLesson: TCareerReviewSurveyLesson;
};

export type TCareerReviewSurveyLesson = {
  archivedAt: string;
  id: string;
  imageUrl: string;
  name: string;
  type: string;
};
