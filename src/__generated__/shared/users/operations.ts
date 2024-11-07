import * as Types from './types';

export type GoalPerformanceIndicatorsDataFragment = { averageScore: number, tag: { name: string }, results: Array<{ contextName: string, gradedAt: string, origin: Types.ServiceNames, rubricName: string, scoreEarned: number }> };

export type PlanForStudentReportFragment = { name: string, id: string, groups: Array<{ id: string, name: string, step: number | null, displayName: string, description: string | null, statements: Array<{ id: string, step: number | null, name: string, isRequired: boolean, results: Array<{ createdAt: string, result: Types.EvaluationResultValues }>, question: { id: string, text: string, questionType: Types.PlanGroupStatementQuestionTypes, options: Array<{ id: string, option: string }>, answer: { id: string, answer: Array<string> } | null } | null, evidences: Array<{ label: string, type: Types.EvidenceKind, contextType: Types.EvidenceContextKind | null, service: Types.ServiceNames, updatedAt: string, itemId: string | null, isTeamSubmission: boolean, id: string | null, rubricScores: Array<{ label: string, maxScore: number, currentScore: number }> | null }> }> }> };

export type PlanFragment = { id: string, groups: Array<{ id: string, statements: Array<{ id: string, isLocked: boolean }> }> };

export type AlignPlanGroupStatementToRubricHeadingMutationVariables = Types.Exact<{
  input: Types.AlignPlanGroupStatementToRubricHeadingMutationInput;
  rubricHeadingId: Types.Scalars['ID']['input'];
}>;


export type AlignPlanGroupStatementToRubricHeadingMutation = { alignPlanGroupStatementToRubricHeading: { rubricHeading: { id: string, name: string, uuid: string, plans: Array<{ id: string, name: string }>, rubric: { id: string, displayName: string | null, headings: Array<{ plans: Array<{ id: string, name: string, groups: Array<{ statements: Array<{ id: string, name: string, isAligned: boolean }> }> }> }> } } } | null };

export type CreateEvaluationMutationVariables = Types.Exact<{
  input: Types.CreateEvaluationMutationInput;
}>;


export type CreateEvaluationMutation = { createEvaluation: { evaluation: { id: string, results: Array<{ createdAt: string, result: Types.EvaluationResultValues, evaluator: { email: string | null, firstName: string | null, lastName: string | null, username: string | null, uuid: string } | { email: string | null, firstName: string | null, lastName: string | null, username: string | null, uuid: string }, statement: { id: string, isLocked: boolean, name: string, step: number | null } }> } | null } | null };

export type CreateRubricCriteriaMutationVariables = Types.Exact<{
  input: Types.CreateRubricCriteriaMutationInput;
}>;


export type CreateRubricCriteriaMutation = { createRubricCriteria: { rubricCriteria: { id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string } | null } | null };

export type CreateRubricCriteriaLabelMutationVariables = Types.Exact<{
  input: Types.CreateRubricCriteriaLabelMutationInput;
}>;


export type CreateRubricCriteriaLabelMutation = { createRubricCriteriaLabel: { rubricCriteriaLabel: { displayName: string | null, id: string, score: number } | null } | null };

export type CreateRubricHeadingMutationVariables = Types.Exact<{
  input: Types.CreateRubricHeadingMutationInput;
}>;


export type CreateRubricHeadingMutation = { createRubricHeading: { rubricHeading: { id: string, multiplier: number, name: string } | null } | null };

export type CreateUserEvaluationCommentMutationVariables = Types.Exact<{
  input: Types.CreateEvaluationCommentMutationInput;
}>;


export type CreateUserEvaluationCommentMutation = { createEvaluationComment: { evaluation: { id: string, comments: Array<{ body: string, createdAt: string, author: { firstName: string | null, lastName: string | null, uuid: string } | { firstName: string | null, lastName: string | null, uuid: string }, statement: { id: string } }> } | null } | null };

export type DeletePublicResourcesMutationVariables = Types.Exact<{
  input: Types.DeletePublicResourcesMutationInput;
}>;


export type DeletePublicResourcesMutation = { deletePublicResources: { status: string | null } | null };

export type DeleteRubricCriteriaLabelMutationVariables = Types.Exact<{
  input: Types.DeleteRubricCriteriaLabelMutationInput;
}>;


export type DeleteRubricCriteriaLabelMutation = { deleteRubricCriteriaLabel: { status: string | null } | null };

export type DeleteRubricHeadingMutationVariables = Types.Exact<{
  input: Types.DeleteRubricHeadingMutationInput;
}>;


export type DeleteRubricHeadingMutation = { deleteRubricHeading: { status: string | null } | null };

export type DeleteTaskFileMutationVariables = Types.Exact<{
  input: Types.DeleteTaskFileMutationInput;
}>;


export type DeleteTaskFileMutation = { deleteTaskFile: { status: string | null } | null };

export type GenerateGoalsPlanReportMutationVariables = Types.Exact<{
  input: Types.GenerateGoalsPlanReportMutationInput;
}>;


export type GenerateGoalsPlanReportMutation = { generateGoalsPlanReport: { planReport: { id: string, url: string | null, schoolYear: number | null, uploadStatus: Types.ReportFileUploadStatuses | null } | null } | null };

export type GenerateGoalsPerformanceIndicatorsReportMutationVariables = Types.Exact<{
  input: Types.GenerateGoalsPerformanceIndicatorsReportMutationInput;
}>;


export type GenerateGoalsPerformanceIndicatorsReportMutation = { generateGoalsPerformanceIndicatorsReport: { performanceIndicatorsReport: { id: string } | null } | null };

export type LockStatementMutationVariables = Types.Exact<{
  input: Types.LockStatementMutationInput;
  planId: Types.Scalars['ID']['input'];
}>;


export type LockStatementMutation = { lockStatement: { student: { uuid: string, plan: { id: string, groups: Array<{ id: string, statements: Array<{ id: string, isLocked: boolean }> }> } } | null } | null };

export type UnlockStatementMutationVariables = Types.Exact<{
  input: Types.UnlockStatementMutationInput;
  planId: Types.Scalars['ID']['input'];
}>;


export type UnlockStatementMutation = { unlockStatement: { student: { uuid: string, plan: { id: string, groups: Array<{ id: string, statements: Array<{ id: string, isLocked: boolean }> }> } } | null } | null };

export type UpdateRubricMutationVariables = Types.Exact<{
  input: Types.UpdateRubricMutationInput;
}>;


export type UpdateRubricMutation = { updateRubric: { rubric: { displayName: string | null, id: string, name: string, description: string, uuid: string } | null } | null };

export type UpdateRubricCriteriaMutationVariables = Types.Exact<{
  input: Types.UpdateRubricCriteriaMutationInput;
}>;


export type UpdateRubricCriteriaMutation = { updateRubricCriteria: { rubricCriteria: { id: string, rubricCriteriaLabelId: string, rubricHeadingId: string, text: string } | null } | null };

export type UpdateRubricCriteriaLabelMutationVariables = Types.Exact<{
  input: Types.UpdateRubricCriteriaLabelMutationInput;
}>;


export type UpdateRubricCriteriaLabelMutation = { updateRubricCriteriaLabel: { rubricCriteriaLabel: { displayName: string | null, id: string, score: number } | null } | null };

export type UpdateSchoolYearStartDateMutationVariables = Types.Exact<{
  input: Types.UpdateEntitySettingsMutationInput;
}>;


export type UpdateSchoolYearStartDateMutation = { updateEntitySettings: { entity: { uuid: string, settings: { schoolYearStartDate: { day: number, month: number } } } | null } | null };

export type AcademyCoursesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AcademyCoursesQuery = { academyCourses: Array<{ id: string, name: string | null, category: string | null, startDate: string | null, endDate: string | null, description: string | null, progress: { completed: number | null, total: number | null } | null }> };

export type CheckInGroupsOverviewQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CheckInGroupsOverviewQuery = { task: { id: string, name: string, checkInGroups: Array<{ id: string, name: string, displayName: string | null }> } | null };

export type CheckInsOverviewQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CheckInsOverviewQuery = { task: { id: string, name: string, checkInQuestions: Array<{ id: string, question: string }> } | null };

export type GoalPlanReportQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GoalPlanReportQuery = { goalsPlanReport: { id: string, url: string | null, uploadStatus: Types.ReportFileUploadStatuses | null } | null };

export type GoalsPerformanceIndicatorsReportQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type GoalsPerformanceIndicatorsReportQuery = { goalsPerformanceIndicatorsReport: { id: string, url: string | null, uploadStatus: Types.ReportFileUploadStatuses | null } | null };

export type PlanOptionsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.PlanFilter>;
}>;


export type PlanOptionsQuery = { plans: { nodesCount: number, pagesCount: number, nodes: Array<{ id: string, name: string }> } };

export type PlanReportQueryVariables = Types.Exact<{
  filter: Types.PlanReportFilter;
}>;


export type PlanReportQuery = { reports: { planReport: { summary: { studentsTotal: number, studentsInProgress: number, studentsCompleted: number, averageCompletion: number }, groups: Array<{ notStarted: number, inProgress: number, completed: number, notMet: number, group: { id: string, name: string } }> } | null } | null };

export type PlanReportFiltersQueryVariables = Types.Exact<{
  planId: Types.Scalars['ID']['input'];
  filters: Types.InputMaybe<Types.ReportFiltersFilter>;
  entityFilter: Types.InputMaybe<Types.EntityFilter>;
  userFilter: Types.InputMaybe<Types.UserFilter>;
  schoolClassFilter: Types.InputMaybe<Types.SchoolClassFilter>;
}>;


export type PlanReportFiltersQuery = { planReportFilters: { gradeLevels: Array<string>, entities: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, name: string | null }> }, users: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, fullName: string | null }> }, schoolClasses: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, name: string | null, users: { nodes: Array<{ fullName: string | null }> } | null }> } } };

export type PlanStatementBreakdownQueryVariables = Types.Exact<{
  filter: Types.PlanReportFilter;
  statementId: Types.Scalars['ID']['input'];
}>;


export type PlanStatementBreakdownQuery = { reports: { planReport: { statementBreakdown: { completed: number, inProgress: number, notMet: number, notStarted: number } } | null } | null };

export type PlanStatementOptionsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type PlanStatementOptionsQuery = { plan: { id: string, groups: Array<{ id: string, name: string, statements: Array<{ id: string, name: string, isRequired: boolean, question: { text: string, options: Array<{ id: string, option: string }> } | null }> }> } | null };

export type PlanStatementResultsQueryVariables = Types.Exact<{
  filter: Types.PlanReportFilter;
  statementId: Types.Scalars['ID']['input'];
  statementFilter: Types.InputMaybe<Types.PlanGroupStatementResultFilter>;
  sort: Types.InputMaybe<Types.PlanGroupStatementResultSortAttributes>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type PlanStatementResultsQuery = { reports: { planReport: { statementResults: { nodesCount: number, pagesCount: number, nodes: Array<{ answer: Array<string> | null, evidencesCount: number, lastUpdatedAt: string | null, status: Types.EvaluationResultValues, studentName: string, studentSisId: string | null }> } } | null } | null };

export type ProductsOverviewQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ProductsOverviewQuery = { task: { id: string, name: string, products: Array<{ id: string, name: string, displayName: string | null, description: string | null }> } | null };

export type StudentConversationQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  id: Types.Scalars['ID']['input'];
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type StudentConversationQuery = { student: { uuid: string, conversation: { id: string, messages: { edges: Array<{ node: { body: string, createdAt: string, id: string, author: { uuid: string, name: string | null } | { uuid: string, name: string } | { uuid: string, name: string | null } } | null } | null> | null, pageInfo: { startCursor: string | null, endCursor: string | null, hasNextPage: boolean } } } | null } | null };

export type StudentConversationGroupsQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type StudentConversationGroupsQuery = { student: { firstName: string | null, lastName: string | null, uuid: string, conversationGroups: { edges: Array<{ node: { participant: { uuid: string, name: string | null, members: Array<{ uuid: string, name: string | null } | { uuid: string, name: string | null }> | null, owner: { uuid: string, name: string | null } | { uuid: string, name: string | null } | null } | { uuid: string, name: string, members: Array<{ uuid: string, name: string | null } | { uuid: string, name: string | null }> | null, owner: { uuid: string, name: string | null } } | { uuid: string, name: string | null, members: Array<{ uuid: string, name: string | null } | { uuid: string, name: string | null }> | null, owner: { uuid: string, name: string | null } | { uuid: string, name: string | null } | null }, recentConversation: { id: string, recentMessage: { id: string, body: string, createdAt: string } | null } } | null } | null> | null, pageInfo: { startCursor: string | null, endCursor: string | null, hasNextPage: boolean } } } | null };

export type StudentConversationsQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
  with: Types.ConversationParticipantFilter;
}>;


export type StudentConversationsQuery = { student: { uuid: string, conversations: { edges: Array<{ node: { id: string, serviceName: string | null, conversationContext: { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | null, recentMessage: { id: string, body: string, createdAt: string } | null } | null } | null> | null, pageInfo: { startCursor: string | null, endCursor: string | null, hasNextPage: boolean } } } | null };

export type StudentPortfolioExperienceQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  id: Types.Scalars['ID']['input'];
}>;


export type StudentPortfolioExperienceQuery = { student: { uuid: string, portfolio: { studentId: string, careerExperience: { submissions: Array<{ service: Types.ServiceNames, submissionName: string, contextName: string, submittedAt: string, isTeamSubmission: boolean }> } | null } | null } | null };

export type StudentPortfolioExperiencesQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type StudentPortfolioExperiencesQuery = { student: { uuid: string, fullName: string | null, portfolio: { studentId: string, careerExperiences: Array<{ clusterId: string, clusterName: string, submissionsCount: number }> } | null } | null };

export type StudentPortfolioPlanWithEvaluationQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  id: Types.Scalars['ID']['input'];
}>;


export type StudentPortfolioPlanWithEvaluationQuery = { student: { uuid: string, portfolio: { studentId: string, plan: { description: string | null, id: string, name: string, evaluation: { id: string } | null, groups: Array<{ description: string | null, displayName: string, id: string, name: string, step: number | null, statements: Array<{ id: string, isLocked: boolean, isRequired: boolean, name: string, step: number | null, evidences: Array<{ contextType: Types.EvidenceContextKind | null, label: string, isTeamSubmission: boolean, service: Types.ServiceNames, type: Types.EvidenceKind, updatedAt: string, itemId: string | null, id: string | null, rubricScores: Array<{ currentScore: number, maxScore: number, label: string }> | null }>, question: { id: string, text: string, questionType: Types.PlanGroupStatementQuestionTypes, options: Array<{ option: string, id: string }>, answer: { id: string, answer: Array<string> } | null } | null, results: Array<{ createdAt: string, result: Types.EvaluationResultValues, evaluator: { firstName: string | null, lastName: string | null, uuid: string } | { firstName: string | null, lastName: string | null, uuid: string } }>, comments: Array<{ createdAt: string, body: string, author: { firstName: string | null, lastName: string | null, uuid: string } | { firstName: string | null, lastName: string | null, uuid: string } }> }> }>, progress: { completed: number, total: number } } } | null } | null };

export type StudentPortfolioPlansQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type StudentPortfolioPlansQuery = { student: { uuid: string, firstName: string | null, lastName: string | null, email: string | null, username: string | null, portfolio: { studentId: string, plans: Array<{ id: string, name: string, evaluation: { id: string } | null } | null> } | null } | null };

export type StudentPortfolioProjectsQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
  type: Types.PortfolioKind;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type StudentPortfolioProjectsQuery = { student: { uuid: string, portfolio: { studentId: string, projects: { totalCount: number, edges: Array<{ cursor: string, node: { description: string | null, id: string, imageUrl: string | null, name: string, parentName: string | null, resourceClass: Types.PortfolioResourceClass, teamSubmission: boolean | null, type: Types.PortfolioProjectKind | null, isTeamSubmission: boolean, finishedAt: string, thumbnailUrl: string | null, submission: { status: Types.SubmissionStatus | null, files: Array<{ isOwner: boolean, filename: string, googleWeblink: string | null, source: Types.SubmissionFileSource | null, url: string, submitter: { firstName: string | null, lastName: string | null, fullName: string | null, uuid: string } | { firstName: string | null, lastName: string | null, fullName: string | null, uuid: string } | null }> } } | null } | null> | null, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null } | null } | null };

export type StudentPortfolioResumeQueryVariables = Types.Exact<{
  uuid: Types.Scalars['ID']['input'];
}>;


export type StudentPortfolioResumeQuery = { student: { uuid: string, email: string | null, firstName: string | null, lastName: string | null, username: string | null, portfolio: { studentId: string, sharedResume: { shareCode: string | null, avatarUrl: string | null, sharedUrlEnabled: boolean, bio: string | null, highlightedProjectsEnabled: boolean, name: string, contactLinks: Array<{ id: string, type: Types.ContactLinkTypes, value: string }>, experiences: Array<{ description: string | null, endedAt: string | null, id: string, name: string, startedAt: string }>, educations: Array<{ description: string | null, endedAt: string | null, id: string, name: string, startedAt: string }>, extraCurriculars: Array<{ description: string | null, endedAt: string | null, id: string, name: string, startedAt: string }>, highlightedProjects: Array<{ description: string | null, finishedAt: string, id: string, imageUrl: string | null, isTeamSubmission: boolean, name: string, parentName: string | null, resourceClass: Types.PortfolioResourceClass, startedAt: string | null, thumbnailUrl: string | null, type: Types.PortfolioProjectKind | null, submission: { status: Types.SubmissionStatus | null, files: Array<{ isOwner: boolean, createdAt: string, filename: string, googleWeblink: string | null, id: string, source: Types.SubmissionFileSource | null, url: string, submitter: { firstName: string | null, fullName: string | null, lastName: string | null, uuid: string } | { firstName: string | null, fullName: string | null, lastName: string | null, uuid: string } | null }> } }>, highlightedBadges: Array<{ id: string, imageUrl: string, name: string, description: string, resource: { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } }> } | null, resumes: Array<{ filename: string, id: string, url: string }> | null } | null } | null };

export type StudentReportByUserQueryVariables = Types.Exact<{
  planId: Types.Scalars['ID']['input'];
  studentUuid: Types.Scalars['ID']['input'];
}>;


export type StudentReportByUserQuery = { studentReport: { overallData: { completed: number, inProgress: number, notStarted: number, studentFullName: string, planName: string, notMet: number }, plan: { name: string, id: string, groups: Array<{ id: string, name: string, step: number | null, displayName: string, description: string | null, statements: Array<{ id: string, step: number | null, name: string, isRequired: boolean, results: Array<{ createdAt: string, result: Types.EvaluationResultValues }>, question: { id: string, text: string, questionType: Types.PlanGroupStatementQuestionTypes, options: Array<{ id: string, option: string }>, answer: { id: string, answer: Array<string> } | null } | null, evidences: Array<{ label: string, type: Types.EvidenceKind, contextType: Types.EvidenceContextKind | null, service: Types.ServiceNames, updatedAt: string, itemId: string | null, isTeamSubmission: boolean, id: string | null, rubricScores: Array<{ label: string, maxScore: number, currentScore: number }> | null }> }> }> }, goalPerformanceIndicatorsData: Array<{ averageScore: number, tag: { name: string }, results: Array<{ contextName: string, gradedAt: string, origin: Types.ServiceNames, rubricName: string, scoreEarned: number }> }> } };

export type TagOptionsQueryVariables = Types.Exact<{
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
  filter: Types.InputMaybe<Types.TagFilter>;
}>;


export type TagOptionsQuery = { tags: { nodesCount: number, pagesCount: number, nodes: Array<{ id: string, name: string }> } };

export type PerformanceIndicatorsFullDataQueryVariables = Types.Exact<{
  filter: Types.TagReportResultsFilter;
  sort: Types.InputMaybe<Types.TagReportResultsSortAttributes>;
  page: Types.InputMaybe<Types.Scalars['Int']['input']>;
  perPage: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type PerformanceIndicatorsFullDataQuery = { reports: { tagReport: { studentsCount: number, tagsResults: { nodesCount: number, pagesCount: number, nodes: Array<{ contextName: string, gradedAt: string, platform: Types.ServiceNames, rubricName: string, scoreEarned: number, scoreMaximum: number, sourceName: string, studentSisId: string | null, studentFullName: string, tags: Array<{ id: string, hasEntities: boolean, type: Types.TagTypes, name: string }> }> } } | null } | null };

export type TagReportQueryVariables = Types.Exact<{
  summaryFilter: Types.TagReportSummaryFilter;
}>;


export type TagReportQuery = { reports: { tagReport: { tagSummary: { studentsCount: number, cumulativeAverageScore: number, tag: { id: string, name: string }, aggregationPeriods: Array<{ averageScore: number, period: number, periodEnd: string, periodStart: string, studentsCount: number }> } } | null } | null };

export type PerformanceIndicatorsFiltersQueryVariables = Types.Exact<{
  tagIds: Array<Types.Scalars['ID']['input']> | Types.Scalars['ID']['input'];
  filters: Types.InputMaybe<Types.ReportFiltersFilter>;
  entityFilter: Types.InputMaybe<Types.EntityFilter>;
  userFilter: Types.InputMaybe<Types.UserFilter>;
  schoolClassFilter: Types.InputMaybe<Types.SchoolClassFilter>;
}>;


export type PerformanceIndicatorsFiltersQuery = { tagReportFilters: { gradeLevels: Array<string>, entities: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, name: string | null }> }, users: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, fullName: string | null }> }, schoolClasses: { nodesCount: number, pagesCount: number, nodes: Array<{ uuid: string, name: string | null, users: { nodes: Array<{ fullName: string | null }> } | null }> } } };

export type UserRoleQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserRoleQuery = { userInfo: { username: string | null, uuid: string, role: Types.UserRoles } };
