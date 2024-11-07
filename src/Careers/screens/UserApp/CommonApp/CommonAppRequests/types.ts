// TYPES
import { COMMON_APP_FORM_STATUS } from '@dc/resources/enums';

export type CommonAppVariables = {
  page: number;
  perPage: number;
};

export type RecommendationRequestVariables = {
  studentUuid: string;
};

export type CommonAppRequestsData = {
  recommendationRequests: RecommendationRequestsData;
};

export type CommonAppRequestData = {
  recommendationRequest: RecommendationRequestWithForms;
};

export type CommonAppForm = {
  formType: COMMON_APP_FORM_TYPES;
  status: COMMON_APP_FORM_STATUS;
  previewUrl?: string;
  deadline: string | null;
};

export type RecommendationRequestsData = {
  nodes: RecommendationRequest[];
  nodesCount: number;
  pagesCount: number;
};

export type RecommendationRequest = {
  deadline: string | null;
  applicant: Applicant;
  submittedFormsCount: number;
  totalFormsCount: number;
};

export type RecommendationRequestWithForms = {
  applicant: Applicant;
  forms: CommonAppForm[];
};

export type Applicant = {
  applicantId: string;
  email: string;
  firstName: string;
  lastName: string;
  uuid: string;
};

// ENUMS
export enum RECOMMENDATION_REQUEST_STATUSES {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum RECOMMENDER_TYPES {
  TEACHER = 'TEACHER',
  COUNSELOR = 'COUNSELOR',
}

export enum COMMON_APP_FORM_TYPES {
  COUNSELOR_EARLY_DECISION_2 = 'COUNSELOR_EARLY_DECISION_2',
  COUNSELOR_EARLY_DECISION = 'COUNSELOR_EARLY_DECISION',
  COUNSELOR_FEE_WAIVER = 'COUNSELOR_FEE_WAIVER',
  COUNSELOR_FINAL_REPORT = 'COUNSELOR_FINAL_REPORT',
  COUNSELOR_MIDYEAR_REPORT = 'COUNSELOR_MIDYEAR_REPORT',
  COUNSELOR_OPTIONAL_REPORT_2 = 'COUNSELOR_OPTIONAL_REPORT_2',
  COUNSELOR_OPTIONAL_REPORT = 'COUNSELOR_OPTIONAL_REPORT',
  COUNSELOR_PROFILE = 'COUNSELOR_PROFILE',
  COUNSELOR_RECOMMENDATION = 'COUNSELOR_RECOMMENDATION',
  COUNSELOR_SECONDARY_REPORT = 'COUNSELOR_SECONDARY_REPORT',
  TEACHER_PROFILE = 'TEACHER_PROFILE',
  TEACHER_RECOMMENDATION = 'TEACHER_RECOMMENDATION',
  TEACHER_EVALUATION = 'TEACHER_EVALUATION',
}
