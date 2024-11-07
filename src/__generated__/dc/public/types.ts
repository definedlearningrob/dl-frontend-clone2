export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ISO8601Date: { input: string; output: string; }
  ISO8601DateTime: { input: string; output: string; }
};

export type Assignment = StudentBadgeResource & {
  description: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rubrics: Array<Rubric>;
  step: Maybe<Scalars['Int']['output']>;
};

export type Attachment = {
  description: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  files: Array<AttachmentFile>;
  id: Scalars['ID']['output'];
  step: Maybe<Scalars['Int']['output']>;
};

export type AttachmentFile = {
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};


export type AttachmentFileUrlArgs = {
  options?: InputMaybe<PresignedUrlOptions>;
};

export type CareerReviewSurvey = {
  questions: Array<CareerReviewSurveyQuestion>;
};

export type CareerReviewSurveyQuestion = {
  id: Scalars['ID']['output'];
  options: Array<CareerReviewSurveyQuestionOption>;
  question: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type CareerReviewSurveyQuestionOption = {
  option: Scalars['String']['output'];
  step: Scalars['Int']['output'];
};

export type CheckInGroup = StudentBadgeResource & {
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  questions: Array<CheckInQuestion>;
  step: Maybe<Scalars['Int']['output']>;
};

export type CheckInQuestion = {
  id: Scalars['ID']['output'];
  question: Scalars['String']['output'];
  step: Maybe<Scalars['Int']['output']>;
};

export type Cluster = {
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pathways: Array<Pathway>;
  thumbnailUrl: Scalars['String']['output'];
};

export type ContactLink = {
  id: Scalars['ID']['output'];
  type: ContactLinkTypes;
  value: Scalars['String']['output'];
};

export enum ContactLinkTypes {
  /** Behance Contact Link */
  BEHANCE = 'BEHANCE',
  /** Custom Contact Link */
  CUSTOM = 'CUSTOM',
  /** Dribbble Contact Link */
  DRIBBBLE = 'DRIBBBLE',
  /** Email Contact Link */
  EMAIL = 'EMAIL',
  /** Instagram Contact Link */
  INSTAGRAM = 'INSTAGRAM',
  /** Linkedin Contact Link */
  LINKEDIN = 'LINKEDIN',
  /** Phone Contact Link */
  PHONE = 'PHONE'
}

export type Course = StudentBadgeResource & {
  assignments: Maybe<Array<Assignment>>;
  content: Array<CourseContent>;
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  lesson: Lesson;
  lessons: Array<Lesson>;
  match: Maybe<Scalars['Int']['output']>;
  metadata: CourseMetadata;
  name: Scalars['String']['output'];
  pathway: Maybe<Pathway>;
  reviewSurvey: Maybe<CareerReviewSurvey>;
  status: CourseStatuses;
  thumbnailUrl: Scalars['String']['output'];
  type: CourseTypes;
};


export type CourseLessonArgs = {
  id: Scalars['ID']['input'];
  track?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CourseContent = {
  checkIns: Array<LessonItem>;
  extensionFields: Array<ExtensionField>;
  id: Scalars['ID']['output'];
  items: Array<LessonItem>;
  name: Scalars['String']['output'];
  type: LessonTypes;
};

export type CourseMetadata = {
  alternativeTitles: Maybe<Scalars['String']['output']>;
  averageSalary: Maybe<Scalars['String']['output']>;
  jobZone: Maybe<Scalars['String']['output']>;
  onetCode: Maybe<Scalars['String']['output']>;
  outlook: Maybe<Scalars['String']['output']>;
};

export enum CourseStatuses {
  /** Status for draft courses */
  DRAFT = 'DRAFT',
  /** Status for published courses */
  PUBLISHED = 'PUBLISHED'
}

export enum CourseTypes {
  /** Courses of high school type */
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  /** Courses of middle school type */
  MIDDLE_SCHOOL = 'MIDDLE_SCHOOL'
}

export type ExtensionField = {
  archivedAt: Maybe<Scalars['ISO8601DateTime']['output']>;
  clusters: Array<Cluster>;
  courses: Array<Course>;
  description: Scalars['String']['output'];
  files: Array<ExtensionFieldFile>;
  id: Scalars['ID']['output'];
  imageUrl: Maybe<Scalars['String']['output']>;
  links: Array<ExtensionFieldLink>;
  name: Scalars['String']['output'];
  pathways: Array<Pathway>;
  publishedFrom: Maybe<Scalars['ISO8601DateTime']['output']>;
  publishedTo: Maybe<Scalars['ISO8601DateTime']['output']>;
  status: ExtensionFieldStatuses;
};

export type ExtensionFieldFile = {
  archivedAt: Maybe<Scalars['ISO8601DateTime']['output']>;
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};


export type ExtensionFieldFileUrlArgs = {
  options?: InputMaybe<PresignedUrlOptions>;
};

export type ExtensionFieldLink = {
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export enum ExtensionFieldStatuses {
  /** Status for draft extension fields */
  DRAFT = 'DRAFT',
  /** Status for published extension fields */
  PUBLISHED = 'PUBLISHED'
}

export type ExternalPresentation = {
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isExpandable: Scalars['Boolean']['output'];
  source: Scalars['String']['output'];
  step: Scalars['Int']['output'];
};

export type Lesson = StudentBadgeResource & {
  archivedAt: Maybe<Scalars['ISO8601DateTime']['output']>;
  assignments: Array<Assignment>;
  attachments: Array<Attachment>;
  careerReviewSurvey: Maybe<CareerReviewSurvey>;
  checkInGroups: Array<CheckInGroup>;
  checkInQuestions: Array<CheckInQuestion>;
  courses: Array<Course>;
  description: Maybe<LessonDescription>;
  externalPresentations: Array<ExternalPresentation>;
  hasPresentation: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  researchLinks: Array<ResearchLink>;
  step: Maybe<Scalars['Int']['output']>;
  texts: Array<Text>;
  thumbnailUrl: Scalars['String']['output'];
  type: Scalars['String']['output'];
  videos: Array<Video>;
  vocabularies: Array<Vocabulary>;
};

export type LessonDescription = {
  audience: Maybe<Scalars['String']['output']>;
  goal: Maybe<Scalars['String']['output']>;
  introduction: Maybe<Scalars['String']['output']>;
  role: Maybe<Scalars['String']['output']>;
  situation: Maybe<Scalars['String']['output']>;
};

export type LessonItem = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  step: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

export enum LessonTypes {
  /** Career cluster lesson type */
  CAREER_CLUSTER = 'CAREER_CLUSTER',
  /** Career readiness lesson type */
  CAREER_READINESS = 'CAREER_READINESS',
  /** Career review survey lesson type */
  CAREER_REVIEW_SURVEY = 'CAREER_REVIEW_SURVEY',
  /** Dig deeper into career lesson type */
  DIG_DEEPER_INTO_CAREER = 'DIG_DEEPER_INTO_CAREER',
  /** Experience opportunity lesson type */
  EXPERIENCE_OPPORTUNITY = 'EXPERIENCE_OPPORTUNITY',
  /** Generic lesson type */
  GENERIC = 'GENERIC',
  /** Pathway lesson type */
  PATHWAY = 'PATHWAY',
  /** Project lesson type */
  PROJECT = 'PROJECT',
  /** Virtual internship lesson type */
  VIRTUAL_INTERNSHIP = 'VIRTUAL_INTERNSHIP'
}

export type Pathway = {
  cluster: Cluster;
  courses: Array<Course>;
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  thumbnailUrl: Scalars['String']['output'];
};

export enum PortfolioKind {
  /** Portfolio projects created in Careers */
  CAREERS = 'CAREERS',
  /** Portfolio projects created in Learning */
  LEARNING = 'LEARNING',
  /**
   * Portfolio projects created in Learning (PBL)
   * @deprecated {:reason=>"Use LEARNING instead"}
   */
  PBL = 'PBL',
  /** Personal portfolio projects */
  PERSONAL = 'PERSONAL'
}

export type PortfolioProject = {
  description: Maybe<Scalars['String']['output']>;
  finishedAt: Scalars['ISO8601Date']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Maybe<Scalars['String']['output']>;
  isTeamSubmission: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  parentName: Maybe<Scalars['String']['output']>;
  portfolioKind: PortfolioKind;
  resourceClass: PortfolioResourceClass;
  startedAt: Maybe<Scalars['ISO8601Date']['output']>;
  submission: PortfolioSubmission;
  thumbnailUrl: Maybe<Scalars['String']['output']>;
  type: Maybe<PortfolioProjectKind>;
};

export enum PortfolioProjectKind {
  /** Course */
  COURSE = 'COURSE',
  /**
   * Lesson
   * @deprecated Use `COURSE` instead
   */
  LESSON = 'LESSON',
  /** Opportunity */
  OPPORTUNITY = 'OPPORTUNITY',
  /** Virtual Internship */
  VIRTUAL_INTERNSHIP = 'VIRTUAL_INTERNSHIP'
}

export enum PortfolioResourceClass {
  /** Portfolio projects created in Careers */
  ASSIGNMENT_SUBMISSION = 'ASSIGNMENT_SUBMISSION',
  /** All portfolio projects */
  OPPORTUNITY_APPLICATION = 'OPPORTUNITY_APPLICATION',
  /** Personal portfolio projects */
  PORTFOLIO_PROJECT = 'PORTFOLIO_PROJECT',
  /** Portfolio projects created in Learning */
  PRODUCT_SUBMISSION = 'PRODUCT_SUBMISSION'
}

export type PortfolioSubmission = {
  files: Array<PortfolioSubmissionFile>;
  status: Maybe<SubmissionStatus>;
};

export type PortfolioSubmissionFile = {
  createdAt: Scalars['ISO8601DateTime']['output'];
  filename: Scalars['String']['output'];
  googleWeblink: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isOwner: Scalars['Boolean']['output'];
  source: Maybe<SubmissionFileSource>;
  submitter: ProductSubmissionFileSubmitter;
  url: Scalars['String']['output'];
};

/** Options for AWS Presigned URLs */
export type PresignedUrlOptions = {
  responseContentDisposition?: InputMaybe<Scalars['String']['input']>;
};

export type Product = StudentBadgeResource & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** Returns who submitted the product submission file */
export type ProductSubmissionFileSubmitter = {
  firstName: Maybe<Scalars['String']['output']>;
  fullName: Maybe<Scalars['String']['output']>;
  lastName: Maybe<Scalars['String']['output']>;
};

export type ResearchLink = {
  author: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  resourceLink: Scalars['String']['output'];
  sourceName: Scalars['String']['output'];
  step: Scalars['Int']['output'];
};

export type Resume = {
  avatarUrl: Maybe<Scalars['String']['output']>;
  bio: Maybe<Scalars['String']['output']>;
  contactLinks: Array<ContactLink>;
  educations: Array<ResumeItem>;
  experiences: Array<ResumeItem>;
  extraCurriculars: Array<ResumeItem>;
  highlightedBadges: Array<StudentBadge>;
  highlightedProjects: Array<PortfolioProject>;
  highlightedProjectsEnabled: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type ResumeItem = {
  description: Maybe<Scalars['String']['output']>;
  endedAt: Maybe<Scalars['ISO8601Date']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  startedAt: Scalars['ISO8601Date']['output'];
  type: ResumeItemTypes;
};

export enum ResumeItemTypes {
  /** Education Resume Item */
  EDUCATION = 'EDUCATION',
  /** Experience Resume Item */
  EXPERIENCE = 'EXPERIENCE',
  /** Extra curricular Resume Item */
  EXTRA_CURRICULAR = 'EXTRA_CURRICULAR'
}

/** All queries for Public schema [Careers] */
export type Root = {
  course: Maybe<Course>;
  sharedResume: Resume;
};


/** All queries for Public schema [Careers] */
export type RootCourseArgs = {
  code: Scalars['String']['input'];
  shareId: Scalars['ID']['input'];
  track?: InputMaybe<Scalars['Boolean']['input']>;
};


/** All queries for Public schema [Careers] */
export type RootSharedResumeArgs = {
  shareCode: Scalars['String']['input'];
};

export type Rubric = {
  criteriaLabels: Array<RubricCriteriaLabel>;
  criterias: Array<RubricCriteria>;
  description: Scalars['String']['output'];
  headings: Array<RubricHeading>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type RubricCriteria = {
  id: Scalars['ID']['output'];
  rubricCriteriaLabelId: Scalars['ID']['output'];
  rubricHeadingId: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type RubricCriteriaLabel = {
  displayName: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  score: Scalars['Int']['output'];
  uuid: Scalars['ID']['output'];
};

export type RubricHeading = {
  id: Scalars['ID']['output'];
  multiplier: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  uuid: Scalars['ID']['output'];
};

export type Student = ProductSubmissionFileSubmitter & {
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
};

export type StudentBadge = {
  createdAt: Scalars['ISO8601DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  isHighlighted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  resource: StudentBadgeResource;
  thumbnailUrl: Scalars['String']['output'];
};

/** Returns for which resource badge was awarded */
export type StudentBadgeResource = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export enum SubmissionFileSource {
  /** Submissions uploaded from Google Drive */
  GOOGLE = 'GOOGLE',
  /** Submissions uploaded from disk */
  LOCAL = 'LOCAL'
}

export enum SubmissionStatus {
  /** Submissions of draft status */
  DRAFT = 'DRAFT',
  /** Submissions of submitted status */
  SUBMITTED = 'SUBMITTED'
}

export type Task = StudentBadgeResource & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Text = {
  content: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  step: Scalars['Int']['output'];
};

export type User = ProductSubmissionFileSubmitter & {
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
};

export type Video = {
  description: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  step: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type VirtualInternship = StudentBadgeResource & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Vocabulary = {
  definition: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  step: Scalars['Int']['output'];
  term: Scalars['String']['output'];
};
