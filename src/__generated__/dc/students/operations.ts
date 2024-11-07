import * as Types from './types';

export type CourseBaseInfoFragment = { id: string, description: string | null, imageUrl: string, name: string };

export type CourseMetadataFragment = { metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null } };

export type FinalReportCourseFragment = { id: string, name: string, description: string | null, assignments: Array<{ id: string, displayName: string, submission: { id: string, files: Array<{ id: string, filename: string, url: string }> } | null }> | null, pathway: { name: string, cluster: { name: string } } | null, reviewSurvey: { questions: Array<{ id: string, answer: Array<string | null>, question: string }> } | null };

export type AddOpportunityToFavoritesMutationVariables = Types.Exact<{
  input: Types.AddOpportunityToFavoritesMutationInput;
}>;


export type AddOpportunityToFavoritesMutation = { addOpportunityToFavorites: { opportunity: { id: string, isFavorite: boolean } } | null };

export type CreateAssessmentAttemptMutationVariables = Types.Exact<{
  input: Types.CreateAssessmentAttemptMutationInput;
}>;


export type CreateAssessmentAttemptMutation = { createAssessmentAttempt: { id: string } | null };

export type CreateAssignmentSubmissionMutationVariables = Types.Exact<{
  input: Types.CreateAssignmentSubmissionMutationInput;
}>;


export type CreateAssignmentSubmissionMutation = { createAssignmentSubmission: { assignmentSubmission: { id: string } | null } | null };

export type CreateAssignmentSubmissionFileMutationVariables = Types.Exact<{
  input: Types.CreateAssignmentSubmissionFileMutationInput;
}>;


export type CreateAssignmentSubmissionFileMutation = { createAssignmentSubmissionFile: { assignmentSubmissionFile: { filename: string, id: string, url: string } | null } | null };

export type CreateAssignmentSubmissionFileFromGoogleDriveMutationVariables = Types.Exact<{
  input: Types.CreateAssignmentSubmissionFileFromGoogleDriveMutationInput;
}>;


export type CreateAssignmentSubmissionFileFromGoogleDriveMutation = { createAssignmentSubmissionFileFromGoogleDrive: { assignmentSubmissionFile: { filename: string, googleWeblink: string | null, id: string, source: string, url: string } | null } | null };

export type CreateCareerReviewSurveyAnswersMutationVariables = Types.Exact<{
  input: Types.CreateCareerReviewSurveyAnswersMutationInput;
}>;


export type CreateCareerReviewSurveyAnswersMutation = { createCareerReviewSurveyAnswers: { status: string } | null };

export type CreateCareerReviewSurveyAttemptMutationVariables = Types.Exact<{
  input: Types.CreateCareerReviewSurveyAttemptMutationInput;
}>;


export type CreateCareerReviewSurveyAttemptMutation = { createCareerReviewSurveyAttempt: { careerReviewSurveyAttempt: { id: string, status: Types.CareerReviewSurveyAttemptStatus } | null } | null };

export type DcCreateCheckInQuestionAnswerMutationVariables = Types.Exact<{
  input: Types.CreateCheckInQuestionAnswerMutationInput;
}>;


export type DcCreateCheckInQuestionAnswerMutation = { createCheckInQuestionAnswer: { checkInQuestionAnswer: { answer: string | null, id: string } } | null };

export type CreateInstitutionApplicationMutationVariables = Types.Exact<{
  input: Types.CreateInstitutionApplicationMutationInput;
}>;


export type CreateInstitutionApplicationMutation = { createInstitutionApplication: { institutionApplication: { id: string, name: string } } | null };

export type CreateOpportunityApplicationMutationVariables = Types.Exact<{
  input: Types.CreateOpportunityApplicationMutationInput;
}>;


export type CreateOpportunityApplicationMutation = { createOpportunityApplication: { opportunityApplication: { status: Types.ApplicationStatus, answers: Array<{ answer: string, question: { id: string } }>, opportunity: { id: string, applicationStatus: Types.ApplicationStatus | null } } } | null };

export type CreatePortfolioProjectMutationVariables = Types.Exact<{
  input: Types.CreatePortfolioProjectMutationInput;
}>;


export type CreatePortfolioProjectMutation = { createPortfolioProject: { portfolioProject: { description: string | null, id: string, imageUrl: string | null, name: string, submission: { files: Array<{ filename: string, id: string, url: string }> } } | null } | null };

export type CreatePortfolioProjectFileMutationVariables = Types.Exact<{
  input: Types.CreatePortfolioProjectFileMutationInput;
}>;


export type CreatePortfolioProjectFileMutation = { createPortfolioProjectFile: { portfolioProjectFile: { filename: string, id: string, url: string } | null } | null };

export type CreateResumeMutationVariables = Types.Exact<{
  input: Types.CreateResumeMutationInput;
}>;


export type CreateResumeMutation = { createResume: { resume: { filename: string, id: string, url: string } | null } | null };

export type CreateStudentItemMutationVariables = Types.Exact<{
  input: Types.CreateStudentItemMutationInput;
}>;


export type CreateStudentItemMutation = { createStudentItem: { status: string } | null };

export type DeleteAssignmentSubmissionFileMutationVariables = Types.Exact<{
  input: Types.DeleteAssignmentSubmissionFileMutationInput;
}>;


export type DeleteAssignmentSubmissionFileMutation = { deleteAssignmentSubmissionFile: { status: string | null } | null };

export type DeleteInstitutionApplicationMutationVariables = Types.Exact<{
  input: Types.DeleteInstitutionApplicationMutationInput;
}>;


export type DeleteInstitutionApplicationMutation = { deleteInstitutionApplication: { status: string } | null };

export type DeleteOpportunityApplicationMutationVariables = Types.Exact<{
  input: Types.DeleteOpportunityApplicationMutationInput;
}>;


export type DeleteOpportunityApplicationMutation = { deleteOpportunityApplication: { status: string } | null };

export type DeletePortfolioProjectMutationVariables = Types.Exact<{
  input: Types.DeletePortfolioProjectMutationInput;
}>;


export type DeletePortfolioProjectMutation = { deletePortfolioProject: { status: string | null } | null };

export type DeletePortfolioProjectFileMutationVariables = Types.Exact<{
  input: Types.DeletePortfolioProjectFileMutationInput;
}>;


export type DeletePortfolioProjectFileMutation = { deletePortfolioProjectFile: { status: string | null } | null };

export type DeleteResumeMutationVariables = Types.Exact<{
  input: Types.DeleteResumeMutationInput;
}>;


export type DeleteResumeMutation = { deleteResume: { status: string | null } | null };

export type DisenrollFromCourseMutationVariables = Types.Exact<{
  input: Types.DisenrollFromCourseMutationInput;
}>;


export type DisenrollFromCourseMutation = { disenrollFromCourse: { courseId: string } | null };

export type EnrollInCourseMutationVariables = Types.Exact<{
  input: Types.EnrollInCourseMutationInput;
}>;


export type EnrollInCourseMutation = { enrollInCourse: { course: { id: string, imageUrl: string, name: string, status: Types.CourseStatuses, progress: { submitted: number, total: number }, pathway: { name: string } | null } } | null };

export type FinishAssessmentMutationVariables = Types.Exact<{
  attemptId: Types.Scalars['ID']['input'];
}>;


export type FinishAssessmentMutation = { createAssessmentResult: { status: string } | null };

export type GenerateFerpaUrlMutationVariables = Types.Exact<{
  input: Types.GenerateFerpaUrlMutationInput;
}>;


export type GenerateFerpaUrlMutation = { generateFerpaUrl: { url: string } | null };

export type GeneratePresignedUploadUrlMutationVariables = Types.Exact<{
  input: Types.GeneratePresignedUploadUrlMutationInput;
}>;


export type GeneratePresignedUploadUrlMutation = { generatePresignedUploadUrl: { url: string, uuid: string } | null };

export type ManageOpportunityExperienceLessonsMutationVariables = Types.Exact<{
  input: Types.ManageOpportunityExperienceLessonsMutationInput;
}>;


export type ManageOpportunityExperienceLessonsMutation = { manageOpportunityExperienceLessons: { virtualInternship: { id: string, studentExperienceOpportunityLessons: Array<{ type: string, id: string, name: string, thumbnailUrl: string, progress: { submitted: number, total: number } }>, content: Array<{ id: string, name: string, type: Types.LessonTypes, items: Array<{ id: string, name: string, type: string, completed: boolean }>, checkIns: Array<{ id: string, name: string, type: string, completed: boolean }> }> } | null } | null };

export type MarkFinalReportAsSeenMutationVariables = Types.Exact<{
  input: Types.MarkFinalReportAsSeenMutationInput;
}>;


export type MarkFinalReportAsSeenMutation = { markFinalReportAsSeen: { status: string } | null };

export type RemoveOpportunityFromFavoritesMutationVariables = Types.Exact<{
  input: Types.RemoveOpportunityFromFavoritesMutationInput;
}>;


export type RemoveOpportunityFromFavoritesMutation = { removeOpportunityFromFavorites: { opportunity: { id: string, isFavorite: boolean } } | null };

export type SaveAssessmentProgressMutationVariables = Types.Exact<{
  async: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  attemptId: Types.Scalars['ID']['input'];
  interestsAnswers: Array<Types.InterestsAnswerAttributes> | Types.InterestsAnswerAttributes;
  studyPreferencesAnswers: Array<Types.StudyPreferencesAnswerAttributes> | Types.StudyPreferencesAnswerAttributes;
  workValuesAnswers: Array<Types.WorkValuesAnswerAttributes> | Types.WorkValuesAnswerAttributes;
}>;


export type SaveAssessmentProgressMutation = { createInterestsAnswers: { status: string } | null, createWorkValuesAnswers: { status: string } | null, createStudyPreferencesAnswers: { status: string } | null };

export type SelectCounselorMutationVariables = Types.Exact<{
  input: Types.SelectCounselorMutationInput;
}>;


export type SelectCounselorMutation = { selectCounselor: { counselor: { email: string | null, firstName: string | null, lastName: string | null } | null } | null };

export type SelectTeachersMutationVariables = Types.Exact<{
  input: Types.SelectTeachersMutationInput;
}>;


export type SelectTeachersMutation = { selectTeachers: { teachers: Array<{ email: string | null, fullName: string | null, name: string | null, username: string | null, uuid: string }> } | null };

export type ToggleInstitutionFavoriteMutationVariables = Types.Exact<{
  input: Types.ToggleInstitutionFavoriteMutationInput;
}>;


export type ToggleInstitutionFavoriteMutation = { toggleInstitutionFavorite: { institution: { id: string, name: string, isFavorite: boolean } | null } | null };

export type UpdateAssessmentAttemptMutationVariables = Types.Exact<{
  input: Types.UpdateAssessmentAttemptMutationInput;
}>;


export type UpdateAssessmentAttemptMutation = { updateAssessmentAttempt: { status: string } | null };

export type UpdateAssignmentSubmissionMutationVariables = Types.Exact<{
  input: Types.UpdateAssignmentSubmissionMutationInput;
}>;


export type UpdateAssignmentSubmissionMutation = { updateAssignmentSubmission: { clientMutationId: string | null, assignmentSubmission: { id: string, status: Types.AssignmentSubmissionStatus, files: Array<{ filename: string }>, grade: { createdAt: string, id: string } | null } | null } | null };

export type DcUpdateCheckInQuestionAnswerMutationVariables = Types.Exact<{
  input: Types.UpdateCheckInQuestionAnswerMutationInput;
}>;


export type DcUpdateCheckInQuestionAnswerMutation = { updateCheckInQuestionAnswer: { checkInQuestionAnswer: { answer: string | null, id: string } | null } | null };

export type UpdateCommonAppMetadataMutationVariables = Types.Exact<{
  input: Types.UpdateCommonAppMetadataMutationInput;
}>;


export type UpdateCommonAppMetadataMutation = { updateCommonAppMetadata: { userInfo: { email: string | null, hasCompletedAssessment: boolean, hasCompletedOnboarding: boolean, hasUnreadConversation: boolean, hasAccessToPbl: boolean, firstName: string | null, isImpersonated: boolean, lastName: string | null, state: Types.UsStates | null, unreadAnnouncementsCount: number, unreadNotificationsCount: number, username: string | null, uuid: string, settings: { assessmentEnabled: boolean, assessmentType: Types.AssessmentTypes, onboardingEnabled: boolean, selfEvaluationEnabled: boolean }, commonAppData: { connectionUrl: string, hasAccountConnected: boolean, hasFerpaSigned: boolean } } } | null };

export type UpdateInstitutionMutationVariables = Types.Exact<{
  input: Types.UpdateInstitutionApplicationMutationInput;
}>;


export type UpdateInstitutionMutation = { updateInstitutionApplication: { institutionApplication: { status: Types.InstitutionApplicationStatuses, name: string } | null } | null };

export type UpdateNotificationMutationVariables = Types.Exact<{
  input: Types.UpdateNotificationMutationInput;
}>;


export type UpdateNotificationMutation = { updateNotification: { notification: { id: string, read: boolean } } | null };

export type UpdatePortfolioProjectMutationVariables = Types.Exact<{
  input: Types.UpdatePortfolioProjectMutationInput;
}>;


export type UpdatePortfolioProjectMutation = { updatePortfolioProject: { portfolioProject: { description: string | null, id: string, imageUrl: string | null, name: string, submission: { files: Array<{ filename: string, id: string, url: string }> } } } | null };

export type AllCoursesQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.StudentCourseFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type AllCoursesQuery = { allCourses: { pagesCount: number, nodes: Array<{ id: string, imageUrl: string, thumbnailUrl: string, match: number | null, name: string, type: Types.CourseTypes, isRecommended: boolean, isEnrolled: boolean, pathway: { name: string } | null, collection: { id: string, name: string } | null, metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null } }> } };

export type AnnouncementQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type AnnouncementQuery = { announcement: { body: string, createdAt: string, id: string, name: string, author: { email: string | null, firstName: string | null, lastName: string | null, username: string | null, uuid: string }, target: { name: string | null, uuid: string } } | null };

export type AnnouncementsQueryVariables = Types.Exact<{
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
  before: Types.InputMaybe<Types.Scalars['String']['input']>;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type AnnouncementsQuery = { announcements: { pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null }, edges: Array<{ cursor: string, node: { body: string, createdAt: string, id: string, name: string, author: { uuid: string, firstName: string | null, lastName: string | null, username: string | null }, target: { name: string | null, uuid: string } } | null } | null> | null } };

export type StudentAssesmentCourseQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type StudentAssesmentCourseQuery = { course: { id: string, imageUrl: string, thumbnailUrl: string } };

export type AssessmentAttemptStatusQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AssessmentAttemptStatusQuery = { assessmentProgress: { attempt: { assessmentType: Types.AssessmentTypes, updatedAt: string, id: string, status: Types.AssessmentAttemptStatus } | null } | null };

export type AssessmentResultsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AssessmentResultsQuery = { assessmentProgress: { result: { id: string, additionalPathways: Array<{ id: string, description: string | null, name: string, imageUrl: string, cluster: { name: string }, courses: Array<{ id: string, description: string | null, name: string, status: Types.CourseStatuses, type: Types.CourseTypes, metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null } }> }>, recommendedPathways: Array<{ id: string, description: string | null, name: string, imageUrl: string, cluster: { name: string }, courses: Array<{ id: string, description: string | null, name: string, status: Types.CourseStatuses, type: Types.CourseTypes, metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null } }> }> } | null } | null, currentCourses: Array<{ id: string, description: string | null, name: string }> };

export type AssessmentStepsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AssessmentStepsQuery = { assessmentProgress: { attempt: { assessmentType: Types.AssessmentTypes, id: string, status: Types.AssessmentAttemptStatus } | null, interestsAnswers: Array<{ checked: boolean, option: { id: string, group: { id: string } } }>, status: { interests: Types.AssessmentStatuses, studyPreferences: Types.AssessmentStatuses, workValues: Types.AssessmentStatuses, reviewSurvey: Types.AssessmentStatuses }, studyPreferencesAnswers: Array<{ position: number, option: { id: string } }>, workValuesAnswers: Array<{ tokens: number, option: { id: string } }>, reviewSurveyAnswers: Array<{ answer: Array<string | null>, id: string, question: { id: string } }> } | null };

export type AvailableCounselorsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AvailableCounselorsQuery = { availableCounselors: Array<{ email: string | null, firstName: string | null, fullName: string | null, lastName: string | null, name: string | null, username: string | null, uuid: string }> };

export type AvailableTeachersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AvailableTeachersQuery = { availableTeachers: { nodes: Array<{ email: string | null, fullName: string | null, name: string | null, username: string | null, uuid: string }> } };

export type CommonAppSyncStatusQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CommonAppSyncStatusQuery = { userInfo: { uuid: string, commonAppData: { syncStatus: { lastSyncedAt: string | null, status: Types.CommonAppSyncStatuses } | null } } };

export type CompletedCourseQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CompletedCourseQuery = { course: { id: string, lessons: Array<{ id: string, step: number | null, careerReviewSurvey: { performed: boolean } | null }>, progress: { submitted: number, total: number } } };

export type StudentCourseQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type StudentCourseQuery = { course: { description: string | null, id: string, imageUrl: string, name: string, type: Types.CourseTypes, lessons: Array<{ id: string, imageUrl: string, name: string, step: number | null, type: string, thumbnailUrl: string, careerReviewSurvey: { performed: boolean, version: number } | null, progress: { submitted: number, total: number } }>, pathway: { name: string } | null, progress: { submitted: number, total: number } } };

export type CurrentCoursesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentCoursesQuery = { currentCourses: Array<{ id: string, imageUrl: string, name: string, status: Types.CourseStatuses, thumbnailUrl: string, type: Types.CourseTypes, progress: { submitted: number, total: number }, pathway: { name: string } | null }> };

export type DashboardRecentResourcesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DashboardRecentResourcesQuery = { dashboardRecentResources: Array<{ resourceId: string, resourceType: Types.DashboardRecentResourceTypes, name: string, thumbnailUrl: string | null, imageUrl: string | null, updatedAt: string, pathways: Array<{ name: string }>, collection: { name: string } | null }> };

export type FinalReportQueryVariables = Types.Exact<{
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type FinalReportQuery = { finalReport: { additionalPathways: Array<{ id: string, name: string, imageUrl: string, description: string | null }>, recommendedCourses: Array<{ id: string, name: string, description: string | null, pathway: { id: string, name: string, cluster: { id: string, name: string } } | null }>, recommendedPathways: Array<{ id: string, name: string, imageUrl: string, description: string | null }>, assessmentAttempt: { id: string, updatedAt: string } | null, currentCourses: Array<{ id: string, name: string, description: string | null, assignments: Array<{ id: string, displayName: string, submission: { id: string, files: Array<{ id: string, filename: string, url: string }> } | null }> | null, pathway: { name: string, cluster: { name: string } } | null, reviewSurvey: { questions: Array<{ id: string, answer: Array<string | null>, question: string }> } | null }>, studyPreferencesResult: Array<{ area: string, description: string, position: number }>, workValuesResult: Array<{ score: number, workValue: string }>, interestsResult: Array<{ interest: string, score: number }> }, userInfo: { firstName: string | null, lastName: string | null } };

export type FinishedAssessmentStatusQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FinishedAssessmentStatusQuery = { assessmentProgress: { attempt: { id: string, status: Types.AssessmentAttemptStatus } | null } | null };

export type InstitutionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type InstitutionQuery = { institution: { id: string, type: string | null, applicationType: Types.InstitutionApplicationProvider | null, applicationId: string | null, name: string, size: string | null, sizeType: Types.InstitutionSizeTypes | null, sizeDescription: Types.InstitutionSizeDescriptions | null, hasApplied: boolean, cost: number | null, commonAppApplicationUrl: string | null, imageUrl: string | null, isFavorite: boolean, maxTeacherEval: number | null, minTeacherEval: number | null, thumbnailUrl: string | null, admissionRate: number | null, satMathMin: number | null, satMathMax: number | null, satReadingMin: number | null, satReadingMax: number | null, actMin: number | null, actMax: number | null, studentFacultyRatio: number | null, commonAppEnabled: boolean, degrees: Array<string>, isIpeds: boolean, address: { street: string | null, city: string | null, zip: string | null, state: string | null, stateCode: string | null, area: { kind: string | null, type: string | null } }, dates: Array<{ deadlineDate: string, decisionType: string, term: string | null }>, contact: { phone: string | null, urlAdmissions: string | null, urlApplications: string | null, urlFinancialAid: string | null, urlNetPriceCalculator: string | null, urlGeneral: string | null } } | null };

export type InstitutionApplicationQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type InstitutionApplicationQuery = { institutionApplication: { id: string, name: string, appliedAt: string | null, type: Types.InstitutionApplicationProvider, deadline: string | null, institution: { id: string }, recommenders: Array<{ email: string | null, firstName: string | null, lastName: string | null, type: Types.RecommenderKind | null, formStatuses: Array<{ formType: Types.CommonAppFormTypes, downloadedDate: string | null, submittedDate: string | null, status: Types.FormStatuses }> | null }> | null } | null };

export type InstitutionApplicationsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type InstitutionApplicationsQuery = { institutionApplications: { nodes: Array<{ id: string, name: string, type: Types.InstitutionApplicationProvider, status: Types.InstitutionApplicationStatuses, appliedAt: string | null, acceptsTeacherRecommendation: boolean, institution: { commonAppApplicationUrl: string | null, id: string, minTeacherEval: number | null, commonAppEnabled: boolean }, recommenders: Array<{ email: string | null, firstName: string | null, lastName: string | null, type: Types.RecommenderKind | null }> | null }> } };

export type InstitutionProgramsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.ProgramFilter>;
}>;


export type InstitutionProgramsQuery = { institution: { id: string, programs: { nodesCount: number, pagesCount: number, nodes: Array<{ title: string, degrees: Array<string> }> } } | null };

export type StudentInstitutionsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.StudentInstitutionFilter>;
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type StudentInstitutionsQuery = { institutions: { pagesCount: number, nodes: Array<{ type: string | null, sizeType: Types.InstitutionSizeTypes | null, sizeDescription: Types.InstitutionSizeDescriptions | null, cost: number | null, commonAppEnabled: boolean, thumbnailUrl: string | null, id: string, isFavorite: boolean, imageUrl: string | null, name: string, address: { city: string | null, stateCode: string | null } }> } };

export type InterestsGroupsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type InterestsGroupsQuery = { interestsGroups: Array<{ category: string, id: string, options: Array<{ activity: string, id: string, imageUrl: string | null }> }> };

export type InterestsResultQueryVariables = Types.Exact<{
  assessmentAttemptId: Types.Scalars['ID']['input'];
}>;


export type InterestsResultQuery = { interestsResult: Array<{ interest: string, score: number }> };

export type LessonInCourseExtensionsQueryVariables = Types.Exact<{
  courseId: Types.Scalars['ID']['input'];
  lessonId: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type LessonInCourseExtensionsQuery = { course: { id: string, lesson: { extensionFields: Array<{ description: string, id: string, imageUrl: string | null, name: string, files: Array<{ id: string, filename: string, url: string }>, links: Array<{ name: string, url: string }> }> } } };

export type LessonInCourseQueryVariables = Types.Exact<{
  courseId: Types.Scalars['ID']['input'];
  lessonId: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type LessonInCourseQuery = { course: { careerName: string | null, hasInstitutionsInStudentState: boolean, id: string, name: string, lesson: { hasPresentation: boolean, id: string, imageUrl: string, name: string, type: string, assignments: Array<{ description: string, displayName: string, id: string, step: number | null, submission: { id: string, updatedAt: string, status: Types.AssignmentSubmissionStatus, files: Array<{ filename: string, googleWeblink: string | null, id: string, source: string, url: string }>, rubricGrade: { pointsScored: number, pointsAvailable: number, results: Array<{ criteriaId: string, trait: string | null }>, lastGradedBy: { firstName: string | null, lastName: string | null, fullName: string | null, uuid: string } | null } | null, grade: { status: Types.SubmissionGradeStatuses, updatedAt: string, lastGradedBy: { firstName: string | null, lastName: string | null, fullName: string | null, uuid: string } | null } | null } | null, rubrics: Array<{ description: string, id: string, name: string, criteriaLabels: Array<{ displayName: string | null, id: string, score: number }>, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string }>, headings: Array<{ id: string, multiplier: number, name: string }> }> }>, attachments: Array<{ description: string, displayName: string, id: string, step: number | null, files: Array<{ filename: string, id: string, url: string }> }>, careerReviewSurvey: { version: number, performed: boolean, questions: Array<{ answer: Array<string | null>, id: string, question: string, type: string, options: Array<{ option: string, step: number }> }> } | null, checkInGroups: Array<{ displayName: string, id: string, step: number | null, questions: Array<{ id: string, question: string, answer: { answer: string | null, checkInQuestionId: string, id: string, studentId: string, updatedAt: string, grade: { updatedAt: string, status: Types.SubmissionGradeStatuses, lastGradedBy: { uuid: string, firstName: string | null, lastName: string | null } | null } | null } | null }> }>, checkInQuestions: Array<{ id: string, question: string, step: number | null, answer: { answer: string | null, checkInQuestionId: string, id: string, studentId: string, updatedAt: string, grade: { updatedAt: string, status: Types.SubmissionGradeStatuses, lastGradedBy: { uuid: string, firstName: string | null, lastName: string | null } | null } | null } | null }>, description: { introduction: string | null, goal: string | null, role: string | null, audience: string | null, situation: string | null } | null, externalPresentations: Array<{ displayName: string, id: string, source: string, isExpandable: boolean }>, researchLinks: Array<{ author: string, displayName: string, id: string, resourceLink: string, sourceName: string, step: number }>, texts: Array<{ content: string, displayName: string, id: string, step: number }>, videos: Array<{ description: string, displayName: string, filename: string, id: string, url: string, step: number }>, vocabularies: Array<{ definition: string, id: string, step: number, term: string }> }, lessons: Array<{ id: string, step: number | null, careerReviewSurvey: { performed: boolean } | null }>, progress: { submitted: number, total: number }, reviewSurvey: { questions: Array<{ id: string }> } | null, content: Array<{ checkIns: Array<{ completed: boolean }>, items: Array<{ type: string, completed: boolean }> }> } };

export type MarkOnboardingAsCompletedMutationVariables = Types.Exact<{
  input: Types.MarkOnboardingAsCompletedMutationInput;
}>;


export type MarkOnboardingAsCompletedMutation = { markOnboardingAsCompleted: { status: string } | null };

export type MyInstitutionsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type MyInstitutionsQuery = { myInstitutions: { pagesCount: number, nodes: Array<{ type: string | null, sizeType: Types.InstitutionSizeTypes | null, sizeDescription: Types.InstitutionSizeDescriptions | null, cost: number | null, thumbnailUrl: string | null, commonAppEnabled: boolean, id: string, isFavorite: boolean, imageUrl: string | null, name: string, address: { city: string | null, stateCode: string | null } }> } };

export type MyOpportunitiesQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type MyOpportunitiesQuery = { myOpportunities: { nodesCount: number, pagesCount: number, nodes: Array<{ applicationStatus: Types.ApplicationStatus | null, id: string, imageUrl: string | null, isFavorite: boolean, name: string, opportunityType: Types.OpportunityTypes, periodStart: string | null, periodEnd: string | null, deadline: string | null, imageFitToContainer: boolean, partner: { id: string, name: string } | null, virtualInternship: { id: string, roadmapItemsCount: number, requiredExperiences: number, status: Types.VirtualInternshipStatuses, readinessSkillsLessons: Array<{ id: string }> } | null, pathways: Array<{ id: string, name: string }> }> } };

export type DcNotificationsQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.NotificationStatus>;
  type: Types.NotificationTypes;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type DcNotificationsQuery = { notifications: { nodesCount: number, pagesCount: number, nodes: Array<{ body: string, id: string, read: boolean, type: Types.NotificationTypes, updatedAt: string, actor: { firstName: string | null, lastName: string | null, uuid: string }, target: { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } | { id: string } }> } };

export type StudentOpportunitiesQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.StudentOpportunityFilter>;
}>;


export type StudentOpportunitiesQuery = { opportunities: { nodesCount: number, pagesCount: number, nodes: Array<{ id: string, name: string, applicationStatus: Types.ApplicationStatus | null, isFavorite: boolean, isRecommended: boolean, imageUrl: string | null, opportunityType: Types.OpportunityTypes, deadline: string | null, periodStart: string | null, periodEnd: string | null, imageFitToContainer: boolean, partner: { id: string, name: string } | null, virtualInternship: { id: string, requiredExperiences: number, roadmapItemsCount: number, status: Types.VirtualInternshipStatuses, readinessSkillsLessons: Array<{ id: string }> } | null, pathways: Array<{ id: string, name: string }> }> } };

export type StudentOpportunityQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  trackVI: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type StudentOpportunityQuery = { opportunity: { id: string, name: string, applicationStatus: Types.ApplicationStatus | null, automaticAcceptance: boolean | null, availableSpots: number | null, creditsOutcomes: string | null, isFavorite: boolean, isRecommended: boolean, description: string, imageUrl: string | null, location: string | null, deadline: string | null, periodStart: string | null, periodEnd: string | null, opportunityType: Types.OpportunityTypes, salaryInformation: string | null, tags: Array<string>, visibilityScope: Types.VisibilityScope, imageFitToContainer: boolean, questions: Array<{ id: string, question: string }>, virtualInternship: { id: string, status: Types.VirtualInternshipStatuses, requiredExperiences: number, readinessSkillsLessons: Array<{ type: string, id: string, name: string, thumbnailUrl: string, progress: { submitted: number, total: number } }>, experienceOpportunityLessons: Array<{ type: string, id: string, name: string, thumbnailUrl: string, description: { audience: string | null, goal: string | null, introduction: string | null, role: string | null, situation: string | null } | null, progress: { submitted: number, total: number } }>, postExperienceLessons: Array<{ type: string, id: string, name: string, thumbnailUrl: string, progress: { submitted: number, total: number }, careerReviewSurvey: { performed: boolean } | null }>, calendarLessons: Array<{ type: string, id: string, name: string, thumbnailUrl: string, progress: { submitted: number, total: number } }>, studentExperienceOpportunityLessons: Array<{ type: string, id: string, name: string, thumbnailUrl: string, progress: { submitted: number, total: number } }> } | null, opportunityApplication: { id: string, answers: Array<{ answer: string }> } | null, pathways: Array<{ id: string, name: string }>, partner: { id: string, name: string } | null } | null };

export type OpportunityPeriodsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type OpportunityPeriodsQuery = { opportunity: { id: string, periodStart: string | null, periodEnd: string | null } | null };

export type OverallProgressQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type OverallProgressQuery = { overallProgress: { assessmentFinished: boolean, courseCompleted: boolean, enrolledInCourse: boolean, finalReportSeen: boolean } };

export type StudentPartnerOptionsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.StudentPartnerFilter>;
}>;


export type StudentPartnerOptionsQuery = { partners: { pagesCount: number, nodes: Array<{ id: string, name: string }> } };

export type PartnerOverviewQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type PartnerOverviewQuery = { partner: { about: string, additionalUrls: Array<string> | null, address: string | null, details: string | null, email: string | null, id: string, name: string, phone: string | null, thumbnailUrl: string | null, imageFitToContainer: boolean, imageUrl: string | null, url: string | null, courses: Array<{ id: string, name: string, thumbnailUrl: string, imageUrl: string, description: string | null, match: number | null, isEnrolled: boolean, status: Types.CourseStatuses, type: Types.CourseTypes, collection: { name: string } | null, pathway: { name: string } | null, metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null } }>, opportunities: Array<{ id: string, name: string, opportunityType: Types.OpportunityTypes, imageUrl: string | null, deadline: string | null, periodStart: string | null, periodEnd: string | null, applicationStatus: Types.ApplicationStatus | null, isFavorite: boolean, isRecommended: boolean, pathways: Array<{ id: string, name: string }>, virtualInternship: { status: Types.VirtualInternshipStatuses, roadmapItemsCount: number, readinessSkillsLessons: Array<{ id: string }> } | null }> } };

export type PartnersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PartnersQuery = { partners: { nodes: Array<{ id: string, name: string, thumbnailUrl: string | null, about: string, imageUrl: string | null, imageFitToContainer: boolean, opportunities: Array<{ id: string, opportunityType: Types.OpportunityTypes }>, courses: Array<{ id: string }> }> } };

export type PlanProgressQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PlanProgressQuery = { plans: Array<{ id: string, name: string, progress: { completed: number, total: number } } | null> };

export type RecommendedCoursesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RecommendedCoursesQuery = { recommendedCourses: Array<{ id: string, imageUrl: string, match: number | null, name: string, thumbnailUrl: string, type: Types.CourseTypes, pathway: { name: string } | null, collection: { id: string, name: string } | null, metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null } }> };

export type StudyPreferencesOptionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type StudyPreferencesOptionsQuery = { studyPreferencesOptions: Array<{ area: string, description: string, id: string }> };

export type StudyPreferencesResultQueryVariables = Types.Exact<{
  assessmentAttemptId: Types.Scalars['ID']['input'];
}>;


export type StudyPreferencesResultQuery = { studyPreferencesResult: Array<{ area: string, description: string, position: number }> };

export type SurveyQuestionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SurveyQuestionsQuery = { surveyQuestions: Array<{ id: string, question: string, type: string, options: Array<{ step: number, option: string }> }> };

export type CourseTableOfContentQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type CourseTableOfContentQuery = { course: { content: Array<{ id: string, name: string, type: Types.LessonTypes, surveyPerformed: boolean, items: Array<{ id: string, name: string, type: string, completed: boolean }>, checkIns: Array<{ id: string, name: string, type: string, completed: boolean }>, extensionFields: Array<{ name: string, id: string }> }> } };

export type DcStudentInfoQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DcStudentInfoQuery = { userInfo: { currentSchoolYear: number, email: string | null, hasCompletedAssessment: boolean, hasCompletedOnboarding: boolean, hasUnreadConversation: boolean, hasOpportunitiesEnabled: boolean, hasPlans: boolean, postSecondaryApplicationsEnabled: boolean, hasAccessToPbl: boolean, firstName: string | null, isImpersonated: boolean, lastName: string | null, logoUrl: string | null, iconUrl: string | null, state: Types.UsStates | null, unreadAnnouncementsCount: number, unreadNotificationsCount: number, username: string | null, uuid: string, welcomeMessage: string | null, settings: { assessmentEnabled: boolean, assessmentType: Types.AssessmentTypes, onboardingEnabled: boolean, selfEvaluationEnabled: boolean }, commonAppData: { canSelectCounselor: boolean, hasCounselorInvited: boolean, canChangeCounselor: boolean, connectionUrl: string, hasAccountConnected: boolean, hasFerpaSigned: boolean, syncStatus: { lastSyncedAt: string | null, status: Types.CommonAppSyncStatuses } | null, currentCounselor: { email: string | null, firstName: string | null, lastName: string | null, uuid: string } | null } } };

export type VirtualInternshipContentQueryVariables = Types.Exact<{
  opportunityId: Types.Scalars['ID']['input'];
}>;


export type VirtualInternshipContentQuery = { opportunity: { id: string, virtualInternship: { requiredExperiences: number, postExperienceLessons: Array<{ id: string, careerReviewSurvey: { performed: boolean, version: number } | null }>, studentExperienceOpportunityLessons: Array<{ id: string }>, content: Array<{ id: string, name: string, type: Types.LessonTypes, items: Array<{ id: string, name: string, type: string, completed: boolean }>, checkIns: Array<{ id: string, name: string, type: string, completed: boolean }> }> } | null } | null };

export type VirtualInternshipLessonQueryVariables = Types.Exact<{
  opportunityId: Types.Scalars['ID']['input'];
  lessonId: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type VirtualInternshipLessonQuery = { opportunity: { name: string, virtualInternship: { id: string, lesson: { hasPresentation: boolean, id: string, imageUrl: string, name: string, type: string, assignments: Array<{ description: string, displayName: string, id: string, step: number | null, submission: { id: string, status: Types.AssignmentSubmissionStatus, files: Array<{ filename: string, googleWeblink: string | null, id: string, source: string, url: string }>, grade: { status: Types.SubmissionGradeStatuses, lastGradedBy: { firstName: string | null, lastName: string | null, fullName: string | null, uuid: string } | null } | null } | null, rubrics: Array<{ description: string, id: string, name: string, criteriaLabels: Array<{ displayName: string | null, id: string, score: number }>, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string }>, headings: Array<{ id: string, multiplier: number, name: string }> }> }>, attachments: Array<{ description: string, displayName: string, id: string, step: number | null, files: Array<{ filename: string, id: string, url: string }> }>, careerReviewSurvey: { version: number, performed: boolean, questions: Array<{ answer: Array<string | null>, id: string, question: string, type: string, options: Array<{ option: string, step: number }> }> } | null, checkInGroups: Array<{ displayName: string, id: string, step: number | null, questions: Array<{ id: string, question: string, step: number | null, answer: { answer: string | null, checkInQuestionId: string, id: string, studentId: string, grade: { status: Types.SubmissionGradeStatuses, lastGradedBy: { uuid: string, firstName: string | null, lastName: string | null } | null } | null } | null }> }>, checkInQuestions: Array<{ id: string, question: string, step: number | null, answer: { answer: string | null, checkInQuestionId: string, id: string, studentId: string, grade: { status: Types.SubmissionGradeStatuses, lastGradedBy: { uuid: string, firstName: string | null, lastName: string | null } | null } | null } | null }>, description: { introduction: string | null, goal: string | null, role: string | null, audience: string | null, situation: string | null } | null, externalPresentations: Array<{ displayName: string, id: string, source: string, step: number, isExpandable: boolean }>, researchLinks: Array<{ author: string, displayName: string, id: string, resourceLink: string, sourceName: string, step: number }>, texts: Array<{ content: string, displayName: string, id: string, step: number }>, videos: Array<{ description: string, displayName: string, filename: string, id: string, url: string, step: number }>, vocabularies: Array<{ definition: string, id: string, step: number, term: string }>, progress: { accepted: number, submitted: number, total: number } } } | null } | null };

export type WorkValuesPairsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WorkValuesPairsQuery = { workValuesPairs: Array<{ id: string, options: Array<{ category: string, id: string, value: string }> }> };

export type WorkValuesResultQueryVariables = Types.Exact<{
  assessmentAttemptId: Types.Scalars['ID']['input'];
}>;


export type WorkValuesResultQuery = { workValuesResult: Array<{ score: number, workValue: string }> };
