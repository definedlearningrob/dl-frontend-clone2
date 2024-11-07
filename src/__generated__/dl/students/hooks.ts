import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const CourseDetailsFragmentDoc = gql`
    fragment CourseDetails on Course {
  thumbnailUrl
  name
  pathwayName
  onetData {
    code
    title
    alsoCalled
    whatTheyDo
    education
    onTheJob
    education
    personality {
      title
      elements
    }
    jobOutlook {
      salaryMedian
      outlook {
        category
        description
      }
      brightOutlook {
        category
        description
      }
    }
    knowledge {
      title
      elements
    }
    skills {
      title
      elements
    }
    abilities {
      title
      elements
    }
    technology {
      title
      elements
    }
    alignedCourses {
      id
      name
    }
  }
}
    `;
export const CheckInQuestionFragmentDoc = gql`
    fragment CheckInQuestion on CheckInQuestion {
  answer {
    answer
    updatedAt
    id
    grade {
      status
      createdAt
      updatedAt
      lastGradedBy {
        firstName
        lastName
      }
    }
  }
  id
  question
  step
  teamSubmission {
    id
    grade {
      status
      createdAt
      updatedAt
      lastGradedBy {
        firstName
        lastName
      }
    }
    answers {
      answer
      id
      student {
        uuid
        firstName
        lastName
      }
      updatedAt
    }
    canSubmit
  }
}
    `;
export const ProjectFragmentDataFragmentDoc = gql`
    fragment ProjectFragmentData on Task {
  assignedAt
  checkInGroups {
    displayName
    id
    name
    questions {
      ...CheckInQuestion
    }
    step
  }
  checkInQuestions {
    ...CheckInQuestion
  }
  courses {
    id
    name
    thumbnailUrl
    pathwayName
  }
  description
  displayName
  files {
    description
    displayName
    filename
    id
    step
    url
  }
  id
  introduction
  presentation(track: $trackPresentation) {
    color
    description
    displayName
    id
    name
    type
    slides {
      backgroundColor
      backgroundImage
      content {
        id
        images {
          contentId
          id
          url
          style
          thumbnailUrl
          position
        }
        links {
          targetId
          targetName
          text
          contentId
        }
        texts {
          contentId
          type
          value
          style
        }
        videos {
          id
          contentId
          url
          filename
          videoUrl
        }
      }
      description
      id
      iframeUrl
      name
      notes
      step
      template
      subslides {
        backgroundColor
        backgroundImage
        content {
          id
          images {
            contentId
            id
            url
            style
            position
          }
          links {
            targetId
            targetName
            text
            contentId
          }
          texts {
            contentId
            type
            value
            style
          }
          videos {
            id
            contentId
            url
            filename
            videoUrl
          }
        }
        description
        id
        iframeUrl
        name
        notes
        step
        template
      }
      products {
        description
        displayName
        id
        name
        rubricsUrl
        step
        submission {
          canSubmit
          createdAt
          id
          name
          productId
          status
          updatedAt
          grade {
            createdAt
            id
            pointsAvailable
            pointsScored
            updatedAt
            lastGradedBy {
              firstName
              lastName
              uuid
              fullName
            }
            results {
              criteriaId
              trait
            }
          }
          files {
            createdAt
            filename
            googleWeblink
            id
            source
            url
            submitter {
              email
              firstName
              fullName
              lastName
              username
              uuid
            }
          }
        }
        rubrics {
          description
          displayName
          hasAlignedStatements
          id
          name
          uuid
          criteriaLabels {
            displayName
            id
            score
            uuid
          }
          criterias {
            id
            rubricCriteriaLabelId
            rubricHeadingId
            text
            uuid
          }
          headings {
            id
            multiplier
            name
            uuid
          }
        }
      }
      checkInQuestions {
        id
        question
        answer {
          answer
          createdAt
          id
          name
          updatedAt
          grade {
            createdAt
            id
            status
            updatedAt
            lastGradedBy {
              email
              firstName
              fullName
              lastName
              name
              username
              uuid
              owner {
                email
                name
                username
                uuid
              }
            }
          }
        }
        step
        teamSubmission {
          canSubmit
          id
          name
          answers {
            answer
            id
            updatedAt
            student {
              email
              firstName
              fullName
              gradYear
              lastName
              name
              sisId
              username
              uuid
            }
          }
          grade {
            createdAt
            id
            status
            updatedAt
            lastGradedBy {
              email
              firstName
              fullName
              lastName
              name
              username
              uuid
            }
          }
        }
      }
      checkInGroups {
        id
        name
        displayName
        questions {
          id
          question
          step
          answer {
            answer
            createdAt
            id
            name
            updatedAt
            grade {
              createdAt
              id
              status
              updatedAt
              lastGradedBy {
                email
                firstName
                fullName
                lastName
                name
                username
                uuid
              }
            }
          }
          teamSubmission {
            canSubmit
            id
            name
            answers {
              answer
              id
              updatedAt
              student {
                email
                firstName
                fullName
                gradYear
                lastName
                name
                sisId
                username
                uuid
              }
            }
            grade {
              createdAt
              id
              status
              updatedAt
              lastGradedBy {
                email
                firstName
                fullName
                lastName
                name
                username
                uuid
              }
            }
          }
        }
      }
    }
    status
    transition
    typography
  }
  presentationUrl
  standard
  studentResources
  units {
    displayName
    id
  }
}
    ${CheckInQuestionFragmentDoc}`;
export const DlCreateCheckInQuestionAnswerDocument = gql`
    mutation DlCreateCheckInQuestionAnswer($input: CreateCheckInQuestionAnswerMutationInput!) {
  createCheckInQuestionAnswer(input: $input) {
    checkInQuestionAnswer {
      answer
      id
      grade {
        status
        createdAt
        updatedAt
        lastGradedBy {
          firstName
          lastName
        }
      }
    }
  }
}
    `;
export type DlCreateCheckInQuestionAnswerMutationFn = Apollo.MutationFunction<Types.DlCreateCheckInQuestionAnswerMutation, Types.DlCreateCheckInQuestionAnswerMutationVariables>;

/**
 * __useDlCreateCheckInQuestionAnswerMutation__
 *
 * To run a mutation, you first call `useDlCreateCheckInQuestionAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDlCreateCheckInQuestionAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dlCreateCheckInQuestionAnswerMutation, { data, loading, error }] = useDlCreateCheckInQuestionAnswerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDlCreateCheckInQuestionAnswerMutation(baseOptions?: Apollo.MutationHookOptions<Types.DlCreateCheckInQuestionAnswerMutation, Types.DlCreateCheckInQuestionAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DlCreateCheckInQuestionAnswerMutation, Types.DlCreateCheckInQuestionAnswerMutationVariables>(DlCreateCheckInQuestionAnswerDocument, options);
      }
export type DlCreateCheckInQuestionAnswerMutationHookResult = ReturnType<typeof useDlCreateCheckInQuestionAnswerMutation>;
export type DlCreateCheckInQuestionAnswerMutationResult = Apollo.MutationResult<Types.DlCreateCheckInQuestionAnswerMutation>;
export type DlCreateCheckInQuestionAnswerMutationOptions = Apollo.BaseMutationOptions<Types.DlCreateCheckInQuestionAnswerMutation, Types.DlCreateCheckInQuestionAnswerMutationVariables>;
export const CreateProductSubmissionDocument = gql`
    mutation CreateProductSubmission($input: CreateProductSubmissionMutationInput!) {
  createProductSubmission(input: $input) {
    productSubmission {
      id
      status
    }
  }
}
    `;
export type CreateProductSubmissionMutationFn = Apollo.MutationFunction<Types.CreateProductSubmissionMutation, Types.CreateProductSubmissionMutationVariables>;

/**
 * __useCreateProductSubmissionMutation__
 *
 * To run a mutation, you first call `useCreateProductSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductSubmissionMutation, { data, loading, error }] = useCreateProductSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateProductSubmissionMutation, Types.CreateProductSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateProductSubmissionMutation, Types.CreateProductSubmissionMutationVariables>(CreateProductSubmissionDocument, options);
      }
export type CreateProductSubmissionMutationHookResult = ReturnType<typeof useCreateProductSubmissionMutation>;
export type CreateProductSubmissionMutationResult = Apollo.MutationResult<Types.CreateProductSubmissionMutation>;
export type CreateProductSubmissionMutationOptions = Apollo.BaseMutationOptions<Types.CreateProductSubmissionMutation, Types.CreateProductSubmissionMutationVariables>;
export const CreateTeamCheckInSubmissionDocument = gql`
    mutation CreateTeamCheckInSubmission($input: CreateTeamCheckInSubmissionMutationInput!) {
  createTeamCheckInSubmission(input: $input) {
    teamCheckInSubmission {
      id
      grade {
        status
        createdAt
        updatedAt
        lastGradedBy {
          firstName
          lastName
        }
      }
      answers {
        answer
        id
        student {
          uuid
          firstName
          lastName
        }
        updatedAt
      }
      canSubmit
    }
  }
}
    `;
export type CreateTeamCheckInSubmissionMutationFn = Apollo.MutationFunction<Types.CreateTeamCheckInSubmissionMutation, Types.CreateTeamCheckInSubmissionMutationVariables>;

/**
 * __useCreateTeamCheckInSubmissionMutation__
 *
 * To run a mutation, you first call `useCreateTeamCheckInSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamCheckInSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamCheckInSubmissionMutation, { data, loading, error }] = useCreateTeamCheckInSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTeamCheckInSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateTeamCheckInSubmissionMutation, Types.CreateTeamCheckInSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateTeamCheckInSubmissionMutation, Types.CreateTeamCheckInSubmissionMutationVariables>(CreateTeamCheckInSubmissionDocument, options);
      }
export type CreateTeamCheckInSubmissionMutationHookResult = ReturnType<typeof useCreateTeamCheckInSubmissionMutation>;
export type CreateTeamCheckInSubmissionMutationResult = Apollo.MutationResult<Types.CreateTeamCheckInSubmissionMutation>;
export type CreateTeamCheckInSubmissionMutationOptions = Apollo.BaseMutationOptions<Types.CreateTeamCheckInSubmissionMutation, Types.CreateTeamCheckInSubmissionMutationVariables>;
export const CreateTeamCheckInSubmissionAnswerDocument = gql`
    mutation CreateTeamCheckInSubmissionAnswer($input: CreateTeamCheckInSubmissionAnswerMutationInput!) {
  createTeamCheckInSubmissionAnswer(input: $input) {
    teamCheckInSubmissionAnswer {
      id
      answer
      student {
        uuid
        firstName
        lastName
      }
      updatedAt
    }
  }
}
    `;
export type CreateTeamCheckInSubmissionAnswerMutationFn = Apollo.MutationFunction<Types.CreateTeamCheckInSubmissionAnswerMutation, Types.CreateTeamCheckInSubmissionAnswerMutationVariables>;

/**
 * __useCreateTeamCheckInSubmissionAnswerMutation__
 *
 * To run a mutation, you first call `useCreateTeamCheckInSubmissionAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamCheckInSubmissionAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamCheckInSubmissionAnswerMutation, { data, loading, error }] = useCreateTeamCheckInSubmissionAnswerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTeamCheckInSubmissionAnswerMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateTeamCheckInSubmissionAnswerMutation, Types.CreateTeamCheckInSubmissionAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateTeamCheckInSubmissionAnswerMutation, Types.CreateTeamCheckInSubmissionAnswerMutationVariables>(CreateTeamCheckInSubmissionAnswerDocument, options);
      }
export type CreateTeamCheckInSubmissionAnswerMutationHookResult = ReturnType<typeof useCreateTeamCheckInSubmissionAnswerMutation>;
export type CreateTeamCheckInSubmissionAnswerMutationResult = Apollo.MutationResult<Types.CreateTeamCheckInSubmissionAnswerMutation>;
export type CreateTeamCheckInSubmissionAnswerMutationOptions = Apollo.BaseMutationOptions<Types.CreateTeamCheckInSubmissionAnswerMutation, Types.CreateTeamCheckInSubmissionAnswerMutationVariables>;
export const EnrollInProjectDocument = gql`
    mutation EnrollInProject($input: EnrollInTaskMutationInput!) {
  enrollInProject: enrollInTask(input: $input) {
    status
  }
}
    `;
export type EnrollInProjectMutationFn = Apollo.MutationFunction<Types.EnrollInProjectMutation, Types.EnrollInProjectMutationVariables>;

/**
 * __useEnrollInProjectMutation__
 *
 * To run a mutation, you first call `useEnrollInProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollInProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollInProjectMutation, { data, loading, error }] = useEnrollInProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEnrollInProjectMutation(baseOptions?: Apollo.MutationHookOptions<Types.EnrollInProjectMutation, Types.EnrollInProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.EnrollInProjectMutation, Types.EnrollInProjectMutationVariables>(EnrollInProjectDocument, options);
      }
export type EnrollInProjectMutationHookResult = ReturnType<typeof useEnrollInProjectMutation>;
export type EnrollInProjectMutationResult = Apollo.MutationResult<Types.EnrollInProjectMutation>;
export type EnrollInProjectMutationOptions = Apollo.BaseMutationOptions<Types.EnrollInProjectMutation, Types.EnrollInProjectMutationVariables>;
export const DlUpdateCheckInQuestionAnswerDocument = gql`
    mutation DlUpdateCheckInQuestionAnswer($input: UpdateCheckInQuestionAnswerMutationInput!) {
  updateCheckInQuestionAnswer(input: $input) {
    checkInQuestionAnswer {
      answer
      id
      updatedAt
    }
  }
}
    `;
export type DlUpdateCheckInQuestionAnswerMutationFn = Apollo.MutationFunction<Types.DlUpdateCheckInQuestionAnswerMutation, Types.DlUpdateCheckInQuestionAnswerMutationVariables>;

/**
 * __useDlUpdateCheckInQuestionAnswerMutation__
 *
 * To run a mutation, you first call `useDlUpdateCheckInQuestionAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDlUpdateCheckInQuestionAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dlUpdateCheckInQuestionAnswerMutation, { data, loading, error }] = useDlUpdateCheckInQuestionAnswerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDlUpdateCheckInQuestionAnswerMutation(baseOptions?: Apollo.MutationHookOptions<Types.DlUpdateCheckInQuestionAnswerMutation, Types.DlUpdateCheckInQuestionAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DlUpdateCheckInQuestionAnswerMutation, Types.DlUpdateCheckInQuestionAnswerMutationVariables>(DlUpdateCheckInQuestionAnswerDocument, options);
      }
export type DlUpdateCheckInQuestionAnswerMutationHookResult = ReturnType<typeof useDlUpdateCheckInQuestionAnswerMutation>;
export type DlUpdateCheckInQuestionAnswerMutationResult = Apollo.MutationResult<Types.DlUpdateCheckInQuestionAnswerMutation>;
export type DlUpdateCheckInQuestionAnswerMutationOptions = Apollo.BaseMutationOptions<Types.DlUpdateCheckInQuestionAnswerMutation, Types.DlUpdateCheckInQuestionAnswerMutationVariables>;
export const UpdateProductSubmissionDocument = gql`
    mutation UpdateProductSubmission($input: UpdateProductSubmissionMutationInput!) {
  updateProductSubmission(input: $input) {
    productSubmission {
      id
      status
    }
  }
}
    `;
export type UpdateProductSubmissionMutationFn = Apollo.MutationFunction<Types.UpdateProductSubmissionMutation, Types.UpdateProductSubmissionMutationVariables>;

/**
 * __useUpdateProductSubmissionMutation__
 *
 * To run a mutation, you first call `useUpdateProductSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductSubmissionMutation, { data, loading, error }] = useUpdateProductSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateProductSubmissionMutation, Types.UpdateProductSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateProductSubmissionMutation, Types.UpdateProductSubmissionMutationVariables>(UpdateProductSubmissionDocument, options);
      }
export type UpdateProductSubmissionMutationHookResult = ReturnType<typeof useUpdateProductSubmissionMutation>;
export type UpdateProductSubmissionMutationResult = Apollo.MutationResult<Types.UpdateProductSubmissionMutation>;
export type UpdateProductSubmissionMutationOptions = Apollo.BaseMutationOptions<Types.UpdateProductSubmissionMutation, Types.UpdateProductSubmissionMutationVariables>;
export const UpdateTeamCheckInSubmissionAnswerDocument = gql`
    mutation UpdateTeamCheckInSubmissionAnswer($input: UpdateTeamCheckInSubmissionAnswerMutationInput!) {
  updateTeamCheckInSubmissionAnswer(input: $input) {
    teamCheckInSubmissionAnswer {
      id
      answer
      student {
        uuid
        firstName
        lastName
      }
      updatedAt
    }
  }
}
    `;
export type UpdateTeamCheckInSubmissionAnswerMutationFn = Apollo.MutationFunction<Types.UpdateTeamCheckInSubmissionAnswerMutation, Types.UpdateTeamCheckInSubmissionAnswerMutationVariables>;

/**
 * __useUpdateTeamCheckInSubmissionAnswerMutation__
 *
 * To run a mutation, you first call `useUpdateTeamCheckInSubmissionAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamCheckInSubmissionAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamCheckInSubmissionAnswerMutation, { data, loading, error }] = useUpdateTeamCheckInSubmissionAnswerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTeamCheckInSubmissionAnswerMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateTeamCheckInSubmissionAnswerMutation, Types.UpdateTeamCheckInSubmissionAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateTeamCheckInSubmissionAnswerMutation, Types.UpdateTeamCheckInSubmissionAnswerMutationVariables>(UpdateTeamCheckInSubmissionAnswerDocument, options);
      }
export type UpdateTeamCheckInSubmissionAnswerMutationHookResult = ReturnType<typeof useUpdateTeamCheckInSubmissionAnswerMutation>;
export type UpdateTeamCheckInSubmissionAnswerMutationResult = Apollo.MutationResult<Types.UpdateTeamCheckInSubmissionAnswerMutation>;
export type UpdateTeamCheckInSubmissionAnswerMutationOptions = Apollo.BaseMutationOptions<Types.UpdateTeamCheckInSubmissionAnswerMutation, Types.UpdateTeamCheckInSubmissionAnswerMutationVariables>;
export const StudentLtiResourceDocument = gql`
    query StudentLtiResource($ltiResourceLinkId: String, $contextId: String) {
  ltiResource(ltiResourceLinkId: $ltiResourceLinkId, contextId: $contextId) {
    ltiResourceLinkId
    contextId
    taskId
    productId
    originatorId
  }
}
    `;

/**
 * __useStudentLtiResourceQuery__
 *
 * To run a query within a React component, call `useStudentLtiResourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentLtiResourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentLtiResourceQuery({
 *   variables: {
 *      ltiResourceLinkId: // value for 'ltiResourceLinkId'
 *      contextId: // value for 'contextId'
 *   },
 * });
 */
export function useStudentLtiResourceQuery(baseOptions?: Apollo.QueryHookOptions<Types.StudentLtiResourceQuery, Types.StudentLtiResourceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentLtiResourceQuery, Types.StudentLtiResourceQueryVariables>(StudentLtiResourceDocument, options);
      }
export function useStudentLtiResourceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentLtiResourceQuery, Types.StudentLtiResourceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentLtiResourceQuery, Types.StudentLtiResourceQueryVariables>(StudentLtiResourceDocument, options);
        }
export function useStudentLtiResourceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentLtiResourceQuery, Types.StudentLtiResourceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentLtiResourceQuery, Types.StudentLtiResourceQueryVariables>(StudentLtiResourceDocument, options);
        }
export type StudentLtiResourceQueryHookResult = ReturnType<typeof useStudentLtiResourceQuery>;
export type StudentLtiResourceLazyQueryHookResult = ReturnType<typeof useStudentLtiResourceLazyQuery>;
export type StudentLtiResourceSuspenseQueryHookResult = ReturnType<typeof useStudentLtiResourceSuspenseQuery>;
export type StudentLtiResourceQueryResult = Apollo.QueryResult<Types.StudentLtiResourceQuery, Types.StudentLtiResourceQueryVariables>;
export const StudentMyClassesDocument = gql`
    query StudentMyClasses {
  myClasses {
    name
    uuid
  }
}
    `;

/**
 * __useStudentMyClassesQuery__
 *
 * To run a query within a React component, call `useStudentMyClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentMyClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentMyClassesQuery({
 *   variables: {
 *   },
 * });
 */
export function useStudentMyClassesQuery(baseOptions?: Apollo.QueryHookOptions<Types.StudentMyClassesQuery, Types.StudentMyClassesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentMyClassesQuery, Types.StudentMyClassesQueryVariables>(StudentMyClassesDocument, options);
      }
export function useStudentMyClassesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentMyClassesQuery, Types.StudentMyClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentMyClassesQuery, Types.StudentMyClassesQueryVariables>(StudentMyClassesDocument, options);
        }
export function useStudentMyClassesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentMyClassesQuery, Types.StudentMyClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentMyClassesQuery, Types.StudentMyClassesQueryVariables>(StudentMyClassesDocument, options);
        }
export type StudentMyClassesQueryHookResult = ReturnType<typeof useStudentMyClassesQuery>;
export type StudentMyClassesLazyQueryHookResult = ReturnType<typeof useStudentMyClassesLazyQuery>;
export type StudentMyClassesSuspenseQueryHookResult = ReturnType<typeof useStudentMyClassesSuspenseQuery>;
export type StudentMyClassesQueryResult = Apollo.QueryResult<Types.StudentMyClassesQuery, Types.StudentMyClassesQueryVariables>;
export const StudentMyProjectsDocument = gql`
    query StudentMyProjects($page: Int, $perPage: Int) {
  myProjects: myTasks(page: $page, perPage: $perPage) {
    nodes {
      id
      assignedAt
      description
      displayName
      originator {
        firstName
        lastName
      }
      thumbnailUrl
      team {
        id
        name
      }
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useStudentMyProjectsQuery__
 *
 * To run a query within a React component, call `useStudentMyProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentMyProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentMyProjectsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useStudentMyProjectsQuery(baseOptions?: Apollo.QueryHookOptions<Types.StudentMyProjectsQuery, Types.StudentMyProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentMyProjectsQuery, Types.StudentMyProjectsQueryVariables>(StudentMyProjectsDocument, options);
      }
export function useStudentMyProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentMyProjectsQuery, Types.StudentMyProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentMyProjectsQuery, Types.StudentMyProjectsQueryVariables>(StudentMyProjectsDocument, options);
        }
export function useStudentMyProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentMyProjectsQuery, Types.StudentMyProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentMyProjectsQuery, Types.StudentMyProjectsQueryVariables>(StudentMyProjectsDocument, options);
        }
export type StudentMyProjectsQueryHookResult = ReturnType<typeof useStudentMyProjectsQuery>;
export type StudentMyProjectsLazyQueryHookResult = ReturnType<typeof useStudentMyProjectsLazyQuery>;
export type StudentMyProjectsSuspenseQueryHookResult = ReturnType<typeof useStudentMyProjectsSuspenseQuery>;
export type StudentMyProjectsQueryResult = Apollo.QueryResult<Types.StudentMyProjectsQuery, Types.StudentMyProjectsQueryVariables>;
export const DlNotificationsDocument = gql`
    query DlNotifications($scope: NotificationStatus, $page: Int, $perPage: Int) {
  notifications(scope: $scope, page: $page, perPage: $perPage) {
    nodesCount
    pagesCount
    nodes {
      actor {
        firstName
        lastName
        uuid
      }
      body
      id
      read
      target {
        id
      }
      updatedAt
    }
  }
}
    `;

/**
 * __useDlNotificationsQuery__
 *
 * To run a query within a React component, call `useDlNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDlNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDlNotificationsQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useDlNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<Types.DlNotificationsQuery, Types.DlNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DlNotificationsQuery, Types.DlNotificationsQueryVariables>(DlNotificationsDocument, options);
      }
export function useDlNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DlNotificationsQuery, Types.DlNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DlNotificationsQuery, Types.DlNotificationsQueryVariables>(DlNotificationsDocument, options);
        }
export function useDlNotificationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DlNotificationsQuery, Types.DlNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DlNotificationsQuery, Types.DlNotificationsQueryVariables>(DlNotificationsDocument, options);
        }
export type DlNotificationsQueryHookResult = ReturnType<typeof useDlNotificationsQuery>;
export type DlNotificationsLazyQueryHookResult = ReturnType<typeof useDlNotificationsLazyQuery>;
export type DlNotificationsSuspenseQueryHookResult = ReturnType<typeof useDlNotificationsSuspenseQuery>;
export type DlNotificationsQueryResult = Apollo.QueryResult<Types.DlNotificationsQuery, Types.DlNotificationsQueryVariables>;
export const StudentProjectDocument = gql`
    query StudentProject($id: ID!, $track: Boolean, $trackPresentation: Boolean) {
  project: task(id: $id, track: $track) {
    ...ProjectFragmentData
  }
}
    ${ProjectFragmentDataFragmentDoc}`;

/**
 * __useStudentProjectQuery__
 *
 * To run a query within a React component, call `useStudentProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *      track: // value for 'track'
 *      trackPresentation: // value for 'trackPresentation'
 *   },
 * });
 */
export function useStudentProjectQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentProjectQuery, Types.StudentProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentProjectQuery, Types.StudentProjectQueryVariables>(StudentProjectDocument, options);
      }
export function useStudentProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentProjectQuery, Types.StudentProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentProjectQuery, Types.StudentProjectQueryVariables>(StudentProjectDocument, options);
        }
export function useStudentProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentProjectQuery, Types.StudentProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentProjectQuery, Types.StudentProjectQueryVariables>(StudentProjectDocument, options);
        }
export type StudentProjectQueryHookResult = ReturnType<typeof useStudentProjectQuery>;
export type StudentProjectLazyQueryHookResult = ReturnType<typeof useStudentProjectLazyQuery>;
export type StudentProjectSuspenseQueryHookResult = ReturnType<typeof useStudentProjectSuspenseQuery>;
export type StudentProjectQueryResult = Apollo.QueryResult<Types.StudentProjectQuery, Types.StudentProjectQueryVariables>;
export const StudentProjectProductsDocument = gql`
    query StudentProjectProducts($id: ID!, $teamId: ID) {
  project: task(id: $id, teamId: $teamId) {
    id
    products {
      description
      displayName
      id
      name
      rubrics {
        criteriaLabels {
          displayName
          id
          score
        }
        criterias {
          id
          rubricCriteriaLabelId
          rubricHeadingId
          text
        }
        description
        headings {
          id
          multiplier
          name
        }
        id
        name
        displayName
      }
      submission {
        id
        canSubmit
        files {
          createdAt
          filename
          googleWeblink
          id
          source
          submitter {
            uuid
            firstName
            lastName
          }
          url(options: {responseContentDisposition: "attachment"})
          previewUrl: url
        }
        grade {
          updatedAt
          lastGradedBy {
            firstName
            lastName
          }
          pointsAvailable
          pointsScored
          results {
            criteriaId
            trait
          }
        }
        status
        updatedAt
      }
    }
  }
}
    `;

/**
 * __useStudentProjectProductsQuery__
 *
 * To run a query within a React component, call `useStudentProjectProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentProjectProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentProjectProductsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useStudentProjectProductsQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentProjectProductsQuery, Types.StudentProjectProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentProjectProductsQuery, Types.StudentProjectProductsQueryVariables>(StudentProjectProductsDocument, options);
      }
export function useStudentProjectProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentProjectProductsQuery, Types.StudentProjectProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentProjectProductsQuery, Types.StudentProjectProductsQueryVariables>(StudentProjectProductsDocument, options);
        }
export function useStudentProjectProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentProjectProductsQuery, Types.StudentProjectProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentProjectProductsQuery, Types.StudentProjectProductsQueryVariables>(StudentProjectProductsDocument, options);
        }
export type StudentProjectProductsQueryHookResult = ReturnType<typeof useStudentProjectProductsQuery>;
export type StudentProjectProductsLazyQueryHookResult = ReturnType<typeof useStudentProjectProductsLazyQuery>;
export type StudentProjectProductsSuspenseQueryHookResult = ReturnType<typeof useStudentProjectProductsSuspenseQuery>;
export type StudentProjectProductsQueryResult = Apollo.QueryResult<Types.StudentProjectProductsQuery, Types.StudentProjectProductsQueryVariables>;
export const StudentProjectStandardsDocument = gql`
    query StudentProjectStandards($projectId: ID!, $setId: String!) {
  project: task(id: $projectId) {
    id
    standards(setId: $setId) {
      grade
      standardNumber
      standardText
      subject
    }
  }
}
    `;

/**
 * __useStudentProjectStandardsQuery__
 *
 * To run a query within a React component, call `useStudentProjectStandardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentProjectStandardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentProjectStandardsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      setId: // value for 'setId'
 *   },
 * });
 */
export function useStudentProjectStandardsQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentProjectStandardsQuery, Types.StudentProjectStandardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentProjectStandardsQuery, Types.StudentProjectStandardsQueryVariables>(StudentProjectStandardsDocument, options);
      }
export function useStudentProjectStandardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentProjectStandardsQuery, Types.StudentProjectStandardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentProjectStandardsQuery, Types.StudentProjectStandardsQueryVariables>(StudentProjectStandardsDocument, options);
        }
export function useStudentProjectStandardsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentProjectStandardsQuery, Types.StudentProjectStandardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentProjectStandardsQuery, Types.StudentProjectStandardsQueryVariables>(StudentProjectStandardsDocument, options);
        }
export type StudentProjectStandardsQueryHookResult = ReturnType<typeof useStudentProjectStandardsQuery>;
export type StudentProjectStandardsLazyQueryHookResult = ReturnType<typeof useStudentProjectStandardsLazyQuery>;
export type StudentProjectStandardsSuspenseQueryHookResult = ReturnType<typeof useStudentProjectStandardsSuspenseQuery>;
export type StudentProjectStandardsQueryResult = Apollo.QueryResult<Types.StudentProjectStandardsQuery, Types.StudentProjectStandardsQueryVariables>;
export const TeamProjectDocument = gql`
    query TeamProject($id: ID!, $track: Boolean, $trackPresentation: Boolean, $teamId: ID) {
  project: task(id: $id, track: $track, teamId: $teamId) {
    ...ProjectFragmentData
    team {
      id
      name
      uuid
    }
  }
}
    ${ProjectFragmentDataFragmentDoc}`;

/**
 * __useTeamProjectQuery__
 *
 * To run a query within a React component, call `useTeamProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *      track: // value for 'track'
 *      trackPresentation: // value for 'trackPresentation'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useTeamProjectQuery(baseOptions: Apollo.QueryHookOptions<Types.TeamProjectQuery, Types.TeamProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TeamProjectQuery, Types.TeamProjectQueryVariables>(TeamProjectDocument, options);
      }
export function useTeamProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TeamProjectQuery, Types.TeamProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TeamProjectQuery, Types.TeamProjectQueryVariables>(TeamProjectDocument, options);
        }
export function useTeamProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TeamProjectQuery, Types.TeamProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TeamProjectQuery, Types.TeamProjectQueryVariables>(TeamProjectDocument, options);
        }
export type TeamProjectQueryHookResult = ReturnType<typeof useTeamProjectQuery>;
export type TeamProjectLazyQueryHookResult = ReturnType<typeof useTeamProjectLazyQuery>;
export type TeamProjectSuspenseQueryHookResult = ReturnType<typeof useTeamProjectSuspenseQuery>;
export type TeamProjectQueryResult = Apollo.QueryResult<Types.TeamProjectQuery, Types.TeamProjectQueryVariables>;
export const DlStudentInfoDocument = gql`
    query DlStudentInfo {
  userInfo {
    currentSchoolYear
    hasAccessToCareers
    isImpersonated
    logoUrl
    iconUrl
    email
    hasPlans
    hasUnreadConversation
    unreadNotificationsCount
    firstName
    lastName
    definedLearningUuid
    standardSets {
      id
      name
      setId
    }
    username
    uuid
    settings {
      selfEvaluationEnabled
    }
    ltiDetails {
      isLti
      ltiContextId
      ltiConsumerKey
      ltiResourceLinkId
    }
    welcomeMessage
  }
}
    `;

/**
 * __useDlStudentInfoQuery__
 *
 * To run a query within a React component, call `useDlStudentInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useDlStudentInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDlStudentInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useDlStudentInfoQuery(baseOptions?: Apollo.QueryHookOptions<Types.DlStudentInfoQuery, Types.DlStudentInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DlStudentInfoQuery, Types.DlStudentInfoQueryVariables>(DlStudentInfoDocument, options);
      }
export function useDlStudentInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DlStudentInfoQuery, Types.DlStudentInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DlStudentInfoQuery, Types.DlStudentInfoQueryVariables>(DlStudentInfoDocument, options);
        }
export function useDlStudentInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DlStudentInfoQuery, Types.DlStudentInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DlStudentInfoQuery, Types.DlStudentInfoQueryVariables>(DlStudentInfoDocument, options);
        }
export type DlStudentInfoQueryHookResult = ReturnType<typeof useDlStudentInfoQuery>;
export type DlStudentInfoLazyQueryHookResult = ReturnType<typeof useDlStudentInfoLazyQuery>;
export type DlStudentInfoSuspenseQueryHookResult = ReturnType<typeof useDlStudentInfoSuspenseQuery>;
export type DlStudentInfoQueryResult = Apollo.QueryResult<Types.DlStudentInfoQuery, Types.DlStudentInfoQueryVariables>;