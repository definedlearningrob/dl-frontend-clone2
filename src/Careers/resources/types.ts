import { ApplicationStatus, OpportunityTypes } from '@graphql/dc/shared/types';
import { VirtualInternshipStatuses } from '@graphql/dc/students/types';
import { Partner } from '@graphql/dc/users/types';

import { CareerReviewSurveyQuestionOption } from '@dc/graphql/user/queries/lesson';

import {
  INSTITUTION_TYPES,
  OPPORTUNITY_APPLICATION_STATUS,
  SYNC_STATUS,
  VISIBILITY_SCOPE,
  APPLICATIONS_TYPE,
} from './enums';

type TCluster = {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  pathways: {
    id: string;
  };
  thumbnailUrl: string;
};

export type TOpportunityApplication = {
  id: string;
  appliedAt: string;
  updatedAt: string;
  lastChangedBy?: {
    uuid: string;
    name: string;
  };
  status: OPPORTUNITY_APPLICATION_STATUS;
  answers: {
    id: string;
    opportunityQuestionId: string;
    answer: string;
  }[];
  student: {
    uuid: string;
    fullName: string;
    schoolClasses: {
      uuid: string;
      name: string;
    }[];
  };
};

export type TOpportunityApplications = {
  nodes: TOpportunityApplication[];
  pagesCount: number;
  nodesCount: number;
};

export type TPathway = {
  cluster: TCluster;
  courses: {
    id: string;
  };
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  thumbnailUrl: string;
};
export type TEntities = {
  uuid: string;
  name: string;
};

export type TLesson = {
  archivedAt: string;
  id: string;
  imageUrl: string;
  name: string;
  thumbnailUrl: string;
  type: string;
  progress: {
    submitted: number;
    total: number;
  };
  careerReviewSurvey: {
    performed: boolean;
  };
  description: {
    audience: string;
    goal: string;
    introduction: string;
    role: string;
    situation: string;
  };
};

export type TOpportunity = {
  applicationStatus: ApplicationStatus | null;
  archivedAt: string;
  createdAt: string;
  automaticAcceptance: boolean;
  availableSpots: number;
  creditsOutcomes: string;
  deadline: string | null;
  description: string;
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  isFavorite: boolean;
  isRecommended: boolean;
  location: string | null;
  name: string;
  hasPendingApplications: boolean;
  questions: {
    id: string;
    question: string;
    answer: string;
  }[];
  opportunityType: OpportunityTypes;
  opportunityApplication: { id: string; answers: { answer: string }[] };
  pathways: TPathway[];
  partner: Pick<Partner, 'id' | 'name'> | null;
  entities: TEntities[];
  periodEnd: string | null;
  periodStart: string | null;
  salaryInformation: string | null;
  tags: string[];
  visibilityScope: VISIBILITY_SCOPE;
  applications: TOpportunityApplications;
  virtualInternship: TVirtualInternship | null;
  imageFitToContainer: boolean;
};

export type TVirtualInternship = {
  id: string;
  roadmapItemsCount: number;
  status: VirtualInternshipStatuses;
  requiredExperiences: number;
  calendarLessons: TCalendarLesson[];
  experienceOpportunityLessons: ExperienceOpportunityLesson[];
  studentExperienceOpportunityLessons: TVirtualInternshipLesson[];
  readinessSkillsLessons: TVirtualInternshipLesson[];
  postExperienceLessons: TVirtualInternshipLesson[];
};

type ExperienceOpportunityLesson = Pick<
  TLesson,
  'type' | 'id' | 'name' | 'thumbnailUrl' | 'progress' | 'description'
>;

export type TVirtualInternshipLesson = Pick<
  TLesson,
  'name' | 'thumbnailUrl' | 'id' | 'progress' | 'careerReviewSurvey' | 'type'
>;

export type TCalendarLesson = Omit<TVirtualInternshipLesson, 'careerReviewSurvey'>;

export type TInstitution = {
  actMax: number | null;
  actMin: number | null;
  admissionRate: number | null;
  contact: TInstitutionContact;
  commonAppEnabled: boolean;
  hasApplied: boolean;
  type: INSTITUTION_TYPES;
  applicationType: APPLICATIONS_TYPE | null;
  applicationId: string | null;
  size?: string | null;
  sizeType: TInstitutionSizeType | null;
  sizeDescription: TInstitutionSizeDescription | null;
  cost: number | null;
  dates: TInstitutionDate[];
  thumbnailUrl: string | null;
  id: string;
  maxTeacherEval: number | null;
  minTeacherEval: number | null;
  isFavorite?: boolean;
  imageUrl: string | null;
  name: string;
  address: TInstitutionAddress;
  degrees: string[];
  description: string | null;
  satMathMax: number | null;
  satMathMin: number | null;
  satReadingMax: number | null;
  satReadingMin: number | null;
  studentFacultyRatio: number | null;
  commonAppApplicationUrl: string | null;
  isIpeds: boolean;
};

export const institutionSizeDescriptionMap = {
  LESS_THAN_500: '0-500',
  FROM_500_TO_1999: '500-1999',
  LESS_THAN_1000: '0-1000',
  FROM_1000_TO_2999: '1000-2999',
  FROM_2000_TO_4999: '2000-4999',
  FROM_3000_TO_9999: '3000-9999',
  FROM_5000_TO_9999: '5000-9999',
  MORE_THAN_10000: '10 000+',
};

export type TInstitutionSizeDescription = keyof typeof institutionSizeDescriptionMap;

export const institutionSizeTypeMap = {
  VERY_SMALL: 'Very Small',
  SMALL: 'Small',
  MEDIUM: 'Medium',
  LARGE: 'Large',
  VERY_LARGE: 'Very Large',
};

export type TInstitutionSizeType = keyof typeof institutionSizeTypeMap;

export type TInstitutionDate = {
  deadlineDate: string;
  decisionType: string;
  term: string;
};

type TInstitutionAddress = {
  city: string;
  state: string;
  stateCode: string;
  street: string;
  zip: string;
  area: {
    kind: string;
    type: string;
  };
};

type TInstitutionContact = {
  phone: string | null;
  urlAdmissions: string | null;
  urlApplications: string | null;
  urlFinancialAid: string | null;
  urlGeneral: string | null;
  urlNetPriceCalculator: string | null;
};

export type TSyncStatus = {
  lastSyncedAt: string | null;
  status: SYNC_STATUS;
};

export type TCollection = {
  id: string;
  name: string;
};

export type TCareerReviewSurveyQuestion = {
  answer: string[];
  id: string;
  options: CareerReviewSurveyQuestionOption[];
  question: string;
  type: string;
};
