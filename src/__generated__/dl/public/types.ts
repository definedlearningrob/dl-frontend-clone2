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

export type Abilities = TitleWithElements & {
  elements: Array<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
};

export type Assignment = StudentBadgeResource & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type BrightOutlookEntry = {
  category: Array<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
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
  exploreMoreAvailable: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Maybe<Scalars['String']['output']>;
  onetData: Maybe<CourseOnetData>;
  pathwayName: Maybe<Scalars['String']['output']>;
  thumbnailUrl: Scalars['String']['output'];
  type: CourseTypes;
};

export type CourseOnetData = {
  abilities: Array<Abilities>;
  alignedCourses: Array<Course>;
  alsoCalled: Array<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  education: Array<Scalars['String']['output']>;
  jobOutlook: Maybe<JobOutlook>;
  knowledge: Array<Knowledge>;
  onTheJob: Array<Scalars['String']['output']>;
  personality: Maybe<Personality>;
  skills: Array<Skills>;
  technology: Array<Technology>;
  title: Scalars['String']['output'];
  whatTheyDo: Scalars['String']['output'];
};

export enum CourseTypes {
  /** Courses of high school type */
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  /** Courses of middle school type */
  MIDDLE_SCHOOL = 'MIDDLE_SCHOOL'
}

export type JobOutlook = {
  brightOutlook: Maybe<BrightOutlookEntry>;
  outlook: Maybe<OutlookEntry>;
  salaryMedian: Maybe<Scalars['Int']['output']>;
};

export type Knowledge = TitleWithElements & {
  elements: Array<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
};

/** All public mutations */
export type LearningMutationsPublicRoot = {
  /** Mutation for tracking slide visits */
  trackSlideVisit: Maybe<TrackSlideVisitMutationPayload>;
};


/** All public mutations */
export type LearningMutationsPublicRootTrackSlideVisitArgs = {
  input: TrackSlideVisitMutationInput;
};

export type Lesson = StudentBadgeResource & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type OutlookEntry = {
  category: Maybe<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
};

export type Personality = TitleWithElements & {
  elements: Array<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
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

export type Presentation = {
  color: Maybe<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slideBackgroundImages: Array<SlideBackgroundImage>;
  slides: Array<Slide>;
  status: PresentationStatuses;
  transition: Maybe<Scalars['String']['output']>;
  type: PresentationTypes;
  typography: Maybe<Scalars['String']['output']>;
};

export enum PresentationStatuses {
  /** Status for draft presentations */
  DRAFT = 'DRAFT',
  /** Status for published presentations */
  PUBLISHED = 'PUBLISHED'
}

export enum PresentationTypes {
  /** Status for full screen presentations */
  FULL_SCREEN = 'FULL_SCREEN',
  /** Status for legacy presentations */
  LEGACY = 'LEGACY'
}

/** Options for AWS Presigned URLs */
export type PresignedUrlOptions = {
  responseContentDisposition?: InputMaybe<Scalars['String']['input']>;
};

export type Product = StudentBadgeResource & {
  description: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rubrics: Array<Rubric>;
  rubricsUrl: Maybe<Scalars['String']['output']>;
  step: Maybe<Scalars['Int']['output']>;
};

/** Returns who submitted the product submission file */
export type ProductSubmissionFileSubmitter = {
  firstName: Maybe<Scalars['String']['output']>;
  fullName: Maybe<Scalars['String']['output']>;
  lastName: Maybe<Scalars['String']['output']>;
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

/** All queries for Public schema [Learning] */
export type Root = {
  sharedResume: Resume;
  standardSets: Array<StandardSet>;
  task: Maybe<Task>;
};


/** All queries for Public schema [Learning] */
export type RootSharedResumeArgs = {
  shareCode: Scalars['String']['input'];
};


/** All queries for Public schema [Learning] */
export type RootStandardSetsArgs = {
  code: Scalars['String']['input'];
};


/** All queries for Public schema [Learning] */
export type RootTaskArgs = {
  code: Scalars['String']['input'];
  shareId: Scalars['ID']['input'];
  track?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Rubric = {
  criteriaLabels: Array<RubricCriteriaLabel>;
  criterias: Array<RubricCriteria>;
  description: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
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

export type Skills = TitleWithElements & {
  elements: Array<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
};

export type Slide = {
  backgroundColor: Maybe<Scalars['String']['output']>;
  backgroundImage: Maybe<Scalars['String']['output']>;
  checkInGroups: Array<CheckInGroup>;
  checkInQuestions: Array<CheckInQuestion>;
  content: SlideContent;
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  iframeUrl: Maybe<Scalars['String']['output']>;
  isShared: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  notes: Maybe<Scalars['String']['output']>;
  products: Array<Product>;
  slideBackgroundImages: Array<SlideBackgroundImage>;
  step: Scalars['Int']['output'];
  subslides: Maybe<Array<Slide>>;
  template: Scalars['String']['output'];
};

export type SlideBackgroundImage = {
  id: Scalars['ID']['output'];
  thumbnailUrl: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type SlideContent = {
  id: Scalars['ID']['output'];
  images: Array<SlideImage>;
  links: Array<SlideLink>;
  texts: Array<SlideTextItem>;
  videos: Array<SlideVideo>;
};

export type SlideImage = {
  contentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  position: Maybe<Scalars['String']['output']>;
  style: Scalars['String']['output'];
  thumbnailUrl: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type SlideLink = {
  contentId: Scalars['ID']['output'];
  targetId: Scalars['ID']['output'];
  targetName: Scalars['String']['output'];
  text: Scalars['String']['output'];
};

export type SlideTextItem = {
  contentId: Maybe<Scalars['String']['output']>;
  style: Maybe<Scalars['String']['output']>;
  type: Maybe<Scalars['String']['output']>;
  value: Maybe<Scalars['String']['output']>;
};

export type SlideVideo = {
  contentId: Scalars['String']['output'];
  filename: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  url: Maybe<Scalars['String']['output']>;
  videoUrl: Maybe<Scalars['String']['output']>;
};

export type Standard = {
  grade: Scalars['String']['output'];
  standardNumber: Scalars['String']['output'];
  standardText: Scalars['String']['output'];
  subject: Scalars['String']['output'];
};

export type StandardSet = {
  name: Scalars['String']['output'];
  setId: Scalars['ID']['output'];
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
  checkInGroups: Array<CheckInGroup>;
  checkInQuestions: Array<CheckInQuestion>;
  course: Course;
  courses: Array<Course>;
  description: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  files: Array<TaskFile>;
  id: Scalars['ID']['output'];
  imageUrl: Maybe<Scalars['String']['output']>;
  introduction: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  presentation: Maybe<Presentation>;
  presentationUrl: Maybe<Scalars['String']['output']>;
  products: Array<Product>;
  standard: Maybe<Scalars['String']['output']>;
  standards: Array<Standard>;
  studentResources: Maybe<Scalars['String']['output']>;
  teachingResources: Maybe<Scalars['String']['output']>;
  thumbnailUrl: Maybe<Scalars['String']['output']>;
  units: Array<Unit>;
};


export type TaskCourseArgs = {
  id: Scalars['ID']['input'];
};


export type TaskPresentationArgs = {
  track?: InputMaybe<Scalars['Boolean']['input']>;
};


export type TaskStandardsArgs = {
  setId: Scalars['String']['input'];
};

export type TaskFile = {
  description: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  step: Scalars['String']['output'];
  url: Scalars['String']['output'];
};


export type TaskFileUrlArgs = {
  options?: InputMaybe<PresignedUrlOptions>;
};

export type Technology = TitleWithElements & {
  elements: Array<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
};

/** Common fields for items that contain `title` and a list of `elements` */
export type TitleWithElements = {
  elements: Array<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
};

/** Autogenerated input type of TrackSlideVisitMutation */
export type TrackSlideVisitMutationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  slideId: Scalars['ID']['input'];
  taskId: Scalars['ID']['input'];
};

/** Autogenerated return type of TrackSlideVisitMutation. */
export type TrackSlideVisitMutationPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']['output']>;
  status: Maybe<Scalars['String']['output']>;
};

export type Unit = {
  description: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  thumbnailUrl: Scalars['String']['output'];
};

export type User = ProductSubmissionFileSubmitter & {
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
};

export type VirtualInternship = StudentBadgeResource & {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};
