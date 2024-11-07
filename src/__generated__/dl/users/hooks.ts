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
export const ProjectDataFragmentDoc = gql`
    fragment ProjectData on Task {
  assignedStudentsCount
  copies {
    id
  }
  checkInGroups {
    displayName
    id
    name
    questions {
      id
      gradingNeededCount
      question
      step
      isHidden
      owner {
        uuid
      }
    }
    step
  }
  checkInQuestions {
    id
    gradingNeededCount
    question
    step
    owner {
      uuid
    }
  }
  checkInsGradingNeededCount
  courses {
    id
    name
    thumbnailUrl
    pathwayName
    type
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
  owner {
    uuid
  }
  presentation(track: $trackPresentation) {
    color
    description
    displayName
    id
    name
    slides {
      products {
        id
        name
        displayName
        description
        submissionsGradingNeededCount
        gradingNeededCount
        rubrics {
          canEdit
          description
          displayName
          hasAlignedStatements
          id
          name
          pointsAvailable
          uuid
          criterias {
            id
            rubricCriteriaLabelId
            rubricHeadingId
            text
            uuid
          }
          criteriaLabels {
            displayName
            id
            score
            uuid
          }
          headings {
            id
            multiplier
            name
            uuid
          }
        }
        rubricsUrl
        step
      }
      checkInQuestions {
        gradingNeededCount
        id
        isArchived
        question
        step
        owner {
          email
          firstName
          lastName
          username
          uuid
        }
      }
      checkInGroups {
        displayName
        id
        name
        questions {
          id
          question
          step
        }
      }
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
    }
    type
    status
    transition
    typography
  }
  presentationUrl
  sharedResource {
    allowLogin
    code
  }
  standard
  status
  studentResources
  submissionsGradingNeededCount
  teachingResources
  units {
    displayName
    id
  }
  thumbnailUrl
}
    `;
export const StudentsFragmentDoc = gql`
    fragment Students on SchoolClass {
  students(page: 1, perPage: 1000) {
    nodes {
      currentTasksCount
      firstName
      lastName
      uuid
      hasPlans
      plans {
        id
      }
    }
    nodesCount
    pagesCount
  }
}
    `;
export const TeamFragmentDoc = gql`
    fragment Team on Team {
  id
  uuid
  name
  isArchived
  students(page: 1, perPage: 1000) {
    nodes {
      currentTasksCount
      firstName
      lastName
      uuid
    }
    nodesCount
    pagesCount
  }
  tasks {
    displayName
    id
  }
}
    `;
export const AppendCheckInItemsToTaskDocument = gql`
    mutation AppendCheckInItemsToTask($input: AppendCheckInItemsToTaskMutationInput!) {
  appendCheckInItemsToTask(input: $input) {
    task {
      id
      checkInQuestions {
        id
        isArchived
        owner {
          uuid
        }
        question
        step
      }
    }
  }
}
    `;
export type AppendCheckInItemsToTaskMutationFn = Apollo.MutationFunction<Types.AppendCheckInItemsToTaskMutation, Types.AppendCheckInItemsToTaskMutationVariables>;

/**
 * __useAppendCheckInItemsToTaskMutation__
 *
 * To run a mutation, you first call `useAppendCheckInItemsToTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppendCheckInItemsToTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appendCheckInItemsToTaskMutation, { data, loading, error }] = useAppendCheckInItemsToTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAppendCheckInItemsToTaskMutation(baseOptions?: Apollo.MutationHookOptions<Types.AppendCheckInItemsToTaskMutation, Types.AppendCheckInItemsToTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AppendCheckInItemsToTaskMutation, Types.AppendCheckInItemsToTaskMutationVariables>(AppendCheckInItemsToTaskDocument, options);
      }
export type AppendCheckInItemsToTaskMutationHookResult = ReturnType<typeof useAppendCheckInItemsToTaskMutation>;
export type AppendCheckInItemsToTaskMutationResult = Apollo.MutationResult<Types.AppendCheckInItemsToTaskMutation>;
export type AppendCheckInItemsToTaskMutationOptions = Apollo.BaseMutationOptions<Types.AppendCheckInItemsToTaskMutation, Types.AppendCheckInItemsToTaskMutationVariables>;
export const DlArchiveCheckInQuestionDocument = gql`
    mutation DlArchiveCheckInQuestion($input: ArchiveCheckInQuestionMutationInput!) {
  archiveCheckInQuestion(input: $input) {
    checkInQuestion {
      id
    }
  }
}
    `;
export type DlArchiveCheckInQuestionMutationFn = Apollo.MutationFunction<Types.DlArchiveCheckInQuestionMutation, Types.DlArchiveCheckInQuestionMutationVariables>;

/**
 * __useDlArchiveCheckInQuestionMutation__
 *
 * To run a mutation, you first call `useDlArchiveCheckInQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDlArchiveCheckInQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dlArchiveCheckInQuestionMutation, { data, loading, error }] = useDlArchiveCheckInQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDlArchiveCheckInQuestionMutation(baseOptions?: Apollo.MutationHookOptions<Types.DlArchiveCheckInQuestionMutation, Types.DlArchiveCheckInQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DlArchiveCheckInQuestionMutation, Types.DlArchiveCheckInQuestionMutationVariables>(DlArchiveCheckInQuestionDocument, options);
      }
export type DlArchiveCheckInQuestionMutationHookResult = ReturnType<typeof useDlArchiveCheckInQuestionMutation>;
export type DlArchiveCheckInQuestionMutationResult = Apollo.MutationResult<Types.DlArchiveCheckInQuestionMutation>;
export type DlArchiveCheckInQuestionMutationOptions = Apollo.BaseMutationOptions<Types.DlArchiveCheckInQuestionMutation, Types.DlArchiveCheckInQuestionMutationVariables>;
export const ArchiveProjectDocument = gql`
    mutation ArchiveProject($input: ArchiveTaskMutationInput!) {
  archiveTask(input: $input) {
    task {
      id
      isArchived
    }
  }
}
    `;
export type ArchiveProjectMutationFn = Apollo.MutationFunction<Types.ArchiveProjectMutation, Types.ArchiveProjectMutationVariables>;

/**
 * __useArchiveProjectMutation__
 *
 * To run a mutation, you first call `useArchiveProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveProjectMutation, { data, loading, error }] = useArchiveProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveProjectMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveProjectMutation, Types.ArchiveProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveProjectMutation, Types.ArchiveProjectMutationVariables>(ArchiveProjectDocument, options);
      }
export type ArchiveProjectMutationHookResult = ReturnType<typeof useArchiveProjectMutation>;
export type ArchiveProjectMutationResult = Apollo.MutationResult<Types.ArchiveProjectMutation>;
export type ArchiveProjectMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveProjectMutation, Types.ArchiveProjectMutationVariables>;
export const ArchiveTeamDocument = gql`
    mutation ArchiveTeam($input: ArchiveTeamMutationInput!) {
  archiveTeam(input: $input) {
    team {
      ...Team
    }
  }
}
    ${TeamFragmentDoc}`;
export type ArchiveTeamMutationFn = Apollo.MutationFunction<Types.ArchiveTeamMutation, Types.ArchiveTeamMutationVariables>;

/**
 * __useArchiveTeamMutation__
 *
 * To run a mutation, you first call `useArchiveTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveTeamMutation, { data, loading, error }] = useArchiveTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveTeamMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveTeamMutation, Types.ArchiveTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveTeamMutation, Types.ArchiveTeamMutationVariables>(ArchiveTeamDocument, options);
      }
export type ArchiveTeamMutationHookResult = ReturnType<typeof useArchiveTeamMutation>;
export type ArchiveTeamMutationResult = Apollo.MutationResult<Types.ArchiveTeamMutation>;
export type ArchiveTeamMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveTeamMutation, Types.ArchiveTeamMutationVariables>;
export const AssignStudentToProjectDocument = gql`
    mutation AssignStudentToProject($input: AssignStudentToTaskMutationInput!) {
  assignStudentToTask(input: $input) {
    status
  }
}
    `;
export type AssignStudentToProjectMutationFn = Apollo.MutationFunction<Types.AssignStudentToProjectMutation, Types.AssignStudentToProjectMutationVariables>;

/**
 * __useAssignStudentToProjectMutation__
 *
 * To run a mutation, you first call `useAssignStudentToProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignStudentToProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignStudentToProjectMutation, { data, loading, error }] = useAssignStudentToProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignStudentToProjectMutation(baseOptions?: Apollo.MutationHookOptions<Types.AssignStudentToProjectMutation, Types.AssignStudentToProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AssignStudentToProjectMutation, Types.AssignStudentToProjectMutationVariables>(AssignStudentToProjectDocument, options);
      }
export type AssignStudentToProjectMutationHookResult = ReturnType<typeof useAssignStudentToProjectMutation>;
export type AssignStudentToProjectMutationResult = Apollo.MutationResult<Types.AssignStudentToProjectMutation>;
export type AssignStudentToProjectMutationOptions = Apollo.BaseMutationOptions<Types.AssignStudentToProjectMutation, Types.AssignStudentToProjectMutationVariables>;
export const AssignTeamsToTaskDocument = gql`
    mutation AssignTeamsToTask($input: AssignTeamsToTaskMutationInput!) {
  assignTeamsToTask(input: $input) {
    teams {
      uuid
    }
  }
}
    `;
export type AssignTeamsToTaskMutationFn = Apollo.MutationFunction<Types.AssignTeamsToTaskMutation, Types.AssignTeamsToTaskMutationVariables>;

/**
 * __useAssignTeamsToTaskMutation__
 *
 * To run a mutation, you first call `useAssignTeamsToTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignTeamsToTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignTeamsToTaskMutation, { data, loading, error }] = useAssignTeamsToTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignTeamsToTaskMutation(baseOptions?: Apollo.MutationHookOptions<Types.AssignTeamsToTaskMutation, Types.AssignTeamsToTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AssignTeamsToTaskMutation, Types.AssignTeamsToTaskMutationVariables>(AssignTeamsToTaskDocument, options);
      }
export type AssignTeamsToTaskMutationHookResult = ReturnType<typeof useAssignTeamsToTaskMutation>;
export type AssignTeamsToTaskMutationResult = Apollo.MutationResult<Types.AssignTeamsToTaskMutation>;
export type AssignTeamsToTaskMutationOptions = Apollo.BaseMutationOptions<Types.AssignTeamsToTaskMutation, Types.AssignTeamsToTaskMutationVariables>;
export const DlCreateCheckInQuestionDocument = gql`
    mutation DlCreateCheckInQuestion($input: CreateCheckInQuestionMutationInput!) {
  createCheckInQuestion(input: $input) {
    checkInQuestion {
      id
      isArchived
      question
      step
      owner {
        uuid
      }
    }
  }
}
    `;
export type DlCreateCheckInQuestionMutationFn = Apollo.MutationFunction<Types.DlCreateCheckInQuestionMutation, Types.DlCreateCheckInQuestionMutationVariables>;

/**
 * __useDlCreateCheckInQuestionMutation__
 *
 * To run a mutation, you first call `useDlCreateCheckInQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDlCreateCheckInQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dlCreateCheckInQuestionMutation, { data, loading, error }] = useDlCreateCheckInQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDlCreateCheckInQuestionMutation(baseOptions?: Apollo.MutationHookOptions<Types.DlCreateCheckInQuestionMutation, Types.DlCreateCheckInQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DlCreateCheckInQuestionMutation, Types.DlCreateCheckInQuestionMutationVariables>(DlCreateCheckInQuestionDocument, options);
      }
export type DlCreateCheckInQuestionMutationHookResult = ReturnType<typeof useDlCreateCheckInQuestionMutation>;
export type DlCreateCheckInQuestionMutationResult = Apollo.MutationResult<Types.DlCreateCheckInQuestionMutation>;
export type DlCreateCheckInQuestionMutationOptions = Apollo.BaseMutationOptions<Types.DlCreateCheckInQuestionMutation, Types.DlCreateCheckInQuestionMutationVariables>;
export const CreatePresentationDocument = gql`
    mutation CreatePresentation($input: CreatePresentationMutationInput!) {
  createPresentation(input: $input) {
    presentation {
      id
      name
    }
  }
}
    `;
export type CreatePresentationMutationFn = Apollo.MutationFunction<Types.CreatePresentationMutation, Types.CreatePresentationMutationVariables>;

/**
 * __useCreatePresentationMutation__
 *
 * To run a mutation, you first call `useCreatePresentationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePresentationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPresentationMutation, { data, loading, error }] = useCreatePresentationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePresentationMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreatePresentationMutation, Types.CreatePresentationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreatePresentationMutation, Types.CreatePresentationMutationVariables>(CreatePresentationDocument, options);
      }
export type CreatePresentationMutationHookResult = ReturnType<typeof useCreatePresentationMutation>;
export type CreatePresentationMutationResult = Apollo.MutationResult<Types.CreatePresentationMutation>;
export type CreatePresentationMutationOptions = Apollo.BaseMutationOptions<Types.CreatePresentationMutation, Types.CreatePresentationMutationVariables>;
export const CreatePublicResourceDocument = gql`
    mutation CreatePublicResource($input: CreatePublicResourceMutationInput!) {
  createPublicResource(input: $input) {
    publicResource {
      id
      url
    }
  }
}
    `;
export type CreatePublicResourceMutationFn = Apollo.MutationFunction<Types.CreatePublicResourceMutation, Types.CreatePublicResourceMutationVariables>;

/**
 * __useCreatePublicResourceMutation__
 *
 * To run a mutation, you first call `useCreatePublicResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePublicResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPublicResourceMutation, { data, loading, error }] = useCreatePublicResourceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePublicResourceMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreatePublicResourceMutation, Types.CreatePublicResourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreatePublicResourceMutation, Types.CreatePublicResourceMutationVariables>(CreatePublicResourceDocument, options);
      }
export type CreatePublicResourceMutationHookResult = ReturnType<typeof useCreatePublicResourceMutation>;
export type CreatePublicResourceMutationResult = Apollo.MutationResult<Types.CreatePublicResourceMutation>;
export type CreatePublicResourceMutationOptions = Apollo.BaseMutationOptions<Types.CreatePublicResourceMutation, Types.CreatePublicResourceMutationVariables>;
export const CreateQuickTaskDocument = gql`
    mutation CreateQuickTask($input: CreateQuickTaskMutationInput!) {
  createQuickTask(input: $input) {
    task {
      id
    }
  }
}
    `;
export type CreateQuickTaskMutationFn = Apollo.MutationFunction<Types.CreateQuickTaskMutation, Types.CreateQuickTaskMutationVariables>;

/**
 * __useCreateQuickTaskMutation__
 *
 * To run a mutation, you first call `useCreateQuickTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuickTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuickTaskMutation, { data, loading, error }] = useCreateQuickTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateQuickTaskMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateQuickTaskMutation, Types.CreateQuickTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateQuickTaskMutation, Types.CreateQuickTaskMutationVariables>(CreateQuickTaskDocument, options);
      }
export type CreateQuickTaskMutationHookResult = ReturnType<typeof useCreateQuickTaskMutation>;
export type CreateQuickTaskMutationResult = Apollo.MutationResult<Types.CreateQuickTaskMutation>;
export type CreateQuickTaskMutationOptions = Apollo.BaseMutationOptions<Types.CreateQuickTaskMutation, Types.CreateQuickTaskMutationVariables>;
export const CreateStudentSubmissionDocument = gql`
    mutation CreateStudentSubmission($input: CreateStudentSubmissionMutationInput!) {
  createProductSubmission: createStudentSubmission(input: $input) {
    productSubmission {
      id
    }
  }
}
    `;
export type CreateStudentSubmissionMutationFn = Apollo.MutationFunction<Types.CreateStudentSubmissionMutation, Types.CreateStudentSubmissionMutationVariables>;

/**
 * __useCreateStudentSubmissionMutation__
 *
 * To run a mutation, you first call `useCreateStudentSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudentSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudentSubmissionMutation, { data, loading, error }] = useCreateStudentSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStudentSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateStudentSubmissionMutation, Types.CreateStudentSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateStudentSubmissionMutation, Types.CreateStudentSubmissionMutationVariables>(CreateStudentSubmissionDocument, options);
      }
export type CreateStudentSubmissionMutationHookResult = ReturnType<typeof useCreateStudentSubmissionMutation>;
export type CreateStudentSubmissionMutationResult = Apollo.MutationResult<Types.CreateStudentSubmissionMutation>;
export type CreateStudentSubmissionMutationOptions = Apollo.BaseMutationOptions<Types.CreateStudentSubmissionMutation, Types.CreateStudentSubmissionMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($input: CreateTeamMutationInput!) {
  createTeam(input: $input) {
    team {
      ...Team
    }
  }
}
    ${TeamFragmentDoc}`;
export type CreateTeamMutationFn = Apollo.MutationFunction<Types.CreateTeamMutation, Types.CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateTeamMutation, Types.CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateTeamMutation, Types.CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<Types.CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<Types.CreateTeamMutation, Types.CreateTeamMutationVariables>;
export const CreateTeamSubmissionDocument = gql`
    mutation CreateTeamSubmission($input: CreateTeamSubmissionMutationInput!) {
  createProductSubmission: createTeamSubmission(input: $input) {
    productSubmission {
      id
    }
  }
}
    `;
export type CreateTeamSubmissionMutationFn = Apollo.MutationFunction<Types.CreateTeamSubmissionMutation, Types.CreateTeamSubmissionMutationVariables>;

/**
 * __useCreateTeamSubmissionMutation__
 *
 * To run a mutation, you first call `useCreateTeamSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamSubmissionMutation, { data, loading, error }] = useCreateTeamSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTeamSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateTeamSubmissionMutation, Types.CreateTeamSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateTeamSubmissionMutation, Types.CreateTeamSubmissionMutationVariables>(CreateTeamSubmissionDocument, options);
      }
export type CreateTeamSubmissionMutationHookResult = ReturnType<typeof useCreateTeamSubmissionMutation>;
export type CreateTeamSubmissionMutationResult = Apollo.MutationResult<Types.CreateTeamSubmissionMutation>;
export type CreateTeamSubmissionMutationOptions = Apollo.BaseMutationOptions<Types.CreateTeamSubmissionMutation, Types.CreateTeamSubmissionMutationVariables>;
export const DuplicateProjectDocument = gql`
    mutation DuplicateProject($input: DuplicateTaskMutationInput!) {
  duplicateTask(input: $input) {
    project: task {
      id
    }
  }
}
    `;
export type DuplicateProjectMutationFn = Apollo.MutationFunction<Types.DuplicateProjectMutation, Types.DuplicateProjectMutationVariables>;

/**
 * __useDuplicateProjectMutation__
 *
 * To run a mutation, you first call `useDuplicateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateProjectMutation, { data, loading, error }] = useDuplicateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDuplicateProjectMutation(baseOptions?: Apollo.MutationHookOptions<Types.DuplicateProjectMutation, Types.DuplicateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DuplicateProjectMutation, Types.DuplicateProjectMutationVariables>(DuplicateProjectDocument, options);
      }
export type DuplicateProjectMutationHookResult = ReturnType<typeof useDuplicateProjectMutation>;
export type DuplicateProjectMutationResult = Apollo.MutationResult<Types.DuplicateProjectMutation>;
export type DuplicateProjectMutationOptions = Apollo.BaseMutationOptions<Types.DuplicateProjectMutation, Types.DuplicateProjectMutationVariables>;
export const DuplicateTaskDocument = gql`
    mutation DuplicateTask($input: DuplicateTaskMutationInput!) {
  duplicateTask(input: $input) {
    task {
      id
      name
      assignedAt
    }
  }
}
    `;
export type DuplicateTaskMutationFn = Apollo.MutationFunction<Types.DuplicateTaskMutation, Types.DuplicateTaskMutationVariables>;

/**
 * __useDuplicateTaskMutation__
 *
 * To run a mutation, you first call `useDuplicateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateTaskMutation, { data, loading, error }] = useDuplicateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDuplicateTaskMutation(baseOptions?: Apollo.MutationHookOptions<Types.DuplicateTaskMutation, Types.DuplicateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DuplicateTaskMutation, Types.DuplicateTaskMutationVariables>(DuplicateTaskDocument, options);
      }
export type DuplicateTaskMutationHookResult = ReturnType<typeof useDuplicateTaskMutation>;
export type DuplicateTaskMutationResult = Apollo.MutationResult<Types.DuplicateTaskMutation>;
export type DuplicateTaskMutationOptions = Apollo.BaseMutationOptions<Types.DuplicateTaskMutation, Types.DuplicateTaskMutationVariables>;
export const GradeProductSubmissionDocument = gql`
    mutation GradeProductSubmission($input: GradeProductSubmissionMutationInput!) {
  gradeProductSubmission(input: $input) {
    grade {
      lastGradedBy {
        uuid
        name
      }
      updatedAt
      pointsAvailable
      pointsScored
      results {
        criteriaId
        trait
      }
    }
  }
}
    `;
export type GradeProductSubmissionMutationFn = Apollo.MutationFunction<Types.GradeProductSubmissionMutation, Types.GradeProductSubmissionMutationVariables>;

/**
 * __useGradeProductSubmissionMutation__
 *
 * To run a mutation, you first call `useGradeProductSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGradeProductSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gradeProductSubmissionMutation, { data, loading, error }] = useGradeProductSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGradeProductSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<Types.GradeProductSubmissionMutation, Types.GradeProductSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.GradeProductSubmissionMutation, Types.GradeProductSubmissionMutationVariables>(GradeProductSubmissionDocument, options);
      }
export type GradeProductSubmissionMutationHookResult = ReturnType<typeof useGradeProductSubmissionMutation>;
export type GradeProductSubmissionMutationResult = Apollo.MutationResult<Types.GradeProductSubmissionMutation>;
export type GradeProductSubmissionMutationOptions = Apollo.BaseMutationOptions<Types.GradeProductSubmissionMutation, Types.GradeProductSubmissionMutationVariables>;
export const GradeSubmissionDocument = gql`
    mutation GradeSubmission($input: GradeCheckInSubmissionMutationInput!) {
  gradeCheckInSubmission(input: $input) {
    submissionGrade {
      id
      status
      updatedAt
      lastGradedBy {
        firstName
        lastName
      }
    }
  }
}
    `;
export type GradeSubmissionMutationFn = Apollo.MutationFunction<Types.GradeSubmissionMutation, Types.GradeSubmissionMutationVariables>;

/**
 * __useGradeSubmissionMutation__
 *
 * To run a mutation, you first call `useGradeSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGradeSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gradeSubmissionMutation, { data, loading, error }] = useGradeSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGradeSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<Types.GradeSubmissionMutation, Types.GradeSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.GradeSubmissionMutation, Types.GradeSubmissionMutationVariables>(GradeSubmissionDocument, options);
      }
export type GradeSubmissionMutationHookResult = ReturnType<typeof useGradeSubmissionMutation>;
export type GradeSubmissionMutationResult = Apollo.MutationResult<Types.GradeSubmissionMutation>;
export type GradeSubmissionMutationOptions = Apollo.BaseMutationOptions<Types.GradeSubmissionMutation, Types.GradeSubmissionMutationVariables>;
export const RecordProductDocument = gql`
    mutation RecordProduct($input: UpdateLtiResourceMutationInput!) {
  updateLtiResource(input: $input) {
    ltiResource {
      ltiResourceLinkId
      contextId
      consumerKey
    }
    product {
      name
    }
    task {
      name
    }
    user {
      dlUuid: definedLearningUuid
    }
  }
}
    `;
export type RecordProductMutationFn = Apollo.MutationFunction<Types.RecordProductMutation, Types.RecordProductMutationVariables>;

/**
 * __useRecordProductMutation__
 *
 * To run a mutation, you first call `useRecordProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecordProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recordProductMutation, { data, loading, error }] = useRecordProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRecordProductMutation(baseOptions?: Apollo.MutationHookOptions<Types.RecordProductMutation, Types.RecordProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.RecordProductMutation, Types.RecordProductMutationVariables>(RecordProductDocument, options);
      }
export type RecordProductMutationHookResult = ReturnType<typeof useRecordProductMutation>;
export type RecordProductMutationResult = Apollo.MutationResult<Types.RecordProductMutation>;
export type RecordProductMutationOptions = Apollo.BaseMutationOptions<Types.RecordProductMutation, Types.RecordProductMutationVariables>;
export const RestoreProjectDocument = gql`
    mutation RestoreProject($input: RestoreTaskMutationInput!) {
  restoreTask(input: $input) {
    task {
      id
      isArchived
    }
  }
}
    `;
export type RestoreProjectMutationFn = Apollo.MutationFunction<Types.RestoreProjectMutation, Types.RestoreProjectMutationVariables>;

/**
 * __useRestoreProjectMutation__
 *
 * To run a mutation, you first call `useRestoreProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreProjectMutation, { data, loading, error }] = useRestoreProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRestoreProjectMutation(baseOptions?: Apollo.MutationHookOptions<Types.RestoreProjectMutation, Types.RestoreProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.RestoreProjectMutation, Types.RestoreProjectMutationVariables>(RestoreProjectDocument, options);
      }
export type RestoreProjectMutationHookResult = ReturnType<typeof useRestoreProjectMutation>;
export type RestoreProjectMutationResult = Apollo.MutationResult<Types.RestoreProjectMutation>;
export type RestoreProjectMutationOptions = Apollo.BaseMutationOptions<Types.RestoreProjectMutation, Types.RestoreProjectMutationVariables>;
export const ShareResourceDocument = gql`
    mutation ShareResource($input: ShareResourceMutationInput!) {
  shareResource(input: $input) {
    sharedResource {
      allowLogin
      code
    }
  }
}
    `;
export type ShareResourceMutationFn = Apollo.MutationFunction<Types.ShareResourceMutation, Types.ShareResourceMutationVariables>;

/**
 * __useShareResourceMutation__
 *
 * To run a mutation, you first call `useShareResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShareResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shareResourceMutation, { data, loading, error }] = useShareResourceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useShareResourceMutation(baseOptions?: Apollo.MutationHookOptions<Types.ShareResourceMutation, Types.ShareResourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ShareResourceMutation, Types.ShareResourceMutationVariables>(ShareResourceDocument, options);
      }
export type ShareResourceMutationHookResult = ReturnType<typeof useShareResourceMutation>;
export type ShareResourceMutationResult = Apollo.MutationResult<Types.ShareResourceMutation>;
export type ShareResourceMutationOptions = Apollo.BaseMutationOptions<Types.ShareResourceMutation, Types.ShareResourceMutationVariables>;
export const ToggleCheckInQuestionHiddenDocument = gql`
    mutation ToggleCheckInQuestionHidden($input: ToggleCheckInQuestionHiddenMutationInput!) {
  toggleCheckInQuestionHidden(input: $input) {
    checkInGroup {
      id
      questions {
        id
        isHidden
      }
    }
  }
}
    `;
export type ToggleCheckInQuestionHiddenMutationFn = Apollo.MutationFunction<Types.ToggleCheckInQuestionHiddenMutation, Types.ToggleCheckInQuestionHiddenMutationVariables>;

/**
 * __useToggleCheckInQuestionHiddenMutation__
 *
 * To run a mutation, you first call `useToggleCheckInQuestionHiddenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleCheckInQuestionHiddenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleCheckInQuestionHiddenMutation, { data, loading, error }] = useToggleCheckInQuestionHiddenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleCheckInQuestionHiddenMutation(baseOptions?: Apollo.MutationHookOptions<Types.ToggleCheckInQuestionHiddenMutation, Types.ToggleCheckInQuestionHiddenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ToggleCheckInQuestionHiddenMutation, Types.ToggleCheckInQuestionHiddenMutationVariables>(ToggleCheckInQuestionHiddenDocument, options);
      }
export type ToggleCheckInQuestionHiddenMutationHookResult = ReturnType<typeof useToggleCheckInQuestionHiddenMutation>;
export type ToggleCheckInQuestionHiddenMutationResult = Apollo.MutationResult<Types.ToggleCheckInQuestionHiddenMutation>;
export type ToggleCheckInQuestionHiddenMutationOptions = Apollo.BaseMutationOptions<Types.ToggleCheckInQuestionHiddenMutation, Types.ToggleCheckInQuestionHiddenMutationVariables>;
export const ToggleProductHiddenDocument = gql`
    mutation ToggleProductHidden($input: ToggleProductHiddenMutationInput!) {
  toggleProductHidden(input: $input) {
    task {
      id
      products {
        id
        hidden
      }
    }
  }
}
    `;
export type ToggleProductHiddenMutationFn = Apollo.MutationFunction<Types.ToggleProductHiddenMutation, Types.ToggleProductHiddenMutationVariables>;

/**
 * __useToggleProductHiddenMutation__
 *
 * To run a mutation, you first call `useToggleProductHiddenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleProductHiddenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleProductHiddenMutation, { data, loading, error }] = useToggleProductHiddenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleProductHiddenMutation(baseOptions?: Apollo.MutationHookOptions<Types.ToggleProductHiddenMutation, Types.ToggleProductHiddenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ToggleProductHiddenMutation, Types.ToggleProductHiddenMutationVariables>(ToggleProductHiddenDocument, options);
      }
export type ToggleProductHiddenMutationHookResult = ReturnType<typeof useToggleProductHiddenMutation>;
export type ToggleProductHiddenMutationResult = Apollo.MutationResult<Types.ToggleProductHiddenMutation>;
export type ToggleProductHiddenMutationOptions = Apollo.BaseMutationOptions<Types.ToggleProductHiddenMutation, Types.ToggleProductHiddenMutationVariables>;
export const UnassignStudentFromProjectDocument = gql`
    mutation UnassignStudentFromProject($input: UnassignStudentFromTaskMutationInput!) {
  unassignStudentFromTask(input: $input) {
    status
  }
}
    `;
export type UnassignStudentFromProjectMutationFn = Apollo.MutationFunction<Types.UnassignStudentFromProjectMutation, Types.UnassignStudentFromProjectMutationVariables>;

/**
 * __useUnassignStudentFromProjectMutation__
 *
 * To run a mutation, you first call `useUnassignStudentFromProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignStudentFromProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignStudentFromProjectMutation, { data, loading, error }] = useUnassignStudentFromProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnassignStudentFromProjectMutation(baseOptions?: Apollo.MutationHookOptions<Types.UnassignStudentFromProjectMutation, Types.UnassignStudentFromProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UnassignStudentFromProjectMutation, Types.UnassignStudentFromProjectMutationVariables>(UnassignStudentFromProjectDocument, options);
      }
export type UnassignStudentFromProjectMutationHookResult = ReturnType<typeof useUnassignStudentFromProjectMutation>;
export type UnassignStudentFromProjectMutationResult = Apollo.MutationResult<Types.UnassignStudentFromProjectMutation>;
export type UnassignStudentFromProjectMutationOptions = Apollo.BaseMutationOptions<Types.UnassignStudentFromProjectMutation, Types.UnassignStudentFromProjectMutationVariables>;
export const UnassignTeamsFromTaskDocument = gql`
    mutation UnassignTeamsFromTask($input: UnassignTeamsFromTaskMutationInput!) {
  unassignTeamsFromTask(input: $input) {
    teams {
      uuid
    }
  }
}
    `;
export type UnassignTeamsFromTaskMutationFn = Apollo.MutationFunction<Types.UnassignTeamsFromTaskMutation, Types.UnassignTeamsFromTaskMutationVariables>;

/**
 * __useUnassignTeamsFromTaskMutation__
 *
 * To run a mutation, you first call `useUnassignTeamsFromTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignTeamsFromTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignTeamsFromTaskMutation, { data, loading, error }] = useUnassignTeamsFromTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnassignTeamsFromTaskMutation(baseOptions?: Apollo.MutationHookOptions<Types.UnassignTeamsFromTaskMutation, Types.UnassignTeamsFromTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UnassignTeamsFromTaskMutation, Types.UnassignTeamsFromTaskMutationVariables>(UnassignTeamsFromTaskDocument, options);
      }
export type UnassignTeamsFromTaskMutationHookResult = ReturnType<typeof useUnassignTeamsFromTaskMutation>;
export type UnassignTeamsFromTaskMutationResult = Apollo.MutationResult<Types.UnassignTeamsFromTaskMutation>;
export type UnassignTeamsFromTaskMutationOptions = Apollo.BaseMutationOptions<Types.UnassignTeamsFromTaskMutation, Types.UnassignTeamsFromTaskMutationVariables>;
export const DlUpdateCheckInQuestionDocument = gql`
    mutation DlUpdateCheckInQuestion($input: UpdateCheckInQuestionMutationInput!) {
  updateCheckInQuestion(input: $input) {
    checkInQuestion {
      id
      question
      tasks {
        id
        displayName
      }
    }
  }
}
    `;
export type DlUpdateCheckInQuestionMutationFn = Apollo.MutationFunction<Types.DlUpdateCheckInQuestionMutation, Types.DlUpdateCheckInQuestionMutationVariables>;

/**
 * __useDlUpdateCheckInQuestionMutation__
 *
 * To run a mutation, you first call `useDlUpdateCheckInQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDlUpdateCheckInQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dlUpdateCheckInQuestionMutation, { data, loading, error }] = useDlUpdateCheckInQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDlUpdateCheckInQuestionMutation(baseOptions?: Apollo.MutationHookOptions<Types.DlUpdateCheckInQuestionMutation, Types.DlUpdateCheckInQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DlUpdateCheckInQuestionMutation, Types.DlUpdateCheckInQuestionMutationVariables>(DlUpdateCheckInQuestionDocument, options);
      }
export type DlUpdateCheckInQuestionMutationHookResult = ReturnType<typeof useDlUpdateCheckInQuestionMutation>;
export type DlUpdateCheckInQuestionMutationResult = Apollo.MutationResult<Types.DlUpdateCheckInQuestionMutation>;
export type DlUpdateCheckInQuestionMutationOptions = Apollo.BaseMutationOptions<Types.DlUpdateCheckInQuestionMutation, Types.DlUpdateCheckInQuestionMutationVariables>;
export const DlUpdateEntitySettingsDocument = gql`
    mutation DlUpdateEntitySettings($input: UpdateEntitySettingsMutationInput!) {
  updateEntitySettings(input: $input) {
    entity {
      settings {
        selfEvaluationEnabled
      }
      uuid
    }
  }
}
    `;
export type DlUpdateEntitySettingsMutationFn = Apollo.MutationFunction<Types.DlUpdateEntitySettingsMutation, Types.DlUpdateEntitySettingsMutationVariables>;

/**
 * __useDlUpdateEntitySettingsMutation__
 *
 * To run a mutation, you first call `useDlUpdateEntitySettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDlUpdateEntitySettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dlUpdateEntitySettingsMutation, { data, loading, error }] = useDlUpdateEntitySettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDlUpdateEntitySettingsMutation(baseOptions?: Apollo.MutationHookOptions<Types.DlUpdateEntitySettingsMutation, Types.DlUpdateEntitySettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DlUpdateEntitySettingsMutation, Types.DlUpdateEntitySettingsMutationVariables>(DlUpdateEntitySettingsDocument, options);
      }
export type DlUpdateEntitySettingsMutationHookResult = ReturnType<typeof useDlUpdateEntitySettingsMutation>;
export type DlUpdateEntitySettingsMutationResult = Apollo.MutationResult<Types.DlUpdateEntitySettingsMutation>;
export type DlUpdateEntitySettingsMutationOptions = Apollo.BaseMutationOptions<Types.DlUpdateEntitySettingsMutation, Types.DlUpdateEntitySettingsMutationVariables>;
export const UpdateLtiResourceGradeDocument = gql`
    mutation UpdateLtiResourceGrade($input: UpdateLtiResourceGradeMutationInput!) {
  updateLtiResourceGrade(input: $input) {
    ltiResource {
      ltiResourceLinkId
    }
  }
}
    `;
export type UpdateLtiResourceGradeMutationFn = Apollo.MutationFunction<Types.UpdateLtiResourceGradeMutation, Types.UpdateLtiResourceGradeMutationVariables>;

/**
 * __useUpdateLtiResourceGradeMutation__
 *
 * To run a mutation, you first call `useUpdateLtiResourceGradeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLtiResourceGradeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLtiResourceGradeMutation, { data, loading, error }] = useUpdateLtiResourceGradeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLtiResourceGradeMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateLtiResourceGradeMutation, Types.UpdateLtiResourceGradeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateLtiResourceGradeMutation, Types.UpdateLtiResourceGradeMutationVariables>(UpdateLtiResourceGradeDocument, options);
      }
export type UpdateLtiResourceGradeMutationHookResult = ReturnType<typeof useUpdateLtiResourceGradeMutation>;
export type UpdateLtiResourceGradeMutationResult = Apollo.MutationResult<Types.UpdateLtiResourceGradeMutation>;
export type UpdateLtiResourceGradeMutationOptions = Apollo.BaseMutationOptions<Types.UpdateLtiResourceGradeMutation, Types.UpdateLtiResourceGradeMutationVariables>;
export const UpdateProjectCheckInGroupDocument = gql`
    mutation UpdateProjectCheckInGroup($input: UpdateTaskMutationInput!) {
  updateTask(input: $input) {
    project: task {
      checkInGroups {
        displayName
        id
        name
        questions {
          id
          isArchived
          owner {
            uuid
          }
          question
          step
        }
        step
      }
    }
  }
}
    `;
export type UpdateProjectCheckInGroupMutationFn = Apollo.MutationFunction<Types.UpdateProjectCheckInGroupMutation, Types.UpdateProjectCheckInGroupMutationVariables>;

/**
 * __useUpdateProjectCheckInGroupMutation__
 *
 * To run a mutation, you first call `useUpdateProjectCheckInGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectCheckInGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectCheckInGroupMutation, { data, loading, error }] = useUpdateProjectCheckInGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectCheckInGroupMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateProjectCheckInGroupMutation, Types.UpdateProjectCheckInGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateProjectCheckInGroupMutation, Types.UpdateProjectCheckInGroupMutationVariables>(UpdateProjectCheckInGroupDocument, options);
      }
export type UpdateProjectCheckInGroupMutationHookResult = ReturnType<typeof useUpdateProjectCheckInGroupMutation>;
export type UpdateProjectCheckInGroupMutationResult = Apollo.MutationResult<Types.UpdateProjectCheckInGroupMutation>;
export type UpdateProjectCheckInGroupMutationOptions = Apollo.BaseMutationOptions<Types.UpdateProjectCheckInGroupMutation, Types.UpdateProjectCheckInGroupMutationVariables>;
export const UpdateProjectCheckInQuestionDocument = gql`
    mutation UpdateProjectCheckInQuestion($input: UpdateTaskMutationInput!) {
  updateTask(input: $input) {
    project: task {
      checkInQuestions {
        id
        isArchived
        question
        step
        owner {
          uuid
        }
      }
    }
  }
}
    `;
export type UpdateProjectCheckInQuestionMutationFn = Apollo.MutationFunction<Types.UpdateProjectCheckInQuestionMutation, Types.UpdateProjectCheckInQuestionMutationVariables>;

/**
 * __useUpdateProjectCheckInQuestionMutation__
 *
 * To run a mutation, you first call `useUpdateProjectCheckInQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectCheckInQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectCheckInQuestionMutation, { data, loading, error }] = useUpdateProjectCheckInQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectCheckInQuestionMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateProjectCheckInQuestionMutation, Types.UpdateProjectCheckInQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateProjectCheckInQuestionMutation, Types.UpdateProjectCheckInQuestionMutationVariables>(UpdateProjectCheckInQuestionDocument, options);
      }
export type UpdateProjectCheckInQuestionMutationHookResult = ReturnType<typeof useUpdateProjectCheckInQuestionMutation>;
export type UpdateProjectCheckInQuestionMutationResult = Apollo.MutationResult<Types.UpdateProjectCheckInQuestionMutation>;
export type UpdateProjectCheckInQuestionMutationOptions = Apollo.BaseMutationOptions<Types.UpdateProjectCheckInQuestionMutation, Types.UpdateProjectCheckInQuestionMutationVariables>;
export const UpdateProjectDescriptionDocument = gql`
    mutation UpdateProjectDescription($input: UpdateTaskMutationInput!) {
  updateTask(input: $input) {
    project: task {
      id
      description
    }
  }
}
    `;
export type UpdateProjectDescriptionMutationFn = Apollo.MutationFunction<Types.UpdateProjectDescriptionMutation, Types.UpdateProjectDescriptionMutationVariables>;

/**
 * __useUpdateProjectDescriptionMutation__
 *
 * To run a mutation, you first call `useUpdateProjectDescriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectDescriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectDescriptionMutation, { data, loading, error }] = useUpdateProjectDescriptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateProjectDescriptionMutation, Types.UpdateProjectDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateProjectDescriptionMutation, Types.UpdateProjectDescriptionMutationVariables>(UpdateProjectDescriptionDocument, options);
      }
export type UpdateProjectDescriptionMutationHookResult = ReturnType<typeof useUpdateProjectDescriptionMutation>;
export type UpdateProjectDescriptionMutationResult = Apollo.MutationResult<Types.UpdateProjectDescriptionMutation>;
export type UpdateProjectDescriptionMutationOptions = Apollo.BaseMutationOptions<Types.UpdateProjectDescriptionMutation, Types.UpdateProjectDescriptionMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($input: UpdateTaskMutationInput!) {
  updateTask(input: $input) {
    project: task {
      id
      displayName
    }
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<Types.UpdateTaskMutation, Types.UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateTaskMutation, Types.UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateTaskMutation, Types.UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<Types.UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<Types.UpdateTaskMutation, Types.UpdateTaskMutationVariables>;
export const UpdateIntroductionDocument = gql`
    mutation UpdateIntroduction($input: UpdateTaskMutationInput!) {
  updateTask(input: $input) {
    project: task {
      id
      introduction
    }
  }
}
    `;
export type UpdateIntroductionMutationFn = Apollo.MutationFunction<Types.UpdateIntroductionMutation, Types.UpdateIntroductionMutationVariables>;

/**
 * __useUpdateIntroductionMutation__
 *
 * To run a mutation, you first call `useUpdateIntroductionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIntroductionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIntroductionMutation, { data, loading, error }] = useUpdateIntroductionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIntroductionMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateIntroductionMutation, Types.UpdateIntroductionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateIntroductionMutation, Types.UpdateIntroductionMutationVariables>(UpdateIntroductionDocument, options);
      }
export type UpdateIntroductionMutationHookResult = ReturnType<typeof useUpdateIntroductionMutation>;
export type UpdateIntroductionMutationResult = Apollo.MutationResult<Types.UpdateIntroductionMutation>;
export type UpdateIntroductionMutationOptions = Apollo.BaseMutationOptions<Types.UpdateIntroductionMutation, Types.UpdateIntroductionMutationVariables>;
export const UpdateProjectProductDocument = gql`
    mutation UpdateProjectProduct($input: UpdateProductMutationInput!) {
  updateProduct(input: $input) {
    product {
      id
      description
      displayName
    }
  }
}
    `;
export type UpdateProjectProductMutationFn = Apollo.MutationFunction<Types.UpdateProjectProductMutation, Types.UpdateProjectProductMutationVariables>;

/**
 * __useUpdateProjectProductMutation__
 *
 * To run a mutation, you first call `useUpdateProjectProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectProductMutation, { data, loading, error }] = useUpdateProjectProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectProductMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateProjectProductMutation, Types.UpdateProjectProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateProjectProductMutation, Types.UpdateProjectProductMutationVariables>(UpdateProjectProductDocument, options);
      }
export type UpdateProjectProductMutationHookResult = ReturnType<typeof useUpdateProjectProductMutation>;
export type UpdateProjectProductMutationResult = Apollo.MutationResult<Types.UpdateProjectProductMutation>;
export type UpdateProjectProductMutationOptions = Apollo.BaseMutationOptions<Types.UpdateProjectProductMutation, Types.UpdateProjectProductMutationVariables>;
export const UpdateProjectStatusDocument = gql`
    mutation UpdateProjectStatus($input: UpdateTaskMutationInput!) {
  updateTask(input: $input) {
    project: task {
      id
      status
    }
  }
}
    `;
export type UpdateProjectStatusMutationFn = Apollo.MutationFunction<Types.UpdateProjectStatusMutation, Types.UpdateProjectStatusMutationVariables>;

/**
 * __useUpdateProjectStatusMutation__
 *
 * To run a mutation, you first call `useUpdateProjectStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectStatusMutation, { data, loading, error }] = useUpdateProjectStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectStatusMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateProjectStatusMutation, Types.UpdateProjectStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateProjectStatusMutation, Types.UpdateProjectStatusMutationVariables>(UpdateProjectStatusDocument, options);
      }
export type UpdateProjectStatusMutationHookResult = ReturnType<typeof useUpdateProjectStatusMutation>;
export type UpdateProjectStatusMutationResult = Apollo.MutationResult<Types.UpdateProjectStatusMutation>;
export type UpdateProjectStatusMutationOptions = Apollo.BaseMutationOptions<Types.UpdateProjectStatusMutation, Types.UpdateProjectStatusMutationVariables>;
export const UpdateStudentResourcesDocument = gql`
    mutation UpdateStudentResources($input: UpdateTaskMutationInput!) {
  updateTask(input: $input) {
    project: task {
      id
      studentResources
    }
  }
}
    `;
export type UpdateStudentResourcesMutationFn = Apollo.MutationFunction<Types.UpdateStudentResourcesMutation, Types.UpdateStudentResourcesMutationVariables>;

/**
 * __useUpdateStudentResourcesMutation__
 *
 * To run a mutation, you first call `useUpdateStudentResourcesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStudentResourcesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStudentResourcesMutation, { data, loading, error }] = useUpdateStudentResourcesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStudentResourcesMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateStudentResourcesMutation, Types.UpdateStudentResourcesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateStudentResourcesMutation, Types.UpdateStudentResourcesMutationVariables>(UpdateStudentResourcesDocument, options);
      }
export type UpdateStudentResourcesMutationHookResult = ReturnType<typeof useUpdateStudentResourcesMutation>;
export type UpdateStudentResourcesMutationResult = Apollo.MutationResult<Types.UpdateStudentResourcesMutation>;
export type UpdateStudentResourcesMutationOptions = Apollo.BaseMutationOptions<Types.UpdateStudentResourcesMutation, Types.UpdateStudentResourcesMutationVariables>;
export const UpdateTeacherResourcesDocument = gql`
    mutation UpdateTeacherResources($input: UpdateTaskMutationInput!) {
  updateTask(input: $input) {
    project: task {
      id
      teachingResources
    }
  }
}
    `;
export type UpdateTeacherResourcesMutationFn = Apollo.MutationFunction<Types.UpdateTeacherResourcesMutation, Types.UpdateTeacherResourcesMutationVariables>;

/**
 * __useUpdateTeacherResourcesMutation__
 *
 * To run a mutation, you first call `useUpdateTeacherResourcesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeacherResourcesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeacherResourcesMutation, { data, loading, error }] = useUpdateTeacherResourcesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTeacherResourcesMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateTeacherResourcesMutation, Types.UpdateTeacherResourcesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateTeacherResourcesMutation, Types.UpdateTeacherResourcesMutationVariables>(UpdateTeacherResourcesDocument, options);
      }
export type UpdateTeacherResourcesMutationHookResult = ReturnType<typeof useUpdateTeacherResourcesMutation>;
export type UpdateTeacherResourcesMutationResult = Apollo.MutationResult<Types.UpdateTeacherResourcesMutation>;
export type UpdateTeacherResourcesMutationOptions = Apollo.BaseMutationOptions<Types.UpdateTeacherResourcesMutation, Types.UpdateTeacherResourcesMutationVariables>;
export const DlUpdateRubricHeadingDocument = gql`
    mutation DlUpdateRubricHeading($input: UpdateRubricHeadingMutationInput!) {
  updateRubricHeading(input: $input) {
    rubricHeading {
      id
      multiplier
      name
    }
  }
}
    `;
export type DlUpdateRubricHeadingMutationFn = Apollo.MutationFunction<Types.DlUpdateRubricHeadingMutation, Types.DlUpdateRubricHeadingMutationVariables>;

/**
 * __useDlUpdateRubricHeadingMutation__
 *
 * To run a mutation, you first call `useDlUpdateRubricHeadingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDlUpdateRubricHeadingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dlUpdateRubricHeadingMutation, { data, loading, error }] = useDlUpdateRubricHeadingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDlUpdateRubricHeadingMutation(baseOptions?: Apollo.MutationHookOptions<Types.DlUpdateRubricHeadingMutation, Types.DlUpdateRubricHeadingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DlUpdateRubricHeadingMutation, Types.DlUpdateRubricHeadingMutationVariables>(DlUpdateRubricHeadingDocument, options);
      }
export type DlUpdateRubricHeadingMutationHookResult = ReturnType<typeof useDlUpdateRubricHeadingMutation>;
export type DlUpdateRubricHeadingMutationResult = Apollo.MutationResult<Types.DlUpdateRubricHeadingMutation>;
export type DlUpdateRubricHeadingMutationOptions = Apollo.BaseMutationOptions<Types.DlUpdateRubricHeadingMutation, Types.DlUpdateRubricHeadingMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($input: UpdateTeamMutationInput!) {
  updateTeam(input: $input) {
    team {
      ...Team
    }
  }
}
    ${TeamFragmentDoc}`;
export type UpdateTeamMutationFn = Apollo.MutationFunction<Types.UpdateTeamMutation, Types.UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateTeamMutation, Types.UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateTeamMutation, Types.UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<Types.UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<Types.UpdateTeamMutation, Types.UpdateTeamMutationVariables>;
export const AdminEntitiesDocument = gql`
    query AdminEntities($uuid: ID!, $page: Int, $perPage: Int, $filter: EntityFilter) {
  adminDashboard {
    entity(uuid: $uuid) {
      children(page: $page, perPage: $perPage, filter: $filter) {
        nodes {
          hierarchyMetrics {
            entitiesCount
            schoolClassesCount
            studentsCount
            teachersCount
          }
          name
          uuid
        }
        pagesCount
      }
      uuid
    }
  }
}
    `;

/**
 * __useAdminEntitiesQuery__
 *
 * To run a query within a React component, call `useAdminEntitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminEntitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminEntitiesQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAdminEntitiesQuery(baseOptions: Apollo.QueryHookOptions<Types.AdminEntitiesQuery, Types.AdminEntitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AdminEntitiesQuery, Types.AdminEntitiesQueryVariables>(AdminEntitiesDocument, options);
      }
export function useAdminEntitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AdminEntitiesQuery, Types.AdminEntitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AdminEntitiesQuery, Types.AdminEntitiesQueryVariables>(AdminEntitiesDocument, options);
        }
export function useAdminEntitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AdminEntitiesQuery, Types.AdminEntitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AdminEntitiesQuery, Types.AdminEntitiesQueryVariables>(AdminEntitiesDocument, options);
        }
export type AdminEntitiesQueryHookResult = ReturnType<typeof useAdminEntitiesQuery>;
export type AdminEntitiesLazyQueryHookResult = ReturnType<typeof useAdminEntitiesLazyQuery>;
export type AdminEntitiesSuspenseQueryHookResult = ReturnType<typeof useAdminEntitiesSuspenseQuery>;
export type AdminEntitiesQueryResult = Apollo.QueryResult<Types.AdminEntitiesQuery, Types.AdminEntitiesQueryVariables>;
export const DlAdminEntityInfoDocument = gql`
    query DlAdminEntityInfo($uuid: ID!, $page: Int, $perPage: Int, $filter: UserFilter) {
  adminDashboard {
    entity(uuid: $uuid) {
      uuid
      name
      hasChildren
      users(page: $page, perPage: $perPage, filter: $filter) {
        nodes {
          entity {
            name
            parent {
              name
              uuid
            }
            uuid
            hasChildren
          }
          firstName
          lastName
          role
          schoolClassesCount
          uuid
        }
      }
      hierarchyMetrics {
        studentsCount
        teachersCount
        entitiesCount
        schoolClassesCount
      }
      settings {
        selfEvaluationEnabled
        schoolYearStartDate {
          day
          month
        }
      }
      plans {
        name
      }
      catalogs {
        name
      }
      standardSets {
        name
      }
    }
  }
}
    `;

/**
 * __useDlAdminEntityInfoQuery__
 *
 * To run a query within a React component, call `useDlAdminEntityInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useDlAdminEntityInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDlAdminEntityInfoQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useDlAdminEntityInfoQuery(baseOptions: Apollo.QueryHookOptions<Types.DlAdminEntityInfoQuery, Types.DlAdminEntityInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DlAdminEntityInfoQuery, Types.DlAdminEntityInfoQueryVariables>(DlAdminEntityInfoDocument, options);
      }
export function useDlAdminEntityInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DlAdminEntityInfoQuery, Types.DlAdminEntityInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DlAdminEntityInfoQuery, Types.DlAdminEntityInfoQueryVariables>(DlAdminEntityInfoDocument, options);
        }
export function useDlAdminEntityInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DlAdminEntityInfoQuery, Types.DlAdminEntityInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DlAdminEntityInfoQuery, Types.DlAdminEntityInfoQueryVariables>(DlAdminEntityInfoDocument, options);
        }
export type DlAdminEntityInfoQueryHookResult = ReturnType<typeof useDlAdminEntityInfoQuery>;
export type DlAdminEntityInfoLazyQueryHookResult = ReturnType<typeof useDlAdminEntityInfoLazyQuery>;
export type DlAdminEntityInfoSuspenseQueryHookResult = ReturnType<typeof useDlAdminEntityInfoSuspenseQuery>;
export type DlAdminEntityInfoQueryResult = Apollo.QueryResult<Types.DlAdminEntityInfoQuery, Types.DlAdminEntityInfoQueryVariables>;
export const AssignedProjectsDocument = gql`
    query AssignedProjects($page: Int, $perPage: Int) {
  assignedProjects: assignedTasks(page: $page, perPage: $perPage) {
    nodes {
      id
      displayName
      name
      assignedAt
      status
      gradingNeeded
      owner {
        uuid
      }
      isArchived
      isAssignedByUser
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useAssignedProjectsQuery__
 *
 * To run a query within a React component, call `useAssignedProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignedProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignedProjectsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useAssignedProjectsQuery(baseOptions?: Apollo.QueryHookOptions<Types.AssignedProjectsQuery, Types.AssignedProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AssignedProjectsQuery, Types.AssignedProjectsQueryVariables>(AssignedProjectsDocument, options);
      }
export function useAssignedProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AssignedProjectsQuery, Types.AssignedProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AssignedProjectsQuery, Types.AssignedProjectsQueryVariables>(AssignedProjectsDocument, options);
        }
export function useAssignedProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AssignedProjectsQuery, Types.AssignedProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AssignedProjectsQuery, Types.AssignedProjectsQueryVariables>(AssignedProjectsDocument, options);
        }
export type AssignedProjectsQueryHookResult = ReturnType<typeof useAssignedProjectsQuery>;
export type AssignedProjectsLazyQueryHookResult = ReturnType<typeof useAssignedProjectsLazyQuery>;
export type AssignedProjectsSuspenseQueryHookResult = ReturnType<typeof useAssignedProjectsSuspenseQuery>;
export type AssignedProjectsQueryResult = Apollo.QueryResult<Types.AssignedProjectsQuery, Types.AssignedProjectsQueryVariables>;
export const AvailableFacetsResourcesDocument = gql`
    query AvailableFacetsResources {
  userInfo {
    availableResources {
      catalogs {
        displayName
      }
      tracks {
        displayName
      }
      units {
        displayName
      }
    }
    uuid
  }
}
    `;

/**
 * __useAvailableFacetsResourcesQuery__
 *
 * To run a query within a React component, call `useAvailableFacetsResourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailableFacetsResourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailableFacetsResourcesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAvailableFacetsResourcesQuery(baseOptions?: Apollo.QueryHookOptions<Types.AvailableFacetsResourcesQuery, Types.AvailableFacetsResourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AvailableFacetsResourcesQuery, Types.AvailableFacetsResourcesQueryVariables>(AvailableFacetsResourcesDocument, options);
      }
export function useAvailableFacetsResourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AvailableFacetsResourcesQuery, Types.AvailableFacetsResourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AvailableFacetsResourcesQuery, Types.AvailableFacetsResourcesQueryVariables>(AvailableFacetsResourcesDocument, options);
        }
export function useAvailableFacetsResourcesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AvailableFacetsResourcesQuery, Types.AvailableFacetsResourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AvailableFacetsResourcesQuery, Types.AvailableFacetsResourcesQueryVariables>(AvailableFacetsResourcesDocument, options);
        }
export type AvailableFacetsResourcesQueryHookResult = ReturnType<typeof useAvailableFacetsResourcesQuery>;
export type AvailableFacetsResourcesLazyQueryHookResult = ReturnType<typeof useAvailableFacetsResourcesLazyQuery>;
export type AvailableFacetsResourcesSuspenseQueryHookResult = ReturnType<typeof useAvailableFacetsResourcesSuspenseQuery>;
export type AvailableFacetsResourcesQueryResult = Apollo.QueryResult<Types.AvailableFacetsResourcesQuery, Types.AvailableFacetsResourcesQueryVariables>;
export const CheckInQuestionDocument = gql`
    query CheckInQuestion($id: ID!) {
  checkInQuestion(id: $id) {
    id
    tasks {
      id
      displayName
    }
    question
  }
}
    `;

/**
 * __useCheckInQuestionQuery__
 *
 * To run a query within a React component, call `useCheckInQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckInQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckInQuestionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckInQuestionQuery(baseOptions: Apollo.QueryHookOptions<Types.CheckInQuestionQuery, Types.CheckInQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CheckInQuestionQuery, Types.CheckInQuestionQueryVariables>(CheckInQuestionDocument, options);
      }
export function useCheckInQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CheckInQuestionQuery, Types.CheckInQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CheckInQuestionQuery, Types.CheckInQuestionQueryVariables>(CheckInQuestionDocument, options);
        }
export function useCheckInQuestionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CheckInQuestionQuery, Types.CheckInQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CheckInQuestionQuery, Types.CheckInQuestionQueryVariables>(CheckInQuestionDocument, options);
        }
export type CheckInQuestionQueryHookResult = ReturnType<typeof useCheckInQuestionQuery>;
export type CheckInQuestionLazyQueryHookResult = ReturnType<typeof useCheckInQuestionLazyQuery>;
export type CheckInQuestionSuspenseQueryHookResult = ReturnType<typeof useCheckInQuestionSuspenseQuery>;
export type CheckInQuestionQueryResult = Apollo.QueryResult<Types.CheckInQuestionQuery, Types.CheckInQuestionQueryVariables>;
export const CheckInQuestionsLibraryDocument = gql`
    query CheckInQuestionsLibrary($filter: CheckInQuestionFilter, $page: Int, $perPage: Int) {
  checkInQuestions(filter: $filter, page: $page, perPage: $perPage) {
    nodes {
      id
      question
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useCheckInQuestionsLibraryQuery__
 *
 * To run a query within a React component, call `useCheckInQuestionsLibraryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckInQuestionsLibraryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckInQuestionsLibraryQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useCheckInQuestionsLibraryQuery(baseOptions?: Apollo.QueryHookOptions<Types.CheckInQuestionsLibraryQuery, Types.CheckInQuestionsLibraryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CheckInQuestionsLibraryQuery, Types.CheckInQuestionsLibraryQueryVariables>(CheckInQuestionsLibraryDocument, options);
      }
export function useCheckInQuestionsLibraryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CheckInQuestionsLibraryQuery, Types.CheckInQuestionsLibraryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CheckInQuestionsLibraryQuery, Types.CheckInQuestionsLibraryQueryVariables>(CheckInQuestionsLibraryDocument, options);
        }
export function useCheckInQuestionsLibrarySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CheckInQuestionsLibraryQuery, Types.CheckInQuestionsLibraryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CheckInQuestionsLibraryQuery, Types.CheckInQuestionsLibraryQueryVariables>(CheckInQuestionsLibraryDocument, options);
        }
export type CheckInQuestionsLibraryQueryHookResult = ReturnType<typeof useCheckInQuestionsLibraryQuery>;
export type CheckInQuestionsLibraryLazyQueryHookResult = ReturnType<typeof useCheckInQuestionsLibraryLazyQuery>;
export type CheckInQuestionsLibrarySuspenseQueryHookResult = ReturnType<typeof useCheckInQuestionsLibrarySuspenseQuery>;
export type CheckInQuestionsLibraryQueryResult = Apollo.QueryResult<Types.CheckInQuestionsLibraryQuery, Types.CheckInQuestionsLibraryQueryVariables>;
export const CheckinQuestionToGradeDocument = gql`
    query CheckinQuestionToGrade($projectId: ID!, $questionId: ID!, $subjectUuid: ID!, $isTeamGrading: Boolean!) {
  project: task(id: $projectId) {
    id
    displayName
    checkInQuestion(id: $questionId) {
      question
      answer(studentUuid: $subjectUuid) @skip(if: $isTeamGrading) {
        id
        answer
        updatedAt
        grade {
          id
          status
          updatedAt
          lastGradedBy {
            firstName
            lastName
          }
        }
      }
      teamSubmission(teamUuid: $subjectUuid) @include(if: $isTeamGrading) {
        id
        grade {
          status
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
      }
    }
  }
}
    `;

/**
 * __useCheckinQuestionToGradeQuery__
 *
 * To run a query within a React component, call `useCheckinQuestionToGradeQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckinQuestionToGradeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckinQuestionToGradeQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      questionId: // value for 'questionId'
 *      subjectUuid: // value for 'subjectUuid'
 *      isTeamGrading: // value for 'isTeamGrading'
 *   },
 * });
 */
export function useCheckinQuestionToGradeQuery(baseOptions: Apollo.QueryHookOptions<Types.CheckinQuestionToGradeQuery, Types.CheckinQuestionToGradeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CheckinQuestionToGradeQuery, Types.CheckinQuestionToGradeQueryVariables>(CheckinQuestionToGradeDocument, options);
      }
export function useCheckinQuestionToGradeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CheckinQuestionToGradeQuery, Types.CheckinQuestionToGradeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CheckinQuestionToGradeQuery, Types.CheckinQuestionToGradeQueryVariables>(CheckinQuestionToGradeDocument, options);
        }
export function useCheckinQuestionToGradeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CheckinQuestionToGradeQuery, Types.CheckinQuestionToGradeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CheckinQuestionToGradeQuery, Types.CheckinQuestionToGradeQueryVariables>(CheckinQuestionToGradeDocument, options);
        }
export type CheckinQuestionToGradeQueryHookResult = ReturnType<typeof useCheckinQuestionToGradeQuery>;
export type CheckinQuestionToGradeLazyQueryHookResult = ReturnType<typeof useCheckinQuestionToGradeLazyQuery>;
export type CheckinQuestionToGradeSuspenseQueryHookResult = ReturnType<typeof useCheckinQuestionToGradeSuspenseQuery>;
export type CheckinQuestionToGradeQueryResult = Apollo.QueryResult<Types.CheckinQuestionToGradeQuery, Types.CheckinQuestionToGradeQueryVariables>;
export const DashboardCatalogDocument = gql`
    query DashboardCatalog($id: ID!, $page: Int, $perPage: Int) {
  catalog(id: $id) {
    description
    displayName
    id
    name
    tracksCount
    tasksCount
    courses: tracks(page: $page, perPage: $perPage) {
      nodes {
        tasksCount
        description
        displayName
        grades
        id
        imageUrl
        shortDescription
        thumbnailUrl
      }
      nodesCount
      pagesCount
    }
    thumbnailUrl
    imageUrl
  }
}
    `;

/**
 * __useDashboardCatalogQuery__
 *
 * To run a query within a React component, call `useDashboardCatalogQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardCatalogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardCatalogQuery({
 *   variables: {
 *      id: // value for 'id'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useDashboardCatalogQuery(baseOptions: Apollo.QueryHookOptions<Types.DashboardCatalogQuery, Types.DashboardCatalogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DashboardCatalogQuery, Types.DashboardCatalogQueryVariables>(DashboardCatalogDocument, options);
      }
export function useDashboardCatalogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DashboardCatalogQuery, Types.DashboardCatalogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DashboardCatalogQuery, Types.DashboardCatalogQueryVariables>(DashboardCatalogDocument, options);
        }
export function useDashboardCatalogSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DashboardCatalogQuery, Types.DashboardCatalogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DashboardCatalogQuery, Types.DashboardCatalogQueryVariables>(DashboardCatalogDocument, options);
        }
export type DashboardCatalogQueryHookResult = ReturnType<typeof useDashboardCatalogQuery>;
export type DashboardCatalogLazyQueryHookResult = ReturnType<typeof useDashboardCatalogLazyQuery>;
export type DashboardCatalogSuspenseQueryHookResult = ReturnType<typeof useDashboardCatalogSuspenseQuery>;
export type DashboardCatalogQueryResult = Apollo.QueryResult<Types.DashboardCatalogQuery, Types.DashboardCatalogQueryVariables>;
export const DashboardCatalogsDocument = gql`
    query DashboardCatalogs($page: Int, $perPage: Int) {
  catalogs(page: $page, perPage: $perPage) {
    nodes {
      courses: tracks {
        nodesCount
      }
      tracksCount
      description
      tasksCount
      displayName
      name
      id
      thumbnailUrl
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useDashboardCatalogsQuery__
 *
 * To run a query within a React component, call `useDashboardCatalogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardCatalogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardCatalogsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useDashboardCatalogsQuery(baseOptions?: Apollo.QueryHookOptions<Types.DashboardCatalogsQuery, Types.DashboardCatalogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DashboardCatalogsQuery, Types.DashboardCatalogsQueryVariables>(DashboardCatalogsDocument, options);
      }
export function useDashboardCatalogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DashboardCatalogsQuery, Types.DashboardCatalogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DashboardCatalogsQuery, Types.DashboardCatalogsQueryVariables>(DashboardCatalogsDocument, options);
        }
export function useDashboardCatalogsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DashboardCatalogsQuery, Types.DashboardCatalogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DashboardCatalogsQuery, Types.DashboardCatalogsQueryVariables>(DashboardCatalogsDocument, options);
        }
export type DashboardCatalogsQueryHookResult = ReturnType<typeof useDashboardCatalogsQuery>;
export type DashboardCatalogsLazyQueryHookResult = ReturnType<typeof useDashboardCatalogsLazyQuery>;
export type DashboardCatalogsSuspenseQueryHookResult = ReturnType<typeof useDashboardCatalogsSuspenseQuery>;
export type DashboardCatalogsQueryResult = Apollo.QueryResult<Types.DashboardCatalogsQuery, Types.DashboardCatalogsQueryVariables>;
export const DashboardCoursesDocument = gql`
    query DashboardCourses($page: Int, $perPage: Int) {
  courses: tracks(page: $page, perPage: $perPage) {
    nodes {
      tasksCount
      description
      displayName
      grades
      id
      imageUrl
      shortDescription
      thumbnailUrl
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useDashboardCoursesQuery__
 *
 * To run a query within a React component, call `useDashboardCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardCoursesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useDashboardCoursesQuery(baseOptions?: Apollo.QueryHookOptions<Types.DashboardCoursesQuery, Types.DashboardCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DashboardCoursesQuery, Types.DashboardCoursesQueryVariables>(DashboardCoursesDocument, options);
      }
export function useDashboardCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DashboardCoursesQuery, Types.DashboardCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DashboardCoursesQuery, Types.DashboardCoursesQueryVariables>(DashboardCoursesDocument, options);
        }
export function useDashboardCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DashboardCoursesQuery, Types.DashboardCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DashboardCoursesQuery, Types.DashboardCoursesQueryVariables>(DashboardCoursesDocument, options);
        }
export type DashboardCoursesQueryHookResult = ReturnType<typeof useDashboardCoursesQuery>;
export type DashboardCoursesLazyQueryHookResult = ReturnType<typeof useDashboardCoursesLazyQuery>;
export type DashboardCoursesSuspenseQueryHookResult = ReturnType<typeof useDashboardCoursesSuspenseQuery>;
export type DashboardCoursesQueryResult = Apollo.QueryResult<Types.DashboardCoursesQuery, Types.DashboardCoursesQueryVariables>;
export const SystemAdminUsersDocument = gql`
    query SystemAdminUsers($uuid: ID!, $page: Int, $perPage: Int, $filter: UserFilter) {
  adminDashboard {
    entity(uuid: $uuid) {
      users(page: $page, perPage: $perPage, filter: $filter) {
        nodes {
          entity {
            name
            parent {
              name
              uuid
            }
            uuid
          }
          firstName
          gradingNeeded
          lastName
          role
          schoolClassesCount
          uuid
        }
        pagesCount
      }
      uuid
    }
  }
}
    `;

/**
 * __useSystemAdminUsersQuery__
 *
 * To run a query within a React component, call `useSystemAdminUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSystemAdminUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSystemAdminUsersQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useSystemAdminUsersQuery(baseOptions: Apollo.QueryHookOptions<Types.SystemAdminUsersQuery, Types.SystemAdminUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SystemAdminUsersQuery, Types.SystemAdminUsersQueryVariables>(SystemAdminUsersDocument, options);
      }
export function useSystemAdminUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SystemAdminUsersQuery, Types.SystemAdminUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SystemAdminUsersQuery, Types.SystemAdminUsersQueryVariables>(SystemAdminUsersDocument, options);
        }
export function useSystemAdminUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.SystemAdminUsersQuery, Types.SystemAdminUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.SystemAdminUsersQuery, Types.SystemAdminUsersQueryVariables>(SystemAdminUsersDocument, options);
        }
export type SystemAdminUsersQueryHookResult = ReturnType<typeof useSystemAdminUsersQuery>;
export type SystemAdminUsersLazyQueryHookResult = ReturnType<typeof useSystemAdminUsersLazyQuery>;
export type SystemAdminUsersSuspenseQueryHookResult = ReturnType<typeof useSystemAdminUsersSuspenseQuery>;
export type SystemAdminUsersQueryResult = Apollo.QueryResult<Types.SystemAdminUsersQuery, Types.SystemAdminUsersQueryVariables>;
export const LessonWithProjectDocument = gql`
    query LessonWithProject($lessonId: ID!, $projectId: ID!, $track: Boolean, $trackPresentation: Boolean) {
  lesson: unit(id: $lessonId) {
    displayName
    id
    project: task(id: $projectId, track: $track) {
      ...ProjectData
    }
    thumbnailUrl
  }
}
    ${ProjectDataFragmentDoc}`;

/**
 * __useLessonWithProjectQuery__
 *
 * To run a query within a React component, call `useLessonWithProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useLessonWithProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLessonWithProjectQuery({
 *   variables: {
 *      lessonId: // value for 'lessonId'
 *      projectId: // value for 'projectId'
 *      track: // value for 'track'
 *      trackPresentation: // value for 'trackPresentation'
 *   },
 * });
 */
export function useLessonWithProjectQuery(baseOptions: Apollo.QueryHookOptions<Types.LessonWithProjectQuery, Types.LessonWithProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.LessonWithProjectQuery, Types.LessonWithProjectQueryVariables>(LessonWithProjectDocument, options);
      }
export function useLessonWithProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.LessonWithProjectQuery, Types.LessonWithProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.LessonWithProjectQuery, Types.LessonWithProjectQueryVariables>(LessonWithProjectDocument, options);
        }
export function useLessonWithProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.LessonWithProjectQuery, Types.LessonWithProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.LessonWithProjectQuery, Types.LessonWithProjectQueryVariables>(LessonWithProjectDocument, options);
        }
export type LessonWithProjectQueryHookResult = ReturnType<typeof useLessonWithProjectQuery>;
export type LessonWithProjectLazyQueryHookResult = ReturnType<typeof useLessonWithProjectLazyQuery>;
export type LessonWithProjectSuspenseQueryHookResult = ReturnType<typeof useLessonWithProjectSuspenseQuery>;
export type LessonWithProjectQueryResult = Apollo.QueryResult<Types.LessonWithProjectQuery, Types.LessonWithProjectQueryVariables>;
export const UserLtiResourceDocument = gql`
    query UserLtiResource($ltiResourceLinkId: String, $contextId: String) {
  ltiResource(ltiResourceLinkId: $ltiResourceLinkId, contextId: $contextId) {
    ltiResourceLinkId
    contextId
    taskId
    productId
  }
}
    `;

/**
 * __useUserLtiResourceQuery__
 *
 * To run a query within a React component, call `useUserLtiResourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserLtiResourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserLtiResourceQuery({
 *   variables: {
 *      ltiResourceLinkId: // value for 'ltiResourceLinkId'
 *      contextId: // value for 'contextId'
 *   },
 * });
 */
export function useUserLtiResourceQuery(baseOptions?: Apollo.QueryHookOptions<Types.UserLtiResourceQuery, Types.UserLtiResourceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserLtiResourceQuery, Types.UserLtiResourceQueryVariables>(UserLtiResourceDocument, options);
      }
export function useUserLtiResourceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserLtiResourceQuery, Types.UserLtiResourceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserLtiResourceQuery, Types.UserLtiResourceQueryVariables>(UserLtiResourceDocument, options);
        }
export function useUserLtiResourceSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserLtiResourceQuery, Types.UserLtiResourceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserLtiResourceQuery, Types.UserLtiResourceQueryVariables>(UserLtiResourceDocument, options);
        }
export type UserLtiResourceQueryHookResult = ReturnType<typeof useUserLtiResourceQuery>;
export type UserLtiResourceLazyQueryHookResult = ReturnType<typeof useUserLtiResourceLazyQuery>;
export type UserLtiResourceSuspenseQueryHookResult = ReturnType<typeof useUserLtiResourceSuspenseQuery>;
export type UserLtiResourceQueryResult = Apollo.QueryResult<Types.UserLtiResourceQuery, Types.UserLtiResourceQueryVariables>;
export const UserMyClassesDocument = gql`
    query UserMyClasses($filter: SchoolClassFilter, $page: Int, $perPage: Int) {
  schoolClasses(filter: $filter, page: $page, perPage: $perPage) {
    nodes {
      isDemo
      name
      currentTasksCount
      students {
        nodesCount
      }
      uuid
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useUserMyClassesQuery__
 *
 * To run a query within a React component, call `useUserMyClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserMyClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserMyClassesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useUserMyClassesQuery(baseOptions?: Apollo.QueryHookOptions<Types.UserMyClassesQuery, Types.UserMyClassesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserMyClassesQuery, Types.UserMyClassesQueryVariables>(UserMyClassesDocument, options);
      }
export function useUserMyClassesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserMyClassesQuery, Types.UserMyClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserMyClassesQuery, Types.UserMyClassesQueryVariables>(UserMyClassesDocument, options);
        }
export function useUserMyClassesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserMyClassesQuery, Types.UserMyClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserMyClassesQuery, Types.UserMyClassesQueryVariables>(UserMyClassesDocument, options);
        }
export type UserMyClassesQueryHookResult = ReturnType<typeof useUserMyClassesQuery>;
export type UserMyClassesLazyQueryHookResult = ReturnType<typeof useUserMyClassesLazyQuery>;
export type UserMyClassesSuspenseQueryHookResult = ReturnType<typeof useUserMyClassesSuspenseQuery>;
export type UserMyClassesQueryResult = Apollo.QueryResult<Types.UserMyClassesQuery, Types.UserMyClassesQueryVariables>;
export const UserMyProjectsDocument = gql`
    query UserMyProjects($scope: ArchivableStatus, $page: Int, $perPage: Int) {
  myProjects: myTasks(scope: $scope, page: $page, perPage: $perPage) {
    nodes {
      id
      createdAt
      updatedAt
      displayName
      gradingNeeded
      name
      status
      description
      owner {
        uuid
      }
      isArchived
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useUserMyProjectsQuery__
 *
 * To run a query within a React component, call `useUserMyProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserMyProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserMyProjectsQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useUserMyProjectsQuery(baseOptions?: Apollo.QueryHookOptions<Types.UserMyProjectsQuery, Types.UserMyProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserMyProjectsQuery, Types.UserMyProjectsQueryVariables>(UserMyProjectsDocument, options);
      }
export function useUserMyProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserMyProjectsQuery, Types.UserMyProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserMyProjectsQuery, Types.UserMyProjectsQueryVariables>(UserMyProjectsDocument, options);
        }
export function useUserMyProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserMyProjectsQuery, Types.UserMyProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserMyProjectsQuery, Types.UserMyProjectsQueryVariables>(UserMyProjectsDocument, options);
        }
export type UserMyProjectsQueryHookResult = ReturnType<typeof useUserMyProjectsQuery>;
export type UserMyProjectsLazyQueryHookResult = ReturnType<typeof useUserMyProjectsLazyQuery>;
export type UserMyProjectsSuspenseQueryHookResult = ReturnType<typeof useUserMyProjectsSuspenseQuery>;
export type UserMyProjectsQueryResult = Apollo.QueryResult<Types.UserMyProjectsQuery, Types.UserMyProjectsQueryVariables>;
export const MyProjectsActivityLogDocument = gql`
    query MyProjectsActivityLog($after: String, $before: String, $first: Int, $last: Int) {
  myProjectsActivityLog: myTasksActivityLog(
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    edges {
      cursor
      node {
        updatedAt
        context {
          id
          name
        }
        student {
          firstName
          lastName
          uuid
        }
        team {
          name
          uuid
        }
        type
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;

/**
 * __useMyProjectsActivityLogQuery__
 *
 * To run a query within a React component, call `useMyProjectsActivityLogQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProjectsActivityLogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProjectsActivityLogQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useMyProjectsActivityLogQuery(baseOptions?: Apollo.QueryHookOptions<Types.MyProjectsActivityLogQuery, Types.MyProjectsActivityLogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.MyProjectsActivityLogQuery, Types.MyProjectsActivityLogQueryVariables>(MyProjectsActivityLogDocument, options);
      }
export function useMyProjectsActivityLogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.MyProjectsActivityLogQuery, Types.MyProjectsActivityLogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.MyProjectsActivityLogQuery, Types.MyProjectsActivityLogQueryVariables>(MyProjectsActivityLogDocument, options);
        }
export function useMyProjectsActivityLogSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.MyProjectsActivityLogQuery, Types.MyProjectsActivityLogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.MyProjectsActivityLogQuery, Types.MyProjectsActivityLogQueryVariables>(MyProjectsActivityLogDocument, options);
        }
export type MyProjectsActivityLogQueryHookResult = ReturnType<typeof useMyProjectsActivityLogQuery>;
export type MyProjectsActivityLogLazyQueryHookResult = ReturnType<typeof useMyProjectsActivityLogLazyQuery>;
export type MyProjectsActivityLogSuspenseQueryHookResult = ReturnType<typeof useMyProjectsActivityLogSuspenseQuery>;
export type MyProjectsActivityLogQueryResult = Apollo.QueryResult<Types.MyProjectsActivityLogQuery, Types.MyProjectsActivityLogQueryVariables>;
export const ProductSubmissionToGradeDocument = gql`
    query ProductSubmissionToGrade($projectId: ID!, $productId: ID!, $submitterUuid: ID!, $submitterType: ProductSubmissionSubmitterTypes!) {
  project: task(id: $projectId) {
    id
    displayName
    product(id: $productId) {
      id
      displayName
      submission(submitterUuid: $submitterUuid, submitterType: $submitterType) {
        id
        updatedAt
        files {
          createdAt
          filename
          googleWeblink
          id
          source
          url(options: {responseContentDisposition: "attachment"})
          submitter {
            uuid
            firstName
            lastName
          }
        }
        grade {
          lastGradedBy {
            uuid
            name
          }
          updatedAt
          pointsAvailable
          pointsScored
          results {
            criteriaId
            trait
          }
        }
      }
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
        pointsAvailable
      }
    }
  }
}
    `;

/**
 * __useProductSubmissionToGradeQuery__
 *
 * To run a query within a React component, call `useProductSubmissionToGradeQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductSubmissionToGradeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductSubmissionToGradeQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      productId: // value for 'productId'
 *      submitterUuid: // value for 'submitterUuid'
 *      submitterType: // value for 'submitterType'
 *   },
 * });
 */
export function useProductSubmissionToGradeQuery(baseOptions: Apollo.QueryHookOptions<Types.ProductSubmissionToGradeQuery, Types.ProductSubmissionToGradeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProductSubmissionToGradeQuery, Types.ProductSubmissionToGradeQueryVariables>(ProductSubmissionToGradeDocument, options);
      }
export function useProductSubmissionToGradeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProductSubmissionToGradeQuery, Types.ProductSubmissionToGradeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProductSubmissionToGradeQuery, Types.ProductSubmissionToGradeQueryVariables>(ProductSubmissionToGradeDocument, options);
        }
export function useProductSubmissionToGradeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProductSubmissionToGradeQuery, Types.ProductSubmissionToGradeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ProductSubmissionToGradeQuery, Types.ProductSubmissionToGradeQueryVariables>(ProductSubmissionToGradeDocument, options);
        }
export type ProductSubmissionToGradeQueryHookResult = ReturnType<typeof useProductSubmissionToGradeQuery>;
export type ProductSubmissionToGradeLazyQueryHookResult = ReturnType<typeof useProductSubmissionToGradeLazyQuery>;
export type ProductSubmissionToGradeSuspenseQueryHookResult = ReturnType<typeof useProductSubmissionToGradeSuspenseQuery>;
export type ProductSubmissionToGradeQueryResult = Apollo.QueryResult<Types.ProductSubmissionToGradeQuery, Types.ProductSubmissionToGradeQueryVariables>;
export const UserProjectDocument = gql`
    query UserProject($id: ID!, $code: String, $track: Boolean, $trackPresentation: Boolean) {
  project: task(id: $id, code: $code, track: $track) {
    ...ProjectData
  }
}
    ${ProjectDataFragmentDoc}`;

/**
 * __useUserProjectQuery__
 *
 * To run a query within a React component, call `useUserProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *      code: // value for 'code'
 *      track: // value for 'track'
 *      trackPresentation: // value for 'trackPresentation'
 *   },
 * });
 */
export function useUserProjectQuery(baseOptions: Apollo.QueryHookOptions<Types.UserProjectQuery, Types.UserProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserProjectQuery, Types.UserProjectQueryVariables>(UserProjectDocument, options);
      }
export function useUserProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserProjectQuery, Types.UserProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserProjectQuery, Types.UserProjectQueryVariables>(UserProjectDocument, options);
        }
export function useUserProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserProjectQuery, Types.UserProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserProjectQuery, Types.UserProjectQueryVariables>(UserProjectDocument, options);
        }
export type UserProjectQueryHookResult = ReturnType<typeof useUserProjectQuery>;
export type UserProjectLazyQueryHookResult = ReturnType<typeof useUserProjectLazyQuery>;
export type UserProjectSuspenseQueryHookResult = ReturnType<typeof useUserProjectSuspenseQuery>;
export type UserProjectQueryResult = Apollo.QueryResult<Types.UserProjectQuery, Types.UserProjectQueryVariables>;
export const ProjectCheckinsDocument = gql`
    query ProjectCheckins($projectId: ID!) {
  project: task(id: $projectId) {
    id
    checkInGroups {
      displayName
      id
      name
      questions {
        id
        question
        step
        owner {
          uuid
        }
      }
      step
    }
    checkInQuestions {
      id
      question
      step
      owner {
        uuid
      }
    }
  }
}
    `;

/**
 * __useProjectCheckinsQuery__
 *
 * To run a query within a React component, call `useProjectCheckinsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectCheckinsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectCheckinsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectCheckinsQuery(baseOptions: Apollo.QueryHookOptions<Types.ProjectCheckinsQuery, Types.ProjectCheckinsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProjectCheckinsQuery, Types.ProjectCheckinsQueryVariables>(ProjectCheckinsDocument, options);
      }
export function useProjectCheckinsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProjectCheckinsQuery, Types.ProjectCheckinsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProjectCheckinsQuery, Types.ProjectCheckinsQueryVariables>(ProjectCheckinsDocument, options);
        }
export function useProjectCheckinsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProjectCheckinsQuery, Types.ProjectCheckinsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ProjectCheckinsQuery, Types.ProjectCheckinsQueryVariables>(ProjectCheckinsDocument, options);
        }
export type ProjectCheckinsQueryHookResult = ReturnType<typeof useProjectCheckinsQuery>;
export type ProjectCheckinsLazyQueryHookResult = ReturnType<typeof useProjectCheckinsLazyQuery>;
export type ProjectCheckinsSuspenseQueryHookResult = ReturnType<typeof useProjectCheckinsSuspenseQuery>;
export type ProjectCheckinsQueryResult = Apollo.QueryResult<Types.ProjectCheckinsQuery, Types.ProjectCheckinsQueryVariables>;
export const ProjectCopiesDocument = gql`
    query ProjectCopies($id: ID!) {
  project: task(id: $id) {
    copies {
      id
      copies {
        id
        copies {
          id
          displayName
        }
        displayName
      }
      displayName
    }
    id
  }
}
    `;

/**
 * __useProjectCopiesQuery__
 *
 * To run a query within a React component, call `useProjectCopiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectCopiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectCopiesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectCopiesQuery(baseOptions: Apollo.QueryHookOptions<Types.ProjectCopiesQuery, Types.ProjectCopiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProjectCopiesQuery, Types.ProjectCopiesQueryVariables>(ProjectCopiesDocument, options);
      }
export function useProjectCopiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProjectCopiesQuery, Types.ProjectCopiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProjectCopiesQuery, Types.ProjectCopiesQueryVariables>(ProjectCopiesDocument, options);
        }
export function useProjectCopiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProjectCopiesQuery, Types.ProjectCopiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ProjectCopiesQuery, Types.ProjectCopiesQueryVariables>(ProjectCopiesDocument, options);
        }
export type ProjectCopiesQueryHookResult = ReturnType<typeof useProjectCopiesQuery>;
export type ProjectCopiesLazyQueryHookResult = ReturnType<typeof useProjectCopiesLazyQuery>;
export type ProjectCopiesSuspenseQueryHookResult = ReturnType<typeof useProjectCopiesSuspenseQuery>;
export type ProjectCopiesQueryResult = Apollo.QueryResult<Types.ProjectCopiesQuery, Types.ProjectCopiesQueryVariables>;
export const ProjectInfoToCheckinGradeDocument = gql`
    query ProjectInfoToCheckinGrade($projectId: ID!, $checkinId: ID!) {
  project: task(id: $projectId) {
    displayName
    id
    checkInQuestion(id: $checkinId) {
      id
      question
    }
  }
}
    `;

/**
 * __useProjectInfoToCheckinGradeQuery__
 *
 * To run a query within a React component, call `useProjectInfoToCheckinGradeQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectInfoToCheckinGradeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectInfoToCheckinGradeQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      checkinId: // value for 'checkinId'
 *   },
 * });
 */
export function useProjectInfoToCheckinGradeQuery(baseOptions: Apollo.QueryHookOptions<Types.ProjectInfoToCheckinGradeQuery, Types.ProjectInfoToCheckinGradeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProjectInfoToCheckinGradeQuery, Types.ProjectInfoToCheckinGradeQueryVariables>(ProjectInfoToCheckinGradeDocument, options);
      }
export function useProjectInfoToCheckinGradeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProjectInfoToCheckinGradeQuery, Types.ProjectInfoToCheckinGradeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProjectInfoToCheckinGradeQuery, Types.ProjectInfoToCheckinGradeQueryVariables>(ProjectInfoToCheckinGradeDocument, options);
        }
export function useProjectInfoToCheckinGradeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProjectInfoToCheckinGradeQuery, Types.ProjectInfoToCheckinGradeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ProjectInfoToCheckinGradeQuery, Types.ProjectInfoToCheckinGradeQueryVariables>(ProjectInfoToCheckinGradeDocument, options);
        }
export type ProjectInfoToCheckinGradeQueryHookResult = ReturnType<typeof useProjectInfoToCheckinGradeQuery>;
export type ProjectInfoToCheckinGradeLazyQueryHookResult = ReturnType<typeof useProjectInfoToCheckinGradeLazyQuery>;
export type ProjectInfoToCheckinGradeSuspenseQueryHookResult = ReturnType<typeof useProjectInfoToCheckinGradeSuspenseQuery>;
export type ProjectInfoToCheckinGradeQueryResult = Apollo.QueryResult<Types.ProjectInfoToCheckinGradeQuery, Types.ProjectInfoToCheckinGradeQueryVariables>;
export const ProjectInfoToProductGradeDocument = gql`
    query ProjectInfoToProductGrade($projectId: ID!, $productId: ID!) {
  project: task(id: $projectId) {
    displayName
    id
    product(id: $productId) {
      id
      displayName
    }
  }
}
    `;

/**
 * __useProjectInfoToProductGradeQuery__
 *
 * To run a query within a React component, call `useProjectInfoToProductGradeQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectInfoToProductGradeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectInfoToProductGradeQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useProjectInfoToProductGradeQuery(baseOptions: Apollo.QueryHookOptions<Types.ProjectInfoToProductGradeQuery, Types.ProjectInfoToProductGradeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProjectInfoToProductGradeQuery, Types.ProjectInfoToProductGradeQueryVariables>(ProjectInfoToProductGradeDocument, options);
      }
export function useProjectInfoToProductGradeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProjectInfoToProductGradeQuery, Types.ProjectInfoToProductGradeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProjectInfoToProductGradeQuery, Types.ProjectInfoToProductGradeQueryVariables>(ProjectInfoToProductGradeDocument, options);
        }
export function useProjectInfoToProductGradeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProjectInfoToProductGradeQuery, Types.ProjectInfoToProductGradeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ProjectInfoToProductGradeQuery, Types.ProjectInfoToProductGradeQueryVariables>(ProjectInfoToProductGradeDocument, options);
        }
export type ProjectInfoToProductGradeQueryHookResult = ReturnType<typeof useProjectInfoToProductGradeQuery>;
export type ProjectInfoToProductGradeLazyQueryHookResult = ReturnType<typeof useProjectInfoToProductGradeLazyQuery>;
export type ProjectInfoToProductGradeSuspenseQueryHookResult = ReturnType<typeof useProjectInfoToProductGradeSuspenseQuery>;
export type ProjectInfoToProductGradeQueryResult = Apollo.QueryResult<Types.ProjectInfoToProductGradeQuery, Types.ProjectInfoToProductGradeQueryVariables>;
export const ProjectNameDocument = gql`
    query ProjectName($id: ID!, $track: Boolean) {
  project: task(id: $id, track: $track) {
    id
    displayName
  }
}
    `;

/**
 * __useProjectNameQuery__
 *
 * To run a query within a React component, call `useProjectNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectNameQuery({
 *   variables: {
 *      id: // value for 'id'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useProjectNameQuery(baseOptions: Apollo.QueryHookOptions<Types.ProjectNameQuery, Types.ProjectNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProjectNameQuery, Types.ProjectNameQueryVariables>(ProjectNameDocument, options);
      }
export function useProjectNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProjectNameQuery, Types.ProjectNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProjectNameQuery, Types.ProjectNameQueryVariables>(ProjectNameDocument, options);
        }
export function useProjectNameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProjectNameQuery, Types.ProjectNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ProjectNameQuery, Types.ProjectNameQueryVariables>(ProjectNameDocument, options);
        }
export type ProjectNameQueryHookResult = ReturnType<typeof useProjectNameQuery>;
export type ProjectNameLazyQueryHookResult = ReturnType<typeof useProjectNameLazyQuery>;
export type ProjectNameSuspenseQueryHookResult = ReturnType<typeof useProjectNameSuspenseQuery>;
export type ProjectNameQueryResult = Apollo.QueryResult<Types.ProjectNameQuery, Types.ProjectNameQueryVariables>;
export const UserProjectProductsDocument = gql`
    query UserProjectProducts($projectId: ID!, $code: String) {
  project: task(id: $projectId, code: $code) {
    id
    assignedStudentsCount
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
        hasAlignedStatements
      }
      submissionsGradingNeededCount
      hidden
    }
  }
}
    `;

/**
 * __useUserProjectProductsQuery__
 *
 * To run a query within a React component, call `useUserProjectProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProjectProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProjectProductsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useUserProjectProductsQuery(baseOptions: Apollo.QueryHookOptions<Types.UserProjectProductsQuery, Types.UserProjectProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserProjectProductsQuery, Types.UserProjectProductsQueryVariables>(UserProjectProductsDocument, options);
      }
export function useUserProjectProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserProjectProductsQuery, Types.UserProjectProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserProjectProductsQuery, Types.UserProjectProductsQueryVariables>(UserProjectProductsDocument, options);
        }
export function useUserProjectProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserProjectProductsQuery, Types.UserProjectProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserProjectProductsQuery, Types.UserProjectProductsQueryVariables>(UserProjectProductsDocument, options);
        }
export type UserProjectProductsQueryHookResult = ReturnType<typeof useUserProjectProductsQuery>;
export type UserProjectProductsLazyQueryHookResult = ReturnType<typeof useUserProjectProductsLazyQuery>;
export type UserProjectProductsSuspenseQueryHookResult = ReturnType<typeof useUserProjectProductsSuspenseQuery>;
export type UserProjectProductsQueryResult = Apollo.QueryResult<Types.UserProjectProductsQuery, Types.UserProjectProductsQueryVariables>;
export const ProjectStandardsDocument = gql`
    query ProjectStandards($projectId: ID!, $setId: String!, $code: String) {
  project: task(id: $projectId, code: $code) {
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
 * __useProjectStandardsQuery__
 *
 * To run a query within a React component, call `useProjectStandardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectStandardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectStandardsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      setId: // value for 'setId'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useProjectStandardsQuery(baseOptions: Apollo.QueryHookOptions<Types.ProjectStandardsQuery, Types.ProjectStandardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProjectStandardsQuery, Types.ProjectStandardsQueryVariables>(ProjectStandardsDocument, options);
      }
export function useProjectStandardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProjectStandardsQuery, Types.ProjectStandardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProjectStandardsQuery, Types.ProjectStandardsQueryVariables>(ProjectStandardsDocument, options);
        }
export function useProjectStandardsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProjectStandardsQuery, Types.ProjectStandardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ProjectStandardsQuery, Types.ProjectStandardsQueryVariables>(ProjectStandardsDocument, options);
        }
export type ProjectStandardsQueryHookResult = ReturnType<typeof useProjectStandardsQuery>;
export type ProjectStandardsLazyQueryHookResult = ReturnType<typeof useProjectStandardsLazyQuery>;
export type ProjectStandardsSuspenseQueryHookResult = ReturnType<typeof useProjectStandardsSuspenseQuery>;
export type ProjectStandardsQueryResult = Apollo.QueryResult<Types.ProjectStandardsQuery, Types.ProjectStandardsQueryVariables>;
export const ProjectsDocument = gql`
    query Projects($filter: TaskFilter, $page: Int, $perPage: Int, $teamId: ID!) {
  projects: tasks(filter: $filter, page: $page, perPage: $perPage) {
    nodes {
      id
      displayName
      isAssignedToTeam(teamId: $teamId)
    }
    pagesCount
  }
}
    `;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      teamId: // value for 'teamId'
 *   },
 * });
 */
export function useProjectsQuery(baseOptions: Apollo.QueryHookOptions<Types.ProjectsQuery, Types.ProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProjectsQuery, Types.ProjectsQueryVariables>(ProjectsDocument, options);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProjectsQuery, Types.ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProjectsQuery, Types.ProjectsQueryVariables>(ProjectsDocument, options);
        }
export function useProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProjectsQuery, Types.ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ProjectsQuery, Types.ProjectsQueryVariables>(ProjectsDocument, options);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsSuspenseQueryHookResult = ReturnType<typeof useProjectsSuspenseQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<Types.ProjectsQuery, Types.ProjectsQueryVariables>;
export const DlRubricDocument = gql`
    query DlRubric($id: ID!) {
  rubric(id: $id) {
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
    name
    displayName
    id
    canEdit
  }
}
    `;

/**
 * __useDlRubricQuery__
 *
 * To run a query within a React component, call `useDlRubricQuery` and pass it any options that fit your needs.
 * When your component renders, `useDlRubricQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDlRubricQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDlRubricQuery(baseOptions: Apollo.QueryHookOptions<Types.DlRubricQuery, Types.DlRubricQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DlRubricQuery, Types.DlRubricQueryVariables>(DlRubricDocument, options);
      }
export function useDlRubricLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DlRubricQuery, Types.DlRubricQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DlRubricQuery, Types.DlRubricQueryVariables>(DlRubricDocument, options);
        }
export function useDlRubricSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DlRubricQuery, Types.DlRubricQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DlRubricQuery, Types.DlRubricQueryVariables>(DlRubricDocument, options);
        }
export type DlRubricQueryHookResult = ReturnType<typeof useDlRubricQuery>;
export type DlRubricLazyQueryHookResult = ReturnType<typeof useDlRubricLazyQuery>;
export type DlRubricSuspenseQueryHookResult = ReturnType<typeof useDlRubricSuspenseQuery>;
export type DlRubricQueryResult = Apollo.QueryResult<Types.DlRubricQuery, Types.DlRubricQueryVariables>;
export const DlSchoolClassDocument = gql`
    query DlSchoolClass($uuid: ID!) {
  schoolClass(uuid: $uuid) {
    isDemo
    name
    uuid
    ...Students
    teams {
      ...Team
    }
  }
}
    ${StudentsFragmentDoc}
${TeamFragmentDoc}`;

/**
 * __useDlSchoolClassQuery__
 *
 * To run a query within a React component, call `useDlSchoolClassQuery` and pass it any options that fit your needs.
 * When your component renders, `useDlSchoolClassQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDlSchoolClassQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDlSchoolClassQuery(baseOptions: Apollo.QueryHookOptions<Types.DlSchoolClassQuery, Types.DlSchoolClassQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DlSchoolClassQuery, Types.DlSchoolClassQueryVariables>(DlSchoolClassDocument, options);
      }
export function useDlSchoolClassLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DlSchoolClassQuery, Types.DlSchoolClassQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DlSchoolClassQuery, Types.DlSchoolClassQueryVariables>(DlSchoolClassDocument, options);
        }
export function useDlSchoolClassSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DlSchoolClassQuery, Types.DlSchoolClassQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DlSchoolClassQuery, Types.DlSchoolClassQueryVariables>(DlSchoolClassDocument, options);
        }
export type DlSchoolClassQueryHookResult = ReturnType<typeof useDlSchoolClassQuery>;
export type DlSchoolClassLazyQueryHookResult = ReturnType<typeof useDlSchoolClassLazyQuery>;
export type DlSchoolClassSuspenseQueryHookResult = ReturnType<typeof useDlSchoolClassSuspenseQuery>;
export type DlSchoolClassQueryResult = Apollo.QueryResult<Types.DlSchoolClassQuery, Types.DlSchoolClassQueryVariables>;
export const SchoolClassActivityDocument = gql`
    query SchoolClassActivity($uuid: ID!, $after: String, $before: String, $first: Int, $last: Int) {
  schoolClass(uuid: $uuid) {
    activityLog(after: $after, before: $before, first: $first, last: $last) {
      edges {
        cursor
        node {
          updatedAt
          context {
            id
            name
          }
          schoolClass {
            name
            uuid
          }
          target {
            name
          }
          team {
            name
            uuid
          }
          type
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    uuid
  }
}
    `;

/**
 * __useSchoolClassActivityQuery__
 *
 * To run a query within a React component, call `useSchoolClassActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchoolClassActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchoolClassActivityQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useSchoolClassActivityQuery(baseOptions: Apollo.QueryHookOptions<Types.SchoolClassActivityQuery, Types.SchoolClassActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SchoolClassActivityQuery, Types.SchoolClassActivityQueryVariables>(SchoolClassActivityDocument, options);
      }
export function useSchoolClassActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SchoolClassActivityQuery, Types.SchoolClassActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SchoolClassActivityQuery, Types.SchoolClassActivityQueryVariables>(SchoolClassActivityDocument, options);
        }
export function useSchoolClassActivitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.SchoolClassActivityQuery, Types.SchoolClassActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.SchoolClassActivityQuery, Types.SchoolClassActivityQueryVariables>(SchoolClassActivityDocument, options);
        }
export type SchoolClassActivityQueryHookResult = ReturnType<typeof useSchoolClassActivityQuery>;
export type SchoolClassActivityLazyQueryHookResult = ReturnType<typeof useSchoolClassActivityLazyQuery>;
export type SchoolClassActivitySuspenseQueryHookResult = ReturnType<typeof useSchoolClassActivitySuspenseQuery>;
export type SchoolClassActivityQueryResult = Apollo.QueryResult<Types.SchoolClassActivityQuery, Types.SchoolClassActivityQueryVariables>;
export const SchoolClassTeamDocument = gql`
    query SchoolClassTeam($classUuid: ID!, $teamUuid: ID!) {
  schoolClass(uuid: $classUuid) {
    uuid
    team(uuid: $teamUuid) {
      uuid
      name
      students(page: 1, perPage: 1000) {
        nodes {
          firstName
          lastName
          uuid
        }
      }
    }
  }
}
    `;

/**
 * __useSchoolClassTeamQuery__
 *
 * To run a query within a React component, call `useSchoolClassTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchoolClassTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchoolClassTeamQuery({
 *   variables: {
 *      classUuid: // value for 'classUuid'
 *      teamUuid: // value for 'teamUuid'
 *   },
 * });
 */
export function useSchoolClassTeamQuery(baseOptions: Apollo.QueryHookOptions<Types.SchoolClassTeamQuery, Types.SchoolClassTeamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SchoolClassTeamQuery, Types.SchoolClassTeamQueryVariables>(SchoolClassTeamDocument, options);
      }
export function useSchoolClassTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SchoolClassTeamQuery, Types.SchoolClassTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SchoolClassTeamQuery, Types.SchoolClassTeamQueryVariables>(SchoolClassTeamDocument, options);
        }
export function useSchoolClassTeamSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.SchoolClassTeamQuery, Types.SchoolClassTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.SchoolClassTeamQuery, Types.SchoolClassTeamQueryVariables>(SchoolClassTeamDocument, options);
        }
export type SchoolClassTeamQueryHookResult = ReturnType<typeof useSchoolClassTeamQuery>;
export type SchoolClassTeamLazyQueryHookResult = ReturnType<typeof useSchoolClassTeamLazyQuery>;
export type SchoolClassTeamSuspenseQueryHookResult = ReturnType<typeof useSchoolClassTeamSuspenseQuery>;
export type SchoolClassTeamQueryResult = Apollo.QueryResult<Types.SchoolClassTeamQuery, Types.SchoolClassTeamQueryVariables>;
export const SchoolClassesActivityLogDocument = gql`
    query SchoolClassesActivityLog($after: String, $before: String, $first: Int, $last: Int) {
  schoolClassActivityLog(
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    edges {
      cursor
      node {
        updatedAt
        context {
          id
          name
        }
        schoolClass {
          name
          uuid
        }
        target {
          name
        }
        team {
          name
          uuid
        }
        type
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;

/**
 * __useSchoolClassesActivityLogQuery__
 *
 * To run a query within a React component, call `useSchoolClassesActivityLogQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchoolClassesActivityLogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchoolClassesActivityLogQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useSchoolClassesActivityLogQuery(baseOptions?: Apollo.QueryHookOptions<Types.SchoolClassesActivityLogQuery, Types.SchoolClassesActivityLogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SchoolClassesActivityLogQuery, Types.SchoolClassesActivityLogQueryVariables>(SchoolClassesActivityLogDocument, options);
      }
export function useSchoolClassesActivityLogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SchoolClassesActivityLogQuery, Types.SchoolClassesActivityLogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SchoolClassesActivityLogQuery, Types.SchoolClassesActivityLogQueryVariables>(SchoolClassesActivityLogDocument, options);
        }
export function useSchoolClassesActivityLogSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.SchoolClassesActivityLogQuery, Types.SchoolClassesActivityLogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.SchoolClassesActivityLogQuery, Types.SchoolClassesActivityLogQueryVariables>(SchoolClassesActivityLogDocument, options);
        }
export type SchoolClassesActivityLogQueryHookResult = ReturnType<typeof useSchoolClassesActivityLogQuery>;
export type SchoolClassesActivityLogLazyQueryHookResult = ReturnType<typeof useSchoolClassesActivityLogLazyQuery>;
export type SchoolClassesActivityLogSuspenseQueryHookResult = ReturnType<typeof useSchoolClassesActivityLogSuspenseQuery>;
export type SchoolClassesActivityLogQueryResult = Apollo.QueryResult<Types.SchoolClassesActivityLogQuery, Types.SchoolClassesActivityLogQueryVariables>;
export const SchoolClassAssignedToTaskDocument = gql`
    query schoolClassAssignedToTask($taskId: ID!, $itemId: ID!, $itemType: GradingItemTypes!, $page: Int, $perPage: Int) {
  schoolClassesAssignedToProject: schoolClassesAssignedToTask(
    taskId: $taskId
    page: $page
    perPage: $perPage
  ) {
    nodes {
      gradingNeeded(filter: {itemId: $itemId, itemType: $itemType, taskId: $taskId})
      name
      uuid
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useSchoolClassAssignedToTaskQuery__
 *
 * To run a query within a React component, call `useSchoolClassAssignedToTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchoolClassAssignedToTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchoolClassAssignedToTaskQuery({
 *   variables: {
 *      taskId: // value for 'taskId'
 *      itemId: // value for 'itemId'
 *      itemType: // value for 'itemType'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useSchoolClassAssignedToTaskQuery(baseOptions: Apollo.QueryHookOptions<Types.SchoolClassAssignedToTaskQuery, Types.SchoolClassAssignedToTaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SchoolClassAssignedToTaskQuery, Types.SchoolClassAssignedToTaskQueryVariables>(SchoolClassAssignedToTaskDocument, options);
      }
export function useSchoolClassAssignedToTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SchoolClassAssignedToTaskQuery, Types.SchoolClassAssignedToTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SchoolClassAssignedToTaskQuery, Types.SchoolClassAssignedToTaskQueryVariables>(SchoolClassAssignedToTaskDocument, options);
        }
export function useSchoolClassAssignedToTaskSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.SchoolClassAssignedToTaskQuery, Types.SchoolClassAssignedToTaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.SchoolClassAssignedToTaskQuery, Types.SchoolClassAssignedToTaskQueryVariables>(SchoolClassAssignedToTaskDocument, options);
        }
export type SchoolClassAssignedToTaskQueryHookResult = ReturnType<typeof useSchoolClassAssignedToTaskQuery>;
export type SchoolClassAssignedToTaskLazyQueryHookResult = ReturnType<typeof useSchoolClassAssignedToTaskLazyQuery>;
export type SchoolClassAssignedToTaskSuspenseQueryHookResult = ReturnType<typeof useSchoolClassAssignedToTaskSuspenseQuery>;
export type SchoolClassAssignedToTaskQueryResult = Apollo.QueryResult<Types.SchoolClassAssignedToTaskQuery, Types.SchoolClassAssignedToTaskQueryVariables>;
export const StandardHierarchyDocument = gql`
    query StandardHierarchy($setId: String!, $subject: String!, $grade: String!) {
  standardsHierarchy(setId: $setId, subject: $subject, grade: $grade) {
    guid
    standardText
    standardNumber
    children {
      guid
      standardText
      standardNumber
      children {
        guid
        standardText
        standardNumber
        children {
          guid
          standardText
          standardNumber
          children {
            guid
            standardText
            standardNumber
          }
        }
      }
    }
  }
}
    `;

/**
 * __useStandardHierarchyQuery__
 *
 * To run a query within a React component, call `useStandardHierarchyQuery` and pass it any options that fit your needs.
 * When your component renders, `useStandardHierarchyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStandardHierarchyQuery({
 *   variables: {
 *      setId: // value for 'setId'
 *      subject: // value for 'subject'
 *      grade: // value for 'grade'
 *   },
 * });
 */
export function useStandardHierarchyQuery(baseOptions: Apollo.QueryHookOptions<Types.StandardHierarchyQuery, Types.StandardHierarchyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StandardHierarchyQuery, Types.StandardHierarchyQueryVariables>(StandardHierarchyDocument, options);
      }
export function useStandardHierarchyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StandardHierarchyQuery, Types.StandardHierarchyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StandardHierarchyQuery, Types.StandardHierarchyQueryVariables>(StandardHierarchyDocument, options);
        }
export function useStandardHierarchySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StandardHierarchyQuery, Types.StandardHierarchyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StandardHierarchyQuery, Types.StandardHierarchyQueryVariables>(StandardHierarchyDocument, options);
        }
export type StandardHierarchyQueryHookResult = ReturnType<typeof useStandardHierarchyQuery>;
export type StandardHierarchyLazyQueryHookResult = ReturnType<typeof useStandardHierarchyLazyQuery>;
export type StandardHierarchySuspenseQueryHookResult = ReturnType<typeof useStandardHierarchySuspenseQuery>;
export type StandardHierarchyQueryResult = Apollo.QueryResult<Types.StandardHierarchyQuery, Types.StandardHierarchyQueryVariables>;
export const StandardSetSubjectsDocument = gql`
    query StandardSetSubjects($setId: String!) {
  standardSetSubjects(setId: $setId) {
    name
    grades
  }
}
    `;

/**
 * __useStandardSetSubjectsQuery__
 *
 * To run a query within a React component, call `useStandardSetSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStandardSetSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStandardSetSubjectsQuery({
 *   variables: {
 *      setId: // value for 'setId'
 *   },
 * });
 */
export function useStandardSetSubjectsQuery(baseOptions: Apollo.QueryHookOptions<Types.StandardSetSubjectsQuery, Types.StandardSetSubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StandardSetSubjectsQuery, Types.StandardSetSubjectsQueryVariables>(StandardSetSubjectsDocument, options);
      }
export function useStandardSetSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StandardSetSubjectsQuery, Types.StandardSetSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StandardSetSubjectsQuery, Types.StandardSetSubjectsQueryVariables>(StandardSetSubjectsDocument, options);
        }
export function useStandardSetSubjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StandardSetSubjectsQuery, Types.StandardSetSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StandardSetSubjectsQuery, Types.StandardSetSubjectsQueryVariables>(StandardSetSubjectsDocument, options);
        }
export type StandardSetSubjectsQueryHookResult = ReturnType<typeof useStandardSetSubjectsQuery>;
export type StandardSetSubjectsLazyQueryHookResult = ReturnType<typeof useStandardSetSubjectsLazyQuery>;
export type StandardSetSubjectsSuspenseQueryHookResult = ReturnType<typeof useStandardSetSubjectsSuspenseQuery>;
export type StandardSetSubjectsQueryResult = Apollo.QueryResult<Types.StandardSetSubjectsQuery, Types.StandardSetSubjectsQueryVariables>;
export const StandardTasksDocument = gql`
    query StandardTasks($standardGuid: String!) {
  standardTasks(standardGuid: $standardGuid) {
    id
    displayName
    description
    imageUrl
    thumbnailUrl
  }
}
    `;

/**
 * __useStandardTasksQuery__
 *
 * To run a query within a React component, call `useStandardTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useStandardTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStandardTasksQuery({
 *   variables: {
 *      standardGuid: // value for 'standardGuid'
 *   },
 * });
 */
export function useStandardTasksQuery(baseOptions: Apollo.QueryHookOptions<Types.StandardTasksQuery, Types.StandardTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StandardTasksQuery, Types.StandardTasksQueryVariables>(StandardTasksDocument, options);
      }
export function useStandardTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StandardTasksQuery, Types.StandardTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StandardTasksQuery, Types.StandardTasksQueryVariables>(StandardTasksDocument, options);
        }
export function useStandardTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StandardTasksQuery, Types.StandardTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StandardTasksQuery, Types.StandardTasksQueryVariables>(StandardTasksDocument, options);
        }
export type StandardTasksQueryHookResult = ReturnType<typeof useStandardTasksQuery>;
export type StandardTasksLazyQueryHookResult = ReturnType<typeof useStandardTasksLazyQuery>;
export type StandardTasksSuspenseQueryHookResult = ReturnType<typeof useStandardTasksSuspenseQuery>;
export type StandardTasksQueryResult = Apollo.QueryResult<Types.StandardTasksQuery, Types.StandardTasksQueryVariables>;
export const DlStudentDocument = gql`
    query DlStudent($uuid: ID!) {
  student(uuid: $uuid) {
    uuid
    name
  }
}
    `;

/**
 * __useDlStudentQuery__
 *
 * To run a query within a React component, call `useDlStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useDlStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDlStudentQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDlStudentQuery(baseOptions: Apollo.QueryHookOptions<Types.DlStudentQuery, Types.DlStudentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DlStudentQuery, Types.DlStudentQueryVariables>(DlStudentDocument, options);
      }
export function useDlStudentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DlStudentQuery, Types.DlStudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DlStudentQuery, Types.DlStudentQueryVariables>(DlStudentDocument, options);
        }
export function useDlStudentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DlStudentQuery, Types.DlStudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DlStudentQuery, Types.DlStudentQueryVariables>(DlStudentDocument, options);
        }
export type DlStudentQueryHookResult = ReturnType<typeof useDlStudentQuery>;
export type DlStudentLazyQueryHookResult = ReturnType<typeof useDlStudentLazyQuery>;
export type DlStudentSuspenseQueryHookResult = ReturnType<typeof useDlStudentSuspenseQuery>;
export type DlStudentQueryResult = Apollo.QueryResult<Types.DlStudentQuery, Types.DlStudentQueryVariables>;
export const DlStudentConversationsDocument = gql`
    query DlStudentConversations($uuid: ID!, $first: Int, $after: String, $with: ConversationParticipantFilter!) {
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
 * __useDlStudentConversationsQuery__
 *
 * To run a query within a React component, call `useDlStudentConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDlStudentConversationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDlStudentConversationsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      with: // value for 'with'
 *   },
 * });
 */
export function useDlStudentConversationsQuery(baseOptions: Apollo.QueryHookOptions<Types.DlStudentConversationsQuery, Types.DlStudentConversationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DlStudentConversationsQuery, Types.DlStudentConversationsQueryVariables>(DlStudentConversationsDocument, options);
      }
export function useDlStudentConversationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DlStudentConversationsQuery, Types.DlStudentConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DlStudentConversationsQuery, Types.DlStudentConversationsQueryVariables>(DlStudentConversationsDocument, options);
        }
export function useDlStudentConversationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DlStudentConversationsQuery, Types.DlStudentConversationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DlStudentConversationsQuery, Types.DlStudentConversationsQueryVariables>(DlStudentConversationsDocument, options);
        }
export type DlStudentConversationsQueryHookResult = ReturnType<typeof useDlStudentConversationsQuery>;
export type DlStudentConversationsLazyQueryHookResult = ReturnType<typeof useDlStudentConversationsLazyQuery>;
export type DlStudentConversationsSuspenseQueryHookResult = ReturnType<typeof useDlStudentConversationsSuspenseQuery>;
export type DlStudentConversationsQueryResult = Apollo.QueryResult<Types.DlStudentConversationsQuery, Types.DlStudentConversationsQueryVariables>;
export const SystemAdminEntitiesDocument = gql`
    query SystemAdminEntities($page: Int, $perPage: Int, $filter: EntityFilter) {
  adminDashboard {
    entities(page: $page, perPage: $perPage, filter: $filter) {
      nodes {
        hierarchyMetrics {
          entitiesCount
          schoolClassesCount
          studentsCount
          teachersCount
        }
        name
        settings {
          selfEvaluationEnabled
        }
        uuid
      }
      pagesCount
    }
  }
}
    `;

/**
 * __useSystemAdminEntitiesQuery__
 *
 * To run a query within a React component, call `useSystemAdminEntitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSystemAdminEntitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSystemAdminEntitiesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useSystemAdminEntitiesQuery(baseOptions?: Apollo.QueryHookOptions<Types.SystemAdminEntitiesQuery, Types.SystemAdminEntitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SystemAdminEntitiesQuery, Types.SystemAdminEntitiesQueryVariables>(SystemAdminEntitiesDocument, options);
      }
export function useSystemAdminEntitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SystemAdminEntitiesQuery, Types.SystemAdminEntitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SystemAdminEntitiesQuery, Types.SystemAdminEntitiesQueryVariables>(SystemAdminEntitiesDocument, options);
        }
export function useSystemAdminEntitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.SystemAdminEntitiesQuery, Types.SystemAdminEntitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.SystemAdminEntitiesQuery, Types.SystemAdminEntitiesQueryVariables>(SystemAdminEntitiesDocument, options);
        }
export type SystemAdminEntitiesQueryHookResult = ReturnType<typeof useSystemAdminEntitiesQuery>;
export type SystemAdminEntitiesLazyQueryHookResult = ReturnType<typeof useSystemAdminEntitiesLazyQuery>;
export type SystemAdminEntitiesSuspenseQueryHookResult = ReturnType<typeof useSystemAdminEntitiesSuspenseQuery>;
export type SystemAdminEntitiesQueryResult = Apollo.QueryResult<Types.SystemAdminEntitiesQuery, Types.SystemAdminEntitiesQueryVariables>;
export const DlAdminUsersDocument = gql`
    query DlAdminUsers($page: Int, $perPage: Int, $filter: UserFilter) {
  adminDashboard {
    users(page: $page, perPage: $perPage, filter: $filter) {
      nodes {
        entity {
          name
          parent {
            name
            uuid
          }
          uuid
        }
        firstName
        lastName
        role
        schoolClassesCount
        uuid
      }
      pagesCount
    }
  }
}
    `;

/**
 * __useDlAdminUsersQuery__
 *
 * To run a query within a React component, call `useDlAdminUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useDlAdminUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDlAdminUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useDlAdminUsersQuery(baseOptions?: Apollo.QueryHookOptions<Types.DlAdminUsersQuery, Types.DlAdminUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DlAdminUsersQuery, Types.DlAdminUsersQueryVariables>(DlAdminUsersDocument, options);
      }
export function useDlAdminUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DlAdminUsersQuery, Types.DlAdminUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DlAdminUsersQuery, Types.DlAdminUsersQueryVariables>(DlAdminUsersDocument, options);
        }
export function useDlAdminUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DlAdminUsersQuery, Types.DlAdminUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DlAdminUsersQuery, Types.DlAdminUsersQueryVariables>(DlAdminUsersDocument, options);
        }
export type DlAdminUsersQueryHookResult = ReturnType<typeof useDlAdminUsersQuery>;
export type DlAdminUsersLazyQueryHookResult = ReturnType<typeof useDlAdminUsersLazyQuery>;
export type DlAdminUsersSuspenseQueryHookResult = ReturnType<typeof useDlAdminUsersSuspenseQuery>;
export type DlAdminUsersQueryResult = Apollo.QueryResult<Types.DlAdminUsersQuery, Types.DlAdminUsersQueryVariables>;
export const TaskTemplateDocument = gql`
    query TaskTemplate {
  taskTemplates {
    id
    copies {
      id
      name
      copies {
        id
        name
        assignedAt
      }
    }
  }
}
    `;

/**
 * __useTaskTemplateQuery__
 *
 * To run a query within a React component, call `useTaskTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskTemplateQuery({
 *   variables: {
 *   },
 * });
 */
export function useTaskTemplateQuery(baseOptions?: Apollo.QueryHookOptions<Types.TaskTemplateQuery, Types.TaskTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TaskTemplateQuery, Types.TaskTemplateQueryVariables>(TaskTemplateDocument, options);
      }
export function useTaskTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TaskTemplateQuery, Types.TaskTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TaskTemplateQuery, Types.TaskTemplateQueryVariables>(TaskTemplateDocument, options);
        }
export function useTaskTemplateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TaskTemplateQuery, Types.TaskTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TaskTemplateQuery, Types.TaskTemplateQueryVariables>(TaskTemplateDocument, options);
        }
export type TaskTemplateQueryHookResult = ReturnType<typeof useTaskTemplateQuery>;
export type TaskTemplateLazyQueryHookResult = ReturnType<typeof useTaskTemplateLazyQuery>;
export type TaskTemplateSuspenseQueryHookResult = ReturnType<typeof useTaskTemplateSuspenseQuery>;
export type TaskTemplateQueryResult = Apollo.QueryResult<Types.TaskTemplateQuery, Types.TaskTemplateQueryVariables>;
export const TeacherDashBoardDocument = gql`
    query TeacherDashBoard($userUuid: ID, $after: String, $before: String, $first: Int, $last: Int) {
  teacherDashboard(userUuid: $userUuid) {
    userId
    teacherName
    schoolClasses {
      currentTasksCount
      entityName
      isDemo
      schoolClassName
      schoolClassUuid
      studentsCount
    }
    activityLog(after: $after, before: $before, first: $first, last: $last) {
      edges {
        cursor
        node {
          updatedAt
          type
          context {
            id
            name
          }
          schoolClass {
            name
            uuid
          }
          target {
            name
          }
          team {
            name
            uuid
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
    `;

/**
 * __useTeacherDashBoardQuery__
 *
 * To run a query within a React component, call `useTeacherDashBoardQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeacherDashBoardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeacherDashBoardQuery({
 *   variables: {
 *      userUuid: // value for 'userUuid'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useTeacherDashBoardQuery(baseOptions?: Apollo.QueryHookOptions<Types.TeacherDashBoardQuery, Types.TeacherDashBoardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TeacherDashBoardQuery, Types.TeacherDashBoardQueryVariables>(TeacherDashBoardDocument, options);
      }
export function useTeacherDashBoardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TeacherDashBoardQuery, Types.TeacherDashBoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TeacherDashBoardQuery, Types.TeacherDashBoardQueryVariables>(TeacherDashBoardDocument, options);
        }
export function useTeacherDashBoardSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TeacherDashBoardQuery, Types.TeacherDashBoardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TeacherDashBoardQuery, Types.TeacherDashBoardQueryVariables>(TeacherDashBoardDocument, options);
        }
export type TeacherDashBoardQueryHookResult = ReturnType<typeof useTeacherDashBoardQuery>;
export type TeacherDashBoardLazyQueryHookResult = ReturnType<typeof useTeacherDashBoardLazyQuery>;
export type TeacherDashBoardSuspenseQueryHookResult = ReturnType<typeof useTeacherDashBoardSuspenseQuery>;
export type TeacherDashBoardQueryResult = Apollo.QueryResult<Types.TeacherDashBoardQuery, Types.TeacherDashBoardQueryVariables>;
export const DlTrackDocument = gql`
    query DlTrack($id: ID!) {
  track(id: $id) {
    description
    name
    displayName
    grades
    id
    imageUrl
    thumbnailUrl
    tasksCount
    units {
      description
      displayName
      id
      imageUrl
      thumbnailUrl
      tasks {
        description
        displayName
        id
        imageUrl
        thumbnailUrl
      }
    }
  }
}
    `;

/**
 * __useDlTrackQuery__
 *
 * To run a query within a React component, call `useDlTrackQuery` and pass it any options that fit your needs.
 * When your component renders, `useDlTrackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDlTrackQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDlTrackQuery(baseOptions: Apollo.QueryHookOptions<Types.DlTrackQuery, Types.DlTrackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DlTrackQuery, Types.DlTrackQueryVariables>(DlTrackDocument, options);
      }
export function useDlTrackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DlTrackQuery, Types.DlTrackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DlTrackQuery, Types.DlTrackQueryVariables>(DlTrackDocument, options);
        }
export function useDlTrackSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DlTrackQuery, Types.DlTrackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DlTrackQuery, Types.DlTrackQueryVariables>(DlTrackDocument, options);
        }
export type DlTrackQueryHookResult = ReturnType<typeof useDlTrackQuery>;
export type DlTrackLazyQueryHookResult = ReturnType<typeof useDlTrackLazyQuery>;
export type DlTrackSuspenseQueryHookResult = ReturnType<typeof useDlTrackSuspenseQuery>;
export type DlTrackQueryResult = Apollo.QueryResult<Types.DlTrackQuery, Types.DlTrackQueryVariables>;
export const DlUserInfoDocument = gql`
    query DlUserInfo {
  userInfo {
    availableTasksCount
    availableTracksCount
    availableReportTypes
    algoliaSearchKey
    currentSchoolYear
    hasAccessToCareers
    logoUrl
    iconUrl
    permissions {
      canBrowseReports
    }
    hasUnreadConversation
    entities(page: 1, perPage: 1) {
      nodes {
        settings {
          classManagementEnabled
          schoolYearStartDate {
            day
            month
          }
        }
        uuid
      }
    }
    highlightedCatalogs {
      name
      id
    }
    email
    firstName
    lastName
    role
    standardSets {
      id
      name
      setId
    }
    username
    uuid
    id
    definedLearningUuid
    ltiDetails {
      isLti
      isLtiSearch
      ltiContextId
      ltiConsumerKey
      ltiResourceLinkId
    }
    welcomeMessage
  }
}
    `;

/**
 * __useDlUserInfoQuery__
 *
 * To run a query within a React component, call `useDlUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useDlUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDlUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useDlUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<Types.DlUserInfoQuery, Types.DlUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DlUserInfoQuery, Types.DlUserInfoQueryVariables>(DlUserInfoDocument, options);
      }
export function useDlUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DlUserInfoQuery, Types.DlUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DlUserInfoQuery, Types.DlUserInfoQueryVariables>(DlUserInfoDocument, options);
        }
export function useDlUserInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DlUserInfoQuery, Types.DlUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DlUserInfoQuery, Types.DlUserInfoQueryVariables>(DlUserInfoDocument, options);
        }
export type DlUserInfoQueryHookResult = ReturnType<typeof useDlUserInfoQuery>;
export type DlUserInfoLazyQueryHookResult = ReturnType<typeof useDlUserInfoLazyQuery>;
export type DlUserInfoSuspenseQueryHookResult = ReturnType<typeof useDlUserInfoSuspenseQuery>;
export type DlUserInfoQueryResult = Apollo.QueryResult<Types.DlUserInfoQuery, Types.DlUserInfoQueryVariables>;