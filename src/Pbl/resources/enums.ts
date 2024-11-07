export enum Roles {
  ENTITY_ADMIN = 'ENTITY_ADMIN',
  SALES_ADMIN = 'SALES_ADMIN',
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  TEACHER = 'TEACHER',
}

export enum TASK_STATUS {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export enum CHECK_IN_ITEM_TYPES {
  CHECK_IN_QUESTION = 'CHECK_IN_QUESTION',
  CHECK_IN_GROUP = 'CHECK_IN_GROUP',
}

export enum PRODUCT_SUBMISSION_STATUS {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  NOT_STARTED = 'NOT STARTED',
  GRADED = 'GRADED',
}

export enum GRADING_STATUS {
  NOT_YET_SUBMITTED = 'NOT_YET_SUBMITTED',
  WAITING_FOR_GRADING = 'WAITING_FOR_GRADING',
  ALREADY_GRADED = 'ALREADY_GRADED',
}

export enum GRADING_ITEM_TYPES {
  PRODUCT = 'PRODUCT',
  CHECK_IN_QUESTION = 'CHECK_IN_QUESTION',
}

export enum SUBMISSION_TYPE {
  CHECK_IN_ANSWER = 'CHECK_IN_ANSWER',
  TEAM_CHECK_IN_SUBMISSION = 'TEAM_CHECK_IN_SUBMISSION',
}

export enum PROJECT_USER_TYPES {
  USER = 'USER',
  STUDENT = 'STUDENT',
  PUBLIC = 'PUBLIC',
}

export enum TABS_IDS {
  ENTITIES = 'entities',
  USERS = 'users',
}

export enum ArchivableStatusTypes {
  ACTIVE = 'ACTIVE',
  ALL = 'ALL',
  ARCHIVED = 'ARCHIVED',
}