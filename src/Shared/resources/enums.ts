export enum KeyboardCodes {
  ARROW_DOWN = 'ArrowDown',
  ARROW_UP = 'ArrowUp',
  ENTER = 'Enter',
  ESCAPE = 'Escape',
}

export enum ACTIVITY_TYPE {
  COURSE_ENROLLMENT = 'COURSE_ENROLLMENT',
  COURSE_ASSIGNMENT = 'COURSE_ASSIGNMENT',
  ASSIGNMENT_SUBMISSION = 'ASSIGNMENT_SUBMISSION',
  CHECK_IN_QUESTION_ANSWER = 'CHECK_IN_QUESTION_ANSWER',
  CHECK_IN_QUESTION_ANSWER_SUBMITTED = 'CHECK_IN_QUESTION_ANSWER_SUBMITTED',
  PRODUCT_SUBMISSION = 'PRODUCT_SUBMISSION',
  PRODUCT_SUBMISSION_SUBMITTED = 'PRODUCT_SUBMISSION_SUBMITTED',
  STUDENT_ADDED = 'STUDENT_ADDED',
  STUDENT_REMOVED = 'STUDENT_REMOVED',
  USER_ADDED = 'USER_ADDED',
  USER_REMOVED = 'USER_REMOVED',
  LAST_APPLICATION = 'LAST_APPLICATION',
}

export enum UPLOAD_FILE_TYPE {
  FILE = 'FILE',
  GOOGLE = 'GOOGLE',
}

export enum RESOURCE_CLASS {
  ASSIGNMENT_SUBMISSION_FILE = 'ASSIGNMENT_SUBMISSION_FILE',
  ATTACHMENT = 'ATTACHMENT',
  CATALOG = 'CATALOG',
  COURSE = 'COURSE',
  EXTENSION_FIELD = 'EXTENSION_FIELD',
  EXTENSION_FIELD_FILE = 'EXTENSION_FIELD_FILE',
  LESSON = 'LESSON',
  OPPORTUNITY = 'OPPORTUNITY',
  PORTFOLIO_PROJECT = 'PORTFOLIO_PROJECT',
  PORTFOLIO_PROJECT_FILE = 'PORTFOLIO_PROJECT_FILE',
  PUBLIC_RESOURCE = 'PUBLIC_RESOURCE',
  PRODUCT_SUBMISSION_FILE = 'PRODUCT_SUBMISSION_FILE',
  NEW_RESUME = 'NEW_RESUME',
  RESUME = 'RESUME',
  SLIDE_BACKGROUND_IMAGE = 'SLIDE_BACKGROUND_IMAGE',
  SLIDE_IMAGE = 'SLIDE_IMAGE',
  SLIDE_VIDEO = 'SLIDE_VIDEO',
  TASK = 'TASK',
  TASK_FILE = 'TASK_FILE',
  TRACK = 'TRACK',
  UNIT = 'UNIT',
  VIDEO = 'VIDEO',
  BADGE = 'BADGE',
  PARTNER = 'PARTNER',
  PARTNER_FILE = 'PARTNER_FILE',
}

export enum SUBMISSION_GRADE_STATUS {
  ACCEPTED = 'ACCEPTED',
  NOT_ACCEPTED = 'NOT_ACCEPTED',
}

export enum STUDENT_GRADING_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  SUBMITTED = 'SUBMITTED',
  // type just for FE usage!
  RE_SUBMITTED = 'RE_SUBMITTED',
}

export enum ASSET_TYPE {
  FILE = 'FILE',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AVATAR = 'AVATAR',
}

export enum PORTFOLIO_PROJECT_TYPES {
  RESUME = 'RESUME',
  PBL = 'PBL',
  CAREERS = 'CAREERS',
  PERSONAL = 'PERSONAL',
}

export enum PORTFOLIO_PROJECT_SUBMISSION_STATUS {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
}

export enum SUBMISSION_STATUS {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
}

export enum SUBMISSION_FILE_SOURCE {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
}

export enum Roles {
  ENTITY_ADMIN = 'ENTITY_ADMIN',
  SALES_ADMIN = 'SALES_ADMIN',
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  TEACHER = 'TEACHER',
}

export enum Permissions {
  WBL_ADMIN = 'wblAdmin',
  COUNSELOR = 'counselor',
  IMPERSONATE = 'canImpersonate',
  REPORTS = 'canBrowseReports',
}

export enum ContentStatusesTypes {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum CONVERSATION_CONTEXT_TYPES {
  TASK = 'TASK',
  ASSIGNMENT = 'ASSIGNMENT',
  // PRODUCT needs to be removed when we get rid of starting product conversations by students
  PRODUCT = 'PRODUCT',
  PRODUCT_SUBMISSION = 'PRODUCT_SUBMISSION',
  CHECK_IN_ANSWER = 'CHECK_IN_ANSWER',
  TEAM_CHECK_IN_SUBMISSION = 'TEAM_CHECK_IN_SUBMISSION',
}

export enum CONVERSATION_PARTICIPANT_TYPES {
  USER = 'USER',
  STUDENT = 'STUDENT',
  TEAM = 'TEAM',
}

export enum CONVERSATION_TYPES {
  GENERAL = 'GENERAL',
  CONTEXTUAL = 'CONTEXTUAL',
}

export enum APP_TYPES {
  CAREERS = 'CAREERS',
  PBL = 'PBL',
}

export enum EVALUATION_RESULTS_VALUES {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  NOT_MET = 'NOT_MET',
}

export enum SHARED_LINK_APP_TYPE {
  DC = 'DC',
  PBL = 'PBL',
}

export enum EDUCATIONAL_STAGE {
  MIDDLE_SCHOOL = 'MIDDLE_SCHOOL',
  HIGH_SCHOOL = 'HIGH_SCHOOL',
}

export enum CONTACT_LINK_TYPES {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  LINKEDIN = 'LINKEDIN',
  CUSTOM = 'CUSTOM',
  WEBSITE = 'WEBSITE',
  LOCATION = 'LOCATION',
}

export enum STATEMENT_QUESTION_TYPE {
  SHORT_TEXT = 'SHORT_TEXT',
  LONG_TEXT = 'LONG_TEXT',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  MULTIPLE_CHOICE_DROPDOWN = 'MULTIPLE_CHOICE_DROPDOWN',
}

export enum EVIDENCE_KIND {
  RUBRIC_GRADE = 'RUBRIC_GRADE',
  PRODUCT_SUBMISSION = 'PRODUCT_SUBMISSION',
  PORTFOLIO_PROJECT = 'PORTFOLIO_PROJECT',
  ASSIGNMENT_SUBMISSION = 'ASSIGNMENT_SUBMISSION',
  OPPORTUNITY_APPLICATION = 'OPPORTUNITY_APPLICATION',
}

export enum SERVICE_NAME {
  CAREERS = 'CAREERS',
  LEARNING = 'LEARNING',
}

export enum UnitResourceTypes {
  COURSE = 'COURSE',
  OPPORTUNITY = 'OPPORTUNITY',
  VIRTUAL_INTERNSHIP = 'VIRTUAL_INTERNSHIP',
}

export enum EVIDENCE_CONTEXT_KIND {
  VIRTUAL_INTERNSHIP = 'VIRTUAL_INTERNSHIP',
  COURSE = 'COURSE',
}

export enum ReportType {
  ASSESSMENT = 'ASSESSMENT',
  CAREER_PATHWAY = 'CAREER_PATHWAY',
  CAREER_REVIEW_SURVEY = 'CAREER_REVIEW_SURVEY',
  COLLEGE_AND_FUTURE = 'COLLEGE_AND_FUTURE',
  GOAL_PERFORMANCE_INDICATORS = 'GOAL_PERFORMANCE_INDICATORS',
  OPPORTUNITIES = 'OPPORTUNITIES',
  GOAL_PLANS = 'GOAL_PLANS',
}

export enum AGGREGATION_PERIOD {
  MONTH = 'MONTH',
  QUARTER = 'QUARTER',
  SEMESTER = 'SEMESTER',
}

export enum SORT_ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum PLAN_GROUP_STATEMENT_RESULT_SORT {
  STUDENT_NAME = 'STUDENT_NAME',
  EVIDENCES_COUNT = 'EVIDENCES_COUNT',
  STATUS = 'STATUS',
  LAST_UPDATED_AT = 'LAST_UPDATED_AT',
  STUDENT_SIS_ID = 'STUDENT_SIS_ID',
}

export enum TAG_REPORT_RESULT_SORT {
  STUDENT_NAME = 'STUDENT_NAME',
  STUDENT_SIS_ID = 'STUDENT_SIS_ID',
  RUBRIC_NAME = 'RUBRIC_NAME',
  GRADED_AT = 'GRADED_AT',
}