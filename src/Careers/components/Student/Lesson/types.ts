import { TRubricResult } from '@dc/graphql/user/queries/studentCourseActivity';

import {
  TCheckInGroup as TBaseCheckInGroup,
  TCheckInQuestion as TBaseCheckInQuestion,
} from '@shared/components/CheckIns/types';

import { SURVEY_QUESTION_TYPE } from './Survey/types';

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

type TRubric = {
  id: string;
  uuid: string;
  name: string;
  description: string;
  headings: TRubricHeading[];
  criterias: TRubricCriteria[];
  pointsAvailable?: number;
  criteriaLabels: TRubricCriteriaLabel[];
  hasAlignedStatements?: boolean;
};

type TAssignmentSubmissionFile = {
  filename: string;
  googleWeblink?: string;
  id: string;
  source: string;
  url: string;
};

type TSubmissionGrade = {
  id: string;
  lastGradedBy: {
    uuid: string;
    firstName: string;
    lastName: string;
    fullName: string;
  };
  status: 'ACCEPTED' | 'NOT_ACCEPTED';
  createdAt: string;
  updatedAt: string;
};

type TSubmissionRubricGrade = {
  id: string;
  lastGradedBy: {
    uuid: string;
    firstName: string;
    lastName: string;
    fullName: string;
  };
  results: TRubricResult[];
  pointsAvailable: number;
  pointsScored: number;
  createdAt: string;
  updatedAt: string;
};

export type TAssignmentSubmission = {
  files: TAssignmentSubmissionFile[];
  grade: TSubmissionGrade | null;
  rubricGrade: TSubmissionRubricGrade | null;
  id: string;
  updatedAt: string;
  status: 'DRAFT' | 'SUBMITTED';
};

type TAttachmentFile = {
  filename: string;
  id: string;
  url: string;
};

type TExtensionField = {
  author: {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    uuid: string;
  };
  description: string;
  files: {
    filename: string;
    id: string;
    url: string;
  }[];
  id: string;
  imageUrl: string;
  links: {
    name: string;
    url: string;
  }[];
  name: string;
};

export type TAssignment = {
  id: string;
  name: string;
  description: string;
  displayName: string;
  step: number;
  rubrics: TRubric[];
  updatedAt: string;
  submission: TAssignmentSubmission | null;
  __typename: 'Assignment';
};

export type TAttachment = {
  description: string;
  displayName: string;
  files: TAttachmentFile[];
  id: string;
  step: number;
  __typename: 'Attachment';
};

export type TCareerReviewSurvey = {
  version: number;
  performed: boolean;
  questions: {
    answer: string[];
    id: string;
    options: {
      option: string;
      step: number;
    }[];
    question: string;
    type: SURVEY_QUESTION_TYPE;
  }[];
};

export type TExternalPresentation = {
  displayName: string;
  id: string;
  source: string;
  step: number;
  isExpandable: boolean;
  __typename: 'ExternalPresentation';
};

export type TResearchLink = {
  author: string;
  displayName: string;
  id: string;
  resourceLink: string;
  sourceName: string;
  step: number;
  __typename: 'ResearchLink';
};

export type TText = {
  content: string;
  displayName: string;
  id: string;
  step: number;
  __typename: 'Text';
};

export type TVideo = {
  description: string;
  displayName: string;
  filename: string;
  id: string;
  step: number;
  url: string;
  __typename: 'Video';
};

export type TVocabulary = {
  definition: string;
  id: string;
  step: number;
  term: string;
  __typename: 'Vocabulary';
};

export type TCheckInQuestion = Pick<
  TBaseCheckInQuestion,
  'id' | 'question' | 'step' | 'answer' | '__typename'
>;

export type TCheckInGroup = Omit<TBaseCheckInGroup, 'questions'> & {
  questions: TCheckInQuestion[];
};

export type TLesson = {
  id: string;
  imageUrl: string;
  name: string;
  assignments: TAssignment[];
  attachments: TAttachment[];
  careerReviewSurvey: TCareerReviewSurvey | null;
  checkInGroups: TCheckInGroup[];
  checkInQuestions: TCheckInQuestion[];
  description: {
    audience: string;
    goal: string;
    introduction: string;
    role: string;
    situation: string;
  };
  extensionFields: TExtensionField[];
  externalPresentations: TExternalPresentation[];
  hasPresentation: boolean;
  progress: {
    accepted: number;
    submitted: number;
    total: number;
  };
  researchLinks: TResearchLink[];
  step: number;
  texts: TText[];
  thumbnailUrl: string;
  type: string;
  videos: TVideo[];
  vocabularies: TVocabulary[];
};
