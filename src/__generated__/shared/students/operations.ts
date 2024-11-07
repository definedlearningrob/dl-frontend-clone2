import * as Types from './types';

export type GoalPerformanceIndicatorsDataFragment = { averageScore: number, tag: { name: string }, results: Array<{ contextName: string, gradedAt: string, origin: Types.ServiceNames, rubricName: string, scoreEarned: number }> };

export type PlanForStudentReportFragment = { name: string, id: string, groups: Array<{ id: string, name: string, step: number | null, displayName: string, description: string | null, statements: Array<{ id: string, step: number | null, name: string, isRequired: boolean, results: Array<{ createdAt: string, result: Types.EvaluationResultValues }>, question: { id: string, text: string, questionType: Types.PlanGroupStatementQuestionTypes, options: Array<{ id: string, option: string }>, answer: { id: string, answer: Array<string> } | null } | null, evidences: Array<{ label: string, type: Types.EvidenceKind, contextType: Types.EvidenceContextKind | null, service: Types.ServiceNames, updatedAt: string, itemId: string | null, isTeamSubmission: boolean, id: string | null, rubricScores: Array<{ label: string, maxScore: number, currentScore: number }> | null }> }> }> };

export type CreateContactLinkMutationVariables = Types.Exact<{
  input: Types.CreateContactLinkMutationInput;
}>;


export type CreateContactLinkMutation = { createContactLink: { contactLink: { id: string, value: string, visible: boolean, type: Types.ContactLinkTypes } | null } | null };

export type CreatePortfolioProjectMutationVariables = Types.Exact<{
  input: Types.CreatePortfolioProjectMutationInput;
}>;


export type CreatePortfolioProjectMutation = { createPortfolioProject: { portfolioProject: { description: string | null, id: string, imageUrl: string | null, resourceClass: Types.PortfolioResourceClass, name: string, parentName: string | null, submission: { status: Types.SubmissionStatus | null, files: Array<{ filename: string, googleWeblink: string | null, source: Types.SubmissionFileSource | null, url: string }> } } | null } | null };

export type CreatePortfolioProjectFileMutationVariables = Types.Exact<{
  input: Types.CreatePortfolioProjectFileMutationInput;
}>;


export type CreatePortfolioProjectFileMutation = { createPortfolioProjectFile: { portfolioProjectFile: { filename: string, googleWeblink: string | null, source: Types.SubmissionFileSource | null, url: string } | null } | null };

export type CreateStudentEvaluationCommentMutationVariables = Types.Exact<{
  input: Types.CreateEvaluationCommentMutationInput;
}>;


export type CreateStudentEvaluationCommentMutation = { createEvaluationComment: { evaluation: { id: string, comments: Array<{ body: string, createdAt: string, author: { email: string | null, firstName: string | null, lastName: string | null, username: string | null, uuid: string } | { email: string | null, firstName: string | null, lastName: string | null, username: string | null, uuid: string }, statement: { id: string, name: string } }> } | null } | null };

export type DeleteContactLinkMutationVariables = Types.Exact<{
  input: Types.DeleteContactLinkMutationInput;
}>;


export type DeleteContactLinkMutation = { deleteContactLink: { status: string | null } | null };

export type DeletePortfolioProjectMutationVariables = Types.Exact<{
  input: Types.DeletePortfolioProjectMutationInput;
}>;


export type DeletePortfolioProjectMutation = { deletePortfolioProject: { status: string | null } | null };

export type DeletePortfolioProjectFileMutationVariables = Types.Exact<{
  input: Types.DeletePortfolioProjectFileMutationInput;
}>;


export type DeletePortfolioProjectFileMutation = { deletePortfolioProjectFile: { status: string | null } | null };

export type GeneratePresignedUploadUrlMutationVariables = Types.Exact<{
  input: Types.GeneratePresignedUploadUrlMutationInput;
}>;


export type GeneratePresignedUploadUrlMutation = { generatePresignedUploadUrl: { url: string, uuid: string } | null };

export type MarkAllNotificationsAsReadMutationVariables = Types.Exact<{
  input: Types.MarkAllNotificationsAsReadMutationInput;
}>;


export type MarkAllNotificationsAsReadMutation = { markAllNotificationsAsRead: { status: string } | null };

export type UpdateContactLinkMutationVariables = Types.Exact<{
  input: Types.UpdateContactLinkMutationInput;
}>;


export type UpdateContactLinkMutation = { updateContactLink: { contactLink: { id: string, value: string, visible: boolean, type: Types.ContactLinkTypes } | null } | null };

export type UpdatePortfolioProjectMutationVariables = Types.Exact<{
  input: Types.UpdatePortfolioProjectMutationInput;
}>;


export type UpdatePortfolioProjectMutation = { updatePortfolioProject: { portfolioProject: { description: string | null, id: string, imageUrl: string | null, name: string, resourceClass: Types.PortfolioResourceClass, parentName: string | null, submission: { status: Types.SubmissionStatus | null, files: Array<{ filename: string, googleWeblink: string | null, source: Types.SubmissionFileSource | null, url: string }> } } } | null };

export type UpdateResumeMutationVariables = Types.Exact<{
  input: Types.UpdateResumeMutationInput;
}>;


export type UpdateResumeMutation = { updateResume: { resume: { id: string, name: string, bio: string | null, avatarUrl: string | null, highlightedProjectsEnabled: boolean, sharedUrlEnabled: boolean, sharedUrl: string | null, contactLinks: Array<{ id: string, value: string, visible: boolean, type: Types.ContactLinkTypes }>, experiences: Array<{ id: string, name: string, description: string | null, startedAt: string, endedAt: string | null, visible: boolean }>, extraCurriculars: Array<{ id: string, name: string, description: string | null, startedAt: string, endedAt: string | null, visible: boolean }>, educations: Array<{ id: string, name: string, description: string | null, startedAt: string, endedAt: string | null, visible: boolean }>, highlightedProjects: Array<{ description: string | null, finishedAt: string, id: string, imageUrl: string | null, isTeamSubmission: boolean, name: string, parentName: string | null, resourceClass: Types.PortfolioResourceClass, startedAt: string | null, thumbnailUrl: string | null, type: Types.PortfolioProjectKind | null, submission: { status: Types.SubmissionStatus | null, files: Array<{ createdAt: string, filename: string, googleWeblink: string | null, id: string, source: Types.SubmissionFileSource | null, url: string }> } }>, badges: Array<{ id: string, imageUrl: string, name: string, isHighlighted: boolean, resource: { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } }>, highlightedBadges: Array<{ id: string, description: string, imageUrl: string, name: string, isHighlighted: boolean, resource: { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } }> } } | null };

export type CareerExperienceQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CareerExperienceQuery = { portfolio: { studentId: string, careerExperience: { submissions: Array<{ service: Types.ServiceNames, submissionName: string, contextName: string, submittedAt: string, isTeamSubmission: boolean }> } | null } | null };

export type CareerExperiencesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CareerExperiencesQuery = { portfolio: { studentId: string, careerExperiences: Array<{ clusterId: string, clusterName: string, submissionsCount: number }> } | null };

export type PlanWithEvaluationQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type PlanWithEvaluationQuery = { plan: { description: string | null, id: string, name: string, evaluation: { id: string } | null, groups: Array<{ description: string | null, displayName: string, id: string, name: string, step: number | null, statements: Array<{ id: string, name: string, step: number | null, isLocked: boolean, isRequired: boolean, evidences: Array<{ contextType: Types.EvidenceContextKind | null, label: string, service: Types.ServiceNames, type: Types.EvidenceKind, updatedAt: string, isTeamSubmission: boolean, id: string | null, itemId: string | null, rubricScores: Array<{ currentScore: number, maxScore: number, label: string }> | null }>, question: { id: string, text: string, questionType: Types.PlanGroupStatementQuestionTypes, options: Array<{ option: string, id: string }>, answer: { id: string, answer: Array<string> } | null } | null, results: Array<{ createdAt: string, result: Types.EvaluationResultValues, evaluator: { firstName: string | null, lastName: string | null, uuid: string } | { firstName: string | null, lastName: string | null, uuid: string } }>, comments: Array<{ createdAt: string, body: string, author: { firstName: string | null, lastName: string | null, uuid: string } | { firstName: string | null, lastName: string | null, uuid: string } }> }> }>, progress: { completed: number, total: number } } | null };

export type PortfolioPlansQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PortfolioPlansQuery = { portfolio: { studentId: string, plans: Array<{ id: string, name: string, evaluation: { id: string } | null } | null> } | null };

export type PortfolioProjectsQueryVariables = Types.Exact<{
  type: Types.PortfolioKind;
  first: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type PortfolioProjectsQuery = { portfolio: { studentId: string, projects: { totalCount: number, edges: Array<{ cursor: string, node: { description: string | null, id: string, name: string, imageUrl: string | null, parentName: string | null, isTeamSubmission: boolean, resourceClass: Types.PortfolioResourceClass, finishedAt: string, type: Types.PortfolioProjectKind | null, thumbnailUrl: string | null, submission: { status: Types.SubmissionStatus | null, files: Array<{ isOwner: boolean, id: string, filename: string, googleWeblink: string | null, source: Types.SubmissionFileSource | null, url: string, createdAt: string, submitter: { firstName: string | null, lastName: string | null, uuid: string } | { firstName: string | null, lastName: string | null, uuid: string } | null }> } } | null } | null> | null, pageInfo: { endCursor: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string | null } } | null } | null };

export type PortfolioResumesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PortfolioResumesQuery = { portfolio: { studentId: string, sharedResume: { avatarUrl: string | null, bio: string | null, highlightedProjectsEnabled: boolean, id: string, name: string, sharedUrl: string | null, sharedUrlEnabled: boolean, contactLinks: Array<{ id: string, type: Types.ContactLinkTypes, value: string, visible: boolean }>, experiences: Array<{ description: string | null, endedAt: string | null, id: string, name: string, startedAt: string, visible: boolean }>, educations: Array<{ description: string | null, endedAt: string | null, id: string, name: string, startedAt: string, visible: boolean }>, extraCurriculars: Array<{ description: string | null, endedAt: string | null, id: string, name: string, startedAt: string, visible: boolean }>, externalResumes: Array<{ filename: string, id: string, url: string }>, dcProjects: { nodes: Array<{ description: string | null, id: string, imageUrl: string | null, name: string, isTeamSubmission: boolean, parentName: string | null, finishedAt: string, thumbnailUrl: string | null, type: Types.PortfolioProjectKind | null, isHighlighted: boolean, resourceClass: Types.PortfolioResourceClass, submission: { status: Types.SubmissionStatus | null, files: Array<{ isOwner: boolean, id: string, filename: string, submitter: { firstName: string | null, fullName: string | null, lastName: string | null, uuid: string } | { firstName: string | null, fullName: string | null, lastName: string | null, uuid: string } | null }> } } | null> | null } | null, dlProjects: { nodes: Array<{ description: string | null, id: string, imageUrl: string | null, name: string, isTeamSubmission: boolean, parentName: string | null, finishedAt: string, thumbnailUrl: string | null, type: Types.PortfolioProjectKind | null, isHighlighted: boolean, resourceClass: Types.PortfolioResourceClass, submission: { status: Types.SubmissionStatus | null, files: Array<{ id: string, isOwner: boolean, filename: string, submitter: { firstName: string | null, fullName: string | null, lastName: string | null, uuid: string } | { firstName: string | null, fullName: string | null, lastName: string | null, uuid: string } | null }> } } | null> | null } | null, personalProjects: { nodes: Array<{ description: string | null, id: string, imageUrl: string | null, name: string, isTeamSubmission: boolean, parentName: string | null, finishedAt: string, thumbnailUrl: string | null, type: Types.PortfolioProjectKind | null, isHighlighted: boolean, resourceClass: Types.PortfolioResourceClass, submission: { status: Types.SubmissionStatus | null, files: Array<{ isOwner: boolean, id: string, filename: string, submitter: { firstName: string | null, fullName: string | null, lastName: string | null, uuid: string } | { firstName: string | null, fullName: string | null, lastName: string | null, uuid: string } | null }> } } | null> | null } | null, highlightedProjects: Array<{ description: string | null, finishedAt: string, id: string, imageUrl: string | null, isTeamSubmission: boolean, name: string, parentName: string | null, resourceClass: Types.PortfolioResourceClass, startedAt: string | null, thumbnailUrl: string | null, type: Types.PortfolioProjectKind | null, submission: { status: Types.SubmissionStatus | null, files: Array<{ isOwner: boolean, createdAt: string, filename: string, googleWeblink: string | null, id: string, source: Types.SubmissionFileSource | null, url: string, submitter: { firstName: string | null, fullName: string | null, lastName: string | null, uuid: string } | { firstName: string | null, fullName: string | null, lastName: string | null, uuid: string } | null }> } }>, badges: Array<{ id: string, description: string, imageUrl: string, isHighlighted: boolean, name: string, resource: { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } }>, highlightedBadges: Array<{ id: string, description: string, imageUrl: string, isHighlighted: boolean, name: string, resource: { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } }> } | null } | null };

export type SharedResumeQueryVariables = Types.Exact<{
  shareCode: Types.Scalars['String']['input'];
}>;


export type SharedResumeQuery = { sharedResume: { avatarUrl: string | null, bio: string | null, highlightedProjectsEnabled: boolean, id: string, name: string, shareCode: string | null, sharedUrl: string | null, sharedUrlEnabled: boolean, contactLinks: Array<{ id: string, type: Types.ContactLinkTypes, value: string, visible: boolean }>, educations: Array<{ description: string | null, endedAt: string | null, id: string, name: string, startedAt: string, type: Types.ResumeItemTypes, visible: boolean }>, experiences: Array<{ description: string | null, endedAt: string | null, id: string, name: string, startedAt: string, type: Types.ResumeItemTypes, visible: boolean }>, extraCurriculars: Array<{ description: string | null, endedAt: string | null, id: string, name: string, startedAt: string, type: Types.ResumeItemTypes, visible: boolean }>, externalResumes: Array<{ id: string, url: string, filename: string }>, highlightedProjects: Array<{ description: string | null, finishedAt: string, id: string, imageUrl: string | null, isHighlighted: boolean, isTeamSubmission: boolean, name: string, parentName: string | null, resourceClass: Types.PortfolioResourceClass, startedAt: string | null, submittedAt: string, thumbnailUrl: string | null, type: Types.PortfolioProjectKind | null, submission: { status: Types.SubmissionStatus | null, files: Array<{ isOwner: boolean, createdAt: string, filename: string, googleWeblink: string | null, id: string, source: Types.SubmissionFileSource | null, url: string, submitter: { firstName: string | null, fullName: string | null, lastName: string | null, uuid: string } | { firstName: string | null, fullName: string | null, lastName: string | null, uuid: string } | null }> } }>, highlightedBadges: Array<{ id: string, description: string, imageUrl: string, name: string, resource: { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } }> } };

export type StudentReportByStudentQueryVariables = Types.Exact<{
  planId: Types.Scalars['ID']['input'];
}>;


export type StudentReportByStudentQuery = { studentReport: { overallData: { completed: number, inProgress: number, notStarted: number, studentFullName: string, planName: string, notMet: number }, plan: { name: string, id: string, groups: Array<{ id: string, name: string, step: number | null, displayName: string, description: string | null, statements: Array<{ id: string, step: number | null, name: string, isRequired: boolean, results: Array<{ createdAt: string, result: Types.EvaluationResultValues }>, question: { id: string, text: string, questionType: Types.PlanGroupStatementQuestionTypes, options: Array<{ id: string, option: string }>, answer: { id: string, answer: Array<string> } | null } | null, evidences: Array<{ label: string, type: Types.EvidenceKind, contextType: Types.EvidenceContextKind | null, service: Types.ServiceNames, updatedAt: string, itemId: string | null, isTeamSubmission: boolean, id: string | null, rubricScores: Array<{ label: string, maxScore: number, currentScore: number }> | null }> }> }> }, goalPerformanceIndicatorsData: Array<{ averageScore: number, tag: { name: string }, results: Array<{ contextName: string, gradedAt: string, origin: Types.ServiceNames, rubricName: string, scoreEarned: number }> }> } };
