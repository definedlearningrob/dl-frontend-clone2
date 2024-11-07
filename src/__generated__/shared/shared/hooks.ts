import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const GoalPerformanceIndicatorsDataFragmentDoc = gql`
    fragment GoalPerformanceIndicatorsData on GoalPerformanceData {
  averageScore
  tag {
    name
  }
  results {
    contextName
    gradedAt
    origin
    rubricName
    scoreEarned
  }
}
    `;
export const PlanForStudentReportFragmentDoc = gql`
    fragment PlanForStudentReport on Plan {
  name
  id
  groups {
    id
    name
    step
    displayName
    description
    statements {
      id
      step
      results {
        createdAt
        result
      }
      name
      isRequired
      question {
        id
        text
        questionType
        options {
          id
          option
        }
        answer {
          id
          answer
        }
      }
      evidences {
        label
        type
        contextType
        service
        updatedAt
        itemId
        isTeamSubmission
        id
        rubricScores {
          label
          maxScore
          currentScore
        }
      }
    }
  }
}
    `;
export const AnswerPlanGroupStatementQuestionDocument = gql`
    mutation AnswerPlanGroupStatementQuestion($input: AnswerPlanGroupStatementQuestionMutationInput!) {
  answerPlanGroupStatementQuestion(input: $input) {
    answer {
      id
      answer
    }
  }
}
    `;
export type AnswerPlanGroupStatementQuestionMutationFn = Apollo.MutationFunction<Types.AnswerPlanGroupStatementQuestionMutation, Types.AnswerPlanGroupStatementQuestionMutationVariables>;

/**
 * __useAnswerPlanGroupStatementQuestionMutation__
 *
 * To run a mutation, you first call `useAnswerPlanGroupStatementQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnswerPlanGroupStatementQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [answerPlanGroupStatementQuestionMutation, { data, loading, error }] = useAnswerPlanGroupStatementQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAnswerPlanGroupStatementQuestionMutation(baseOptions?: Apollo.MutationHookOptions<Types.AnswerPlanGroupStatementQuestionMutation, Types.AnswerPlanGroupStatementQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AnswerPlanGroupStatementQuestionMutation, Types.AnswerPlanGroupStatementQuestionMutationVariables>(AnswerPlanGroupStatementQuestionDocument, options);
      }
export type AnswerPlanGroupStatementQuestionMutationHookResult = ReturnType<typeof useAnswerPlanGroupStatementQuestionMutation>;
export type AnswerPlanGroupStatementQuestionMutationResult = Apollo.MutationResult<Types.AnswerPlanGroupStatementQuestionMutation>;
export type AnswerPlanGroupStatementQuestionMutationOptions = Apollo.BaseMutationOptions<Types.AnswerPlanGroupStatementQuestionMutation, Types.AnswerPlanGroupStatementQuestionMutationVariables>;
export const CreatePlanGroupStatementEvidenceMutationDocument = gql`
    mutation CreatePlanGroupStatementEvidenceMutation($input: CreatePlanGroupStatementEvidenceMutationInput!) {
  createPlanGroupStatementEvidence(input: $input) {
    planGroupStatement {
      id
      evidences {
        itemId
        id
        label
        type
        contextType
        service
        updatedAt
        isTeamSubmission
      }
    }
  }
}
    `;
export type CreatePlanGroupStatementEvidenceMutationMutationFn = Apollo.MutationFunction<Types.CreatePlanGroupStatementEvidenceMutation, Types.CreatePlanGroupStatementEvidenceMutationVariables>;

/**
 * __useCreatePlanGroupStatementEvidenceMutation__
 *
 * To run a mutation, you first call `useCreatePlanGroupStatementEvidenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlanGroupStatementEvidenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlanGroupStatementEvidenceMutation, { data, loading, error }] = useCreatePlanGroupStatementEvidenceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlanGroupStatementEvidenceMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreatePlanGroupStatementEvidenceMutation, Types.CreatePlanGroupStatementEvidenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreatePlanGroupStatementEvidenceMutation, Types.CreatePlanGroupStatementEvidenceMutationVariables>(CreatePlanGroupStatementEvidenceMutationDocument, options);
      }
export type CreatePlanGroupStatementEvidenceMutationHookResult = ReturnType<typeof useCreatePlanGroupStatementEvidenceMutation>;
export type CreatePlanGroupStatementEvidenceMutationMutationResult = Apollo.MutationResult<Types.CreatePlanGroupStatementEvidenceMutation>;
export type CreatePlanGroupStatementEvidenceMutationMutationOptions = Apollo.BaseMutationOptions<Types.CreatePlanGroupStatementEvidenceMutation, Types.CreatePlanGroupStatementEvidenceMutationVariables>;
export const CreateSharedSessionTokenDocument = gql`
    mutation CreateSharedSessionToken($input: CreateSharedSessionTokenMutationInput!) {
  createSharedSessionToken(input: $input) {
    token
  }
}
    `;
export type CreateSharedSessionTokenMutationFn = Apollo.MutationFunction<Types.CreateSharedSessionTokenMutation, Types.CreateSharedSessionTokenMutationVariables>;

/**
 * __useCreateSharedSessionTokenMutation__
 *
 * To run a mutation, you first call `useCreateSharedSessionTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSharedSessionTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSharedSessionTokenMutation, { data, loading, error }] = useCreateSharedSessionTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSharedSessionTokenMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateSharedSessionTokenMutation, Types.CreateSharedSessionTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateSharedSessionTokenMutation, Types.CreateSharedSessionTokenMutationVariables>(CreateSharedSessionTokenDocument, options);
      }
export type CreateSharedSessionTokenMutationHookResult = ReturnType<typeof useCreateSharedSessionTokenMutation>;
export type CreateSharedSessionTokenMutationResult = Apollo.MutationResult<Types.CreateSharedSessionTokenMutation>;
export type CreateSharedSessionTokenMutationOptions = Apollo.BaseMutationOptions<Types.CreateSharedSessionTokenMutation, Types.CreateSharedSessionTokenMutationVariables>;
export const DeletePlanGroupStatementEvidenceMutationDocument = gql`
    mutation DeletePlanGroupStatementEvidenceMutation($input: DeletePlanGroupStatementEvidenceMutationInput!) {
  deletePlanGroupStatementEvidence(input: $input) {
    planGroupStatement {
      id
      evidences {
        id
        itemId
        label
        type
        contextType
        service
        updatedAt
        isTeamSubmission
      }
    }
  }
}
    `;
export type DeletePlanGroupStatementEvidenceMutationMutationFn = Apollo.MutationFunction<Types.DeletePlanGroupStatementEvidenceMutation, Types.DeletePlanGroupStatementEvidenceMutationVariables>;

/**
 * __useDeletePlanGroupStatementEvidenceMutation__
 *
 * To run a mutation, you first call `useDeletePlanGroupStatementEvidenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlanGroupStatementEvidenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlanGroupStatementEvidenceMutation, { data, loading, error }] = useDeletePlanGroupStatementEvidenceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePlanGroupStatementEvidenceMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeletePlanGroupStatementEvidenceMutation, Types.DeletePlanGroupStatementEvidenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeletePlanGroupStatementEvidenceMutation, Types.DeletePlanGroupStatementEvidenceMutationVariables>(DeletePlanGroupStatementEvidenceMutationDocument, options);
      }
export type DeletePlanGroupStatementEvidenceMutationHookResult = ReturnType<typeof useDeletePlanGroupStatementEvidenceMutation>;
export type DeletePlanGroupStatementEvidenceMutationMutationResult = Apollo.MutationResult<Types.DeletePlanGroupStatementEvidenceMutation>;
export type DeletePlanGroupStatementEvidenceMutationMutationOptions = Apollo.BaseMutationOptions<Types.DeletePlanGroupStatementEvidenceMutation, Types.DeletePlanGroupStatementEvidenceMutationVariables>;
export const EvaluateStudentDocument = gql`
    mutation EvaluateStudent($input: EvaluateStudentMutationInput!) {
  evaluateStudent(input: $input) {
    evaluation {
      id
      results {
        createdAt
        evaluator {
          firstName
          lastName
          uuid
        }
        result
        statement {
          id
        }
      }
    }
  }
}
    `;
export type EvaluateStudentMutationFn = Apollo.MutationFunction<Types.EvaluateStudentMutation, Types.EvaluateStudentMutationVariables>;

/**
 * __useEvaluateStudentMutation__
 *
 * To run a mutation, you first call `useEvaluateStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvaluateStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evaluateStudentMutation, { data, loading, error }] = useEvaluateStudentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEvaluateStudentMutation(baseOptions?: Apollo.MutationHookOptions<Types.EvaluateStudentMutation, Types.EvaluateStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.EvaluateStudentMutation, Types.EvaluateStudentMutationVariables>(EvaluateStudentDocument, options);
      }
export type EvaluateStudentMutationHookResult = ReturnType<typeof useEvaluateStudentMutation>;
export type EvaluateStudentMutationResult = Apollo.MutationResult<Types.EvaluateStudentMutation>;
export type EvaluateStudentMutationOptions = Apollo.BaseMutationOptions<Types.EvaluateStudentMutation, Types.EvaluateStudentMutationVariables>;
export const FindOrCreateConversationDocument = gql`
    mutation FindOrCreateConversation($input: FindOrCreateConversationMutationInput!) {
  findOrCreateConversation(input: $input) {
    conversation {
      id
    }
  }
}
    `;
export type FindOrCreateConversationMutationFn = Apollo.MutationFunction<Types.FindOrCreateConversationMutation, Types.FindOrCreateConversationMutationVariables>;

/**
 * __useFindOrCreateConversationMutation__
 *
 * To run a mutation, you first call `useFindOrCreateConversationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindOrCreateConversationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findOrCreateConversationMutation, { data, loading, error }] = useFindOrCreateConversationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindOrCreateConversationMutation(baseOptions?: Apollo.MutationHookOptions<Types.FindOrCreateConversationMutation, Types.FindOrCreateConversationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.FindOrCreateConversationMutation, Types.FindOrCreateConversationMutationVariables>(FindOrCreateConversationDocument, options);
      }
export type FindOrCreateConversationMutationHookResult = ReturnType<typeof useFindOrCreateConversationMutation>;
export type FindOrCreateConversationMutationResult = Apollo.MutationResult<Types.FindOrCreateConversationMutation>;
export type FindOrCreateConversationMutationOptions = Apollo.BaseMutationOptions<Types.FindOrCreateConversationMutation, Types.FindOrCreateConversationMutationVariables>;
export const GeneratePresignedUploadUrlDocument = gql`
    mutation GeneratePresignedUploadUrl($input: GeneratePresignedUploadUrlMutationInput!) {
  generatePresignedUploadUrl(input: $input) {
    url
    uuid
  }
}
    `;
export type GeneratePresignedUploadUrlMutationFn = Apollo.MutationFunction<Types.GeneratePresignedUploadUrlMutation, Types.GeneratePresignedUploadUrlMutationVariables>;

/**
 * __useGeneratePresignedUploadUrlMutation__
 *
 * To run a mutation, you first call `useGeneratePresignedUploadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGeneratePresignedUploadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generatePresignedUploadUrlMutation, { data, loading, error }] = useGeneratePresignedUploadUrlMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGeneratePresignedUploadUrlMutation(baseOptions?: Apollo.MutationHookOptions<Types.GeneratePresignedUploadUrlMutation, Types.GeneratePresignedUploadUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.GeneratePresignedUploadUrlMutation, Types.GeneratePresignedUploadUrlMutationVariables>(GeneratePresignedUploadUrlDocument, options);
      }
export type GeneratePresignedUploadUrlMutationHookResult = ReturnType<typeof useGeneratePresignedUploadUrlMutation>;
export type GeneratePresignedUploadUrlMutationResult = Apollo.MutationResult<Types.GeneratePresignedUploadUrlMutation>;
export type GeneratePresignedUploadUrlMutationOptions = Apollo.BaseMutationOptions<Types.GeneratePresignedUploadUrlMutation, Types.GeneratePresignedUploadUrlMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($input: SendMessageMutationInput!) {
  sendMessage(input: $input) {
    message {
      author {
        uuid
        name
      }
      id
      body
      createdAt
    }
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<Types.SendMessageMutation, Types.SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<Types.SendMessageMutation, Types.SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SendMessageMutation, Types.SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<Types.SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<Types.SendMessageMutation, Types.SendMessageMutationVariables>;
export const ConversationDocument = gql`
    query Conversation($id: ID!, $first: Int, $after: String, $with: ConversationParticipantFilter!) {
  conversation(id: $id) {
    id
    conversationContext {
      id
      name
    }
    messages(first: $first, after: $after) {
      edges {
        node {
          author {
            uuid
            name
          }
          body
          createdAt
          id
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
    }
    messagesRead
    recentMessage {
      id
      body
      createdAt
    }
  }
  conversationGroup(with: $with) {
    hasUnreadConversation
    participant {
      uuid
    }
  }
}
    `;

/**
 * __useConversationQuery__
 *
 * To run a query within a React component, call `useConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationQuery({
 *   variables: {
 *      id: // value for 'id'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      with: // value for 'with'
 *   },
 * });
 */
export function useConversationQuery(baseOptions: Apollo.QueryHookOptions<Types.ConversationQuery, Types.ConversationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ConversationQuery, Types.ConversationQueryVariables>(ConversationDocument, options);
      }
export function useConversationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ConversationQuery, Types.ConversationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ConversationQuery, Types.ConversationQueryVariables>(ConversationDocument, options);
        }
export function useConversationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ConversationQuery, Types.ConversationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ConversationQuery, Types.ConversationQueryVariables>(ConversationDocument, options);
        }
export type ConversationQueryHookResult = ReturnType<typeof useConversationQuery>;
export type ConversationLazyQueryHookResult = ReturnType<typeof useConversationLazyQuery>;
export type ConversationSuspenseQueryHookResult = ReturnType<typeof useConversationSuspenseQuery>;
export type ConversationQueryResult = Apollo.QueryResult<Types.ConversationQuery, Types.ConversationQueryVariables>;
export const ConversationGroupsDocument = gql`
    query ConversationGroups($first: Int, $after: String) {
  conversationGroups(first: $first, after: $after) {
    edges {
      node {
        hasUnreadConversation
        participant {
          uuid
          name
          members {
            uuid
            name
          }
          owner {
            uuid
            name
          }
        }
        recentConversation {
          id
          recentMessage {
            id
            body
            createdAt
          }
        }
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
  }
}
    `;

/**
 * __useConversationGroupsQuery__
 *
 * To run a query within a React component, call `useConversationGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationGroupsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useConversationGroupsQuery(baseOptions?: Apollo.QueryHookOptions<Types.ConversationGroupsQuery, Types.ConversationGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ConversationGroupsQuery, Types.ConversationGroupsQueryVariables>(ConversationGroupsDocument, options);
      }
export function useConversationGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ConversationGroupsQuery, Types.ConversationGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ConversationGroupsQuery, Types.ConversationGroupsQueryVariables>(ConversationGroupsDocument, options);
        }
export function useConversationGroupsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ConversationGroupsQuery, Types.ConversationGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ConversationGroupsQuery, Types.ConversationGroupsQueryVariables>(ConversationGroupsDocument, options);
        }
export type ConversationGroupsQueryHookResult = ReturnType<typeof useConversationGroupsQuery>;
export type ConversationGroupsLazyQueryHookResult = ReturnType<typeof useConversationGroupsLazyQuery>;
export type ConversationGroupsSuspenseQueryHookResult = ReturnType<typeof useConversationGroupsSuspenseQuery>;
export type ConversationGroupsQueryResult = Apollo.QueryResult<Types.ConversationGroupsQuery, Types.ConversationGroupsQueryVariables>;
export const ConversationRecipientsDocument = gql`
    query ConversationRecipients($filter: ConversationRecipientFilter) {
  conversationRecipients(filter: $filter) {
    nodes {
      name
      recipientType
      uuid: recipientUuid
    }
  }
}
    `;

/**
 * __useConversationRecipientsQuery__
 *
 * To run a query within a React component, call `useConversationRecipientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationRecipientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationRecipientsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useConversationRecipientsQuery(baseOptions?: Apollo.QueryHookOptions<Types.ConversationRecipientsQuery, Types.ConversationRecipientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ConversationRecipientsQuery, Types.ConversationRecipientsQueryVariables>(ConversationRecipientsDocument, options);
      }
export function useConversationRecipientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ConversationRecipientsQuery, Types.ConversationRecipientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ConversationRecipientsQuery, Types.ConversationRecipientsQueryVariables>(ConversationRecipientsDocument, options);
        }
export function useConversationRecipientsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ConversationRecipientsQuery, Types.ConversationRecipientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ConversationRecipientsQuery, Types.ConversationRecipientsQueryVariables>(ConversationRecipientsDocument, options);
        }
export type ConversationRecipientsQueryHookResult = ReturnType<typeof useConversationRecipientsQuery>;
export type ConversationRecipientsLazyQueryHookResult = ReturnType<typeof useConversationRecipientsLazyQuery>;
export type ConversationRecipientsSuspenseQueryHookResult = ReturnType<typeof useConversationRecipientsSuspenseQuery>;
export type ConversationRecipientsQueryResult = Apollo.QueryResult<Types.ConversationRecipientsQuery, Types.ConversationRecipientsQueryVariables>;
export const ConversationsDocument = gql`
    query Conversations($first: Int, $after: String, $with: ConversationParticipantFilter) {
  conversations(first: $first, after: $after, with: $with) {
    edges {
      node {
        conversationContext {
          id
          name
        }
        id
        messagesRead
        serviceName
        recentMessage {
          id
          body
          createdAt
        }
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
    }
  }
}
    `;

/**
 * __useConversationsQuery__
 *
 * To run a query within a React component, call `useConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversationsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      with: // value for 'with'
 *   },
 * });
 */
export function useConversationsQuery(baseOptions?: Apollo.QueryHookOptions<Types.ConversationsQuery, Types.ConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ConversationsQuery, Types.ConversationsQueryVariables>(ConversationsDocument, options);
      }
export function useConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ConversationsQuery, Types.ConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ConversationsQuery, Types.ConversationsQueryVariables>(ConversationsDocument, options);
        }
export function useConversationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ConversationsQuery, Types.ConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ConversationsQuery, Types.ConversationsQueryVariables>(ConversationsDocument, options);
        }
export type ConversationsQueryHookResult = ReturnType<typeof useConversationsQuery>;
export type ConversationsLazyQueryHookResult = ReturnType<typeof useConversationsLazyQuery>;
export type ConversationsSuspenseQueryHookResult = ReturnType<typeof useConversationsSuspenseQuery>;
export type ConversationsQueryResult = Apollo.QueryResult<Types.ConversationsQuery, Types.ConversationsQueryVariables>;
export const DefinedLearningUuidDocument = gql`
    query DefinedLearningUuid {
  userInfo {
    definedLearningUuid
    uuid
  }
}
    `;

/**
 * __useDefinedLearningUuidQuery__
 *
 * To run a query within a React component, call `useDefinedLearningUuidQuery` and pass it any options that fit your needs.
 * When your component renders, `useDefinedLearningUuidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDefinedLearningUuidQuery({
 *   variables: {
 *   },
 * });
 */
export function useDefinedLearningUuidQuery(baseOptions?: Apollo.QueryHookOptions<Types.DefinedLearningUuidQuery, Types.DefinedLearningUuidQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DefinedLearningUuidQuery, Types.DefinedLearningUuidQueryVariables>(DefinedLearningUuidDocument, options);
      }
export function useDefinedLearningUuidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DefinedLearningUuidQuery, Types.DefinedLearningUuidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DefinedLearningUuidQuery, Types.DefinedLearningUuidQueryVariables>(DefinedLearningUuidDocument, options);
        }
export function useDefinedLearningUuidSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DefinedLearningUuidQuery, Types.DefinedLearningUuidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DefinedLearningUuidQuery, Types.DefinedLearningUuidQueryVariables>(DefinedLearningUuidDocument, options);
        }
export type DefinedLearningUuidQueryHookResult = ReturnType<typeof useDefinedLearningUuidQuery>;
export type DefinedLearningUuidLazyQueryHookResult = ReturnType<typeof useDefinedLearningUuidLazyQuery>;
export type DefinedLearningUuidSuspenseQueryHookResult = ReturnType<typeof useDefinedLearningUuidSuspenseQuery>;
export type DefinedLearningUuidQueryResult = Apollo.QueryResult<Types.DefinedLearningUuidQuery, Types.DefinedLearningUuidQueryVariables>;
export const SharedResumeDocument = gql`
    query SharedResume($shareCode: String!) {
  sharedResume(shareCode: $shareCode) {
    avatarUrl
    bio
    contactLinks {
      id
      type
      value
    }
    educations {
      description
      endedAt
      id
      name
      startedAt
      type
    }
    experiences {
      description
      endedAt
      id
      name
      startedAt
      type
    }
    extraCurriculars {
      description
      endedAt
      id
      name
      startedAt
      type
    }
    highlightedProjects {
      description
      finishedAt
      id
      imageUrl
      isTeamSubmission
      name
      parentName
      resourceClass
      startedAt
      submission {
        files {
          isOwner
          createdAt
          filename
          googleWeblink
          id
          source
          submitter {
            firstName
            fullName
            lastName
          }
          url
        }
        status
      }
      thumbnailUrl
      type
    }
    highlightedBadges {
      id
      description
      imageUrl
      name
      resource {
        id
        name
      }
    }
    highlightedProjectsEnabled
    name
  }
}
    `;

/**
 * __useSharedResumeQuery__
 *
 * To run a query within a React component, call `useSharedResumeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSharedResumeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSharedResumeQuery({
 *   variables: {
 *      shareCode: // value for 'shareCode'
 *   },
 * });
 */
export function useSharedResumeQuery(baseOptions: Apollo.QueryHookOptions<Types.SharedResumeQuery, Types.SharedResumeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SharedResumeQuery, Types.SharedResumeQueryVariables>(SharedResumeDocument, options);
      }
export function useSharedResumeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SharedResumeQuery, Types.SharedResumeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SharedResumeQuery, Types.SharedResumeQueryVariables>(SharedResumeDocument, options);
        }
export function useSharedResumeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.SharedResumeQuery, Types.SharedResumeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.SharedResumeQuery, Types.SharedResumeQueryVariables>(SharedResumeDocument, options);
        }
export type SharedResumeQueryHookResult = ReturnType<typeof useSharedResumeQuery>;
export type SharedResumeLazyQueryHookResult = ReturnType<typeof useSharedResumeLazyQuery>;
export type SharedResumeSuspenseQueryHookResult = ReturnType<typeof useSharedResumeSuspenseQuery>;
export type SharedResumeQueryResult = Apollo.QueryResult<Types.SharedResumeQuery, Types.SharedResumeQueryVariables>;
export const TaskResourcesDocument = gql`
    query TaskResources($id: ID!) {
  task(id: $id) {
    name
    id
    teachingResources
    studentResources
    files {
      description
      displayName
      filename
      id
      step
      url
    }
    standard
  }
}
    `;

/**
 * __useTaskResourcesQuery__
 *
 * To run a query within a React component, call `useTaskResourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskResourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskResourcesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskResourcesQuery(baseOptions: Apollo.QueryHookOptions<Types.TaskResourcesQuery, Types.TaskResourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TaskResourcesQuery, Types.TaskResourcesQueryVariables>(TaskResourcesDocument, options);
      }
export function useTaskResourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TaskResourcesQuery, Types.TaskResourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TaskResourcesQuery, Types.TaskResourcesQueryVariables>(TaskResourcesDocument, options);
        }
export function useTaskResourcesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TaskResourcesQuery, Types.TaskResourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TaskResourcesQuery, Types.TaskResourcesQueryVariables>(TaskResourcesDocument, options);
        }
export type TaskResourcesQueryHookResult = ReturnType<typeof useTaskResourcesQuery>;
export type TaskResourcesLazyQueryHookResult = ReturnType<typeof useTaskResourcesLazyQuery>;
export type TaskResourcesSuspenseQueryHookResult = ReturnType<typeof useTaskResourcesSuspenseQuery>;
export type TaskResourcesQueryResult = Apollo.QueryResult<Types.TaskResourcesQuery, Types.TaskResourcesQueryVariables>;