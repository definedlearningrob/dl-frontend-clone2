export enum CourseType {
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  MIDDLE_SCHOOL = 'MIDDLE_SCHOOL',
}
export enum TagTypes {
  SYSTEM = 'SYSTEM',
  ENTITY = 'ENTITY',
}

export enum ResourceClass {
  ASSIGNMENT_SUBMISSION_FILE = 'ASSIGNMENT_SUBMISSION_FILE',
  ATTACHMENT = 'ATTACHMENT',
  CATALOG = 'CATALOG',
  COURSE = 'COURSE',
  EXTENSION_FIELD = 'EXTENSION_FIELD',
  EXTENSION_FIELD_FILE = 'EXTENSION_FIELD_FILE',
  LESSON = 'LESSON',
  PORTFOLIO_PROJECT = 'PORTFOLIO_PROJECT',
  PORTFOLIO_PROJECT_FILE = 'PORTFOLIO_PROJECT_FILE',
  PUBLIC_RESOURCE = 'PUBLIC_RESOURCE',
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
  ENTITY = 'ENTITY',
}

export enum AssetType {
  FILE = 'FILE',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  DC_LOGO = 'DC_LOGO',
  DC_ICON = 'DC_ICON',
  DL_LOGO = 'DL_LOGO',
  DL_ICON = 'DL_ICON',
}

export enum AssessmentType {
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  MIDDLE_SCHOOL = 'MIDDLE_SCHOOL',
}

export enum AssessmentStatuses {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  FINISHED = 'FINISHED',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_STARTED = 'NOT_STARTED',
  PROCESSING_RESULTS = 'PROCESSING_RESULTS',
}

export enum ConversationContextTypes {
  ASSIGNMENT = 'ASSIGNMENT',
  LESSON = 'LESSON',
  COURSE = 'COURSE',
  CHECK_IN_ANSWER = 'CHECK_IN_ANSWER',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  OPPORTUNITY = 'OPPORTUNITY',
}

export enum Roles {
  ENTITY_ADMIN = 'ENTITY_ADMIN',
  SALES_ADMIN = 'SALES_ADMIN',
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  TEACHER = 'TEACHER',
}

export enum EducationalSettingTypes {
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  MIDDLE_SCHOOL = 'MIDDLE_SCHOOL',
}

export enum ReportLevels {
  USER = 'USER',
  SCHOOL_CLASS = 'SCHOOL_CLASS',
  ENTITY = 'ENTITY',
}

export enum UploadReportStatuses {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum ArchivableStatusTypes {
  ACTIVE = 'ACTIVE',
  ALL = 'ALL',
  ARCHIVED = 'ARCHIVED',
}

export enum ContentStatusesTypes {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

export enum ServiceTypes {
  ALL = 'ALL',
  CAREERS = 'CAREERS',
  LEARNING = 'LEARNING',
}

export enum AssignmentSubmissionStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
}

export enum OPPORTUNITY_APPLICATION_STATUS {
  ACCEPTED = 'ACCEPTED',
  FINISHED = 'FINISHED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  STARTED = 'STARTED',
  EXPIRED = 'EXPIRED',
}

export enum VIRTUAL_INTERNSHIP_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum OPPORTUNITY_TYPE {
  APPRENTICESHIP = 'APPRENTICESHIP',
  CLINICAL_EXPERIENCE = 'CLINICAL_EXPERIENCE',
  INTERNSHIP = 'INTERNSHIP',
  JOB_SHADOW = 'JOB_SHADOW',
  OTHER = 'OTHER',
  PRACTICUM = 'PRACTICUM',
  PRE_APPRENTICESHIP = 'PRE_APPRENTICESHIP',
  VIRTUAL_INTERNSHIP = 'VIRTUAL_INTERNSHIP',
  WORKPLACE_TOUR = 'WORKPLACE_TOUR',
  JOB = 'JOB',
  COLLEGE_VISIT = 'COLLEGE_VISIT',
  SPEAKER = 'SPEAKER',
}

export enum VISIBILITY_SCOPE {
  ALL = 'ALL',
  ENTITY = 'ENTITY',
}

export enum INSTITUTION_TYPES {
  PRV_NFP_LT2 = 'Private not-for-profit, less-than 2-year',
  PRV_NFP_2 = 'Private not-for-profit, 2-year',
  PRV_NFP_4 = 'Private not-for-profit, 4-year or above',
  PRV_FP_LT2 = 'Private for-profit, less-than 2-year',
  PRV_FP_2 = 'Private for-profit, 2-year',
  PRV_FP_4 = 'Private for-profit, 4-year or above',
  PUB_LT2 = 'Public, less-than 2-year',
  PUB_2 = 'Public, 2-year',
  PUB_4 = 'Public, 4-year or above',
}

export enum US_STATES {
  ALASKA = 'Alaska',
  ALABAMA = 'Alabama',
  ARKANSAS = 'Arkansas',
  AMERICAN_SAMOA = 'American Samoa',
  ARIZONA = 'Arizona',
  CALIFORNIA = 'California',
  COLORADO = 'Colorado',
  CONNECTICUT = 'Connecticut',
  DISTRICT_OF_COLUMBIA = 'District Of Columbia',
  DELAWARE = 'Delaware',
  FLORIDA = 'Florida',
  GEORGIA = 'Georgia',
  GUAM = 'Guam',
  HAWAII = 'Hawaii',
  IOWA = 'Iowa',
  IDAHO = 'Idaho',
  ILLINOIS = 'Illinois',
  INDIANA = 'Indiana',
  KANSAS = 'Kansas',
  KENTUCKY = 'Kentucky',
  LOUISIANA = 'Louisiana',
  MASSACHUSETTS = 'Massachusetts',
  MARYLAND = 'Maryland',
  MAINE = 'Maine',
  MICHIGAN = 'Michigan',
  MINNESOTA = 'Minnesota',
  MISSOURI = 'Missouri',
  MISSISSIPPI = 'Mississippi',
  MONTANA = 'Montana',
  NORTH_CAROLINA = 'North Carolina',
  NORTH_DAKOTA = 'North Dakota',
  NEBRASKA = 'Nebraska',
  NEW_HAMPSHIRE = 'New Hampshire',
  NEW_JERSEY = 'New Jersey',
  NEW_MEXICO = 'New Mexico',
  NEVADA = 'Nevada',
  NEW_YORK = 'New York',
  OHIO = 'Ohio',
  OKLAHOMA = 'Oklahoma',
  OREGON = 'Oregon',
  PENNSYLVANIA = 'Pennsylvania',
  PUERTO_RICO = 'Puerto Rico',
  RHODE_ISLAND = 'Rhode Island',
  SOUTH_CAROLINA = 'South Carolina',
  SOUTH_DAKOTA = 'South Dakota',
  TENNESSEE = 'Tennessee',
  TEXAS = 'Texas',
  UTAH = 'Utah',
  VIRGINIA = 'Virginia',
  VIRGIN_ISLANDS = 'Virgin Islands',
  VERMONT = 'Vermont',
  WASHINGTON = 'Washington',
  WISCONSIN = 'Wisconsin',
  WEST_VIRGINIA = 'West Virginia',
  WYOMING = 'Wyoming',
}

export enum APPLICATIONS_TYPE {
  COMMON_APP = 'COMMON_APP',
  DIRECT = 'DIRECT',
}

export enum RECOMMENDER_TYPE {
  TEACHER = 'TEACHER',
  COUNSELOR = 'COUNSELOR',
}

export enum INSTITUTION_APPLICATION_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  COMPLETED = 'COMPLETED',
  DOWNLOADED = 'DOWNLOADED',
}
export enum COMMON_APP_FORM_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUBMITTED = 'SUBMITTED',
  COMPLETED = 'COMPLETED',
  DOWNLOADED = 'DOWNLOADED',
}

export enum APPLICATION_FORM_TYPE {
  COUNSELOR_EARLY_DECISION_2 = 'Counselor early decision 2',
  COUNSELOR_EARLY_DECISION = 'Counselor early decision',
  COUNSELOR_FEE_WAIVER = 'Counselor fee waiver',
  COUNSELOR_FINAL_REPORT = 'Counselor final report',
  COUNSELOR_MIDYEAR_REPORT = 'Counselor midyear report',
  COUNSELOR_OPTIONAL_REPORT_2 = 'Counselor optional report 2',
  COUNSELOR_OPTIONAL_REPORT = 'Counselor optional report',
  COUNSELOR_PROFILE = 'Counselor profile',
  COUNSELOR_RECOMMENDATION = 'Counselor recommendation',
  COUNSELOR_SCHOOL_REPORT = 'Counselor school report',
  COUNSELOR_SECONDARY_REPORT = 'Counselor secondary report',
  TEACHER_PROFILE = 'Teacher profile',
  TEACHER_RECOMMENDATION = 'Teacher recommendation',
  TEACHER_EVALUATION = 'Teacher evaluation',
}

export enum SIZE_TYPES {
  VERY_SMALL = 'VERY_SMALL', // Size for very small institutions
  SMALL = 'SMALL', // Size for small institutions
  MEDIUM = 'MEDIUM', // Size for medium institutions
  LARGE = 'LARGE', // Size for large institutions
  VERY_LARGE = 'VERY_LARGE', // Size for very large institutions
}

export enum COST_RANGES {
  LESS_THAN_5000 = 'LESS_THAN_5000', // Institution cost value between 0 and 5000
  FROM_5001_TO_10000 = 'FROM_5001_TO_10000', //Institution cost value between 5001 and 10000
  FROM_10001_TO_15000 = 'FROM_10001_TO_15000', //Institution cost value between 10001 and 15000
  FROM_15001_TO_20000 = 'FROM_15001_TO_20000', //Institution cost value between 15001 and 20000
  MORE_THAN_20000 = 'MORE_THAN_20000', //Institution cost value higher than 20000
}

export enum LOCALE_STORAGE_KEY {
  APPLICATION_REFRESH_TIME = 'APPLICATION_REFRESH_TIME',
}

export enum CAREER_REVIEW_SURVEY_ANSWER_CONTEXT_TYPES {
  COURSE = 'COURSE',
  VIRTUAL_INTERNSHIP = 'VIRTUAL_INTERNSHIP',
  ASSESSMENT = 'ASSESSMENT',
}

export enum SYNC_STATUS {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  FAILED = 'FAILED',
}

export enum ASSIGNMENT_SUBMISSION_TYPES {
  COURSE = 'COURSE',
  VIRTUAL_INTERNSHIP = 'VIRTUAL_INTERNSHIP',
}

export enum ASSESSMENT_TYPES {
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  MIDDLE_SCHOOL = 'MIDDLE_SCHOOL',
}

export enum ASSESSMENT_ATTEMPT_STATUS {
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
  REJECTED = 'REJECTED',
  PROCESSING_RESULTS = 'PROCESSING_RESULTS',
  FAILED = 'FAILED',
}

export enum ASSESSMENT_STATUSES {
  COMPLETED = 'COMPLETED',
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
}
