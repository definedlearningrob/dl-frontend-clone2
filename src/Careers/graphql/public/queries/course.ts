import { gql, TypedDocumentNode } from '@apollo/client';

import { EducationalSettingTypes } from '@dc/resources/enums';

export const PUBLIC_COURSE_QUERY: TypedDocumentNode<TCourseData, TCourseVariables> = gql`
  query PublicCourse($shareId: ID!, $code: String!, $track: Boolean) {
    course(shareId: $shareId, code: $code, track: $track) {
      id
      description
      name
      pathway {
        name
      }
      lessons {
        name
        description {
          audience
          introduction
          goal
          role
          situation
        }
        archivedAt
        assignments {
          description
          displayName
          id
          rubrics {
            criteriaLabels {
              displayName
              id
              score
              uuid
            }
            criterias {
              id
              rubricCriteriaLabelId
              rubricHeadingId
              text
              uuid
            }
            description
            headings {
              id
              multiplier
              name
              uuid
            }
            id
            name
            uuid
          }
          step
        }
        attachments {
          description
          displayName
          files {
            filename
            id
            url
          }
          id
          step
        }
        careerReviewSurvey {
          questions {
            id
          }
        }
        checkInGroups {
          displayName
          id
          name
          questions {
            id
            question
            step
          }
          step
        }
        checkInQuestions {
          id
          question
          step
        }
        externalPresentations {
          displayName
          isExpandable
          id
          source
          step
        }
        hasPresentation
        id
        imageUrl
        name
        researchLinks {
          author
          displayName
          id
          resourceLink
          sourceName
          step
        }
        step
        texts {
          content
          displayName
          id
          step
        }
        thumbnailUrl
        type
        videos {
          description
          displayName
          filename
          id
          step
          url
        }
        vocabularies {
          definition
          id
          step
          term
        }
      }
    }
  }
`;

export type TCourseLessonAssignmentRubric = {
  criteriaLabels: {
    displayName: string;
    id: string;
    score: number;
    uuid: string;
  };
  criterias: {
    id: string;
    rubricCriteriaLabelId: string;
    rubricHeadingId: string;
    text: string;
    uuid: string;
  };
  description: string;
  headings: {
    id: string;
    multiplier: number;
    name: string;
    uuid: string;
  };
  id: string;
  name: string;
};

export type TCourseLessonAssignment = {
  description: string;
  displayName: string;
  id: string;
  rubrics: TCourseLessonAssignmentRubric;
  step: number;
};

export type TCourseLessonAttachment = {
  description: string;
  displayName: string;
  files: {
    filename: string;
    id: string;
    url: string;
  };
  id: string;
  step: number;
};

export type TCourseLessonCareerReviewSurvey = {
  questions: {
    id: string;
    options: {
      option: string;
      step: number;
    };
    question: string;
    type: string;
  };
};

export type TCourseLessonCheckInGroup = {
  displayName: string;
  id: string;
  name: string;
  questions: {
    id: string;
  };
  step: number;
};

export type TCourseLessonCheckInQuestion = {
  id: string;
  question: string;
  step: number;
};

export type TCourseLessonDescription = {
  audience: string;
  goal: string;
  introduction: string;
  role: string;
  situation: string;
};

export type TCourseLessonExternalPresentation = {
  displayName: string;
  description: string;
  id: string;
  isExpandable: boolean;
  source: string;
  step: number;
};

export type TCourseLessonResearchLink = {
  author: string;
  displayName: string;
  id: string;
  resourceLink: string;
  sourceName: string;
  step: number;
};

export type TCourseLessonText = {
  content: string;
  displayName: string;
  id: string;
  step: number;
};

export type TCourseLessonVideo = {
  description: string;
  displayName: string;
  filename: string;
  id: string;
  step: number;
  url: string;
};

export type TCourseLessonVocabulary = {
  definition: string;
  id: string;
  step: number;
  term: string;
};

export type TPublicCourseLesson = {
  archivedAt: string;
  assignments: TCourseLessonAssignment[];
  attachments: TCourseLessonAttachment[];
  careerReviewSurvey: TCourseLessonCareerReviewSurvey;
  checkInGroups: TCourseLessonCheckInGroup[];
  checkInQuestions: TCourseLessonCheckInQuestion[];
  description?: TCourseLessonDescription;
  externalPresentations: TCourseLessonExternalPresentation[];
  hasPresentation?: boolean;
  id: string;
  imageUrl: string;
  name: string;
  researchLinks: TCourseLessonResearchLink[];
  step: number;
  texts: TCourseLessonText[];
  thumbnailUrl: string;
  type: string;
  videos: TCourseLessonVideo[];
  vocabularies: TCourseLessonVocabulary[];
};

export type TCoursePathway = {
  id: string;
  name: string;
};

export type TCourse = {
  description: string;
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  lesson: TPublicCourseLesson;
  lessons: TPublicCourseLesson[];
  name: string;
  pathway: TCoursePathway;
  type: EducationalSettingTypes;
};

export type TCourseVariables = {
  id?: string;
  code: string;
  track?: boolean;
  shareId: string;
};

export type TCourseData = {
  course: TCourse;
};
