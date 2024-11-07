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
export const PlanFragmentDoc = gql`
    fragment Plan on Plan {
  id
  groups {
    id
    statements {
      id
      isLocked
    }
  }
}
    `;
export const AlignPlanGroupStatementToRubricHeadingDocument = gql`
    mutation alignPlanGroupStatementToRubricHeading($input: AlignPlanGroupStatementToRubricHeadingMutationInput!, $rubricHeadingId: ID!) {
  alignPlanGroupStatementToRubricHeading(input: $input) {
    rubricHeading {
      id
      name
      plans {
        id
        name
      }
      uuid
      rubric {
        id
        displayName
        headings {
          plans {
            id
            name
            groups {
              statements {
                id
                name
                isAligned(rubricHeadingId: $rubricHeadingId)
              }
            }
          }
        }
      }
    }
  }
}
    `;
export type AlignPlanGroupStatementToRubricHeadingMutationFn = Apollo.MutationFunction<Types.AlignPlanGroupStatementToRubricHeadingMutation, Types.AlignPlanGroupStatementToRubricHeadingMutationVariables>;

/**
 * __useAlignPlanGroupStatementToRubricHeadingMutation__
 *
 * To run a mutation, you first call `useAlignPlanGroupStatementToRubricHeadingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAlignPlanGroupStatementToRubricHeadingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [alignPlanGroupStatementToRubricHeadingMutation, { data, loading, error }] = useAlignPlanGroupStatementToRubricHeadingMutation({
 *   variables: {
 *      input: // value for 'input'
 *      rubricHeadingId: // value for 'rubricHeadingId'
 *   },
 * });
 */
export function useAlignPlanGroupStatementToRubricHeadingMutation(baseOptions?: Apollo.MutationHookOptions<Types.AlignPlanGroupStatementToRubricHeadingMutation, Types.AlignPlanGroupStatementToRubricHeadingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AlignPlanGroupStatementToRubricHeadingMutation, Types.AlignPlanGroupStatementToRubricHeadingMutationVariables>(AlignPlanGroupStatementToRubricHeadingDocument, options);
      }
export type AlignPlanGroupStatementToRubricHeadingMutationHookResult = ReturnType<typeof useAlignPlanGroupStatementToRubricHeadingMutation>;
export type AlignPlanGroupStatementToRubricHeadingMutationResult = Apollo.MutationResult<Types.AlignPlanGroupStatementToRubricHeadingMutation>;
export type AlignPlanGroupStatementToRubricHeadingMutationOptions = Apollo.BaseMutationOptions<Types.AlignPlanGroupStatementToRubricHeadingMutation, Types.AlignPlanGroupStatementToRubricHeadingMutationVariables>;
export const CreateEvaluationDocument = gql`
    mutation CreateEvaluation($input: CreateEvaluationMutationInput!) {
  createEvaluation(input: $input) {
    evaluation {
      id
      results {
        createdAt
        evaluator {
          email
          firstName
          lastName
          username
          uuid
        }
        result
        statement {
          id
          isLocked
          name
          step
        }
      }
    }
  }
}
    `;
export type CreateEvaluationMutationFn = Apollo.MutationFunction<Types.CreateEvaluationMutation, Types.CreateEvaluationMutationVariables>;

/**
 * __useCreateEvaluationMutation__
 *
 * To run a mutation, you first call `useCreateEvaluationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEvaluationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEvaluationMutation, { data, loading, error }] = useCreateEvaluationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEvaluationMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateEvaluationMutation, Types.CreateEvaluationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateEvaluationMutation, Types.CreateEvaluationMutationVariables>(CreateEvaluationDocument, options);
      }
export type CreateEvaluationMutationHookResult = ReturnType<typeof useCreateEvaluationMutation>;
export type CreateEvaluationMutationResult = Apollo.MutationResult<Types.CreateEvaluationMutation>;
export type CreateEvaluationMutationOptions = Apollo.BaseMutationOptions<Types.CreateEvaluationMutation, Types.CreateEvaluationMutationVariables>;
export const CreateRubricCriteriaDocument = gql`
    mutation CreateRubricCriteria($input: CreateRubricCriteriaMutationInput!) {
  createRubricCriteria(input: $input) {
    rubricCriteria {
      id
      rubricCriteriaLabelId
      rubricHeadingId
      text
    }
  }
}
    `;
export type CreateRubricCriteriaMutationFn = Apollo.MutationFunction<Types.CreateRubricCriteriaMutation, Types.CreateRubricCriteriaMutationVariables>;

/**
 * __useCreateRubricCriteriaMutation__
 *
 * To run a mutation, you first call `useCreateRubricCriteriaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRubricCriteriaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRubricCriteriaMutation, { data, loading, error }] = useCreateRubricCriteriaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRubricCriteriaMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateRubricCriteriaMutation, Types.CreateRubricCriteriaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateRubricCriteriaMutation, Types.CreateRubricCriteriaMutationVariables>(CreateRubricCriteriaDocument, options);
      }
export type CreateRubricCriteriaMutationHookResult = ReturnType<typeof useCreateRubricCriteriaMutation>;
export type CreateRubricCriteriaMutationResult = Apollo.MutationResult<Types.CreateRubricCriteriaMutation>;
export type CreateRubricCriteriaMutationOptions = Apollo.BaseMutationOptions<Types.CreateRubricCriteriaMutation, Types.CreateRubricCriteriaMutationVariables>;
export const CreateRubricCriteriaLabelDocument = gql`
    mutation CreateRubricCriteriaLabel($input: CreateRubricCriteriaLabelMutationInput!) {
  createRubricCriteriaLabel(input: $input) {
    rubricCriteriaLabel {
      displayName
      id
      score
    }
  }
}
    `;
export type CreateRubricCriteriaLabelMutationFn = Apollo.MutationFunction<Types.CreateRubricCriteriaLabelMutation, Types.CreateRubricCriteriaLabelMutationVariables>;

/**
 * __useCreateRubricCriteriaLabelMutation__
 *
 * To run a mutation, you first call `useCreateRubricCriteriaLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRubricCriteriaLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRubricCriteriaLabelMutation, { data, loading, error }] = useCreateRubricCriteriaLabelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRubricCriteriaLabelMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateRubricCriteriaLabelMutation, Types.CreateRubricCriteriaLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateRubricCriteriaLabelMutation, Types.CreateRubricCriteriaLabelMutationVariables>(CreateRubricCriteriaLabelDocument, options);
      }
export type CreateRubricCriteriaLabelMutationHookResult = ReturnType<typeof useCreateRubricCriteriaLabelMutation>;
export type CreateRubricCriteriaLabelMutationResult = Apollo.MutationResult<Types.CreateRubricCriteriaLabelMutation>;
export type CreateRubricCriteriaLabelMutationOptions = Apollo.BaseMutationOptions<Types.CreateRubricCriteriaLabelMutation, Types.CreateRubricCriteriaLabelMutationVariables>;
export const CreateRubricHeadingDocument = gql`
    mutation CreateRubricHeading($input: CreateRubricHeadingMutationInput!) {
  createRubricHeading(input: $input) {
    rubricHeading {
      id
      multiplier
      name
    }
  }
}
    `;
export type CreateRubricHeadingMutationFn = Apollo.MutationFunction<Types.CreateRubricHeadingMutation, Types.CreateRubricHeadingMutationVariables>;

/**
 * __useCreateRubricHeadingMutation__
 *
 * To run a mutation, you first call `useCreateRubricHeadingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRubricHeadingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRubricHeadingMutation, { data, loading, error }] = useCreateRubricHeadingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRubricHeadingMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateRubricHeadingMutation, Types.CreateRubricHeadingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateRubricHeadingMutation, Types.CreateRubricHeadingMutationVariables>(CreateRubricHeadingDocument, options);
      }
export type CreateRubricHeadingMutationHookResult = ReturnType<typeof useCreateRubricHeadingMutation>;
export type CreateRubricHeadingMutationResult = Apollo.MutationResult<Types.CreateRubricHeadingMutation>;
export type CreateRubricHeadingMutationOptions = Apollo.BaseMutationOptions<Types.CreateRubricHeadingMutation, Types.CreateRubricHeadingMutationVariables>;
export const CreateUserEvaluationCommentDocument = gql`
    mutation CreateUserEvaluationComment($input: CreateEvaluationCommentMutationInput!) {
  createEvaluationComment(input: $input) {
    evaluation {
      comments {
        author {
          firstName
          lastName
          uuid
        }
        body
        createdAt
        statement {
          id
        }
      }
      id
    }
  }
}
    `;
export type CreateUserEvaluationCommentMutationFn = Apollo.MutationFunction<Types.CreateUserEvaluationCommentMutation, Types.CreateUserEvaluationCommentMutationVariables>;

/**
 * __useCreateUserEvaluationCommentMutation__
 *
 * To run a mutation, you first call `useCreateUserEvaluationCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserEvaluationCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserEvaluationCommentMutation, { data, loading, error }] = useCreateUserEvaluationCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserEvaluationCommentMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateUserEvaluationCommentMutation, Types.CreateUserEvaluationCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateUserEvaluationCommentMutation, Types.CreateUserEvaluationCommentMutationVariables>(CreateUserEvaluationCommentDocument, options);
      }
export type CreateUserEvaluationCommentMutationHookResult = ReturnType<typeof useCreateUserEvaluationCommentMutation>;
export type CreateUserEvaluationCommentMutationResult = Apollo.MutationResult<Types.CreateUserEvaluationCommentMutation>;
export type CreateUserEvaluationCommentMutationOptions = Apollo.BaseMutationOptions<Types.CreateUserEvaluationCommentMutation, Types.CreateUserEvaluationCommentMutationVariables>;
export const DeletePublicResourcesDocument = gql`
    mutation DeletePublicResources($input: DeletePublicResourcesMutationInput!) {
  deletePublicResources(input: $input) {
    status
  }
}
    `;
export type DeletePublicResourcesMutationFn = Apollo.MutationFunction<Types.DeletePublicResourcesMutation, Types.DeletePublicResourcesMutationVariables>;

/**
 * __useDeletePublicResourcesMutation__
 *
 * To run a mutation, you first call `useDeletePublicResourcesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePublicResourcesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePublicResourcesMutation, { data, loading, error }] = useDeletePublicResourcesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePublicResourcesMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeletePublicResourcesMutation, Types.DeletePublicResourcesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeletePublicResourcesMutation, Types.DeletePublicResourcesMutationVariables>(DeletePublicResourcesDocument, options);
      }
export type DeletePublicResourcesMutationHookResult = ReturnType<typeof useDeletePublicResourcesMutation>;
export type DeletePublicResourcesMutationResult = Apollo.MutationResult<Types.DeletePublicResourcesMutation>;
export type DeletePublicResourcesMutationOptions = Apollo.BaseMutationOptions<Types.DeletePublicResourcesMutation, Types.DeletePublicResourcesMutationVariables>;
export const DeleteRubricCriteriaLabelDocument = gql`
    mutation DeleteRubricCriteriaLabel($input: DeleteRubricCriteriaLabelMutationInput!) {
  deleteRubricCriteriaLabel(input: $input) {
    status
  }
}
    `;
export type DeleteRubricCriteriaLabelMutationFn = Apollo.MutationFunction<Types.DeleteRubricCriteriaLabelMutation, Types.DeleteRubricCriteriaLabelMutationVariables>;

/**
 * __useDeleteRubricCriteriaLabelMutation__
 *
 * To run a mutation, you first call `useDeleteRubricCriteriaLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRubricCriteriaLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRubricCriteriaLabelMutation, { data, loading, error }] = useDeleteRubricCriteriaLabelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteRubricCriteriaLabelMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteRubricCriteriaLabelMutation, Types.DeleteRubricCriteriaLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteRubricCriteriaLabelMutation, Types.DeleteRubricCriteriaLabelMutationVariables>(DeleteRubricCriteriaLabelDocument, options);
      }
export type DeleteRubricCriteriaLabelMutationHookResult = ReturnType<typeof useDeleteRubricCriteriaLabelMutation>;
export type DeleteRubricCriteriaLabelMutationResult = Apollo.MutationResult<Types.DeleteRubricCriteriaLabelMutation>;
export type DeleteRubricCriteriaLabelMutationOptions = Apollo.BaseMutationOptions<Types.DeleteRubricCriteriaLabelMutation, Types.DeleteRubricCriteriaLabelMutationVariables>;
export const DeleteRubricHeadingDocument = gql`
    mutation DeleteRubricHeading($input: DeleteRubricHeadingMutationInput!) {
  deleteRubricHeading(input: $input) {
    status
  }
}
    `;
export type DeleteRubricHeadingMutationFn = Apollo.MutationFunction<Types.DeleteRubricHeadingMutation, Types.DeleteRubricHeadingMutationVariables>;

/**
 * __useDeleteRubricHeadingMutation__
 *
 * To run a mutation, you first call `useDeleteRubricHeadingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRubricHeadingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRubricHeadingMutation, { data, loading, error }] = useDeleteRubricHeadingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteRubricHeadingMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteRubricHeadingMutation, Types.DeleteRubricHeadingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteRubricHeadingMutation, Types.DeleteRubricHeadingMutationVariables>(DeleteRubricHeadingDocument, options);
      }
export type DeleteRubricHeadingMutationHookResult = ReturnType<typeof useDeleteRubricHeadingMutation>;
export type DeleteRubricHeadingMutationResult = Apollo.MutationResult<Types.DeleteRubricHeadingMutation>;
export type DeleteRubricHeadingMutationOptions = Apollo.BaseMutationOptions<Types.DeleteRubricHeadingMutation, Types.DeleteRubricHeadingMutationVariables>;
export const DeleteTaskFileDocument = gql`
    mutation DeleteTaskFile($input: DeleteTaskFileMutationInput!) {
  deleteTaskFile(input: $input) {
    status
  }
}
    `;
export type DeleteTaskFileMutationFn = Apollo.MutationFunction<Types.DeleteTaskFileMutation, Types.DeleteTaskFileMutationVariables>;

/**
 * __useDeleteTaskFileMutation__
 *
 * To run a mutation, you first call `useDeleteTaskFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskFileMutation, { data, loading, error }] = useDeleteTaskFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTaskFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteTaskFileMutation, Types.DeleteTaskFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteTaskFileMutation, Types.DeleteTaskFileMutationVariables>(DeleteTaskFileDocument, options);
      }
export type DeleteTaskFileMutationHookResult = ReturnType<typeof useDeleteTaskFileMutation>;
export type DeleteTaskFileMutationResult = Apollo.MutationResult<Types.DeleteTaskFileMutation>;
export type DeleteTaskFileMutationOptions = Apollo.BaseMutationOptions<Types.DeleteTaskFileMutation, Types.DeleteTaskFileMutationVariables>;
export const GenerateGoalsPlanReportDocument = gql`
    mutation GenerateGoalsPlanReport($input: GenerateGoalsPlanReportMutationInput!) {
  generateGoalsPlanReport(input: $input) {
    planReport {
      id
      url
      schoolYear
      uploadStatus
    }
  }
}
    `;
export type GenerateGoalsPlanReportMutationFn = Apollo.MutationFunction<Types.GenerateGoalsPlanReportMutation, Types.GenerateGoalsPlanReportMutationVariables>;

/**
 * __useGenerateGoalsPlanReportMutation__
 *
 * To run a mutation, you first call `useGenerateGoalsPlanReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateGoalsPlanReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateGoalsPlanReportMutation, { data, loading, error }] = useGenerateGoalsPlanReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateGoalsPlanReportMutation(baseOptions?: Apollo.MutationHookOptions<Types.GenerateGoalsPlanReportMutation, Types.GenerateGoalsPlanReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.GenerateGoalsPlanReportMutation, Types.GenerateGoalsPlanReportMutationVariables>(GenerateGoalsPlanReportDocument, options);
      }
export type GenerateGoalsPlanReportMutationHookResult = ReturnType<typeof useGenerateGoalsPlanReportMutation>;
export type GenerateGoalsPlanReportMutationResult = Apollo.MutationResult<Types.GenerateGoalsPlanReportMutation>;
export type GenerateGoalsPlanReportMutationOptions = Apollo.BaseMutationOptions<Types.GenerateGoalsPlanReportMutation, Types.GenerateGoalsPlanReportMutationVariables>;
export const GenerateGoalsPerformanceIndicatorsReportDocument = gql`
    mutation GenerateGoalsPerformanceIndicatorsReport($input: GenerateGoalsPerformanceIndicatorsReportMutationInput!) {
  generateGoalsPerformanceIndicatorsReport(input: $input) {
    performanceIndicatorsReport {
      id
    }
  }
}
    `;
export type GenerateGoalsPerformanceIndicatorsReportMutationFn = Apollo.MutationFunction<Types.GenerateGoalsPerformanceIndicatorsReportMutation, Types.GenerateGoalsPerformanceIndicatorsReportMutationVariables>;

/**
 * __useGenerateGoalsPerformanceIndicatorsReportMutation__
 *
 * To run a mutation, you first call `useGenerateGoalsPerformanceIndicatorsReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateGoalsPerformanceIndicatorsReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateGoalsPerformanceIndicatorsReportMutation, { data, loading, error }] = useGenerateGoalsPerformanceIndicatorsReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateGoalsPerformanceIndicatorsReportMutation(baseOptions?: Apollo.MutationHookOptions<Types.GenerateGoalsPerformanceIndicatorsReportMutation, Types.GenerateGoalsPerformanceIndicatorsReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.GenerateGoalsPerformanceIndicatorsReportMutation, Types.GenerateGoalsPerformanceIndicatorsReportMutationVariables>(GenerateGoalsPerformanceIndicatorsReportDocument, options);
      }
export type GenerateGoalsPerformanceIndicatorsReportMutationHookResult = ReturnType<typeof useGenerateGoalsPerformanceIndicatorsReportMutation>;
export type GenerateGoalsPerformanceIndicatorsReportMutationResult = Apollo.MutationResult<Types.GenerateGoalsPerformanceIndicatorsReportMutation>;
export type GenerateGoalsPerformanceIndicatorsReportMutationOptions = Apollo.BaseMutationOptions<Types.GenerateGoalsPerformanceIndicatorsReportMutation, Types.GenerateGoalsPerformanceIndicatorsReportMutationVariables>;
export const LockStatementDocument = gql`
    mutation LockStatement($input: LockStatementMutationInput!, $planId: ID!) {
  lockStatement(input: $input) {
    student {
      uuid
      plan(id: $planId) {
        ...Plan
      }
    }
  }
}
    ${PlanFragmentDoc}`;
export type LockStatementMutationFn = Apollo.MutationFunction<Types.LockStatementMutation, Types.LockStatementMutationVariables>;

/**
 * __useLockStatementMutation__
 *
 * To run a mutation, you first call `useLockStatementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLockStatementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lockStatementMutation, { data, loading, error }] = useLockStatementMutation({
 *   variables: {
 *      input: // value for 'input'
 *      planId: // value for 'planId'
 *   },
 * });
 */
export function useLockStatementMutation(baseOptions?: Apollo.MutationHookOptions<Types.LockStatementMutation, Types.LockStatementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.LockStatementMutation, Types.LockStatementMutationVariables>(LockStatementDocument, options);
      }
export type LockStatementMutationHookResult = ReturnType<typeof useLockStatementMutation>;
export type LockStatementMutationResult = Apollo.MutationResult<Types.LockStatementMutation>;
export type LockStatementMutationOptions = Apollo.BaseMutationOptions<Types.LockStatementMutation, Types.LockStatementMutationVariables>;
export const UnlockStatementDocument = gql`
    mutation UnlockStatement($input: UnlockStatementMutationInput!, $planId: ID!) {
  unlockStatement(input: $input) {
    student {
      uuid
      plan(id: $planId) {
        ...Plan
      }
    }
  }
}
    ${PlanFragmentDoc}`;
export type UnlockStatementMutationFn = Apollo.MutationFunction<Types.UnlockStatementMutation, Types.UnlockStatementMutationVariables>;

/**
 * __useUnlockStatementMutation__
 *
 * To run a mutation, you first call `useUnlockStatementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlockStatementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlockStatementMutation, { data, loading, error }] = useUnlockStatementMutation({
 *   variables: {
 *      input: // value for 'input'
 *      planId: // value for 'planId'
 *   },
 * });
 */
export function useUnlockStatementMutation(baseOptions?: Apollo.MutationHookOptions<Types.UnlockStatementMutation, Types.UnlockStatementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UnlockStatementMutation, Types.UnlockStatementMutationVariables>(UnlockStatementDocument, options);
      }
export type UnlockStatementMutationHookResult = ReturnType<typeof useUnlockStatementMutation>;
export type UnlockStatementMutationResult = Apollo.MutationResult<Types.UnlockStatementMutation>;
export type UnlockStatementMutationOptions = Apollo.BaseMutationOptions<Types.UnlockStatementMutation, Types.UnlockStatementMutationVariables>;
export const UpdateRubricDocument = gql`
    mutation UpdateRubric($input: UpdateRubricMutationInput!) {
  updateRubric(input: $input) {
    rubric {
      displayName
      id
      name
      description
      uuid
    }
  }
}
    `;
export type UpdateRubricMutationFn = Apollo.MutationFunction<Types.UpdateRubricMutation, Types.UpdateRubricMutationVariables>;

/**
 * __useUpdateRubricMutation__
 *
 * To run a mutation, you first call `useUpdateRubricMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRubricMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRubricMutation, { data, loading, error }] = useUpdateRubricMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRubricMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateRubricMutation, Types.UpdateRubricMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateRubricMutation, Types.UpdateRubricMutationVariables>(UpdateRubricDocument, options);
      }
export type UpdateRubricMutationHookResult = ReturnType<typeof useUpdateRubricMutation>;
export type UpdateRubricMutationResult = Apollo.MutationResult<Types.UpdateRubricMutation>;
export type UpdateRubricMutationOptions = Apollo.BaseMutationOptions<Types.UpdateRubricMutation, Types.UpdateRubricMutationVariables>;
export const UpdateRubricCriteriaDocument = gql`
    mutation UpdateRubricCriteria($input: UpdateRubricCriteriaMutationInput!) {
  updateRubricCriteria(input: $input) {
    rubricCriteria {
      id
      rubricCriteriaLabelId
      rubricHeadingId
      text
    }
  }
}
    `;
export type UpdateRubricCriteriaMutationFn = Apollo.MutationFunction<Types.UpdateRubricCriteriaMutation, Types.UpdateRubricCriteriaMutationVariables>;

/**
 * __useUpdateRubricCriteriaMutation__
 *
 * To run a mutation, you first call `useUpdateRubricCriteriaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRubricCriteriaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRubricCriteriaMutation, { data, loading, error }] = useUpdateRubricCriteriaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRubricCriteriaMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateRubricCriteriaMutation, Types.UpdateRubricCriteriaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateRubricCriteriaMutation, Types.UpdateRubricCriteriaMutationVariables>(UpdateRubricCriteriaDocument, options);
      }
export type UpdateRubricCriteriaMutationHookResult = ReturnType<typeof useUpdateRubricCriteriaMutation>;
export type UpdateRubricCriteriaMutationResult = Apollo.MutationResult<Types.UpdateRubricCriteriaMutation>;
export type UpdateRubricCriteriaMutationOptions = Apollo.BaseMutationOptions<Types.UpdateRubricCriteriaMutation, Types.UpdateRubricCriteriaMutationVariables>;
export const UpdateRubricCriteriaLabelDocument = gql`
    mutation UpdateRubricCriteriaLabel($input: UpdateRubricCriteriaLabelMutationInput!) {
  updateRubricCriteriaLabel(input: $input) {
    rubricCriteriaLabel {
      displayName
      id
      score
    }
  }
}
    `;
export type UpdateRubricCriteriaLabelMutationFn = Apollo.MutationFunction<Types.UpdateRubricCriteriaLabelMutation, Types.UpdateRubricCriteriaLabelMutationVariables>;

/**
 * __useUpdateRubricCriteriaLabelMutation__
 *
 * To run a mutation, you first call `useUpdateRubricCriteriaLabelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRubricCriteriaLabelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRubricCriteriaLabelMutation, { data, loading, error }] = useUpdateRubricCriteriaLabelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRubricCriteriaLabelMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateRubricCriteriaLabelMutation, Types.UpdateRubricCriteriaLabelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateRubricCriteriaLabelMutation, Types.UpdateRubricCriteriaLabelMutationVariables>(UpdateRubricCriteriaLabelDocument, options);
      }
export type UpdateRubricCriteriaLabelMutationHookResult = ReturnType<typeof useUpdateRubricCriteriaLabelMutation>;
export type UpdateRubricCriteriaLabelMutationResult = Apollo.MutationResult<Types.UpdateRubricCriteriaLabelMutation>;
export type UpdateRubricCriteriaLabelMutationOptions = Apollo.BaseMutationOptions<Types.UpdateRubricCriteriaLabelMutation, Types.UpdateRubricCriteriaLabelMutationVariables>;
export const UpdateSchoolYearStartDateDocument = gql`
    mutation updateSchoolYearStartDate($input: UpdateEntitySettingsMutationInput!) {
  updateEntitySettings(input: $input) {
    entity {
      settings {
        schoolYearStartDate {
          day
          month
        }
      }
      uuid
    }
  }
}
    `;
export type UpdateSchoolYearStartDateMutationFn = Apollo.MutationFunction<Types.UpdateSchoolYearStartDateMutation, Types.UpdateSchoolYearStartDateMutationVariables>;

/**
 * __useUpdateSchoolYearStartDateMutation__
 *
 * To run a mutation, you first call `useUpdateSchoolYearStartDateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSchoolYearStartDateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSchoolYearStartDateMutation, { data, loading, error }] = useUpdateSchoolYearStartDateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSchoolYearStartDateMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateSchoolYearStartDateMutation, Types.UpdateSchoolYearStartDateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateSchoolYearStartDateMutation, Types.UpdateSchoolYearStartDateMutationVariables>(UpdateSchoolYearStartDateDocument, options);
      }
export type UpdateSchoolYearStartDateMutationHookResult = ReturnType<typeof useUpdateSchoolYearStartDateMutation>;
export type UpdateSchoolYearStartDateMutationResult = Apollo.MutationResult<Types.UpdateSchoolYearStartDateMutation>;
export type UpdateSchoolYearStartDateMutationOptions = Apollo.BaseMutationOptions<Types.UpdateSchoolYearStartDateMutation, Types.UpdateSchoolYearStartDateMutationVariables>;
export const AcademyCoursesDocument = gql`
    query AcademyCourses {
  academyCourses {
    id
    name
    category
    startDate
    endDate
    description
    progress {
      completed
      total
    }
  }
}
    `;

/**
 * __useAcademyCoursesQuery__
 *
 * To run a query within a React component, call `useAcademyCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAcademyCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAcademyCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAcademyCoursesQuery(baseOptions?: Apollo.QueryHookOptions<Types.AcademyCoursesQuery, Types.AcademyCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AcademyCoursesQuery, Types.AcademyCoursesQueryVariables>(AcademyCoursesDocument, options);
      }
export function useAcademyCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AcademyCoursesQuery, Types.AcademyCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AcademyCoursesQuery, Types.AcademyCoursesQueryVariables>(AcademyCoursesDocument, options);
        }
export function useAcademyCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AcademyCoursesQuery, Types.AcademyCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AcademyCoursesQuery, Types.AcademyCoursesQueryVariables>(AcademyCoursesDocument, options);
        }
export type AcademyCoursesQueryHookResult = ReturnType<typeof useAcademyCoursesQuery>;
export type AcademyCoursesLazyQueryHookResult = ReturnType<typeof useAcademyCoursesLazyQuery>;
export type AcademyCoursesSuspenseQueryHookResult = ReturnType<typeof useAcademyCoursesSuspenseQuery>;
export type AcademyCoursesQueryResult = Apollo.QueryResult<Types.AcademyCoursesQuery, Types.AcademyCoursesQueryVariables>;
export const CheckInGroupsOverviewDocument = gql`
    query CheckInGroupsOverview($id: ID!) {
  task(id: $id) {
    id
    name
    checkInGroups {
      id
      name
      displayName
    }
  }
}
    `;

/**
 * __useCheckInGroupsOverviewQuery__
 *
 * To run a query within a React component, call `useCheckInGroupsOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckInGroupsOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckInGroupsOverviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckInGroupsOverviewQuery(baseOptions: Apollo.QueryHookOptions<Types.CheckInGroupsOverviewQuery, Types.CheckInGroupsOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CheckInGroupsOverviewQuery, Types.CheckInGroupsOverviewQueryVariables>(CheckInGroupsOverviewDocument, options);
      }
export function useCheckInGroupsOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CheckInGroupsOverviewQuery, Types.CheckInGroupsOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CheckInGroupsOverviewQuery, Types.CheckInGroupsOverviewQueryVariables>(CheckInGroupsOverviewDocument, options);
        }
export function useCheckInGroupsOverviewSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CheckInGroupsOverviewQuery, Types.CheckInGroupsOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CheckInGroupsOverviewQuery, Types.CheckInGroupsOverviewQueryVariables>(CheckInGroupsOverviewDocument, options);
        }
export type CheckInGroupsOverviewQueryHookResult = ReturnType<typeof useCheckInGroupsOverviewQuery>;
export type CheckInGroupsOverviewLazyQueryHookResult = ReturnType<typeof useCheckInGroupsOverviewLazyQuery>;
export type CheckInGroupsOverviewSuspenseQueryHookResult = ReturnType<typeof useCheckInGroupsOverviewSuspenseQuery>;
export type CheckInGroupsOverviewQueryResult = Apollo.QueryResult<Types.CheckInGroupsOverviewQuery, Types.CheckInGroupsOverviewQueryVariables>;
export const CheckInsOverviewDocument = gql`
    query CheckInsOverview($id: ID!) {
  task(id: $id) {
    id
    name
    checkInQuestions {
      id
      question
    }
  }
}
    `;

/**
 * __useCheckInsOverviewQuery__
 *
 * To run a query within a React component, call `useCheckInsOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckInsOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckInsOverviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckInsOverviewQuery(baseOptions: Apollo.QueryHookOptions<Types.CheckInsOverviewQuery, Types.CheckInsOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CheckInsOverviewQuery, Types.CheckInsOverviewQueryVariables>(CheckInsOverviewDocument, options);
      }
export function useCheckInsOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CheckInsOverviewQuery, Types.CheckInsOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CheckInsOverviewQuery, Types.CheckInsOverviewQueryVariables>(CheckInsOverviewDocument, options);
        }
export function useCheckInsOverviewSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CheckInsOverviewQuery, Types.CheckInsOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CheckInsOverviewQuery, Types.CheckInsOverviewQueryVariables>(CheckInsOverviewDocument, options);
        }
export type CheckInsOverviewQueryHookResult = ReturnType<typeof useCheckInsOverviewQuery>;
export type CheckInsOverviewLazyQueryHookResult = ReturnType<typeof useCheckInsOverviewLazyQuery>;
export type CheckInsOverviewSuspenseQueryHookResult = ReturnType<typeof useCheckInsOverviewSuspenseQuery>;
export type CheckInsOverviewQueryResult = Apollo.QueryResult<Types.CheckInsOverviewQuery, Types.CheckInsOverviewQueryVariables>;
export const GoalPlanReportDocument = gql`
    query GoalPlanReport($id: ID!) {
  goalsPlanReport(id: $id) {
    id
    url(options: {responseContentDisposition: "attachment"})
    uploadStatus
  }
}
    `;

/**
 * __useGoalPlanReportQuery__
 *
 * To run a query within a React component, call `useGoalPlanReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGoalPlanReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGoalPlanReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGoalPlanReportQuery(baseOptions: Apollo.QueryHookOptions<Types.GoalPlanReportQuery, Types.GoalPlanReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GoalPlanReportQuery, Types.GoalPlanReportQueryVariables>(GoalPlanReportDocument, options);
      }
export function useGoalPlanReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GoalPlanReportQuery, Types.GoalPlanReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GoalPlanReportQuery, Types.GoalPlanReportQueryVariables>(GoalPlanReportDocument, options);
        }
export function useGoalPlanReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.GoalPlanReportQuery, Types.GoalPlanReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GoalPlanReportQuery, Types.GoalPlanReportQueryVariables>(GoalPlanReportDocument, options);
        }
export type GoalPlanReportQueryHookResult = ReturnType<typeof useGoalPlanReportQuery>;
export type GoalPlanReportLazyQueryHookResult = ReturnType<typeof useGoalPlanReportLazyQuery>;
export type GoalPlanReportSuspenseQueryHookResult = ReturnType<typeof useGoalPlanReportSuspenseQuery>;
export type GoalPlanReportQueryResult = Apollo.QueryResult<Types.GoalPlanReportQuery, Types.GoalPlanReportQueryVariables>;
export const GoalsPerformanceIndicatorsReportDocument = gql`
    query GoalsPerformanceIndicatorsReport($id: ID!) {
  goalsPerformanceIndicatorsReport(id: $id) {
    id
    url(options: {responseContentDisposition: "attachment"})
    uploadStatus
  }
}
    `;

/**
 * __useGoalsPerformanceIndicatorsReportQuery__
 *
 * To run a query within a React component, call `useGoalsPerformanceIndicatorsReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGoalsPerformanceIndicatorsReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGoalsPerformanceIndicatorsReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGoalsPerformanceIndicatorsReportQuery(baseOptions: Apollo.QueryHookOptions<Types.GoalsPerformanceIndicatorsReportQuery, Types.GoalsPerformanceIndicatorsReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GoalsPerformanceIndicatorsReportQuery, Types.GoalsPerformanceIndicatorsReportQueryVariables>(GoalsPerformanceIndicatorsReportDocument, options);
      }
export function useGoalsPerformanceIndicatorsReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GoalsPerformanceIndicatorsReportQuery, Types.GoalsPerformanceIndicatorsReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GoalsPerformanceIndicatorsReportQuery, Types.GoalsPerformanceIndicatorsReportQueryVariables>(GoalsPerformanceIndicatorsReportDocument, options);
        }
export function useGoalsPerformanceIndicatorsReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.GoalsPerformanceIndicatorsReportQuery, Types.GoalsPerformanceIndicatorsReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GoalsPerformanceIndicatorsReportQuery, Types.GoalsPerformanceIndicatorsReportQueryVariables>(GoalsPerformanceIndicatorsReportDocument, options);
        }
export type GoalsPerformanceIndicatorsReportQueryHookResult = ReturnType<typeof useGoalsPerformanceIndicatorsReportQuery>;
export type GoalsPerformanceIndicatorsReportLazyQueryHookResult = ReturnType<typeof useGoalsPerformanceIndicatorsReportLazyQuery>;
export type GoalsPerformanceIndicatorsReportSuspenseQueryHookResult = ReturnType<typeof useGoalsPerformanceIndicatorsReportSuspenseQuery>;
export type GoalsPerformanceIndicatorsReportQueryResult = Apollo.QueryResult<Types.GoalsPerformanceIndicatorsReportQuery, Types.GoalsPerformanceIndicatorsReportQueryVariables>;
export const PlanOptionsDocument = gql`
    query PlanOptions($page: Int, $perPage: Int, $filter: PlanFilter) {
  plans(page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      id
      name
    }
  }
}
    `;

/**
 * __usePlanOptionsQuery__
 *
 * To run a query within a React component, call `usePlanOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanOptionsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePlanOptionsQuery(baseOptions?: Apollo.QueryHookOptions<Types.PlanOptionsQuery, Types.PlanOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PlanOptionsQuery, Types.PlanOptionsQueryVariables>(PlanOptionsDocument, options);
      }
export function usePlanOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PlanOptionsQuery, Types.PlanOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PlanOptionsQuery, Types.PlanOptionsQueryVariables>(PlanOptionsDocument, options);
        }
export function usePlanOptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PlanOptionsQuery, Types.PlanOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PlanOptionsQuery, Types.PlanOptionsQueryVariables>(PlanOptionsDocument, options);
        }
export type PlanOptionsQueryHookResult = ReturnType<typeof usePlanOptionsQuery>;
export type PlanOptionsLazyQueryHookResult = ReturnType<typeof usePlanOptionsLazyQuery>;
export type PlanOptionsSuspenseQueryHookResult = ReturnType<typeof usePlanOptionsSuspenseQuery>;
export type PlanOptionsQueryResult = Apollo.QueryResult<Types.PlanOptionsQuery, Types.PlanOptionsQueryVariables>;
export const PlanReportDocument = gql`
    query PlanReport($filter: PlanReportFilter!) {
  reports {
    planReport(filter: $filter) {
      summary {
        studentsTotal
        studentsInProgress
        studentsCompleted
        averageCompletion
      }
      groups {
        notStarted
        inProgress
        completed
        notMet
        group {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __usePlanReportQuery__
 *
 * To run a query within a React component, call `usePlanReportQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanReportQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePlanReportQuery(baseOptions: Apollo.QueryHookOptions<Types.PlanReportQuery, Types.PlanReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PlanReportQuery, Types.PlanReportQueryVariables>(PlanReportDocument, options);
      }
export function usePlanReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PlanReportQuery, Types.PlanReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PlanReportQuery, Types.PlanReportQueryVariables>(PlanReportDocument, options);
        }
export function usePlanReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PlanReportQuery, Types.PlanReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PlanReportQuery, Types.PlanReportQueryVariables>(PlanReportDocument, options);
        }
export type PlanReportQueryHookResult = ReturnType<typeof usePlanReportQuery>;
export type PlanReportLazyQueryHookResult = ReturnType<typeof usePlanReportLazyQuery>;
export type PlanReportSuspenseQueryHookResult = ReturnType<typeof usePlanReportSuspenseQuery>;
export type PlanReportQueryResult = Apollo.QueryResult<Types.PlanReportQuery, Types.PlanReportQueryVariables>;
export const PlanReportFiltersDocument = gql`
    query PlanReportFilters($planId: ID!, $filters: ReportFiltersFilter, $entityFilter: EntityFilter, $userFilter: UserFilter, $schoolClassFilter: SchoolClassFilter) {
  planReportFilters(planId: $planId, filters: $filters) {
    entities(filter: $entityFilter, perPage: 100) {
      nodesCount
      pagesCount
      nodes {
        uuid
        name
      }
    }
    gradeLevels
    users(filter: $userFilter, perPage: 100) {
      nodesCount
      pagesCount
      nodes {
        uuid
        fullName
      }
    }
    schoolClasses(filter: $schoolClassFilter, perPage: 100) {
      nodesCount
      pagesCount
      nodes {
        uuid
        name
        users(perPage: 100) {
          nodes {
            fullName
          }
        }
      }
    }
  }
}
    `;

/**
 * __usePlanReportFiltersQuery__
 *
 * To run a query within a React component, call `usePlanReportFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanReportFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanReportFiltersQuery({
 *   variables: {
 *      planId: // value for 'planId'
 *      filters: // value for 'filters'
 *      entityFilter: // value for 'entityFilter'
 *      userFilter: // value for 'userFilter'
 *      schoolClassFilter: // value for 'schoolClassFilter'
 *   },
 * });
 */
export function usePlanReportFiltersQuery(baseOptions: Apollo.QueryHookOptions<Types.PlanReportFiltersQuery, Types.PlanReportFiltersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PlanReportFiltersQuery, Types.PlanReportFiltersQueryVariables>(PlanReportFiltersDocument, options);
      }
export function usePlanReportFiltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PlanReportFiltersQuery, Types.PlanReportFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PlanReportFiltersQuery, Types.PlanReportFiltersQueryVariables>(PlanReportFiltersDocument, options);
        }
export function usePlanReportFiltersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PlanReportFiltersQuery, Types.PlanReportFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PlanReportFiltersQuery, Types.PlanReportFiltersQueryVariables>(PlanReportFiltersDocument, options);
        }
export type PlanReportFiltersQueryHookResult = ReturnType<typeof usePlanReportFiltersQuery>;
export type PlanReportFiltersLazyQueryHookResult = ReturnType<typeof usePlanReportFiltersLazyQuery>;
export type PlanReportFiltersSuspenseQueryHookResult = ReturnType<typeof usePlanReportFiltersSuspenseQuery>;
export type PlanReportFiltersQueryResult = Apollo.QueryResult<Types.PlanReportFiltersQuery, Types.PlanReportFiltersQueryVariables>;
export const PlanStatementBreakdownDocument = gql`
    query PlanStatementBreakdown($filter: PlanReportFilter!, $statementId: ID!) {
  reports {
    planReport(filter: $filter) {
      statementBreakdown(statementId: $statementId) {
        completed
        inProgress
        notMet
        notStarted
      }
    }
  }
}
    `;

/**
 * __usePlanStatementBreakdownQuery__
 *
 * To run a query within a React component, call `usePlanStatementBreakdownQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanStatementBreakdownQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanStatementBreakdownQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      statementId: // value for 'statementId'
 *   },
 * });
 */
export function usePlanStatementBreakdownQuery(baseOptions: Apollo.QueryHookOptions<Types.PlanStatementBreakdownQuery, Types.PlanStatementBreakdownQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PlanStatementBreakdownQuery, Types.PlanStatementBreakdownQueryVariables>(PlanStatementBreakdownDocument, options);
      }
export function usePlanStatementBreakdownLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PlanStatementBreakdownQuery, Types.PlanStatementBreakdownQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PlanStatementBreakdownQuery, Types.PlanStatementBreakdownQueryVariables>(PlanStatementBreakdownDocument, options);
        }
export function usePlanStatementBreakdownSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PlanStatementBreakdownQuery, Types.PlanStatementBreakdownQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PlanStatementBreakdownQuery, Types.PlanStatementBreakdownQueryVariables>(PlanStatementBreakdownDocument, options);
        }
export type PlanStatementBreakdownQueryHookResult = ReturnType<typeof usePlanStatementBreakdownQuery>;
export type PlanStatementBreakdownLazyQueryHookResult = ReturnType<typeof usePlanStatementBreakdownLazyQuery>;
export type PlanStatementBreakdownSuspenseQueryHookResult = ReturnType<typeof usePlanStatementBreakdownSuspenseQuery>;
export type PlanStatementBreakdownQueryResult = Apollo.QueryResult<Types.PlanStatementBreakdownQuery, Types.PlanStatementBreakdownQueryVariables>;
export const PlanStatementOptionsDocument = gql`
    query PlanStatementOptions($id: ID!) {
  plan(id: $id) {
    id
    groups {
      id
      name
      statements {
        id
        name
        isRequired
        question {
          text
          options {
            id
            option
          }
        }
      }
    }
  }
}
    `;

/**
 * __usePlanStatementOptionsQuery__
 *
 * To run a query within a React component, call `usePlanStatementOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanStatementOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanStatementOptionsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlanStatementOptionsQuery(baseOptions: Apollo.QueryHookOptions<Types.PlanStatementOptionsQuery, Types.PlanStatementOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PlanStatementOptionsQuery, Types.PlanStatementOptionsQueryVariables>(PlanStatementOptionsDocument, options);
      }
export function usePlanStatementOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PlanStatementOptionsQuery, Types.PlanStatementOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PlanStatementOptionsQuery, Types.PlanStatementOptionsQueryVariables>(PlanStatementOptionsDocument, options);
        }
export function usePlanStatementOptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PlanStatementOptionsQuery, Types.PlanStatementOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PlanStatementOptionsQuery, Types.PlanStatementOptionsQueryVariables>(PlanStatementOptionsDocument, options);
        }
export type PlanStatementOptionsQueryHookResult = ReturnType<typeof usePlanStatementOptionsQuery>;
export type PlanStatementOptionsLazyQueryHookResult = ReturnType<typeof usePlanStatementOptionsLazyQuery>;
export type PlanStatementOptionsSuspenseQueryHookResult = ReturnType<typeof usePlanStatementOptionsSuspenseQuery>;
export type PlanStatementOptionsQueryResult = Apollo.QueryResult<Types.PlanStatementOptionsQuery, Types.PlanStatementOptionsQueryVariables>;
export const PlanStatementResultsDocument = gql`
    query PlanStatementResults($filter: PlanReportFilter!, $statementId: ID!, $statementFilter: PlanGroupStatementResultFilter, $sort: PlanGroupStatementResultSortAttributes, $page: Int, $perPage: Int) {
  reports {
    planReport(filter: $filter) {
      statementResults(
        statementId: $statementId
        filter: $statementFilter
        sort: $sort
        page: $page
        perPage: $perPage
      ) {
        nodes {
          answer
          evidencesCount
          lastUpdatedAt
          status
          studentName
          studentSisId
        }
        nodesCount
        pagesCount
      }
    }
  }
}
    `;

/**
 * __usePlanStatementResultsQuery__
 *
 * To run a query within a React component, call `usePlanStatementResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanStatementResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanStatementResultsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      statementId: // value for 'statementId'
 *      statementFilter: // value for 'statementFilter'
 *      sort: // value for 'sort'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function usePlanStatementResultsQuery(baseOptions: Apollo.QueryHookOptions<Types.PlanStatementResultsQuery, Types.PlanStatementResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PlanStatementResultsQuery, Types.PlanStatementResultsQueryVariables>(PlanStatementResultsDocument, options);
      }
export function usePlanStatementResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PlanStatementResultsQuery, Types.PlanStatementResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PlanStatementResultsQuery, Types.PlanStatementResultsQueryVariables>(PlanStatementResultsDocument, options);
        }
export function usePlanStatementResultsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PlanStatementResultsQuery, Types.PlanStatementResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PlanStatementResultsQuery, Types.PlanStatementResultsQueryVariables>(PlanStatementResultsDocument, options);
        }
export type PlanStatementResultsQueryHookResult = ReturnType<typeof usePlanStatementResultsQuery>;
export type PlanStatementResultsLazyQueryHookResult = ReturnType<typeof usePlanStatementResultsLazyQuery>;
export type PlanStatementResultsSuspenseQueryHookResult = ReturnType<typeof usePlanStatementResultsSuspenseQuery>;
export type PlanStatementResultsQueryResult = Apollo.QueryResult<Types.PlanStatementResultsQuery, Types.PlanStatementResultsQueryVariables>;
export const ProductsOverviewDocument = gql`
    query ProductsOverview($id: ID!) {
  task(id: $id) {
    id
    name
    products {
      id
      name
      displayName
      description
    }
  }
}
    `;

/**
 * __useProductsOverviewQuery__
 *
 * To run a query within a React component, call `useProductsOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsOverviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductsOverviewQuery(baseOptions: Apollo.QueryHookOptions<Types.ProductsOverviewQuery, Types.ProductsOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProductsOverviewQuery, Types.ProductsOverviewQueryVariables>(ProductsOverviewDocument, options);
      }
export function useProductsOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProductsOverviewQuery, Types.ProductsOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProductsOverviewQuery, Types.ProductsOverviewQueryVariables>(ProductsOverviewDocument, options);
        }
export function useProductsOverviewSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProductsOverviewQuery, Types.ProductsOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ProductsOverviewQuery, Types.ProductsOverviewQueryVariables>(ProductsOverviewDocument, options);
        }
export type ProductsOverviewQueryHookResult = ReturnType<typeof useProductsOverviewQuery>;
export type ProductsOverviewLazyQueryHookResult = ReturnType<typeof useProductsOverviewLazyQuery>;
export type ProductsOverviewSuspenseQueryHookResult = ReturnType<typeof useProductsOverviewSuspenseQuery>;
export type ProductsOverviewQueryResult = Apollo.QueryResult<Types.ProductsOverviewQuery, Types.ProductsOverviewQueryVariables>;
export const StudentConversationDocument = gql`
    query StudentConversation($uuid: ID!, $id: ID!, $first: Int, $after: String) {
  student(uuid: $uuid) {
    uuid
    conversation(id: $id) {
      id
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
    }
  }
}
    `;

/**
 * __useStudentConversationQuery__
 *
 * To run a query within a React component, call `useStudentConversationQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentConversationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentConversationQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      id: // value for 'id'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useStudentConversationQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentConversationQuery, Types.StudentConversationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentConversationQuery, Types.StudentConversationQueryVariables>(StudentConversationDocument, options);
      }
export function useStudentConversationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentConversationQuery, Types.StudentConversationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentConversationQuery, Types.StudentConversationQueryVariables>(StudentConversationDocument, options);
        }
export function useStudentConversationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentConversationQuery, Types.StudentConversationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentConversationQuery, Types.StudentConversationQueryVariables>(StudentConversationDocument, options);
        }
export type StudentConversationQueryHookResult = ReturnType<typeof useStudentConversationQuery>;
export type StudentConversationLazyQueryHookResult = ReturnType<typeof useStudentConversationLazyQuery>;
export type StudentConversationSuspenseQueryHookResult = ReturnType<typeof useStudentConversationSuspenseQuery>;
export type StudentConversationQueryResult = Apollo.QueryResult<Types.StudentConversationQuery, Types.StudentConversationQueryVariables>;
export const StudentConversationGroupsDocument = gql`
    query StudentConversationGroups($uuid: ID!, $first: Int, $after: String) {
  student(uuid: $uuid) {
    firstName
    lastName
    uuid
    conversationGroups(first: $first, after: $after) {
      edges {
        node {
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
}
    `;

/**
 * __useStudentConversationGroupsQuery__
 *
 * To run a query within a React component, call `useStudentConversationGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentConversationGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentConversationGroupsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useStudentConversationGroupsQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentConversationGroupsQuery, Types.StudentConversationGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentConversationGroupsQuery, Types.StudentConversationGroupsQueryVariables>(StudentConversationGroupsDocument, options);
      }
export function useStudentConversationGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentConversationGroupsQuery, Types.StudentConversationGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentConversationGroupsQuery, Types.StudentConversationGroupsQueryVariables>(StudentConversationGroupsDocument, options);
        }
export function useStudentConversationGroupsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentConversationGroupsQuery, Types.StudentConversationGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentConversationGroupsQuery, Types.StudentConversationGroupsQueryVariables>(StudentConversationGroupsDocument, options);
        }
export type StudentConversationGroupsQueryHookResult = ReturnType<typeof useStudentConversationGroupsQuery>;
export type StudentConversationGroupsLazyQueryHookResult = ReturnType<typeof useStudentConversationGroupsLazyQuery>;
export type StudentConversationGroupsSuspenseQueryHookResult = ReturnType<typeof useStudentConversationGroupsSuspenseQuery>;
export type StudentConversationGroupsQueryResult = Apollo.QueryResult<Types.StudentConversationGroupsQuery, Types.StudentConversationGroupsQueryVariables>;
export const StudentConversationsDocument = gql`
    query StudentConversations($uuid: ID!, $first: Int, $after: String, $with: ConversationParticipantFilter!) {
  student(uuid: $uuid) {
    uuid
    conversations(first: $first, after: $after, with: $with) {
      edges {
        node {
          conversationContext {
            id
            name
          }
          id
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
}
    `;

/**
 * __useStudentConversationsQuery__
 *
 * To run a query within a React component, call `useStudentConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentConversationsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      with: // value for 'with'
 *   },
 * });
 */
export function useStudentConversationsQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentConversationsQuery, Types.StudentConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentConversationsQuery, Types.StudentConversationsQueryVariables>(StudentConversationsDocument, options);
      }
export function useStudentConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentConversationsQuery, Types.StudentConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentConversationsQuery, Types.StudentConversationsQueryVariables>(StudentConversationsDocument, options);
        }
export function useStudentConversationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentConversationsQuery, Types.StudentConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentConversationsQuery, Types.StudentConversationsQueryVariables>(StudentConversationsDocument, options);
        }
export type StudentConversationsQueryHookResult = ReturnType<typeof useStudentConversationsQuery>;
export type StudentConversationsLazyQueryHookResult = ReturnType<typeof useStudentConversationsLazyQuery>;
export type StudentConversationsSuspenseQueryHookResult = ReturnType<typeof useStudentConversationsSuspenseQuery>;
export type StudentConversationsQueryResult = Apollo.QueryResult<Types.StudentConversationsQuery, Types.StudentConversationsQueryVariables>;
export const StudentPortfolioExperienceDocument = gql`
    query StudentPortfolioExperience($uuid: ID!, $id: ID!) {
  student(uuid: $uuid) {
    portfolio {
      careerExperience(id: $id) {
        submissions {
          service
          submissionName
          contextName
          submittedAt
          isTeamSubmission
        }
      }
      studentId
    }
    uuid
  }
}
    `;

/**
 * __useStudentPortfolioExperienceQuery__
 *
 * To run a query within a React component, call `useStudentPortfolioExperienceQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentPortfolioExperienceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentPortfolioExperienceQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStudentPortfolioExperienceQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentPortfolioExperienceQuery, Types.StudentPortfolioExperienceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentPortfolioExperienceQuery, Types.StudentPortfolioExperienceQueryVariables>(StudentPortfolioExperienceDocument, options);
      }
export function useStudentPortfolioExperienceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentPortfolioExperienceQuery, Types.StudentPortfolioExperienceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentPortfolioExperienceQuery, Types.StudentPortfolioExperienceQueryVariables>(StudentPortfolioExperienceDocument, options);
        }
export function useStudentPortfolioExperienceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentPortfolioExperienceQuery, Types.StudentPortfolioExperienceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentPortfolioExperienceQuery, Types.StudentPortfolioExperienceQueryVariables>(StudentPortfolioExperienceDocument, options);
        }
export type StudentPortfolioExperienceQueryHookResult = ReturnType<typeof useStudentPortfolioExperienceQuery>;
export type StudentPortfolioExperienceLazyQueryHookResult = ReturnType<typeof useStudentPortfolioExperienceLazyQuery>;
export type StudentPortfolioExperienceSuspenseQueryHookResult = ReturnType<typeof useStudentPortfolioExperienceSuspenseQuery>;
export type StudentPortfolioExperienceQueryResult = Apollo.QueryResult<Types.StudentPortfolioExperienceQuery, Types.StudentPortfolioExperienceQueryVariables>;
export const StudentPortfolioExperiencesDocument = gql`
    query StudentPortfolioExperiences($uuid: ID!) {
  student(uuid: $uuid) {
    portfolio {
      careerExperiences {
        clusterId
        clusterName
        submissionsCount
      }
      studentId
    }
    uuid
    fullName
  }
}
    `;

/**
 * __useStudentPortfolioExperiencesQuery__
 *
 * To run a query within a React component, call `useStudentPortfolioExperiencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentPortfolioExperiencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentPortfolioExperiencesQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useStudentPortfolioExperiencesQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentPortfolioExperiencesQuery, Types.StudentPortfolioExperiencesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentPortfolioExperiencesQuery, Types.StudentPortfolioExperiencesQueryVariables>(StudentPortfolioExperiencesDocument, options);
      }
export function useStudentPortfolioExperiencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentPortfolioExperiencesQuery, Types.StudentPortfolioExperiencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentPortfolioExperiencesQuery, Types.StudentPortfolioExperiencesQueryVariables>(StudentPortfolioExperiencesDocument, options);
        }
export function useStudentPortfolioExperiencesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentPortfolioExperiencesQuery, Types.StudentPortfolioExperiencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentPortfolioExperiencesQuery, Types.StudentPortfolioExperiencesQueryVariables>(StudentPortfolioExperiencesDocument, options);
        }
export type StudentPortfolioExperiencesQueryHookResult = ReturnType<typeof useStudentPortfolioExperiencesQuery>;
export type StudentPortfolioExperiencesLazyQueryHookResult = ReturnType<typeof useStudentPortfolioExperiencesLazyQuery>;
export type StudentPortfolioExperiencesSuspenseQueryHookResult = ReturnType<typeof useStudentPortfolioExperiencesSuspenseQuery>;
export type StudentPortfolioExperiencesQueryResult = Apollo.QueryResult<Types.StudentPortfolioExperiencesQuery, Types.StudentPortfolioExperiencesQueryVariables>;
export const StudentPortfolioPlanWithEvaluationDocument = gql`
    query StudentPortfolioPlanWithEvaluation($uuid: ID!, $id: ID!) {
  student(uuid: $uuid) {
    portfolio {
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
            isLocked
            isRequired
            name
            step
            evidences {
              contextType
              label
              isTeamSubmission
              rubricScores {
                currentScore
                maxScore
                label
              }
              service
              type
              updatedAt
              itemId
              id
            }
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
      studentId
    }
    uuid
  }
}
    `;

/**
 * __useStudentPortfolioPlanWithEvaluationQuery__
 *
 * To run a query within a React component, call `useStudentPortfolioPlanWithEvaluationQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentPortfolioPlanWithEvaluationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentPortfolioPlanWithEvaluationQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStudentPortfolioPlanWithEvaluationQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentPortfolioPlanWithEvaluationQuery, Types.StudentPortfolioPlanWithEvaluationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentPortfolioPlanWithEvaluationQuery, Types.StudentPortfolioPlanWithEvaluationQueryVariables>(StudentPortfolioPlanWithEvaluationDocument, options);
      }
export function useStudentPortfolioPlanWithEvaluationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentPortfolioPlanWithEvaluationQuery, Types.StudentPortfolioPlanWithEvaluationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentPortfolioPlanWithEvaluationQuery, Types.StudentPortfolioPlanWithEvaluationQueryVariables>(StudentPortfolioPlanWithEvaluationDocument, options);
        }
export function useStudentPortfolioPlanWithEvaluationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentPortfolioPlanWithEvaluationQuery, Types.StudentPortfolioPlanWithEvaluationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentPortfolioPlanWithEvaluationQuery, Types.StudentPortfolioPlanWithEvaluationQueryVariables>(StudentPortfolioPlanWithEvaluationDocument, options);
        }
export type StudentPortfolioPlanWithEvaluationQueryHookResult = ReturnType<typeof useStudentPortfolioPlanWithEvaluationQuery>;
export type StudentPortfolioPlanWithEvaluationLazyQueryHookResult = ReturnType<typeof useStudentPortfolioPlanWithEvaluationLazyQuery>;
export type StudentPortfolioPlanWithEvaluationSuspenseQueryHookResult = ReturnType<typeof useStudentPortfolioPlanWithEvaluationSuspenseQuery>;
export type StudentPortfolioPlanWithEvaluationQueryResult = Apollo.QueryResult<Types.StudentPortfolioPlanWithEvaluationQuery, Types.StudentPortfolioPlanWithEvaluationQueryVariables>;
export const StudentPortfolioPlansDocument = gql`
    query StudentPortfolioPlans($uuid: ID!) {
  student(uuid: $uuid) {
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
    uuid
    firstName
    lastName
    email
    username
  }
}
    `;

/**
 * __useStudentPortfolioPlansQuery__
 *
 * To run a query within a React component, call `useStudentPortfolioPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentPortfolioPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentPortfolioPlansQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useStudentPortfolioPlansQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentPortfolioPlansQuery, Types.StudentPortfolioPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentPortfolioPlansQuery, Types.StudentPortfolioPlansQueryVariables>(StudentPortfolioPlansDocument, options);
      }
export function useStudentPortfolioPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentPortfolioPlansQuery, Types.StudentPortfolioPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentPortfolioPlansQuery, Types.StudentPortfolioPlansQueryVariables>(StudentPortfolioPlansDocument, options);
        }
export function useStudentPortfolioPlansSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentPortfolioPlansQuery, Types.StudentPortfolioPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentPortfolioPlansQuery, Types.StudentPortfolioPlansQueryVariables>(StudentPortfolioPlansDocument, options);
        }
export type StudentPortfolioPlansQueryHookResult = ReturnType<typeof useStudentPortfolioPlansQuery>;
export type StudentPortfolioPlansLazyQueryHookResult = ReturnType<typeof useStudentPortfolioPlansLazyQuery>;
export type StudentPortfolioPlansSuspenseQueryHookResult = ReturnType<typeof useStudentPortfolioPlansSuspenseQuery>;
export type StudentPortfolioPlansQueryResult = Apollo.QueryResult<Types.StudentPortfolioPlansQuery, Types.StudentPortfolioPlansQueryVariables>;
export const StudentPortfolioProjectsDocument = gql`
    query StudentPortfolioProjects($uuid: ID!, $type: PortfolioKind!, $first: Int, $after: String) {
  student(uuid: $uuid) {
    portfolio {
      projects(type: $type, first: $first, after: $after) {
        totalCount
        edges {
          cursor
          node {
            description
            id
            imageUrl
            name
            parentName
            resourceClass
            teamSubmission
            type
            isTeamSubmission
            submission {
              files {
                isOwner
                filename
                googleWeblink
                source
                url
                submitter {
                  firstName
                  lastName
                  fullName
                  uuid
                }
              }
              status
            }
            finishedAt
            thumbnailUrl
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
      studentId
    }
    uuid
  }
}
    `;

/**
 * __useStudentPortfolioProjectsQuery__
 *
 * To run a query within a React component, call `useStudentPortfolioProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentPortfolioProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentPortfolioProjectsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      type: // value for 'type'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useStudentPortfolioProjectsQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentPortfolioProjectsQuery, Types.StudentPortfolioProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentPortfolioProjectsQuery, Types.StudentPortfolioProjectsQueryVariables>(StudentPortfolioProjectsDocument, options);
      }
export function useStudentPortfolioProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentPortfolioProjectsQuery, Types.StudentPortfolioProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentPortfolioProjectsQuery, Types.StudentPortfolioProjectsQueryVariables>(StudentPortfolioProjectsDocument, options);
        }
export function useStudentPortfolioProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentPortfolioProjectsQuery, Types.StudentPortfolioProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentPortfolioProjectsQuery, Types.StudentPortfolioProjectsQueryVariables>(StudentPortfolioProjectsDocument, options);
        }
export type StudentPortfolioProjectsQueryHookResult = ReturnType<typeof useStudentPortfolioProjectsQuery>;
export type StudentPortfolioProjectsLazyQueryHookResult = ReturnType<typeof useStudentPortfolioProjectsLazyQuery>;
export type StudentPortfolioProjectsSuspenseQueryHookResult = ReturnType<typeof useStudentPortfolioProjectsSuspenseQuery>;
export type StudentPortfolioProjectsQueryResult = Apollo.QueryResult<Types.StudentPortfolioProjectsQuery, Types.StudentPortfolioProjectsQueryVariables>;
export const StudentPortfolioResumeDocument = gql`
    query StudentPortfolioResume($uuid: ID!) {
  student(uuid: $uuid) {
    portfolio {
      sharedResume {
        shareCode
        avatarUrl
        sharedUrlEnabled
        bio
        contactLinks {
          id
          type
          value
        }
        experiences {
          description
          endedAt
          id
          name
          startedAt
        }
        educations {
          description
          endedAt
          id
          name
          startedAt
        }
        extraCurriculars {
          description
          endedAt
          id
          name
          startedAt
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
              url
              submitter {
                firstName
                fullName
                lastName
                uuid
              }
            }
            status
          }
          thumbnailUrl
          type
        }
        highlightedBadges {
          id
          imageUrl
          name
          description
          resource {
            id
            name
          }
        }
        highlightedProjectsEnabled
        name
      }
      resumes {
        filename
        id
        url(options: {responseContentDisposition: "attachment"})
      }
      studentId
    }
    uuid
    email
    firstName
    lastName
    username
  }
}
    `;

/**
 * __useStudentPortfolioResumeQuery__
 *
 * To run a query within a React component, call `useStudentPortfolioResumeQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentPortfolioResumeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentPortfolioResumeQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useStudentPortfolioResumeQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentPortfolioResumeQuery, Types.StudentPortfolioResumeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentPortfolioResumeQuery, Types.StudentPortfolioResumeQueryVariables>(StudentPortfolioResumeDocument, options);
      }
export function useStudentPortfolioResumeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentPortfolioResumeQuery, Types.StudentPortfolioResumeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentPortfolioResumeQuery, Types.StudentPortfolioResumeQueryVariables>(StudentPortfolioResumeDocument, options);
        }
export function useStudentPortfolioResumeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentPortfolioResumeQuery, Types.StudentPortfolioResumeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentPortfolioResumeQuery, Types.StudentPortfolioResumeQueryVariables>(StudentPortfolioResumeDocument, options);
        }
export type StudentPortfolioResumeQueryHookResult = ReturnType<typeof useStudentPortfolioResumeQuery>;
export type StudentPortfolioResumeLazyQueryHookResult = ReturnType<typeof useStudentPortfolioResumeLazyQuery>;
export type StudentPortfolioResumeSuspenseQueryHookResult = ReturnType<typeof useStudentPortfolioResumeSuspenseQuery>;
export type StudentPortfolioResumeQueryResult = Apollo.QueryResult<Types.StudentPortfolioResumeQuery, Types.StudentPortfolioResumeQueryVariables>;
export const StudentReportByUserDocument = gql`
    query StudentReportByUser($planId: ID!, $studentUuid: ID!) {
  studentReport(planId: $planId, studentUuid: $studentUuid) {
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
 * __useStudentReportByUserQuery__
 *
 * To run a query within a React component, call `useStudentReportByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentReportByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentReportByUserQuery({
 *   variables: {
 *      planId: // value for 'planId'
 *      studentUuid: // value for 'studentUuid'
 *   },
 * });
 */
export function useStudentReportByUserQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentReportByUserQuery, Types.StudentReportByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentReportByUserQuery, Types.StudentReportByUserQueryVariables>(StudentReportByUserDocument, options);
      }
export function useStudentReportByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentReportByUserQuery, Types.StudentReportByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentReportByUserQuery, Types.StudentReportByUserQueryVariables>(StudentReportByUserDocument, options);
        }
export function useStudentReportByUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentReportByUserQuery, Types.StudentReportByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentReportByUserQuery, Types.StudentReportByUserQueryVariables>(StudentReportByUserDocument, options);
        }
export type StudentReportByUserQueryHookResult = ReturnType<typeof useStudentReportByUserQuery>;
export type StudentReportByUserLazyQueryHookResult = ReturnType<typeof useStudentReportByUserLazyQuery>;
export type StudentReportByUserSuspenseQueryHookResult = ReturnType<typeof useStudentReportByUserSuspenseQuery>;
export type StudentReportByUserQueryResult = Apollo.QueryResult<Types.StudentReportByUserQuery, Types.StudentReportByUserQueryVariables>;
export const TagOptionsDocument = gql`
    query TagOptions($page: Int, $perPage: Int, $filter: TagFilter) {
  tags(page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      id
      name
    }
  }
}
    `;

/**
 * __useTagOptionsQuery__
 *
 * To run a query within a React component, call `useTagOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagOptionsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useTagOptionsQuery(baseOptions?: Apollo.QueryHookOptions<Types.TagOptionsQuery, Types.TagOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TagOptionsQuery, Types.TagOptionsQueryVariables>(TagOptionsDocument, options);
      }
export function useTagOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TagOptionsQuery, Types.TagOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TagOptionsQuery, Types.TagOptionsQueryVariables>(TagOptionsDocument, options);
        }
export function useTagOptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TagOptionsQuery, Types.TagOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TagOptionsQuery, Types.TagOptionsQueryVariables>(TagOptionsDocument, options);
        }
export type TagOptionsQueryHookResult = ReturnType<typeof useTagOptionsQuery>;
export type TagOptionsLazyQueryHookResult = ReturnType<typeof useTagOptionsLazyQuery>;
export type TagOptionsSuspenseQueryHookResult = ReturnType<typeof useTagOptionsSuspenseQuery>;
export type TagOptionsQueryResult = Apollo.QueryResult<Types.TagOptionsQuery, Types.TagOptionsQueryVariables>;
export const PerformanceIndicatorsFullDataDocument = gql`
    query PerformanceIndicatorsFullData($filter: TagReportResultsFilter!, $sort: TagReportResultsSortAttributes, $page: Int, $perPage: Int) {
  reports {
    tagReport {
      studentsCount
      tagsResults(filter: $filter, sort: $sort, page: $page, perPage: $perPage) {
        nodesCount
        pagesCount
        nodes {
          contextName
          gradedAt
          platform
          rubricName
          scoreEarned
          scoreMaximum
          sourceName
          studentSisId
          studentFullName
          tags {
            id
            hasEntities
            type
            name
          }
        }
      }
    }
  }
}
    `;

/**
 * __usePerformanceIndicatorsFullDataQuery__
 *
 * To run a query within a React component, call `usePerformanceIndicatorsFullDataQuery` and pass it any options that fit your needs.
 * When your component renders, `usePerformanceIndicatorsFullDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePerformanceIndicatorsFullDataQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      sort: // value for 'sort'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function usePerformanceIndicatorsFullDataQuery(baseOptions: Apollo.QueryHookOptions<Types.PerformanceIndicatorsFullDataQuery, Types.PerformanceIndicatorsFullDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PerformanceIndicatorsFullDataQuery, Types.PerformanceIndicatorsFullDataQueryVariables>(PerformanceIndicatorsFullDataDocument, options);
      }
export function usePerformanceIndicatorsFullDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PerformanceIndicatorsFullDataQuery, Types.PerformanceIndicatorsFullDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PerformanceIndicatorsFullDataQuery, Types.PerformanceIndicatorsFullDataQueryVariables>(PerformanceIndicatorsFullDataDocument, options);
        }
export function usePerformanceIndicatorsFullDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PerformanceIndicatorsFullDataQuery, Types.PerformanceIndicatorsFullDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PerformanceIndicatorsFullDataQuery, Types.PerformanceIndicatorsFullDataQueryVariables>(PerformanceIndicatorsFullDataDocument, options);
        }
export type PerformanceIndicatorsFullDataQueryHookResult = ReturnType<typeof usePerformanceIndicatorsFullDataQuery>;
export type PerformanceIndicatorsFullDataLazyQueryHookResult = ReturnType<typeof usePerformanceIndicatorsFullDataLazyQuery>;
export type PerformanceIndicatorsFullDataSuspenseQueryHookResult = ReturnType<typeof usePerformanceIndicatorsFullDataSuspenseQuery>;
export type PerformanceIndicatorsFullDataQueryResult = Apollo.QueryResult<Types.PerformanceIndicatorsFullDataQuery, Types.PerformanceIndicatorsFullDataQueryVariables>;
export const TagReportDocument = gql`
    query TagReport($summaryFilter: TagReportSummaryFilter!) {
  reports {
    tagReport {
      tagSummary(filter: $summaryFilter) {
        tag {
          id
          name
        }
        studentsCount
        cumulativeAverageScore
        aggregationPeriods {
          averageScore
          period
          periodEnd
          periodStart
          studentsCount
        }
      }
    }
  }
}
    `;

/**
 * __useTagReportQuery__
 *
 * To run a query within a React component, call `useTagReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagReportQuery({
 *   variables: {
 *      summaryFilter: // value for 'summaryFilter'
 *   },
 * });
 */
export function useTagReportQuery(baseOptions: Apollo.QueryHookOptions<Types.TagReportQuery, Types.TagReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TagReportQuery, Types.TagReportQueryVariables>(TagReportDocument, options);
      }
export function useTagReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TagReportQuery, Types.TagReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TagReportQuery, Types.TagReportQueryVariables>(TagReportDocument, options);
        }
export function useTagReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TagReportQuery, Types.TagReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TagReportQuery, Types.TagReportQueryVariables>(TagReportDocument, options);
        }
export type TagReportQueryHookResult = ReturnType<typeof useTagReportQuery>;
export type TagReportLazyQueryHookResult = ReturnType<typeof useTagReportLazyQuery>;
export type TagReportSuspenseQueryHookResult = ReturnType<typeof useTagReportSuspenseQuery>;
export type TagReportQueryResult = Apollo.QueryResult<Types.TagReportQuery, Types.TagReportQueryVariables>;
export const PerformanceIndicatorsFiltersDocument = gql`
    query PerformanceIndicatorsFilters($tagIds: [ID!]!, $filters: ReportFiltersFilter, $entityFilter: EntityFilter, $userFilter: UserFilter, $schoolClassFilter: SchoolClassFilter) {
  tagReportFilters(tagIds: $tagIds, filters: $filters) {
    entities(filter: $entityFilter, perPage: 100) {
      nodesCount
      pagesCount
      nodes {
        uuid
        name
      }
    }
    gradeLevels
    users(filter: $userFilter, perPage: 100) {
      nodesCount
      pagesCount
      nodes {
        uuid
        fullName
      }
    }
    schoolClasses(filter: $schoolClassFilter, perPage: 100) {
      nodesCount
      pagesCount
      nodes {
        uuid
        name
        users(perPage: 100) {
          nodes {
            fullName
          }
        }
      }
    }
  }
}
    `;

/**
 * __usePerformanceIndicatorsFiltersQuery__
 *
 * To run a query within a React component, call `usePerformanceIndicatorsFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePerformanceIndicatorsFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePerformanceIndicatorsFiltersQuery({
 *   variables: {
 *      tagIds: // value for 'tagIds'
 *      filters: // value for 'filters'
 *      entityFilter: // value for 'entityFilter'
 *      userFilter: // value for 'userFilter'
 *      schoolClassFilter: // value for 'schoolClassFilter'
 *   },
 * });
 */
export function usePerformanceIndicatorsFiltersQuery(baseOptions: Apollo.QueryHookOptions<Types.PerformanceIndicatorsFiltersQuery, Types.PerformanceIndicatorsFiltersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PerformanceIndicatorsFiltersQuery, Types.PerformanceIndicatorsFiltersQueryVariables>(PerformanceIndicatorsFiltersDocument, options);
      }
export function usePerformanceIndicatorsFiltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PerformanceIndicatorsFiltersQuery, Types.PerformanceIndicatorsFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PerformanceIndicatorsFiltersQuery, Types.PerformanceIndicatorsFiltersQueryVariables>(PerformanceIndicatorsFiltersDocument, options);
        }
export function usePerformanceIndicatorsFiltersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PerformanceIndicatorsFiltersQuery, Types.PerformanceIndicatorsFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PerformanceIndicatorsFiltersQuery, Types.PerformanceIndicatorsFiltersQueryVariables>(PerformanceIndicatorsFiltersDocument, options);
        }
export type PerformanceIndicatorsFiltersQueryHookResult = ReturnType<typeof usePerformanceIndicatorsFiltersQuery>;
export type PerformanceIndicatorsFiltersLazyQueryHookResult = ReturnType<typeof usePerformanceIndicatorsFiltersLazyQuery>;
export type PerformanceIndicatorsFiltersSuspenseQueryHookResult = ReturnType<typeof usePerformanceIndicatorsFiltersSuspenseQuery>;
export type PerformanceIndicatorsFiltersQueryResult = Apollo.QueryResult<Types.PerformanceIndicatorsFiltersQuery, Types.PerformanceIndicatorsFiltersQueryVariables>;
export const UserRoleDocument = gql`
    query UserRole {
  userInfo {
    username
    uuid
    role
  }
}
    `;

/**
 * __useUserRoleQuery__
 *
 * To run a query within a React component, call `useUserRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRoleQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserRoleQuery(baseOptions?: Apollo.QueryHookOptions<Types.UserRoleQuery, Types.UserRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserRoleQuery, Types.UserRoleQueryVariables>(UserRoleDocument, options);
      }
export function useUserRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserRoleQuery, Types.UserRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserRoleQuery, Types.UserRoleQueryVariables>(UserRoleDocument, options);
        }
export function useUserRoleSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserRoleQuery, Types.UserRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserRoleQuery, Types.UserRoleQueryVariables>(UserRoleDocument, options);
        }
export type UserRoleQueryHookResult = ReturnType<typeof useUserRoleQuery>;
export type UserRoleLazyQueryHookResult = ReturnType<typeof useUserRoleLazyQuery>;
export type UserRoleSuspenseQueryHookResult = ReturnType<typeof useUserRoleSuspenseQuery>;
export type UserRoleQueryResult = Apollo.QueryResult<Types.UserRoleQuery, Types.UserRoleQueryVariables>;