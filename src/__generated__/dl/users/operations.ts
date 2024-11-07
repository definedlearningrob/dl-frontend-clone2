import * as Types from './types';

export type CourseDetailsFragment = { thumbnailUrl: string, name: string | null, pathwayName: string | null, onetData: { code: string, title: string, alsoCalled: Array<string>, whatTheyDo: string, education: Array<string>, onTheJob: Array<string>, personality: { title: string | null, elements: Array<string> } | null, jobOutlook: { salaryMedian: number | null, outlook: { category: string | null, description: string | null } | null, brightOutlook: { category: Array<string>, description: string | null } | null } | null, knowledge: Array<{ title: string | null, elements: Array<string> }>, skills: Array<{ title: string | null, elements: Array<string> }>, abilities: Array<{ title: string | null, elements: Array<string> }>, technology: Array<{ title: string | null, elements: Array<string> }>, alignedCourses: Array<{ id: string, name: string | null }> } | null };

export type ProjectDataFragment = { assignedStudentsCount: number, checkInsGradingNeededCount: number, description: string | null, displayName: string, id: string, introduction: string | null, presentationUrl: string | null, standard: string | null, status: Types.TaskStatuses, studentResources: string | null, submissionsGradingNeededCount: number, teachingResources: string | null, thumbnailUrl: string | null, copies: Array<{ id: string }> | null, checkInGroups: Array<{ displayName: string, id: string, name: string, step: number | null, questions: Array<{ id: string, gradingNeededCount: number, question: string, step: number | null, isHidden: boolean, owner: { uuid: string } | null }> }>, checkInQuestions: Array<{ id: string, gradingNeededCount: number, question: string, step: number | null, owner: { uuid: string } | null }>, courses: Array<{ id: string, name: string | null, thumbnailUrl: string, pathwayName: string | null, type: Types.CourseTypes }>, files: Array<{ description: string | null, displayName: string, filename: string, id: string, step: string, url: string }>, owner: { uuid: string } | null, presentation: { color: string | null, description: string | null, displayName: string, id: string, name: string, type: Types.PresentationTypes, status: Types.PresentationStatuses, transition: string | null, typography: string | null, slides: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, name: string, notes: string | null, step: number, template: string, products: Array<{ id: string, name: string, displayName: string, description: string | null, submissionsGradingNeededCount: number, gradingNeededCount: number, rubricsUrl: string | null, step: number | null, rubrics: Array<{ canEdit: boolean, description: string, displayName: string, hasAlignedStatements: boolean, id: string, name: string, pointsAvailable: number, uuid: string, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string, uuid: string }>, criteriaLabels: Array<{ displayName: string | null, id: string, score: number, uuid: string }>, headings: Array<{ id: string, multiplier: number, name: string, uuid: string }> }> }>, checkInQuestions: Array<{ gradingNeededCount: number, id: string, isArchived: boolean, question: string, step: number | null, owner: { email: string | null, firstName: string | null, lastName: string | null, username: string | null, uuid: string } | null }>, checkInGroups: Array<{ displayName: string, id: string, name: string, questions: Array<{ id: string, question: string, step: number | null }> }>, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, thumbnailUrl: string, position: string | null }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string | null, type: string | null, value: string | null, style: string | null }>, videos: Array<{ id: string, contentId: string, url: string | null, filename: string | null, videoUrl: string | null }> }, subslides: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, name: string, notes: string | null, step: number, template: string, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, position: string | null }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string | null, type: string | null, value: string | null, style: string | null }>, videos: Array<{ id: string, contentId: string, url: string | null, filename: string | null, videoUrl: string | null }> } }> | null }> } | null, sharedResource: { allowLogin: boolean, code: string } | null, units: Array<{ displayName: string, id: string }> };

export type StudentsFragment = { students: { nodesCount: number, pagesCount: number, nodes: Array<{ currentTasksCount: number, firstName: string | null, lastName: string | null, uuid: string, hasPlans: boolean, plans: Array<{ id: string }> }> } };

export type TeamFragment = { id: string, uuid: string, name: string, isArchived: boolean, students: { nodesCount: number, pagesCount: number, nodes: Array<{ currentTasksCount: number, firstName: string | null, lastName: string | null, uuid: string }> }, tasks: Array<{ displayName: string, id: string }> };

export type AppendCheckInItemsToTaskMutationVariables = Types.Exact<{
  input: Types.AppendCheckInItemsToTaskMutationInput;
}>;


export type AppendCheckInItemsToTaskMutation = { appendCheckInItemsToTask: { task: { id: string, checkInQuestions: Array<{ id: string, isArchived: boolean, question: string, step: number | null, owner: { uuid: string } | null }> } | null } | null };

export type DlArchiveCheckInQuestionMutationVariables = Types.Exact<{
  input: Types.ArchiveCheckInQuestionMutationInput;
}>;


export type DlArchiveCheckInQuestionMutation = { archiveCheckInQuestion: { checkInQuestion: { id: string } } | null };

export type ArchiveProjectMutationVariables = Types.Exact<{
  input: Types.ArchiveTaskMutationInput;
}>;


export type ArchiveProjectMutation = { archiveTask: { task: { id: string, isArchived: boolean } | null } | null };

export type ArchiveTeamMutationVariables = Types.Exact<{
  input: Types.ArchiveTeamMutationInput;
}>;


export type ArchiveTeamMutation = { archiveTeam: { team: { id: string, uuid: string, name: string, isArchived: boolean, students: { nodesCount: number, pagesCount: number, nodes: Array<{ currentTasksCount: number, firstName: string | null, lastName: string | null, uuid: string }> }, tasks: Array<{ displayName: string, id: string }> } } | null };

export type AssignStudentToProjectMutationVariables = Types.Exact<{
  input: Types.AssignStudentToTaskMutationInput;
}>;


export type AssignStudentToProjectMutation = { assignStudentToTask: { status: string } | null };

export type AssignTeamsToTaskMutationVariables = Types.Exact<{
  input: Types.AssignTeamsToTaskMutationInput;
}>;


export type AssignTeamsToTaskMutation = { assignTeamsToTask: { teams: Array<{ uuid: string }> } | null };

export type DlCreateCheckInQuestionMutationVariables = Types.Exact<{
  input: Types.CreateCheckInQuestionMutationInput;
}>;


export type DlCreateCheckInQuestionMutation = { createCheckInQuestion: { checkInQuestion: { id: string, isArchived: boolean, question: string, step: number | null, owner: { uuid: string } | null } | null } | null };

export type CreatePresentationMutationVariables = Types.Exact<{
  input: Types.CreatePresentationMutationInput;
}>;


export type CreatePresentationMutation = { createPresentation: { presentation: { id: string, name: string } | null } | null };

export type CreatePublicResourceMutationVariables = Types.Exact<{
  input: Types.CreatePublicResourceMutationInput;
}>;


export type CreatePublicResourceMutation = { createPublicResource: { publicResource: { id: string, url: string } | null } | null };

export type CreateQuickTaskMutationVariables = Types.Exact<{
  input: Types.CreateQuickTaskMutationInput;
}>;


export type CreateQuickTaskMutation = { createQuickTask: { task: { id: string } | null } | null };

export type CreateStudentSubmissionMutationVariables = Types.Exact<{
  input: Types.CreateStudentSubmissionMutationInput;
}>;


export type CreateStudentSubmissionMutation = { createProductSubmission: { productSubmission: { id: string } } | null };

export type CreateTeamMutationVariables = Types.Exact<{
  input: Types.CreateTeamMutationInput;
}>;


export type CreateTeamMutation = { createTeam: { team: { id: string, uuid: string, name: string, isArchived: boolean, students: { nodesCount: number, pagesCount: number, nodes: Array<{ currentTasksCount: number, firstName: string | null, lastName: string | null, uuid: string }> }, tasks: Array<{ displayName: string, id: string }> } } | null };

export type CreateTeamSubmissionMutationVariables = Types.Exact<{
  input: Types.CreateTeamSubmissionMutationInput;
}>;


export type CreateTeamSubmissionMutation = { createProductSubmission: { productSubmission: { id: string } } | null };

export type DuplicateProjectMutationVariables = Types.Exact<{
  input: Types.DuplicateTaskMutationInput;
}>;


export type DuplicateProjectMutation = { duplicateTask: { project: { id: string } | null } | null };

export type DuplicateTaskMutationVariables = Types.Exact<{
  input: Types.DuplicateTaskMutationInput;
}>;


export type DuplicateTaskMutation = { duplicateTask: { task: { id: string, name: string, assignedAt: string | null } | null } | null };

export type GradeProductSubmissionMutationVariables = Types.Exact<{
  input: Types.GradeProductSubmissionMutationInput;
}>;


export type GradeProductSubmissionMutation = { gradeProductSubmission: { grade: { updatedAt: string, pointsAvailable: number, pointsScored: number, lastGradedBy: { uuid: string, name: string | null } | null, results: Array<{ criteriaId: string, trait: string | null }> } | null } | null };

export type GradeSubmissionMutationVariables = Types.Exact<{
  input: Types.GradeCheckInSubmissionMutationInput;
}>;


export type GradeSubmissionMutation = { gradeCheckInSubmission: { submissionGrade: { id: string, status: Types.SubmissionGradeStatuses, updatedAt: string, lastGradedBy: { firstName: string | null, lastName: string | null } | null } } | null };

export type RecordProductMutationVariables = Types.Exact<{
  input: Types.UpdateLtiResourceMutationInput;
}>;


export type RecordProductMutation = { updateLtiResource: { ltiResource: { ltiResourceLinkId: string | null, contextId: string | null, consumerKey: string | null } | null, product: { name: string } | null, task: { name: string } | null, user: { dlUuid: string | null } | null } | null };

export type RestoreProjectMutationVariables = Types.Exact<{
  input: Types.RestoreTaskMutationInput;
}>;


export type RestoreProjectMutation = { restoreTask: { task: { id: string, isArchived: boolean } } | null };

export type ShareResourceMutationVariables = Types.Exact<{
  input: Types.ShareResourceMutationInput;
}>;


export type ShareResourceMutation = { shareResource: { sharedResource: { allowLogin: boolean, code: string } } | null };

export type ToggleCheckInQuestionHiddenMutationVariables = Types.Exact<{
  input: Types.ToggleCheckInQuestionHiddenMutationInput;
}>;


export type ToggleCheckInQuestionHiddenMutation = { toggleCheckInQuestionHidden: { checkInGroup: { id: string, questions: Array<{ id: string, isHidden: boolean }> } | null } | null };

export type ToggleProductHiddenMutationVariables = Types.Exact<{
  input: Types.ToggleProductHiddenMutationInput;
}>;


export type ToggleProductHiddenMutation = { toggleProductHidden: { task: { id: string, products: Array<{ id: string, hidden: boolean }> } | null } | null };

export type UnassignStudentFromProjectMutationVariables = Types.Exact<{
  input: Types.UnassignStudentFromTaskMutationInput;
}>;


export type UnassignStudentFromProjectMutation = { unassignStudentFromTask: { status: string } | null };

export type UnassignTeamsFromTaskMutationVariables = Types.Exact<{
  input: Types.UnassignTeamsFromTaskMutationInput;
}>;


export type UnassignTeamsFromTaskMutation = { unassignTeamsFromTask: { teams: Array<{ uuid: string }> } | null };

export type DlUpdateCheckInQuestionMutationVariables = Types.Exact<{
  input: Types.UpdateCheckInQuestionMutationInput;
}>;


export type DlUpdateCheckInQuestionMutation = { updateCheckInQuestion: { checkInQuestion: { id: string, question: string, tasks: Array<{ id: string, displayName: string }> } | null } | null };

export type DlUpdateEntitySettingsMutationVariables = Types.Exact<{
  input: Types.UpdateEntitySettingsMutationInput;
}>;


export type DlUpdateEntitySettingsMutation = { updateEntitySettings: { entity: { uuid: string, settings: { selfEvaluationEnabled: boolean } } | null } | null };

export type UpdateLtiResourceGradeMutationVariables = Types.Exact<{
  input: Types.UpdateLtiResourceGradeMutationInput;
}>;


export type UpdateLtiResourceGradeMutation = { updateLtiResourceGrade: { ltiResource: { ltiResourceLinkId: string | null } | null } | null };

export type UpdateProjectCheckInGroupMutationVariables = Types.Exact<{
  input: Types.UpdateTaskMutationInput;
}>;


export type UpdateProjectCheckInGroupMutation = { updateTask: { project: { checkInGroups: Array<{ displayName: string, id: string, name: string, step: number | null, questions: Array<{ id: string, isArchived: boolean, question: string, step: number | null, owner: { uuid: string } | null }> }> } | null } | null };

export type UpdateProjectCheckInQuestionMutationVariables = Types.Exact<{
  input: Types.UpdateTaskMutationInput;
}>;


export type UpdateProjectCheckInQuestionMutation = { updateTask: { project: { checkInQuestions: Array<{ id: string, isArchived: boolean, question: string, step: number | null, owner: { uuid: string } | null }> } | null } | null };

export type UpdateProjectDescriptionMutationVariables = Types.Exact<{
  input: Types.UpdateTaskMutationInput;
}>;


export type UpdateProjectDescriptionMutation = { updateTask: { project: { id: string, description: string | null } | null } | null };

export type UpdateTaskMutationVariables = Types.Exact<{
  input: Types.UpdateTaskMutationInput;
}>;


export type UpdateTaskMutation = { updateTask: { project: { id: string, displayName: string } | null } | null };

export type UpdateIntroductionMutationVariables = Types.Exact<{
  input: Types.UpdateTaskMutationInput;
}>;


export type UpdateIntroductionMutation = { updateTask: { project: { id: string, introduction: string | null } | null } | null };

export type UpdateProjectProductMutationVariables = Types.Exact<{
  input: Types.UpdateProductMutationInput;
}>;


export type UpdateProjectProductMutation = { updateProduct: { product: { id: string, description: string | null, displayName: string } | null } | null };

export type UpdateProjectStatusMutationVariables = Types.Exact<{
  input: Types.UpdateTaskMutationInput;
}>;


export type UpdateProjectStatusMutation = { updateTask: { project: { id: string, status: Types.TaskStatuses } | null } | null };

export type UpdateStudentResourcesMutationVariables = Types.Exact<{
  input: Types.UpdateTaskMutationInput;
}>;


export type UpdateStudentResourcesMutation = { updateTask: { project: { id: string, studentResources: string | null } | null } | null };

export type UpdateTeacherResourcesMutationVariables = Types.Exact<{
  input: Types.UpdateTaskMutationInput;
}>;


export type UpdateTeacherResourcesMutation = { updateTask: { project: { id: string, teachingResources: string | null } | null } | null };

export type DlUpdateRubricHeadingMutationVariables = Types.Exact<{
  input: Types.UpdateRubricHeadingMutationInput;
}>;


export type DlUpdateRubricHeadingMutation = { updateRubricHeading: { rubricHeading: { id: string, multiplier: number, name: string } | null } | null };

export type UpdateTeamMutationVariables = Types.Exact<{
  input: Types.UpdateTeamMutationInput;
}>;


export type UpdateTeamMutation = { updateTeam: { team: { id: string, uuid: string, name: string, isArchived: boolean, students: { nodesCount: number, pagesCount: number, nodes: Array<{ currentTasksCount: number, firstName: string | null, lastName: string | null, uuid: string }> }, tasks: Array<{ displayName: string, id: string }> } } | null };

export type AdminEntitiesQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.EntityFilter>;
}>;


export type AdminEntitiesQuery = { adminDashboard: { entity: { uuid: string, children: { pagesCount: number, nodes: Array<{ name: string, uuid: string, hierarchyMetrics: { entitiesCount: number, schoolClassesCount: number, studentsCount: number, teachersCount: number } | null }> } } | null } | null };

export type DlAdminEntityInfoQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.UserFilter>;
}>;


export type DlAdminEntityInfoQuery = { adminDashboard: { entity: { uuid: string, name: string, hasChildren: boolean, users: { nodes: Array<{ firstName: string | null, lastName: string | null, role: Types.UserRoles, schoolClassesCount: number, uuid: string, entity: { name: string, uuid: string, hasChildren: boolean, parent: { name: string, uuid: string } | null } | null }> }, hierarchyMetrics: { studentsCount: number, teachersCount: number, entitiesCount: number, schoolClassesCount: number } | null, settings: { selfEvaluationEnabled: boolean, schoolYearStartDate: { day: number, month: number } }, plans: Array<{ name: string }> | null, catalogs: Array<{ name: string }> | null, standardSets: Array<{ name: string }> | null } | null } | null };

export type AssignedProjectsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type AssignedProjectsQuery = { assignedProjects: { nodesCount: number, pagesCount: number, nodes: Array<{ id: string, displayName: string, name: string, assignedAt: string | null, status: Types.TaskStatuses, gradingNeeded: boolean, isArchived: boolean, isAssignedByUser: boolean, owner: { uuid: string } | null }> } };

export type AvailableFacetsResourcesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AvailableFacetsResourcesQuery = { userInfo: { uuid: string, availableResources: { catalogs: Array<{ displayName: string }>, tracks: Array<{ displayName: string }>, units: Array<{ displayName: string }> } } };

export type CheckInQuestionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CheckInQuestionQuery = { checkInQuestion: { id: string, question: string, tasks: Array<{ id: string, displayName: string }> } };

export type CheckInQuestionsLibraryQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.CheckInQuestionFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type CheckInQuestionsLibraryQuery = { checkInQuestions: { nodesCount: number, pagesCount: number, nodes: Array<{ id: string, question: string }> } };

export type CheckinQuestionToGradeQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID']['input'];
  questionId: Types.Scalars['ID']['input'];
  subjectUuid: Types.Scalars['ID']['input'];
  isTeamGrading: Types.Scalars['Boolean']['input'];
}>;


export type CheckinQuestionToGradeQuery = { project: { id: string, displayName: string, checkInQuestion: { question: string, answer?: { id: string, answer: string, updatedAt: string, grade: { id: string, status: Types.SubmissionGradeStatuses, updatedAt: string, lastGradedBy: { firstName: string | null, lastName: string | null } | null } | null } | null, teamSubmission?: { id: string, grade: { status: Types.SubmissionGradeStatuses, updatedAt: string, lastGradedBy: { firstName: string | null, lastName: string | null } | null } | null, answers: Array<{ answer: string, id: string, updatedAt: string, student: { uuid: string, firstName: string | null, lastName: string | null } }> } | null } | null } };

export type DashboardCatalogQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type DashboardCatalogQuery = { catalog: { description: string | null, displayName: string, id: string, name: string, tracksCount: number, tasksCount: number, thumbnailUrl: string, imageUrl: string, courses: { nodesCount: number, pagesCount: number, nodes: Array<{ tasksCount: number, description: string | null, displayName: string, grades: Array<string>, id: string, imageUrl: string, shortDescription: string | null, thumbnailUrl: string }> } } | null };

export type DashboardCatalogsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type DashboardCatalogsQuery = { catalogs: { nodesCount: number, pagesCount: number, nodes: Array<{ tracksCount: number, description: string | null, tasksCount: number, displayName: string, name: string, id: string, thumbnailUrl: string, courses: { nodesCount: number } }> } };

export type DashboardCoursesQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type DashboardCoursesQuery = { courses: { nodesCount: number, pagesCount: number, nodes: Array<{ tasksCount: number, description: string | null, displayName: string, grades: Array<string>, id: string, imageUrl: string, shortDescription: string | null, thumbnailUrl: string }> } };

export type SystemAdminUsersQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.UserFilter>;
}>;


export type SystemAdminUsersQuery = { adminDashboard: { entity: { uuid: string, users: { pagesCount: number, nodes: Array<{ firstName: string | null, gradingNeeded: boolean, lastName: string | null, role: Types.UserRoles, schoolClassesCount: number, uuid: string, entity: { name: string, uuid: string, parent: { name: string, uuid: string } | null } | null }> } } | null } | null };

export type LessonWithProjectQueryVariables = Types.Exact<{
  lessonId: Types.Scalars['ID']['input'];
  projectId: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  trackPresentation: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type LessonWithProjectQuery = { lesson: { displayName: string, id: string, thumbnailUrl: string, project: { assignedStudentsCount: number, checkInsGradingNeededCount: number, description: string | null, displayName: string, id: string, introduction: string | null, presentationUrl: string | null, standard: string | null, status: Types.TaskStatuses, studentResources: string | null, submissionsGradingNeededCount: number, teachingResources: string | null, thumbnailUrl: string | null, copies: Array<{ id: string }> | null, checkInGroups: Array<{ displayName: string, id: string, name: string, step: number | null, questions: Array<{ id: string, gradingNeededCount: number, question: string, step: number | null, isHidden: boolean, owner: { uuid: string } | null }> }>, checkInQuestions: Array<{ id: string, gradingNeededCount: number, question: string, step: number | null, owner: { uuid: string } | null }>, courses: Array<{ id: string, name: string | null, thumbnailUrl: string, pathwayName: string | null, type: Types.CourseTypes }>, files: Array<{ description: string | null, displayName: string, filename: string, id: string, step: string, url: string }>, owner: { uuid: string } | null, presentation: { color: string | null, description: string | null, displayName: string, id: string, name: string, type: Types.PresentationTypes, status: Types.PresentationStatuses, transition: string | null, typography: string | null, slides: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, name: string, notes: string | null, step: number, template: string, products: Array<{ id: string, name: string, displayName: string, description: string | null, submissionsGradingNeededCount: number, gradingNeededCount: number, rubricsUrl: string | null, step: number | null, rubrics: Array<{ canEdit: boolean, description: string, displayName: string, hasAlignedStatements: boolean, id: string, name: string, pointsAvailable: number, uuid: string, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string, uuid: string }>, criteriaLabels: Array<{ displayName: string | null, id: string, score: number, uuid: string }>, headings: Array<{ id: string, multiplier: number, name: string, uuid: string }> }> }>, checkInQuestions: Array<{ gradingNeededCount: number, id: string, isArchived: boolean, question: string, step: number | null, owner: { email: string | null, firstName: string | null, lastName: string | null, username: string | null, uuid: string } | null }>, checkInGroups: Array<{ displayName: string, id: string, name: string, questions: Array<{ id: string, question: string, step: number | null }> }>, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, thumbnailUrl: string, position: string | null }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string | null, type: string | null, value: string | null, style: string | null }>, videos: Array<{ id: string, contentId: string, url: string | null, filename: string | null, videoUrl: string | null }> }, subslides: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, name: string, notes: string | null, step: number, template: string, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, position: string | null }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string | null, type: string | null, value: string | null, style: string | null }>, videos: Array<{ id: string, contentId: string, url: string | null, filename: string | null, videoUrl: string | null }> } }> | null }> } | null, sharedResource: { allowLogin: boolean, code: string } | null, units: Array<{ displayName: string, id: string }> } } | null };

export type UserLtiResourceQueryVariables = Types.Exact<{
  ltiResourceLinkId: Types.InputMaybe<Types.Scalars['String']['input']>;
  contextId: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UserLtiResourceQuery = { ltiResource: { ltiResourceLinkId: string | null, contextId: string | null, taskId: string | null, productId: string | null } | null };

export type UserMyClassesQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.SchoolClassFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type UserMyClassesQuery = { schoolClasses: { nodesCount: number, pagesCount: number, nodes: Array<{ isDemo: boolean, name: string, currentTasksCount: number, uuid: string, students: { nodesCount: number } }> } };

export type UserMyProjectsQueryVariables = Types.Exact<{
  scope: Types.InputMaybe<Types.ArchivableStatus>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type UserMyProjectsQuery = { myProjects: { nodesCount: number, pagesCount: number, nodes: Array<{ id: string, createdAt: string, updatedAt: string, displayName: string, gradingNeeded: boolean, name: string, status: Types.TaskStatuses, description: string | null, isArchived: boolean, owner: { uuid: string } | null }> } };

export type MyProjectsActivityLogQueryVariables = Types.Exact<{
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
  before: Types.InputMaybe<Types.Scalars['String']['input']>;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type MyProjectsActivityLogQuery = { myProjectsActivityLog: { edges: Array<{ cursor: string, node: { updatedAt: string, type: Types.StudentActivityTypes | null, context: { id: string, name: string } | null, student: { firstName: string | null, lastName: string | null, uuid: string }, team: { name: string, uuid: string } | null } | null } | null> | null, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type ProductSubmissionToGradeQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID']['input'];
  productId: Types.Scalars['ID']['input'];
  submitterUuid: Types.Scalars['ID']['input'];
  submitterType: Types.ProductSubmissionSubmitterTypes;
}>;


export type ProductSubmissionToGradeQuery = { project: { id: string, displayName: string, product: { id: string, displayName: string, submission: { id: string, updatedAt: string, files: Array<{ createdAt: string, filename: string, googleWeblink: string | null, id: string, source: string, url: string, submitter: { uuid: string, firstName: string | null, lastName: string | null } | { uuid: string, firstName: string | null, lastName: string | null } }>, grade: { updatedAt: string, pointsAvailable: number, pointsScored: number, lastGradedBy: { uuid: string, name: string | null } | null, results: Array<{ criteriaId: string, trait: string | null }> } | null } | null, rubrics: Array<{ description: string, id: string, name: string, displayName: string, pointsAvailable: number, criteriaLabels: Array<{ displayName: string | null, id: string, score: number }>, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string }>, headings: Array<{ id: string, multiplier: number, name: string }> }> } | null } };

export type UserProjectQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  code: Types.InputMaybe<Types.Scalars['String']['input']>;
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  trackPresentation: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type UserProjectQuery = { project: { assignedStudentsCount: number, checkInsGradingNeededCount: number, description: string | null, displayName: string, id: string, introduction: string | null, presentationUrl: string | null, standard: string | null, status: Types.TaskStatuses, studentResources: string | null, submissionsGradingNeededCount: number, teachingResources: string | null, thumbnailUrl: string | null, copies: Array<{ id: string }> | null, checkInGroups: Array<{ displayName: string, id: string, name: string, step: number | null, questions: Array<{ id: string, gradingNeededCount: number, question: string, step: number | null, isHidden: boolean, owner: { uuid: string } | null }> }>, checkInQuestions: Array<{ id: string, gradingNeededCount: number, question: string, step: number | null, owner: { uuid: string } | null }>, courses: Array<{ id: string, name: string | null, thumbnailUrl: string, pathwayName: string | null, type: Types.CourseTypes }>, files: Array<{ description: string | null, displayName: string, filename: string, id: string, step: string, url: string }>, owner: { uuid: string } | null, presentation: { color: string | null, description: string | null, displayName: string, id: string, name: string, type: Types.PresentationTypes, status: Types.PresentationStatuses, transition: string | null, typography: string | null, slides: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, name: string, notes: string | null, step: number, template: string, products: Array<{ id: string, name: string, displayName: string, description: string | null, submissionsGradingNeededCount: number, gradingNeededCount: number, rubricsUrl: string | null, step: number | null, rubrics: Array<{ canEdit: boolean, description: string, displayName: string, hasAlignedStatements: boolean, id: string, name: string, pointsAvailable: number, uuid: string, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string, uuid: string }>, criteriaLabels: Array<{ displayName: string | null, id: string, score: number, uuid: string }>, headings: Array<{ id: string, multiplier: number, name: string, uuid: string }> }> }>, checkInQuestions: Array<{ gradingNeededCount: number, id: string, isArchived: boolean, question: string, step: number | null, owner: { email: string | null, firstName: string | null, lastName: string | null, username: string | null, uuid: string } | null }>, checkInGroups: Array<{ displayName: string, id: string, name: string, questions: Array<{ id: string, question: string, step: number | null }> }>, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, thumbnailUrl: string, position: string | null }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string | null, type: string | null, value: string | null, style: string | null }>, videos: Array<{ id: string, contentId: string, url: string | null, filename: string | null, videoUrl: string | null }> }, subslides: Array<{ backgroundColor: string | null, backgroundImage: string | null, description: string | null, id: string, iframeUrl: string | null, name: string, notes: string | null, step: number, template: string, content: { id: string, images: Array<{ contentId: string, id: string, url: string, style: string, position: string | null }>, links: Array<{ targetId: string, targetName: string, text: string, contentId: string }>, texts: Array<{ contentId: string | null, type: string | null, value: string | null, style: string | null }>, videos: Array<{ id: string, contentId: string, url: string | null, filename: string | null, videoUrl: string | null }> } }> | null }> } | null, sharedResource: { allowLogin: boolean, code: string } | null, units: Array<{ displayName: string, id: string }> } };

export type ProjectCheckinsQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID']['input'];
}>;


export type ProjectCheckinsQuery = { project: { id: string, checkInGroups: Array<{ displayName: string, id: string, name: string, step: number | null, questions: Array<{ id: string, question: string, step: number | null, owner: { uuid: string } | null }> }>, checkInQuestions: Array<{ id: string, question: string, step: number | null, owner: { uuid: string } | null }> } };

export type ProjectCopiesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ProjectCopiesQuery = { project: { id: string, copies: Array<{ id: string, displayName: string, copies: Array<{ id: string, displayName: string, copies: Array<{ id: string, displayName: string }> | null }> | null }> | null } };

export type ProjectInfoToCheckinGradeQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID']['input'];
  checkinId: Types.Scalars['ID']['input'];
}>;


export type ProjectInfoToCheckinGradeQuery = { project: { displayName: string, id: string, checkInQuestion: { id: string, question: string } | null } };

export type ProjectInfoToProductGradeQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID']['input'];
  productId: Types.Scalars['ID']['input'];
}>;


export type ProjectInfoToProductGradeQuery = { project: { displayName: string, id: string, product: { id: string, displayName: string } | null } };

export type ProjectNameQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  track: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type ProjectNameQuery = { project: { id: string, displayName: string } };

export type UserProjectProductsQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID']['input'];
  code: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UserProjectProductsQuery = { project: { id: string, assignedStudentsCount: number, products: Array<{ description: string | null, displayName: string, id: string, name: string, submissionsGradingNeededCount: number, hidden: boolean, rubrics: Array<{ description: string, id: string, name: string, displayName: string, hasAlignedStatements: boolean, criteriaLabels: Array<{ displayName: string | null, id: string, score: number }>, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string }>, headings: Array<{ id: string, multiplier: number, name: string }> }> }> } };

export type ProjectStandardsQueryVariables = Types.Exact<{
  projectId: Types.Scalars['ID']['input'];
  setId: Types.Scalars['String']['input'];
  code: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ProjectStandardsQuery = { project: { id: string, standards: Array<{ grade: string, standardNumber: string, standardText: string, subject: string }> } };

export type ProjectsQueryVariables = Types.Exact<{
  filter: Types.InputMaybe<Types.TaskFilter>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  teamId: Types.Scalars['ID']['input'];
}>;


export type ProjectsQuery = { projects: { pagesCount: number, nodes: Array<{ id: string, displayName: string, isAssignedToTeam: boolean }> } };

export type DlRubricQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DlRubricQuery = { rubric: { description: string, name: string, displayName: string, id: string, canEdit: boolean, criteriaLabels: Array<{ displayName: string | null, id: string, score: number }>, criterias: Array<{ id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string }>, headings: Array<{ id: string, multiplier: number, name: string }> } | null };

export type DlSchoolClassQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type DlSchoolClassQuery = { schoolClass: { isDemo: boolean, name: string, uuid: string, teams: Array<{ id: string, uuid: string, name: string, isArchived: boolean, students: { nodesCount: number, pagesCount: number, nodes: Array<{ currentTasksCount: number, firstName: string | null, lastName: string | null, uuid: string }> }, tasks: Array<{ displayName: string, id: string }> }>, students: { nodesCount: number, pagesCount: number, nodes: Array<{ currentTasksCount: number, firstName: string | null, lastName: string | null, uuid: string, hasPlans: boolean, plans: Array<{ id: string }> }> } } | null };

export type SchoolClassActivityQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
  before: Types.InputMaybe<Types.Scalars['String']['input']>;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type SchoolClassActivityQuery = { schoolClass: { uuid: string, activityLog: { edges: Array<{ cursor: string, node: { updatedAt: string, type: Types.SchoolClassActivityTypes, context: { id: string, name: string } | null, schoolClass: { name: string, uuid: string }, target: { name: string | null } | { name: string | null }, team: { name: string, uuid: string } | null } | null } | null> | null, pageInfo: { endCursor: string | null, hasNextPage: boolean } } } | null };

export type SchoolClassTeamQueryVariables = Types.Exact<{
  classUuid: Types.Scalars['ID']['input'];
  teamUuid: Types.Scalars['ID']['input'];
}>;


export type SchoolClassTeamQuery = { schoolClass: { uuid: string, team: { uuid: string, name: string, students: { nodes: Array<{ firstName: string | null, lastName: string | null, uuid: string }> } } } | null };

export type SchoolClassesActivityLogQueryVariables = Types.Exact<{
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
  before: Types.InputMaybe<Types.Scalars['String']['input']>;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type SchoolClassesActivityLogQuery = { schoolClassActivityLog: { edges: Array<{ cursor: string, node: { updatedAt: string, type: Types.SchoolClassActivityTypes, context: { id: string, name: string } | null, schoolClass: { name: string, uuid: string }, target: { name: string | null } | { name: string | null }, team: { name: string, uuid: string } | null } | null } | null> | null, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type SchoolClassAssignedToTaskQueryVariables = Types.Exact<{
  taskId: Types.Scalars['ID']['input'];
  itemId: Types.Scalars['ID']['input'];
  itemType: Types.GradingItemTypes;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type SchoolClassAssignedToTaskQuery = { schoolClassesAssignedToProject: { nodesCount: number, pagesCount: number, nodes: Array<{ gradingNeeded: boolean, name: string, uuid: string }> } };

export type StandardHierarchyQueryVariables = Types.Exact<{
  setId: Types.Scalars['String']['input'];
  subject: Types.Scalars['String']['input'];
  grade: Types.Scalars['String']['input'];
}>;


export type StandardHierarchyQuery = { standardsHierarchy: Array<{ guid: string, standardText: string, standardNumber: string, children: Array<{ guid: string, standardText: string, standardNumber: string, children: Array<{ guid: string, standardText: string, standardNumber: string, children: Array<{ guid: string, standardText: string, standardNumber: string, children: Array<{ guid: string, standardText: string, standardNumber: string }> }> }> }> }> };

export type StandardSetSubjectsQueryVariables = Types.Exact<{
  setId: Types.Scalars['String']['input'];
}>;


export type StandardSetSubjectsQuery = { standardSetSubjects: Array<{ name: string, grades: Array<string> }> };

export type StandardTasksQueryVariables = Types.Exact<{
  standardGuid: Types.Scalars['String']['input'];
}>;


export type StandardTasksQuery = { standardTasks: Array<{ id: string, displayName: string, description: string | null, imageUrl: string | null, thumbnailUrl: string | null }> };

export type DlStudentQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type DlStudentQuery = { student: { uuid: string, name: string | null } | null };

export type DlStudentConversationsQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
  with: Types.ConversationParticipantFilter;
}>;


export type DlStudentConversationsQuery = { student: { uuid: string, conversations: { edges: Array<{ node: { id: string, conversationContext: { id: string, name: string | null } | { id: string, name: string | null } | { id: string, name: string } | { id: string, name: string | null } | { id: string, name: string | null } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | null, recentMessage: { id: string, body: string, createdAt: string } | null } | null } | null> | null, pageInfo: { startCursor: string | null, endCursor: string | null, hasNextPage: boolean } } } | null };

export type SystemAdminEntitiesQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.EntityFilter>;
}>;


export type SystemAdminEntitiesQuery = { adminDashboard: { entities: { pagesCount: number, nodes: Array<{ name: string, uuid: string, hierarchyMetrics: { entitiesCount: number, schoolClassesCount: number, studentsCount: number, teachersCount: number } | null, settings: { selfEvaluationEnabled: boolean } }> } } | null };

export type DlAdminUsersQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.UserFilter>;
}>;


export type DlAdminUsersQuery = { adminDashboard: { users: { pagesCount: number, nodes: Array<{ firstName: string | null, lastName: string | null, role: Types.UserRoles, schoolClassesCount: number, uuid: string, entity: { name: string, uuid: string, parent: { name: string, uuid: string } | null } | null }> } } | null };

export type TaskTemplateQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TaskTemplateQuery = { taskTemplates: Array<{ id: string, copies: Array<{ id: string, name: string, copies: Array<{ id: string, name: string, assignedAt: string | null }> | null }> | null }> };

export type TeacherDashBoardQueryVariables = Types.Exact<{
  userUuid: Types.InputMaybe<Types.Scalars['ID']['input']>;
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
  before: Types.InputMaybe<Types.Scalars['String']['input']>;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
  last: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type TeacherDashBoardQuery = { teacherDashboard: { userId: string, teacherName: string, schoolClasses: Array<{ currentTasksCount: number, entityName: string, isDemo: boolean, schoolClassName: string, schoolClassUuid: string, studentsCount: number }>, activityLog: { edges: Array<{ cursor: string, node: { updatedAt: string, type: Types.SchoolClassActivityTypes, context: { id: string, name: string } | null, schoolClass: { name: string, uuid: string }, target: { name: string | null } | { name: string | null }, team: { name: string, uuid: string } | null } | null } | null> | null, pageInfo: { endCursor: string | null, hasNextPage: boolean } } } };

export type DlTrackQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type DlTrackQuery = { track: { description: string | null, name: string, displayName: string, grades: Array<string>, id: string, imageUrl: string, thumbnailUrl: string, tasksCount: number, units: Array<{ description: string | null, displayName: string, id: string, imageUrl: string, thumbnailUrl: string, tasks: Array<{ description: string | null, displayName: string, id: string, imageUrl: string | null, thumbnailUrl: string | null }> }> } | null };

export type DlUserInfoQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DlUserInfoQuery = { userInfo: { availableTasksCount: number, availableTracksCount: number, availableReportTypes: Array<Types.ReportTypes>, algoliaSearchKey: string, currentSchoolYear: number, hasAccessToCareers: boolean, logoUrl: string | null, iconUrl: string | null, hasUnreadConversation: boolean, email: string | null, firstName: string | null, lastName: string | null, role: Types.UserRoles, username: string | null, uuid: string, id: string, definedLearningUuid: string | null, welcomeMessage: string | null, permissions: { canBrowseReports: boolean }, entities: { nodes: Array<{ uuid: string, settings: { classManagementEnabled: boolean, schoolYearStartDate: { day: number, month: number } } }> }, highlightedCatalogs: Array<{ name: string, id: string }>, standardSets: Array<{ id: string, name: string, setId: string }>, ltiDetails: { isLti: boolean, isLtiSearch: boolean | null, ltiContextId: string | null, ltiConsumerKey: string | null, ltiResourceLinkId: string | null } | null } };
