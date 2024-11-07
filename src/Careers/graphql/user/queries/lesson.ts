import { gql } from '@apollo/client';

import { TCareerReviewSurveyQuestion } from '@dc/resources/types';

export default gql`
  query Lesson($id: ID!, $track: Boolean) {
    lesson(id: $id, track: $track) {
      archivedAt
      badges {
        id
        name
        imageUrl
      }
      assignments {
        assetName
        name: assetName
        description
        displayName
        id
        rubrics {
          criteriaLabels {
            displayName
            id
            score
          }
          criterias {
            id
            rubricCriteriaLabelId
            rubricHeadingId
            text
          }
          description
          headings {
            id
            multiplier
            name
          }
          id
          name
          description
          hasAlignedStatements
        }
        step
      }
      attachments {
        description
        displayName
        files {
          filename
          id
          url(options: { responseContentDisposition: "attachment" })
        }
        id
        name
        step
      }
      checkInQuestions {
        id
        question
        step
      }
      checkInGroups {
        displayName
        id
        name
        questions {
          id
          question
        }
        step
      }
      description {
        introduction
        goal
        role
        audience
        situation
      }
      hasPresentation
      id
      imageUrl
      name
      externalPresentations {
        displayName
        isExpandable
        id
        name
        source
        step
      }
      researchLinks {
        author
        displayName
        id
        name
        resourceLink
        sourceName
        step
      }
      texts {
        content
        displayName
        id
        name
        step
      }
      thumbnailUrl
      type
      videos {
        description
        displayName
        filename
        id
        name
        url
        step
      }
      vocabularies {
        definition
        id
        step
        term
        name: term
      }
      careerReviewSurvey {
        questions {
          answer
          id
          options {
            option
            step
          }
          question
          type
        }
      }
    }
  }
`;

export type TLessonVariables = {
  id: string;
  track: boolean;
};

type TRubricHeading = {
  id: string;
  multiplier: number;
  name: string;
  uuid: string;
};

type TRubricCriteria = {
  id: string;
  rubricCriteriaLabelId: string;
  rubricHeadingId: string;
  text: string;
  uuid: string;
};

type TRubricCriteriaLabel = {
  displayName: string;
  id: string;
  score: number;
  uuid: string;
};

export type TRubric = {
  id: string;
  uuid: string;
  name: string;
  description: string;
  headings: TRubricHeading[];
  criterias: TRubricCriteria[];
  criteriaLabels: TRubricCriteriaLabel[];
  hasAlignedStatements: boolean;
};

export type TAssignment = {
  assetName: string;
  description: string;
  displayName: string;
  id: string;
  rubrics: TRubric[];
  step: number;
};

export type TFile = {
  filename: string;
  id: string;
  url: string;
};

export type TAttachment = {
  description: string;
  displayName: string;
  files: TFile[];
  id: string;
  name: string;
  step: number;
};

export type TCheckInGroup = {
  displayName: string;
  id: string;
  name: string;
  questions: TCheckInQuestion[];
  step: number;
};

export type TCheckInQuestion = {
  answer: TCheckInQuestionAnswer;
  id: string;
  question: string;
  step: number;
};

type TCheckInQuestionAnswer = {
  answer: string;
  createdAt: string;
  grade: {
    createdAt: string;
    id: string;
    status: 'ACCEPTED' | 'NOT_ACCEPTED';
    updatedAt: string;
  };
  id: string;
  name: string;
  updatedAt: string;
};

export type TDescription = {
  introduction: string;
  goal: string;
  role: string;
  audience: string;
  situation: string;
};

export type TPresentation = {
  displayName: string;
  id: string;
  name: string;
  source: string;
  step: number;
};

export type TResearchLink = {
  author: string;
  displayName: string;
  id: string;
  name: string;
  resourceLink: string;
  sourceName: string;
  step: number;
};

export type TText = {
  content: string;
  displayName: string;
  id: string;
  name: string;
  step: number;
};

export type TVideo = {
  description: string;
  displayName: string;
  filename: string;
  id: string;
  name: string;
  url: string;
  step: number;
};

export type TVocabularie = {
  definition: string;
  id: string;
  step: number;
  term: string;
};

export type CareerReviewSurveyQuestionOption = {
  option: string;
  step: number;
};

export type TCareerReviewSurvey = {
  questions: TCareerReviewSurveyQuestion[];
};

type TBadge = {
  id: string;
  name: string;
  imageUrl: string;
};

export type TLesson = {
  archivedAt: string;
  badges: TBadge[];
  assignments: TAssignment[];
  attachments: TAttachment[];
  checkInQuestion: TCheckInQuestion[];
  description: TDescription;
  hasPresentation: boolean;
  id: string;
  imageUrl: string;
  name: string;
  externalPresentations: TPresentation[];
  researchLinks: TResearchLink[];
  texts: TText[];
  thumbnailUrl: string;
  type: string;
  videos: TVideo[];
  vocabularies: TVocabularie[];
  careerReviewSurvey: TCareerReviewSurvey;
};

export type TLessonData = {
  lesson: TLesson;
};
