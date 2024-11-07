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
export const CreateContactLinkDocument = gql`
    mutation CreateContactLink($input: CreateContactLinkMutationInput!) {
  createContactLink(input: $input) {
    contactLink {
      id
      value
      visible
      type
    }
  }
}
    `;
export type CreateContactLinkMutationFn = Apollo.MutationFunction<Types.CreateContactLinkMutation, Types.CreateContactLinkMutationVariables>;

/**
 * __useCreateContactLinkMutation__
 *
 * To run a mutation, you first call `useCreateContactLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContactLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContactLinkMutation, { data, loading, error }] = useCreateContactLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContactLinkMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateContactLinkMutation, Types.CreateContactLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateContactLinkMutation, Types.CreateContactLinkMutationVariables>(CreateContactLinkDocument, options);
      }
export type CreateContactLinkMutationHookResult = ReturnType<typeof useCreateContactLinkMutation>;
export type CreateContactLinkMutationResult = Apollo.MutationResult<Types.CreateContactLinkMutation>;
export type CreateContactLinkMutationOptions = Apollo.BaseMutationOptions<Types.CreateContactLinkMutation, Types.CreateContactLinkMutationVariables>;
export const CreatePortfolioProjectDocument = gql`
    mutation CreatePortfolioProject($input: CreatePortfolioProjectMutationInput!) {
  createPortfolioProject(input: $input) {
    portfolioProject {
      description
      id
      imageUrl
      resourceClass
      name
      parentName
      submission {
        files {
          filename
          googleWeblink
          source
          url
        }
        status
      }
    }
  }
}
    `;
export type CreatePortfolioProjectMutationFn = Apollo.MutationFunction<Types.CreatePortfolioProjectMutation, Types.CreatePortfolioProjectMutationVariables>;

/**
 * __useCreatePortfolioProjectMutation__
 *
 * To run a mutation, you first call `useCreatePortfolioProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePortfolioProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPortfolioProjectMutation, { data, loading, error }] = useCreatePortfolioProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePortfolioProjectMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreatePortfolioProjectMutation, Types.CreatePortfolioProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreatePortfolioProjectMutation, Types.CreatePortfolioProjectMutationVariables>(CreatePortfolioProjectDocument, options);
      }
export type CreatePortfolioProjectMutationHookResult = ReturnType<typeof useCreatePortfolioProjectMutation>;
export type CreatePortfolioProjectMutationResult = Apollo.MutationResult<Types.CreatePortfolioProjectMutation>;
export type CreatePortfolioProjectMutationOptions = Apollo.BaseMutationOptions<Types.CreatePortfolioProjectMutation, Types.CreatePortfolioProjectMutationVariables>;
export const CreatePortfolioProjectFileDocument = gql`
    mutation CreatePortfolioProjectFile($input: CreatePortfolioProjectFileMutationInput!) {
  createPortfolioProjectFile(input: $input) {
    portfolioProjectFile {
      filename
      googleWeblink
      source
      url
    }
  }
}
    `;
export type CreatePortfolioProjectFileMutationFn = Apollo.MutationFunction<Types.CreatePortfolioProjectFileMutation, Types.CreatePortfolioProjectFileMutationVariables>;

/**
 * __useCreatePortfolioProjectFileMutation__
 *
 * To run a mutation, you first call `useCreatePortfolioProjectFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePortfolioProjectFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPortfolioProjectFileMutation, { data, loading, error }] = useCreatePortfolioProjectFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePortfolioProjectFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreatePortfolioProjectFileMutation, Types.CreatePortfolioProjectFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreatePortfolioProjectFileMutation, Types.CreatePortfolioProjectFileMutationVariables>(CreatePortfolioProjectFileDocument, options);
      }
export type CreatePortfolioProjectFileMutationHookResult = ReturnType<typeof useCreatePortfolioProjectFileMutation>;
export type CreatePortfolioProjectFileMutationResult = Apollo.MutationResult<Types.CreatePortfolioProjectFileMutation>;
export type CreatePortfolioProjectFileMutationOptions = Apollo.BaseMutationOptions<Types.CreatePortfolioProjectFileMutation, Types.CreatePortfolioProjectFileMutationVariables>;
export const CreateStudentEvaluationCommentDocument = gql`
    mutation CreateStudentEvaluationComment($input: CreateEvaluationCommentMutationInput!) {
  createEvaluationComment(input: $input) {
    evaluation {
      comments {
        author {
          email
          firstName
          lastName
          username
          uuid
        }
        body
        createdAt
        statement {
          id
          name
        }
      }
      id
    }
  }
}
    `;
export type CreateStudentEvaluationCommentMutationFn = Apollo.MutationFunction<Types.CreateStudentEvaluationCommentMutation, Types.CreateStudentEvaluationCommentMutationVariables>;

/**
 * __useCreateStudentEvaluationCommentMutation__
 *
 * To run a mutation, you first call `useCreateStudentEvaluationCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudentEvaluationCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudentEvaluationCommentMutation, { data, loading, error }] = useCreateStudentEvaluationCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStudentEvaluationCommentMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateStudentEvaluationCommentMutation, Types.CreateStudentEvaluationCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateStudentEvaluationCommentMutation, Types.CreateStudentEvaluationCommentMutationVariables>(CreateStudentEvaluationCommentDocument, options);
      }
export type CreateStudentEvaluationCommentMutationHookResult = ReturnType<typeof useCreateStudentEvaluationCommentMutation>;
export type CreateStudentEvaluationCommentMutationResult = Apollo.MutationResult<Types.CreateStudentEvaluationCommentMutation>;
export type CreateStudentEvaluationCommentMutationOptions = Apollo.BaseMutationOptions<Types.CreateStudentEvaluationCommentMutation, Types.CreateStudentEvaluationCommentMutationVariables>;
export const DeleteContactLinkDocument = gql`
    mutation DeleteContactLink($input: DeleteContactLinkMutationInput!) {
  deleteContactLink(input: $input) {
    status
  }
}
    `;
export type DeleteContactLinkMutationFn = Apollo.MutationFunction<Types.DeleteContactLinkMutation, Types.DeleteContactLinkMutationVariables>;

/**
 * __useDeleteContactLinkMutation__
 *
 * To run a mutation, you first call `useDeleteContactLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContactLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContactLinkMutation, { data, loading, error }] = useDeleteContactLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteContactLinkMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteContactLinkMutation, Types.DeleteContactLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteContactLinkMutation, Types.DeleteContactLinkMutationVariables>(DeleteContactLinkDocument, options);
      }
export type DeleteContactLinkMutationHookResult = ReturnType<typeof useDeleteContactLinkMutation>;
export type DeleteContactLinkMutationResult = Apollo.MutationResult<Types.DeleteContactLinkMutation>;
export type DeleteContactLinkMutationOptions = Apollo.BaseMutationOptions<Types.DeleteContactLinkMutation, Types.DeleteContactLinkMutationVariables>;
export const DeletePortfolioProjectDocument = gql`
    mutation DeletePortfolioProject($input: DeletePortfolioProjectMutationInput!) {
  deletePortfolioProject(input: $input) {
    status
  }
}
    `;
export type DeletePortfolioProjectMutationFn = Apollo.MutationFunction<Types.DeletePortfolioProjectMutation, Types.DeletePortfolioProjectMutationVariables>;

/**
 * __useDeletePortfolioProjectMutation__
 *
 * To run a mutation, you first call `useDeletePortfolioProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePortfolioProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePortfolioProjectMutation, { data, loading, error }] = useDeletePortfolioProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePortfolioProjectMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeletePortfolioProjectMutation, Types.DeletePortfolioProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeletePortfolioProjectMutation, Types.DeletePortfolioProjectMutationVariables>(DeletePortfolioProjectDocument, options);
      }
export type DeletePortfolioProjectMutationHookResult = ReturnType<typeof useDeletePortfolioProjectMutation>;
export type DeletePortfolioProjectMutationResult = Apollo.MutationResult<Types.DeletePortfolioProjectMutation>;
export type DeletePortfolioProjectMutationOptions = Apollo.BaseMutationOptions<Types.DeletePortfolioProjectMutation, Types.DeletePortfolioProjectMutationVariables>;
export const DeletePortfolioProjectFileDocument = gql`
    mutation DeletePortfolioProjectFile($input: DeletePortfolioProjectFileMutationInput!) {
  deletePortfolioProjectFile(input: $input) {
    status
  }
}
    `;
export type DeletePortfolioProjectFileMutationFn = Apollo.MutationFunction<Types.DeletePortfolioProjectFileMutation, Types.DeletePortfolioProjectFileMutationVariables>;

/**
 * __useDeletePortfolioProjectFileMutation__
 *
 * To run a mutation, you first call `useDeletePortfolioProjectFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePortfolioProjectFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePortfolioProjectFileMutation, { data, loading, error }] = useDeletePortfolioProjectFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePortfolioProjectFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeletePortfolioProjectFileMutation, Types.DeletePortfolioProjectFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeletePortfolioProjectFileMutation, Types.DeletePortfolioProjectFileMutationVariables>(DeletePortfolioProjectFileDocument, options);
      }
export type DeletePortfolioProjectFileMutationHookResult = ReturnType<typeof useDeletePortfolioProjectFileMutation>;
export type DeletePortfolioProjectFileMutationResult = Apollo.MutationResult<Types.DeletePortfolioProjectFileMutation>;
export type DeletePortfolioProjectFileMutationOptions = Apollo.BaseMutationOptions<Types.DeletePortfolioProjectFileMutation, Types.DeletePortfolioProjectFileMutationVariables>;
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
export const MarkAllNotificationsAsReadDocument = gql`
    mutation MarkAllNotificationsAsRead($input: MarkAllNotificationsAsReadMutationInput!) {
  markAllNotificationsAsRead(input: $input) {
    status
  }
}
    `;
export type MarkAllNotificationsAsReadMutationFn = Apollo.MutationFunction<Types.MarkAllNotificationsAsReadMutation, Types.MarkAllNotificationsAsReadMutationVariables>;

/**
 * __useMarkAllNotificationsAsReadMutation__
 *
 * To run a mutation, you first call `useMarkAllNotificationsAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAllNotificationsAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAllNotificationsAsReadMutation, { data, loading, error }] = useMarkAllNotificationsAsReadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarkAllNotificationsAsReadMutation(baseOptions?: Apollo.MutationHookOptions<Types.MarkAllNotificationsAsReadMutation, Types.MarkAllNotificationsAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.MarkAllNotificationsAsReadMutation, Types.MarkAllNotificationsAsReadMutationVariables>(MarkAllNotificationsAsReadDocument, options);
      }
export type MarkAllNotificationsAsReadMutationHookResult = ReturnType<typeof useMarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationResult = Apollo.MutationResult<Types.MarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationOptions = Apollo.BaseMutationOptions<Types.MarkAllNotificationsAsReadMutation, Types.MarkAllNotificationsAsReadMutationVariables>;
export const UpdateContactLinkDocument = gql`
    mutation UpdateContactLink($input: UpdateContactLinkMutationInput!) {
  updateContactLink(input: $input) {
    contactLink {
      id
      value
      visible
      type
    }
  }
}
    `;
export type UpdateContactLinkMutationFn = Apollo.MutationFunction<Types.UpdateContactLinkMutation, Types.UpdateContactLinkMutationVariables>;

/**
 * __useUpdateContactLinkMutation__
 *
 * To run a mutation, you first call `useUpdateContactLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContactLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContactLinkMutation, { data, loading, error }] = useUpdateContactLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateContactLinkMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateContactLinkMutation, Types.UpdateContactLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateContactLinkMutation, Types.UpdateContactLinkMutationVariables>(UpdateContactLinkDocument, options);
      }
export type UpdateContactLinkMutationHookResult = ReturnType<typeof useUpdateContactLinkMutation>;
export type UpdateContactLinkMutationResult = Apollo.MutationResult<Types.UpdateContactLinkMutation>;
export type UpdateContactLinkMutationOptions = Apollo.BaseMutationOptions<Types.UpdateContactLinkMutation, Types.UpdateContactLinkMutationVariables>;
export const UpdatePortfolioProjectDocument = gql`
    mutation UpdatePortfolioProject($input: UpdatePortfolioProjectMutationInput!) {
  updatePortfolioProject(input: $input) {
    portfolioProject {
      description
      id
      imageUrl
      name
      resourceClass
      parentName
      submission {
        files {
          filename
          googleWeblink
          source
          url
        }
        status
      }
    }
  }
}
    `;
export type UpdatePortfolioProjectMutationFn = Apollo.MutationFunction<Types.UpdatePortfolioProjectMutation, Types.UpdatePortfolioProjectMutationVariables>;

/**
 * __useUpdatePortfolioProjectMutation__
 *
 * To run a mutation, you first call `useUpdatePortfolioProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePortfolioProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePortfolioProjectMutation, { data, loading, error }] = useUpdatePortfolioProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePortfolioProjectMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdatePortfolioProjectMutation, Types.UpdatePortfolioProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdatePortfolioProjectMutation, Types.UpdatePortfolioProjectMutationVariables>(UpdatePortfolioProjectDocument, options);
      }
export type UpdatePortfolioProjectMutationHookResult = ReturnType<typeof useUpdatePortfolioProjectMutation>;
export type UpdatePortfolioProjectMutationResult = Apollo.MutationResult<Types.UpdatePortfolioProjectMutation>;
export type UpdatePortfolioProjectMutationOptions = Apollo.BaseMutationOptions<Types.UpdatePortfolioProjectMutation, Types.UpdatePortfolioProjectMutationVariables>;
export const UpdateResumeDocument = gql`
    mutation UpdateResume($input: UpdateResumeMutationInput!) {
  updateResume(input: $input) {
    resume {
      id
      name
      bio
      avatarUrl
      highlightedProjectsEnabled
      sharedUrlEnabled
      sharedUrl
      contactLinks {
        id
        value
        visible
        type
      }
      experiences {
        id
        name
        description
        startedAt
        endedAt
        visible
      }
      extraCurriculars {
        id
        name
        description
        startedAt
        endedAt
        visible
      }
      educations {
        id
        name
        description
        startedAt
        endedAt
        visible
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
            createdAt
            filename
            googleWeblink
            id
            source
            url
          }
          status
        }
        thumbnailUrl
        type
      }
      badges {
        id
        imageUrl
        name
        isHighlighted
        resource {
          id
          name
        }
      }
      highlightedBadges {
        id
        description
        imageUrl
        name
        isHighlighted
        resource {
          id
          name
        }
      }
    }
  }
}
    `;
export type UpdateResumeMutationFn = Apollo.MutationFunction<Types.UpdateResumeMutation, Types.UpdateResumeMutationVariables>;

/**
 * __useUpdateResumeMutation__
 *
 * To run a mutation, you first call `useUpdateResumeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateResumeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateResumeMutation, { data, loading, error }] = useUpdateResumeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateResumeMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateResumeMutation, Types.UpdateResumeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateResumeMutation, Types.UpdateResumeMutationVariables>(UpdateResumeDocument, options);
      }
export type UpdateResumeMutationHookResult = ReturnType<typeof useUpdateResumeMutation>;
export type UpdateResumeMutationResult = Apollo.MutationResult<Types.UpdateResumeMutation>;
export type UpdateResumeMutationOptions = Apollo.BaseMutationOptions<Types.UpdateResumeMutation, Types.UpdateResumeMutationVariables>;
export const CareerExperienceDocument = gql`
    query careerExperience($id: ID!) {
  portfolio {
    studentId
    careerExperience(id: $id) {
      submissions {
        service
        submissionName
        contextName
        submittedAt
        isTeamSubmission
      }
    }
  }
}
    `;

/**
 * __useCareerExperienceQuery__
 *
 * To run a query within a React component, call `useCareerExperienceQuery` and pass it any options that fit your needs.
 * When your component renders, `useCareerExperienceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCareerExperienceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCareerExperienceQuery(baseOptions: Apollo.QueryHookOptions<Types.CareerExperienceQuery, Types.CareerExperienceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CareerExperienceQuery, Types.CareerExperienceQueryVariables>(CareerExperienceDocument, options);
      }
export function useCareerExperienceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CareerExperienceQuery, Types.CareerExperienceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CareerExperienceQuery, Types.CareerExperienceQueryVariables>(CareerExperienceDocument, options);
        }
export function useCareerExperienceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CareerExperienceQuery, Types.CareerExperienceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CareerExperienceQuery, Types.CareerExperienceQueryVariables>(CareerExperienceDocument, options);
        }
export type CareerExperienceQueryHookResult = ReturnType<typeof useCareerExperienceQuery>;
export type CareerExperienceLazyQueryHookResult = ReturnType<typeof useCareerExperienceLazyQuery>;
export type CareerExperienceSuspenseQueryHookResult = ReturnType<typeof useCareerExperienceSuspenseQuery>;
export type CareerExperienceQueryResult = Apollo.QueryResult<Types.CareerExperienceQuery, Types.CareerExperienceQueryVariables>;
export const CareerExperiencesDocument = gql`
    query careerExperiences {
  portfolio {
    studentId
    careerExperiences {
      clusterId
      clusterName
      submissionsCount
    }
  }
}
    `;

/**
 * __useCareerExperiencesQuery__
 *
 * To run a query within a React component, call `useCareerExperiencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCareerExperiencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCareerExperiencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCareerExperiencesQuery(baseOptions?: Apollo.QueryHookOptions<Types.CareerExperiencesQuery, Types.CareerExperiencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CareerExperiencesQuery, Types.CareerExperiencesQueryVariables>(CareerExperiencesDocument, options);
      }
export function useCareerExperiencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CareerExperiencesQuery, Types.CareerExperiencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CareerExperiencesQuery, Types.CareerExperiencesQueryVariables>(CareerExperiencesDocument, options);
        }
export function useCareerExperiencesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CareerExperiencesQuery, Types.CareerExperiencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CareerExperiencesQuery, Types.CareerExperiencesQueryVariables>(CareerExperiencesDocument, options);
        }
export type CareerExperiencesQueryHookResult = ReturnType<typeof useCareerExperiencesQuery>;
export type CareerExperiencesLazyQueryHookResult = ReturnType<typeof useCareerExperiencesLazyQuery>;
export type CareerExperiencesSuspenseQueryHookResult = ReturnType<typeof useCareerExperiencesSuspenseQuery>;
export type CareerExperiencesQueryResult = Apollo.QueryResult<Types.CareerExperiencesQuery, Types.CareerExperiencesQueryVariables>;
export const PlanWithEvaluationDocument = gql`
    query PlanWithEvaluation($id: ID!) {
  plan(id: $id) {
    description
    evaluation {
      id
    }
    groups {
      description
      displayName
      id
      name
      statements {
        id
        evidences {
          contextType
          label
          rubricScores {
            currentScore
            maxScore
            label
          }
          service
          type
          updatedAt
          isTeamSubmission
          id
          itemId
        }
        name
        step
        isLocked
        isRequired
        question {
          id
          text
          questionType
          options {
            option
            id
          }
          answer {
            id
            answer
          }
        }
        results {
          createdAt
          evaluator {
            firstName
            lastName
            uuid
          }
          result
        }
        comments {
          createdAt
          author {
            firstName
            lastName
            uuid
          }
          body
        }
      }
      step
    }
    id
    name
    progress {
      completed
      total
    }
  }
}
    `;

/**
 * __usePlanWithEvaluationQuery__
 *
 * To run a query within a React component, call `usePlanWithEvaluationQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanWithEvaluationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanWithEvaluationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlanWithEvaluationQuery(baseOptions: Apollo.QueryHookOptions<Types.PlanWithEvaluationQuery, Types.PlanWithEvaluationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PlanWithEvaluationQuery, Types.PlanWithEvaluationQueryVariables>(PlanWithEvaluationDocument, options);
      }
export function usePlanWithEvaluationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PlanWithEvaluationQuery, Types.PlanWithEvaluationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PlanWithEvaluationQuery, Types.PlanWithEvaluationQueryVariables>(PlanWithEvaluationDocument, options);
        }
export function usePlanWithEvaluationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PlanWithEvaluationQuery, Types.PlanWithEvaluationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PlanWithEvaluationQuery, Types.PlanWithEvaluationQueryVariables>(PlanWithEvaluationDocument, options);
        }
export type PlanWithEvaluationQueryHookResult = ReturnType<typeof usePlanWithEvaluationQuery>;
export type PlanWithEvaluationLazyQueryHookResult = ReturnType<typeof usePlanWithEvaluationLazyQuery>;
export type PlanWithEvaluationSuspenseQueryHookResult = ReturnType<typeof usePlanWithEvaluationSuspenseQuery>;
export type PlanWithEvaluationQueryResult = Apollo.QueryResult<Types.PlanWithEvaluationQuery, Types.PlanWithEvaluationQueryVariables>;
export const PortfolioPlansDocument = gql`
    query PortfolioPlans {
  portfolio {
    plans {
      id
      name
      evaluation {
        id
      }
    }
    studentId
  }
}
    `;

/**
 * __usePortfolioPlansQuery__
 *
 * To run a query within a React component, call `usePortfolioPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfolioPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfolioPlansQuery({
 *   variables: {
 *   },
 * });
 */
export function usePortfolioPlansQuery(baseOptions?: Apollo.QueryHookOptions<Types.PortfolioPlansQuery, Types.PortfolioPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PortfolioPlansQuery, Types.PortfolioPlansQueryVariables>(PortfolioPlansDocument, options);
      }
export function usePortfolioPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PortfolioPlansQuery, Types.PortfolioPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PortfolioPlansQuery, Types.PortfolioPlansQueryVariables>(PortfolioPlansDocument, options);
        }
export function usePortfolioPlansSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PortfolioPlansQuery, Types.PortfolioPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PortfolioPlansQuery, Types.PortfolioPlansQueryVariables>(PortfolioPlansDocument, options);
        }
export type PortfolioPlansQueryHookResult = ReturnType<typeof usePortfolioPlansQuery>;
export type PortfolioPlansLazyQueryHookResult = ReturnType<typeof usePortfolioPlansLazyQuery>;
export type PortfolioPlansSuspenseQueryHookResult = ReturnType<typeof usePortfolioPlansSuspenseQuery>;
export type PortfolioPlansQueryResult = Apollo.QueryResult<Types.PortfolioPlansQuery, Types.PortfolioPlansQueryVariables>;
export const PortfolioProjectsDocument = gql`
    query PortfolioProjects($type: PortfolioKind!, $first: Int, $after: String) {
  portfolio {
    projects(type: $type, first: $first, after: $after) {
      edges {
        cursor
        node {
          description
          id
          name
          imageUrl
          parentName
          isTeamSubmission
          resourceClass
          submission {
            files {
              isOwner
              id
              filename
              googleWeblink
              source
              url
              createdAt
              submitter {
                firstName
                lastName
                uuid
              }
            }
            status
          }
          finishedAt
          type
          thumbnailUrl
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
    studentId
  }
}
    `;

/**
 * __usePortfolioProjectsQuery__
 *
 * To run a query within a React component, call `usePortfolioProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfolioProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfolioProjectsQuery({
 *   variables: {
 *      type: // value for 'type'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function usePortfolioProjectsQuery(baseOptions: Apollo.QueryHookOptions<Types.PortfolioProjectsQuery, Types.PortfolioProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PortfolioProjectsQuery, Types.PortfolioProjectsQueryVariables>(PortfolioProjectsDocument, options);
      }
export function usePortfolioProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PortfolioProjectsQuery, Types.PortfolioProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PortfolioProjectsQuery, Types.PortfolioProjectsQueryVariables>(PortfolioProjectsDocument, options);
        }
export function usePortfolioProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PortfolioProjectsQuery, Types.PortfolioProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PortfolioProjectsQuery, Types.PortfolioProjectsQueryVariables>(PortfolioProjectsDocument, options);
        }
export type PortfolioProjectsQueryHookResult = ReturnType<typeof usePortfolioProjectsQuery>;
export type PortfolioProjectsLazyQueryHookResult = ReturnType<typeof usePortfolioProjectsLazyQuery>;
export type PortfolioProjectsSuspenseQueryHookResult = ReturnType<typeof usePortfolioProjectsSuspenseQuery>;
export type PortfolioProjectsQueryResult = Apollo.QueryResult<Types.PortfolioProjectsQuery, Types.PortfolioProjectsQueryVariables>;
export const PortfolioResumesDocument = gql`
    query PortfolioResumes {
  portfolio {
    sharedResume {
      avatarUrl
      bio
      contactLinks {
        id
        type
        value
        visible
      }
      experiences {
        description
        endedAt
        id
        name
        startedAt
        visible
      }
      educations {
        description
        endedAt
        id
        name
        startedAt
        visible
      }
      extraCurriculars {
        description
        endedAt
        id
        name
        startedAt
        visible
      }
      externalResumes {
        filename
        id
        url(options: {responseContentDisposition: "attachment"})
      }
      dcProjects: projects(type: CAREERS) {
        nodes {
          description
          id
          imageUrl
          name
          isTeamSubmission
          parentName
          submission {
            status
            files {
              isOwner
              id
              filename
              submitter {
                firstName
                fullName
                lastName
                uuid
              }
            }
          }
          finishedAt
          thumbnailUrl
          type
          isHighlighted
          resourceClass
        }
      }
      dlProjects: projects(type: PBL) {
        nodes {
          description
          id
          imageUrl
          name
          isTeamSubmission
          parentName
          submission {
            status
            files {
              id
              isOwner
              filename
              submitter {
                firstName
                fullName
                lastName
                uuid
              }
            }
          }
          finishedAt
          thumbnailUrl
          type
          isHighlighted
          resourceClass
        }
      }
      personalProjects: projects(type: PERSONAL) {
        nodes {
          description
          id
          imageUrl
          name
          isTeamSubmission
          parentName
          submission {
            status
            files {
              isOwner
              id
              filename
              submitter {
                firstName
                fullName
                lastName
                uuid
              }
            }
          }
          finishedAt
          thumbnailUrl
          type
          isHighlighted
          resourceClass
        }
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
              uuid
            }
            url
          }
          status
        }
        thumbnailUrl
        type
      }
      badges {
        id
        description
        imageUrl
        isHighlighted
        name
        resource {
          id
          name
        }
      }
      highlightedBadges {
        id
        description
        imageUrl
        isHighlighted
        name
        resource {
          id
          name
        }
      }
      highlightedProjectsEnabled
      id
      name
      sharedUrl
      sharedUrlEnabled
    }
    studentId
  }
}
    `;

/**
 * __usePortfolioResumesQuery__
 *
 * To run a query within a React component, call `usePortfolioResumesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePortfolioResumesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePortfolioResumesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePortfolioResumesQuery(baseOptions?: Apollo.QueryHookOptions<Types.PortfolioResumesQuery, Types.PortfolioResumesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PortfolioResumesQuery, Types.PortfolioResumesQueryVariables>(PortfolioResumesDocument, options);
      }
export function usePortfolioResumesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PortfolioResumesQuery, Types.PortfolioResumesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PortfolioResumesQuery, Types.PortfolioResumesQueryVariables>(PortfolioResumesDocument, options);
        }
export function usePortfolioResumesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PortfolioResumesQuery, Types.PortfolioResumesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PortfolioResumesQuery, Types.PortfolioResumesQueryVariables>(PortfolioResumesDocument, options);
        }
export type PortfolioResumesQueryHookResult = ReturnType<typeof usePortfolioResumesQuery>;
export type PortfolioResumesLazyQueryHookResult = ReturnType<typeof usePortfolioResumesLazyQuery>;
export type PortfolioResumesSuspenseQueryHookResult = ReturnType<typeof usePortfolioResumesSuspenseQuery>;
export type PortfolioResumesQueryResult = Apollo.QueryResult<Types.PortfolioResumesQuery, Types.PortfolioResumesQueryVariables>;
export const SharedResumeDocument = gql`
    query SharedResume($shareCode: String!) {
  sharedResume(shareCode: $shareCode) {
    avatarUrl
    bio
    contactLinks {
      id
      type
      value
      visible
    }
    educations {
      description
      endedAt
      id
      name
      startedAt
      type
      visible
    }
    experiences {
      description
      endedAt
      id
      name
      startedAt
      type
      visible
    }
    extraCurriculars {
      description
      endedAt
      id
      name
      startedAt
      type
      visible
    }
    externalResumes {
      id
      url(options: {responseContentDisposition: "attachment"})
      filename
    }
    highlightedProjects {
      description
      finishedAt
      id
      imageUrl
      isHighlighted
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
            uuid
          }
          url
        }
        status
      }
      submittedAt
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
    id
    name
    shareCode
    sharedUrl
    sharedUrlEnabled
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
export const StudentReportByStudentDocument = gql`
    query StudentReportByStudent($planId: ID!) {
  studentReport(planId: $planId) {
    overallData {
      completed
      inProgress
      notStarted
      studentFullName
      planName
      notMet
    }
    plan {
      ...PlanForStudentReport
    }
    goalPerformanceIndicatorsData {
      ...GoalPerformanceIndicatorsData
    }
  }
}
    ${PlanForStudentReportFragmentDoc}
${GoalPerformanceIndicatorsDataFragmentDoc}`;

/**
 * __useStudentReportByStudentQuery__
 *
 * To run a query within a React component, call `useStudentReportByStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentReportByStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentReportByStudentQuery({
 *   variables: {
 *      planId: // value for 'planId'
 *   },
 * });
 */
export function useStudentReportByStudentQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentReportByStudentQuery, Types.StudentReportByStudentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentReportByStudentQuery, Types.StudentReportByStudentQueryVariables>(StudentReportByStudentDocument, options);
      }
export function useStudentReportByStudentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentReportByStudentQuery, Types.StudentReportByStudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentReportByStudentQuery, Types.StudentReportByStudentQueryVariables>(StudentReportByStudentDocument, options);
        }
export function useStudentReportByStudentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentReportByStudentQuery, Types.StudentReportByStudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentReportByStudentQuery, Types.StudentReportByStudentQueryVariables>(StudentReportByStudentDocument, options);
        }
export type StudentReportByStudentQueryHookResult = ReturnType<typeof useStudentReportByStudentQuery>;
export type StudentReportByStudentLazyQueryHookResult = ReturnType<typeof useStudentReportByStudentLazyQuery>;
export type StudentReportByStudentSuspenseQueryHookResult = ReturnType<typeof useStudentReportByStudentSuspenseQuery>;
export type StudentReportByStudentQueryResult = Apollo.QueryResult<Types.StudentReportByStudentQuery, Types.StudentReportByStudentQueryVariables>;