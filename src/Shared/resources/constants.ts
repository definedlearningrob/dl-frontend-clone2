import { ReportType } from '@shared/resources/enums';

export const SOCIAL_LINKS = {
  FACEBOOK: 'https://www.facebook.com/definedlearn',
  TWITTER: 'https://twitter.com/definedlearning',
};

export const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

export enum RECEIVER_TYPES {
  STUDENT = 'STUDENT',
  USER = 'USER',
  TEAM = 'TEAM',
}

export const CONVERSATION_TYPES = {
  GENERAL: 'GENERAL',
  CONTEXTUAL: 'CONTEXTUAL',
};

export const ASSET_TYPE = {
  FILE: 'FILE',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
};

export const RESOURCE_CLASS = {
  ASSIGNMENT_SUBMISSION_FILE: 'ASSIGNMENT_SUBMISSION_FILE',
  ATTACHMENT: 'ATTACHMENT',
  CATALOG: 'CATALOG',
  COURSE: 'COURSE',
  EXTENSION_FIELD: 'EXTENSION_FIELD',
  EXTENSION_FIELD_FILE: 'EXTENSION_FIELD_FILE',
  LESSON: 'LESSON',
  PORTFOLIO_PROJECT: 'PORTFOLIO_PROJECT',
  PORTFOLIO_PROJECT_FILE: 'PORTFOLIO_PROJECT_FILE',
  PUBLIC_RESOURCE: 'PUBLIC_RESOURCE',
  PRODUCT_SUBMISSION_FILE: 'PRODUCT_SUBMISSION_FILE',
  RESUME: 'RESUME',
  SLIDE_BACKGROUND_IMAGE: 'SLIDE_BACKGROUND_IMAGE',
  SLIDE_IMAGE: 'SLIDE_IMAGE',
  SLIDE_VIDEO: 'SLIDE_VIDEO',
  TASK: 'TASK',
  TASK_FILE: 'TASK_FILE',
  TRACK: 'TRACK',
  UNIT: 'UNIT',
  VIDEO: 'VIDEO',
  BADGE: 'BADGE',
};
export const ROLES = {
  SYSTEM_ADMIN: 'SYSTEM_ADMIN',
  SALES_ADMIN: 'SALES_ADMIN',
  ENTITY_ADMIN: 'ENTITY_ADMIN',
  TEACHER: 'TEACHER',
};

export const ALLOWED_EVALUATOR_ROLES = [ROLES.TEACHER, ROLES.ENTITY_ADMIN];

export const EVALUATION_RESULTS = {
  NOT_STARTED: 'NOT_STARTED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  NOT_MET: 'NOT_MET',
};

export const NOTIFICATION_SCOPES = {
  ALL: 'ALL',
  READ: 'READ',
  UNREAD: 'UNREAD',
};

export enum NOTIFICATION_TYPES {
  GENERAL = 'GENERAL',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
}

export const REPORTS_ORDER = [
  ReportType.GOAL_PLANS,
  ReportType.GOAL_PERFORMANCE_INDICATORS,
  ReportType.CAREER_REVIEW_SURVEY,
  ReportType.ASSESSMENT,
  ReportType.COLLEGE_AND_FUTURE,
  ReportType.OPPORTUNITIES,
  ReportType.CAREER_PATHWAY,
];

export const GOALS_REPORTS = [ReportType.GOAL_PLANS, ReportType.GOAL_PERFORMANCE_INDICATORS];
export const DL_REPORTS = [ReportType.CAREER_PATHWAY];

export const REPORT_PATHS: Record<ReportType, string> = {
  [ReportType.GOAL_PLANS]: 'goals-plan',
  [ReportType.GOAL_PERFORMANCE_INDICATORS]: 'goals-performance-indicators',
  [ReportType.CAREER_REVIEW_SURVEY]: 'career-review-survey',
  [ReportType.ASSESSMENT]: 'assessment',
  [ReportType.COLLEGE_AND_FUTURE]: 'college-and-future',
  [ReportType.OPPORTUNITIES]: 'opportunities',
  [ReportType.CAREER_PATHWAY]: 'career-exploration',
};

export const FILE_TO_DOWNLOAD_KEY = 'FILE_TO_DOWNLOAD_CONFIG';

export const TRACK_GRADES = {
  'PRE-K': 'PRE-K',
  K: 'K',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: '11',
  12: '12',
  'POST-SECONDARY': 'POST-SECONDARY',
} as const;

export const CHECKINS_PER_SLIDE_COUNT = 3;

export const AI_PROMPTS = {
  DIFF_UP:
    'Take the following project description and adjust it to increase complexity for a higher grade level.',
  DIFF_DOWN: 'Take the following project description and simplify it for a younger grade level.',
  DECREASE_LEVEL:
    'Rewrite the following text using simpler vocabulary and easier-to-understand language',
  INCREASE_LEVEL:
    'Rewrite the following text using more advanced vocabulary and sophisticated language',
  NEW_IDEA: 'Generate a new idea based on the following text:',
};
