import * as Types from './types';

export type GoalPerformanceIndicatorsDataFragment = { averageScore: number, tag: { name: string }, results: Array<{ contextName: string, gradedAt: string, origin: Types.ServiceNames, rubricName: string, scoreEarned: number }> };

export type PlanForStudentReportFragment = { name: string, id: string, groups: Array<{ id: string, name: string, step: number | null, displayName: string, description: string | null, statements: Array<{ id: string, step: number | null, name: string, isRequired: boolean, results: Array<{ createdAt: string, result: Types.EvaluationResultValues }>, question: { id: string, text: string, questionType: Types.PlanGroupStatementQuestionTypes, options: Array<{ id: string, option: string }>, answer: { id: string, answer: Array<string> } | null } | null, evidences: Array<{ label: string, type: Types.EvidenceKind, contextType: Types.EvidenceContextKind | null, service: Types.ServiceNames, updatedAt: string, itemId: string | null, isTeamSubmission: boolean, id: string | null, rubricScores: Array<{ label: string, maxScore: number, currentScore: number }> | null }> }> }> };

export type AnswerPlanGroupStatementQuestionMutationVariables = Types.Exact<{
  input: Types.AnswerPlanGroupStatementQuestionMutationInput;
}>;


export type AnswerPlanGroupStatementQuestionMutation = { answerPlanGroupStatementQuestion: { answer: { id: string, answer: Array<string> } } | null };

export type CreatePlanGroupStatementEvidenceMutationVariables = Types.Exact<{
  input: Types.CreatePlanGroupStatementEvidenceMutationInput;
}>;


export type CreatePlanGroupStatementEvidenceMutation = { createPlanGroupStatementEvidence: { planGroupStatement: { id: string, evidences: Array<{ itemId: string | null, id: string | null, label: string, type: Types.EvidenceKind, contextType: Types.EvidenceContextKind | null, service: Types.ServiceNames, updatedAt: string, isTeamSubmission: boolean }> } | null } | null };

export type CreateSharedSessionTokenMutationVariables = Types.Exact<{
  input: Types.CreateSharedSessionTokenMutationInput;
}>;


export type CreateSharedSessionTokenMutation = { createSharedSessionToken: { token: string } | null };

export type DeletePlanGroupStatementEvidenceMutationVariables = Types.Exact<{
  input: Types.DeletePlanGroupStatementEvidenceMutationInput;
}>;


export type DeletePlanGroupStatementEvidenceMutation = { deletePlanGroupStatementEvidence: { planGroupStatement: { id: string, evidences: Array<{ id: string | null, itemId: string | null, label: string, type: Types.EvidenceKind, contextType: Types.EvidenceContextKind | null, service: Types.ServiceNames, updatedAt: string, isTeamSubmission: boolean }> } | null } | null };

export type EvaluateStudentMutationVariables = Types.Exact<{
  input: Types.EvaluateStudentMutationInput;
}>;


export type EvaluateStudentMutation = { evaluateStudent: { evaluation: { id: string, results: Array<{ createdAt: string, result: Types.EvaluationResultValues, evaluator: { firstName: string | null, lastName: string | null, uuid: string } | { firstName: string | null, lastName: string | null, uuid: string }, statement: { id: string } }> } | null } | null };

export type FindOrCreateConversationMutationVariables = Types.Exact<{
  input: Types.FindOrCreateConversationMutationInput;
}>;


export type FindOrCreateConversationMutation = { findOrCreateConversation: { conversation: { id: string } } | null };

export type GeneratePresignedUploadUrlMutationVariables = Types.Exact<{
  input: Types.GeneratePresignedUploadUrlMutationInput;
}>;


export type GeneratePresignedUploadUrlMutation = { generatePresignedUploadUrl: { url: string, uuid: string } | null };

export type SendMessageMutationVariables = Types.Exact<{
  input: Types.SendMessageMutationInput;
}>;


export type SendMessageMutation = { sendMessage: { message: { id: string, body: string, createdAt: string, author: { uuid: string, name: string | null } | { uuid: string, name: string } | { uuid: string, name: string | null } } } | null };

export type ConversationQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  with: Types.ConversationParticipantFilter;
}>;


export type ConversationQuery = { conversation: { id: string, messagesRead: boolean, conversationContext: { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | null, messages: { edges: Array<{ node: { body: string, createdAt: string, id: string, author: { uuid: string, name: string | null } | { uuid: string, name: string } | { uuid: string, name: string | null } } | null } | null> | null, pageInfo: { startCursor: string | null, endCursor: string | null, hasNextPage: boolean } }, recentMessage: { id: string, body: string, createdAt: string } | null } | null, conversationGroup: { hasUnreadConversation: boolean, participant: { uuid: string } | { uuid: string } | { uuid: string } } };

export type ConversationGroupsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ConversationGroupsQuery = { conversationGroups: { edges: Array<{ node: { hasUnreadConversation: boolean, participant: { uuid: string, name: string | null, members: Array<{ uuid: string, name: string | null } | { uuid: string, name: string | null }> | null, owner: { uuid: string, name: string | null } | { uuid: string, name: string | null } | null } | { uuid: string, name: string, members: Array<{ uuid: string, name: string | null } | { uuid: string, name: string | null }> | null, owner: { uuid: string, name: string | null } } | { uuid: string, name: string | null, members: Array<{ uuid: string, name: string | null } | { uuid: string, name: string | null }> | null, owner: { uuid: string, name: string | null } | { uuid: string, name: string | null } | null }, recentConversation: { id: string, recentMessage: { id: string, body: string, createdAt: string } | null } } | null } | null> | null, pageInfo: { startCursor: string | null, endCursor: string | null, hasNextPage: boolean } } };

export type ConversationRecipientsQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.ConversationRecipientFilter>;
}>;


export type ConversationRecipientsQuery = { conversationRecipients: { nodes: Array<{ name: string, recipientType: Types.ConversationParticipantTypes, uuid: string } | null> | null } };

export type ConversationsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  after?: Types.InputMaybe<Types.Scalars['String']['input']>;
  with?: Types.InputMaybe<Types.ConversationParticipantFilter>;
}>;


export type ConversationsQuery = { conversations: { edges: Array<{ node: { id: string, messagesRead: boolean, serviceName: string | null, conversationContext: { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | null, recentMessage: { id: string, body: string, createdAt: string } | null } | null } | null> | null, pageInfo: { startCursor: string | null, endCursor: string | null, hasNextPage: boolean } } };

export type DefinedLearningUuidQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DefinedLearningUuidQuery = { userInfo: { definedLearningUuid: string | null, uuid: string } };

export type SharedResumeQueryVariables = Types.Exact<{
  shareCode: Types.Scalars['String']['input'];
}>;


export type SharedResumeQuery = { sharedResume: { avatarUrl: string | null, bio: string | null, highlightedProjectsEnabled: boolean, name: string, contactLinks: Array<{ id: string, type: Types.ContactLinkTypes, value: string }>, educations: Array<{ description: string | null, endedAt: string | null, id: string, name: string, startedAt: string, type: Types.ResumeItemTypes }>, experiences: Array<{ description: string | null, endedAt: string | null, id: string, name: string, startedAt: string, type: Types.ResumeItemTypes }>, extraCurriculars: Array<{ description: string | null, endedAt: string | null, id: string, name: string, startedAt: string, type: Types.ResumeItemTypes }>, highlightedProjects: Array<{ description: string | null, finishedAt: string, id: string, imageUrl: string | null, isTeamSubmission: boolean, name: string, parentName: string | null, resourceClass: Types.PortfolioResourceClass, startedAt: string | null, thumbnailUrl: string | null, type: Types.PortfolioProjectKind | null, submission: { status: Types.SubmissionStatus | null, files: Array<{ isOwner: boolean, createdAt: string, filename: string, googleWeblink: string | null, id: string, source: Types.SubmissionFileSource | null, url: string, submitter: { firstName: string | null, fullName: string | null, lastName: string | null } | { firstName: string | null, fullName: string | null, lastName: string | null } | null }> } }>, highlightedBadges: Array<{ id: string, description: string, imageUrl: string, name: string, resource: { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } | { id: string, name: string } }> } };

export type TaskResourcesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type TaskResourcesQuery = { task: { name: string, id: string, teachingResources: string | null, studentResources: string | null, standard: string | null, files: Array<{ description: string | null, displayName: string, filename: string, id: string, step: number | null, url: string }> } | null };
