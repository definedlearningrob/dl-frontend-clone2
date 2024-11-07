import { FC, SVGProps } from 'react';

import { ReactComponent as OpportunitiesIcon } from '@dc/assets/icons/match.svg';
import { ReactComponent as CareerPathwayIcon } from '@dc/assets/icons/pathway.svg';
import { ArchivableStatusTypes } from '@dc/resources/enums';

import { ReactComponent as CareerReviewSurveyIcon } from '@shared/assets/icons/task.svg';
import { ReactComponent as StudentReportIcon } from '@shared/assets/icons/education_outlined.svg';
import { ReactComponent as GoalPerformanceIndicatorIcon } from '@shared/assets/icons/bar_graph.svg';
import { ReactComponent as CollegeIcon } from '@shared/assets/icons/building.svg';
import { ReactComponent as AssessmentsIcon } from '@shared/assets/icons/list-task-graduate-hat.svg';
import { ReactComponent as GoalPlansIcon } from '@shared/assets/icons/certificate.svg';
import goalPlans from '@shared/assets/images/student_plans.jpeg';
import indicators from '@shared/assets/images/performance_indicators.jpeg';
import studentReport from '@shared/assets/images/student_report.jpeg';
import careerReviewSurvey from '@shared/assets/images/career_pathway.jpeg';
import assessment from '@shared/assets/images/assessment.jpeg';
import college from '@shared/assets/images/college_and_future.jpeg';
import opportunities from '@shared/assets/images/opportunities.jpeg';
import careerPathway from '@shared/assets/images/career_pathway.jpeg';
import { ReportType } from '@shared/resources/enums';

export const ASSESSMENT_STATUSES = {
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  FINISHED: 'FINISHED',
  IN_PROGRESS: 'IN_PROGRESS',
  NOT_STARTED: 'NOT_STARTED',
  PROCESSING_RESULTS: 'PROCESSING_RESULTS',
};

export const ASSESSMENT_TYPES = {
  HIGH_SCHOOL: 'HIGH_SCHOOL',
  MIDDLE_SCHOOL: 'MIDDLE_SCHOOL',
} as const;

export const ASSESSMENT_SUBMISSION_STATUS = {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
};

export const ASSET_TYPE = {
  FILE: 'FILE',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  DC_LOGO: 'DC_LOGO',
  DL_LOGO: 'DL_LOGO',
  DC_ICON: 'DC_ICON',
  DL_ICON: 'DC_ICON',
};

export const PUBLISHING_STATUSES = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
};

export const CHECK_IN_TYPE = {
  CHECK_IN_QUESTION: 'CHECK_IN_QUESTION',
  CHECK_IN_GROUP: 'CHECK_IN_GROUP',
};

export const CONVERSATION_CONTEXT_TYPES = {
  ASSIGNMENT: 'ASSIGNMENT',
  LESSON: 'LESSON',
  COURSE: 'COURSE',
  CHECK_IN_ANSWER: 'CHECK_IN_ANSWER',
  ANNOUNCEMENT: 'ANNOUNCEMENT',
  OPPORTUNITY: 'OPPORTUNITY',
};

export const CONVERSATION_TYPES = {
  GENERAL: 'GENERAL',
  CONTEXTUAL: 'CONTEXTUAL',
};

export const COURSE_TYPES = {
  HIGH_SCHOOL: 'HIGH_SCHOOL',
  MIDDLE_SCHOOL: 'MIDDLE_SCHOOL',
};

export const ENTITY_TYPE = {
  ENTITY: 'entity',
  SCHOOL_CLASS: 'schoolclass',
  STUDENT: 'student',
  TEACHER: 'teacher',
  USER: 'user',
};

export const GRADE_STATUSES = {
  ACCEPTED: 'ACCEPTED',
  NOT_ACCEPTED: 'NOT_ACCEPTED',
  // type for FE usage!
  UPDATED: 'UPDATED',
};

// eslint-disable-next-line no-undef
export const IS_TEST_ENV = import.meta.env.NODE_ENV === 'test';

export const LESSON_ITEM_TYPES = {
  ASSIGNMENT: 'ASSIGNMENT',
  ATTACHMENT: 'ATTACHMENT',
  EXTERNALPRESENTATION: 'PRESENTATION',
  RESEARCHLINK: 'RESEARCH_LINK',
  TEXT: 'TEXT',
  VIDEO: 'VIDEO',
  VOCABULARY: 'VOCABULARY',
  CHECKINQUESTION: 'CHECKINQUESTION',
  CAREERREVIEWSURVEY: 'CAREERREVIEWSURVEY',
};

export const LESSON_DESCRIPTION_TYPES = {
  AUDIENCE: 'audience',
  GOAL: 'goal',
  INTRODUCTION: 'introduction',
  ROLE: 'role',
  SITUATION: 'situation',
};

export const LESSON_TYPES = {
  CAREER_CLUSTER: 'CAREER_CLUSTER',
  PATHWAY: 'PATHWAY',
  PROJECT: 'PROJECT',
  DIG_DEEPER_INTO_CAREER: 'DIG_DEEPER_INTO_CAREER',
  CAREER_REVIEW_SURVEY: 'CAREER_REVIEW_SURVEY',
  VIRTUAL_INTERNSHIP: 'VIRTUAL_INTERNSHIP',
  EXPERIENCE_OPPORTUNITY: 'EXPERIENCE_OPPORTUNITY',
  CAREER_READINESS: 'CAREER_READINESS',
  GENERIC: 'GENERIC',
};

export const PAGING = {
  PAGE_DEFAULT: 1,
  PER_PAGE_DEFAULT: { label: 10, value: 10 },
  PER_PAGE_VARIANTS: [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 30, value: 30 },
    { label: 40, value: 40 },
  ],
};

export const PRODUCTS = {
  PBL: 'PBL',
  CAREERS: 'CAREERS',
};

export const RECEIVER_TYPES = {
  STUDENT: 'STUDENT',
  USER: 'USER',
};

export const RESOURCE_CLASS = {
  ASSIGNMENT_SUBMISSION_FILE: 'ASSIGNMENT_SUBMISSION_FILE',
  ATTACHMENT: 'ATTACHMENT',
  CATALOG: 'CATALOG',
  COURSE: 'COURSE',
  ENTITY: 'ENTITY',
  EXTENSION_FIELD: 'EXTENSION_FIELD',
  EXTENSION_FIELD_FILE: 'EXTENSION_FIELD_FILE',
  LESSON: 'LESSON',
  PORTFOLIO_PROJECT_FILE: 'PORTFOLIO_PROJECT_FILE',
  PORTFOLIO_PROJECT: 'PORTFOLIO_PROJECT',
  PUBLIC_RESOURCE: 'PUBLIC_RESOURCE',
  RESUME: 'RESUME',
  TASK_FILE: 'TASK_FILE',
  TASK: 'TASK',
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

export const ARCHIVABLE_STATUSES = {
  ALL: { value: ArchivableStatusTypes.ALL, label: 'All' },
  ACTIVE: { value: ArchivableStatusTypes.ACTIVE, label: 'Active' },
  ARCHIVED: { value: ArchivableStatusTypes.ARCHIVED, label: 'Archived' },
};

export const UNIT_SERVICE_STATUSES = {
  ALL: { value: 'ALL', label: 'All' },
  CAREERS: { value: 'CAREERS', label: 'Careers' },
  LEARNING: { value: 'LEARNING', label: 'Learning' },
};

export const SUBMISSION_TYPES = {
  ASSIGNMENT: 'ASSIGNMENT',
  CHECK_IN: 'CHECK_IN',
};

export const TOKEN_KEY = 'defined-careers-access-token';

export const UUID_NAMESPACE = '3e63b811-e77f-4829-9b60-542d48666505';

export const ALLOWED_EVALUATOR_ROLES = [ROLES.TEACHER, ROLES.ENTITY_ADMIN];
export const DEFAULT_STATE_TRANSITION_DURATION_MS = 1500;
export const MAX_UPLOAD_SIZE_MB = 1000;

export const SCHOOLCLASS_STUDENTS_PER_PAGE = 35;

export const CAREER_COURSE_SETTINGS_TYPES = {
  HIGH_SCHOOL: 'HIGH_SCHOOL',
  MIDDLE_SCHOOL: 'MIDDLE_SCHOOL',
};

export const AFFECTED_RESOURCES_FILED = {
  ASSIGNMENTS: 'assignments', // rubric
  CATALOGS: 'catalogs', // track
  COURSES: 'courses', // lesson
  LESSONS: 'lessons', // assignment, attachment, presentation, researchLink, text, video, vocabulary
  TASKS: 'tasks', // product
  TRACKS: 'tracks', // unit
  UNITS: 'units', // task
  PRODUCTS: 'products', // rubric
};

export const EDUCATIONAL_RESOURCE_TYPES = {
  COURSE: 'course',
  ENTITY: 'entity',
  SCHOOLCLASS: 'schoolClass',
  STUDENT: 'student',
};

export const TRACK_GRADES = [
  { label: 'PRE-K', value: 'Pre-K' },
  { label: 'K', value: 'K' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
  { label: 'Postsecondary', value: 'Postsecondary' },
];

export const IMAGE_SLIDE_STYLE = {
  CONTAIN: 'contain',
  FILL: 'fill',
};

export const IMAGE_SLIDE_POSITION = {
  CENTER: 'center',
  LEFT: 'left',
  RIGHT: 'right',
};

export const REDIRECT_LINKS = {
  // eslint-disable-next-line max-len
  MIDDLE_SCHOOL_EXPERIENCE_LINK:
    'https://support.definedlearning.com/article/150-defined-careers-middleSchool-experience',
  KNOWLEDGE_BASE_LINK: 'https://support.definedlearning.com/collection/1-defined-careers',
};

export const reportIconMap = {
  GOAL_PLANS: GoalPlansIcon,
  GOAL_PERFORMANCE_INDICATORS: GoalPerformanceIndicatorIcon,
  STUDENT_REPORT: StudentReportIcon,
  CAREER_REVIEW_SURVEY: CareerReviewSurveyIcon,
  ASSESSMENT: AssessmentsIcon,
  COLLEGE_AND_FUTURE: CollegeIcon,
  OPPORTUNITIES: OpportunitiesIcon,
  CAREER_PATHWAY: CareerPathwayIcon,
} as Record<ReportType, FC<SVGProps<SVGSVGElement>>>;

export const reportImageMap = {
  GOAL_PLANS: goalPlans,
  GOAL_PERFORMANCE_INDICATORS: indicators,
  STUDENT_REPORT: studentReport,
  CAREER_REVIEW_SURVEY: careerReviewSurvey,
  ASSESSMENT: assessment,
  COLLEGE_AND_FUTURE: college,
  OPPORTUNITIES: opportunities,
  CAREER_PATHWAY: careerPathway,
} as Record<ReportType, string>;

export const APTITUDE_VARIABLES = {
  LOCAL_STORAGE_ASSESSMENT_KEY: 'aptitudeAssessment',
};
