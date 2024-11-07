import { gql } from '@apollo/client';

import { EducationalSettingTypes } from '@dc/resources/enums';

export default gql`
  query StudentCourse($id: ID!, $track: Boolean) {
    course(id: $id, track: $track) {
      description
      id
      imageUrl
      lessons {
        careerReviewSurvey {
          performed
          version
        }
        id
        imageUrl
        name
        progress {
          submitted
          total
        }
        step
        type
        thumbnailUrl
      }
      name
      pathway {
        name
      }
      progress {
        submitted
        total
      }
      type
    }
  }
`;

export type TLessonProgress = {
  submitted: number;
  total: number;
};

export type TLessonCareerReviewSurvey = {
  performed: boolean;
};

export type TCourseLesson = {
  careerReviewSurvey: TLessonCareerReviewSurvey;
  id: string;
  imageUrl: string;
  name: string;
  progress: TLessonProgress;
  step: number;
  type: string;
  thumbnailUrl: string;
};

export type TCourseProgress = {
  submitted: number;
  total: number;
};

export type TCoursePathway = {
  name: string;
};

export type TCourse = {
  description: string;
  id: string;
  imageUrl: string;
  lessons: TCourseLesson[];
  name: string;
  pathway: TCoursePathway;
  progress: TCourseProgress;
  type: EducationalSettingTypes;
};

export type TCourseVariables = {
  id: string;
  track: boolean;
};

export type TCourseData = {
  course: TCourse;
};
