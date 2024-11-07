import * as Types from './operations';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export const CourseBaseInfoFragmentDoc = gql`
    fragment CourseBaseInfo on Course {
  id
  description
  imageUrl
  name
}
    `;
export const CourseMetadataFragmentDoc = gql`
    fragment CourseMetadata on Course {
  metadata {
    alternativeTitles
    averageSalary
    jobZone
    onetCode
    outlook
  }
}
    `;
export const FinalReportCourseFragmentDoc = gql`
    fragment FinalReportCourse on Course {
  id
  assignments {
    id
    displayName
    submission {
      id
      files {
        id
        filename
        url(options: {responseContentDisposition: "attachment"})
      }
    }
  }
  name
  description
  pathway {
    name
    cluster {
      name
    }
  }
  reviewSurvey {
    questions {
      id
      answer
      question
    }
  }
}
    `;
export const ArchiveAssignmentDocument = gql`
    mutation ArchiveAssignment($input: ArchiveAssignmentMutationInput!) {
  archiveAssignment(input: $input) {
    assignment {
      archivedAt
      id
    }
  }
}
    `;
export type ArchiveAssignmentMutationFn = Apollo.MutationFunction<Types.ArchiveAssignmentMutation, Types.ArchiveAssignmentMutationVariables>;

/**
 * __useArchiveAssignmentMutation__
 *
 * To run a mutation, you first call `useArchiveAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveAssignmentMutation, { data, loading, error }] = useArchiveAssignmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveAssignmentMutation, Types.ArchiveAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveAssignmentMutation, Types.ArchiveAssignmentMutationVariables>(ArchiveAssignmentDocument, options);
      }
export type ArchiveAssignmentMutationHookResult = ReturnType<typeof useArchiveAssignmentMutation>;
export type ArchiveAssignmentMutationResult = Apollo.MutationResult<Types.ArchiveAssignmentMutation>;
export type ArchiveAssignmentMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveAssignmentMutation, Types.ArchiveAssignmentMutationVariables>;
export const ArchiveAttachmentDocument = gql`
    mutation ArchiveAttachment($input: ArchiveAttachmentMutationInput!) {
  archiveAttachment(input: $input) {
    attachment {
      archivedAt
      id
    }
  }
}
    `;
export type ArchiveAttachmentMutationFn = Apollo.MutationFunction<Types.ArchiveAttachmentMutation, Types.ArchiveAttachmentMutationVariables>;

/**
 * __useArchiveAttachmentMutation__
 *
 * To run a mutation, you first call `useArchiveAttachmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveAttachmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveAttachmentMutation, { data, loading, error }] = useArchiveAttachmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveAttachmentMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveAttachmentMutation, Types.ArchiveAttachmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveAttachmentMutation, Types.ArchiveAttachmentMutationVariables>(ArchiveAttachmentDocument, options);
      }
export type ArchiveAttachmentMutationHookResult = ReturnType<typeof useArchiveAttachmentMutation>;
export type ArchiveAttachmentMutationResult = Apollo.MutationResult<Types.ArchiveAttachmentMutation>;
export type ArchiveAttachmentMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveAttachmentMutation, Types.ArchiveAttachmentMutationVariables>;
export const ArchiveAttachmentFileDocument = gql`
    mutation ArchiveAttachmentFile($input: ArchiveAttachmentFileMutationInput!) {
  archiveAttachmentFile(input: $input) {
    attachmentFile {
      archivedAt
      id
    }
  }
}
    `;
export type ArchiveAttachmentFileMutationFn = Apollo.MutationFunction<Types.ArchiveAttachmentFileMutation, Types.ArchiveAttachmentFileMutationVariables>;

/**
 * __useArchiveAttachmentFileMutation__
 *
 * To run a mutation, you first call `useArchiveAttachmentFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveAttachmentFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveAttachmentFileMutation, { data, loading, error }] = useArchiveAttachmentFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveAttachmentFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveAttachmentFileMutation, Types.ArchiveAttachmentFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveAttachmentFileMutation, Types.ArchiveAttachmentFileMutationVariables>(ArchiveAttachmentFileDocument, options);
      }
export type ArchiveAttachmentFileMutationHookResult = ReturnType<typeof useArchiveAttachmentFileMutation>;
export type ArchiveAttachmentFileMutationResult = Apollo.MutationResult<Types.ArchiveAttachmentFileMutation>;
export type ArchiveAttachmentFileMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveAttachmentFileMutation, Types.ArchiveAttachmentFileMutationVariables>;
export const ArchiveBadgeDocument = gql`
    mutation ArchiveBadge($input: ArchiveBadgeMutationInput!) {
  archiveBadge(input: $input) {
    badge {
      archivedAt
      id
      imageUrl
      name
    }
  }
}
    `;
export type ArchiveBadgeMutationFn = Apollo.MutationFunction<Types.ArchiveBadgeMutation, Types.ArchiveBadgeMutationVariables>;

/**
 * __useArchiveBadgeMutation__
 *
 * To run a mutation, you first call `useArchiveBadgeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveBadgeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveBadgeMutation, { data, loading, error }] = useArchiveBadgeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveBadgeMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveBadgeMutation, Types.ArchiveBadgeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveBadgeMutation, Types.ArchiveBadgeMutationVariables>(ArchiveBadgeDocument, options);
      }
export type ArchiveBadgeMutationHookResult = ReturnType<typeof useArchiveBadgeMutation>;
export type ArchiveBadgeMutationResult = Apollo.MutationResult<Types.ArchiveBadgeMutation>;
export type ArchiveBadgeMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveBadgeMutation, Types.ArchiveBadgeMutationVariables>;
export const ArchiveCatalogDocument = gql`
    mutation ArchiveCatalog($input: ArchiveCatalogMutationInput!) {
  archiveCatalog(input: $input) {
    catalog {
      archivedAt
      id
    }
  }
}
    `;
export type ArchiveCatalogMutationFn = Apollo.MutationFunction<Types.ArchiveCatalogMutation, Types.ArchiveCatalogMutationVariables>;

/**
 * __useArchiveCatalogMutation__
 *
 * To run a mutation, you first call `useArchiveCatalogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveCatalogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveCatalogMutation, { data, loading, error }] = useArchiveCatalogMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveCatalogMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveCatalogMutation, Types.ArchiveCatalogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveCatalogMutation, Types.ArchiveCatalogMutationVariables>(ArchiveCatalogDocument, options);
      }
export type ArchiveCatalogMutationHookResult = ReturnType<typeof useArchiveCatalogMutation>;
export type ArchiveCatalogMutationResult = Apollo.MutationResult<Types.ArchiveCatalogMutation>;
export type ArchiveCatalogMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveCatalogMutation, Types.ArchiveCatalogMutationVariables>;
export const ArchiveCheckInGroupDocument = gql`
    mutation ArchiveCheckInGroup($input: ArchiveCheckInGroupMutationInput!) {
  archiveCheckInGroup(input: $input) {
    checkInGroup {
      archivedAt
      id
    }
  }
}
    `;
export type ArchiveCheckInGroupMutationFn = Apollo.MutationFunction<Types.ArchiveCheckInGroupMutation, Types.ArchiveCheckInGroupMutationVariables>;

/**
 * __useArchiveCheckInGroupMutation__
 *
 * To run a mutation, you first call `useArchiveCheckInGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveCheckInGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveCheckInGroupMutation, { data, loading, error }] = useArchiveCheckInGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveCheckInGroupMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveCheckInGroupMutation, Types.ArchiveCheckInGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveCheckInGroupMutation, Types.ArchiveCheckInGroupMutationVariables>(ArchiveCheckInGroupDocument, options);
      }
export type ArchiveCheckInGroupMutationHookResult = ReturnType<typeof useArchiveCheckInGroupMutation>;
export type ArchiveCheckInGroupMutationResult = Apollo.MutationResult<Types.ArchiveCheckInGroupMutation>;
export type ArchiveCheckInGroupMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveCheckInGroupMutation, Types.ArchiveCheckInGroupMutationVariables>;
export const DcArchiveCheckInQuestionDocument = gql`
    mutation DcArchiveCheckInQuestion($input: ArchiveCheckInQuestionMutationInput!) {
  archiveCheckInQuestion(input: $input) {
    checkInQuestion {
      archivedAt
      id
    }
  }
}
    `;
export type DcArchiveCheckInQuestionMutationFn = Apollo.MutationFunction<Types.DcArchiveCheckInQuestionMutation, Types.DcArchiveCheckInQuestionMutationVariables>;

/**
 * __useDcArchiveCheckInQuestionMutation__
 *
 * To run a mutation, you first call `useDcArchiveCheckInQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDcArchiveCheckInQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dcArchiveCheckInQuestionMutation, { data, loading, error }] = useDcArchiveCheckInQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDcArchiveCheckInQuestionMutation(baseOptions?: Apollo.MutationHookOptions<Types.DcArchiveCheckInQuestionMutation, Types.DcArchiveCheckInQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DcArchiveCheckInQuestionMutation, Types.DcArchiveCheckInQuestionMutationVariables>(DcArchiveCheckInQuestionDocument, options);
      }
export type DcArchiveCheckInQuestionMutationHookResult = ReturnType<typeof useDcArchiveCheckInQuestionMutation>;
export type DcArchiveCheckInQuestionMutationResult = Apollo.MutationResult<Types.DcArchiveCheckInQuestionMutation>;
export type DcArchiveCheckInQuestionMutationOptions = Apollo.BaseMutationOptions<Types.DcArchiveCheckInQuestionMutation, Types.DcArchiveCheckInQuestionMutationVariables>;
export const ArchiveCourseDocument = gql`
    mutation ArchiveCourse($input: ArchiveCourseMutationInput!) {
  archiveCourse(input: $input) {
    course {
      archivedAt
      id
    }
  }
}
    `;
export type ArchiveCourseMutationFn = Apollo.MutationFunction<Types.ArchiveCourseMutation, Types.ArchiveCourseMutationVariables>;

/**
 * __useArchiveCourseMutation__
 *
 * To run a mutation, you first call `useArchiveCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveCourseMutation, { data, loading, error }] = useArchiveCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveCourseMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveCourseMutation, Types.ArchiveCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveCourseMutation, Types.ArchiveCourseMutationVariables>(ArchiveCourseDocument, options);
      }
export type ArchiveCourseMutationHookResult = ReturnType<typeof useArchiveCourseMutation>;
export type ArchiveCourseMutationResult = Apollo.MutationResult<Types.ArchiveCourseMutation>;
export type ArchiveCourseMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveCourseMutation, Types.ArchiveCourseMutationVariables>;
export const ArchiveExtensionFieldDocument = gql`
    mutation ArchiveExtensionField($input: ArchiveExtensionFieldMutationInput!) {
  archiveExtensionField(input: $input) {
    extensionField {
      id
    }
  }
}
    `;
export type ArchiveExtensionFieldMutationFn = Apollo.MutationFunction<Types.ArchiveExtensionFieldMutation, Types.ArchiveExtensionFieldMutationVariables>;

/**
 * __useArchiveExtensionFieldMutation__
 *
 * To run a mutation, you first call `useArchiveExtensionFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveExtensionFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveExtensionFieldMutation, { data, loading, error }] = useArchiveExtensionFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveExtensionFieldMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveExtensionFieldMutation, Types.ArchiveExtensionFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveExtensionFieldMutation, Types.ArchiveExtensionFieldMutationVariables>(ArchiveExtensionFieldDocument, options);
      }
export type ArchiveExtensionFieldMutationHookResult = ReturnType<typeof useArchiveExtensionFieldMutation>;
export type ArchiveExtensionFieldMutationResult = Apollo.MutationResult<Types.ArchiveExtensionFieldMutation>;
export type ArchiveExtensionFieldMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveExtensionFieldMutation, Types.ArchiveExtensionFieldMutationVariables>;
export const ArchiveExtensionFieldFileDocument = gql`
    mutation ArchiveExtensionFieldFile($input: ArchiveExtensionFieldFileMutationInput!) {
  archiveExtensionFieldFile(input: $input) {
    extensionFieldFile {
      filename
      id
      url
    }
  }
}
    `;
export type ArchiveExtensionFieldFileMutationFn = Apollo.MutationFunction<Types.ArchiveExtensionFieldFileMutation, Types.ArchiveExtensionFieldFileMutationVariables>;

/**
 * __useArchiveExtensionFieldFileMutation__
 *
 * To run a mutation, you first call `useArchiveExtensionFieldFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveExtensionFieldFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveExtensionFieldFileMutation, { data, loading, error }] = useArchiveExtensionFieldFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveExtensionFieldFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveExtensionFieldFileMutation, Types.ArchiveExtensionFieldFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveExtensionFieldFileMutation, Types.ArchiveExtensionFieldFileMutationVariables>(ArchiveExtensionFieldFileDocument, options);
      }
export type ArchiveExtensionFieldFileMutationHookResult = ReturnType<typeof useArchiveExtensionFieldFileMutation>;
export type ArchiveExtensionFieldFileMutationResult = Apollo.MutationResult<Types.ArchiveExtensionFieldFileMutation>;
export type ArchiveExtensionFieldFileMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveExtensionFieldFileMutation, Types.ArchiveExtensionFieldFileMutationVariables>;
export const ArchiveExternalPresentationDocument = gql`
    mutation ArchiveExternalPresentation($input: ArchiveExternalPresentationMutationInput!) {
  archiveExternalPresentation(input: $input) {
    externalPresentation {
      id
      archivedAt
    }
  }
}
    `;
export type ArchiveExternalPresentationMutationFn = Apollo.MutationFunction<Types.ArchiveExternalPresentationMutation, Types.ArchiveExternalPresentationMutationVariables>;

/**
 * __useArchiveExternalPresentationMutation__
 *
 * To run a mutation, you first call `useArchiveExternalPresentationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveExternalPresentationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveExternalPresentationMutation, { data, loading, error }] = useArchiveExternalPresentationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveExternalPresentationMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveExternalPresentationMutation, Types.ArchiveExternalPresentationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveExternalPresentationMutation, Types.ArchiveExternalPresentationMutationVariables>(ArchiveExternalPresentationDocument, options);
      }
export type ArchiveExternalPresentationMutationHookResult = ReturnType<typeof useArchiveExternalPresentationMutation>;
export type ArchiveExternalPresentationMutationResult = Apollo.MutationResult<Types.ArchiveExternalPresentationMutation>;
export type ArchiveExternalPresentationMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveExternalPresentationMutation, Types.ArchiveExternalPresentationMutationVariables>;
export const ArchiveLessonDocument = gql`
    mutation ArchiveLesson($input: ArchiveLessonMutationInput!) {
  archiveLesson(input: $input) {
    lesson {
      id
      archivedAt
    }
  }
}
    `;
export type ArchiveLessonMutationFn = Apollo.MutationFunction<Types.ArchiveLessonMutation, Types.ArchiveLessonMutationVariables>;

/**
 * __useArchiveLessonMutation__
 *
 * To run a mutation, you first call `useArchiveLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveLessonMutation, { data, loading, error }] = useArchiveLessonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveLessonMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveLessonMutation, Types.ArchiveLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveLessonMutation, Types.ArchiveLessonMutationVariables>(ArchiveLessonDocument, options);
      }
export type ArchiveLessonMutationHookResult = ReturnType<typeof useArchiveLessonMutation>;
export type ArchiveLessonMutationResult = Apollo.MutationResult<Types.ArchiveLessonMutation>;
export type ArchiveLessonMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveLessonMutation, Types.ArchiveLessonMutationVariables>;
export const ArchivePartnerDocument = gql`
    mutation ArchivePartner($input: ArchivePartnerMutationInput!) {
  archivePartner(input: $input) {
    partner {
      id
      isArchived
    }
  }
}
    `;
export type ArchivePartnerMutationFn = Apollo.MutationFunction<Types.ArchivePartnerMutation, Types.ArchivePartnerMutationVariables>;

/**
 * __useArchivePartnerMutation__
 *
 * To run a mutation, you first call `useArchivePartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchivePartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archivePartnerMutation, { data, loading, error }] = useArchivePartnerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchivePartnerMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchivePartnerMutation, Types.ArchivePartnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchivePartnerMutation, Types.ArchivePartnerMutationVariables>(ArchivePartnerDocument, options);
      }
export type ArchivePartnerMutationHookResult = ReturnType<typeof useArchivePartnerMutation>;
export type ArchivePartnerMutationResult = Apollo.MutationResult<Types.ArchivePartnerMutation>;
export type ArchivePartnerMutationOptions = Apollo.BaseMutationOptions<Types.ArchivePartnerMutation, Types.ArchivePartnerMutationVariables>;
export const ArchivePlanDocument = gql`
    mutation ArchivePlan($input: ArchivePlanMutationInput!) {
  archivePlan(input: $input) {
    plan {
      archivedAt
      id
    }
  }
}
    `;
export type ArchivePlanMutationFn = Apollo.MutationFunction<Types.ArchivePlanMutation, Types.ArchivePlanMutationVariables>;

/**
 * __useArchivePlanMutation__
 *
 * To run a mutation, you first call `useArchivePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchivePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archivePlanMutation, { data, loading, error }] = useArchivePlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchivePlanMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchivePlanMutation, Types.ArchivePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchivePlanMutation, Types.ArchivePlanMutationVariables>(ArchivePlanDocument, options);
      }
export type ArchivePlanMutationHookResult = ReturnType<typeof useArchivePlanMutation>;
export type ArchivePlanMutationResult = Apollo.MutationResult<Types.ArchivePlanMutation>;
export type ArchivePlanMutationOptions = Apollo.BaseMutationOptions<Types.ArchivePlanMutation, Types.ArchivePlanMutationVariables>;
export const ArchivePlanGroupDocument = gql`
    mutation ArchivePlanGroup($input: ArchivePlanGroupMutationInput!) {
  archivePlanGroup(input: $input) {
    planGroup {
      archivedAt
      id
    }
  }
}
    `;
export type ArchivePlanGroupMutationFn = Apollo.MutationFunction<Types.ArchivePlanGroupMutation, Types.ArchivePlanGroupMutationVariables>;

/**
 * __useArchivePlanGroupMutation__
 *
 * To run a mutation, you first call `useArchivePlanGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchivePlanGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archivePlanGroupMutation, { data, loading, error }] = useArchivePlanGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchivePlanGroupMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchivePlanGroupMutation, Types.ArchivePlanGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchivePlanGroupMutation, Types.ArchivePlanGroupMutationVariables>(ArchivePlanGroupDocument, options);
      }
export type ArchivePlanGroupMutationHookResult = ReturnType<typeof useArchivePlanGroupMutation>;
export type ArchivePlanGroupMutationResult = Apollo.MutationResult<Types.ArchivePlanGroupMutation>;
export type ArchivePlanGroupMutationOptions = Apollo.BaseMutationOptions<Types.ArchivePlanGroupMutation, Types.ArchivePlanGroupMutationVariables>;
export const ArchivePlanGroupStatementDocument = gql`
    mutation ArchivePlanGroupStatement($input: ArchivePlanGroupStatementMutationInput!) {
  archivePlanGroupStatement(input: $input) {
    planGroupStatement {
      archivedAt
      id
    }
  }
}
    `;
export type ArchivePlanGroupStatementMutationFn = Apollo.MutationFunction<Types.ArchivePlanGroupStatementMutation, Types.ArchivePlanGroupStatementMutationVariables>;

/**
 * __useArchivePlanGroupStatementMutation__
 *
 * To run a mutation, you first call `useArchivePlanGroupStatementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchivePlanGroupStatementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archivePlanGroupStatementMutation, { data, loading, error }] = useArchivePlanGroupStatementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchivePlanGroupStatementMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchivePlanGroupStatementMutation, Types.ArchivePlanGroupStatementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchivePlanGroupStatementMutation, Types.ArchivePlanGroupStatementMutationVariables>(ArchivePlanGroupStatementDocument, options);
      }
export type ArchivePlanGroupStatementMutationHookResult = ReturnType<typeof useArchivePlanGroupStatementMutation>;
export type ArchivePlanGroupStatementMutationResult = Apollo.MutationResult<Types.ArchivePlanGroupStatementMutation>;
export type ArchivePlanGroupStatementMutationOptions = Apollo.BaseMutationOptions<Types.ArchivePlanGroupStatementMutation, Types.ArchivePlanGroupStatementMutationVariables>;
export const ArchiveProductDocument = gql`
    mutation ArchiveProduct($input: ArchiveProductMutationInput!) {
  archiveProduct(input: $input) {
    product {
      archivedAt
      id
    }
  }
}
    `;
export type ArchiveProductMutationFn = Apollo.MutationFunction<Types.ArchiveProductMutation, Types.ArchiveProductMutationVariables>;

/**
 * __useArchiveProductMutation__
 *
 * To run a mutation, you first call `useArchiveProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveProductMutation, { data, loading, error }] = useArchiveProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveProductMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveProductMutation, Types.ArchiveProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveProductMutation, Types.ArchiveProductMutationVariables>(ArchiveProductDocument, options);
      }
export type ArchiveProductMutationHookResult = ReturnType<typeof useArchiveProductMutation>;
export type ArchiveProductMutationResult = Apollo.MutationResult<Types.ArchiveProductMutation>;
export type ArchiveProductMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveProductMutation, Types.ArchiveProductMutationVariables>;
export const ArchiveResearchLinkDocument = gql`
    mutation ArchiveResearchLink($input: ArchiveResearchLinkMutationInput!) {
  archiveResearchLink(input: $input) {
    researchLink {
      archivedAt
      id
    }
  }
}
    `;
export type ArchiveResearchLinkMutationFn = Apollo.MutationFunction<Types.ArchiveResearchLinkMutation, Types.ArchiveResearchLinkMutationVariables>;

/**
 * __useArchiveResearchLinkMutation__
 *
 * To run a mutation, you first call `useArchiveResearchLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveResearchLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveResearchLinkMutation, { data, loading, error }] = useArchiveResearchLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveResearchLinkMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveResearchLinkMutation, Types.ArchiveResearchLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveResearchLinkMutation, Types.ArchiveResearchLinkMutationVariables>(ArchiveResearchLinkDocument, options);
      }
export type ArchiveResearchLinkMutationHookResult = ReturnType<typeof useArchiveResearchLinkMutation>;
export type ArchiveResearchLinkMutationResult = Apollo.MutationResult<Types.ArchiveResearchLinkMutation>;
export type ArchiveResearchLinkMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveResearchLinkMutation, Types.ArchiveResearchLinkMutationVariables>;
export const ArchiveRubricDocument = gql`
    mutation ArchiveRubric($input: ArchiveRubricMutationInput!) {
  archiveRubric(input: $input) {
    rubric {
      archivedAt
      id
    }
  }
}
    `;
export type ArchiveRubricMutationFn = Apollo.MutationFunction<Types.ArchiveRubricMutation, Types.ArchiveRubricMutationVariables>;

/**
 * __useArchiveRubricMutation__
 *
 * To run a mutation, you first call `useArchiveRubricMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveRubricMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveRubricMutation, { data, loading, error }] = useArchiveRubricMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveRubricMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveRubricMutation, Types.ArchiveRubricMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveRubricMutation, Types.ArchiveRubricMutationVariables>(ArchiveRubricDocument, options);
      }
export type ArchiveRubricMutationHookResult = ReturnType<typeof useArchiveRubricMutation>;
export type ArchiveRubricMutationResult = Apollo.MutationResult<Types.ArchiveRubricMutation>;
export type ArchiveRubricMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveRubricMutation, Types.ArchiveRubricMutationVariables>;
export const ArchiveSlideDocument = gql`
    mutation ArchiveSlide($input: ArchiveSlideMutationInput!) {
  archiveSlide(input: $input) {
    slide {
      id
    }
  }
}
    `;
export type ArchiveSlideMutationFn = Apollo.MutationFunction<Types.ArchiveSlideMutation, Types.ArchiveSlideMutationVariables>;

/**
 * __useArchiveSlideMutation__
 *
 * To run a mutation, you first call `useArchiveSlideMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveSlideMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveSlideMutation, { data, loading, error }] = useArchiveSlideMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveSlideMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveSlideMutation, Types.ArchiveSlideMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveSlideMutation, Types.ArchiveSlideMutationVariables>(ArchiveSlideDocument, options);
      }
export type ArchiveSlideMutationHookResult = ReturnType<typeof useArchiveSlideMutation>;
export type ArchiveSlideMutationResult = Apollo.MutationResult<Types.ArchiveSlideMutation>;
export type ArchiveSlideMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveSlideMutation, Types.ArchiveSlideMutationVariables>;
export const ArchiveSlideBackgroundImageDocument = gql`
    mutation ArchiveSlideBackgroundImage($input: ArchiveSlideBackgroundImageMutationInput!) {
  archiveSlideBackgroundImage(input: $input) {
    slideBackgroundImage {
      id
    }
  }
}
    `;
export type ArchiveSlideBackgroundImageMutationFn = Apollo.MutationFunction<Types.ArchiveSlideBackgroundImageMutation, Types.ArchiveSlideBackgroundImageMutationVariables>;

/**
 * __useArchiveSlideBackgroundImageMutation__
 *
 * To run a mutation, you first call `useArchiveSlideBackgroundImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveSlideBackgroundImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveSlideBackgroundImageMutation, { data, loading, error }] = useArchiveSlideBackgroundImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveSlideBackgroundImageMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveSlideBackgroundImageMutation, Types.ArchiveSlideBackgroundImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveSlideBackgroundImageMutation, Types.ArchiveSlideBackgroundImageMutationVariables>(ArchiveSlideBackgroundImageDocument, options);
      }
export type ArchiveSlideBackgroundImageMutationHookResult = ReturnType<typeof useArchiveSlideBackgroundImageMutation>;
export type ArchiveSlideBackgroundImageMutationResult = Apollo.MutationResult<Types.ArchiveSlideBackgroundImageMutation>;
export type ArchiveSlideBackgroundImageMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveSlideBackgroundImageMutation, Types.ArchiveSlideBackgroundImageMutationVariables>;
export const ArchiveSlideImageDocument = gql`
    mutation ArchiveSlideImage($input: ArchiveSlideImageMutationInput!) {
  archiveSlideImage(input: $input) {
    slideImage {
      id
    }
  }
}
    `;
export type ArchiveSlideImageMutationFn = Apollo.MutationFunction<Types.ArchiveSlideImageMutation, Types.ArchiveSlideImageMutationVariables>;

/**
 * __useArchiveSlideImageMutation__
 *
 * To run a mutation, you first call `useArchiveSlideImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveSlideImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveSlideImageMutation, { data, loading, error }] = useArchiveSlideImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveSlideImageMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveSlideImageMutation, Types.ArchiveSlideImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveSlideImageMutation, Types.ArchiveSlideImageMutationVariables>(ArchiveSlideImageDocument, options);
      }
export type ArchiveSlideImageMutationHookResult = ReturnType<typeof useArchiveSlideImageMutation>;
export type ArchiveSlideImageMutationResult = Apollo.MutationResult<Types.ArchiveSlideImageMutation>;
export type ArchiveSlideImageMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveSlideImageMutation, Types.ArchiveSlideImageMutationVariables>;
export const ArchiveSlideVideoDocument = gql`
    mutation ArchiveSlideVideo($input: ArchiveSlideVideoMutationInput!) {
  archiveSlideVideo(input: $input) {
    slideVideo {
      id
    }
  }
}
    `;
export type ArchiveSlideVideoMutationFn = Apollo.MutationFunction<Types.ArchiveSlideVideoMutation, Types.ArchiveSlideVideoMutationVariables>;

/**
 * __useArchiveSlideVideoMutation__
 *
 * To run a mutation, you first call `useArchiveSlideVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveSlideVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveSlideVideoMutation, { data, loading, error }] = useArchiveSlideVideoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveSlideVideoMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveSlideVideoMutation, Types.ArchiveSlideVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveSlideVideoMutation, Types.ArchiveSlideVideoMutationVariables>(ArchiveSlideVideoDocument, options);
      }
export type ArchiveSlideVideoMutationHookResult = ReturnType<typeof useArchiveSlideVideoMutation>;
export type ArchiveSlideVideoMutationResult = Apollo.MutationResult<Types.ArchiveSlideVideoMutation>;
export type ArchiveSlideVideoMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveSlideVideoMutation, Types.ArchiveSlideVideoMutationVariables>;
export const ArchiveTaskDocument = gql`
    mutation ArchiveTask($input: ArchiveTaskMutationInput!) {
  archiveTask(input: $input) {
    task {
      archivedAt
      id
    }
  }
}
    `;
export type ArchiveTaskMutationFn = Apollo.MutationFunction<Types.ArchiveTaskMutation, Types.ArchiveTaskMutationVariables>;

/**
 * __useArchiveTaskMutation__
 *
 * To run a mutation, you first call `useArchiveTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveTaskMutation, { data, loading, error }] = useArchiveTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveTaskMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveTaskMutation, Types.ArchiveTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveTaskMutation, Types.ArchiveTaskMutationVariables>(ArchiveTaskDocument, options);
      }
export type ArchiveTaskMutationHookResult = ReturnType<typeof useArchiveTaskMutation>;
export type ArchiveTaskMutationResult = Apollo.MutationResult<Types.ArchiveTaskMutation>;
export type ArchiveTaskMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveTaskMutation, Types.ArchiveTaskMutationVariables>;
export const ArchiveTextDocument = gql`
    mutation ArchiveText($input: ArchiveTextMutationInput!) {
  archiveText(input: $input) {
    text {
      archivedAt
      id
    }
  }
}
    `;
export type ArchiveTextMutationFn = Apollo.MutationFunction<Types.ArchiveTextMutation, Types.ArchiveTextMutationVariables>;

/**
 * __useArchiveTextMutation__
 *
 * To run a mutation, you first call `useArchiveTextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveTextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveTextMutation, { data, loading, error }] = useArchiveTextMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveTextMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveTextMutation, Types.ArchiveTextMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveTextMutation, Types.ArchiveTextMutationVariables>(ArchiveTextDocument, options);
      }
export type ArchiveTextMutationHookResult = ReturnType<typeof useArchiveTextMutation>;
export type ArchiveTextMutationResult = Apollo.MutationResult<Types.ArchiveTextMutation>;
export type ArchiveTextMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveTextMutation, Types.ArchiveTextMutationVariables>;
export const ArchiveTrackDocument = gql`
    mutation ArchiveTrack($input: ArchiveTrackMutationInput!) {
  archiveTrack(input: $input) {
    track {
      archivedAt
      id
    }
  }
}
    `;
export type ArchiveTrackMutationFn = Apollo.MutationFunction<Types.ArchiveTrackMutation, Types.ArchiveTrackMutationVariables>;

/**
 * __useArchiveTrackMutation__
 *
 * To run a mutation, you first call `useArchiveTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveTrackMutation, { data, loading, error }] = useArchiveTrackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveTrackMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveTrackMutation, Types.ArchiveTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveTrackMutation, Types.ArchiveTrackMutationVariables>(ArchiveTrackDocument, options);
      }
export type ArchiveTrackMutationHookResult = ReturnType<typeof useArchiveTrackMutation>;
export type ArchiveTrackMutationResult = Apollo.MutationResult<Types.ArchiveTrackMutation>;
export type ArchiveTrackMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveTrackMutation, Types.ArchiveTrackMutationVariables>;
export const ArchiveUnitDocument = gql`
    mutation ArchiveUnit($input: ArchiveUnitMutationInput!) {
  archiveUnit(input: $input) {
    unit {
      archivedAt
      description
      id
      imageUrl
      name
    }
  }
}
    `;
export type ArchiveUnitMutationFn = Apollo.MutationFunction<Types.ArchiveUnitMutation, Types.ArchiveUnitMutationVariables>;

/**
 * __useArchiveUnitMutation__
 *
 * To run a mutation, you first call `useArchiveUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveUnitMutation, { data, loading, error }] = useArchiveUnitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveUnitMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveUnitMutation, Types.ArchiveUnitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveUnitMutation, Types.ArchiveUnitMutationVariables>(ArchiveUnitDocument, options);
      }
export type ArchiveUnitMutationHookResult = ReturnType<typeof useArchiveUnitMutation>;
export type ArchiveUnitMutationResult = Apollo.MutationResult<Types.ArchiveUnitMutation>;
export type ArchiveUnitMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveUnitMutation, Types.ArchiveUnitMutationVariables>;
export const ArchiveVideoDocument = gql`
    mutation ArchiveVideo($input: ArchiveVideoMutationInput!) {
  archiveVideo(input: $input) {
    video {
      archivedAt
      id
    }
  }
}
    `;
export type ArchiveVideoMutationFn = Apollo.MutationFunction<Types.ArchiveVideoMutation, Types.ArchiveVideoMutationVariables>;

/**
 * __useArchiveVideoMutation__
 *
 * To run a mutation, you first call `useArchiveVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveVideoMutation, { data, loading, error }] = useArchiveVideoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveVideoMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveVideoMutation, Types.ArchiveVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveVideoMutation, Types.ArchiveVideoMutationVariables>(ArchiveVideoDocument, options);
      }
export type ArchiveVideoMutationHookResult = ReturnType<typeof useArchiveVideoMutation>;
export type ArchiveVideoMutationResult = Apollo.MutationResult<Types.ArchiveVideoMutation>;
export type ArchiveVideoMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveVideoMutation, Types.ArchiveVideoMutationVariables>;
export const ArchiveVirtualInternshipDocument = gql`
    mutation ArchiveVirtualInternship($input: ArchiveVirtualInternshipMutationInput!) {
  archiveVirtualInternship(input: $input) {
    virtualInternship {
      id
    }
  }
}
    `;
export type ArchiveVirtualInternshipMutationFn = Apollo.MutationFunction<Types.ArchiveVirtualInternshipMutation, Types.ArchiveVirtualInternshipMutationVariables>;

/**
 * __useArchiveVirtualInternshipMutation__
 *
 * To run a mutation, you first call `useArchiveVirtualInternshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveVirtualInternshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveVirtualInternshipMutation, { data, loading, error }] = useArchiveVirtualInternshipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveVirtualInternshipMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveVirtualInternshipMutation, Types.ArchiveVirtualInternshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveVirtualInternshipMutation, Types.ArchiveVirtualInternshipMutationVariables>(ArchiveVirtualInternshipDocument, options);
      }
export type ArchiveVirtualInternshipMutationHookResult = ReturnType<typeof useArchiveVirtualInternshipMutation>;
export type ArchiveVirtualInternshipMutationResult = Apollo.MutationResult<Types.ArchiveVirtualInternshipMutation>;
export type ArchiveVirtualInternshipMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveVirtualInternshipMutation, Types.ArchiveVirtualInternshipMutationVariables>;
export const ArchiveVocabularyDocument = gql`
    mutation ArchiveVocabulary($input: ArchiveVocabularyMutationInput!) {
  archiveVocabulary(input: $input) {
    vocabulary {
      archivedAt
      id
    }
  }
}
    `;
export type ArchiveVocabularyMutationFn = Apollo.MutationFunction<Types.ArchiveVocabularyMutation, Types.ArchiveVocabularyMutationVariables>;

/**
 * __useArchiveVocabularyMutation__
 *
 * To run a mutation, you first call `useArchiveVocabularyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveVocabularyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveVocabularyMutation, { data, loading, error }] = useArchiveVocabularyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveVocabularyMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveVocabularyMutation, Types.ArchiveVocabularyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveVocabularyMutation, Types.ArchiveVocabularyMutationVariables>(ArchiveVocabularyDocument, options);
      }
export type ArchiveVocabularyMutationHookResult = ReturnType<typeof useArchiveVocabularyMutation>;
export type ArchiveVocabularyMutationResult = Apollo.MutationResult<Types.ArchiveVocabularyMutation>;
export type ArchiveVocabularyMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveVocabularyMutation, Types.ArchiveVocabularyMutationVariables>;
export const AssignExtensionFieldToEntityDocument = gql`
    mutation AssignExtensionFieldToEntity($input: AssignExtensionFieldToEntityMutationInput!) {
  assignExtensionFieldToEntity(input: $input) {
    extensionField {
      id
    }
  }
}
    `;
export type AssignExtensionFieldToEntityMutationFn = Apollo.MutationFunction<Types.AssignExtensionFieldToEntityMutation, Types.AssignExtensionFieldToEntityMutationVariables>;

/**
 * __useAssignExtensionFieldToEntityMutation__
 *
 * To run a mutation, you first call `useAssignExtensionFieldToEntityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignExtensionFieldToEntityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignExtensionFieldToEntityMutation, { data, loading, error }] = useAssignExtensionFieldToEntityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignExtensionFieldToEntityMutation(baseOptions?: Apollo.MutationHookOptions<Types.AssignExtensionFieldToEntityMutation, Types.AssignExtensionFieldToEntityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AssignExtensionFieldToEntityMutation, Types.AssignExtensionFieldToEntityMutationVariables>(AssignExtensionFieldToEntityDocument, options);
      }
export type AssignExtensionFieldToEntityMutationHookResult = ReturnType<typeof useAssignExtensionFieldToEntityMutation>;
export type AssignExtensionFieldToEntityMutationResult = Apollo.MutationResult<Types.AssignExtensionFieldToEntityMutation>;
export type AssignExtensionFieldToEntityMutationOptions = Apollo.BaseMutationOptions<Types.AssignExtensionFieldToEntityMutation, Types.AssignExtensionFieldToEntityMutationVariables>;
export const AssignPlanToEntityDocument = gql`
    mutation AssignPlanToEntity($input: AssignPlanToEntityMutationInput!) {
  assignPlanToEntity(input: $input) {
    plan {
      id
    }
  }
}
    `;
export type AssignPlanToEntityMutationFn = Apollo.MutationFunction<Types.AssignPlanToEntityMutation, Types.AssignPlanToEntityMutationVariables>;

/**
 * __useAssignPlanToEntityMutation__
 *
 * To run a mutation, you first call `useAssignPlanToEntityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignPlanToEntityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignPlanToEntityMutation, { data, loading, error }] = useAssignPlanToEntityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignPlanToEntityMutation(baseOptions?: Apollo.MutationHookOptions<Types.AssignPlanToEntityMutation, Types.AssignPlanToEntityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AssignPlanToEntityMutation, Types.AssignPlanToEntityMutationVariables>(AssignPlanToEntityDocument, options);
      }
export type AssignPlanToEntityMutationHookResult = ReturnType<typeof useAssignPlanToEntityMutation>;
export type AssignPlanToEntityMutationResult = Apollo.MutationResult<Types.AssignPlanToEntityMutation>;
export type AssignPlanToEntityMutationOptions = Apollo.BaseMutationOptions<Types.AssignPlanToEntityMutation, Types.AssignPlanToEntityMutationVariables>;
export const AssignSchoolClassToCourseDocument = gql`
    mutation AssignSchoolClassToCourse($input: AssignSchoolClassToCourseMutationInput!) {
  assignSchoolClassToCourse(input: $input) {
    status
  }
}
    `;
export type AssignSchoolClassToCourseMutationFn = Apollo.MutationFunction<Types.AssignSchoolClassToCourseMutation, Types.AssignSchoolClassToCourseMutationVariables>;

/**
 * __useAssignSchoolClassToCourseMutation__
 *
 * To run a mutation, you first call `useAssignSchoolClassToCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignSchoolClassToCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignSchoolClassToCourseMutation, { data, loading, error }] = useAssignSchoolClassToCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignSchoolClassToCourseMutation(baseOptions?: Apollo.MutationHookOptions<Types.AssignSchoolClassToCourseMutation, Types.AssignSchoolClassToCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AssignSchoolClassToCourseMutation, Types.AssignSchoolClassToCourseMutationVariables>(AssignSchoolClassToCourseDocument, options);
      }
export type AssignSchoolClassToCourseMutationHookResult = ReturnType<typeof useAssignSchoolClassToCourseMutation>;
export type AssignSchoolClassToCourseMutationResult = Apollo.MutationResult<Types.AssignSchoolClassToCourseMutation>;
export type AssignSchoolClassToCourseMutationOptions = Apollo.BaseMutationOptions<Types.AssignSchoolClassToCourseMutation, Types.AssignSchoolClassToCourseMutationVariables>;
export const AssignStandardSetToEntityDocument = gql`
    mutation AssignStandardSetToEntity($input: AssignStandardSetToEntityMutationInput!) {
  assignStandardSetToEntity(input: $input) {
    standardSet {
      id
      entities {
        nodes {
          standardSets {
            id
          }
          uuid
        }
      }
    }
  }
}
    `;
export type AssignStandardSetToEntityMutationFn = Apollo.MutationFunction<Types.AssignStandardSetToEntityMutation, Types.AssignStandardSetToEntityMutationVariables>;

/**
 * __useAssignStandardSetToEntityMutation__
 *
 * To run a mutation, you first call `useAssignStandardSetToEntityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignStandardSetToEntityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignStandardSetToEntityMutation, { data, loading, error }] = useAssignStandardSetToEntityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignStandardSetToEntityMutation(baseOptions?: Apollo.MutationHookOptions<Types.AssignStandardSetToEntityMutation, Types.AssignStandardSetToEntityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AssignStandardSetToEntityMutation, Types.AssignStandardSetToEntityMutationVariables>(AssignStandardSetToEntityDocument, options);
      }
export type AssignStandardSetToEntityMutationHookResult = ReturnType<typeof useAssignStandardSetToEntityMutation>;
export type AssignStandardSetToEntityMutationResult = Apollo.MutationResult<Types.AssignStandardSetToEntityMutation>;
export type AssignStandardSetToEntityMutationOptions = Apollo.BaseMutationOptions<Types.AssignStandardSetToEntityMutation, Types.AssignStandardSetToEntityMutationVariables>;
export const AssignStudentToCourseDocument = gql`
    mutation AssignStudentToCourse($input: AssignStudentToCourseMutationInput!) {
  assignStudentToCourse(input: $input) {
    course {
      id
      imageUrl
      name
      progress {
        submitted
        total
      }
      status
      pathway {
        name
      }
    }
  }
}
    `;
export type AssignStudentToCourseMutationFn = Apollo.MutationFunction<Types.AssignStudentToCourseMutation, Types.AssignStudentToCourseMutationVariables>;

/**
 * __useAssignStudentToCourseMutation__
 *
 * To run a mutation, you first call `useAssignStudentToCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignStudentToCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignStudentToCourseMutation, { data, loading, error }] = useAssignStudentToCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignStudentToCourseMutation(baseOptions?: Apollo.MutationHookOptions<Types.AssignStudentToCourseMutation, Types.AssignStudentToCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AssignStudentToCourseMutation, Types.AssignStudentToCourseMutationVariables>(AssignStudentToCourseDocument, options);
      }
export type AssignStudentToCourseMutationHookResult = ReturnType<typeof useAssignStudentToCourseMutation>;
export type AssignStudentToCourseMutationResult = Apollo.MutationResult<Types.AssignStudentToCourseMutation>;
export type AssignStudentToCourseMutationOptions = Apollo.BaseMutationOptions<Types.AssignStudentToCourseMutation, Types.AssignStudentToCourseMutationVariables>;
export const AssignStudentsToCounselorDocument = gql`
    mutation AssignStudentsToCounselor($input: AssignStudentsToCounselorMutationInput!) {
  assignStudentsToCounselor(input: $input) {
    students {
      uuid
      counselor {
        uuid
        fullName
      }
    }
  }
}
    `;
export type AssignStudentsToCounselorMutationFn = Apollo.MutationFunction<Types.AssignStudentsToCounselorMutation, Types.AssignStudentsToCounselorMutationVariables>;

/**
 * __useAssignStudentsToCounselorMutation__
 *
 * To run a mutation, you first call `useAssignStudentsToCounselorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignStudentsToCounselorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignStudentsToCounselorMutation, { data, loading, error }] = useAssignStudentsToCounselorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignStudentsToCounselorMutation(baseOptions?: Apollo.MutationHookOptions<Types.AssignStudentsToCounselorMutation, Types.AssignStudentsToCounselorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AssignStudentsToCounselorMutation, Types.AssignStudentsToCounselorMutationVariables>(AssignStudentsToCounselorDocument, options);
      }
export type AssignStudentsToCounselorMutationHookResult = ReturnType<typeof useAssignStudentsToCounselorMutation>;
export type AssignStudentsToCounselorMutationResult = Apollo.MutationResult<Types.AssignStudentsToCounselorMutation>;
export type AssignStudentsToCounselorMutationOptions = Apollo.BaseMutationOptions<Types.AssignStudentsToCounselorMutation, Types.AssignStudentsToCounselorMutationVariables>;
export const ClearCacheDocument = gql`
    mutation ClearCache($input: ClearCacheMutationInput!) {
  clearCache(input: $input) {
    status
  }
}
    `;
export type ClearCacheMutationFn = Apollo.MutationFunction<Types.ClearCacheMutation, Types.ClearCacheMutationVariables>;

/**
 * __useClearCacheMutation__
 *
 * To run a mutation, you first call `useClearCacheMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearCacheMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearCacheMutation, { data, loading, error }] = useClearCacheMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useClearCacheMutation(baseOptions?: Apollo.MutationHookOptions<Types.ClearCacheMutation, Types.ClearCacheMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ClearCacheMutation, Types.ClearCacheMutationVariables>(ClearCacheDocument, options);
      }
export type ClearCacheMutationHookResult = ReturnType<typeof useClearCacheMutation>;
export type ClearCacheMutationResult = Apollo.MutationResult<Types.ClearCacheMutation>;
export type ClearCacheMutationOptions = Apollo.BaseMutationOptions<Types.ClearCacheMutation, Types.ClearCacheMutationVariables>;
export const CreateAnnouncementDocument = gql`
    mutation CreateAnnouncement($input: CreateAnnouncementMutationInput!) {
  createAnnouncement(input: $input) {
    announcement {
      author {
        uuid
        firstName
        lastName
      }
      body
      createdAt
      id
      name
      target {
        name
        uuid
      }
    }
  }
}
    `;
export type CreateAnnouncementMutationFn = Apollo.MutationFunction<Types.CreateAnnouncementMutation, Types.CreateAnnouncementMutationVariables>;

/**
 * __useCreateAnnouncementMutation__
 *
 * To run a mutation, you first call `useCreateAnnouncementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAnnouncementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAnnouncementMutation, { data, loading, error }] = useCreateAnnouncementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAnnouncementMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateAnnouncementMutation, Types.CreateAnnouncementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateAnnouncementMutation, Types.CreateAnnouncementMutationVariables>(CreateAnnouncementDocument, options);
      }
export type CreateAnnouncementMutationHookResult = ReturnType<typeof useCreateAnnouncementMutation>;
export type CreateAnnouncementMutationResult = Apollo.MutationResult<Types.CreateAnnouncementMutation>;
export type CreateAnnouncementMutationOptions = Apollo.BaseMutationOptions<Types.CreateAnnouncementMutation, Types.CreateAnnouncementMutationVariables>;
export const CreateAssignmentDocument = gql`
    mutation CreateAssignment($input: CreateAssignmentMutationInput!) {
  createAssignment(input: $input) {
    assignment {
      assetName
      description
      displayName
      id
      rubrics {
        id
        name
        description
      }
    }
  }
}
    `;
export type CreateAssignmentMutationFn = Apollo.MutationFunction<Types.CreateAssignmentMutation, Types.CreateAssignmentMutationVariables>;

/**
 * __useCreateAssignmentMutation__
 *
 * To run a mutation, you first call `useCreateAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssignmentMutation, { data, loading, error }] = useCreateAssignmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateAssignmentMutation, Types.CreateAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateAssignmentMutation, Types.CreateAssignmentMutationVariables>(CreateAssignmentDocument, options);
      }
export type CreateAssignmentMutationHookResult = ReturnType<typeof useCreateAssignmentMutation>;
export type CreateAssignmentMutationResult = Apollo.MutationResult<Types.CreateAssignmentMutation>;
export type CreateAssignmentMutationOptions = Apollo.BaseMutationOptions<Types.CreateAssignmentMutation, Types.CreateAssignmentMutationVariables>;
export const CreateAttachmentDocument = gql`
    mutation CreateAttachment($input: CreateAttachmentMutationInput!) {
  createAttachment(input: $input) {
    attachment {
      description
      displayName
      id
      name
    }
  }
}
    `;
export type CreateAttachmentMutationFn = Apollo.MutationFunction<Types.CreateAttachmentMutation, Types.CreateAttachmentMutationVariables>;

/**
 * __useCreateAttachmentMutation__
 *
 * To run a mutation, you first call `useCreateAttachmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAttachmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAttachmentMutation, { data, loading, error }] = useCreateAttachmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAttachmentMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateAttachmentMutation, Types.CreateAttachmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateAttachmentMutation, Types.CreateAttachmentMutationVariables>(CreateAttachmentDocument, options);
      }
export type CreateAttachmentMutationHookResult = ReturnType<typeof useCreateAttachmentMutation>;
export type CreateAttachmentMutationResult = Apollo.MutationResult<Types.CreateAttachmentMutation>;
export type CreateAttachmentMutationOptions = Apollo.BaseMutationOptions<Types.CreateAttachmentMutation, Types.CreateAttachmentMutationVariables>;
export const CreateAttachmentFileDocument = gql`
    mutation CreateAttachmentFile($input: CreateAttachmentFileMutationInput!) {
  createAttachmentFile(input: $input) {
    attachmentFile {
      id
    }
  }
}
    `;
export type CreateAttachmentFileMutationFn = Apollo.MutationFunction<Types.CreateAttachmentFileMutation, Types.CreateAttachmentFileMutationVariables>;

/**
 * __useCreateAttachmentFileMutation__
 *
 * To run a mutation, you first call `useCreateAttachmentFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAttachmentFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAttachmentFileMutation, { data, loading, error }] = useCreateAttachmentFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAttachmentFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateAttachmentFileMutation, Types.CreateAttachmentFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateAttachmentFileMutation, Types.CreateAttachmentFileMutationVariables>(CreateAttachmentFileDocument, options);
      }
export type CreateAttachmentFileMutationHookResult = ReturnType<typeof useCreateAttachmentFileMutation>;
export type CreateAttachmentFileMutationResult = Apollo.MutationResult<Types.CreateAttachmentFileMutation>;
export type CreateAttachmentFileMutationOptions = Apollo.BaseMutationOptions<Types.CreateAttachmentFileMutation, Types.CreateAttachmentFileMutationVariables>;
export const CreateBadgeDocument = gql`
    mutation CreateBadge($input: CreateBadgeMutationInput!) {
  createBadge(input: $input) {
    badge {
      archivedAt
      id
      imageUrl
      name
    }
  }
}
    `;
export type CreateBadgeMutationFn = Apollo.MutationFunction<Types.CreateBadgeMutation, Types.CreateBadgeMutationVariables>;

/**
 * __useCreateBadgeMutation__
 *
 * To run a mutation, you first call `useCreateBadgeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBadgeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBadgeMutation, { data, loading, error }] = useCreateBadgeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBadgeMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateBadgeMutation, Types.CreateBadgeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateBadgeMutation, Types.CreateBadgeMutationVariables>(CreateBadgeDocument, options);
      }
export type CreateBadgeMutationHookResult = ReturnType<typeof useCreateBadgeMutation>;
export type CreateBadgeMutationResult = Apollo.MutationResult<Types.CreateBadgeMutation>;
export type CreateBadgeMutationOptions = Apollo.BaseMutationOptions<Types.CreateBadgeMutation, Types.CreateBadgeMutationVariables>;
export const CreateCatalogDocument = gql`
    mutation CreateCatalog($input: CreateCatalogMutationInput!) {
  createCatalog(input: $input) {
    catalog {
      description
      displayName
      id
      imageUrl
      name
    }
  }
}
    `;
export type CreateCatalogMutationFn = Apollo.MutationFunction<Types.CreateCatalogMutation, Types.CreateCatalogMutationVariables>;

/**
 * __useCreateCatalogMutation__
 *
 * To run a mutation, you first call `useCreateCatalogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCatalogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCatalogMutation, { data, loading, error }] = useCreateCatalogMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCatalogMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateCatalogMutation, Types.CreateCatalogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateCatalogMutation, Types.CreateCatalogMutationVariables>(CreateCatalogDocument, options);
      }
export type CreateCatalogMutationHookResult = ReturnType<typeof useCreateCatalogMutation>;
export type CreateCatalogMutationResult = Apollo.MutationResult<Types.CreateCatalogMutation>;
export type CreateCatalogMutationOptions = Apollo.BaseMutationOptions<Types.CreateCatalogMutation, Types.CreateCatalogMutationVariables>;
export const CreateCheckInGroupDocument = gql`
    mutation CreateCheckInGroup($input: CreateCheckInGroupMutationInput!) {
  createCheckInGroup(input: $input) {
    checkInGroup {
      archivedAt
      displayName
      id
      name
      questions {
        archivedAt
        id
        question
        step
      }
      step
    }
  }
}
    `;
export type CreateCheckInGroupMutationFn = Apollo.MutationFunction<Types.CreateCheckInGroupMutation, Types.CreateCheckInGroupMutationVariables>;

/**
 * __useCreateCheckInGroupMutation__
 *
 * To run a mutation, you first call `useCreateCheckInGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCheckInGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCheckInGroupMutation, { data, loading, error }] = useCreateCheckInGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCheckInGroupMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateCheckInGroupMutation, Types.CreateCheckInGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateCheckInGroupMutation, Types.CreateCheckInGroupMutationVariables>(CreateCheckInGroupDocument, options);
      }
export type CreateCheckInGroupMutationHookResult = ReturnType<typeof useCreateCheckInGroupMutation>;
export type CreateCheckInGroupMutationResult = Apollo.MutationResult<Types.CreateCheckInGroupMutation>;
export type CreateCheckInGroupMutationOptions = Apollo.BaseMutationOptions<Types.CreateCheckInGroupMutation, Types.CreateCheckInGroupMutationVariables>;
export const DcCreateCheckInQuestionDocument = gql`
    mutation DcCreateCheckInQuestion($input: CreateCheckInQuestionMutationInput!) {
  createCheckInQuestion(input: $input) {
    checkInQuestion {
      archivedAt
      id
      question
      step
    }
  }
}
    `;
export type DcCreateCheckInQuestionMutationFn = Apollo.MutationFunction<Types.DcCreateCheckInQuestionMutation, Types.DcCreateCheckInQuestionMutationVariables>;

/**
 * __useDcCreateCheckInQuestionMutation__
 *
 * To run a mutation, you first call `useDcCreateCheckInQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDcCreateCheckInQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dcCreateCheckInQuestionMutation, { data, loading, error }] = useDcCreateCheckInQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDcCreateCheckInQuestionMutation(baseOptions?: Apollo.MutationHookOptions<Types.DcCreateCheckInQuestionMutation, Types.DcCreateCheckInQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DcCreateCheckInQuestionMutation, Types.DcCreateCheckInQuestionMutationVariables>(DcCreateCheckInQuestionDocument, options);
      }
export type DcCreateCheckInQuestionMutationHookResult = ReturnType<typeof useDcCreateCheckInQuestionMutation>;
export type DcCreateCheckInQuestionMutationResult = Apollo.MutationResult<Types.DcCreateCheckInQuestionMutation>;
export type DcCreateCheckInQuestionMutationOptions = Apollo.BaseMutationOptions<Types.DcCreateCheckInQuestionMutation, Types.DcCreateCheckInQuestionMutationVariables>;
export const CreateCourseDocument = gql`
    mutation CreateCourse($input: CreateCourseMutationInput!) {
  createCourse(input: $input) {
    course {
      description
      id
      imageUrl
      name
      collection {
        id
        name
      }
      ...CourseMetadata
    }
  }
}
    ${CourseMetadataFragmentDoc}`;
export type CreateCourseMutationFn = Apollo.MutationFunction<Types.CreateCourseMutation, Types.CreateCourseMutationVariables>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCourseMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateCourseMutation, Types.CreateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateCourseMutation, Types.CreateCourseMutationVariables>(CreateCourseDocument, options);
      }
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<Types.CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<Types.CreateCourseMutation, Types.CreateCourseMutationVariables>;
export const CreateExtensionDocument = gql`
    mutation CreateExtension($input: CreateExtensionFieldMutationInput!) {
  createExtensionField(input: $input) {
    extensionField {
      id
      name
      description
    }
  }
}
    `;
export type CreateExtensionMutationFn = Apollo.MutationFunction<Types.CreateExtensionMutation, Types.CreateExtensionMutationVariables>;

/**
 * __useCreateExtensionMutation__
 *
 * To run a mutation, you first call `useCreateExtensionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExtensionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExtensionMutation, { data, loading, error }] = useCreateExtensionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateExtensionMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateExtensionMutation, Types.CreateExtensionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateExtensionMutation, Types.CreateExtensionMutationVariables>(CreateExtensionDocument, options);
      }
export type CreateExtensionMutationHookResult = ReturnType<typeof useCreateExtensionMutation>;
export type CreateExtensionMutationResult = Apollo.MutationResult<Types.CreateExtensionMutation>;
export type CreateExtensionMutationOptions = Apollo.BaseMutationOptions<Types.CreateExtensionMutation, Types.CreateExtensionMutationVariables>;
export const CreateExtensionFieldFileDocument = gql`
    mutation CreateExtensionFieldFile($input: CreateExtensionFieldFileMutationInput!) {
  createExtensionFieldFile(input: $input) {
    extensionFieldFile {
      filename
      id
      url
    }
  }
}
    `;
export type CreateExtensionFieldFileMutationFn = Apollo.MutationFunction<Types.CreateExtensionFieldFileMutation, Types.CreateExtensionFieldFileMutationVariables>;

/**
 * __useCreateExtensionFieldFileMutation__
 *
 * To run a mutation, you first call `useCreateExtensionFieldFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExtensionFieldFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExtensionFieldFileMutation, { data, loading, error }] = useCreateExtensionFieldFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateExtensionFieldFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateExtensionFieldFileMutation, Types.CreateExtensionFieldFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateExtensionFieldFileMutation, Types.CreateExtensionFieldFileMutationVariables>(CreateExtensionFieldFileDocument, options);
      }
export type CreateExtensionFieldFileMutationHookResult = ReturnType<typeof useCreateExtensionFieldFileMutation>;
export type CreateExtensionFieldFileMutationResult = Apollo.MutationResult<Types.CreateExtensionFieldFileMutation>;
export type CreateExtensionFieldFileMutationOptions = Apollo.BaseMutationOptions<Types.CreateExtensionFieldFileMutation, Types.CreateExtensionFieldFileMutationVariables>;
export const CreateExternalPresentationDocument = gql`
    mutation CreateExternalPresentation($input: CreateExternalPresentationMutationInput!) {
  createExternalPresentation(input: $input) {
    externalPresentation {
      displayName
      id
      name
      source
    }
  }
}
    `;
export type CreateExternalPresentationMutationFn = Apollo.MutationFunction<Types.CreateExternalPresentationMutation, Types.CreateExternalPresentationMutationVariables>;

/**
 * __useCreateExternalPresentationMutation__
 *
 * To run a mutation, you first call `useCreateExternalPresentationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExternalPresentationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExternalPresentationMutation, { data, loading, error }] = useCreateExternalPresentationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateExternalPresentationMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateExternalPresentationMutation, Types.CreateExternalPresentationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateExternalPresentationMutation, Types.CreateExternalPresentationMutationVariables>(CreateExternalPresentationDocument, options);
      }
export type CreateExternalPresentationMutationHookResult = ReturnType<typeof useCreateExternalPresentationMutation>;
export type CreateExternalPresentationMutationResult = Apollo.MutationResult<Types.CreateExternalPresentationMutation>;
export type CreateExternalPresentationMutationOptions = Apollo.BaseMutationOptions<Types.CreateExternalPresentationMutation, Types.CreateExternalPresentationMutationVariables>;
export const CreateLessonDocument = gql`
    mutation CreateLesson($input: CreateLessonMutationInput!) {
  createLesson(input: $input) {
    lesson {
      id
      imageUrl
      name
    }
  }
}
    `;
export type CreateLessonMutationFn = Apollo.MutationFunction<Types.CreateLessonMutation, Types.CreateLessonMutationVariables>;

/**
 * __useCreateLessonMutation__
 *
 * To run a mutation, you first call `useCreateLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLessonMutation, { data, loading, error }] = useCreateLessonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLessonMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateLessonMutation, Types.CreateLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateLessonMutation, Types.CreateLessonMutationVariables>(CreateLessonDocument, options);
      }
export type CreateLessonMutationHookResult = ReturnType<typeof useCreateLessonMutation>;
export type CreateLessonMutationResult = Apollo.MutationResult<Types.CreateLessonMutation>;
export type CreateLessonMutationOptions = Apollo.BaseMutationOptions<Types.CreateLessonMutation, Types.CreateLessonMutationVariables>;
export const CreatePartnerDocument = gql`
    mutation CreatePartner($input: CreatePartnerMutationInput!) {
  createPartner(input: $input) {
    partner {
      about
      additionalUrls
      address
      coursesCount
      details
      email
      id
      imageUrl
      imageFitToContainer
      isArchived
      name
      opportunitiesCount
      phone
      status
      thumbnailUrl
      url
      virtualInternshipsCount
      visibilityScope
    }
  }
}
    `;
export type CreatePartnerMutationFn = Apollo.MutationFunction<Types.CreatePartnerMutation, Types.CreatePartnerMutationVariables>;

/**
 * __useCreatePartnerMutation__
 *
 * To run a mutation, you first call `useCreatePartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPartnerMutation, { data, loading, error }] = useCreatePartnerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePartnerMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreatePartnerMutation, Types.CreatePartnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreatePartnerMutation, Types.CreatePartnerMutationVariables>(CreatePartnerDocument, options);
      }
export type CreatePartnerMutationHookResult = ReturnType<typeof useCreatePartnerMutation>;
export type CreatePartnerMutationResult = Apollo.MutationResult<Types.CreatePartnerMutation>;
export type CreatePartnerMutationOptions = Apollo.BaseMutationOptions<Types.CreatePartnerMutation, Types.CreatePartnerMutationVariables>;
export const CreatePartnerFileDocument = gql`
    mutation CreatePartnerFile($input: CreatePartnerFileMutationInput!) {
  createPartnerFile(input: $input) {
    partnerFile {
      createdAt
      filename
      id
      submitter {
        uuid
        firstName
        lastName
      }
      url(options: {responseContentDisposition: "attachment"})
    }
  }
}
    `;
export type CreatePartnerFileMutationFn = Apollo.MutationFunction<Types.CreatePartnerFileMutation, Types.CreatePartnerFileMutationVariables>;

/**
 * __useCreatePartnerFileMutation__
 *
 * To run a mutation, you first call `useCreatePartnerFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePartnerFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPartnerFileMutation, { data, loading, error }] = useCreatePartnerFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePartnerFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreatePartnerFileMutation, Types.CreatePartnerFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreatePartnerFileMutation, Types.CreatePartnerFileMutationVariables>(CreatePartnerFileDocument, options);
      }
export type CreatePartnerFileMutationHookResult = ReturnType<typeof useCreatePartnerFileMutation>;
export type CreatePartnerFileMutationResult = Apollo.MutationResult<Types.CreatePartnerFileMutation>;
export type CreatePartnerFileMutationOptions = Apollo.BaseMutationOptions<Types.CreatePartnerFileMutation, Types.CreatePartnerFileMutationVariables>;
export const CreatePlanDocument = gql`
    mutation CreatePlan($input: CreatePlanMutationInput!) {
  createPlan(input: $input) {
    plan {
      archivedAt
      description
      id
      name
      groups {
        archivedAt
        description
        displayName
        id
        name
        statements {
          id
          name
          step
        }
      }
    }
  }
}
    `;
export type CreatePlanMutationFn = Apollo.MutationFunction<Types.CreatePlanMutation, Types.CreatePlanMutationVariables>;

/**
 * __useCreatePlanMutation__
 *
 * To run a mutation, you first call `useCreatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlanMutation, { data, loading, error }] = useCreatePlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlanMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreatePlanMutation, Types.CreatePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreatePlanMutation, Types.CreatePlanMutationVariables>(CreatePlanDocument, options);
      }
export type CreatePlanMutationHookResult = ReturnType<typeof useCreatePlanMutation>;
export type CreatePlanMutationResult = Apollo.MutationResult<Types.CreatePlanMutation>;
export type CreatePlanMutationOptions = Apollo.BaseMutationOptions<Types.CreatePlanMutation, Types.CreatePlanMutationVariables>;
export const CreatePlanGroupDocument = gql`
    mutation CreatePlanGroup($input: CreatePlanGroupMutationInput!) {
  createPlanGroup(input: $input) {
    planGroup {
      id
      description
      displayName
      name
    }
  }
}
    `;
export type CreatePlanGroupMutationFn = Apollo.MutationFunction<Types.CreatePlanGroupMutation, Types.CreatePlanGroupMutationVariables>;

/**
 * __useCreatePlanGroupMutation__
 *
 * To run a mutation, you first call `useCreatePlanGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlanGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlanGroupMutation, { data, loading, error }] = useCreatePlanGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlanGroupMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreatePlanGroupMutation, Types.CreatePlanGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreatePlanGroupMutation, Types.CreatePlanGroupMutationVariables>(CreatePlanGroupDocument, options);
      }
export type CreatePlanGroupMutationHookResult = ReturnType<typeof useCreatePlanGroupMutation>;
export type CreatePlanGroupMutationResult = Apollo.MutationResult<Types.CreatePlanGroupMutation>;
export type CreatePlanGroupMutationOptions = Apollo.BaseMutationOptions<Types.CreatePlanGroupMutation, Types.CreatePlanGroupMutationVariables>;
export const CreatePlanGroupStatementDocument = gql`
    mutation CreatePlanGroupStatement($input: CreatePlanGroupStatementMutationInput!) {
  createPlanGroupStatement(input: $input) {
    planGroupStatement {
      archivedAt
      id
      name
      step
      isRequired
      question {
        text
        questionType
        options {
          option
          step
        }
      }
    }
  }
}
    `;
export type CreatePlanGroupStatementMutationFn = Apollo.MutationFunction<Types.CreatePlanGroupStatementMutation, Types.CreatePlanGroupStatementMutationVariables>;

/**
 * __useCreatePlanGroupStatementMutation__
 *
 * To run a mutation, you first call `useCreatePlanGroupStatementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlanGroupStatementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlanGroupStatementMutation, { data, loading, error }] = useCreatePlanGroupStatementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePlanGroupStatementMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreatePlanGroupStatementMutation, Types.CreatePlanGroupStatementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreatePlanGroupStatementMutation, Types.CreatePlanGroupStatementMutationVariables>(CreatePlanGroupStatementDocument, options);
      }
export type CreatePlanGroupStatementMutationHookResult = ReturnType<typeof useCreatePlanGroupStatementMutation>;
export type CreatePlanGroupStatementMutationResult = Apollo.MutationResult<Types.CreatePlanGroupStatementMutation>;
export type CreatePlanGroupStatementMutationOptions = Apollo.BaseMutationOptions<Types.CreatePlanGroupStatementMutation, Types.CreatePlanGroupStatementMutationVariables>;
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
export const CreateProductDocument = gql`
    mutation CreateProduct($input: CreateProductMutationInput!) {
  createProduct(input: $input) {
    product {
      description
      displayName
      id
      rubricsUrl
      name
    }
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<Types.CreateProductMutation, Types.CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateProductMutation, Types.CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateProductMutation, Types.CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<Types.CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<Types.CreateProductMutation, Types.CreateProductMutationVariables>;
export const CreateResearchLinkDocument = gql`
    mutation CreateResearchLink($input: CreateResearchLinkMutationInput!) {
  createResearchLink(input: $input) {
    researchLink {
      author
      displayName
      id
      name
      resourceLink
      sourceName
    }
  }
}
    `;
export type CreateResearchLinkMutationFn = Apollo.MutationFunction<Types.CreateResearchLinkMutation, Types.CreateResearchLinkMutationVariables>;

/**
 * __useCreateResearchLinkMutation__
 *
 * To run a mutation, you first call `useCreateResearchLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResearchLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResearchLinkMutation, { data, loading, error }] = useCreateResearchLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateResearchLinkMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateResearchLinkMutation, Types.CreateResearchLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateResearchLinkMutation, Types.CreateResearchLinkMutationVariables>(CreateResearchLinkDocument, options);
      }
export type CreateResearchLinkMutationHookResult = ReturnType<typeof useCreateResearchLinkMutation>;
export type CreateResearchLinkMutationResult = Apollo.MutationResult<Types.CreateResearchLinkMutation>;
export type CreateResearchLinkMutationOptions = Apollo.BaseMutationOptions<Types.CreateResearchLinkMutation, Types.CreateResearchLinkMutationVariables>;
export const CreateRubricDocument = gql`
    mutation CreateRubric($input: CreateRubricMutationInput!) {
  createRubric(input: $input) {
    rubric {
      description
      displayName
      id
      name
    }
  }
}
    `;
export type CreateRubricMutationFn = Apollo.MutationFunction<Types.CreateRubricMutation, Types.CreateRubricMutationVariables>;

/**
 * __useCreateRubricMutation__
 *
 * To run a mutation, you first call `useCreateRubricMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRubricMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRubricMutation, { data, loading, error }] = useCreateRubricMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRubricMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateRubricMutation, Types.CreateRubricMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateRubricMutation, Types.CreateRubricMutationVariables>(CreateRubricDocument, options);
      }
export type CreateRubricMutationHookResult = ReturnType<typeof useCreateRubricMutation>;
export type CreateRubricMutationResult = Apollo.MutationResult<Types.CreateRubricMutation>;
export type CreateRubricMutationOptions = Apollo.BaseMutationOptions<Types.CreateRubricMutation, Types.CreateRubricMutationVariables>;
export const CreateSlideDocument = gql`
    mutation CreateSlide($input: CreateSlideMutationInput!) {
  createSlide(input: $input) {
    slide {
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
          contentId
          url
        }
      }
      description
      id
      iframeUrl
      isShared
      name
      notes
      template
    }
  }
}
    `;
export type CreateSlideMutationFn = Apollo.MutationFunction<Types.CreateSlideMutation, Types.CreateSlideMutationVariables>;

/**
 * __useCreateSlideMutation__
 *
 * To run a mutation, you first call `useCreateSlideMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSlideMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSlideMutation, { data, loading, error }] = useCreateSlideMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSlideMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateSlideMutation, Types.CreateSlideMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateSlideMutation, Types.CreateSlideMutationVariables>(CreateSlideDocument, options);
      }
export type CreateSlideMutationHookResult = ReturnType<typeof useCreateSlideMutation>;
export type CreateSlideMutationResult = Apollo.MutationResult<Types.CreateSlideMutation>;
export type CreateSlideMutationOptions = Apollo.BaseMutationOptions<Types.CreateSlideMutation, Types.CreateSlideMutationVariables>;
export const CreateSlideBackgroundImageDocument = gql`
    mutation CreateSlideBackgroundImage($input: CreateSlideBackgroundImageMutationInput!) {
  createSlideBackgroundImage(input: $input) {
    slideBackgroundImage {
      id
      thumbnailUrl
      url
    }
  }
}
    `;
export type CreateSlideBackgroundImageMutationFn = Apollo.MutationFunction<Types.CreateSlideBackgroundImageMutation, Types.CreateSlideBackgroundImageMutationVariables>;

/**
 * __useCreateSlideBackgroundImageMutation__
 *
 * To run a mutation, you first call `useCreateSlideBackgroundImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSlideBackgroundImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSlideBackgroundImageMutation, { data, loading, error }] = useCreateSlideBackgroundImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSlideBackgroundImageMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateSlideBackgroundImageMutation, Types.CreateSlideBackgroundImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateSlideBackgroundImageMutation, Types.CreateSlideBackgroundImageMutationVariables>(CreateSlideBackgroundImageDocument, options);
      }
export type CreateSlideBackgroundImageMutationHookResult = ReturnType<typeof useCreateSlideBackgroundImageMutation>;
export type CreateSlideBackgroundImageMutationResult = Apollo.MutationResult<Types.CreateSlideBackgroundImageMutation>;
export type CreateSlideBackgroundImageMutationOptions = Apollo.BaseMutationOptions<Types.CreateSlideBackgroundImageMutation, Types.CreateSlideBackgroundImageMutationVariables>;
export const CreateSlideImageDocument = gql`
    mutation CreateSlideImage($input: CreateSlideImageMutationInput!) {
  createSlideImage(input: $input) {
    slideImage {
      contentId
      id
      url
      style
      thumbnailUrl
    }
  }
}
    `;
export type CreateSlideImageMutationFn = Apollo.MutationFunction<Types.CreateSlideImageMutation, Types.CreateSlideImageMutationVariables>;

/**
 * __useCreateSlideImageMutation__
 *
 * To run a mutation, you first call `useCreateSlideImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSlideImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSlideImageMutation, { data, loading, error }] = useCreateSlideImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSlideImageMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateSlideImageMutation, Types.CreateSlideImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateSlideImageMutation, Types.CreateSlideImageMutationVariables>(CreateSlideImageDocument, options);
      }
export type CreateSlideImageMutationHookResult = ReturnType<typeof useCreateSlideImageMutation>;
export type CreateSlideImageMutationResult = Apollo.MutationResult<Types.CreateSlideImageMutation>;
export type CreateSlideImageMutationOptions = Apollo.BaseMutationOptions<Types.CreateSlideImageMutation, Types.CreateSlideImageMutationVariables>;
export const CreateSlideVideoDocument = gql`
    mutation CreateSlideVideo($input: CreateSlideVideoMutationInput!) {
  createSlideVideo(input: $input) {
    slideVideo {
      id
      contentId
      url
      videoUrl
      filename
    }
  }
}
    `;
export type CreateSlideVideoMutationFn = Apollo.MutationFunction<Types.CreateSlideVideoMutation, Types.CreateSlideVideoMutationVariables>;

/**
 * __useCreateSlideVideoMutation__
 *
 * To run a mutation, you first call `useCreateSlideVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSlideVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSlideVideoMutation, { data, loading, error }] = useCreateSlideVideoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSlideVideoMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateSlideVideoMutation, Types.CreateSlideVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateSlideVideoMutation, Types.CreateSlideVideoMutationVariables>(CreateSlideVideoDocument, options);
      }
export type CreateSlideVideoMutationHookResult = ReturnType<typeof useCreateSlideVideoMutation>;
export type CreateSlideVideoMutationResult = Apollo.MutationResult<Types.CreateSlideVideoMutation>;
export type CreateSlideVideoMutationOptions = Apollo.BaseMutationOptions<Types.CreateSlideVideoMutation, Types.CreateSlideVideoMutationVariables>;
export const CreateTagDocument = gql`
    mutation CreateTag($input: CreateTagMutationInput!) {
  createTag(input: $input) {
    tag {
      hasRubricHeadings
      id
      name
      rubricHeadings {
        nodes {
          id
          name
          multiplier
        }
      }
      type
    }
  }
}
    `;
export type CreateTagMutationFn = Apollo.MutationFunction<Types.CreateTagMutation, Types.CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateTagMutation, Types.CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateTagMutation, Types.CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<Types.CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<Types.CreateTagMutation, Types.CreateTagMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($input: CreateTaskMutationInput!) {
  createTask(input: $input) {
    task {
      id
    }
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<Types.CreateTaskMutation, Types.CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateTaskMutation, Types.CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateTaskMutation, Types.CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<Types.CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<Types.CreateTaskMutation, Types.CreateTaskMutationVariables>;
export const CreateTaskFileDocument = gql`
    mutation CreateTaskFile($input: CreateTaskFileMutationInput!) {
  createTaskFile(input: $input) {
    taskFile {
      id
      filename
      url
      step
    }
  }
}
    `;
export type CreateTaskFileMutationFn = Apollo.MutationFunction<Types.CreateTaskFileMutation, Types.CreateTaskFileMutationVariables>;

/**
 * __useCreateTaskFileMutation__
 *
 * To run a mutation, you first call `useCreateTaskFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskFileMutation, { data, loading, error }] = useCreateTaskFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateTaskFileMutation, Types.CreateTaskFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateTaskFileMutation, Types.CreateTaskFileMutationVariables>(CreateTaskFileDocument, options);
      }
export type CreateTaskFileMutationHookResult = ReturnType<typeof useCreateTaskFileMutation>;
export type CreateTaskFileMutationResult = Apollo.MutationResult<Types.CreateTaskFileMutation>;
export type CreateTaskFileMutationOptions = Apollo.BaseMutationOptions<Types.CreateTaskFileMutation, Types.CreateTaskFileMutationVariables>;
export const CreateTaskProductDocument = gql`
    mutation CreateTaskProduct($input: CreateProductMutationInput!) {
  createProduct(input: $input) {
    product {
      id
      displayName
      description
    }
  }
}
    `;
export type CreateTaskProductMutationFn = Apollo.MutationFunction<Types.CreateTaskProductMutation, Types.CreateTaskProductMutationVariables>;

/**
 * __useCreateTaskProductMutation__
 *
 * To run a mutation, you first call `useCreateTaskProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskProductMutation, { data, loading, error }] = useCreateTaskProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTaskProductMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateTaskProductMutation, Types.CreateTaskProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateTaskProductMutation, Types.CreateTaskProductMutationVariables>(CreateTaskProductDocument, options);
      }
export type CreateTaskProductMutationHookResult = ReturnType<typeof useCreateTaskProductMutation>;
export type CreateTaskProductMutationResult = Apollo.MutationResult<Types.CreateTaskProductMutation>;
export type CreateTaskProductMutationOptions = Apollo.BaseMutationOptions<Types.CreateTaskProductMutation, Types.CreateTaskProductMutationVariables>;
export const CreateTextDocument = gql`
    mutation CreateText($input: CreateTextMutationInput!) {
  createText(input: $input) {
    text {
      content
      displayName
      id
      name
    }
  }
}
    `;
export type CreateTextMutationFn = Apollo.MutationFunction<Types.CreateTextMutation, Types.CreateTextMutationVariables>;

/**
 * __useCreateTextMutation__
 *
 * To run a mutation, you first call `useCreateTextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTextMutation, { data, loading, error }] = useCreateTextMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTextMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateTextMutation, Types.CreateTextMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateTextMutation, Types.CreateTextMutationVariables>(CreateTextDocument, options);
      }
export type CreateTextMutationHookResult = ReturnType<typeof useCreateTextMutation>;
export type CreateTextMutationResult = Apollo.MutationResult<Types.CreateTextMutation>;
export type CreateTextMutationOptions = Apollo.BaseMutationOptions<Types.CreateTextMutation, Types.CreateTextMutationVariables>;
export const CreateTrackDocument = gql`
    mutation CreateTrack($input: CreateTrackMutationInput!) {
  createTrack(input: $input) {
    track {
      id
    }
  }
}
    `;
export type CreateTrackMutationFn = Apollo.MutationFunction<Types.CreateTrackMutation, Types.CreateTrackMutationVariables>;

/**
 * __useCreateTrackMutation__
 *
 * To run a mutation, you first call `useCreateTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrackMutation, { data, loading, error }] = useCreateTrackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTrackMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateTrackMutation, Types.CreateTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateTrackMutation, Types.CreateTrackMutationVariables>(CreateTrackDocument, options);
      }
export type CreateTrackMutationHookResult = ReturnType<typeof useCreateTrackMutation>;
export type CreateTrackMutationResult = Apollo.MutationResult<Types.CreateTrackMutation>;
export type CreateTrackMutationOptions = Apollo.BaseMutationOptions<Types.CreateTrackMutation, Types.CreateTrackMutationVariables>;
export const CreateUnitDocument = gql`
    mutation CreateUnit($input: CreateUnitMutationInput!) {
  createUnit(input: $input) {
    unit {
      description
      displayName
      id
      imageUrl
      name
    }
  }
}
    `;
export type CreateUnitMutationFn = Apollo.MutationFunction<Types.CreateUnitMutation, Types.CreateUnitMutationVariables>;

/**
 * __useCreateUnitMutation__
 *
 * To run a mutation, you first call `useCreateUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUnitMutation, { data, loading, error }] = useCreateUnitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUnitMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateUnitMutation, Types.CreateUnitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateUnitMutation, Types.CreateUnitMutationVariables>(CreateUnitDocument, options);
      }
export type CreateUnitMutationHookResult = ReturnType<typeof useCreateUnitMutation>;
export type CreateUnitMutationResult = Apollo.MutationResult<Types.CreateUnitMutation>;
export type CreateUnitMutationOptions = Apollo.BaseMutationOptions<Types.CreateUnitMutation, Types.CreateUnitMutationVariables>;
export const CreateVideoDocument = gql`
    mutation CreateVideo($input: CreateVideoMutationInput!) {
  createVideo(input: $input) {
    video {
      description
      displayName
      filename
      name
      id
      url
    }
  }
}
    `;
export type CreateVideoMutationFn = Apollo.MutationFunction<Types.CreateVideoMutation, Types.CreateVideoMutationVariables>;

/**
 * __useCreateVideoMutation__
 *
 * To run a mutation, you first call `useCreateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVideoMutation, { data, loading, error }] = useCreateVideoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVideoMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateVideoMutation, Types.CreateVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateVideoMutation, Types.CreateVideoMutationVariables>(CreateVideoDocument, options);
      }
export type CreateVideoMutationHookResult = ReturnType<typeof useCreateVideoMutation>;
export type CreateVideoMutationResult = Apollo.MutationResult<Types.CreateVideoMutation>;
export type CreateVideoMutationOptions = Apollo.BaseMutationOptions<Types.CreateVideoMutation, Types.CreateVideoMutationVariables>;
export const CreateVirtualInternshipDocument = gql`
    mutation CreateVirtualInternship($input: CreateVirtualInternshipMutationInput!) {
  createVirtualInternship(input: $input) {
    virtualInternship {
      archivedAt
      id
      opportunity {
        id
        name
        availableSpots
        creditsOutcomes
        description
        imageUrl
        opportunityType
        pathways {
          id
          name
        }
        tags
      }
      requiredExperiences
    }
  }
}
    `;
export type CreateVirtualInternshipMutationFn = Apollo.MutationFunction<Types.CreateVirtualInternshipMutation, Types.CreateVirtualInternshipMutationVariables>;

/**
 * __useCreateVirtualInternshipMutation__
 *
 * To run a mutation, you first call `useCreateVirtualInternshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVirtualInternshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVirtualInternshipMutation, { data, loading, error }] = useCreateVirtualInternshipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVirtualInternshipMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateVirtualInternshipMutation, Types.CreateVirtualInternshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateVirtualInternshipMutation, Types.CreateVirtualInternshipMutationVariables>(CreateVirtualInternshipDocument, options);
      }
export type CreateVirtualInternshipMutationHookResult = ReturnType<typeof useCreateVirtualInternshipMutation>;
export type CreateVirtualInternshipMutationResult = Apollo.MutationResult<Types.CreateVirtualInternshipMutation>;
export type CreateVirtualInternshipMutationOptions = Apollo.BaseMutationOptions<Types.CreateVirtualInternshipMutation, Types.CreateVirtualInternshipMutationVariables>;
export const CreateVocabularyDocument = gql`
    mutation CreateVocabulary($input: CreateVocabularyMutationInput!) {
  createVocabulary(input: $input) {
    vocabulary {
      definition
      id
      term
    }
  }
}
    `;
export type CreateVocabularyMutationFn = Apollo.MutationFunction<Types.CreateVocabularyMutation, Types.CreateVocabularyMutationVariables>;

/**
 * __useCreateVocabularyMutation__
 *
 * To run a mutation, you first call `useCreateVocabularyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVocabularyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVocabularyMutation, { data, loading, error }] = useCreateVocabularyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVocabularyMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateVocabularyMutation, Types.CreateVocabularyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateVocabularyMutation, Types.CreateVocabularyMutationVariables>(CreateVocabularyDocument, options);
      }
export type CreateVocabularyMutationHookResult = ReturnType<typeof useCreateVocabularyMutation>;
export type CreateVocabularyMutationResult = Apollo.MutationResult<Types.CreateVocabularyMutation>;
export type CreateVocabularyMutationOptions = Apollo.BaseMutationOptions<Types.CreateVocabularyMutation, Types.CreateVocabularyMutationVariables>;
export const DeletePartnerFileDocument = gql`
    mutation DeletePartnerFile($input: DeletePartnerFileMutationInput!) {
  deletePartnerFile(input: $input) {
    partnerFile {
      id
    }
  }
}
    `;
export type DeletePartnerFileMutationFn = Apollo.MutationFunction<Types.DeletePartnerFileMutation, Types.DeletePartnerFileMutationVariables>;

/**
 * __useDeletePartnerFileMutation__
 *
 * To run a mutation, you first call `useDeletePartnerFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePartnerFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePartnerFileMutation, { data, loading, error }] = useDeletePartnerFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePartnerFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeletePartnerFileMutation, Types.DeletePartnerFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeletePartnerFileMutation, Types.DeletePartnerFileMutationVariables>(DeletePartnerFileDocument, options);
      }
export type DeletePartnerFileMutationHookResult = ReturnType<typeof useDeletePartnerFileMutation>;
export type DeletePartnerFileMutationResult = Apollo.MutationResult<Types.DeletePartnerFileMutation>;
export type DeletePartnerFileMutationOptions = Apollo.BaseMutationOptions<Types.DeletePartnerFileMutation, Types.DeletePartnerFileMutationVariables>;
export const DeleteTagDocument = gql`
    mutation DeleteTag($input: DeleteTagMutationInput!) {
  deleteTag(input: $input) {
    status
  }
}
    `;
export type DeleteTagMutationFn = Apollo.MutationFunction<Types.DeleteTagMutation, Types.DeleteTagMutationVariables>;

/**
 * __useDeleteTagMutation__
 *
 * To run a mutation, you first call `useDeleteTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagMutation, { data, loading, error }] = useDeleteTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTagMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteTagMutation, Types.DeleteTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteTagMutation, Types.DeleteTagMutationVariables>(DeleteTagDocument, options);
      }
export type DeleteTagMutationHookResult = ReturnType<typeof useDeleteTagMutation>;
export type DeleteTagMutationResult = Apollo.MutationResult<Types.DeleteTagMutation>;
export type DeleteTagMutationOptions = Apollo.BaseMutationOptions<Types.DeleteTagMutation, Types.DeleteTagMutationVariables>;
export const DuplicateCourseDocument = gql`
    mutation DuplicateCourse($input: DuplicateCourseMutationInput!) {
  duplicateCourse(input: $input) {
    course {
      id
    }
  }
}
    `;
export type DuplicateCourseMutationFn = Apollo.MutationFunction<Types.DuplicateCourseMutation, Types.DuplicateCourseMutationVariables>;

/**
 * __useDuplicateCourseMutation__
 *
 * To run a mutation, you first call `useDuplicateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateCourseMutation, { data, loading, error }] = useDuplicateCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDuplicateCourseMutation(baseOptions?: Apollo.MutationHookOptions<Types.DuplicateCourseMutation, Types.DuplicateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DuplicateCourseMutation, Types.DuplicateCourseMutationVariables>(DuplicateCourseDocument, options);
      }
export type DuplicateCourseMutationHookResult = ReturnType<typeof useDuplicateCourseMutation>;
export type DuplicateCourseMutationResult = Apollo.MutationResult<Types.DuplicateCourseMutation>;
export type DuplicateCourseMutationOptions = Apollo.BaseMutationOptions<Types.DuplicateCourseMutation, Types.DuplicateCourseMutationVariables>;
export const DuplicateRubricDocument = gql`
    mutation DuplicateRubric($input: DuplicateRubricMutationInput!) {
  duplicateRubric(input: $input) {
    rubric {
      id
    }
  }
}
    `;
export type DuplicateRubricMutationFn = Apollo.MutationFunction<Types.DuplicateRubricMutation, Types.DuplicateRubricMutationVariables>;

/**
 * __useDuplicateRubricMutation__
 *
 * To run a mutation, you first call `useDuplicateRubricMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateRubricMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateRubricMutation, { data, loading, error }] = useDuplicateRubricMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDuplicateRubricMutation(baseOptions?: Apollo.MutationHookOptions<Types.DuplicateRubricMutation, Types.DuplicateRubricMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DuplicateRubricMutation, Types.DuplicateRubricMutationVariables>(DuplicateRubricDocument, options);
      }
export type DuplicateRubricMutationHookResult = ReturnType<typeof useDuplicateRubricMutation>;
export type DuplicateRubricMutationResult = Apollo.MutationResult<Types.DuplicateRubricMutation>;
export type DuplicateRubricMutationOptions = Apollo.BaseMutationOptions<Types.DuplicateRubricMutation, Types.DuplicateRubricMutationVariables>;
export const GenerateAssessmentReportDocument = gql`
    mutation GenerateAssessmentReport($input: GenerateAssessmentReportMutationInput!) {
  generateAssessmentReport(input: $input) {
    assessmentReport {
      id
    }
  }
}
    `;
export type GenerateAssessmentReportMutationFn = Apollo.MutationFunction<Types.GenerateAssessmentReportMutation, Types.GenerateAssessmentReportMutationVariables>;

/**
 * __useGenerateAssessmentReportMutation__
 *
 * To run a mutation, you first call `useGenerateAssessmentReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateAssessmentReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateAssessmentReportMutation, { data, loading, error }] = useGenerateAssessmentReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateAssessmentReportMutation(baseOptions?: Apollo.MutationHookOptions<Types.GenerateAssessmentReportMutation, Types.GenerateAssessmentReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.GenerateAssessmentReportMutation, Types.GenerateAssessmentReportMutationVariables>(GenerateAssessmentReportDocument, options);
      }
export type GenerateAssessmentReportMutationHookResult = ReturnType<typeof useGenerateAssessmentReportMutation>;
export type GenerateAssessmentReportMutationResult = Apollo.MutationResult<Types.GenerateAssessmentReportMutation>;
export type GenerateAssessmentReportMutationOptions = Apollo.BaseMutationOptions<Types.GenerateAssessmentReportMutation, Types.GenerateAssessmentReportMutationVariables>;
export const GenerateCareerExplorationReportDocument = gql`
    mutation GenerateCareerExplorationReport($input: GeneratePathwayReportMutationInput!) {
  generatePathwayReport(input: $input) {
    pathwayReport {
      id
    }
  }
}
    `;
export type GenerateCareerExplorationReportMutationFn = Apollo.MutationFunction<Types.GenerateCareerExplorationReportMutation, Types.GenerateCareerExplorationReportMutationVariables>;

/**
 * __useGenerateCareerExplorationReportMutation__
 *
 * To run a mutation, you first call `useGenerateCareerExplorationReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateCareerExplorationReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateCareerExplorationReportMutation, { data, loading, error }] = useGenerateCareerExplorationReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateCareerExplorationReportMutation(baseOptions?: Apollo.MutationHookOptions<Types.GenerateCareerExplorationReportMutation, Types.GenerateCareerExplorationReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.GenerateCareerExplorationReportMutation, Types.GenerateCareerExplorationReportMutationVariables>(GenerateCareerExplorationReportDocument, options);
      }
export type GenerateCareerExplorationReportMutationHookResult = ReturnType<typeof useGenerateCareerExplorationReportMutation>;
export type GenerateCareerExplorationReportMutationResult = Apollo.MutationResult<Types.GenerateCareerExplorationReportMutation>;
export type GenerateCareerExplorationReportMutationOptions = Apollo.BaseMutationOptions<Types.GenerateCareerExplorationReportMutation, Types.GenerateCareerExplorationReportMutationVariables>;
export const GenerateCareerReviewSurveyReportDocument = gql`
    mutation generateCareerReviewSurveyReport($input: GenerateCareerReviewSurveyReportMutationInput!) {
  generateCareerReviewSurveyReport(input: $input) {
    report {
      id
      url
      uploadStatus
    }
  }
}
    `;
export type GenerateCareerReviewSurveyReportMutationFn = Apollo.MutationFunction<Types.GenerateCareerReviewSurveyReportMutation, Types.GenerateCareerReviewSurveyReportMutationVariables>;

/**
 * __useGenerateCareerReviewSurveyReportMutation__
 *
 * To run a mutation, you first call `useGenerateCareerReviewSurveyReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateCareerReviewSurveyReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateCareerReviewSurveyReportMutation, { data, loading, error }] = useGenerateCareerReviewSurveyReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateCareerReviewSurveyReportMutation(baseOptions?: Apollo.MutationHookOptions<Types.GenerateCareerReviewSurveyReportMutation, Types.GenerateCareerReviewSurveyReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.GenerateCareerReviewSurveyReportMutation, Types.GenerateCareerReviewSurveyReportMutationVariables>(GenerateCareerReviewSurveyReportDocument, options);
      }
export type GenerateCareerReviewSurveyReportMutationHookResult = ReturnType<typeof useGenerateCareerReviewSurveyReportMutation>;
export type GenerateCareerReviewSurveyReportMutationResult = Apollo.MutationResult<Types.GenerateCareerReviewSurveyReportMutation>;
export type GenerateCareerReviewSurveyReportMutationOptions = Apollo.BaseMutationOptions<Types.GenerateCareerReviewSurveyReportMutation, Types.GenerateCareerReviewSurveyReportMutationVariables>;
export const GenerateCourseReportDocument = gql`
    mutation GenerateCourseReport($input: GenerateCourseReportMutationInput!) {
  generateCourseReport(input: $input) {
    courseReport {
      id
    }
  }
}
    `;
export type GenerateCourseReportMutationFn = Apollo.MutationFunction<Types.GenerateCourseReportMutation, Types.GenerateCourseReportMutationVariables>;

/**
 * __useGenerateCourseReportMutation__
 *
 * To run a mutation, you first call `useGenerateCourseReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateCourseReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateCourseReportMutation, { data, loading, error }] = useGenerateCourseReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateCourseReportMutation(baseOptions?: Apollo.MutationHookOptions<Types.GenerateCourseReportMutation, Types.GenerateCourseReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.GenerateCourseReportMutation, Types.GenerateCourseReportMutationVariables>(GenerateCourseReportDocument, options);
      }
export type GenerateCourseReportMutationHookResult = ReturnType<typeof useGenerateCourseReportMutation>;
export type GenerateCourseReportMutationResult = Apollo.MutationResult<Types.GenerateCourseReportMutation>;
export type GenerateCourseReportMutationOptions = Apollo.BaseMutationOptions<Types.GenerateCourseReportMutation, Types.GenerateCourseReportMutationVariables>;
export const GenerateOpportunityReportDocument = gql`
    mutation generateOpportunityReport($input: GenerateOpportunityReportMutationInput!) {
  generateOpportunityReport(input: $input) {
    opportunityReport {
      id
    }
  }
}
    `;
export type GenerateOpportunityReportMutationFn = Apollo.MutationFunction<Types.GenerateOpportunityReportMutation, Types.GenerateOpportunityReportMutationVariables>;

/**
 * __useGenerateOpportunityReportMutation__
 *
 * To run a mutation, you first call `useGenerateOpportunityReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateOpportunityReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateOpportunityReportMutation, { data, loading, error }] = useGenerateOpportunityReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateOpportunityReportMutation(baseOptions?: Apollo.MutationHookOptions<Types.GenerateOpportunityReportMutation, Types.GenerateOpportunityReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.GenerateOpportunityReportMutation, Types.GenerateOpportunityReportMutationVariables>(GenerateOpportunityReportDocument, options);
      }
export type GenerateOpportunityReportMutationHookResult = ReturnType<typeof useGenerateOpportunityReportMutation>;
export type GenerateOpportunityReportMutationResult = Apollo.MutationResult<Types.GenerateOpportunityReportMutation>;
export type GenerateOpportunityReportMutationOptions = Apollo.BaseMutationOptions<Types.GenerateOpportunityReportMutation, Types.GenerateOpportunityReportMutationVariables>;
export const GeneratePlanReportDocument = gql`
    mutation GeneratePlanReport($input: GeneratePlanReportMutationInput!) {
  generatePlanReport(input: $input) {
    planReport {
      id
    }
  }
}
    `;
export type GeneratePlanReportMutationFn = Apollo.MutationFunction<Types.GeneratePlanReportMutation, Types.GeneratePlanReportMutationVariables>;

/**
 * __useGeneratePlanReportMutation__
 *
 * To run a mutation, you first call `useGeneratePlanReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGeneratePlanReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generatePlanReportMutation, { data, loading, error }] = useGeneratePlanReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGeneratePlanReportMutation(baseOptions?: Apollo.MutationHookOptions<Types.GeneratePlanReportMutation, Types.GeneratePlanReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.GeneratePlanReportMutation, Types.GeneratePlanReportMutationVariables>(GeneratePlanReportDocument, options);
      }
export type GeneratePlanReportMutationHookResult = ReturnType<typeof useGeneratePlanReportMutation>;
export type GeneratePlanReportMutationResult = Apollo.MutationResult<Types.GeneratePlanReportMutation>;
export type GeneratePlanReportMutationOptions = Apollo.BaseMutationOptions<Types.GeneratePlanReportMutation, Types.GeneratePlanReportMutationVariables>;
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
export const GradeAssignmentSubmissionDocument = gql`
    mutation GradeAssignmentSubmission($input: GradeAssignmentSubmissionMutationInput!) {
  gradeAssignmentSubmission(input: $input) {
    grade {
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
  }
}
    `;
export type GradeAssignmentSubmissionMutationFn = Apollo.MutationFunction<Types.GradeAssignmentSubmissionMutation, Types.GradeAssignmentSubmissionMutationVariables>;

/**
 * __useGradeAssignmentSubmissionMutation__
 *
 * To run a mutation, you first call `useGradeAssignmentSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGradeAssignmentSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gradeAssignmentSubmissionMutation, { data, loading, error }] = useGradeAssignmentSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGradeAssignmentSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<Types.GradeAssignmentSubmissionMutation, Types.GradeAssignmentSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.GradeAssignmentSubmissionMutation, Types.GradeAssignmentSubmissionMutationVariables>(GradeAssignmentSubmissionDocument, options);
      }
export type GradeAssignmentSubmissionMutationHookResult = ReturnType<typeof useGradeAssignmentSubmissionMutation>;
export type GradeAssignmentSubmissionMutationResult = Apollo.MutationResult<Types.GradeAssignmentSubmissionMutation>;
export type GradeAssignmentSubmissionMutationOptions = Apollo.BaseMutationOptions<Types.GradeAssignmentSubmissionMutation, Types.GradeAssignmentSubmissionMutationVariables>;
export const GradeSubmissionDocument = gql`
    mutation GradeSubmission($input: GradeSubmissionMutationInput!) {
  gradeSubmission(input: $input) {
    submissionGrade {
      id
      status
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
export const LockStatementDocument = gql`
    mutation LockStatement($input: LockStatementMutationInput!, $planId: ID!) {
  lockStatement(input: $input) {
    student {
      uuid
      plan(id: $planId) {
        groups {
          id
          statements {
            id
            isLocked
          }
        }
      }
    }
  }
}
    `;
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
export const PerformContractsSyncDocument = gql`
    mutation PerformContractsSync($input: PerformContractsSyncMutationInput!) {
  performContractsSync(input: $input) {
    status
  }
}
    `;
export type PerformContractsSyncMutationFn = Apollo.MutationFunction<Types.PerformContractsSyncMutation, Types.PerformContractsSyncMutationVariables>;

/**
 * __usePerformContractsSyncMutation__
 *
 * To run a mutation, you first call `usePerformContractsSyncMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePerformContractsSyncMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [performContractsSyncMutation, { data, loading, error }] = usePerformContractsSyncMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePerformContractsSyncMutation(baseOptions?: Apollo.MutationHookOptions<Types.PerformContractsSyncMutation, Types.PerformContractsSyncMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.PerformContractsSyncMutation, Types.PerformContractsSyncMutationVariables>(PerformContractsSyncDocument, options);
      }
export type PerformContractsSyncMutationHookResult = ReturnType<typeof usePerformContractsSyncMutation>;
export type PerformContractsSyncMutationResult = Apollo.MutationResult<Types.PerformContractsSyncMutation>;
export type PerformContractsSyncMutationOptions = Apollo.BaseMutationOptions<Types.PerformContractsSyncMutation, Types.PerformContractsSyncMutationVariables>;
export const PerformFullContractSyncDocument = gql`
    mutation PerformFullContractSync($input: PerformFullContractSyncMutationInput!) {
  performFullContractSync(input: $input) {
    status
  }
}
    `;
export type PerformFullContractSyncMutationFn = Apollo.MutationFunction<Types.PerformFullContractSyncMutation, Types.PerformFullContractSyncMutationVariables>;

/**
 * __usePerformFullContractSyncMutation__
 *
 * To run a mutation, you first call `usePerformFullContractSyncMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePerformFullContractSyncMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [performFullContractSyncMutation, { data, loading, error }] = usePerformFullContractSyncMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePerformFullContractSyncMutation(baseOptions?: Apollo.MutationHookOptions<Types.PerformFullContractSyncMutation, Types.PerformFullContractSyncMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.PerformFullContractSyncMutation, Types.PerformFullContractSyncMutationVariables>(PerformFullContractSyncDocument, options);
      }
export type PerformFullContractSyncMutationHookResult = ReturnType<typeof usePerformFullContractSyncMutation>;
export type PerformFullContractSyncMutationResult = Apollo.MutationResult<Types.PerformFullContractSyncMutation>;
export type PerformFullContractSyncMutationOptions = Apollo.BaseMutationOptions<Types.PerformFullContractSyncMutation, Types.PerformFullContractSyncMutationVariables>;
export const RecommendOpportunityDocument = gql`
    mutation RecommendOpportunity($input: RecommendOpportunityMutationInput!) {
  recommendOpportunity(input: $input) {
    status
  }
}
    `;
export type RecommendOpportunityMutationFn = Apollo.MutationFunction<Types.RecommendOpportunityMutation, Types.RecommendOpportunityMutationVariables>;

/**
 * __useRecommendOpportunityMutation__
 *
 * To run a mutation, you first call `useRecommendOpportunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecommendOpportunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recommendOpportunityMutation, { data, loading, error }] = useRecommendOpportunityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRecommendOpportunityMutation(baseOptions?: Apollo.MutationHookOptions<Types.RecommendOpportunityMutation, Types.RecommendOpportunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.RecommendOpportunityMutation, Types.RecommendOpportunityMutationVariables>(RecommendOpportunityDocument, options);
      }
export type RecommendOpportunityMutationHookResult = ReturnType<typeof useRecommendOpportunityMutation>;
export type RecommendOpportunityMutationResult = Apollo.MutationResult<Types.RecommendOpportunityMutation>;
export type RecommendOpportunityMutationOptions = Apollo.BaseMutationOptions<Types.RecommendOpportunityMutation, Types.RecommendOpportunityMutationVariables>;
export const ResetPostSecondaryApplicationsForStudentsDocument = gql`
    mutation ResetPostSecondaryApplicationsForStudents($input: ResetPostSecondaryApplicationsForStudentMutationInput!) {
  resetPostSecondaryApplicationsForStudent(input: $input) {
    student {
      uuid
      postSecondaryApplicationsStatus {
        isEnabled
        isOverridden
      }
    }
  }
}
    `;
export type ResetPostSecondaryApplicationsForStudentsMutationFn = Apollo.MutationFunction<Types.ResetPostSecondaryApplicationsForStudentsMutation, Types.ResetPostSecondaryApplicationsForStudentsMutationVariables>;

/**
 * __useResetPostSecondaryApplicationsForStudentsMutation__
 *
 * To run a mutation, you first call `useResetPostSecondaryApplicationsForStudentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPostSecondaryApplicationsForStudentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPostSecondaryApplicationsForStudentsMutation, { data, loading, error }] = useResetPostSecondaryApplicationsForStudentsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPostSecondaryApplicationsForStudentsMutation(baseOptions?: Apollo.MutationHookOptions<Types.ResetPostSecondaryApplicationsForStudentsMutation, Types.ResetPostSecondaryApplicationsForStudentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ResetPostSecondaryApplicationsForStudentsMutation, Types.ResetPostSecondaryApplicationsForStudentsMutationVariables>(ResetPostSecondaryApplicationsForStudentsDocument, options);
      }
export type ResetPostSecondaryApplicationsForStudentsMutationHookResult = ReturnType<typeof useResetPostSecondaryApplicationsForStudentsMutation>;
export type ResetPostSecondaryApplicationsForStudentsMutationResult = Apollo.MutationResult<Types.ResetPostSecondaryApplicationsForStudentsMutation>;
export type ResetPostSecondaryApplicationsForStudentsMutationOptions = Apollo.BaseMutationOptions<Types.ResetPostSecondaryApplicationsForStudentsMutation, Types.ResetPostSecondaryApplicationsForStudentsMutationVariables>;
export const RestoreCatalogDocument = gql`
    mutation RestoreCatalog($input: RestoreCatalogMutationInput!) {
  restoreCatalog(input: $input) {
    catalog {
      archivedAt
      id
    }
  }
}
    `;
export type RestoreCatalogMutationFn = Apollo.MutationFunction<Types.RestoreCatalogMutation, Types.RestoreCatalogMutationVariables>;

/**
 * __useRestoreCatalogMutation__
 *
 * To run a mutation, you first call `useRestoreCatalogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreCatalogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreCatalogMutation, { data, loading, error }] = useRestoreCatalogMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRestoreCatalogMutation(baseOptions?: Apollo.MutationHookOptions<Types.RestoreCatalogMutation, Types.RestoreCatalogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.RestoreCatalogMutation, Types.RestoreCatalogMutationVariables>(RestoreCatalogDocument, options);
      }
export type RestoreCatalogMutationHookResult = ReturnType<typeof useRestoreCatalogMutation>;
export type RestoreCatalogMutationResult = Apollo.MutationResult<Types.RestoreCatalogMutation>;
export type RestoreCatalogMutationOptions = Apollo.BaseMutationOptions<Types.RestoreCatalogMutation, Types.RestoreCatalogMutationVariables>;
export const RestoreExtensionFieldDocument = gql`
    mutation RestoreExtensionField($input: RestoreExtensionFieldMutationInput!) {
  restoreExtensionField(input: $input) {
    extensionField {
      archivedAt
      id
    }
  }
}
    `;
export type RestoreExtensionFieldMutationFn = Apollo.MutationFunction<Types.RestoreExtensionFieldMutation, Types.RestoreExtensionFieldMutationVariables>;

/**
 * __useRestoreExtensionFieldMutation__
 *
 * To run a mutation, you first call `useRestoreExtensionFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreExtensionFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreExtensionFieldMutation, { data, loading, error }] = useRestoreExtensionFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRestoreExtensionFieldMutation(baseOptions?: Apollo.MutationHookOptions<Types.RestoreExtensionFieldMutation, Types.RestoreExtensionFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.RestoreExtensionFieldMutation, Types.RestoreExtensionFieldMutationVariables>(RestoreExtensionFieldDocument, options);
      }
export type RestoreExtensionFieldMutationHookResult = ReturnType<typeof useRestoreExtensionFieldMutation>;
export type RestoreExtensionFieldMutationResult = Apollo.MutationResult<Types.RestoreExtensionFieldMutation>;
export type RestoreExtensionFieldMutationOptions = Apollo.BaseMutationOptions<Types.RestoreExtensionFieldMutation, Types.RestoreExtensionFieldMutationVariables>;
export const RestorePartnerDocument = gql`
    mutation RestorePartner($input: RestorePartnerMutationInput!) {
  restorePartner(input: $input) {
    partner {
      id
      isArchived
    }
  }
}
    `;
export type RestorePartnerMutationFn = Apollo.MutationFunction<Types.RestorePartnerMutation, Types.RestorePartnerMutationVariables>;

/**
 * __useRestorePartnerMutation__
 *
 * To run a mutation, you first call `useRestorePartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestorePartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restorePartnerMutation, { data, loading, error }] = useRestorePartnerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRestorePartnerMutation(baseOptions?: Apollo.MutationHookOptions<Types.RestorePartnerMutation, Types.RestorePartnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.RestorePartnerMutation, Types.RestorePartnerMutationVariables>(RestorePartnerDocument, options);
      }
export type RestorePartnerMutationHookResult = ReturnType<typeof useRestorePartnerMutation>;
export type RestorePartnerMutationResult = Apollo.MutationResult<Types.RestorePartnerMutation>;
export type RestorePartnerMutationOptions = Apollo.BaseMutationOptions<Types.RestorePartnerMutation, Types.RestorePartnerMutationVariables>;
export const RestoreTrackDocument = gql`
    mutation RestoreTrack($input: RestoreTrackMutationInput!) {
  restoreTrack(input: $input) {
    track {
      archivedAt
      id
    }
  }
}
    `;
export type RestoreTrackMutationFn = Apollo.MutationFunction<Types.RestoreTrackMutation, Types.RestoreTrackMutationVariables>;

/**
 * __useRestoreTrackMutation__
 *
 * To run a mutation, you first call `useRestoreTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreTrackMutation, { data, loading, error }] = useRestoreTrackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRestoreTrackMutation(baseOptions?: Apollo.MutationHookOptions<Types.RestoreTrackMutation, Types.RestoreTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.RestoreTrackMutation, Types.RestoreTrackMutationVariables>(RestoreTrackDocument, options);
      }
export type RestoreTrackMutationHookResult = ReturnType<typeof useRestoreTrackMutation>;
export type RestoreTrackMutationResult = Apollo.MutationResult<Types.RestoreTrackMutation>;
export type RestoreTrackMutationOptions = Apollo.BaseMutationOptions<Types.RestoreTrackMutation, Types.RestoreTrackMutationVariables>;
export const RestoreUnitDocument = gql`
    mutation RestoreUnit($input: RestoreUnitMutationInput!) {
  restoreUnit(input: $input) {
    unit {
      archivedAt
      description
      id
      imageUrl
      name
    }
  }
}
    `;
export type RestoreUnitMutationFn = Apollo.MutationFunction<Types.RestoreUnitMutation, Types.RestoreUnitMutationVariables>;

/**
 * __useRestoreUnitMutation__
 *
 * To run a mutation, you first call `useRestoreUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreUnitMutation, { data, loading, error }] = useRestoreUnitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRestoreUnitMutation(baseOptions?: Apollo.MutationHookOptions<Types.RestoreUnitMutation, Types.RestoreUnitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.RestoreUnitMutation, Types.RestoreUnitMutationVariables>(RestoreUnitDocument, options);
      }
export type RestoreUnitMutationHookResult = ReturnType<typeof useRestoreUnitMutation>;
export type RestoreUnitMutationResult = Apollo.MutationResult<Types.RestoreUnitMutation>;
export type RestoreUnitMutationOptions = Apollo.BaseMutationOptions<Types.RestoreUnitMutation, Types.RestoreUnitMutationVariables>;
export const SetEntityTagsDocument = gql`
    mutation setEntityTags($input: SetEntityTagsMutationInput!) {
  setEntityTags(input: $input) {
    entity {
      uuid
      tags {
        id
      }
      children {
        nodes {
          uuid
          tags {
            id
          }
        }
      }
    }
  }
}
    `;
export type SetEntityTagsMutationFn = Apollo.MutationFunction<Types.SetEntityTagsMutation, Types.SetEntityTagsMutationVariables>;

/**
 * __useSetEntityTagsMutation__
 *
 * To run a mutation, you first call `useSetEntityTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetEntityTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setEntityTagsMutation, { data, loading, error }] = useSetEntityTagsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetEntityTagsMutation(baseOptions?: Apollo.MutationHookOptions<Types.SetEntityTagsMutation, Types.SetEntityTagsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SetEntityTagsMutation, Types.SetEntityTagsMutationVariables>(SetEntityTagsDocument, options);
      }
export type SetEntityTagsMutationHookResult = ReturnType<typeof useSetEntityTagsMutation>;
export type SetEntityTagsMutationResult = Apollo.MutationResult<Types.SetEntityTagsMutation>;
export type SetEntityTagsMutationOptions = Apollo.BaseMutationOptions<Types.SetEntityTagsMutation, Types.SetEntityTagsMutationVariables>;
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
export const SyncStandardSetsDocument = gql`
    mutation SyncStandardSets($input: SyncStandardSetsMutationInput!) {
  syncStandardSets(input: $input) {
    status
  }
}
    `;
export type SyncStandardSetsMutationFn = Apollo.MutationFunction<Types.SyncStandardSetsMutation, Types.SyncStandardSetsMutationVariables>;

/**
 * __useSyncStandardSetsMutation__
 *
 * To run a mutation, you first call `useSyncStandardSetsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncStandardSetsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncStandardSetsMutation, { data, loading, error }] = useSyncStandardSetsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSyncStandardSetsMutation(baseOptions?: Apollo.MutationHookOptions<Types.SyncStandardSetsMutation, Types.SyncStandardSetsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SyncStandardSetsMutation, Types.SyncStandardSetsMutationVariables>(SyncStandardSetsDocument, options);
      }
export type SyncStandardSetsMutationHookResult = ReturnType<typeof useSyncStandardSetsMutation>;
export type SyncStandardSetsMutationResult = Apollo.MutationResult<Types.SyncStandardSetsMutation>;
export type SyncStandardSetsMutationOptions = Apollo.BaseMutationOptions<Types.SyncStandardSetsMutation, Types.SyncStandardSetsMutationVariables>;
export const ToggleEntityReportDocument = gql`
    mutation ToggleEntityReport($input: ToggleEntityReportTypeAvailabilityMutationInput!) {
  toggleEntityReportTypeAvailability(input: $input) {
    entity {
      uuid
      reportTypes
      children {
        nodes {
          uuid
          reportTypes
        }
      }
    }
  }
}
    `;
export type ToggleEntityReportMutationFn = Apollo.MutationFunction<Types.ToggleEntityReportMutation, Types.ToggleEntityReportMutationVariables>;

/**
 * __useToggleEntityReportMutation__
 *
 * To run a mutation, you first call `useToggleEntityReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleEntityReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleEntityReportMutation, { data, loading, error }] = useToggleEntityReportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleEntityReportMutation(baseOptions?: Apollo.MutationHookOptions<Types.ToggleEntityReportMutation, Types.ToggleEntityReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ToggleEntityReportMutation, Types.ToggleEntityReportMutationVariables>(ToggleEntityReportDocument, options);
      }
export type ToggleEntityReportMutationHookResult = ReturnType<typeof useToggleEntityReportMutation>;
export type ToggleEntityReportMutationResult = Apollo.MutationResult<Types.ToggleEntityReportMutation>;
export type ToggleEntityReportMutationOptions = Apollo.BaseMutationOptions<Types.ToggleEntityReportMutation, Types.ToggleEntityReportMutationVariables>;
export const TogglePostSecondaryApplicationsForStudentsDocument = gql`
    mutation TogglePostSecondaryApplicationsForStudents($input: TogglePostSecondaryApplicationsForStudentsMutationInput!) {
  togglePostSecondaryApplicationsForStudents(input: $input) {
    students {
      uuid
      postSecondaryApplicationsStatus {
        isEnabled
        isOverridden
      }
    }
  }
}
    `;
export type TogglePostSecondaryApplicationsForStudentsMutationFn = Apollo.MutationFunction<Types.TogglePostSecondaryApplicationsForStudentsMutation, Types.TogglePostSecondaryApplicationsForStudentsMutationVariables>;

/**
 * __useTogglePostSecondaryApplicationsForStudentsMutation__
 *
 * To run a mutation, you first call `useTogglePostSecondaryApplicationsForStudentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTogglePostSecondaryApplicationsForStudentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [togglePostSecondaryApplicationsForStudentsMutation, { data, loading, error }] = useTogglePostSecondaryApplicationsForStudentsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTogglePostSecondaryApplicationsForStudentsMutation(baseOptions?: Apollo.MutationHookOptions<Types.TogglePostSecondaryApplicationsForStudentsMutation, Types.TogglePostSecondaryApplicationsForStudentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.TogglePostSecondaryApplicationsForStudentsMutation, Types.TogglePostSecondaryApplicationsForStudentsMutationVariables>(TogglePostSecondaryApplicationsForStudentsDocument, options);
      }
export type TogglePostSecondaryApplicationsForStudentsMutationHookResult = ReturnType<typeof useTogglePostSecondaryApplicationsForStudentsMutation>;
export type TogglePostSecondaryApplicationsForStudentsMutationResult = Apollo.MutationResult<Types.TogglePostSecondaryApplicationsForStudentsMutation>;
export type TogglePostSecondaryApplicationsForStudentsMutationOptions = Apollo.BaseMutationOptions<Types.TogglePostSecondaryApplicationsForStudentsMutation, Types.TogglePostSecondaryApplicationsForStudentsMutationVariables>;
export const UnassignExtensionFieldToEntityDocument = gql`
    mutation UnassignExtensionFieldToEntity($input: UnassignExtensionFieldFromEntityMutationInput!) {
  unassignExtensionFieldFromEntity(input: $input) {
    extensionField {
      id
    }
  }
}
    `;
export type UnassignExtensionFieldToEntityMutationFn = Apollo.MutationFunction<Types.UnassignExtensionFieldToEntityMutation, Types.UnassignExtensionFieldToEntityMutationVariables>;

/**
 * __useUnassignExtensionFieldToEntityMutation__
 *
 * To run a mutation, you first call `useUnassignExtensionFieldToEntityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignExtensionFieldToEntityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignExtensionFieldToEntityMutation, { data, loading, error }] = useUnassignExtensionFieldToEntityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnassignExtensionFieldToEntityMutation(baseOptions?: Apollo.MutationHookOptions<Types.UnassignExtensionFieldToEntityMutation, Types.UnassignExtensionFieldToEntityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UnassignExtensionFieldToEntityMutation, Types.UnassignExtensionFieldToEntityMutationVariables>(UnassignExtensionFieldToEntityDocument, options);
      }
export type UnassignExtensionFieldToEntityMutationHookResult = ReturnType<typeof useUnassignExtensionFieldToEntityMutation>;
export type UnassignExtensionFieldToEntityMutationResult = Apollo.MutationResult<Types.UnassignExtensionFieldToEntityMutation>;
export type UnassignExtensionFieldToEntityMutationOptions = Apollo.BaseMutationOptions<Types.UnassignExtensionFieldToEntityMutation, Types.UnassignExtensionFieldToEntityMutationVariables>;
export const UnassignPlanFromEntityDocument = gql`
    mutation UnassignPlanFromEntity($input: UnassignPlanFromEntityMutationInput!) {
  unassignPlanFromEntity(input: $input) {
    plan {
      id
    }
  }
}
    `;
export type UnassignPlanFromEntityMutationFn = Apollo.MutationFunction<Types.UnassignPlanFromEntityMutation, Types.UnassignPlanFromEntityMutationVariables>;

/**
 * __useUnassignPlanFromEntityMutation__
 *
 * To run a mutation, you first call `useUnassignPlanFromEntityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignPlanFromEntityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignPlanFromEntityMutation, { data, loading, error }] = useUnassignPlanFromEntityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnassignPlanFromEntityMutation(baseOptions?: Apollo.MutationHookOptions<Types.UnassignPlanFromEntityMutation, Types.UnassignPlanFromEntityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UnassignPlanFromEntityMutation, Types.UnassignPlanFromEntityMutationVariables>(UnassignPlanFromEntityDocument, options);
      }
export type UnassignPlanFromEntityMutationHookResult = ReturnType<typeof useUnassignPlanFromEntityMutation>;
export type UnassignPlanFromEntityMutationResult = Apollo.MutationResult<Types.UnassignPlanFromEntityMutation>;
export type UnassignPlanFromEntityMutationOptions = Apollo.BaseMutationOptions<Types.UnassignPlanFromEntityMutation, Types.UnassignPlanFromEntityMutationVariables>;
export const UnassignSchoolClassFromCourseDocument = gql`
    mutation UnassignSchoolClassFromCourse($input: UnassignSchoolClassFromCourseMutationInput!) {
  unassignSchoolClassFromCourse(input: $input) {
    status
  }
}
    `;
export type UnassignSchoolClassFromCourseMutationFn = Apollo.MutationFunction<Types.UnassignSchoolClassFromCourseMutation, Types.UnassignSchoolClassFromCourseMutationVariables>;

/**
 * __useUnassignSchoolClassFromCourseMutation__
 *
 * To run a mutation, you first call `useUnassignSchoolClassFromCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignSchoolClassFromCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignSchoolClassFromCourseMutation, { data, loading, error }] = useUnassignSchoolClassFromCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnassignSchoolClassFromCourseMutation(baseOptions?: Apollo.MutationHookOptions<Types.UnassignSchoolClassFromCourseMutation, Types.UnassignSchoolClassFromCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UnassignSchoolClassFromCourseMutation, Types.UnassignSchoolClassFromCourseMutationVariables>(UnassignSchoolClassFromCourseDocument, options);
      }
export type UnassignSchoolClassFromCourseMutationHookResult = ReturnType<typeof useUnassignSchoolClassFromCourseMutation>;
export type UnassignSchoolClassFromCourseMutationResult = Apollo.MutationResult<Types.UnassignSchoolClassFromCourseMutation>;
export type UnassignSchoolClassFromCourseMutationOptions = Apollo.BaseMutationOptions<Types.UnassignSchoolClassFromCourseMutation, Types.UnassignSchoolClassFromCourseMutationVariables>;
export const UnassignStandardSetFromEntityDocument = gql`
    mutation UnassignStandardSetFromEntity($input: UnassignStandardSetFromEntityMutationInput!) {
  unassignStandardSetFromEntity(input: $input) {
    standardSet {
      id
      entities {
        nodes {
          standardSets {
            id
          }
          uuid
        }
      }
    }
  }
}
    `;
export type UnassignStandardSetFromEntityMutationFn = Apollo.MutationFunction<Types.UnassignStandardSetFromEntityMutation, Types.UnassignStandardSetFromEntityMutationVariables>;

/**
 * __useUnassignStandardSetFromEntityMutation__
 *
 * To run a mutation, you first call `useUnassignStandardSetFromEntityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignStandardSetFromEntityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignStandardSetFromEntityMutation, { data, loading, error }] = useUnassignStandardSetFromEntityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnassignStandardSetFromEntityMutation(baseOptions?: Apollo.MutationHookOptions<Types.UnassignStandardSetFromEntityMutation, Types.UnassignStandardSetFromEntityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UnassignStandardSetFromEntityMutation, Types.UnassignStandardSetFromEntityMutationVariables>(UnassignStandardSetFromEntityDocument, options);
      }
export type UnassignStandardSetFromEntityMutationHookResult = ReturnType<typeof useUnassignStandardSetFromEntityMutation>;
export type UnassignStandardSetFromEntityMutationResult = Apollo.MutationResult<Types.UnassignStandardSetFromEntityMutation>;
export type UnassignStandardSetFromEntityMutationOptions = Apollo.BaseMutationOptions<Types.UnassignStandardSetFromEntityMutation, Types.UnassignStandardSetFromEntityMutationVariables>;
export const UnassignStudentFromCourseDocument = gql`
    mutation UnassignStudentFromCourse($input: UnassignStudentFromCourseMutationInput!) {
  unassignStudentFromCourse(input: $input) {
    courseId
  }
}
    `;
export type UnassignStudentFromCourseMutationFn = Apollo.MutationFunction<Types.UnassignStudentFromCourseMutation, Types.UnassignStudentFromCourseMutationVariables>;

/**
 * __useUnassignStudentFromCourseMutation__
 *
 * To run a mutation, you first call `useUnassignStudentFromCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignStudentFromCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignStudentFromCourseMutation, { data, loading, error }] = useUnassignStudentFromCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnassignStudentFromCourseMutation(baseOptions?: Apollo.MutationHookOptions<Types.UnassignStudentFromCourseMutation, Types.UnassignStudentFromCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UnassignStudentFromCourseMutation, Types.UnassignStudentFromCourseMutationVariables>(UnassignStudentFromCourseDocument, options);
      }
export type UnassignStudentFromCourseMutationHookResult = ReturnType<typeof useUnassignStudentFromCourseMutation>;
export type UnassignStudentFromCourseMutationResult = Apollo.MutationResult<Types.UnassignStudentFromCourseMutation>;
export type UnassignStudentFromCourseMutationOptions = Apollo.BaseMutationOptions<Types.UnassignStudentFromCourseMutation, Types.UnassignStudentFromCourseMutationVariables>;
export const UnlockStatementDocument = gql`
    mutation UnlockStatement($input: UnlockStatementMutationInput!, $planId: ID!) {
  unlockStatement(input: $input) {
    student {
      uuid
      plan(id: $planId) {
        groups {
          id
          statements {
            id
            isLocked
          }
        }
      }
    }
  }
}
    `;
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
export const UnsubmitCommonAppFormResponsesDocument = gql`
    mutation UnsubmitCommonAppFormResponses($input: UnsubmitCommonAppFormResponsesMutationInput!) {
  unsubmitCommonAppFormResponses(input: $input) {
    status
  }
}
    `;
export type UnsubmitCommonAppFormResponsesMutationFn = Apollo.MutationFunction<Types.UnsubmitCommonAppFormResponsesMutation, Types.UnsubmitCommonAppFormResponsesMutationVariables>;

/**
 * __useUnsubmitCommonAppFormResponsesMutation__
 *
 * To run a mutation, you first call `useUnsubmitCommonAppFormResponsesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubmitCommonAppFormResponsesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubmitCommonAppFormResponsesMutation, { data, loading, error }] = useUnsubmitCommonAppFormResponsesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnsubmitCommonAppFormResponsesMutation(baseOptions?: Apollo.MutationHookOptions<Types.UnsubmitCommonAppFormResponsesMutation, Types.UnsubmitCommonAppFormResponsesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UnsubmitCommonAppFormResponsesMutation, Types.UnsubmitCommonAppFormResponsesMutationVariables>(UnsubmitCommonAppFormResponsesDocument, options);
      }
export type UnsubmitCommonAppFormResponsesMutationHookResult = ReturnType<typeof useUnsubmitCommonAppFormResponsesMutation>;
export type UnsubmitCommonAppFormResponsesMutationResult = Apollo.MutationResult<Types.UnsubmitCommonAppFormResponsesMutation>;
export type UnsubmitCommonAppFormResponsesMutationOptions = Apollo.BaseMutationOptions<Types.UnsubmitCommonAppFormResponsesMutation, Types.UnsubmitCommonAppFormResponsesMutationVariables>;
export const UpdateAssignmentDocument = gql`
    mutation UpdateAssignment($input: UpdateAssignmentMutationInput!) {
  updateAssignment(input: $input) {
    assignment {
      assetName
      badges {
        id
        name
        imageUrl
      }
      description
      displayName
      id
      rubrics {
        id
        description
        name
      }
    }
  }
}
    `;
export type UpdateAssignmentMutationFn = Apollo.MutationFunction<Types.UpdateAssignmentMutation, Types.UpdateAssignmentMutationVariables>;

/**
 * __useUpdateAssignmentMutation__
 *
 * To run a mutation, you first call `useUpdateAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssignmentMutation, { data, loading, error }] = useUpdateAssignmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateAssignmentMutation, Types.UpdateAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateAssignmentMutation, Types.UpdateAssignmentMutationVariables>(UpdateAssignmentDocument, options);
      }
export type UpdateAssignmentMutationHookResult = ReturnType<typeof useUpdateAssignmentMutation>;
export type UpdateAssignmentMutationResult = Apollo.MutationResult<Types.UpdateAssignmentMutation>;
export type UpdateAssignmentMutationOptions = Apollo.BaseMutationOptions<Types.UpdateAssignmentMutation, Types.UpdateAssignmentMutationVariables>;
export const UpdateAttachmentDocument = gql`
    mutation UpdateAttachment($input: UpdateAttachmentMutationInput!) {
  updateAttachment(input: $input) {
    attachment {
      description
      displayName
      id
      name
    }
  }
}
    `;
export type UpdateAttachmentMutationFn = Apollo.MutationFunction<Types.UpdateAttachmentMutation, Types.UpdateAttachmentMutationVariables>;

/**
 * __useUpdateAttachmentMutation__
 *
 * To run a mutation, you first call `useUpdateAttachmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAttachmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAttachmentMutation, { data, loading, error }] = useUpdateAttachmentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAttachmentMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateAttachmentMutation, Types.UpdateAttachmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateAttachmentMutation, Types.UpdateAttachmentMutationVariables>(UpdateAttachmentDocument, options);
      }
export type UpdateAttachmentMutationHookResult = ReturnType<typeof useUpdateAttachmentMutation>;
export type UpdateAttachmentMutationResult = Apollo.MutationResult<Types.UpdateAttachmentMutation>;
export type UpdateAttachmentMutationOptions = Apollo.BaseMutationOptions<Types.UpdateAttachmentMutation, Types.UpdateAttachmentMutationVariables>;
export const UpdateBadgeDocument = gql`
    mutation UpdateBadge($input: UpdateBadgeMutationInput!) {
  updateBadge(input: $input) {
    badge {
      archivedAt
      id
      description
      imageUrl
      name
    }
  }
}
    `;
export type UpdateBadgeMutationFn = Apollo.MutationFunction<Types.UpdateBadgeMutation, Types.UpdateBadgeMutationVariables>;

/**
 * __useUpdateBadgeMutation__
 *
 * To run a mutation, you first call `useUpdateBadgeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBadgeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBadgeMutation, { data, loading, error }] = useUpdateBadgeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBadgeMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateBadgeMutation, Types.UpdateBadgeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateBadgeMutation, Types.UpdateBadgeMutationVariables>(UpdateBadgeDocument, options);
      }
export type UpdateBadgeMutationHookResult = ReturnType<typeof useUpdateBadgeMutation>;
export type UpdateBadgeMutationResult = Apollo.MutationResult<Types.UpdateBadgeMutation>;
export type UpdateBadgeMutationOptions = Apollo.BaseMutationOptions<Types.UpdateBadgeMutation, Types.UpdateBadgeMutationVariables>;
export const UpdateCatalogDocument = gql`
    mutation UpdateCatalog($input: UpdateCatalogMutationInput!) {
  updateCatalog(input: $input) {
    catalog {
      description
      displayName
      id
      imageUrl
      name
      status
    }
  }
}
    `;
export type UpdateCatalogMutationFn = Apollo.MutationFunction<Types.UpdateCatalogMutation, Types.UpdateCatalogMutationVariables>;

/**
 * __useUpdateCatalogMutation__
 *
 * To run a mutation, you first call `useUpdateCatalogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCatalogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCatalogMutation, { data, loading, error }] = useUpdateCatalogMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCatalogMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateCatalogMutation, Types.UpdateCatalogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateCatalogMutation, Types.UpdateCatalogMutationVariables>(UpdateCatalogDocument, options);
      }
export type UpdateCatalogMutationHookResult = ReturnType<typeof useUpdateCatalogMutation>;
export type UpdateCatalogMutationResult = Apollo.MutationResult<Types.UpdateCatalogMutation>;
export type UpdateCatalogMutationOptions = Apollo.BaseMutationOptions<Types.UpdateCatalogMutation, Types.UpdateCatalogMutationVariables>;
export const UpdateCheckInGroupDocument = gql`
    mutation UpdateCheckInGroup($input: UpdateCheckInGroupMutationInput!) {
  updateCheckInGroup(input: $input) {
    checkInGroup {
      archivedAt
      displayName
      id
      name
      questions {
        archivedAt
        id
        question
        step
      }
      step
    }
  }
}
    `;
export type UpdateCheckInGroupMutationFn = Apollo.MutationFunction<Types.UpdateCheckInGroupMutation, Types.UpdateCheckInGroupMutationVariables>;

/**
 * __useUpdateCheckInGroupMutation__
 *
 * To run a mutation, you first call `useUpdateCheckInGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCheckInGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCheckInGroupMutation, { data, loading, error }] = useUpdateCheckInGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCheckInGroupMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateCheckInGroupMutation, Types.UpdateCheckInGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateCheckInGroupMutation, Types.UpdateCheckInGroupMutationVariables>(UpdateCheckInGroupDocument, options);
      }
export type UpdateCheckInGroupMutationHookResult = ReturnType<typeof useUpdateCheckInGroupMutation>;
export type UpdateCheckInGroupMutationResult = Apollo.MutationResult<Types.UpdateCheckInGroupMutation>;
export type UpdateCheckInGroupMutationOptions = Apollo.BaseMutationOptions<Types.UpdateCheckInGroupMutation, Types.UpdateCheckInGroupMutationVariables>;
export const DcUpdateCheckInQuestionDocument = gql`
    mutation DcUpdateCheckInQuestion($input: UpdateCheckInQuestionMutationInput!) {
  updateCheckInQuestion(input: $input) {
    checkInQuestion {
      archivedAt
      id
      question
      step
    }
  }
}
    `;
export type DcUpdateCheckInQuestionMutationFn = Apollo.MutationFunction<Types.DcUpdateCheckInQuestionMutation, Types.DcUpdateCheckInQuestionMutationVariables>;

/**
 * __useDcUpdateCheckInQuestionMutation__
 *
 * To run a mutation, you first call `useDcUpdateCheckInQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDcUpdateCheckInQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dcUpdateCheckInQuestionMutation, { data, loading, error }] = useDcUpdateCheckInQuestionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDcUpdateCheckInQuestionMutation(baseOptions?: Apollo.MutationHookOptions<Types.DcUpdateCheckInQuestionMutation, Types.DcUpdateCheckInQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DcUpdateCheckInQuestionMutation, Types.DcUpdateCheckInQuestionMutationVariables>(DcUpdateCheckInQuestionDocument, options);
      }
export type DcUpdateCheckInQuestionMutationHookResult = ReturnType<typeof useDcUpdateCheckInQuestionMutation>;
export type DcUpdateCheckInQuestionMutationResult = Apollo.MutationResult<Types.DcUpdateCheckInQuestionMutation>;
export type DcUpdateCheckInQuestionMutationOptions = Apollo.BaseMutationOptions<Types.DcUpdateCheckInQuestionMutation, Types.DcUpdateCheckInQuestionMutationVariables>;
export const UpdateContractDocument = gql`
    mutation UpdateContract($input: UpdateContractMutationInput!) {
  updateContract(input: $input) {
    contract {
      id
      uuid
      syncable
    }
  }
}
    `;
export type UpdateContractMutationFn = Apollo.MutationFunction<Types.UpdateContractMutation, Types.UpdateContractMutationVariables>;

/**
 * __useUpdateContractMutation__
 *
 * To run a mutation, you first call `useUpdateContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContractMutation, { data, loading, error }] = useUpdateContractMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateContractMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateContractMutation, Types.UpdateContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateContractMutation, Types.UpdateContractMutationVariables>(UpdateContractDocument, options);
      }
export type UpdateContractMutationHookResult = ReturnType<typeof useUpdateContractMutation>;
export type UpdateContractMutationResult = Apollo.MutationResult<Types.UpdateContractMutation>;
export type UpdateContractMutationOptions = Apollo.BaseMutationOptions<Types.UpdateContractMutation, Types.UpdateContractMutationVariables>;
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($input: UpdateCourseMutationInput!) {
  updateCourse(input: $input) {
    course {
      description
      displayName
      id
      imageUrl
      name
      collection {
        id
        name
      }
      ...CourseMetadata
    }
  }
}
    ${CourseMetadataFragmentDoc}`;
export type UpdateCourseMutationFn = Apollo.MutationFunction<Types.UpdateCourseMutation, Types.UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCourseMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateCourseMutation, Types.UpdateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateCourseMutation, Types.UpdateCourseMutationVariables>(UpdateCourseDocument, options);
      }
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<Types.UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<Types.UpdateCourseMutation, Types.UpdateCourseMutationVariables>;
export const UpdateEntityDocument = gql`
    mutation UpdateEntity($input: UpdateEntityMutationInput!) {
  updateEntity(input: $input) {
    entity {
      uuid
      dcIconUrl
      dcLogoUrl
      dlIconUrl
      dlLogoUrl
      welcomeMessage {
        dcStudent
        dcTeacher
        dlStudent
        dlTeacher
      }
    }
  }
}
    `;
export type UpdateEntityMutationFn = Apollo.MutationFunction<Types.UpdateEntityMutation, Types.UpdateEntityMutationVariables>;

/**
 * __useUpdateEntityMutation__
 *
 * To run a mutation, you first call `useUpdateEntityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEntityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEntityMutation, { data, loading, error }] = useUpdateEntityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEntityMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateEntityMutation, Types.UpdateEntityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateEntityMutation, Types.UpdateEntityMutationVariables>(UpdateEntityDocument, options);
      }
export type UpdateEntityMutationHookResult = ReturnType<typeof useUpdateEntityMutation>;
export type UpdateEntityMutationResult = Apollo.MutationResult<Types.UpdateEntityMutation>;
export type UpdateEntityMutationOptions = Apollo.BaseMutationOptions<Types.UpdateEntityMutation, Types.UpdateEntityMutationVariables>;
export const UpdateEntityCatalogsDocument = gql`
    mutation UpdateEntityCatalogs($input: UpdateEntityCatalogsMutationInput!) {
  updateEntityCatalogs(input: $input) {
    entity {
      uuid
      name
    }
  }
}
    `;
export type UpdateEntityCatalogsMutationFn = Apollo.MutationFunction<Types.UpdateEntityCatalogsMutation, Types.UpdateEntityCatalogsMutationVariables>;

/**
 * __useUpdateEntityCatalogsMutation__
 *
 * To run a mutation, you first call `useUpdateEntityCatalogsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEntityCatalogsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEntityCatalogsMutation, { data, loading, error }] = useUpdateEntityCatalogsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEntityCatalogsMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateEntityCatalogsMutation, Types.UpdateEntityCatalogsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateEntityCatalogsMutation, Types.UpdateEntityCatalogsMutationVariables>(UpdateEntityCatalogsDocument, options);
      }
export type UpdateEntityCatalogsMutationHookResult = ReturnType<typeof useUpdateEntityCatalogsMutation>;
export type UpdateEntityCatalogsMutationResult = Apollo.MutationResult<Types.UpdateEntityCatalogsMutation>;
export type UpdateEntityCatalogsMutationOptions = Apollo.BaseMutationOptions<Types.UpdateEntityCatalogsMutation, Types.UpdateEntityCatalogsMutationVariables>;
export const UpdateEntityPlansDocument = gql`
    mutation UpdateEntityPlans($input: UpdateEntityPlansMutationInput!) {
  updateEntityPlans(input: $input) {
    entity {
      uuid
      name
    }
  }
}
    `;
export type UpdateEntityPlansMutationFn = Apollo.MutationFunction<Types.UpdateEntityPlansMutation, Types.UpdateEntityPlansMutationVariables>;

/**
 * __useUpdateEntityPlansMutation__
 *
 * To run a mutation, you first call `useUpdateEntityPlansMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEntityPlansMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEntityPlansMutation, { data, loading, error }] = useUpdateEntityPlansMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEntityPlansMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateEntityPlansMutation, Types.UpdateEntityPlansMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateEntityPlansMutation, Types.UpdateEntityPlansMutationVariables>(UpdateEntityPlansDocument, options);
      }
export type UpdateEntityPlansMutationHookResult = ReturnType<typeof useUpdateEntityPlansMutation>;
export type UpdateEntityPlansMutationResult = Apollo.MutationResult<Types.UpdateEntityPlansMutation>;
export type UpdateEntityPlansMutationOptions = Apollo.BaseMutationOptions<Types.UpdateEntityPlansMutation, Types.UpdateEntityPlansMutationVariables>;
export const DcUpdateEntitySettingsDocument = gql`
    mutation DcUpdateEntitySettings($input: UpdateEntitySettingsMutationInput!) {
  updateEntitySettings(input: $input) {
    entity {
      settings {
        assessmentEnabled
        assessmentType
        onboardingEnabled
        opportunitiesEnabled
        postSecondaryApplicationsEnabled
        classManagementEnabled
        selfEvaluationEnabled
      }
      schoolClasses {
        nodes {
          settings {
            assessmentType
          }
          students {
            nodes {
              settings {
                assessmentEnabled {
                  origin
                  value
                }
                assessmentType {
                  origin
                  value
                }
                onboardingEnabled {
                  origin
                  value
                }
              }
              uuid
            }
          }
          uuid
        }
      }
      uuid
    }
  }
}
    `;
export type DcUpdateEntitySettingsMutationFn = Apollo.MutationFunction<Types.DcUpdateEntitySettingsMutation, Types.DcUpdateEntitySettingsMutationVariables>;

/**
 * __useDcUpdateEntitySettingsMutation__
 *
 * To run a mutation, you first call `useDcUpdateEntitySettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDcUpdateEntitySettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dcUpdateEntitySettingsMutation, { data, loading, error }] = useDcUpdateEntitySettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDcUpdateEntitySettingsMutation(baseOptions?: Apollo.MutationHookOptions<Types.DcUpdateEntitySettingsMutation, Types.DcUpdateEntitySettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DcUpdateEntitySettingsMutation, Types.DcUpdateEntitySettingsMutationVariables>(DcUpdateEntitySettingsDocument, options);
      }
export type DcUpdateEntitySettingsMutationHookResult = ReturnType<typeof useDcUpdateEntitySettingsMutation>;
export type DcUpdateEntitySettingsMutationResult = Apollo.MutationResult<Types.DcUpdateEntitySettingsMutation>;
export type DcUpdateEntitySettingsMutationOptions = Apollo.BaseMutationOptions<Types.DcUpdateEntitySettingsMutation, Types.DcUpdateEntitySettingsMutationVariables>;
export const UpdateExtensionFieldDocument = gql`
    mutation UpdateExtensionField($input: UpdateExtensionFieldMutationInput!) {
  updateExtensionField(input: $input) {
    extensionField {
      clusters {
        id
        name
      }
      courses {
        id
        name
      }
      description
      files {
        id
        filename
        url(options: {responseContentDisposition: "attachment"})
      }
      id
      imageUrl
      links {
        name
        url
      }
      name
      pathways {
        id
        name
      }
      publishedFrom
      publishedTo
      status
    }
  }
}
    `;
export type UpdateExtensionFieldMutationFn = Apollo.MutationFunction<Types.UpdateExtensionFieldMutation, Types.UpdateExtensionFieldMutationVariables>;

/**
 * __useUpdateExtensionFieldMutation__
 *
 * To run a mutation, you first call `useUpdateExtensionFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExtensionFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExtensionFieldMutation, { data, loading, error }] = useUpdateExtensionFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExtensionFieldMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateExtensionFieldMutation, Types.UpdateExtensionFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateExtensionFieldMutation, Types.UpdateExtensionFieldMutationVariables>(UpdateExtensionFieldDocument, options);
      }
export type UpdateExtensionFieldMutationHookResult = ReturnType<typeof useUpdateExtensionFieldMutation>;
export type UpdateExtensionFieldMutationResult = Apollo.MutationResult<Types.UpdateExtensionFieldMutation>;
export type UpdateExtensionFieldMutationOptions = Apollo.BaseMutationOptions<Types.UpdateExtensionFieldMutation, Types.UpdateExtensionFieldMutationVariables>;
export const UpdateExtensionFieldStatusDocument = gql`
    mutation UpdateExtensionFieldStatus($input: UpdateExtensionFieldMutationInput!) {
  updateExtensionField(input: $input) {
    extensionField {
      id
      status
    }
  }
}
    `;
export type UpdateExtensionFieldStatusMutationFn = Apollo.MutationFunction<Types.UpdateExtensionFieldStatusMutation, Types.UpdateExtensionFieldStatusMutationVariables>;

/**
 * __useUpdateExtensionFieldStatusMutation__
 *
 * To run a mutation, you first call `useUpdateExtensionFieldStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExtensionFieldStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExtensionFieldStatusMutation, { data, loading, error }] = useUpdateExtensionFieldStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExtensionFieldStatusMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateExtensionFieldStatusMutation, Types.UpdateExtensionFieldStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateExtensionFieldStatusMutation, Types.UpdateExtensionFieldStatusMutationVariables>(UpdateExtensionFieldStatusDocument, options);
      }
export type UpdateExtensionFieldStatusMutationHookResult = ReturnType<typeof useUpdateExtensionFieldStatusMutation>;
export type UpdateExtensionFieldStatusMutationResult = Apollo.MutationResult<Types.UpdateExtensionFieldStatusMutation>;
export type UpdateExtensionFieldStatusMutationOptions = Apollo.BaseMutationOptions<Types.UpdateExtensionFieldStatusMutation, Types.UpdateExtensionFieldStatusMutationVariables>;
export const UpdateExternalPresentationDocument = gql`
    mutation UpdateExternalPresentation($input: UpdateExternalPresentationMutationInput!) {
  updateExternalPresentation(input: $input) {
    externalPresentation {
      displayName
      isExpandable
      id
      name
      source
    }
  }
}
    `;
export type UpdateExternalPresentationMutationFn = Apollo.MutationFunction<Types.UpdateExternalPresentationMutation, Types.UpdateExternalPresentationMutationVariables>;

/**
 * __useUpdateExternalPresentationMutation__
 *
 * To run a mutation, you first call `useUpdateExternalPresentationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExternalPresentationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExternalPresentationMutation, { data, loading, error }] = useUpdateExternalPresentationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateExternalPresentationMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateExternalPresentationMutation, Types.UpdateExternalPresentationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateExternalPresentationMutation, Types.UpdateExternalPresentationMutationVariables>(UpdateExternalPresentationDocument, options);
      }
export type UpdateExternalPresentationMutationHookResult = ReturnType<typeof useUpdateExternalPresentationMutation>;
export type UpdateExternalPresentationMutationResult = Apollo.MutationResult<Types.UpdateExternalPresentationMutation>;
export type UpdateExternalPresentationMutationOptions = Apollo.BaseMutationOptions<Types.UpdateExternalPresentationMutation, Types.UpdateExternalPresentationMutationVariables>;
export const UpdateLessonDocument = gql`
    mutation UpdateLesson($input: UpdateLessonMutationInput!) {
  updateLesson(input: $input) {
    lesson {
      assignments {
        assetName
        description
        displayName
        id
        step
      }
      attachments {
        description
        displayName
        files {
          filename
          id
          url(options: {responseContentDisposition: "attachment"})
        }
        id
        name
        step
      }
      description {
        introduction
        goal
        role
        audience
        situation
      }
      id
      imageUrl
      name
      externalPresentations {
        displayName
        id
        name
        source
      }
      researchLinks {
        author
        displayName
        id
        name
        resourceLink
        sourceName
        step
      }
      texts {
        content
        displayName
        id
        name
        step
      }
      type
      videos {
        description
        displayName
        filename
        id
        name
        url
        step
      }
      vocabularies {
        definition
        id
        step
        term
      }
    }
  }
}
    `;
export type UpdateLessonMutationFn = Apollo.MutationFunction<Types.UpdateLessonMutation, Types.UpdateLessonMutationVariables>;

/**
 * __useUpdateLessonMutation__
 *
 * To run a mutation, you first call `useUpdateLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLessonMutation, { data, loading, error }] = useUpdateLessonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLessonMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateLessonMutation, Types.UpdateLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateLessonMutation, Types.UpdateLessonMutationVariables>(UpdateLessonDocument, options);
      }
export type UpdateLessonMutationHookResult = ReturnType<typeof useUpdateLessonMutation>;
export type UpdateLessonMutationResult = Apollo.MutationResult<Types.UpdateLessonMutation>;
export type UpdateLessonMutationOptions = Apollo.BaseMutationOptions<Types.UpdateLessonMutation, Types.UpdateLessonMutationVariables>;
export const UpdateOpportunityApplicationDocument = gql`
    mutation UpdateOpportunityApplication($input: UpdateOpportunityApplicationMutationInput!) {
  updateOpportunityApplication(input: $input) {
    application {
      status
      lastChangedBy {
        name
      }
    }
  }
}
    `;
export type UpdateOpportunityApplicationMutationFn = Apollo.MutationFunction<Types.UpdateOpportunityApplicationMutation, Types.UpdateOpportunityApplicationMutationVariables>;

/**
 * __useUpdateOpportunityApplicationMutation__
 *
 * To run a mutation, you first call `useUpdateOpportunityApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOpportunityApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOpportunityApplicationMutation, { data, loading, error }] = useUpdateOpportunityApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOpportunityApplicationMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateOpportunityApplicationMutation, Types.UpdateOpportunityApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateOpportunityApplicationMutation, Types.UpdateOpportunityApplicationMutationVariables>(UpdateOpportunityApplicationDocument, options);
      }
export type UpdateOpportunityApplicationMutationHookResult = ReturnType<typeof useUpdateOpportunityApplicationMutation>;
export type UpdateOpportunityApplicationMutationResult = Apollo.MutationResult<Types.UpdateOpportunityApplicationMutation>;
export type UpdateOpportunityApplicationMutationOptions = Apollo.BaseMutationOptions<Types.UpdateOpportunityApplicationMutation, Types.UpdateOpportunityApplicationMutationVariables>;
export const UpdatePartnerDocument = gql`
    mutation UpdatePartner($input: UpdatePartnerMutationInput!) {
  updatePartner(input: $input) {
    partner {
      about
      additionalUrls
      address
      coursesCount
      details
      email
      id
      imageUrl
      imageFitToContainer
      isArchived
      name
      opportunitiesCount
      phone
      status
      thumbnailUrl
      url
      virtualInternshipsCount
      visibilityScope
    }
  }
}
    `;
export type UpdatePartnerMutationFn = Apollo.MutationFunction<Types.UpdatePartnerMutation, Types.UpdatePartnerMutationVariables>;

/**
 * __useUpdatePartnerMutation__
 *
 * To run a mutation, you first call `useUpdatePartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePartnerMutation, { data, loading, error }] = useUpdatePartnerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePartnerMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdatePartnerMutation, Types.UpdatePartnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdatePartnerMutation, Types.UpdatePartnerMutationVariables>(UpdatePartnerDocument, options);
      }
export type UpdatePartnerMutationHookResult = ReturnType<typeof useUpdatePartnerMutation>;
export type UpdatePartnerMutationResult = Apollo.MutationResult<Types.UpdatePartnerMutation>;
export type UpdatePartnerMutationOptions = Apollo.BaseMutationOptions<Types.UpdatePartnerMutation, Types.UpdatePartnerMutationVariables>;
export const UpdatePartnerStatusDocument = gql`
    mutation UpdatePartnerStatus($input: UpdatePartnerMutationInput!) {
  updatePartner(input: $input) {
    partner {
      id
      status
    }
  }
}
    `;
export type UpdatePartnerStatusMutationFn = Apollo.MutationFunction<Types.UpdatePartnerStatusMutation, Types.UpdatePartnerStatusMutationVariables>;

/**
 * __useUpdatePartnerStatusMutation__
 *
 * To run a mutation, you first call `useUpdatePartnerStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePartnerStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePartnerStatusMutation, { data, loading, error }] = useUpdatePartnerStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePartnerStatusMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdatePartnerStatusMutation, Types.UpdatePartnerStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdatePartnerStatusMutation, Types.UpdatePartnerStatusMutationVariables>(UpdatePartnerStatusDocument, options);
      }
export type UpdatePartnerStatusMutationHookResult = ReturnType<typeof useUpdatePartnerStatusMutation>;
export type UpdatePartnerStatusMutationResult = Apollo.MutationResult<Types.UpdatePartnerStatusMutation>;
export type UpdatePartnerStatusMutationOptions = Apollo.BaseMutationOptions<Types.UpdatePartnerStatusMutation, Types.UpdatePartnerStatusMutationVariables>;
export const UpdatePlanDocument = gql`
    mutation UpdatePlan($input: UpdatePlanMutationInput!) {
  updatePlan(input: $input) {
    plan {
      archivedAt
      description
      id
      name
      groups {
        archivedAt
        description
        displayName
        id
        name
        step
        statements {
          id
          name
          step
        }
      }
    }
  }
}
    `;
export type UpdatePlanMutationFn = Apollo.MutationFunction<Types.UpdatePlanMutation, Types.UpdatePlanMutationVariables>;

/**
 * __useUpdatePlanMutation__
 *
 * To run a mutation, you first call `useUpdatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlanMutation, { data, loading, error }] = useUpdatePlanMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePlanMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdatePlanMutation, Types.UpdatePlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdatePlanMutation, Types.UpdatePlanMutationVariables>(UpdatePlanDocument, options);
      }
export type UpdatePlanMutationHookResult = ReturnType<typeof useUpdatePlanMutation>;
export type UpdatePlanMutationResult = Apollo.MutationResult<Types.UpdatePlanMutation>;
export type UpdatePlanMutationOptions = Apollo.BaseMutationOptions<Types.UpdatePlanMutation, Types.UpdatePlanMutationVariables>;
export const UpdatePlanGroupDocument = gql`
    mutation UpdatePlanGroup($input: UpdatePlanGroupMutationInput!) {
  updatePlanGroup(input: $input) {
    planGroup {
      description
      displayName
      id
      name
      statements {
        id
        step
      }
    }
  }
}
    `;
export type UpdatePlanGroupMutationFn = Apollo.MutationFunction<Types.UpdatePlanGroupMutation, Types.UpdatePlanGroupMutationVariables>;

/**
 * __useUpdatePlanGroupMutation__
 *
 * To run a mutation, you first call `useUpdatePlanGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlanGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlanGroupMutation, { data, loading, error }] = useUpdatePlanGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePlanGroupMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdatePlanGroupMutation, Types.UpdatePlanGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdatePlanGroupMutation, Types.UpdatePlanGroupMutationVariables>(UpdatePlanGroupDocument, options);
      }
export type UpdatePlanGroupMutationHookResult = ReturnType<typeof useUpdatePlanGroupMutation>;
export type UpdatePlanGroupMutationResult = Apollo.MutationResult<Types.UpdatePlanGroupMutation>;
export type UpdatePlanGroupMutationOptions = Apollo.BaseMutationOptions<Types.UpdatePlanGroupMutation, Types.UpdatePlanGroupMutationVariables>;
export const UpdatePlanGroupStatementDocument = gql`
    mutation UpdatePlanGroupStatement($input: UpdatePlanGroupStatementMutationInput!) {
  updatePlanGroupStatement(input: $input) {
    planGroupStatement {
      id
      name
      step
      isRequired
      question {
        text
        questionType
        options {
          option
          step
        }
      }
    }
  }
}
    `;
export type UpdatePlanGroupStatementMutationFn = Apollo.MutationFunction<Types.UpdatePlanGroupStatementMutation, Types.UpdatePlanGroupStatementMutationVariables>;

/**
 * __useUpdatePlanGroupStatementMutation__
 *
 * To run a mutation, you first call `useUpdatePlanGroupStatementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlanGroupStatementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlanGroupStatementMutation, { data, loading, error }] = useUpdatePlanGroupStatementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePlanGroupStatementMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdatePlanGroupStatementMutation, Types.UpdatePlanGroupStatementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdatePlanGroupStatementMutation, Types.UpdatePlanGroupStatementMutationVariables>(UpdatePlanGroupStatementDocument, options);
      }
export type UpdatePlanGroupStatementMutationHookResult = ReturnType<typeof useUpdatePlanGroupStatementMutation>;
export type UpdatePlanGroupStatementMutationResult = Apollo.MutationResult<Types.UpdatePlanGroupStatementMutation>;
export type UpdatePlanGroupStatementMutationOptions = Apollo.BaseMutationOptions<Types.UpdatePlanGroupStatementMutation, Types.UpdatePlanGroupStatementMutationVariables>;
export const UpdatePresentationDocument = gql`
    mutation UpdatePresentation($input: UpdatePresentationMutationInput!) {
  updatePresentation(input: $input) {
    presentation {
      color
      description
      displayName
      id
      name
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
      status
      transition
      typography
      type
    }
  }
}
    `;
export type UpdatePresentationMutationFn = Apollo.MutationFunction<Types.UpdatePresentationMutation, Types.UpdatePresentationMutationVariables>;

/**
 * __useUpdatePresentationMutation__
 *
 * To run a mutation, you first call `useUpdatePresentationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePresentationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePresentationMutation, { data, loading, error }] = useUpdatePresentationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePresentationMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdatePresentationMutation, Types.UpdatePresentationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdatePresentationMutation, Types.UpdatePresentationMutationVariables>(UpdatePresentationDocument, options);
      }
export type UpdatePresentationMutationHookResult = ReturnType<typeof useUpdatePresentationMutation>;
export type UpdatePresentationMutationResult = Apollo.MutationResult<Types.UpdatePresentationMutation>;
export type UpdatePresentationMutationOptions = Apollo.BaseMutationOptions<Types.UpdatePresentationMutation, Types.UpdatePresentationMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($input: UpdateProductMutationInput!) {
  updateProduct(input: $input) {
    product {
      archivedAt
      description
      displayName
      id
      name
      rubricsUrl
    }
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<Types.UpdateProductMutation, Types.UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateProductMutation, Types.UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateProductMutation, Types.UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<Types.UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<Types.UpdateProductMutation, Types.UpdateProductMutationVariables>;
export const UpdateResearchLinkDocument = gql`
    mutation UpdateResearchLink($input: UpdateResearchLinkMutationInput!) {
  updateResearchLink(input: $input) {
    researchLink {
      author
      displayName
      id
      name
      resourceLink
      sourceName
    }
  }
}
    `;
export type UpdateResearchLinkMutationFn = Apollo.MutationFunction<Types.UpdateResearchLinkMutation, Types.UpdateResearchLinkMutationVariables>;

/**
 * __useUpdateResearchLinkMutation__
 *
 * To run a mutation, you first call `useUpdateResearchLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateResearchLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateResearchLinkMutation, { data, loading, error }] = useUpdateResearchLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateResearchLinkMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateResearchLinkMutation, Types.UpdateResearchLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateResearchLinkMutation, Types.UpdateResearchLinkMutationVariables>(UpdateResearchLinkDocument, options);
      }
export type UpdateResearchLinkMutationHookResult = ReturnType<typeof useUpdateResearchLinkMutation>;
export type UpdateResearchLinkMutationResult = Apollo.MutationResult<Types.UpdateResearchLinkMutation>;
export type UpdateResearchLinkMutationOptions = Apollo.BaseMutationOptions<Types.UpdateResearchLinkMutation, Types.UpdateResearchLinkMutationVariables>;
export const DcUpdateRubricHeadingDocument = gql`
    mutation DcUpdateRubricHeading($input: UpdateRubricHeadingMutationInput!) {
  updateRubricHeading(input: $input) {
    rubricHeading {
      id
      multiplier
      name
      tags {
        id
      }
    }
  }
}
    `;
export type DcUpdateRubricHeadingMutationFn = Apollo.MutationFunction<Types.DcUpdateRubricHeadingMutation, Types.DcUpdateRubricHeadingMutationVariables>;

/**
 * __useDcUpdateRubricHeadingMutation__
 *
 * To run a mutation, you first call `useDcUpdateRubricHeadingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDcUpdateRubricHeadingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dcUpdateRubricHeadingMutation, { data, loading, error }] = useDcUpdateRubricHeadingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDcUpdateRubricHeadingMutation(baseOptions?: Apollo.MutationHookOptions<Types.DcUpdateRubricHeadingMutation, Types.DcUpdateRubricHeadingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DcUpdateRubricHeadingMutation, Types.DcUpdateRubricHeadingMutationVariables>(DcUpdateRubricHeadingDocument, options);
      }
export type DcUpdateRubricHeadingMutationHookResult = ReturnType<typeof useDcUpdateRubricHeadingMutation>;
export type DcUpdateRubricHeadingMutationResult = Apollo.MutationResult<Types.DcUpdateRubricHeadingMutation>;
export type DcUpdateRubricHeadingMutationOptions = Apollo.BaseMutationOptions<Types.DcUpdateRubricHeadingMutation, Types.DcUpdateRubricHeadingMutationVariables>;
export const UpdateSchoolClassSettingsDocument = gql`
    mutation UpdateSchoolClassSettings($input: UpdateSchoolClassSettingsMutationInput!) {
  updateSchoolClassSettings(input: $input) {
    schoolClass {
      settings {
        assessmentType
      }
      students {
        nodes {
          settings {
            assessmentType {
              origin
              value
            }
          }
          uuid
        }
      }
      uuid
    }
  }
}
    `;
export type UpdateSchoolClassSettingsMutationFn = Apollo.MutationFunction<Types.UpdateSchoolClassSettingsMutation, Types.UpdateSchoolClassSettingsMutationVariables>;

/**
 * __useUpdateSchoolClassSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateSchoolClassSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSchoolClassSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSchoolClassSettingsMutation, { data, loading, error }] = useUpdateSchoolClassSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSchoolClassSettingsMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateSchoolClassSettingsMutation, Types.UpdateSchoolClassSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateSchoolClassSettingsMutation, Types.UpdateSchoolClassSettingsMutationVariables>(UpdateSchoolClassSettingsDocument, options);
      }
export type UpdateSchoolClassSettingsMutationHookResult = ReturnType<typeof useUpdateSchoolClassSettingsMutation>;
export type UpdateSchoolClassSettingsMutationResult = Apollo.MutationResult<Types.UpdateSchoolClassSettingsMutation>;
export type UpdateSchoolClassSettingsMutationOptions = Apollo.BaseMutationOptions<Types.UpdateSchoolClassSettingsMutation, Types.UpdateSchoolClassSettingsMutationVariables>;
export const UpdateSlideDocument = gql`
    mutation UpdateSlide($input: UpdateSlideMutationInput!) {
  updateSlide(input: $input) {
    slide {
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
          videoUrl
        }
      }
      description
      id
      iframeUrl
      isShared
      name
      notes
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
            thumbnailUrl
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
            videoUrl
          }
        }
        description
        id
        iframeUrl
        isShared
        name
        notes
        step
        template
      }
      template
      checkInQuestions {
        id
        question
        step
      }
      checkInGroups {
        displayName
        id
        name
        step
      }
      products {
        id
        description
        displayName
        id
        name
      }
    }
  }
}
    `;
export type UpdateSlideMutationFn = Apollo.MutationFunction<Types.UpdateSlideMutation, Types.UpdateSlideMutationVariables>;

/**
 * __useUpdateSlideMutation__
 *
 * To run a mutation, you first call `useUpdateSlideMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSlideMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSlideMutation, { data, loading, error }] = useUpdateSlideMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSlideMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateSlideMutation, Types.UpdateSlideMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateSlideMutation, Types.UpdateSlideMutationVariables>(UpdateSlideDocument, options);
      }
export type UpdateSlideMutationHookResult = ReturnType<typeof useUpdateSlideMutation>;
export type UpdateSlideMutationResult = Apollo.MutationResult<Types.UpdateSlideMutation>;
export type UpdateSlideMutationOptions = Apollo.BaseMutationOptions<Types.UpdateSlideMutation, Types.UpdateSlideMutationVariables>;
export const UpdateSlideImageDocument = gql`
    mutation UpdateSlideImage($input: UpdateSlideImageMutationInput!) {
  updateSlideImage(input: $input) {
    slideImage {
      id
      style
      url
      contentId
      position
    }
  }
}
    `;
export type UpdateSlideImageMutationFn = Apollo.MutationFunction<Types.UpdateSlideImageMutation, Types.UpdateSlideImageMutationVariables>;

/**
 * __useUpdateSlideImageMutation__
 *
 * To run a mutation, you first call `useUpdateSlideImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSlideImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSlideImageMutation, { data, loading, error }] = useUpdateSlideImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSlideImageMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateSlideImageMutation, Types.UpdateSlideImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateSlideImageMutation, Types.UpdateSlideImageMutationVariables>(UpdateSlideImageDocument, options);
      }
export type UpdateSlideImageMutationHookResult = ReturnType<typeof useUpdateSlideImageMutation>;
export type UpdateSlideImageMutationResult = Apollo.MutationResult<Types.UpdateSlideImageMutation>;
export type UpdateSlideImageMutationOptions = Apollo.BaseMutationOptions<Types.UpdateSlideImageMutation, Types.UpdateSlideImageMutationVariables>;
export const UpdateSlideVideoDocument = gql`
    mutation UpdateSlideVideo($input: UpdateSlideVideoMutationInput!) {
  updateSlideVideo(input: $input) {
    slideVideo {
      id
      videoUrl
      url
      contentId
    }
  }
}
    `;
export type UpdateSlideVideoMutationFn = Apollo.MutationFunction<Types.UpdateSlideVideoMutation, Types.UpdateSlideVideoMutationVariables>;

/**
 * __useUpdateSlideVideoMutation__
 *
 * To run a mutation, you first call `useUpdateSlideVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSlideVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSlideVideoMutation, { data, loading, error }] = useUpdateSlideVideoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSlideVideoMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateSlideVideoMutation, Types.UpdateSlideVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateSlideVideoMutation, Types.UpdateSlideVideoMutationVariables>(UpdateSlideVideoDocument, options);
      }
export type UpdateSlideVideoMutationHookResult = ReturnType<typeof useUpdateSlideVideoMutation>;
export type UpdateSlideVideoMutationResult = Apollo.MutationResult<Types.UpdateSlideVideoMutation>;
export type UpdateSlideVideoMutationOptions = Apollo.BaseMutationOptions<Types.UpdateSlideVideoMutation, Types.UpdateSlideVideoMutationVariables>;
export const UpdateStandardSetDocument = gql`
    mutation UpdateStandardSet($input: UpdateStandardSetMutationInput!) {
  updateStandardSet(input: $input) {
    standardSet {
      displayName
      id
    }
  }
}
    `;
export type UpdateStandardSetMutationFn = Apollo.MutationFunction<Types.UpdateStandardSetMutation, Types.UpdateStandardSetMutationVariables>;

/**
 * __useUpdateStandardSetMutation__
 *
 * To run a mutation, you first call `useUpdateStandardSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStandardSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStandardSetMutation, { data, loading, error }] = useUpdateStandardSetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStandardSetMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateStandardSetMutation, Types.UpdateStandardSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateStandardSetMutation, Types.UpdateStandardSetMutationVariables>(UpdateStandardSetDocument, options);
      }
export type UpdateStandardSetMutationHookResult = ReturnType<typeof useUpdateStandardSetMutation>;
export type UpdateStandardSetMutationResult = Apollo.MutationResult<Types.UpdateStandardSetMutation>;
export type UpdateStandardSetMutationOptions = Apollo.BaseMutationOptions<Types.UpdateStandardSetMutation, Types.UpdateStandardSetMutationVariables>;
export const UpdateStudentSettingsDocument = gql`
    mutation UpdateStudentSettings($input: UpdateStudentSettingsMutationInput!) {
  updateStudentSettings(input: $input) {
    student {
      firstName
      lastName
      settings {
        assessmentEnabled {
          origin
          value
        }
        assessmentType {
          origin
          value
        }
        onboardingEnabled {
          origin
          value
        }
        selfEvaluationEnabled {
          origin
          value
        }
      }
      uuid
    }
  }
}
    `;
export type UpdateStudentSettingsMutationFn = Apollo.MutationFunction<Types.UpdateStudentSettingsMutation, Types.UpdateStudentSettingsMutationVariables>;

/**
 * __useUpdateStudentSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateStudentSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStudentSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStudentSettingsMutation, { data, loading, error }] = useUpdateStudentSettingsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStudentSettingsMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateStudentSettingsMutation, Types.UpdateStudentSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateStudentSettingsMutation, Types.UpdateStudentSettingsMutationVariables>(UpdateStudentSettingsDocument, options);
      }
export type UpdateStudentSettingsMutationHookResult = ReturnType<typeof useUpdateStudentSettingsMutation>;
export type UpdateStudentSettingsMutationResult = Apollo.MutationResult<Types.UpdateStudentSettingsMutation>;
export type UpdateStudentSettingsMutationOptions = Apollo.BaseMutationOptions<Types.UpdateStudentSettingsMutation, Types.UpdateStudentSettingsMutationVariables>;
export const UpdateTagDocument = gql`
    mutation UpdateTag($input: UpdateTagMutationInput!) {
  updateTag(input: $input) {
    tag {
      hasRubricHeadings
      id
      name
      rubricHeadings {
        nodes {
          id
          name
          multiplier
        }
      }
      type
    }
  }
}
    `;
export type UpdateTagMutationFn = Apollo.MutationFunction<Types.UpdateTagMutation, Types.UpdateTagMutationVariables>;

/**
 * __useUpdateTagMutation__
 *
 * To run a mutation, you first call `useUpdateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTagMutation, { data, loading, error }] = useUpdateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTagMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateTagMutation, Types.UpdateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateTagMutation, Types.UpdateTagMutationVariables>(UpdateTagDocument, options);
      }
export type UpdateTagMutationHookResult = ReturnType<typeof useUpdateTagMutation>;
export type UpdateTagMutationResult = Apollo.MutationResult<Types.UpdateTagMutation>;
export type UpdateTagMutationOptions = Apollo.BaseMutationOptions<Types.UpdateTagMutation, Types.UpdateTagMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($input: UpdateTaskMutationInput!) {
  updateTask(input: $input) {
    task {
      id
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
export const UpdateTaskFileDocument = gql`
    mutation UpdateTaskFile($input: UpdateTaskFileMutationInput!) {
  updateTaskFile(input: $input) {
    taskFile {
      description
      displayName
      filename
      id
      step
      task {
        id
      }
      url
    }
  }
}
    `;
export type UpdateTaskFileMutationFn = Apollo.MutationFunction<Types.UpdateTaskFileMutation, Types.UpdateTaskFileMutationVariables>;

/**
 * __useUpdateTaskFileMutation__
 *
 * To run a mutation, you first call `useUpdateTaskFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskFileMutation, { data, loading, error }] = useUpdateTaskFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaskFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateTaskFileMutation, Types.UpdateTaskFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateTaskFileMutation, Types.UpdateTaskFileMutationVariables>(UpdateTaskFileDocument, options);
      }
export type UpdateTaskFileMutationHookResult = ReturnType<typeof useUpdateTaskFileMutation>;
export type UpdateTaskFileMutationResult = Apollo.MutationResult<Types.UpdateTaskFileMutation>;
export type UpdateTaskFileMutationOptions = Apollo.BaseMutationOptions<Types.UpdateTaskFileMutation, Types.UpdateTaskFileMutationVariables>;
export const UpdateTextDocument = gql`
    mutation UpdateText($input: UpdateTextMutationInput!) {
  updateText(input: $input) {
    text {
      content
      displayName
      id
      name
    }
  }
}
    `;
export type UpdateTextMutationFn = Apollo.MutationFunction<Types.UpdateTextMutation, Types.UpdateTextMutationVariables>;

/**
 * __useUpdateTextMutation__
 *
 * To run a mutation, you first call `useUpdateTextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTextMutation, { data, loading, error }] = useUpdateTextMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTextMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateTextMutation, Types.UpdateTextMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateTextMutation, Types.UpdateTextMutationVariables>(UpdateTextDocument, options);
      }
export type UpdateTextMutationHookResult = ReturnType<typeof useUpdateTextMutation>;
export type UpdateTextMutationResult = Apollo.MutationResult<Types.UpdateTextMutation>;
export type UpdateTextMutationOptions = Apollo.BaseMutationOptions<Types.UpdateTextMutation, Types.UpdateTextMutationVariables>;
export const UpdateTrackDocument = gql`
    mutation UpdateTrack($input: UpdateTrackMutationInput!) {
  updateTrack(input: $input) {
    track {
      id
    }
  }
}
    `;
export type UpdateTrackMutationFn = Apollo.MutationFunction<Types.UpdateTrackMutation, Types.UpdateTrackMutationVariables>;

/**
 * __useUpdateTrackMutation__
 *
 * To run a mutation, you first call `useUpdateTrackMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTrackMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTrackMutation, { data, loading, error }] = useUpdateTrackMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTrackMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateTrackMutation, Types.UpdateTrackMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateTrackMutation, Types.UpdateTrackMutationVariables>(UpdateTrackDocument, options);
      }
export type UpdateTrackMutationHookResult = ReturnType<typeof useUpdateTrackMutation>;
export type UpdateTrackMutationResult = Apollo.MutationResult<Types.UpdateTrackMutation>;
export type UpdateTrackMutationOptions = Apollo.BaseMutationOptions<Types.UpdateTrackMutation, Types.UpdateTrackMutationVariables>;
export const UpdateUnitDocument = gql`
    mutation UpdateUnit($input: UpdateUnitMutationInput!) {
  updateUnit(input: $input) {
    unit {
      archivedAt
      description
      displayName
      id
      imageUrl
      name
    }
  }
}
    `;
export type UpdateUnitMutationFn = Apollo.MutationFunction<Types.UpdateUnitMutation, Types.UpdateUnitMutationVariables>;

/**
 * __useUpdateUnitMutation__
 *
 * To run a mutation, you first call `useUpdateUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUnitMutation, { data, loading, error }] = useUpdateUnitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUnitMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateUnitMutation, Types.UpdateUnitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateUnitMutation, Types.UpdateUnitMutationVariables>(UpdateUnitDocument, options);
      }
export type UpdateUnitMutationHookResult = ReturnType<typeof useUpdateUnitMutation>;
export type UpdateUnitMutationResult = Apollo.MutationResult<Types.UpdateUnitMutation>;
export type UpdateUnitMutationOptions = Apollo.BaseMutationOptions<Types.UpdateUnitMutation, Types.UpdateUnitMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserMutationInput!) {
  updateUser(input: $input) {
    user {
      uuid
      role
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<Types.UpdateUserMutation, Types.UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateUserMutation, Types.UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateUserMutation, Types.UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<Types.UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<Types.UpdateUserMutation, Types.UpdateUserMutationVariables>;
export const UpdateVideoDocument = gql`
    mutation UpdateVideo($input: UpdateVideoMutationInput!) {
  updateVideo(input: $input) {
    video {
      description
      displayName
      filename
      name
      id
      url
    }
  }
}
    `;
export type UpdateVideoMutationFn = Apollo.MutationFunction<Types.UpdateVideoMutation, Types.UpdateVideoMutationVariables>;

/**
 * __useUpdateVideoMutation__
 *
 * To run a mutation, you first call `useUpdateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVideoMutation, { data, loading, error }] = useUpdateVideoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateVideoMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateVideoMutation, Types.UpdateVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateVideoMutation, Types.UpdateVideoMutationVariables>(UpdateVideoDocument, options);
      }
export type UpdateVideoMutationHookResult = ReturnType<typeof useUpdateVideoMutation>;
export type UpdateVideoMutationResult = Apollo.MutationResult<Types.UpdateVideoMutation>;
export type UpdateVideoMutationOptions = Apollo.BaseMutationOptions<Types.UpdateVideoMutation, Types.UpdateVideoMutationVariables>;
export const UpdateVirtualInternshipDocument = gql`
    mutation UpdateVirtualInternship($input: UpdateVirtualInternshipMutationInput!) {
  updateVirtualInternship(input: $input) {
    virtualInternship {
      archivedAt
      status
      id
      opportunity {
        id
        name
        availableSpots
        creditsOutcomes
        description
        imageUrl
        opportunityType
        pathways {
          id
          name
        }
        tags
      }
      requiredExperiences
    }
  }
}
    `;
export type UpdateVirtualInternshipMutationFn = Apollo.MutationFunction<Types.UpdateVirtualInternshipMutation, Types.UpdateVirtualInternshipMutationVariables>;

/**
 * __useUpdateVirtualInternshipMutation__
 *
 * To run a mutation, you first call `useUpdateVirtualInternshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVirtualInternshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVirtualInternshipMutation, { data, loading, error }] = useUpdateVirtualInternshipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateVirtualInternshipMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateVirtualInternshipMutation, Types.UpdateVirtualInternshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateVirtualInternshipMutation, Types.UpdateVirtualInternshipMutationVariables>(UpdateVirtualInternshipDocument, options);
      }
export type UpdateVirtualInternshipMutationHookResult = ReturnType<typeof useUpdateVirtualInternshipMutation>;
export type UpdateVirtualInternshipMutationResult = Apollo.MutationResult<Types.UpdateVirtualInternshipMutation>;
export type UpdateVirtualInternshipMutationOptions = Apollo.BaseMutationOptions<Types.UpdateVirtualInternshipMutation, Types.UpdateVirtualInternshipMutationVariables>;
export const UpdateVocabularyDocument = gql`
    mutation UpdateVocabulary($input: UpdateVocabularyMutationInput!) {
  updateVocabulary(input: $input) {
    vocabulary {
      definition
      id
      term
    }
  }
}
    `;
export type UpdateVocabularyMutationFn = Apollo.MutationFunction<Types.UpdateVocabularyMutation, Types.UpdateVocabularyMutationVariables>;

/**
 * __useUpdateVocabularyMutation__
 *
 * To run a mutation, you first call `useUpdateVocabularyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVocabularyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVocabularyMutation, { data, loading, error }] = useUpdateVocabularyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateVocabularyMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateVocabularyMutation, Types.UpdateVocabularyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateVocabularyMutation, Types.UpdateVocabularyMutationVariables>(UpdateVocabularyDocument, options);
      }
export type UpdateVocabularyMutationHookResult = ReturnType<typeof useUpdateVocabularyMutation>;
export type UpdateVocabularyMutationResult = Apollo.MutationResult<Types.UpdateVocabularyMutation>;
export type UpdateVocabularyMutationOptions = Apollo.BaseMutationOptions<Types.UpdateVocabularyMutation, Types.UpdateVocabularyMutationVariables>;
export const PartnerDocument = gql`
    query Partner($id: ID!) {
  partner(id: $id) {
    name
    about
    additionalUrls
    address
    coursesCount
    details
    email
    entities {
      dcIconUrl
      dcLogoUrl
      dlIconUrl
      dlLogoUrl
      gradingNeeded
      hasCareersContract
      hasPblContract
      name
      regionName
      reportTypes
      uuid
    }
    courses {
      id
      name
      thumbnailUrl
      collection {
        id
        name
      }
      pathway {
        id
        name
        description
        imageUrl
        thumbnailUrl
      }
    }
    opportunities {
      id
      name
      imageUrl
      thumbnailUrl
      name
      opportunityType
      visibilityScope
      entities {
        name
        uuid
      }
      pathways {
        name
      }
    }
    id
    imageUrl
    imageFitToContainer
    isArchived
    opportunitiesCount
    pathways {
      description
      id
      imageUrl
      name
      thumbnailUrl
    }
    phone
    status
    thumbnailUrl
    url
    virtualInternshipsCount
    visibilityScope
    documents {
      createdAt
      filename
      id
      submitter {
        uuid
        firstName
        lastName
      }
      url(options: {responseContentDisposition: "attachment"})
      previewUrl: url
    }
  }
}
    `;

/**
 * __usePartnerQuery__
 *
 * To run a query within a React component, call `usePartnerQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartnerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePartnerQuery(baseOptions: Apollo.QueryHookOptions<Types.PartnerQuery, Types.PartnerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PartnerQuery, Types.PartnerQueryVariables>(PartnerDocument, options);
      }
export function usePartnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PartnerQuery, Types.PartnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PartnerQuery, Types.PartnerQueryVariables>(PartnerDocument, options);
        }
export function usePartnerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PartnerQuery, Types.PartnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PartnerQuery, Types.PartnerQueryVariables>(PartnerDocument, options);
        }
export type PartnerQueryHookResult = ReturnType<typeof usePartnerQuery>;
export type PartnerLazyQueryHookResult = ReturnType<typeof usePartnerLazyQuery>;
export type PartnerSuspenseQueryHookResult = ReturnType<typeof usePartnerSuspenseQuery>;
export type PartnerQueryResult = Apollo.QueryResult<Types.PartnerQuery, Types.PartnerQueryVariables>;
export const AdminClusterEnrollmentStatsDocument = gql`
    query AdminClusterEnrollmentStats($uuid: ID!, $startYear: Int!) {
  adminDashboard {
    entity(uuid: $uuid) {
      clusterEnrollmentStats(startYear: $startYear) {
        cluster {
          id
          name
        }
        studentsCount
      }
      uuid
    }
    userId
  }
}
    `;

/**
 * __useAdminClusterEnrollmentStatsQuery__
 *
 * To run a query within a React component, call `useAdminClusterEnrollmentStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminClusterEnrollmentStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminClusterEnrollmentStatsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      startYear: // value for 'startYear'
 *   },
 * });
 */
export function useAdminClusterEnrollmentStatsQuery(baseOptions: Apollo.QueryHookOptions<Types.AdminClusterEnrollmentStatsQuery, Types.AdminClusterEnrollmentStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AdminClusterEnrollmentStatsQuery, Types.AdminClusterEnrollmentStatsQueryVariables>(AdminClusterEnrollmentStatsDocument, options);
      }
export function useAdminClusterEnrollmentStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AdminClusterEnrollmentStatsQuery, Types.AdminClusterEnrollmentStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AdminClusterEnrollmentStatsQuery, Types.AdminClusterEnrollmentStatsQueryVariables>(AdminClusterEnrollmentStatsDocument, options);
        }
export function useAdminClusterEnrollmentStatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AdminClusterEnrollmentStatsQuery, Types.AdminClusterEnrollmentStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AdminClusterEnrollmentStatsQuery, Types.AdminClusterEnrollmentStatsQueryVariables>(AdminClusterEnrollmentStatsDocument, options);
        }
export type AdminClusterEnrollmentStatsQueryHookResult = ReturnType<typeof useAdminClusterEnrollmentStatsQuery>;
export type AdminClusterEnrollmentStatsLazyQueryHookResult = ReturnType<typeof useAdminClusterEnrollmentStatsLazyQuery>;
export type AdminClusterEnrollmentStatsSuspenseQueryHookResult = ReturnType<typeof useAdminClusterEnrollmentStatsSuspenseQuery>;
export type AdminClusterEnrollmentStatsQueryResult = Apollo.QueryResult<Types.AdminClusterEnrollmentStatsQuery, Types.AdminClusterEnrollmentStatsQueryVariables>;
export const AdminDashboardMyReportsDocument = gql`
    query AdminDashboardMyReports($uuid: ID!, $startYear: Int!) {
  adminDashboard {
    entity(uuid: $uuid) {
      myReports {
        assessmentsFinished(startYear: $startYear)
        assignmentsSubmitted(startYear: $startYear)
        coursesEnrolled(startYear: $startYear)
        coursesFinished(startYear: $startYear)
      }
      uuid
    }
    userId
  }
}
    `;

/**
 * __useAdminDashboardMyReportsQuery__
 *
 * To run a query within a React component, call `useAdminDashboardMyReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminDashboardMyReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminDashboardMyReportsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      startYear: // value for 'startYear'
 *   },
 * });
 */
export function useAdminDashboardMyReportsQuery(baseOptions: Apollo.QueryHookOptions<Types.AdminDashboardMyReportsQuery, Types.AdminDashboardMyReportsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AdminDashboardMyReportsQuery, Types.AdminDashboardMyReportsQueryVariables>(AdminDashboardMyReportsDocument, options);
      }
export function useAdminDashboardMyReportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AdminDashboardMyReportsQuery, Types.AdminDashboardMyReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AdminDashboardMyReportsQuery, Types.AdminDashboardMyReportsQueryVariables>(AdminDashboardMyReportsDocument, options);
        }
export function useAdminDashboardMyReportsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AdminDashboardMyReportsQuery, Types.AdminDashboardMyReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AdminDashboardMyReportsQuery, Types.AdminDashboardMyReportsQueryVariables>(AdminDashboardMyReportsDocument, options);
        }
export type AdminDashboardMyReportsQueryHookResult = ReturnType<typeof useAdminDashboardMyReportsQuery>;
export type AdminDashboardMyReportsLazyQueryHookResult = ReturnType<typeof useAdminDashboardMyReportsLazyQuery>;
export type AdminDashboardMyReportsSuspenseQueryHookResult = ReturnType<typeof useAdminDashboardMyReportsSuspenseQuery>;
export type AdminDashboardMyReportsQueryResult = Apollo.QueryResult<Types.AdminDashboardMyReportsQuery, Types.AdminDashboardMyReportsQueryVariables>;
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
          settings {
            assessmentType
          }
          uuid
        }
        pagesCount
      }
      uuid
    }
    userId
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
export const AdminEntityHasChildrenDocument = gql`
    query AdminEntityHasChildren($uuid: ID!) {
  adminDashboard {
    entity(uuid: $uuid) {
      hasChildren
      uuid
    }
    userId
  }
}
    `;

/**
 * __useAdminEntityHasChildrenQuery__
 *
 * To run a query within a React component, call `useAdminEntityHasChildrenQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminEntityHasChildrenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminEntityHasChildrenQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useAdminEntityHasChildrenQuery(baseOptions: Apollo.QueryHookOptions<Types.AdminEntityHasChildrenQuery, Types.AdminEntityHasChildrenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AdminEntityHasChildrenQuery, Types.AdminEntityHasChildrenQueryVariables>(AdminEntityHasChildrenDocument, options);
      }
export function useAdminEntityHasChildrenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AdminEntityHasChildrenQuery, Types.AdminEntityHasChildrenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AdminEntityHasChildrenQuery, Types.AdminEntityHasChildrenQueryVariables>(AdminEntityHasChildrenDocument, options);
        }
export function useAdminEntityHasChildrenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AdminEntityHasChildrenQuery, Types.AdminEntityHasChildrenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AdminEntityHasChildrenQuery, Types.AdminEntityHasChildrenQueryVariables>(AdminEntityHasChildrenDocument, options);
        }
export type AdminEntityHasChildrenQueryHookResult = ReturnType<typeof useAdminEntityHasChildrenQuery>;
export type AdminEntityHasChildrenLazyQueryHookResult = ReturnType<typeof useAdminEntityHasChildrenLazyQuery>;
export type AdminEntityHasChildrenSuspenseQueryHookResult = ReturnType<typeof useAdminEntityHasChildrenSuspenseQuery>;
export type AdminEntityHasChildrenQueryResult = Apollo.QueryResult<Types.AdminEntityHasChildrenQuery, Types.AdminEntityHasChildrenQueryVariables>;
export const DcAdminEntityInfoDocument = gql`
    query DcAdminEntityInfo($uuid: ID!) {
  adminDashboard {
    entity(uuid: $uuid) {
      catalogs {
        id
        name
      }
      extensionFields {
        id
        name
      }
      hasChildren
      hierarchyMetrics {
        entitiesCount
        schoolClassesCount
        studentsCount
        teachersCount
      }
      name
      plans {
        id
        name
      }
      settings {
        assessmentEnabled
        assessmentType
        onboardingEnabled
        selfEvaluationEnabled
        schoolYearStartDate {
          day
          month
        }
      }
      standardSets {
        id
        name
      }
      uuid
    }
    userId
  }
}
    `;

/**
 * __useDcAdminEntityInfoQuery__
 *
 * To run a query within a React component, call `useDcAdminEntityInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useDcAdminEntityInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDcAdminEntityInfoQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDcAdminEntityInfoQuery(baseOptions: Apollo.QueryHookOptions<Types.DcAdminEntityInfoQuery, Types.DcAdminEntityInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DcAdminEntityInfoQuery, Types.DcAdminEntityInfoQueryVariables>(DcAdminEntityInfoDocument, options);
      }
export function useDcAdminEntityInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DcAdminEntityInfoQuery, Types.DcAdminEntityInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DcAdminEntityInfoQuery, Types.DcAdminEntityInfoQueryVariables>(DcAdminEntityInfoDocument, options);
        }
export function useDcAdminEntityInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DcAdminEntityInfoQuery, Types.DcAdminEntityInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DcAdminEntityInfoQuery, Types.DcAdminEntityInfoQueryVariables>(DcAdminEntityInfoDocument, options);
        }
export type DcAdminEntityInfoQueryHookResult = ReturnType<typeof useDcAdminEntityInfoQuery>;
export type DcAdminEntityInfoLazyQueryHookResult = ReturnType<typeof useDcAdminEntityInfoLazyQuery>;
export type DcAdminEntityInfoSuspenseQueryHookResult = ReturnType<typeof useDcAdminEntityInfoSuspenseQuery>;
export type DcAdminEntityInfoQueryResult = Apollo.QueryResult<Types.DcAdminEntityInfoQuery, Types.DcAdminEntityInfoQueryVariables>;
export const AdminPathwayEnrollmentStatsDocument = gql`
    query AdminPathwayEnrollmentStats($uuid: ID!, $startYear: Int!) {
  adminDashboard {
    entity(uuid: $uuid) {
      pathwayEnrollmentStats(startYear: $startYear) {
        pathway {
          id
          name
        }
        studentsCount
      }
      uuid
    }
    userId
  }
}
    `;

/**
 * __useAdminPathwayEnrollmentStatsQuery__
 *
 * To run a query within a React component, call `useAdminPathwayEnrollmentStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminPathwayEnrollmentStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminPathwayEnrollmentStatsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      startYear: // value for 'startYear'
 *   },
 * });
 */
export function useAdminPathwayEnrollmentStatsQuery(baseOptions: Apollo.QueryHookOptions<Types.AdminPathwayEnrollmentStatsQuery, Types.AdminPathwayEnrollmentStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AdminPathwayEnrollmentStatsQuery, Types.AdminPathwayEnrollmentStatsQueryVariables>(AdminPathwayEnrollmentStatsDocument, options);
      }
export function useAdminPathwayEnrollmentStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AdminPathwayEnrollmentStatsQuery, Types.AdminPathwayEnrollmentStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AdminPathwayEnrollmentStatsQuery, Types.AdminPathwayEnrollmentStatsQueryVariables>(AdminPathwayEnrollmentStatsDocument, options);
        }
export function useAdminPathwayEnrollmentStatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AdminPathwayEnrollmentStatsQuery, Types.AdminPathwayEnrollmentStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AdminPathwayEnrollmentStatsQuery, Types.AdminPathwayEnrollmentStatsQueryVariables>(AdminPathwayEnrollmentStatsDocument, options);
        }
export type AdminPathwayEnrollmentStatsQueryHookResult = ReturnType<typeof useAdminPathwayEnrollmentStatsQuery>;
export type AdminPathwayEnrollmentStatsLazyQueryHookResult = ReturnType<typeof useAdminPathwayEnrollmentStatsLazyQuery>;
export type AdminPathwayEnrollmentStatsSuspenseQueryHookResult = ReturnType<typeof useAdminPathwayEnrollmentStatsSuspenseQuery>;
export type AdminPathwayEnrollmentStatsQueryResult = Apollo.QueryResult<Types.AdminPathwayEnrollmentStatsQuery, Types.AdminPathwayEnrollmentStatsQueryVariables>;
export const AdminUsernameDocument = gql`
    query AdminUsername($uuid: ID!) {
  user(uuid: $uuid) {
    firstName
    lastName
    uuid
  }
}
    `;

/**
 * __useAdminUsernameQuery__
 *
 * To run a query within a React component, call `useAdminUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminUsernameQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useAdminUsernameQuery(baseOptions: Apollo.QueryHookOptions<Types.AdminUsernameQuery, Types.AdminUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AdminUsernameQuery, Types.AdminUsernameQueryVariables>(AdminUsernameDocument, options);
      }
export function useAdminUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AdminUsernameQuery, Types.AdminUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AdminUsernameQuery, Types.AdminUsernameQueryVariables>(AdminUsernameDocument, options);
        }
export function useAdminUsernameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AdminUsernameQuery, Types.AdminUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AdminUsernameQuery, Types.AdminUsernameQueryVariables>(AdminUsernameDocument, options);
        }
export type AdminUsernameQueryHookResult = ReturnType<typeof useAdminUsernameQuery>;
export type AdminUsernameLazyQueryHookResult = ReturnType<typeof useAdminUsernameLazyQuery>;
export type AdminUsernameSuspenseQueryHookResult = ReturnType<typeof useAdminUsernameSuspenseQuery>;
export type AdminUsernameQueryResult = Apollo.QueryResult<Types.AdminUsernameQuery, Types.AdminUsernameQueryVariables>;
export const AdminUsersDocument = gql`
    query AdminUsers($uuid: ID!, $page: Int, $perPage: Int, $filter: UserFilter) {
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
    userId
  }
}
    `;

/**
 * __useAdminUsersQuery__
 *
 * To run a query within a React component, call `useAdminUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminUsersQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAdminUsersQuery(baseOptions: Apollo.QueryHookOptions<Types.AdminUsersQuery, Types.AdminUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AdminUsersQuery, Types.AdminUsersQueryVariables>(AdminUsersDocument, options);
      }
export function useAdminUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AdminUsersQuery, Types.AdminUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AdminUsersQuery, Types.AdminUsersQueryVariables>(AdminUsersDocument, options);
        }
export function useAdminUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AdminUsersQuery, Types.AdminUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AdminUsersQuery, Types.AdminUsersQueryVariables>(AdminUsersDocument, options);
        }
export type AdminUsersQueryHookResult = ReturnType<typeof useAdminUsersQuery>;
export type AdminUsersLazyQueryHookResult = ReturnType<typeof useAdminUsersLazyQuery>;
export type AdminUsersSuspenseQueryHookResult = ReturnType<typeof useAdminUsersSuspenseQuery>;
export type AdminUsersQueryResult = Apollo.QueryResult<Types.AdminUsersQuery, Types.AdminUsersQueryVariables>;
export const AdminVirtualInternshipDocument = gql`
    query AdminVirtualInternship($id: ID!) {
  virtualInternship(id: $id) {
    archivedAt
    id
    badges {
      id
      name
      imageUrl
    }
    opportunity {
      id
      name
      availableSpots
      creditsOutcomes
      description
      imageUrl
      opportunityType
      pathways {
        id
        name
      }
      salaryInformation
      tags
    }
    requiredExperiences
    status
    calendarLessons {
      id
      step
      name
      imageUrl
      thumbnailUrl
      type
    }
    experienceOpportunityLessons {
      id
      step
      name
      imageUrl
      thumbnailUrl
      type
    }
    postExperienceLessons {
      id
      step
      name
      imageUrl
      thumbnailUrl
      type
    }
    readinessSkillsLessons {
      id
      step
      name
      imageUrl
      thumbnailUrl
      type
    }
  }
}
    `;

/**
 * __useAdminVirtualInternshipQuery__
 *
 * To run a query within a React component, call `useAdminVirtualInternshipQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminVirtualInternshipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminVirtualInternshipQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminVirtualInternshipQuery(baseOptions: Apollo.QueryHookOptions<Types.AdminVirtualInternshipQuery, Types.AdminVirtualInternshipQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AdminVirtualInternshipQuery, Types.AdminVirtualInternshipQueryVariables>(AdminVirtualInternshipDocument, options);
      }
export function useAdminVirtualInternshipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AdminVirtualInternshipQuery, Types.AdminVirtualInternshipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AdminVirtualInternshipQuery, Types.AdminVirtualInternshipQueryVariables>(AdminVirtualInternshipDocument, options);
        }
export function useAdminVirtualInternshipSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AdminVirtualInternshipQuery, Types.AdminVirtualInternshipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AdminVirtualInternshipQuery, Types.AdminVirtualInternshipQueryVariables>(AdminVirtualInternshipDocument, options);
        }
export type AdminVirtualInternshipQueryHookResult = ReturnType<typeof useAdminVirtualInternshipQuery>;
export type AdminVirtualInternshipLazyQueryHookResult = ReturnType<typeof useAdminVirtualInternshipLazyQuery>;
export type AdminVirtualInternshipSuspenseQueryHookResult = ReturnType<typeof useAdminVirtualInternshipSuspenseQuery>;
export type AdminVirtualInternshipQueryResult = Apollo.QueryResult<Types.AdminVirtualInternshipQuery, Types.AdminVirtualInternshipQueryVariables>;
export const AssessmentReportDocument = gql`
    query AssessmentReport($id: ID!) {
  assessmentReport(id: $id) {
    id
    uploadStatus
    url(options: {responseContentDisposition: "attachment"})
  }
}
    `;

/**
 * __useAssessmentReportQuery__
 *
 * To run a query within a React component, call `useAssessmentReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssessmentReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssessmentReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAssessmentReportQuery(baseOptions: Apollo.QueryHookOptions<Types.AssessmentReportQuery, Types.AssessmentReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AssessmentReportQuery, Types.AssessmentReportQueryVariables>(AssessmentReportDocument, options);
      }
export function useAssessmentReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AssessmentReportQuery, Types.AssessmentReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AssessmentReportQuery, Types.AssessmentReportQueryVariables>(AssessmentReportDocument, options);
        }
export function useAssessmentReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AssessmentReportQuery, Types.AssessmentReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AssessmentReportQuery, Types.AssessmentReportQueryVariables>(AssessmentReportDocument, options);
        }
export type AssessmentReportQueryHookResult = ReturnType<typeof useAssessmentReportQuery>;
export type AssessmentReportLazyQueryHookResult = ReturnType<typeof useAssessmentReportLazyQuery>;
export type AssessmentReportSuspenseQueryHookResult = ReturnType<typeof useAssessmentReportSuspenseQuery>;
export type AssessmentReportQueryResult = Apollo.QueryResult<Types.AssessmentReportQuery, Types.AssessmentReportQueryVariables>;
export const AssessmentReportFiltersDocument = gql`
    query AssessmentReportFilters($filters: ReportFiltersFilter, $entityFilter: EntityFilter, $userFilter: UserFilter, $schoolClassFilter: SchoolClassFilter) {
  assessmentReportFilters(filters: $filters) {
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
 * __useAssessmentReportFiltersQuery__
 *
 * To run a query within a React component, call `useAssessmentReportFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssessmentReportFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssessmentReportFiltersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      entityFilter: // value for 'entityFilter'
 *      userFilter: // value for 'userFilter'
 *      schoolClassFilter: // value for 'schoolClassFilter'
 *   },
 * });
 */
export function useAssessmentReportFiltersQuery(baseOptions?: Apollo.QueryHookOptions<Types.AssessmentReportFiltersQuery, Types.AssessmentReportFiltersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AssessmentReportFiltersQuery, Types.AssessmentReportFiltersQueryVariables>(AssessmentReportFiltersDocument, options);
      }
export function useAssessmentReportFiltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AssessmentReportFiltersQuery, Types.AssessmentReportFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AssessmentReportFiltersQuery, Types.AssessmentReportFiltersQueryVariables>(AssessmentReportFiltersDocument, options);
        }
export function useAssessmentReportFiltersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AssessmentReportFiltersQuery, Types.AssessmentReportFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AssessmentReportFiltersQuery, Types.AssessmentReportFiltersQueryVariables>(AssessmentReportFiltersDocument, options);
        }
export type AssessmentReportFiltersQueryHookResult = ReturnType<typeof useAssessmentReportFiltersQuery>;
export type AssessmentReportFiltersLazyQueryHookResult = ReturnType<typeof useAssessmentReportFiltersLazyQuery>;
export type AssessmentReportFiltersSuspenseQueryHookResult = ReturnType<typeof useAssessmentReportFiltersSuspenseQuery>;
export type AssessmentReportFiltersQueryResult = Apollo.QueryResult<Types.AssessmentReportFiltersQuery, Types.AssessmentReportFiltersQueryVariables>;
export const AssignmentDocument = gql`
    query Assignment($id: ID!) {
  assignment(id: $id) {
    archivedAt
    assetName
    badges {
      id
      name
      imageUrl
    }
    description
    displayName
    id
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
  }
}
    `;

/**
 * __useAssignmentQuery__
 *
 * To run a query within a React component, call `useAssignmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAssignmentQuery(baseOptions: Apollo.QueryHookOptions<Types.AssignmentQuery, Types.AssignmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AssignmentQuery, Types.AssignmentQueryVariables>(AssignmentDocument, options);
      }
export function useAssignmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AssignmentQuery, Types.AssignmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AssignmentQuery, Types.AssignmentQueryVariables>(AssignmentDocument, options);
        }
export function useAssignmentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AssignmentQuery, Types.AssignmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AssignmentQuery, Types.AssignmentQueryVariables>(AssignmentDocument, options);
        }
export type AssignmentQueryHookResult = ReturnType<typeof useAssignmentQuery>;
export type AssignmentLazyQueryHookResult = ReturnType<typeof useAssignmentLazyQuery>;
export type AssignmentSuspenseQueryHookResult = ReturnType<typeof useAssignmentSuspenseQuery>;
export type AssignmentQueryResult = Apollo.QueryResult<Types.AssignmentQuery, Types.AssignmentQueryVariables>;
export const AssignmentLessonsDocument = gql`
    query AssignmentLessons($id: ID!) {
  assignment(id: $id) {
    id
    lessons {
      id
      name
    }
  }
}
    `;

/**
 * __useAssignmentLessonsQuery__
 *
 * To run a query within a React component, call `useAssignmentLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentLessonsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAssignmentLessonsQuery(baseOptions: Apollo.QueryHookOptions<Types.AssignmentLessonsQuery, Types.AssignmentLessonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AssignmentLessonsQuery, Types.AssignmentLessonsQueryVariables>(AssignmentLessonsDocument, options);
      }
export function useAssignmentLessonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AssignmentLessonsQuery, Types.AssignmentLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AssignmentLessonsQuery, Types.AssignmentLessonsQueryVariables>(AssignmentLessonsDocument, options);
        }
export function useAssignmentLessonsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AssignmentLessonsQuery, Types.AssignmentLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AssignmentLessonsQuery, Types.AssignmentLessonsQueryVariables>(AssignmentLessonsDocument, options);
        }
export type AssignmentLessonsQueryHookResult = ReturnType<typeof useAssignmentLessonsQuery>;
export type AssignmentLessonsLazyQueryHookResult = ReturnType<typeof useAssignmentLessonsLazyQuery>;
export type AssignmentLessonsSuspenseQueryHookResult = ReturnType<typeof useAssignmentLessonsSuspenseQuery>;
export type AssignmentLessonsQueryResult = Apollo.QueryResult<Types.AssignmentLessonsQuery, Types.AssignmentLessonsQueryVariables>;
export const AssignmentsDocument = gql`
    query Assignments($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: AssignmentFilter) {
  assignments(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      assetName
      name: assetName
      description
      displayName
      id
      rubrics {
        id
        name
        description
      }
    }
  }
}
    `;

/**
 * __useAssignmentsQuery__
 *
 * To run a query within a React component, call `useAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentsQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAssignmentsQuery(baseOptions?: Apollo.QueryHookOptions<Types.AssignmentsQuery, Types.AssignmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AssignmentsQuery, Types.AssignmentsQueryVariables>(AssignmentsDocument, options);
      }
export function useAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AssignmentsQuery, Types.AssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AssignmentsQuery, Types.AssignmentsQueryVariables>(AssignmentsDocument, options);
        }
export function useAssignmentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AssignmentsQuery, Types.AssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AssignmentsQuery, Types.AssignmentsQueryVariables>(AssignmentsDocument, options);
        }
export type AssignmentsQueryHookResult = ReturnType<typeof useAssignmentsQuery>;
export type AssignmentsLazyQueryHookResult = ReturnType<typeof useAssignmentsLazyQuery>;
export type AssignmentsSuspenseQueryHookResult = ReturnType<typeof useAssignmentsSuspenseQuery>;
export type AssignmentsQueryResult = Apollo.QueryResult<Types.AssignmentsQuery, Types.AssignmentsQueryVariables>;
export const AttachmentDocument = gql`
    query Attachment($id: ID!) {
  attachment(id: $id) {
    archivedAt
    description
    displayName
    files {
      id
      filename
      url(options: {responseContentDisposition: "attachment"})
    }
    id
    name
  }
}
    `;

/**
 * __useAttachmentQuery__
 *
 * To run a query within a React component, call `useAttachmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttachmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttachmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAttachmentQuery(baseOptions: Apollo.QueryHookOptions<Types.AttachmentQuery, Types.AttachmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AttachmentQuery, Types.AttachmentQueryVariables>(AttachmentDocument, options);
      }
export function useAttachmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AttachmentQuery, Types.AttachmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AttachmentQuery, Types.AttachmentQueryVariables>(AttachmentDocument, options);
        }
export function useAttachmentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AttachmentQuery, Types.AttachmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AttachmentQuery, Types.AttachmentQueryVariables>(AttachmentDocument, options);
        }
export type AttachmentQueryHookResult = ReturnType<typeof useAttachmentQuery>;
export type AttachmentLazyQueryHookResult = ReturnType<typeof useAttachmentLazyQuery>;
export type AttachmentSuspenseQueryHookResult = ReturnType<typeof useAttachmentSuspenseQuery>;
export type AttachmentQueryResult = Apollo.QueryResult<Types.AttachmentQuery, Types.AttachmentQueryVariables>;
export const AttachmentLessonsDocument = gql`
    query AttachmentLessons($id: ID!) {
  attachment(id: $id) {
    id
    lessons {
      id
      name
    }
  }
}
    `;

/**
 * __useAttachmentLessonsQuery__
 *
 * To run a query within a React component, call `useAttachmentLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttachmentLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttachmentLessonsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAttachmentLessonsQuery(baseOptions: Apollo.QueryHookOptions<Types.AttachmentLessonsQuery, Types.AttachmentLessonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AttachmentLessonsQuery, Types.AttachmentLessonsQueryVariables>(AttachmentLessonsDocument, options);
      }
export function useAttachmentLessonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AttachmentLessonsQuery, Types.AttachmentLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AttachmentLessonsQuery, Types.AttachmentLessonsQueryVariables>(AttachmentLessonsDocument, options);
        }
export function useAttachmentLessonsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AttachmentLessonsQuery, Types.AttachmentLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AttachmentLessonsQuery, Types.AttachmentLessonsQueryVariables>(AttachmentLessonsDocument, options);
        }
export type AttachmentLessonsQueryHookResult = ReturnType<typeof useAttachmentLessonsQuery>;
export type AttachmentLessonsLazyQueryHookResult = ReturnType<typeof useAttachmentLessonsLazyQuery>;
export type AttachmentLessonsSuspenseQueryHookResult = ReturnType<typeof useAttachmentLessonsSuspenseQuery>;
export type AttachmentLessonsQueryResult = Apollo.QueryResult<Types.AttachmentLessonsQuery, Types.AttachmentLessonsQueryVariables>;
export const AttachmentsDocument = gql`
    query Attachments($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: AttachmentFilter) {
  attachments(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      description
      displayName
      id
      name
      files {
        id
        filename
        url(options: {responseContentDisposition: "attachment"})
      }
    }
  }
}
    `;

/**
 * __useAttachmentsQuery__
 *
 * To run a query within a React component, call `useAttachmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttachmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttachmentsQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAttachmentsQuery(baseOptions?: Apollo.QueryHookOptions<Types.AttachmentsQuery, Types.AttachmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AttachmentsQuery, Types.AttachmentsQueryVariables>(AttachmentsDocument, options);
      }
export function useAttachmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AttachmentsQuery, Types.AttachmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AttachmentsQuery, Types.AttachmentsQueryVariables>(AttachmentsDocument, options);
        }
export function useAttachmentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AttachmentsQuery, Types.AttachmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AttachmentsQuery, Types.AttachmentsQueryVariables>(AttachmentsDocument, options);
        }
export type AttachmentsQueryHookResult = ReturnType<typeof useAttachmentsQuery>;
export type AttachmentsLazyQueryHookResult = ReturnType<typeof useAttachmentsLazyQuery>;
export type AttachmentsSuspenseQueryHookResult = ReturnType<typeof useAttachmentsSuspenseQuery>;
export type AttachmentsQueryResult = Apollo.QueryResult<Types.AttachmentsQuery, Types.AttachmentsQueryVariables>;
export const BadgeDocument = gql`
    query Badge($id: ID!) {
  badge(id: $id) {
    archivedAt
    id
    imageUrl
    thumbnailUrl
    description
    name
  }
}
    `;

/**
 * __useBadgeQuery__
 *
 * To run a query within a React component, call `useBadgeQuery` and pass it any options that fit your needs.
 * When your component renders, `useBadgeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBadgeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBadgeQuery(baseOptions: Apollo.QueryHookOptions<Types.BadgeQuery, Types.BadgeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.BadgeQuery, Types.BadgeQueryVariables>(BadgeDocument, options);
      }
export function useBadgeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.BadgeQuery, Types.BadgeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.BadgeQuery, Types.BadgeQueryVariables>(BadgeDocument, options);
        }
export function useBadgeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.BadgeQuery, Types.BadgeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.BadgeQuery, Types.BadgeQueryVariables>(BadgeDocument, options);
        }
export type BadgeQueryHookResult = ReturnType<typeof useBadgeQuery>;
export type BadgeLazyQueryHookResult = ReturnType<typeof useBadgeLazyQuery>;
export type BadgeSuspenseQueryHookResult = ReturnType<typeof useBadgeSuspenseQuery>;
export type BadgeQueryResult = Apollo.QueryResult<Types.BadgeQuery, Types.BadgeQueryVariables>;
export const BadgesDocument = gql`
    query Badges($scope: ArchivableStatus, $filter: BadgeFilter, $page: Int, $perPage: Int) {
  badges(scope: $scope, filter: $filter, page: $page, perPage: $perPage) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      description
      name
      imageUrl
      id
    }
  }
}
    `;

/**
 * __useBadgesQuery__
 *
 * To run a query within a React component, call `useBadgesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBadgesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBadgesQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useBadgesQuery(baseOptions?: Apollo.QueryHookOptions<Types.BadgesQuery, Types.BadgesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.BadgesQuery, Types.BadgesQueryVariables>(BadgesDocument, options);
      }
export function useBadgesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.BadgesQuery, Types.BadgesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.BadgesQuery, Types.BadgesQueryVariables>(BadgesDocument, options);
        }
export function useBadgesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.BadgesQuery, Types.BadgesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.BadgesQuery, Types.BadgesQueryVariables>(BadgesDocument, options);
        }
export type BadgesQueryHookResult = ReturnType<typeof useBadgesQuery>;
export type BadgesLazyQueryHookResult = ReturnType<typeof useBadgesLazyQuery>;
export type BadgesSuspenseQueryHookResult = ReturnType<typeof useBadgesSuspenseQuery>;
export type BadgesQueryResult = Apollo.QueryResult<Types.BadgesQuery, Types.BadgesQueryVariables>;
export const CareerExplorationReportDocument = gql`
    query CareerExplorationReport($id: ID!) {
  pathwayReport(id: $id) {
    id
    uploadStatus
    url(options: {responseContentDisposition: "attachment"})
  }
}
    `;

/**
 * __useCareerExplorationReportQuery__
 *
 * To run a query within a React component, call `useCareerExplorationReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useCareerExplorationReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCareerExplorationReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCareerExplorationReportQuery(baseOptions: Apollo.QueryHookOptions<Types.CareerExplorationReportQuery, Types.CareerExplorationReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CareerExplorationReportQuery, Types.CareerExplorationReportQueryVariables>(CareerExplorationReportDocument, options);
      }
export function useCareerExplorationReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CareerExplorationReportQuery, Types.CareerExplorationReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CareerExplorationReportQuery, Types.CareerExplorationReportQueryVariables>(CareerExplorationReportDocument, options);
        }
export function useCareerExplorationReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CareerExplorationReportQuery, Types.CareerExplorationReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CareerExplorationReportQuery, Types.CareerExplorationReportQueryVariables>(CareerExplorationReportDocument, options);
        }
export type CareerExplorationReportQueryHookResult = ReturnType<typeof useCareerExplorationReportQuery>;
export type CareerExplorationReportLazyQueryHookResult = ReturnType<typeof useCareerExplorationReportLazyQuery>;
export type CareerExplorationReportSuspenseQueryHookResult = ReturnType<typeof useCareerExplorationReportSuspenseQuery>;
export type CareerExplorationReportQueryResult = Apollo.QueryResult<Types.CareerExplorationReportQuery, Types.CareerExplorationReportQueryVariables>;
export const CareerExplorationReportFiltersDocument = gql`
    query CareerExplorationReportFilters($filters: ReportFiltersFilter, $entityFilter: EntityFilter, $userFilter: UserFilter, $schoolClassFilter: SchoolClassFilter) {
  pathwayReportFilters(filters: $filters) {
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
 * __useCareerExplorationReportFiltersQuery__
 *
 * To run a query within a React component, call `useCareerExplorationReportFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCareerExplorationReportFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCareerExplorationReportFiltersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      entityFilter: // value for 'entityFilter'
 *      userFilter: // value for 'userFilter'
 *      schoolClassFilter: // value for 'schoolClassFilter'
 *   },
 * });
 */
export function useCareerExplorationReportFiltersQuery(baseOptions?: Apollo.QueryHookOptions<Types.CareerExplorationReportFiltersQuery, Types.CareerExplorationReportFiltersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CareerExplorationReportFiltersQuery, Types.CareerExplorationReportFiltersQueryVariables>(CareerExplorationReportFiltersDocument, options);
      }
export function useCareerExplorationReportFiltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CareerExplorationReportFiltersQuery, Types.CareerExplorationReportFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CareerExplorationReportFiltersQuery, Types.CareerExplorationReportFiltersQueryVariables>(CareerExplorationReportFiltersDocument, options);
        }
export function useCareerExplorationReportFiltersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CareerExplorationReportFiltersQuery, Types.CareerExplorationReportFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CareerExplorationReportFiltersQuery, Types.CareerExplorationReportFiltersQueryVariables>(CareerExplorationReportFiltersDocument, options);
        }
export type CareerExplorationReportFiltersQueryHookResult = ReturnType<typeof useCareerExplorationReportFiltersQuery>;
export type CareerExplorationReportFiltersLazyQueryHookResult = ReturnType<typeof useCareerExplorationReportFiltersLazyQuery>;
export type CareerExplorationReportFiltersSuspenseQueryHookResult = ReturnType<typeof useCareerExplorationReportFiltersSuspenseQuery>;
export type CareerExplorationReportFiltersQueryResult = Apollo.QueryResult<Types.CareerExplorationReportFiltersQuery, Types.CareerExplorationReportFiltersQueryVariables>;
export const CareerExplorationReportFullDataDocument = gql`
    query CareerExplorationReportFullData($filter: PathwayReportFilter, $resultsFilter: PathwayVisitResultFilter, $page: Int, $perPage: Int) {
  reports {
    pathwayReport(filter: $filter) {
      visitResults(filter: $resultsFilter, page: $page, perPage: $perPage) {
        nodesCount
        pagesCount
        nodes {
          clusterNames
          isEnrolled
          pathwayNames
          resourceId
          resourceName
          resourceType
          visitorEmail
          visitorId
          visitorName
          visitorSisId
          visitorType
          visitsCount
        }
      }
    }
  }
}
    `;

/**
 * __useCareerExplorationReportFullDataQuery__
 *
 * To run a query within a React component, call `useCareerExplorationReportFullDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useCareerExplorationReportFullDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCareerExplorationReportFullDataQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      resultsFilter: // value for 'resultsFilter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useCareerExplorationReportFullDataQuery(baseOptions?: Apollo.QueryHookOptions<Types.CareerExplorationReportFullDataQuery, Types.CareerExplorationReportFullDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CareerExplorationReportFullDataQuery, Types.CareerExplorationReportFullDataQueryVariables>(CareerExplorationReportFullDataDocument, options);
      }
export function useCareerExplorationReportFullDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CareerExplorationReportFullDataQuery, Types.CareerExplorationReportFullDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CareerExplorationReportFullDataQuery, Types.CareerExplorationReportFullDataQueryVariables>(CareerExplorationReportFullDataDocument, options);
        }
export function useCareerExplorationReportFullDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CareerExplorationReportFullDataQuery, Types.CareerExplorationReportFullDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CareerExplorationReportFullDataQuery, Types.CareerExplorationReportFullDataQueryVariables>(CareerExplorationReportFullDataDocument, options);
        }
export type CareerExplorationReportFullDataQueryHookResult = ReturnType<typeof useCareerExplorationReportFullDataQuery>;
export type CareerExplorationReportFullDataLazyQueryHookResult = ReturnType<typeof useCareerExplorationReportFullDataLazyQuery>;
export type CareerExplorationReportFullDataSuspenseQueryHookResult = ReturnType<typeof useCareerExplorationReportFullDataSuspenseQuery>;
export type CareerExplorationReportFullDataQueryResult = Apollo.QueryResult<Types.CareerExplorationReportFullDataQuery, Types.CareerExplorationReportFullDataQueryVariables>;
export const CareerExplorationReportSummaryDocument = gql`
    query CareerExplorationReportSummary($filter: PathwayReportFilter) {
  reports {
    pathwayReport(filter: $filter) {
      summary {
        engagementsCount
        clustersCount
        pathwaysCount
        studentsCount
        usersCount
      }
    }
  }
}
    `;

/**
 * __useCareerExplorationReportSummaryQuery__
 *
 * To run a query within a React component, call `useCareerExplorationReportSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCareerExplorationReportSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCareerExplorationReportSummaryQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCareerExplorationReportSummaryQuery(baseOptions?: Apollo.QueryHookOptions<Types.CareerExplorationReportSummaryQuery, Types.CareerExplorationReportSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CareerExplorationReportSummaryQuery, Types.CareerExplorationReportSummaryQueryVariables>(CareerExplorationReportSummaryDocument, options);
      }
export function useCareerExplorationReportSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CareerExplorationReportSummaryQuery, Types.CareerExplorationReportSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CareerExplorationReportSummaryQuery, Types.CareerExplorationReportSummaryQueryVariables>(CareerExplorationReportSummaryDocument, options);
        }
export function useCareerExplorationReportSummarySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CareerExplorationReportSummaryQuery, Types.CareerExplorationReportSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CareerExplorationReportSummaryQuery, Types.CareerExplorationReportSummaryQueryVariables>(CareerExplorationReportSummaryDocument, options);
        }
export type CareerExplorationReportSummaryQueryHookResult = ReturnType<typeof useCareerExplorationReportSummaryQuery>;
export type CareerExplorationReportSummaryLazyQueryHookResult = ReturnType<typeof useCareerExplorationReportSummaryLazyQuery>;
export type CareerExplorationReportSummarySuspenseQueryHookResult = ReturnType<typeof useCareerExplorationReportSummarySuspenseQuery>;
export type CareerExplorationReportSummaryQueryResult = Apollo.QueryResult<Types.CareerExplorationReportSummaryQuery, Types.CareerExplorationReportSummaryQueryVariables>;
export const CareerExplorationReportVisitCountsDocument = gql`
    query CareerExplorationReportVisitCounts($filter: PathwayReportFilter) {
  reports {
    pathwayReport(filter: $filter) {
      visitCounts {
        visitsCount
        cluster {
          name
          id
        }
        pathwayVisitCounts {
          visitsCount
          pathway {
            cluster {
              name
              id
            }
            id
            name
          }
        }
      }
    }
  }
}
    `;

/**
 * __useCareerExplorationReportVisitCountsQuery__
 *
 * To run a query within a React component, call `useCareerExplorationReportVisitCountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCareerExplorationReportVisitCountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCareerExplorationReportVisitCountsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCareerExplorationReportVisitCountsQuery(baseOptions?: Apollo.QueryHookOptions<Types.CareerExplorationReportVisitCountsQuery, Types.CareerExplorationReportVisitCountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CareerExplorationReportVisitCountsQuery, Types.CareerExplorationReportVisitCountsQueryVariables>(CareerExplorationReportVisitCountsDocument, options);
      }
export function useCareerExplorationReportVisitCountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CareerExplorationReportVisitCountsQuery, Types.CareerExplorationReportVisitCountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CareerExplorationReportVisitCountsQuery, Types.CareerExplorationReportVisitCountsQueryVariables>(CareerExplorationReportVisitCountsDocument, options);
        }
export function useCareerExplorationReportVisitCountsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CareerExplorationReportVisitCountsQuery, Types.CareerExplorationReportVisitCountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CareerExplorationReportVisitCountsQuery, Types.CareerExplorationReportVisitCountsQueryVariables>(CareerExplorationReportVisitCountsDocument, options);
        }
export type CareerExplorationReportVisitCountsQueryHookResult = ReturnType<typeof useCareerExplorationReportVisitCountsQuery>;
export type CareerExplorationReportVisitCountsLazyQueryHookResult = ReturnType<typeof useCareerExplorationReportVisitCountsLazyQuery>;
export type CareerExplorationReportVisitCountsSuspenseQueryHookResult = ReturnType<typeof useCareerExplorationReportVisitCountsSuspenseQuery>;
export type CareerExplorationReportVisitCountsQueryResult = Apollo.QueryResult<Types.CareerExplorationReportVisitCountsQuery, Types.CareerExplorationReportVisitCountsQueryVariables>;
export const CareerReviewSurveyLessonDocument = gql`
    query CareerReviewSurveyLesson {
  careerReviewSurveyLesson {
    archivedAt
    id
    imageUrl
    name
    type
  }
}
    `;

/**
 * __useCareerReviewSurveyLessonQuery__
 *
 * To run a query within a React component, call `useCareerReviewSurveyLessonQuery` and pass it any options that fit your needs.
 * When your component renders, `useCareerReviewSurveyLessonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCareerReviewSurveyLessonQuery({
 *   variables: {
 *   },
 * });
 */
export function useCareerReviewSurveyLessonQuery(baseOptions?: Apollo.QueryHookOptions<Types.CareerReviewSurveyLessonQuery, Types.CareerReviewSurveyLessonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CareerReviewSurveyLessonQuery, Types.CareerReviewSurveyLessonQueryVariables>(CareerReviewSurveyLessonDocument, options);
      }
export function useCareerReviewSurveyLessonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CareerReviewSurveyLessonQuery, Types.CareerReviewSurveyLessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CareerReviewSurveyLessonQuery, Types.CareerReviewSurveyLessonQueryVariables>(CareerReviewSurveyLessonDocument, options);
        }
export function useCareerReviewSurveyLessonSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CareerReviewSurveyLessonQuery, Types.CareerReviewSurveyLessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CareerReviewSurveyLessonQuery, Types.CareerReviewSurveyLessonQueryVariables>(CareerReviewSurveyLessonDocument, options);
        }
export type CareerReviewSurveyLessonQueryHookResult = ReturnType<typeof useCareerReviewSurveyLessonQuery>;
export type CareerReviewSurveyLessonLazyQueryHookResult = ReturnType<typeof useCareerReviewSurveyLessonLazyQuery>;
export type CareerReviewSurveyLessonSuspenseQueryHookResult = ReturnType<typeof useCareerReviewSurveyLessonSuspenseQuery>;
export type CareerReviewSurveyLessonQueryResult = Apollo.QueryResult<Types.CareerReviewSurveyLessonQuery, Types.CareerReviewSurveyLessonQueryVariables>;
export const CareerReviewSurveyReportDocument = gql`
    query CareerReviewSurveyReport($filter: CareerReviewSurveyReportFilter) {
  reports {
    careerReviewSurveyReport(filter: $filter) {
      studentsCount
      studentsAnsweredCount
      questionAnswerCounts {
        question {
          id
          question
        }
        baselineCounts {
          answer
          count
        }
        currentCounts {
          answer
          count
        }
      }
    }
  }
}
    `;

/**
 * __useCareerReviewSurveyReportQuery__
 *
 * To run a query within a React component, call `useCareerReviewSurveyReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useCareerReviewSurveyReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCareerReviewSurveyReportQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCareerReviewSurveyReportQuery(baseOptions?: Apollo.QueryHookOptions<Types.CareerReviewSurveyReportQuery, Types.CareerReviewSurveyReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CareerReviewSurveyReportQuery, Types.CareerReviewSurveyReportQueryVariables>(CareerReviewSurveyReportDocument, options);
      }
export function useCareerReviewSurveyReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CareerReviewSurveyReportQuery, Types.CareerReviewSurveyReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CareerReviewSurveyReportQuery, Types.CareerReviewSurveyReportQueryVariables>(CareerReviewSurveyReportDocument, options);
        }
export function useCareerReviewSurveyReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CareerReviewSurveyReportQuery, Types.CareerReviewSurveyReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CareerReviewSurveyReportQuery, Types.CareerReviewSurveyReportQueryVariables>(CareerReviewSurveyReportDocument, options);
        }
export type CareerReviewSurveyReportQueryHookResult = ReturnType<typeof useCareerReviewSurveyReportQuery>;
export type CareerReviewSurveyReportLazyQueryHookResult = ReturnType<typeof useCareerReviewSurveyReportLazyQuery>;
export type CareerReviewSurveyReportSuspenseQueryHookResult = ReturnType<typeof useCareerReviewSurveyReportSuspenseQuery>;
export type CareerReviewSurveyReportQueryResult = Apollo.QueryResult<Types.CareerReviewSurveyReportQuery, Types.CareerReviewSurveyReportQueryVariables>;
export const CareerReviewSurveyReportCsvDocument = gql`
    query CareerReviewSurveyReportCSV($id: ID!) {
  careerReviewSurveyReport(id: $id) {
    id
    url(options: {responseContentDisposition: "attachment"})
    uploadStatus
  }
}
    `;

/**
 * __useCareerReviewSurveyReportCsvQuery__
 *
 * To run a query within a React component, call `useCareerReviewSurveyReportCsvQuery` and pass it any options that fit your needs.
 * When your component renders, `useCareerReviewSurveyReportCsvQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCareerReviewSurveyReportCsvQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCareerReviewSurveyReportCsvQuery(baseOptions: Apollo.QueryHookOptions<Types.CareerReviewSurveyReportCsvQuery, Types.CareerReviewSurveyReportCsvQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CareerReviewSurveyReportCsvQuery, Types.CareerReviewSurveyReportCsvQueryVariables>(CareerReviewSurveyReportCsvDocument, options);
      }
export function useCareerReviewSurveyReportCsvLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CareerReviewSurveyReportCsvQuery, Types.CareerReviewSurveyReportCsvQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CareerReviewSurveyReportCsvQuery, Types.CareerReviewSurveyReportCsvQueryVariables>(CareerReviewSurveyReportCsvDocument, options);
        }
export function useCareerReviewSurveyReportCsvSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CareerReviewSurveyReportCsvQuery, Types.CareerReviewSurveyReportCsvQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CareerReviewSurveyReportCsvQuery, Types.CareerReviewSurveyReportCsvQueryVariables>(CareerReviewSurveyReportCsvDocument, options);
        }
export type CareerReviewSurveyReportCsvQueryHookResult = ReturnType<typeof useCareerReviewSurveyReportCsvQuery>;
export type CareerReviewSurveyReportCsvLazyQueryHookResult = ReturnType<typeof useCareerReviewSurveyReportCsvLazyQuery>;
export type CareerReviewSurveyReportCsvSuspenseQueryHookResult = ReturnType<typeof useCareerReviewSurveyReportCsvSuspenseQuery>;
export type CareerReviewSurveyReportCsvQueryResult = Apollo.QueryResult<Types.CareerReviewSurveyReportCsvQuery, Types.CareerReviewSurveyReportCsvQueryVariables>;
export const CareerReviewSurveyReportFiltersDocument = gql`
    query CareerReviewSurveyReportFilters($filters: ReportFiltersFilter, $entityFilter: EntityFilter, $userFilter: UserFilter, $schoolClassFilter: SchoolClassFilter) {
  careerReviewSurveyReportFilters(filters: $filters) {
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
 * __useCareerReviewSurveyReportFiltersQuery__
 *
 * To run a query within a React component, call `useCareerReviewSurveyReportFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCareerReviewSurveyReportFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCareerReviewSurveyReportFiltersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      entityFilter: // value for 'entityFilter'
 *      userFilter: // value for 'userFilter'
 *      schoolClassFilter: // value for 'schoolClassFilter'
 *   },
 * });
 */
export function useCareerReviewSurveyReportFiltersQuery(baseOptions?: Apollo.QueryHookOptions<Types.CareerReviewSurveyReportFiltersQuery, Types.CareerReviewSurveyReportFiltersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CareerReviewSurveyReportFiltersQuery, Types.CareerReviewSurveyReportFiltersQueryVariables>(CareerReviewSurveyReportFiltersDocument, options);
      }
export function useCareerReviewSurveyReportFiltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CareerReviewSurveyReportFiltersQuery, Types.CareerReviewSurveyReportFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CareerReviewSurveyReportFiltersQuery, Types.CareerReviewSurveyReportFiltersQueryVariables>(CareerReviewSurveyReportFiltersDocument, options);
        }
export function useCareerReviewSurveyReportFiltersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CareerReviewSurveyReportFiltersQuery, Types.CareerReviewSurveyReportFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CareerReviewSurveyReportFiltersQuery, Types.CareerReviewSurveyReportFiltersQueryVariables>(CareerReviewSurveyReportFiltersDocument, options);
        }
export type CareerReviewSurveyReportFiltersQueryHookResult = ReturnType<typeof useCareerReviewSurveyReportFiltersQuery>;
export type CareerReviewSurveyReportFiltersLazyQueryHookResult = ReturnType<typeof useCareerReviewSurveyReportFiltersLazyQuery>;
export type CareerReviewSurveyReportFiltersSuspenseQueryHookResult = ReturnType<typeof useCareerReviewSurveyReportFiltersSuspenseQuery>;
export type CareerReviewSurveyReportFiltersQueryResult = Apollo.QueryResult<Types.CareerReviewSurveyReportFiltersQuery, Types.CareerReviewSurveyReportFiltersQueryVariables>;
export const CareerReviewSurveyReportResultsDocument = gql`
    query CareerReviewSurveyReportResults($filter: CareerReviewSurveyReportFilter, $resultsFilter: CareerReviewSurveyReportResultFilter, $sort: CareerReviewSurveyReportResultSortAttributes, $page: Int, $perPage: Int) {
  reports {
    careerReviewSurveyReport(filter: $filter) {
      results(filter: $resultsFilter, sort: $sort, page: $page, perPage: $perPage) {
        nodes {
          answers {
            question {
              id
              question
            }
            answer {
              type
              value
            }
          }
          studentSisId
          studentName
          contextType
          contextName
          takeNumber
          isCurrent
          isBaseline
          takenAt
        }
        nodesCount
        pagesCount
      }
    }
  }
}
    `;

/**
 * __useCareerReviewSurveyReportResultsQuery__
 *
 * To run a query within a React component, call `useCareerReviewSurveyReportResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCareerReviewSurveyReportResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCareerReviewSurveyReportResultsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      resultsFilter: // value for 'resultsFilter'
 *      sort: // value for 'sort'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useCareerReviewSurveyReportResultsQuery(baseOptions?: Apollo.QueryHookOptions<Types.CareerReviewSurveyReportResultsQuery, Types.CareerReviewSurveyReportResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CareerReviewSurveyReportResultsQuery, Types.CareerReviewSurveyReportResultsQueryVariables>(CareerReviewSurveyReportResultsDocument, options);
      }
export function useCareerReviewSurveyReportResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CareerReviewSurveyReportResultsQuery, Types.CareerReviewSurveyReportResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CareerReviewSurveyReportResultsQuery, Types.CareerReviewSurveyReportResultsQueryVariables>(CareerReviewSurveyReportResultsDocument, options);
        }
export function useCareerReviewSurveyReportResultsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CareerReviewSurveyReportResultsQuery, Types.CareerReviewSurveyReportResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CareerReviewSurveyReportResultsQuery, Types.CareerReviewSurveyReportResultsQueryVariables>(CareerReviewSurveyReportResultsDocument, options);
        }
export type CareerReviewSurveyReportResultsQueryHookResult = ReturnType<typeof useCareerReviewSurveyReportResultsQuery>;
export type CareerReviewSurveyReportResultsLazyQueryHookResult = ReturnType<typeof useCareerReviewSurveyReportResultsLazyQuery>;
export type CareerReviewSurveyReportResultsSuspenseQueryHookResult = ReturnType<typeof useCareerReviewSurveyReportResultsSuspenseQuery>;
export type CareerReviewSurveyReportResultsQueryResult = Apollo.QueryResult<Types.CareerReviewSurveyReportResultsQuery, Types.CareerReviewSurveyReportResultsQueryVariables>;
export const CatalogDocument = gql`
    query Catalog($id: ID!) {
  catalog(id: $id) {
    description
    displayName
    id
    imageUrl
    name
    status
    thumbnailUrl
    service
    tracks {
      id
      imageUrl
      name
      step
      service
      units {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useCatalogQuery__
 *
 * To run a query within a React component, call `useCatalogQuery` and pass it any options that fit your needs.
 * When your component renders, `useCatalogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCatalogQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCatalogQuery(baseOptions: Apollo.QueryHookOptions<Types.CatalogQuery, Types.CatalogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CatalogQuery, Types.CatalogQueryVariables>(CatalogDocument, options);
      }
export function useCatalogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CatalogQuery, Types.CatalogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CatalogQuery, Types.CatalogQueryVariables>(CatalogDocument, options);
        }
export function useCatalogSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CatalogQuery, Types.CatalogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CatalogQuery, Types.CatalogQueryVariables>(CatalogDocument, options);
        }
export type CatalogQueryHookResult = ReturnType<typeof useCatalogQuery>;
export type CatalogLazyQueryHookResult = ReturnType<typeof useCatalogLazyQuery>;
export type CatalogSuspenseQueryHookResult = ReturnType<typeof useCatalogSuspenseQuery>;
export type CatalogQueryResult = Apollo.QueryResult<Types.CatalogQuery, Types.CatalogQueryVariables>;
export const CatalogsDocument = gql`
    query Catalogs($scope: ArchivableStatus, $filter: CatalogFilter, $page: Int, $perPage: Int) {
  catalogs(scope: $scope, filter: $filter, page: $page, perPage: $perPage) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      description
      displayName
      id
      imageUrl
      name
      status
      service
      thumbnailUrl
      tracks {
        id
        imageUrl
        name
        step
        service
        units {
          id
          name
          step
        }
      }
    }
  }
}
    `;

/**
 * __useCatalogsQuery__
 *
 * To run a query within a React component, call `useCatalogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCatalogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCatalogsQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useCatalogsQuery(baseOptions?: Apollo.QueryHookOptions<Types.CatalogsQuery, Types.CatalogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CatalogsQuery, Types.CatalogsQueryVariables>(CatalogsDocument, options);
      }
export function useCatalogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CatalogsQuery, Types.CatalogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CatalogsQuery, Types.CatalogsQueryVariables>(CatalogsDocument, options);
        }
export function useCatalogsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CatalogsQuery, Types.CatalogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CatalogsQuery, Types.CatalogsQueryVariables>(CatalogsDocument, options);
        }
export type CatalogsQueryHookResult = ReturnType<typeof useCatalogsQuery>;
export type CatalogsLazyQueryHookResult = ReturnType<typeof useCatalogsLazyQuery>;
export type CatalogsSuspenseQueryHookResult = ReturnType<typeof useCatalogsSuspenseQuery>;
export type CatalogsQueryResult = Apollo.QueryResult<Types.CatalogsQuery, Types.CatalogsQueryVariables>;
export const CheckinGroupsDocument = gql`
    query CheckinGroups($page: Int, $perPage: Int, $filter: CheckInGroupFilter) {
  checkInGroups(page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      displayName
      id
      name
      questions {
        id
        question
        step
      }
    }
  }
}
    `;

/**
 * __useCheckinGroupsQuery__
 *
 * To run a query within a React component, call `useCheckinGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckinGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckinGroupsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCheckinGroupsQuery(baseOptions?: Apollo.QueryHookOptions<Types.CheckinGroupsQuery, Types.CheckinGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CheckinGroupsQuery, Types.CheckinGroupsQueryVariables>(CheckinGroupsDocument, options);
      }
export function useCheckinGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CheckinGroupsQuery, Types.CheckinGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CheckinGroupsQuery, Types.CheckinGroupsQueryVariables>(CheckinGroupsDocument, options);
        }
export function useCheckinGroupsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CheckinGroupsQuery, Types.CheckinGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CheckinGroupsQuery, Types.CheckinGroupsQueryVariables>(CheckinGroupsDocument, options);
        }
export type CheckinGroupsQueryHookResult = ReturnType<typeof useCheckinGroupsQuery>;
export type CheckinGroupsLazyQueryHookResult = ReturnType<typeof useCheckinGroupsLazyQuery>;
export type CheckinGroupsSuspenseQueryHookResult = ReturnType<typeof useCheckinGroupsSuspenseQuery>;
export type CheckinGroupsQueryResult = Apollo.QueryResult<Types.CheckinGroupsQuery, Types.CheckinGroupsQueryVariables>;
export const CheckinGroupDocument = gql`
    query CheckinGroup($id: ID!) {
  checkInGroup(id: $id) {
    displayName
    id
    name
    badges {
      id
      name
      imageUrl
    }
    questions {
      id
      question
      step
    }
  }
}
    `;

/**
 * __useCheckinGroupQuery__
 *
 * To run a query within a React component, call `useCheckinGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckinGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckinGroupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckinGroupQuery(baseOptions: Apollo.QueryHookOptions<Types.CheckinGroupQuery, Types.CheckinGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CheckinGroupQuery, Types.CheckinGroupQueryVariables>(CheckinGroupDocument, options);
      }
export function useCheckinGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CheckinGroupQuery, Types.CheckinGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CheckinGroupQuery, Types.CheckinGroupQueryVariables>(CheckinGroupDocument, options);
        }
export function useCheckinGroupSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CheckinGroupQuery, Types.CheckinGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CheckinGroupQuery, Types.CheckinGroupQueryVariables>(CheckinGroupDocument, options);
        }
export type CheckinGroupQueryHookResult = ReturnType<typeof useCheckinGroupQuery>;
export type CheckinGroupLazyQueryHookResult = ReturnType<typeof useCheckinGroupLazyQuery>;
export type CheckinGroupSuspenseQueryHookResult = ReturnType<typeof useCheckinGroupSuspenseQuery>;
export type CheckinGroupQueryResult = Apollo.QueryResult<Types.CheckinGroupQuery, Types.CheckinGroupQueryVariables>;
export const CheckinQuestionDocument = gql`
    query CheckinQuestion($id: ID!) {
  checkInQuestion(id: $id) {
    answer {
      answer
      createdAt
      grade {
        createdAt
        id
        status
        updatedAt
      }
      id
      name
      updatedAt
    }
    id
    question
  }
}
    `;

/**
 * __useCheckinQuestionQuery__
 *
 * To run a query within a React component, call `useCheckinQuestionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckinQuestionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckinQuestionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckinQuestionQuery(baseOptions: Apollo.QueryHookOptions<Types.CheckinQuestionQuery, Types.CheckinQuestionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CheckinQuestionQuery, Types.CheckinQuestionQueryVariables>(CheckinQuestionDocument, options);
      }
export function useCheckinQuestionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CheckinQuestionQuery, Types.CheckinQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CheckinQuestionQuery, Types.CheckinQuestionQueryVariables>(CheckinQuestionDocument, options);
        }
export function useCheckinQuestionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CheckinQuestionQuery, Types.CheckinQuestionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CheckinQuestionQuery, Types.CheckinQuestionQueryVariables>(CheckinQuestionDocument, options);
        }
export type CheckinQuestionQueryHookResult = ReturnType<typeof useCheckinQuestionQuery>;
export type CheckinQuestionLazyQueryHookResult = ReturnType<typeof useCheckinQuestionLazyQuery>;
export type CheckinQuestionSuspenseQueryHookResult = ReturnType<typeof useCheckinQuestionSuspenseQuery>;
export type CheckinQuestionQueryResult = Apollo.QueryResult<Types.CheckinQuestionQuery, Types.CheckinQuestionQueryVariables>;
export const CheckinQuestionsDocument = gql`
    query CheckinQuestions($page: Int, $perPage: Int, $filter: CheckInQuestionFilter, $scope: ArchivableStatus) {
  checkInQuestions(page: $page, perPage: $perPage, filter: $filter, scope: $scope) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      answer {
        answer
        createdAt
        grade {
          createdAt
          id
          status
          updatedAt
        }
        id
        name
        updatedAt
      }
      id
      question
    }
  }
}
    `;

/**
 * __useCheckinQuestionsQuery__
 *
 * To run a query within a React component, call `useCheckinQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckinQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckinQuestionsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *      scope: // value for 'scope'
 *   },
 * });
 */
export function useCheckinQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<Types.CheckinQuestionsQuery, Types.CheckinQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CheckinQuestionsQuery, Types.CheckinQuestionsQueryVariables>(CheckinQuestionsDocument, options);
      }
export function useCheckinQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CheckinQuestionsQuery, Types.CheckinQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CheckinQuestionsQuery, Types.CheckinQuestionsQueryVariables>(CheckinQuestionsDocument, options);
        }
export function useCheckinQuestionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CheckinQuestionsQuery, Types.CheckinQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CheckinQuestionsQuery, Types.CheckinQuestionsQueryVariables>(CheckinQuestionsDocument, options);
        }
export type CheckinQuestionsQueryHookResult = ReturnType<typeof useCheckinQuestionsQuery>;
export type CheckinQuestionsLazyQueryHookResult = ReturnType<typeof useCheckinQuestionsLazyQuery>;
export type CheckinQuestionsSuspenseQueryHookResult = ReturnType<typeof useCheckinQuestionsSuspenseQuery>;
export type CheckinQuestionsQueryResult = Apollo.QueryResult<Types.CheckinQuestionsQuery, Types.CheckinQuestionsQueryVariables>;
export const ContractsDocument = gql`
    query Contracts($page: Int, $perPage: Int, $filter: ContractFilter) {
  contracts(page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    nodes {
      definedLearningUuid
      endDate
      entities {
        uuid
        name
      }
      id
      name
      startDate
      syncable
      uuid
    }
    pagesCount
  }
}
    `;

/**
 * __useContractsQuery__
 *
 * To run a query within a React component, call `useContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContractsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useContractsQuery(baseOptions?: Apollo.QueryHookOptions<Types.ContractsQuery, Types.ContractsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ContractsQuery, Types.ContractsQueryVariables>(ContractsDocument, options);
      }
export function useContractsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ContractsQuery, Types.ContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ContractsQuery, Types.ContractsQueryVariables>(ContractsDocument, options);
        }
export function useContractsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ContractsQuery, Types.ContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ContractsQuery, Types.ContractsQueryVariables>(ContractsDocument, options);
        }
export type ContractsQueryHookResult = ReturnType<typeof useContractsQuery>;
export type ContractsLazyQueryHookResult = ReturnType<typeof useContractsLazyQuery>;
export type ContractsSuspenseQueryHookResult = ReturnType<typeof useContractsSuspenseQuery>;
export type ContractsQueryResult = Apollo.QueryResult<Types.ContractsQuery, Types.ContractsQueryVariables>;
export const CounselorsDocument = gql`
    query Counselors($page: Int, $perPage: Int, $filter: UserFilter) {
  counselors(page: $page, perPage: $perPage, filter: $filter) {
    pagesCount
    nodesCount
    nodes {
      uuid
      firstName
      lastName
      fullName
      uuid
    }
  }
}
    `;

/**
 * __useCounselorsQuery__
 *
 * To run a query within a React component, call `useCounselorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCounselorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCounselorsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCounselorsQuery(baseOptions?: Apollo.QueryHookOptions<Types.CounselorsQuery, Types.CounselorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CounselorsQuery, Types.CounselorsQueryVariables>(CounselorsDocument, options);
      }
export function useCounselorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CounselorsQuery, Types.CounselorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CounselorsQuery, Types.CounselorsQueryVariables>(CounselorsDocument, options);
        }
export function useCounselorsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CounselorsQuery, Types.CounselorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CounselorsQuery, Types.CounselorsQueryVariables>(CounselorsDocument, options);
        }
export type CounselorsQueryHookResult = ReturnType<typeof useCounselorsQuery>;
export type CounselorsLazyQueryHookResult = ReturnType<typeof useCounselorsLazyQuery>;
export type CounselorsSuspenseQueryHookResult = ReturnType<typeof useCounselorsSuspenseQuery>;
export type CounselorsQueryResult = Apollo.QueryResult<Types.CounselorsQuery, Types.CounselorsQueryVariables>;
export const UserCourseDocument = gql`
    query UserCourse($id: ID!, $track: Boolean) {
  course(id: $id, track: $track) {
    description
    displayName
    badges {
      id
      imageUrl
      name
    }
    id
    imageUrl
    isGlobal
    thumbnailUrl
    lessons {
      id
      imageUrl
      name
      step
      thumbnailUrl
      type
    }
    name
    sharedResource {
      allowLogin
      code
    }
    status
    pathway {
      id
      name
    }
    type
    collection {
      id
      name
    }
    ...CourseMetadata
  }
}
    ${CourseMetadataFragmentDoc}`;

/**
 * __useUserCourseQuery__
 *
 * To run a query within a React component, call `useUserCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useUserCourseQuery(baseOptions: Apollo.QueryHookOptions<Types.UserCourseQuery, Types.UserCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserCourseQuery, Types.UserCourseQueryVariables>(UserCourseDocument, options);
      }
export function useUserCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserCourseQuery, Types.UserCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserCourseQuery, Types.UserCourseQueryVariables>(UserCourseDocument, options);
        }
export function useUserCourseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserCourseQuery, Types.UserCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserCourseQuery, Types.UserCourseQueryVariables>(UserCourseDocument, options);
        }
export type UserCourseQueryHookResult = ReturnType<typeof useUserCourseQuery>;
export type UserCourseLazyQueryHookResult = ReturnType<typeof useUserCourseLazyQuery>;
export type UserCourseSuspenseQueryHookResult = ReturnType<typeof useUserCourseSuspenseQuery>;
export type UserCourseQueryResult = Apollo.QueryResult<Types.UserCourseQuery, Types.UserCourseQueryVariables>;
export const CourseGradingSchoolClassWithStudentsDocument = gql`
    query CourseGradingSchoolClassWithStudents($uuid: ID!, $courseId: ID!) {
  schoolClass(uuid: $uuid) {
    gradingNeededStudents: studentsEnrolledInCourse(
      courseId: $courseId
      gradingNeeded: true
    ) {
      nodes {
        course(id: $courseId) {
          id
          name
        }
        firstName
        lastName
        settings {
          assessmentType {
            value
          }
        }
        uuid
      }
    }
    name
    parentName
    uuid
    withoutGradingNeededStudents: studentsEnrolledInCourse(
      courseId: $courseId
      gradingNeeded: false
    ) {
      nodes {
        course(id: $courseId) {
          id
          name
        }
        firstName
        lastName
        settings {
          assessmentType {
            value
          }
        }
        uuid
      }
    }
  }
}
    `;

/**
 * __useCourseGradingSchoolClassWithStudentsQuery__
 *
 * To run a query within a React component, call `useCourseGradingSchoolClassWithStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseGradingSchoolClassWithStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseGradingSchoolClassWithStudentsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useCourseGradingSchoolClassWithStudentsQuery(baseOptions: Apollo.QueryHookOptions<Types.CourseGradingSchoolClassWithStudentsQuery, Types.CourseGradingSchoolClassWithStudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CourseGradingSchoolClassWithStudentsQuery, Types.CourseGradingSchoolClassWithStudentsQueryVariables>(CourseGradingSchoolClassWithStudentsDocument, options);
      }
export function useCourseGradingSchoolClassWithStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CourseGradingSchoolClassWithStudentsQuery, Types.CourseGradingSchoolClassWithStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CourseGradingSchoolClassWithStudentsQuery, Types.CourseGradingSchoolClassWithStudentsQueryVariables>(CourseGradingSchoolClassWithStudentsDocument, options);
        }
export function useCourseGradingSchoolClassWithStudentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CourseGradingSchoolClassWithStudentsQuery, Types.CourseGradingSchoolClassWithStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CourseGradingSchoolClassWithStudentsQuery, Types.CourseGradingSchoolClassWithStudentsQueryVariables>(CourseGradingSchoolClassWithStudentsDocument, options);
        }
export type CourseGradingSchoolClassWithStudentsQueryHookResult = ReturnType<typeof useCourseGradingSchoolClassWithStudentsQuery>;
export type CourseGradingSchoolClassWithStudentsLazyQueryHookResult = ReturnType<typeof useCourseGradingSchoolClassWithStudentsLazyQuery>;
export type CourseGradingSchoolClassWithStudentsSuspenseQueryHookResult = ReturnType<typeof useCourseGradingSchoolClassWithStudentsSuspenseQuery>;
export type CourseGradingSchoolClassWithStudentsQueryResult = Apollo.QueryResult<Types.CourseGradingSchoolClassWithStudentsQuery, Types.CourseGradingSchoolClassWithStudentsQueryVariables>;
export const CourseGradingSchoolClassesDocument = gql`
    query CourseGradingSchoolClasses($id: ID!) {
  course(id: $id) {
    gradingNeededSchoolClasses: enrolledSchoolClasses(gradingNeeded: true) {
      nodes {
        name
        parentName
        settings {
          assessmentType
        }
        uuid
      }
    }
    id
    name
    withoutGradingNeededSchoolClasses: enrolledSchoolClasses(gradingNeeded: false) {
      nodes {
        name
        parentName
        settings {
          assessmentType
        }
        uuid
      }
    }
  }
}
    `;

/**
 * __useCourseGradingSchoolClassesQuery__
 *
 * To run a query within a React component, call `useCourseGradingSchoolClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseGradingSchoolClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseGradingSchoolClassesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCourseGradingSchoolClassesQuery(baseOptions: Apollo.QueryHookOptions<Types.CourseGradingSchoolClassesQuery, Types.CourseGradingSchoolClassesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CourseGradingSchoolClassesQuery, Types.CourseGradingSchoolClassesQueryVariables>(CourseGradingSchoolClassesDocument, options);
      }
export function useCourseGradingSchoolClassesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CourseGradingSchoolClassesQuery, Types.CourseGradingSchoolClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CourseGradingSchoolClassesQuery, Types.CourseGradingSchoolClassesQueryVariables>(CourseGradingSchoolClassesDocument, options);
        }
export function useCourseGradingSchoolClassesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CourseGradingSchoolClassesQuery, Types.CourseGradingSchoolClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CourseGradingSchoolClassesQuery, Types.CourseGradingSchoolClassesQueryVariables>(CourseGradingSchoolClassesDocument, options);
        }
export type CourseGradingSchoolClassesQueryHookResult = ReturnType<typeof useCourseGradingSchoolClassesQuery>;
export type CourseGradingSchoolClassesLazyQueryHookResult = ReturnType<typeof useCourseGradingSchoolClassesLazyQuery>;
export type CourseGradingSchoolClassesSuspenseQueryHookResult = ReturnType<typeof useCourseGradingSchoolClassesSuspenseQuery>;
export type CourseGradingSchoolClassesQueryResult = Apollo.QueryResult<Types.CourseGradingSchoolClassesQuery, Types.CourseGradingSchoolClassesQueryVariables>;
export const CourseOptionsDocument = gql`
    query CourseOptions($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: CourseFilter) {
  courses(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      id
      imageUrl
      thumbnailUrl
      name
    }
  }
}
    `;

/**
 * __useCourseOptionsQuery__
 *
 * To run a query within a React component, call `useCourseOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseOptionsQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCourseOptionsQuery(baseOptions?: Apollo.QueryHookOptions<Types.CourseOptionsQuery, Types.CourseOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CourseOptionsQuery, Types.CourseOptionsQueryVariables>(CourseOptionsDocument, options);
      }
export function useCourseOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CourseOptionsQuery, Types.CourseOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CourseOptionsQuery, Types.CourseOptionsQueryVariables>(CourseOptionsDocument, options);
        }
export function useCourseOptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CourseOptionsQuery, Types.CourseOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CourseOptionsQuery, Types.CourseOptionsQueryVariables>(CourseOptionsDocument, options);
        }
export type CourseOptionsQueryHookResult = ReturnType<typeof useCourseOptionsQuery>;
export type CourseOptionsLazyQueryHookResult = ReturnType<typeof useCourseOptionsLazyQuery>;
export type CourseOptionsSuspenseQueryHookResult = ReturnType<typeof useCourseOptionsSuspenseQuery>;
export type CourseOptionsQueryResult = Apollo.QueryResult<Types.CourseOptionsQuery, Types.CourseOptionsQueryVariables>;
export const CourseReportDocument = gql`
    query CourseReport($id: ID!) {
  courseReport(id: $id) {
    id
    uploadStatus
    url(options: {responseContentDisposition: "attachment"})
  }
}
    `;

/**
 * __useCourseReportQuery__
 *
 * To run a query within a React component, call `useCourseReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCourseReportQuery(baseOptions: Apollo.QueryHookOptions<Types.CourseReportQuery, Types.CourseReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CourseReportQuery, Types.CourseReportQueryVariables>(CourseReportDocument, options);
      }
export function useCourseReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CourseReportQuery, Types.CourseReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CourseReportQuery, Types.CourseReportQueryVariables>(CourseReportDocument, options);
        }
export function useCourseReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CourseReportQuery, Types.CourseReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CourseReportQuery, Types.CourseReportQueryVariables>(CourseReportDocument, options);
        }
export type CourseReportQueryHookResult = ReturnType<typeof useCourseReportQuery>;
export type CourseReportLazyQueryHookResult = ReturnType<typeof useCourseReportLazyQuery>;
export type CourseReportSuspenseQueryHookResult = ReturnType<typeof useCourseReportSuspenseQuery>;
export type CourseReportQueryResult = Apollo.QueryResult<Types.CourseReportQuery, Types.CourseReportQueryVariables>;
export const CoursesDocument = gql`
    query Courses($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: CourseFilter, $withCopies: Boolean) {
  courses(
    scope: $scope
    page: $page
    perPage: $perPage
    filter: $filter
    withCopies: $withCopies
  ) {
    nodesCount
    pagesCount
    nodes {
      metadata {
        alternativeTitles
        averageSalary
        jobZone
        onetCode
        outlook
      }
      archivedAt
      id
      description
      displayName
      imageUrl
      lessons {
        id
        imageUrl
        name
        step
        type
      }
      name
      pathway {
        id
        name
      }
      status
      thumbnailUrl
      type
      collection {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useCoursesQuery__
 *
 * To run a query within a React component, call `useCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *      withCopies: // value for 'withCopies'
 *   },
 * });
 */
export function useCoursesQuery(baseOptions?: Apollo.QueryHookOptions<Types.CoursesQuery, Types.CoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CoursesQuery, Types.CoursesQueryVariables>(CoursesDocument, options);
      }
export function useCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CoursesQuery, Types.CoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CoursesQuery, Types.CoursesQueryVariables>(CoursesDocument, options);
        }
export function useCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CoursesQuery, Types.CoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CoursesQuery, Types.CoursesQueryVariables>(CoursesDocument, options);
        }
export type CoursesQueryHookResult = ReturnType<typeof useCoursesQuery>;
export type CoursesLazyQueryHookResult = ReturnType<typeof useCoursesLazyQuery>;
export type CoursesSuspenseQueryHookResult = ReturnType<typeof useCoursesSuspenseQuery>;
export type CoursesQueryResult = Apollo.QueryResult<Types.CoursesQuery, Types.CoursesQueryVariables>;
export const EntitiesDocument = gql`
    query Entities($page: Int, $perPage: Int, $filter: EntityFilter) {
  entities(page: $page, perPage: $perPage, filter: $filter) {
    pagesCount
    nodesCount
    nodes {
      uuid
      gradingNeeded
      name
    }
  }
}
    `;

/**
 * __useEntitiesQuery__
 *
 * To run a query within a React component, call `useEntitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntitiesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useEntitiesQuery(baseOptions?: Apollo.QueryHookOptions<Types.EntitiesQuery, Types.EntitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.EntitiesQuery, Types.EntitiesQueryVariables>(EntitiesDocument, options);
      }
export function useEntitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.EntitiesQuery, Types.EntitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.EntitiesQuery, Types.EntitiesQueryVariables>(EntitiesDocument, options);
        }
export function useEntitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.EntitiesQuery, Types.EntitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.EntitiesQuery, Types.EntitiesQueryVariables>(EntitiesDocument, options);
        }
export type EntitiesQueryHookResult = ReturnType<typeof useEntitiesQuery>;
export type EntitiesLazyQueryHookResult = ReturnType<typeof useEntitiesLazyQuery>;
export type EntitiesSuspenseQueryHookResult = ReturnType<typeof useEntitiesSuspenseQuery>;
export type EntitiesQueryResult = Apollo.QueryResult<Types.EntitiesQuery, Types.EntitiesQueryVariables>;
export const EntitiesWithChildrenDocument = gql`
    query EntitiesWithChildren($page: Int, $perPage: Int, $filter: EntityFilter) {
  entities(page: $page, perPage: $perPage, filter: $filter) {
    pagesCount
    nodesCount
    nodes {
      uuid
      name
      children(page: 1, perPage: 1000) {
        nodes {
          uuid
          name
          children(page: 1, perPage: 1000) {
            nodes {
              uuid
              name
              children(page: 1, perPage: 1000) {
                nodes {
                  uuid
                  name
                  children(page: 1, perPage: 1000) {
                    nodes {
                      uuid
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useEntitiesWithChildrenQuery__
 *
 * To run a query within a React component, call `useEntitiesWithChildrenQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntitiesWithChildrenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntitiesWithChildrenQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useEntitiesWithChildrenQuery(baseOptions?: Apollo.QueryHookOptions<Types.EntitiesWithChildrenQuery, Types.EntitiesWithChildrenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.EntitiesWithChildrenQuery, Types.EntitiesWithChildrenQueryVariables>(EntitiesWithChildrenDocument, options);
      }
export function useEntitiesWithChildrenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.EntitiesWithChildrenQuery, Types.EntitiesWithChildrenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.EntitiesWithChildrenQuery, Types.EntitiesWithChildrenQueryVariables>(EntitiesWithChildrenDocument, options);
        }
export function useEntitiesWithChildrenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.EntitiesWithChildrenQuery, Types.EntitiesWithChildrenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.EntitiesWithChildrenQuery, Types.EntitiesWithChildrenQueryVariables>(EntitiesWithChildrenDocument, options);
        }
export type EntitiesWithChildrenQueryHookResult = ReturnType<typeof useEntitiesWithChildrenQuery>;
export type EntitiesWithChildrenLazyQueryHookResult = ReturnType<typeof useEntitiesWithChildrenLazyQuery>;
export type EntitiesWithChildrenSuspenseQueryHookResult = ReturnType<typeof useEntitiesWithChildrenSuspenseQuery>;
export type EntitiesWithChildrenQueryResult = Apollo.QueryResult<Types.EntitiesWithChildrenQuery, Types.EntitiesWithChildrenQueryVariables>;
export const EntityDocument = gql`
    query Entity($uuid: ID!) {
  entity(uuid: $uuid) {
    tags {
      id
      name
      type
    }
    catalogs {
      id
      name
      imageUrl
      service
      tracks {
        id
        name
        units {
          id
          name
        }
      }
    }
    name
    parent {
      name
      uuid
    }
    plans {
      id
      name
    }
    reportTypes
    settings {
      assessmentEnabled
      assessmentType
      onboardingEnabled
      opportunitiesEnabled
      postSecondaryApplicationsEnabled
      selfEvaluationEnabled
      classManagementEnabled
      schoolYearStartDate {
        day
        month
      }
    }
    standardSets {
      id
      name
    }
    regionName
    uuid
    dcIconUrl
    dcLogoUrl
    dlIconUrl
    dlLogoUrl
    welcomeMessage {
      dcStudent
      dcTeacher
      dlStudent
      dlTeacher
    }
  }
}
    `;

/**
 * __useEntityQuery__
 *
 * To run a query within a React component, call `useEntityQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntityQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useEntityQuery(baseOptions: Apollo.QueryHookOptions<Types.EntityQuery, Types.EntityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.EntityQuery, Types.EntityQueryVariables>(EntityDocument, options);
      }
export function useEntityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.EntityQuery, Types.EntityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.EntityQuery, Types.EntityQueryVariables>(EntityDocument, options);
        }
export function useEntitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.EntityQuery, Types.EntityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.EntityQuery, Types.EntityQueryVariables>(EntityDocument, options);
        }
export type EntityQueryHookResult = ReturnType<typeof useEntityQuery>;
export type EntityLazyQueryHookResult = ReturnType<typeof useEntityLazyQuery>;
export type EntitySuspenseQueryHookResult = ReturnType<typeof useEntitySuspenseQuery>;
export type EntityQueryResult = Apollo.QueryResult<Types.EntityQuery, Types.EntityQueryVariables>;
export const EntityPlansDocument = gql`
    query EntityPlans($uuid: ID!) {
  entity(uuid: $uuid) {
    uuid
    plans {
      id
      name
    }
  }
}
    `;

/**
 * __useEntityPlansQuery__
 *
 * To run a query within a React component, call `useEntityPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntityPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntityPlansQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useEntityPlansQuery(baseOptions: Apollo.QueryHookOptions<Types.EntityPlansQuery, Types.EntityPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.EntityPlansQuery, Types.EntityPlansQueryVariables>(EntityPlansDocument, options);
      }
export function useEntityPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.EntityPlansQuery, Types.EntityPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.EntityPlansQuery, Types.EntityPlansQueryVariables>(EntityPlansDocument, options);
        }
export function useEntityPlansSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.EntityPlansQuery, Types.EntityPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.EntityPlansQuery, Types.EntityPlansQueryVariables>(EntityPlansDocument, options);
        }
export type EntityPlansQueryHookResult = ReturnType<typeof useEntityPlansQuery>;
export type EntityPlansLazyQueryHookResult = ReturnType<typeof useEntityPlansLazyQuery>;
export type EntityPlansSuspenseQueryHookResult = ReturnType<typeof useEntityPlansSuspenseQuery>;
export type EntityPlansQueryResult = Apollo.QueryResult<Types.EntityPlansQuery, Types.EntityPlansQueryVariables>;
export const EntityWithChildrenDocument = gql`
    query EntityWithChildren($uuid: ID!, $page: Int, $perPage: Int, $filter: EntityFilter) {
  entity(uuid: $uuid) {
    name
    children(filter: $filter, page: $page, perPage: $perPage) {
      pagesCount
      nodesCount
      nodes {
        uuid
        gradingNeeded
        name
      }
    }
    uuid
  }
}
    `;

/**
 * __useEntityWithChildrenQuery__
 *
 * To run a query within a React component, call `useEntityWithChildrenQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntityWithChildrenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntityWithChildrenQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useEntityWithChildrenQuery(baseOptions: Apollo.QueryHookOptions<Types.EntityWithChildrenQuery, Types.EntityWithChildrenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.EntityWithChildrenQuery, Types.EntityWithChildrenQueryVariables>(EntityWithChildrenDocument, options);
      }
export function useEntityWithChildrenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.EntityWithChildrenQuery, Types.EntityWithChildrenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.EntityWithChildrenQuery, Types.EntityWithChildrenQueryVariables>(EntityWithChildrenDocument, options);
        }
export function useEntityWithChildrenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.EntityWithChildrenQuery, Types.EntityWithChildrenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.EntityWithChildrenQuery, Types.EntityWithChildrenQueryVariables>(EntityWithChildrenDocument, options);
        }
export type EntityWithChildrenQueryHookResult = ReturnType<typeof useEntityWithChildrenQuery>;
export type EntityWithChildrenLazyQueryHookResult = ReturnType<typeof useEntityWithChildrenLazyQuery>;
export type EntityWithChildrenSuspenseQueryHookResult = ReturnType<typeof useEntityWithChildrenSuspenseQuery>;
export type EntityWithChildrenQueryResult = Apollo.QueryResult<Types.EntityWithChildrenQuery, Types.EntityWithChildrenQueryVariables>;
export const ExtensionCoursesDocument = gql`
    query ExtensionCourses($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: CourseFilter) {
  courses(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
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
 * __useExtensionCoursesQuery__
 *
 * To run a query within a React component, call `useExtensionCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExtensionCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExtensionCoursesQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useExtensionCoursesQuery(baseOptions?: Apollo.QueryHookOptions<Types.ExtensionCoursesQuery, Types.ExtensionCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ExtensionCoursesQuery, Types.ExtensionCoursesQueryVariables>(ExtensionCoursesDocument, options);
      }
export function useExtensionCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ExtensionCoursesQuery, Types.ExtensionCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ExtensionCoursesQuery, Types.ExtensionCoursesQueryVariables>(ExtensionCoursesDocument, options);
        }
export function useExtensionCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ExtensionCoursesQuery, Types.ExtensionCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ExtensionCoursesQuery, Types.ExtensionCoursesQueryVariables>(ExtensionCoursesDocument, options);
        }
export type ExtensionCoursesQueryHookResult = ReturnType<typeof useExtensionCoursesQuery>;
export type ExtensionCoursesLazyQueryHookResult = ReturnType<typeof useExtensionCoursesLazyQuery>;
export type ExtensionCoursesSuspenseQueryHookResult = ReturnType<typeof useExtensionCoursesSuspenseQuery>;
export type ExtensionCoursesQueryResult = Apollo.QueryResult<Types.ExtensionCoursesQuery, Types.ExtensionCoursesQueryVariables>;
export const ExtensionFieldDocument = gql`
    query ExtensionField($id: ID!) {
  extensionField(id: $id) {
    archivedAt
    author {
      email
      firstName
      lastName
      username
      uuid
    }
    clusters {
      id
      name
    }
    courses {
      id
      name
    }
    description
    files {
      id
      filename
      url(options: {responseContentDisposition: "attachment"})
    }
    id
    imageUrl
    links {
      name
      url
    }
    name
    pathways {
      id
      name
    }
    publishedFrom
    publishedTo
    status
  }
}
    `;

/**
 * __useExtensionFieldQuery__
 *
 * To run a query within a React component, call `useExtensionFieldQuery` and pass it any options that fit your needs.
 * When your component renders, `useExtensionFieldQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExtensionFieldQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useExtensionFieldQuery(baseOptions: Apollo.QueryHookOptions<Types.ExtensionFieldQuery, Types.ExtensionFieldQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ExtensionFieldQuery, Types.ExtensionFieldQueryVariables>(ExtensionFieldDocument, options);
      }
export function useExtensionFieldLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ExtensionFieldQuery, Types.ExtensionFieldQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ExtensionFieldQuery, Types.ExtensionFieldQueryVariables>(ExtensionFieldDocument, options);
        }
export function useExtensionFieldSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ExtensionFieldQuery, Types.ExtensionFieldQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ExtensionFieldQuery, Types.ExtensionFieldQueryVariables>(ExtensionFieldDocument, options);
        }
export type ExtensionFieldQueryHookResult = ReturnType<typeof useExtensionFieldQuery>;
export type ExtensionFieldLazyQueryHookResult = ReturnType<typeof useExtensionFieldLazyQuery>;
export type ExtensionFieldSuspenseQueryHookResult = ReturnType<typeof useExtensionFieldSuspenseQuery>;
export type ExtensionFieldQueryResult = Apollo.QueryResult<Types.ExtensionFieldQuery, Types.ExtensionFieldQueryVariables>;
export const ExtensionFieldsDocument = gql`
    query ExtensionFields($page: Int, $perPage: Int, $filter: ExtensionFieldFilter, $scope: ArchivableStatus) {
  extensionFields(page: $page, perPage: $perPage, filter: $filter, scope: $scope) {
    nodes {
      archivedAt
      author {
        email
        firstName
        lastName
        username
        uuid
      }
      clusters {
        id
        name
      }
      courses {
        id
        name
      }
      description
      id
      imageUrl
      name
      pathways {
        id
        name
      }
      publishedFrom
      publishedTo
      status
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useExtensionFieldsQuery__
 *
 * To run a query within a React component, call `useExtensionFieldsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExtensionFieldsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExtensionFieldsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *      scope: // value for 'scope'
 *   },
 * });
 */
export function useExtensionFieldsQuery(baseOptions?: Apollo.QueryHookOptions<Types.ExtensionFieldsQuery, Types.ExtensionFieldsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ExtensionFieldsQuery, Types.ExtensionFieldsQueryVariables>(ExtensionFieldsDocument, options);
      }
export function useExtensionFieldsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ExtensionFieldsQuery, Types.ExtensionFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ExtensionFieldsQuery, Types.ExtensionFieldsQueryVariables>(ExtensionFieldsDocument, options);
        }
export function useExtensionFieldsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ExtensionFieldsQuery, Types.ExtensionFieldsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ExtensionFieldsQuery, Types.ExtensionFieldsQueryVariables>(ExtensionFieldsDocument, options);
        }
export type ExtensionFieldsQueryHookResult = ReturnType<typeof useExtensionFieldsQuery>;
export type ExtensionFieldsLazyQueryHookResult = ReturnType<typeof useExtensionFieldsLazyQuery>;
export type ExtensionFieldsSuspenseQueryHookResult = ReturnType<typeof useExtensionFieldsSuspenseQuery>;
export type ExtensionFieldsQueryResult = Apollo.QueryResult<Types.ExtensionFieldsQuery, Types.ExtensionFieldsQueryVariables>;
export const ExtensionFieldsToAssignDocument = gql`
    query ExtensionFieldsToAssign($page: Int, $perPage: Int, $filter: ExtensionFieldFilter, $scope: ArchivableStatus) {
  extensionFields(page: $page, perPage: $perPage, filter: $filter, scope: $scope) {
    nodes {
      id
      name
      publishedFrom
      publishedTo
      status
    }
  }
}
    `;

/**
 * __useExtensionFieldsToAssignQuery__
 *
 * To run a query within a React component, call `useExtensionFieldsToAssignQuery` and pass it any options that fit your needs.
 * When your component renders, `useExtensionFieldsToAssignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExtensionFieldsToAssignQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *      scope: // value for 'scope'
 *   },
 * });
 */
export function useExtensionFieldsToAssignQuery(baseOptions?: Apollo.QueryHookOptions<Types.ExtensionFieldsToAssignQuery, Types.ExtensionFieldsToAssignQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ExtensionFieldsToAssignQuery, Types.ExtensionFieldsToAssignQueryVariables>(ExtensionFieldsToAssignDocument, options);
      }
export function useExtensionFieldsToAssignLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ExtensionFieldsToAssignQuery, Types.ExtensionFieldsToAssignQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ExtensionFieldsToAssignQuery, Types.ExtensionFieldsToAssignQueryVariables>(ExtensionFieldsToAssignDocument, options);
        }
export function useExtensionFieldsToAssignSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ExtensionFieldsToAssignQuery, Types.ExtensionFieldsToAssignQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ExtensionFieldsToAssignQuery, Types.ExtensionFieldsToAssignQueryVariables>(ExtensionFieldsToAssignDocument, options);
        }
export type ExtensionFieldsToAssignQueryHookResult = ReturnType<typeof useExtensionFieldsToAssignQuery>;
export type ExtensionFieldsToAssignLazyQueryHookResult = ReturnType<typeof useExtensionFieldsToAssignLazyQuery>;
export type ExtensionFieldsToAssignSuspenseQueryHookResult = ReturnType<typeof useExtensionFieldsToAssignSuspenseQuery>;
export type ExtensionFieldsToAssignQueryResult = Apollo.QueryResult<Types.ExtensionFieldsToAssignQuery, Types.ExtensionFieldsToAssignQueryVariables>;
export const ExternalPresentationDocument = gql`
    query ExternalPresentation($id: ID!) {
  externalPresentation(id: $id) {
    archivedAt
    displayName
    isExpandable
    id
    name
    source
  }
}
    `;

/**
 * __useExternalPresentationQuery__
 *
 * To run a query within a React component, call `useExternalPresentationQuery` and pass it any options that fit your needs.
 * When your component renders, `useExternalPresentationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExternalPresentationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useExternalPresentationQuery(baseOptions: Apollo.QueryHookOptions<Types.ExternalPresentationQuery, Types.ExternalPresentationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ExternalPresentationQuery, Types.ExternalPresentationQueryVariables>(ExternalPresentationDocument, options);
      }
export function useExternalPresentationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ExternalPresentationQuery, Types.ExternalPresentationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ExternalPresentationQuery, Types.ExternalPresentationQueryVariables>(ExternalPresentationDocument, options);
        }
export function useExternalPresentationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ExternalPresentationQuery, Types.ExternalPresentationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ExternalPresentationQuery, Types.ExternalPresentationQueryVariables>(ExternalPresentationDocument, options);
        }
export type ExternalPresentationQueryHookResult = ReturnType<typeof useExternalPresentationQuery>;
export type ExternalPresentationLazyQueryHookResult = ReturnType<typeof useExternalPresentationLazyQuery>;
export type ExternalPresentationSuspenseQueryHookResult = ReturnType<typeof useExternalPresentationSuspenseQuery>;
export type ExternalPresentationQueryResult = Apollo.QueryResult<Types.ExternalPresentationQuery, Types.ExternalPresentationQueryVariables>;
export const ExternalPresentationsLessonsDocument = gql`
    query ExternalPresentationsLessons($id: ID!) {
  externalPresentation(id: $id) {
    id
    lessons {
      id
      name
    }
  }
}
    `;

/**
 * __useExternalPresentationsLessonsQuery__
 *
 * To run a query within a React component, call `useExternalPresentationsLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExternalPresentationsLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExternalPresentationsLessonsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useExternalPresentationsLessonsQuery(baseOptions: Apollo.QueryHookOptions<Types.ExternalPresentationsLessonsQuery, Types.ExternalPresentationsLessonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ExternalPresentationsLessonsQuery, Types.ExternalPresentationsLessonsQueryVariables>(ExternalPresentationsLessonsDocument, options);
      }
export function useExternalPresentationsLessonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ExternalPresentationsLessonsQuery, Types.ExternalPresentationsLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ExternalPresentationsLessonsQuery, Types.ExternalPresentationsLessonsQueryVariables>(ExternalPresentationsLessonsDocument, options);
        }
export function useExternalPresentationsLessonsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ExternalPresentationsLessonsQuery, Types.ExternalPresentationsLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ExternalPresentationsLessonsQuery, Types.ExternalPresentationsLessonsQueryVariables>(ExternalPresentationsLessonsDocument, options);
        }
export type ExternalPresentationsLessonsQueryHookResult = ReturnType<typeof useExternalPresentationsLessonsQuery>;
export type ExternalPresentationsLessonsLazyQueryHookResult = ReturnType<typeof useExternalPresentationsLessonsLazyQuery>;
export type ExternalPresentationsLessonsSuspenseQueryHookResult = ReturnType<typeof useExternalPresentationsLessonsSuspenseQuery>;
export type ExternalPresentationsLessonsQueryResult = Apollo.QueryResult<Types.ExternalPresentationsLessonsQuery, Types.ExternalPresentationsLessonsQueryVariables>;
export const ExternalPresentationsDocument = gql`
    query ExternalPresentations($scope: ArchivableStatus, $filter: ExternalPresentationFilter, $page: Int, $perPage: Int) {
  externalPresentations(
    scope: $scope
    filter: $filter
    page: $page
    perPage: $perPage
  ) {
    nodes {
      archivedAt
      displayName
      id
      name
      source
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useExternalPresentationsQuery__
 *
 * To run a query within a React component, call `useExternalPresentationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExternalPresentationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExternalPresentationsQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useExternalPresentationsQuery(baseOptions?: Apollo.QueryHookOptions<Types.ExternalPresentationsQuery, Types.ExternalPresentationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ExternalPresentationsQuery, Types.ExternalPresentationsQueryVariables>(ExternalPresentationsDocument, options);
      }
export function useExternalPresentationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ExternalPresentationsQuery, Types.ExternalPresentationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ExternalPresentationsQuery, Types.ExternalPresentationsQueryVariables>(ExternalPresentationsDocument, options);
        }
export function useExternalPresentationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ExternalPresentationsQuery, Types.ExternalPresentationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ExternalPresentationsQuery, Types.ExternalPresentationsQueryVariables>(ExternalPresentationsDocument, options);
        }
export type ExternalPresentationsQueryHookResult = ReturnType<typeof useExternalPresentationsQuery>;
export type ExternalPresentationsLazyQueryHookResult = ReturnType<typeof useExternalPresentationsLazyQuery>;
export type ExternalPresentationsSuspenseQueryHookResult = ReturnType<typeof useExternalPresentationsSuspenseQuery>;
export type ExternalPresentationsQueryResult = Apollo.QueryResult<Types.ExternalPresentationsQuery, Types.ExternalPresentationsQueryVariables>;
export const UserInstitutionDocument = gql`
    query UserInstitution($id: ID!, $track: Boolean) {
  institution(id: $id, track: $track) {
    id
    type
    name
    sizeType
    sizeDescription
    cost
    commonAppApplicationUrl
    imageUrl
    thumbnailUrl
    address {
      street
      city
      zip
      state
      stateCode
      area {
        kind
        type
      }
    }
    admissionRate
    satMathMin
    satMathMax
    satReadingMin
    satReadingMax
    actMin
    actMax
    studentFacultyRatio
    commonAppEnabled
    dates {
      deadlineDate
      decisionType
      term
    }
    degrees
    contact {
      phone
      urlAdmissions
      urlApplications
      urlFinancialAid
      urlNetPriceCalculator
      urlGeneral
    }
    isIpeds
  }
}
    `;

/**
 * __useUserInstitutionQuery__
 *
 * To run a query within a React component, call `useUserInstitutionQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInstitutionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInstitutionQuery({
 *   variables: {
 *      id: // value for 'id'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useUserInstitutionQuery(baseOptions: Apollo.QueryHookOptions<Types.UserInstitutionQuery, Types.UserInstitutionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserInstitutionQuery, Types.UserInstitutionQueryVariables>(UserInstitutionDocument, options);
      }
export function useUserInstitutionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserInstitutionQuery, Types.UserInstitutionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserInstitutionQuery, Types.UserInstitutionQueryVariables>(UserInstitutionDocument, options);
        }
export function useUserInstitutionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserInstitutionQuery, Types.UserInstitutionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserInstitutionQuery, Types.UserInstitutionQueryVariables>(UserInstitutionDocument, options);
        }
export type UserInstitutionQueryHookResult = ReturnType<typeof useUserInstitutionQuery>;
export type UserInstitutionLazyQueryHookResult = ReturnType<typeof useUserInstitutionLazyQuery>;
export type UserInstitutionSuspenseQueryHookResult = ReturnType<typeof useUserInstitutionSuspenseQuery>;
export type UserInstitutionQueryResult = Apollo.QueryResult<Types.UserInstitutionQuery, Types.UserInstitutionQueryVariables>;
export const UserInstitutionsDocument = gql`
    query UserInstitutions($page: Int, $perPage: Int, $filter: UserInstitutionFilter) {
  institutions(page: $page, perPage: $perPage, filter: $filter) {
    nodes {
      type
      sizeType
      sizeDescription
      commonAppEnabled
      cost
      thumbnailUrl
      id
      imageUrl
      name
      address {
        city
        stateCode
      }
    }
    pagesCount
  }
}
    `;

/**
 * __useUserInstitutionsQuery__
 *
 * To run a query within a React component, call `useUserInstitutionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInstitutionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInstitutionsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUserInstitutionsQuery(baseOptions?: Apollo.QueryHookOptions<Types.UserInstitutionsQuery, Types.UserInstitutionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserInstitutionsQuery, Types.UserInstitutionsQueryVariables>(UserInstitutionsDocument, options);
      }
export function useUserInstitutionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserInstitutionsQuery, Types.UserInstitutionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserInstitutionsQuery, Types.UserInstitutionsQueryVariables>(UserInstitutionsDocument, options);
        }
export function useUserInstitutionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserInstitutionsQuery, Types.UserInstitutionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserInstitutionsQuery, Types.UserInstitutionsQueryVariables>(UserInstitutionsDocument, options);
        }
export type UserInstitutionsQueryHookResult = ReturnType<typeof useUserInstitutionsQuery>;
export type UserInstitutionsLazyQueryHookResult = ReturnType<typeof useUserInstitutionsLazyQuery>;
export type UserInstitutionsSuspenseQueryHookResult = ReturnType<typeof useUserInstitutionsSuspenseQuery>;
export type UserInstitutionsQueryResult = Apollo.QueryResult<Types.UserInstitutionsQuery, Types.UserInstitutionsQueryVariables>;
export const LessonDocument = gql`
    query Lesson($id: ID!, $track: Boolean) {
  lesson(id: $id, track: $track) {
    archivedAt
    badges {
      id
      name
      imageUrl
    }
    assignments {
      assetName
      name: assetName
      description
      displayName
      id
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
        description
        hasAlignedStatements
      }
      step
    }
    attachments {
      description
      displayName
      files {
        filename
        id
        url(options: {responseContentDisposition: "attachment"})
      }
      id
      name
      step
    }
    checkInQuestions {
      id
      question
      step
    }
    checkInGroups {
      displayName
      id
      name
      questions {
        id
        question
      }
      step
    }
    description {
      introduction
      goal
      role
      audience
      situation
    }
    hasPresentation
    id
    imageUrl
    name
    externalPresentations {
      displayName
      isExpandable
      id
      name
      source
      step
    }
    researchLinks {
      author
      displayName
      id
      name
      resourceLink
      sourceName
      step
    }
    texts {
      content
      displayName
      id
      name
      step
    }
    thumbnailUrl
    type
    videos {
      description
      displayName
      filename
      id
      name
      url
      step
    }
    vocabularies {
      definition
      id
      step
      term
      name: term
    }
    careerReviewSurvey {
      questions {
        answer
        id
        options {
          option
          step
        }
        question
        type
      }
    }
  }
}
    `;

/**
 * __useLessonQuery__
 *
 * To run a query within a React component, call `useLessonQuery` and pass it any options that fit your needs.
 * When your component renders, `useLessonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLessonQuery({
 *   variables: {
 *      id: // value for 'id'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useLessonQuery(baseOptions: Apollo.QueryHookOptions<Types.LessonQuery, Types.LessonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.LessonQuery, Types.LessonQueryVariables>(LessonDocument, options);
      }
export function useLessonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.LessonQuery, Types.LessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.LessonQuery, Types.LessonQueryVariables>(LessonDocument, options);
        }
export function useLessonSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.LessonQuery, Types.LessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.LessonQuery, Types.LessonQueryVariables>(LessonDocument, options);
        }
export type LessonQueryHookResult = ReturnType<typeof useLessonQuery>;
export type LessonLazyQueryHookResult = ReturnType<typeof useLessonLazyQuery>;
export type LessonSuspenseQueryHookResult = ReturnType<typeof useLessonSuspenseQuery>;
export type LessonQueryResult = Apollo.QueryResult<Types.LessonQuery, Types.LessonQueryVariables>;
export const LessonCoursesDocument = gql`
    query LessonCourses($id: ID!) {
  lesson(id: $id) {
    courses {
      id
      name
    }
  }
}
    `;

/**
 * __useLessonCoursesQuery__
 *
 * To run a query within a React component, call `useLessonCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLessonCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLessonCoursesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLessonCoursesQuery(baseOptions: Apollo.QueryHookOptions<Types.LessonCoursesQuery, Types.LessonCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.LessonCoursesQuery, Types.LessonCoursesQueryVariables>(LessonCoursesDocument, options);
      }
export function useLessonCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.LessonCoursesQuery, Types.LessonCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.LessonCoursesQuery, Types.LessonCoursesQueryVariables>(LessonCoursesDocument, options);
        }
export function useLessonCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.LessonCoursesQuery, Types.LessonCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.LessonCoursesQuery, Types.LessonCoursesQueryVariables>(LessonCoursesDocument, options);
        }
export type LessonCoursesQueryHookResult = ReturnType<typeof useLessonCoursesQuery>;
export type LessonCoursesLazyQueryHookResult = ReturnType<typeof useLessonCoursesLazyQuery>;
export type LessonCoursesSuspenseQueryHookResult = ReturnType<typeof useLessonCoursesSuspenseQuery>;
export type LessonCoursesQueryResult = Apollo.QueryResult<Types.LessonCoursesQuery, Types.LessonCoursesQueryVariables>;
export const LessonExtensionsDocument = gql`
    query LessonExtensions($lessonId: ID!, $track: Boolean) {
  lesson(id: $lessonId, track: $track) {
    extensionFields {
      description
      files {
        id
        filename
        url(options: {responseContentDisposition: "attachment"})
      }
      id
      imageUrl
      links {
        name
        url
      }
      name
    }
  }
}
    `;

/**
 * __useLessonExtensionsQuery__
 *
 * To run a query within a React component, call `useLessonExtensionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLessonExtensionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLessonExtensionsQuery({
 *   variables: {
 *      lessonId: // value for 'lessonId'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useLessonExtensionsQuery(baseOptions: Apollo.QueryHookOptions<Types.LessonExtensionsQuery, Types.LessonExtensionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.LessonExtensionsQuery, Types.LessonExtensionsQueryVariables>(LessonExtensionsDocument, options);
      }
export function useLessonExtensionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.LessonExtensionsQuery, Types.LessonExtensionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.LessonExtensionsQuery, Types.LessonExtensionsQueryVariables>(LessonExtensionsDocument, options);
        }
export function useLessonExtensionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.LessonExtensionsQuery, Types.LessonExtensionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.LessonExtensionsQuery, Types.LessonExtensionsQueryVariables>(LessonExtensionsDocument, options);
        }
export type LessonExtensionsQueryHookResult = ReturnType<typeof useLessonExtensionsQuery>;
export type LessonExtensionsLazyQueryHookResult = ReturnType<typeof useLessonExtensionsLazyQuery>;
export type LessonExtensionsSuspenseQueryHookResult = ReturnType<typeof useLessonExtensionsSuspenseQuery>;
export type LessonExtensionsQueryResult = Apollo.QueryResult<Types.LessonExtensionsQuery, Types.LessonExtensionsQueryVariables>;
export const LessonsDocument = gql`
    query Lessons($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: LessonFilter) {
  lessons(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      id
      imageUrl
      name
      thumbnailUrl
      type
    }
  }
}
    `;

/**
 * __useLessonsQuery__
 *
 * To run a query within a React component, call `useLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLessonsQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useLessonsQuery(baseOptions?: Apollo.QueryHookOptions<Types.LessonsQuery, Types.LessonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.LessonsQuery, Types.LessonsQueryVariables>(LessonsDocument, options);
      }
export function useLessonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.LessonsQuery, Types.LessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.LessonsQuery, Types.LessonsQueryVariables>(LessonsDocument, options);
        }
export function useLessonsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.LessonsQuery, Types.LessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.LessonsQuery, Types.LessonsQueryVariables>(LessonsDocument, options);
        }
export type LessonsQueryHookResult = ReturnType<typeof useLessonsQuery>;
export type LessonsLazyQueryHookResult = ReturnType<typeof useLessonsLazyQuery>;
export type LessonsSuspenseQueryHookResult = ReturnType<typeof useLessonsSuspenseQuery>;
export type LessonsQueryResult = Apollo.QueryResult<Types.LessonsQuery, Types.LessonsQueryVariables>;
export const UserOpportunitiesDocument = gql`
    query UserOpportunities($page: Int, $perPage: Int, $filter: OpportunityFilter) {
  opportunities(page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      id
      createdAt
      name
      opportunityType
      periodEnd
      periodStart
      deadline
      visibilityScope
      hasPendingApplications
      imageUrl
      thumbnailUrl
      entities {
        uuid
      }
      partner {
        id
        name
      }
      pathways {
        name
      }
      imageFitToContainer
    }
  }
}
    `;

/**
 * __useUserOpportunitiesQuery__
 *
 * To run a query within a React component, call `useUserOpportunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserOpportunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserOpportunitiesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUserOpportunitiesQuery(baseOptions?: Apollo.QueryHookOptions<Types.UserOpportunitiesQuery, Types.UserOpportunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserOpportunitiesQuery, Types.UserOpportunitiesQueryVariables>(UserOpportunitiesDocument, options);
      }
export function useUserOpportunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserOpportunitiesQuery, Types.UserOpportunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserOpportunitiesQuery, Types.UserOpportunitiesQueryVariables>(UserOpportunitiesDocument, options);
        }
export function useUserOpportunitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserOpportunitiesQuery, Types.UserOpportunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserOpportunitiesQuery, Types.UserOpportunitiesQueryVariables>(UserOpportunitiesDocument, options);
        }
export type UserOpportunitiesQueryHookResult = ReturnType<typeof useUserOpportunitiesQuery>;
export type UserOpportunitiesLazyQueryHookResult = ReturnType<typeof useUserOpportunitiesLazyQuery>;
export type UserOpportunitiesSuspenseQueryHookResult = ReturnType<typeof useUserOpportunitiesSuspenseQuery>;
export type UserOpportunitiesQueryResult = Apollo.QueryResult<Types.UserOpportunitiesQuery, Types.UserOpportunitiesQueryVariables>;
export const UserOpportunityDocument = gql`
    query UserOpportunity($id: ID!, $page: Int, $perPage: Int, $filter: OpportunityApplicationFilter, $track: Boolean) {
  opportunity(id: $id, track: $track) {
    id
    name
    automaticAcceptance
    availableSpots
    creditsOutcomes
    description
    imageUrl
    location
    opportunityType
    pathways {
      id
      name
    }
    salaryInformation
    tags
    deadline
    periodEnd
    periodStart
    applications(page: $page, perPage: $perPage, filter: $filter) {
      nodes {
        id
        appliedAt
        updatedAt
        status
        student {
          uuid
          fullName
          schoolClasses {
            uuid
            name
          }
        }
      }
    }
    entities {
      uuid
      name
    }
    visibilityScope
    hasPendingApplications
    virtualInternship {
      id
    }
    partner {
      id
      name
    }
    imageFitToContainer
    thumbnailUrl
  }
}
    `;

/**
 * __useUserOpportunityQuery__
 *
 * To run a query within a React component, call `useUserOpportunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserOpportunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserOpportunityQuery({
 *   variables: {
 *      id: // value for 'id'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useUserOpportunityQuery(baseOptions: Apollo.QueryHookOptions<Types.UserOpportunityQuery, Types.UserOpportunityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserOpportunityQuery, Types.UserOpportunityQueryVariables>(UserOpportunityDocument, options);
      }
export function useUserOpportunityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserOpportunityQuery, Types.UserOpportunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserOpportunityQuery, Types.UserOpportunityQueryVariables>(UserOpportunityDocument, options);
        }
export function useUserOpportunitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserOpportunityQuery, Types.UserOpportunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserOpportunityQuery, Types.UserOpportunityQueryVariables>(UserOpportunityDocument, options);
        }
export type UserOpportunityQueryHookResult = ReturnType<typeof useUserOpportunityQuery>;
export type UserOpportunityLazyQueryHookResult = ReturnType<typeof useUserOpportunityLazyQuery>;
export type UserOpportunitySuspenseQueryHookResult = ReturnType<typeof useUserOpportunitySuspenseQuery>;
export type UserOpportunityQueryResult = Apollo.QueryResult<Types.UserOpportunityQuery, Types.UserOpportunityQueryVariables>;
export const CreateOpportunityDocument = gql`
    mutation CreateOpportunity($input: CreateOpportunityMutationInput!) {
  createOpportunity(input: $input) {
    opportunity {
      description
      name
      opportunityType
      pathways {
        id
        name
      }
      automaticAcceptance
      availableSpots
      creditsOutcomes
      entities {
        uuid
        name
      }
      visibilityScope
      imageUrl
      location
      tags
      salaryInformation
      periodStart
      periodEnd
      deadline
      id
      partner {
        id
        name
      }
    }
  }
}
    `;
export type CreateOpportunityMutationFn = Apollo.MutationFunction<Types.CreateOpportunityMutation, Types.CreateOpportunityMutationVariables>;

/**
 * __useCreateOpportunityMutation__
 *
 * To run a mutation, you first call `useCreateOpportunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOpportunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOpportunityMutation, { data, loading, error }] = useCreateOpportunityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOpportunityMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateOpportunityMutation, Types.CreateOpportunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateOpportunityMutation, Types.CreateOpportunityMutationVariables>(CreateOpportunityDocument, options);
      }
export type CreateOpportunityMutationHookResult = ReturnType<typeof useCreateOpportunityMutation>;
export type CreateOpportunityMutationResult = Apollo.MutationResult<Types.CreateOpportunityMutation>;
export type CreateOpportunityMutationOptions = Apollo.BaseMutationOptions<Types.CreateOpportunityMutation, Types.CreateOpportunityMutationVariables>;
export const UpdateOpportunityDocument = gql`
    mutation UpdateOpportunity($input: UpdateOpportunityMutationInput!) {
  updateOpportunity(input: $input) {
    opportunity {
      id
      name
      automaticAcceptance
      availableSpots
      creditsOutcomes
      description
      imageUrl
      location
      opportunityType
      pathways {
        id
        name
      }
      entities {
        uuid
        name
      }
      salaryInformation
      tags
      deadline
      periodEnd
      periodStart
      visibilityScope
      partner {
        id
        name
      }
    }
  }
}
    `;
export type UpdateOpportunityMutationFn = Apollo.MutationFunction<Types.UpdateOpportunityMutation, Types.UpdateOpportunityMutationVariables>;

/**
 * __useUpdateOpportunityMutation__
 *
 * To run a mutation, you first call `useUpdateOpportunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOpportunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOpportunityMutation, { data, loading, error }] = useUpdateOpportunityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOpportunityMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateOpportunityMutation, Types.UpdateOpportunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateOpportunityMutation, Types.UpdateOpportunityMutationVariables>(UpdateOpportunityDocument, options);
      }
export type UpdateOpportunityMutationHookResult = ReturnType<typeof useUpdateOpportunityMutation>;
export type UpdateOpportunityMutationResult = Apollo.MutationResult<Types.UpdateOpportunityMutation>;
export type UpdateOpportunityMutationOptions = Apollo.BaseMutationOptions<Types.UpdateOpportunityMutation, Types.UpdateOpportunityMutationVariables>;
export const ArchiveOpportunityDocument = gql`
    mutation ArchiveOpportunity($input: ArchiveOpportunityMutationInput!) {
  archiveOpportunity(input: $input) {
    opportunity {
      id
    }
  }
}
    `;
export type ArchiveOpportunityMutationFn = Apollo.MutationFunction<Types.ArchiveOpportunityMutation, Types.ArchiveOpportunityMutationVariables>;

/**
 * __useArchiveOpportunityMutation__
 *
 * To run a mutation, you first call `useArchiveOpportunityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveOpportunityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveOpportunityMutation, { data, loading, error }] = useArchiveOpportunityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useArchiveOpportunityMutation(baseOptions?: Apollo.MutationHookOptions<Types.ArchiveOpportunityMutation, Types.ArchiveOpportunityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ArchiveOpportunityMutation, Types.ArchiveOpportunityMutationVariables>(ArchiveOpportunityDocument, options);
      }
export type ArchiveOpportunityMutationHookResult = ReturnType<typeof useArchiveOpportunityMutation>;
export type ArchiveOpportunityMutationResult = Apollo.MutationResult<Types.ArchiveOpportunityMutation>;
export type ArchiveOpportunityMutationOptions = Apollo.BaseMutationOptions<Types.ArchiveOpportunityMutation, Types.ArchiveOpportunityMutationVariables>;
export const OpportunityApplicationsDocument = gql`
    query OpportunityApplications($id: ID!, $page: Int, $perPage: Int, $filter: OpportunityApplicationFilter) {
  opportunity(id: $id) {
    filteredApplications: applications(
      page: $page
      perPage: $perPage
      filter: $filter
    ) {
      pagesCount
      nodesCount
      nodes {
        answers {
          id
          answer
          opportunityQuestionId
        }
        id
        appliedAt
        updatedAt
        status
        student {
          uuid
          fullName
          schoolClasses {
            uuid
            name
          }
        }
      }
    }
    applications(page: $page, perPage: $perPage) {
      pagesCount
      nodesCount
      nodes {
        lastChangedBy {
          uuid
          name
        }
        answers {
          id
          answer
          opportunityQuestionId
        }
        id
        appliedAt
        updatedAt
        status
        student {
          uuid
          fullName
        }
      }
    }
    automaticAcceptance
    hasPendingApplications
    id
    name
    opportunityType
    questions {
      id
      question
      step
    }
  }
}
    `;

/**
 * __useOpportunityApplicationsQuery__
 *
 * To run a query within a React component, call `useOpportunityApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityApplicationsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useOpportunityApplicationsQuery(baseOptions: Apollo.QueryHookOptions<Types.OpportunityApplicationsQuery, Types.OpportunityApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.OpportunityApplicationsQuery, Types.OpportunityApplicationsQueryVariables>(OpportunityApplicationsDocument, options);
      }
export function useOpportunityApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.OpportunityApplicationsQuery, Types.OpportunityApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.OpportunityApplicationsQuery, Types.OpportunityApplicationsQueryVariables>(OpportunityApplicationsDocument, options);
        }
export function useOpportunityApplicationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.OpportunityApplicationsQuery, Types.OpportunityApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.OpportunityApplicationsQuery, Types.OpportunityApplicationsQueryVariables>(OpportunityApplicationsDocument, options);
        }
export type OpportunityApplicationsQueryHookResult = ReturnType<typeof useOpportunityApplicationsQuery>;
export type OpportunityApplicationsLazyQueryHookResult = ReturnType<typeof useOpportunityApplicationsLazyQuery>;
export type OpportunityApplicationsSuspenseQueryHookResult = ReturnType<typeof useOpportunityApplicationsSuspenseQuery>;
export type OpportunityApplicationsQueryResult = Apollo.QueryResult<Types.OpportunityApplicationsQuery, Types.OpportunityApplicationsQueryVariables>;
export const OpportunityReportApplicationCountDocument = gql`
    query OpportunityReportApplicationCount($filter: OpportunityReportFilter) {
  reports {
    opportunityReport(filter: $filter) {
      clusterCounts {
        applicationsCount
        cluster {
          id
          name
        }
        pathwayApplicationCounts {
          pathway {
            id
            name
            cluster {
              id
              name
            }
          }
          applicationsCount
        }
      }
    }
  }
}
    `;

/**
 * __useOpportunityReportApplicationCountQuery__
 *
 * To run a query within a React component, call `useOpportunityReportApplicationCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityReportApplicationCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityReportApplicationCountQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useOpportunityReportApplicationCountQuery(baseOptions?: Apollo.QueryHookOptions<Types.OpportunityReportApplicationCountQuery, Types.OpportunityReportApplicationCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.OpportunityReportApplicationCountQuery, Types.OpportunityReportApplicationCountQueryVariables>(OpportunityReportApplicationCountDocument, options);
      }
export function useOpportunityReportApplicationCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.OpportunityReportApplicationCountQuery, Types.OpportunityReportApplicationCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.OpportunityReportApplicationCountQuery, Types.OpportunityReportApplicationCountQueryVariables>(OpportunityReportApplicationCountDocument, options);
        }
export function useOpportunityReportApplicationCountSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.OpportunityReportApplicationCountQuery, Types.OpportunityReportApplicationCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.OpportunityReportApplicationCountQuery, Types.OpportunityReportApplicationCountQueryVariables>(OpportunityReportApplicationCountDocument, options);
        }
export type OpportunityReportApplicationCountQueryHookResult = ReturnType<typeof useOpportunityReportApplicationCountQuery>;
export type OpportunityReportApplicationCountLazyQueryHookResult = ReturnType<typeof useOpportunityReportApplicationCountLazyQuery>;
export type OpportunityReportApplicationCountSuspenseQueryHookResult = ReturnType<typeof useOpportunityReportApplicationCountSuspenseQuery>;
export type OpportunityReportApplicationCountQueryResult = Apollo.QueryResult<Types.OpportunityReportApplicationCountQuery, Types.OpportunityReportApplicationCountQueryVariables>;
export const OpportunityReportCsvDocument = gql`
    query OpportunityReportCSV($id: ID!) {
  opportunityReport(id: $id) {
    id
    url(options: {responseContentDisposition: "attachment"})
    uploadStatus
  }
}
    `;

/**
 * __useOpportunityReportCsvQuery__
 *
 * To run a query within a React component, call `useOpportunityReportCsvQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityReportCsvQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityReportCsvQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOpportunityReportCsvQuery(baseOptions: Apollo.QueryHookOptions<Types.OpportunityReportCsvQuery, Types.OpportunityReportCsvQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.OpportunityReportCsvQuery, Types.OpportunityReportCsvQueryVariables>(OpportunityReportCsvDocument, options);
      }
export function useOpportunityReportCsvLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.OpportunityReportCsvQuery, Types.OpportunityReportCsvQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.OpportunityReportCsvQuery, Types.OpportunityReportCsvQueryVariables>(OpportunityReportCsvDocument, options);
        }
export function useOpportunityReportCsvSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.OpportunityReportCsvQuery, Types.OpportunityReportCsvQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.OpportunityReportCsvQuery, Types.OpportunityReportCsvQueryVariables>(OpportunityReportCsvDocument, options);
        }
export type OpportunityReportCsvQueryHookResult = ReturnType<typeof useOpportunityReportCsvQuery>;
export type OpportunityReportCsvLazyQueryHookResult = ReturnType<typeof useOpportunityReportCsvLazyQuery>;
export type OpportunityReportCsvSuspenseQueryHookResult = ReturnType<typeof useOpportunityReportCsvSuspenseQuery>;
export type OpportunityReportCsvQueryResult = Apollo.QueryResult<Types.OpportunityReportCsvQuery, Types.OpportunityReportCsvQueryVariables>;
export const OpportunityReportFiltersDocument = gql`
    query OpportunityReportFilters($filters: ReportFiltersFilter, $entityFilter: EntityFilter, $userFilter: UserFilter, $schoolClassFilter: SchoolClassFilter) {
  opportunityReportFilters(filters: $filters) {
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
 * __useOpportunityReportFiltersQuery__
 *
 * To run a query within a React component, call `useOpportunityReportFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityReportFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityReportFiltersQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      entityFilter: // value for 'entityFilter'
 *      userFilter: // value for 'userFilter'
 *      schoolClassFilter: // value for 'schoolClassFilter'
 *   },
 * });
 */
export function useOpportunityReportFiltersQuery(baseOptions?: Apollo.QueryHookOptions<Types.OpportunityReportFiltersQuery, Types.OpportunityReportFiltersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.OpportunityReportFiltersQuery, Types.OpportunityReportFiltersQueryVariables>(OpportunityReportFiltersDocument, options);
      }
export function useOpportunityReportFiltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.OpportunityReportFiltersQuery, Types.OpportunityReportFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.OpportunityReportFiltersQuery, Types.OpportunityReportFiltersQueryVariables>(OpportunityReportFiltersDocument, options);
        }
export function useOpportunityReportFiltersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.OpportunityReportFiltersQuery, Types.OpportunityReportFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.OpportunityReportFiltersQuery, Types.OpportunityReportFiltersQueryVariables>(OpportunityReportFiltersDocument, options);
        }
export type OpportunityReportFiltersQueryHookResult = ReturnType<typeof useOpportunityReportFiltersQuery>;
export type OpportunityReportFiltersLazyQueryHookResult = ReturnType<typeof useOpportunityReportFiltersLazyQuery>;
export type OpportunityReportFiltersSuspenseQueryHookResult = ReturnType<typeof useOpportunityReportFiltersSuspenseQuery>;
export type OpportunityReportFiltersQueryResult = Apollo.QueryResult<Types.OpportunityReportFiltersQuery, Types.OpportunityReportFiltersQueryVariables>;
export const OpportunityReportFullDataDocument = gql`
    query OpportunityReportFullData($filter: OpportunityReportFilter, $resultsFilter: OpportunityApplicationResultFilter, $page: Int, $perPage: Int) {
  reports {
    opportunityReport(filter: $filter) {
      results(filter: $resultsFilter, page: $page, perPage: $perPage) {
        nodesCount
        pagesCount
        nodes {
          applicationDeadline
          applicationStatus
          assignmentsSubmitted
          assignmentsToSubmit
          checkInsSubmitted
          checkInsToSubmit
          clusterNames
          isFavorite
          opportunityName
          opportunityPartnerNames
          opportunityType
          pathwayNames
          studentGradeLevel
          studentId
          studentName
          studentSisId
        }
      }
    }
  }
}
    `;

/**
 * __useOpportunityReportFullDataQuery__
 *
 * To run a query within a React component, call `useOpportunityReportFullDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityReportFullDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityReportFullDataQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      resultsFilter: // value for 'resultsFilter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useOpportunityReportFullDataQuery(baseOptions?: Apollo.QueryHookOptions<Types.OpportunityReportFullDataQuery, Types.OpportunityReportFullDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.OpportunityReportFullDataQuery, Types.OpportunityReportFullDataQueryVariables>(OpportunityReportFullDataDocument, options);
      }
export function useOpportunityReportFullDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.OpportunityReportFullDataQuery, Types.OpportunityReportFullDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.OpportunityReportFullDataQuery, Types.OpportunityReportFullDataQueryVariables>(OpportunityReportFullDataDocument, options);
        }
export function useOpportunityReportFullDataSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.OpportunityReportFullDataQuery, Types.OpportunityReportFullDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.OpportunityReportFullDataQuery, Types.OpportunityReportFullDataQueryVariables>(OpportunityReportFullDataDocument, options);
        }
export type OpportunityReportFullDataQueryHookResult = ReturnType<typeof useOpportunityReportFullDataQuery>;
export type OpportunityReportFullDataLazyQueryHookResult = ReturnType<typeof useOpportunityReportFullDataLazyQuery>;
export type OpportunityReportFullDataSuspenseQueryHookResult = ReturnType<typeof useOpportunityReportFullDataSuspenseQuery>;
export type OpportunityReportFullDataQueryResult = Apollo.QueryResult<Types.OpportunityReportFullDataQuery, Types.OpportunityReportFullDataQueryVariables>;
export const OpportunityReportSummaryDocument = gql`
    query OpportunityReportSummary($filter: OpportunityReportFilter) {
  reports {
    opportunityReport(filter: $filter) {
      studentsCount
      summary {
        opportunitiesCount
        virtualInternshipsCount
      }
    }
  }
}
    `;

/**
 * __useOpportunityReportSummaryQuery__
 *
 * To run a query within a React component, call `useOpportunityReportSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityReportSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityReportSummaryQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useOpportunityReportSummaryQuery(baseOptions?: Apollo.QueryHookOptions<Types.OpportunityReportSummaryQuery, Types.OpportunityReportSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.OpportunityReportSummaryQuery, Types.OpportunityReportSummaryQueryVariables>(OpportunityReportSummaryDocument, options);
      }
export function useOpportunityReportSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.OpportunityReportSummaryQuery, Types.OpportunityReportSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.OpportunityReportSummaryQuery, Types.OpportunityReportSummaryQueryVariables>(OpportunityReportSummaryDocument, options);
        }
export function useOpportunityReportSummarySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.OpportunityReportSummaryQuery, Types.OpportunityReportSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.OpportunityReportSummaryQuery, Types.OpportunityReportSummaryQueryVariables>(OpportunityReportSummaryDocument, options);
        }
export type OpportunityReportSummaryQueryHookResult = ReturnType<typeof useOpportunityReportSummaryQuery>;
export type OpportunityReportSummaryLazyQueryHookResult = ReturnType<typeof useOpportunityReportSummaryLazyQuery>;
export type OpportunityReportSummarySuspenseQueryHookResult = ReturnType<typeof useOpportunityReportSummarySuspenseQuery>;
export type OpportunityReportSummaryQueryResult = Apollo.QueryResult<Types.OpportunityReportSummaryQuery, Types.OpportunityReportSummaryQueryVariables>;
export const OpportunityReportTypesChartDocument = gql`
    query OpportunityReportTypesChart($filter: OpportunityReportFilter) {
  reports {
    opportunityReport(filter: $filter) {
      typeCounts {
        applicationsCount
        opportunityType
      }
    }
  }
}
    `;

/**
 * __useOpportunityReportTypesChartQuery__
 *
 * To run a query within a React component, call `useOpportunityReportTypesChartQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityReportTypesChartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityReportTypesChartQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useOpportunityReportTypesChartQuery(baseOptions?: Apollo.QueryHookOptions<Types.OpportunityReportTypesChartQuery, Types.OpportunityReportTypesChartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.OpportunityReportTypesChartQuery, Types.OpportunityReportTypesChartQueryVariables>(OpportunityReportTypesChartDocument, options);
      }
export function useOpportunityReportTypesChartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.OpportunityReportTypesChartQuery, Types.OpportunityReportTypesChartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.OpportunityReportTypesChartQuery, Types.OpportunityReportTypesChartQueryVariables>(OpportunityReportTypesChartDocument, options);
        }
export function useOpportunityReportTypesChartSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.OpportunityReportTypesChartQuery, Types.OpportunityReportTypesChartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.OpportunityReportTypesChartQuery, Types.OpportunityReportTypesChartQueryVariables>(OpportunityReportTypesChartDocument, options);
        }
export type OpportunityReportTypesChartQueryHookResult = ReturnType<typeof useOpportunityReportTypesChartQuery>;
export type OpportunityReportTypesChartLazyQueryHookResult = ReturnType<typeof useOpportunityReportTypesChartLazyQuery>;
export type OpportunityReportTypesChartSuspenseQueryHookResult = ReturnType<typeof useOpportunityReportTypesChartSuspenseQuery>;
export type OpportunityReportTypesChartQueryResult = Apollo.QueryResult<Types.OpportunityReportTypesChartQuery, Types.OpportunityReportTypesChartQueryVariables>;
export const PartnerOpportunitiesDocument = gql`
    query PartnerOpportunities($filter: OpportunityFilter, $page: Int, $perPage: Int) {
  opportunities(filter: $filter, page: $page, perPage: $perPage) {
    nodes {
      imageUrl
      thumbnailUrl
      name
      opportunityType
      visibilityScope
      id
      pathways {
        name
      }
      entities {
        name
        uuid
      }
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __usePartnerOpportunitiesQuery__
 *
 * To run a query within a React component, call `usePartnerOpportunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartnerOpportunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartnerOpportunitiesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function usePartnerOpportunitiesQuery(baseOptions?: Apollo.QueryHookOptions<Types.PartnerOpportunitiesQuery, Types.PartnerOpportunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PartnerOpportunitiesQuery, Types.PartnerOpportunitiesQueryVariables>(PartnerOpportunitiesDocument, options);
      }
export function usePartnerOpportunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PartnerOpportunitiesQuery, Types.PartnerOpportunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PartnerOpportunitiesQuery, Types.PartnerOpportunitiesQueryVariables>(PartnerOpportunitiesDocument, options);
        }
export function usePartnerOpportunitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PartnerOpportunitiesQuery, Types.PartnerOpportunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PartnerOpportunitiesQuery, Types.PartnerOpportunitiesQueryVariables>(PartnerOpportunitiesDocument, options);
        }
export type PartnerOpportunitiesQueryHookResult = ReturnType<typeof usePartnerOpportunitiesQuery>;
export type PartnerOpportunitiesLazyQueryHookResult = ReturnType<typeof usePartnerOpportunitiesLazyQuery>;
export type PartnerOpportunitiesSuspenseQueryHookResult = ReturnType<typeof usePartnerOpportunitiesSuspenseQuery>;
export type PartnerOpportunitiesQueryResult = Apollo.QueryResult<Types.PartnerOpportunitiesQuery, Types.PartnerOpportunitiesQueryVariables>;
export const UserPartnerOptionsDocument = gql`
    query UserPartnerOptions($page: Int, $perPage: Int, $filter: PartnerFilter) {
  partners(page: $page, perPage: $perPage, filter: $filter) {
    nodes {
      id
      name
      status
    }
    pagesCount
  }
}
    `;

/**
 * __useUserPartnerOptionsQuery__
 *
 * To run a query within a React component, call `useUserPartnerOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPartnerOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPartnerOptionsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUserPartnerOptionsQuery(baseOptions?: Apollo.QueryHookOptions<Types.UserPartnerOptionsQuery, Types.UserPartnerOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserPartnerOptionsQuery, Types.UserPartnerOptionsQueryVariables>(UserPartnerOptionsDocument, options);
      }
export function useUserPartnerOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserPartnerOptionsQuery, Types.UserPartnerOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserPartnerOptionsQuery, Types.UserPartnerOptionsQueryVariables>(UserPartnerOptionsDocument, options);
        }
export function useUserPartnerOptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserPartnerOptionsQuery, Types.UserPartnerOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserPartnerOptionsQuery, Types.UserPartnerOptionsQueryVariables>(UserPartnerOptionsDocument, options);
        }
export type UserPartnerOptionsQueryHookResult = ReturnType<typeof useUserPartnerOptionsQuery>;
export type UserPartnerOptionsLazyQueryHookResult = ReturnType<typeof useUserPartnerOptionsLazyQuery>;
export type UserPartnerOptionsSuspenseQueryHookResult = ReturnType<typeof useUserPartnerOptionsSuspenseQuery>;
export type UserPartnerOptionsQueryResult = Apollo.QueryResult<Types.UserPartnerOptionsQuery, Types.UserPartnerOptionsQueryVariables>;
export const PartnerOverviewDocument = gql`
    query PartnerOverview($id: ID!) {
  partner(id: $id) {
    about
    additionalUrls
    address
    canEdit
    coursesCount
    details
    email
    entities {
      uuid
    }
    id
    name
    isArchived
    opportunitiesCount
    opportunities {
      id
      name
    }
    pathways {
      id
    }
    phone
    status
    thumbnailUrl
    imageUrl
    imageFitToContainer
    url
    virtualInternshipsCount
    visibilityScope
    opportunities {
      id
      name
      opportunityType
      pathways {
        id
        name
      }
      imageUrl
      deadline
      periodStart
      periodEnd
      virtualInternship {
        roadmapItemsCount
        readinessSkillsLessons {
          id
        }
      }
      hasPendingApplications
    }
    courses {
      id
      name
      collection {
        name
      }
      pathway {
        name
      }
      thumbnailUrl
      imageUrl
      type
      description
      metadata {
        alternativeTitles
      }
    }
    documents {
      createdAt
      filename
      id
      submitter {
        uuid
        firstName
        lastName
      }
      url(options: {responseContentDisposition: "attachment"})
      previewUrl: url
    }
  }
}
    `;

/**
 * __usePartnerOverviewQuery__
 *
 * To run a query within a React component, call `usePartnerOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartnerOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartnerOverviewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePartnerOverviewQuery(baseOptions: Apollo.QueryHookOptions<Types.PartnerOverviewQuery, Types.PartnerOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PartnerOverviewQuery, Types.PartnerOverviewQueryVariables>(PartnerOverviewDocument, options);
      }
export function usePartnerOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PartnerOverviewQuery, Types.PartnerOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PartnerOverviewQuery, Types.PartnerOverviewQueryVariables>(PartnerOverviewDocument, options);
        }
export function usePartnerOverviewSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PartnerOverviewQuery, Types.PartnerOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PartnerOverviewQuery, Types.PartnerOverviewQueryVariables>(PartnerOverviewDocument, options);
        }
export type PartnerOverviewQueryHookResult = ReturnType<typeof usePartnerOverviewQuery>;
export type PartnerOverviewLazyQueryHookResult = ReturnType<typeof usePartnerOverviewLazyQuery>;
export type PartnerOverviewSuspenseQueryHookResult = ReturnType<typeof usePartnerOverviewSuspenseQuery>;
export type PartnerOverviewQueryResult = Apollo.QueryResult<Types.PartnerOverviewQuery, Types.PartnerOverviewQueryVariables>;
export const PartnersDocument = gql`
    query Partners($filter: PartnerFilter, $page: Int, $perPage: Int, $nameSortOrder: SortingOrder) {
  partners(
    filter: $filter
    page: $page
    perPage: $perPage
    nameSortOrder: $nameSortOrder
  ) {
    nodesCount
    pagesCount
    nodes {
      about
      additionalUrls
      address
      canEdit
      coursesCount
      details
      email
      id
      imageUrl
      imageFitToContainer
      isArchived
      name
      opportunitiesCount
      phone
      status
      thumbnailUrl
      url
      virtualInternshipsCount
      visibilityScope
    }
  }
}
    `;

/**
 * __usePartnersQuery__
 *
 * To run a query within a React component, call `usePartnersQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartnersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartnersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      nameSortOrder: // value for 'nameSortOrder'
 *   },
 * });
 */
export function usePartnersQuery(baseOptions?: Apollo.QueryHookOptions<Types.PartnersQuery, Types.PartnersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PartnersQuery, Types.PartnersQueryVariables>(PartnersDocument, options);
      }
export function usePartnersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PartnersQuery, Types.PartnersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PartnersQuery, Types.PartnersQueryVariables>(PartnersDocument, options);
        }
export function usePartnersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PartnersQuery, Types.PartnersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PartnersQuery, Types.PartnersQueryVariables>(PartnersDocument, options);
        }
export type PartnersQueryHookResult = ReturnType<typeof usePartnersQuery>;
export type PartnersLazyQueryHookResult = ReturnType<typeof usePartnersLazyQuery>;
export type PartnersSuspenseQueryHookResult = ReturnType<typeof usePartnersSuspenseQuery>;
export type PartnersQueryResult = Apollo.QueryResult<Types.PartnersQuery, Types.PartnersQueryVariables>;
export const PathwaysDocument = gql`
    query Pathways {
  pathways {
    id
    name
  }
}
    `;

/**
 * __usePathwaysQuery__
 *
 * To run a query within a React component, call `usePathwaysQuery` and pass it any options that fit your needs.
 * When your component renders, `usePathwaysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePathwaysQuery({
 *   variables: {
 *   },
 * });
 */
export function usePathwaysQuery(baseOptions?: Apollo.QueryHookOptions<Types.PathwaysQuery, Types.PathwaysQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PathwaysQuery, Types.PathwaysQueryVariables>(PathwaysDocument, options);
      }
export function usePathwaysLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PathwaysQuery, Types.PathwaysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PathwaysQuery, Types.PathwaysQueryVariables>(PathwaysDocument, options);
        }
export function usePathwaysSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PathwaysQuery, Types.PathwaysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PathwaysQuery, Types.PathwaysQueryVariables>(PathwaysDocument, options);
        }
export type PathwaysQueryHookResult = ReturnType<typeof usePathwaysQuery>;
export type PathwaysLazyQueryHookResult = ReturnType<typeof usePathwaysLazyQuery>;
export type PathwaysSuspenseQueryHookResult = ReturnType<typeof usePathwaysSuspenseQuery>;
export type PathwaysQueryResult = Apollo.QueryResult<Types.PathwaysQuery, Types.PathwaysQueryVariables>;
export const PlanDocument = gql`
    query Plan($id: ID!) {
  plan(id: $id) {
    archivedAt
    description
    id
    name
    groups {
      archivedAt
      description
      displayName
      id
      name
      step
      statements {
        id
        name
        step
      }
    }
  }
}
    `;

/**
 * __usePlanQuery__
 *
 * To run a query within a React component, call `usePlanQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlanQuery(baseOptions: Apollo.QueryHookOptions<Types.PlanQuery, Types.PlanQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PlanQuery, Types.PlanQueryVariables>(PlanDocument, options);
      }
export function usePlanLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PlanQuery, Types.PlanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PlanQuery, Types.PlanQueryVariables>(PlanDocument, options);
        }
export function usePlanSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PlanQuery, Types.PlanQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PlanQuery, Types.PlanQueryVariables>(PlanDocument, options);
        }
export type PlanQueryHookResult = ReturnType<typeof usePlanQuery>;
export type PlanLazyQueryHookResult = ReturnType<typeof usePlanLazyQuery>;
export type PlanSuspenseQueryHookResult = ReturnType<typeof usePlanSuspenseQuery>;
export type PlanQueryResult = Apollo.QueryResult<Types.PlanQuery, Types.PlanQueryVariables>;
export const PlanGroupDocument = gql`
    query PlanGroup($id: ID!) {
  planGroup(id: $id) {
    description
    displayName
    id
    name
    statements {
      archivedAt
      id
      name
      step
      isRequired
      question {
        text
        questionType
        options {
          option
          step
        }
      }
    }
  }
}
    `;

/**
 * __usePlanGroupQuery__
 *
 * To run a query within a React component, call `usePlanGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanGroupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlanGroupQuery(baseOptions: Apollo.QueryHookOptions<Types.PlanGroupQuery, Types.PlanGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PlanGroupQuery, Types.PlanGroupQueryVariables>(PlanGroupDocument, options);
      }
export function usePlanGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PlanGroupQuery, Types.PlanGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PlanGroupQuery, Types.PlanGroupQueryVariables>(PlanGroupDocument, options);
        }
export function usePlanGroupSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PlanGroupQuery, Types.PlanGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PlanGroupQuery, Types.PlanGroupQueryVariables>(PlanGroupDocument, options);
        }
export type PlanGroupQueryHookResult = ReturnType<typeof usePlanGroupQuery>;
export type PlanGroupLazyQueryHookResult = ReturnType<typeof usePlanGroupLazyQuery>;
export type PlanGroupSuspenseQueryHookResult = ReturnType<typeof usePlanGroupSuspenseQuery>;
export type PlanGroupQueryResult = Apollo.QueryResult<Types.PlanGroupQuery, Types.PlanGroupQueryVariables>;
export const PlanGroupsDocument = gql`
    query PlanGroups($page: Int, $perPage: Int, $scope: ArchivableStatus, $filter: PlanGroupFilter) {
  planGroups(page: $page, perPage: $perPage, scope: $scope, filter: $filter) {
    nodes {
      archivedAt
      description
      displayName
      id
      name
      statements {
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
 * __usePlanGroupsQuery__
 *
 * To run a query within a React component, call `usePlanGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanGroupsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      scope: // value for 'scope'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePlanGroupsQuery(baseOptions?: Apollo.QueryHookOptions<Types.PlanGroupsQuery, Types.PlanGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PlanGroupsQuery, Types.PlanGroupsQueryVariables>(PlanGroupsDocument, options);
      }
export function usePlanGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PlanGroupsQuery, Types.PlanGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PlanGroupsQuery, Types.PlanGroupsQueryVariables>(PlanGroupsDocument, options);
        }
export function usePlanGroupsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PlanGroupsQuery, Types.PlanGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PlanGroupsQuery, Types.PlanGroupsQueryVariables>(PlanGroupsDocument, options);
        }
export type PlanGroupsQueryHookResult = ReturnType<typeof usePlanGroupsQuery>;
export type PlanGroupsLazyQueryHookResult = ReturnType<typeof usePlanGroupsLazyQuery>;
export type PlanGroupsSuspenseQueryHookResult = ReturnType<typeof usePlanGroupsSuspenseQuery>;
export type PlanGroupsQueryResult = Apollo.QueryResult<Types.PlanGroupsQuery, Types.PlanGroupsQueryVariables>;
export const PlanReportDocument = gql`
    query PlanReport($id: ID!) {
  planReport(id: $id) {
    id
    uploadStatus
    url(options: {responseContentDisposition: "attachment"})
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
 *      id: // value for 'id'
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
export const PlansDocument = gql`
    query Plans($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: PlanFilter) {
  plans(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      description
      id
      name
      groups {
        id
        name
        statements {
          id
          name
        }
      }
    }
  }
}
    `;

/**
 * __usePlansQuery__
 *
 * To run a query within a React component, call `usePlansQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlansQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePlansQuery(baseOptions?: Apollo.QueryHookOptions<Types.PlansQuery, Types.PlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PlansQuery, Types.PlansQueryVariables>(PlansDocument, options);
      }
export function usePlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PlansQuery, Types.PlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PlansQuery, Types.PlansQueryVariables>(PlansDocument, options);
        }
export function usePlansSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PlansQuery, Types.PlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PlansQuery, Types.PlansQueryVariables>(PlansDocument, options);
        }
export type PlansQueryHookResult = ReturnType<typeof usePlansQuery>;
export type PlansLazyQueryHookResult = ReturnType<typeof usePlansLazyQuery>;
export type PlansSuspenseQueryHookResult = ReturnType<typeof usePlansSuspenseQuery>;
export type PlansQueryResult = Apollo.QueryResult<Types.PlansQuery, Types.PlansQueryVariables>;
export const PlansWithStatementAlignmentDocument = gql`
    query PlansWithStatementAlignment($rubricHeadingId: ID!, $page: Int, $perPage: Int) {
  plans(page: $page, perPage: $perPage) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      description
      id
      name
      groups {
        id
        name
        statements {
          id
          name
          isAligned(rubricHeadingId: $rubricHeadingId)
        }
      }
    }
  }
}
    `;

/**
 * __usePlansWithStatementAlignmentQuery__
 *
 * To run a query within a React component, call `usePlansWithStatementAlignmentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlansWithStatementAlignmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlansWithStatementAlignmentQuery({
 *   variables: {
 *      rubricHeadingId: // value for 'rubricHeadingId'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function usePlansWithStatementAlignmentQuery(baseOptions: Apollo.QueryHookOptions<Types.PlansWithStatementAlignmentQuery, Types.PlansWithStatementAlignmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PlansWithStatementAlignmentQuery, Types.PlansWithStatementAlignmentQueryVariables>(PlansWithStatementAlignmentDocument, options);
      }
export function usePlansWithStatementAlignmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PlansWithStatementAlignmentQuery, Types.PlansWithStatementAlignmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PlansWithStatementAlignmentQuery, Types.PlansWithStatementAlignmentQueryVariables>(PlansWithStatementAlignmentDocument, options);
        }
export function usePlansWithStatementAlignmentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PlansWithStatementAlignmentQuery, Types.PlansWithStatementAlignmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PlansWithStatementAlignmentQuery, Types.PlansWithStatementAlignmentQueryVariables>(PlansWithStatementAlignmentDocument, options);
        }
export type PlansWithStatementAlignmentQueryHookResult = ReturnType<typeof usePlansWithStatementAlignmentQuery>;
export type PlansWithStatementAlignmentLazyQueryHookResult = ReturnType<typeof usePlansWithStatementAlignmentLazyQuery>;
export type PlansWithStatementAlignmentSuspenseQueryHookResult = ReturnType<typeof usePlansWithStatementAlignmentSuspenseQuery>;
export type PlansWithStatementAlignmentQueryResult = Apollo.QueryResult<Types.PlansWithStatementAlignmentQuery, Types.PlansWithStatementAlignmentQueryVariables>;
export const ProductDocument = gql`
    query Product($id: ID!) {
  product(id: $id) {
    badges {
      id
      name
      imageUrl
    }
    archivedAt
    description
    displayName
    id
    name
    rubrics {
      id
      name
      description
    }
    rubricsUrl
    status
  }
}
    `;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<Types.ProductQuery, Types.ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProductQuery, Types.ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProductQuery, Types.ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProductQuery, Types.ProductQueryVariables>(ProductDocument, options);
        }
export function useProductSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProductQuery, Types.ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ProductQuery, Types.ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductSuspenseQueryHookResult = ReturnType<typeof useProductSuspenseQuery>;
export type ProductQueryResult = Apollo.QueryResult<Types.ProductQuery, Types.ProductQueryVariables>;
export const ProductTasksDocument = gql`
    query ProductTasks($id: ID!) {
  product(id: $id) {
    id
    tasks {
      id
      name
    }
  }
}
    `;

/**
 * __useProductTasksQuery__
 *
 * To run a query within a React component, call `useProductTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductTasksQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductTasksQuery(baseOptions: Apollo.QueryHookOptions<Types.ProductTasksQuery, Types.ProductTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProductTasksQuery, Types.ProductTasksQueryVariables>(ProductTasksDocument, options);
      }
export function useProductTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProductTasksQuery, Types.ProductTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProductTasksQuery, Types.ProductTasksQueryVariables>(ProductTasksDocument, options);
        }
export function useProductTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProductTasksQuery, Types.ProductTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ProductTasksQuery, Types.ProductTasksQueryVariables>(ProductTasksDocument, options);
        }
export type ProductTasksQueryHookResult = ReturnType<typeof useProductTasksQuery>;
export type ProductTasksLazyQueryHookResult = ReturnType<typeof useProductTasksLazyQuery>;
export type ProductTasksSuspenseQueryHookResult = ReturnType<typeof useProductTasksSuspenseQuery>;
export type ProductTasksQueryResult = Apollo.QueryResult<Types.ProductTasksQuery, Types.ProductTasksQueryVariables>;
export const ProductsDocument = gql`
    query Products($scope: ArchivableStatus, $filter: ProductFilter, $page: Int, $perPage: Int, $withCopies: Boolean) {
  products(
    scope: $scope
    filter: $filter
    page: $page
    perPage: $perPage
    withCopies: $withCopies
  ) {
    nodes {
      archivedAt
      description
      displayName
      id
      name
      rubricsUrl
      status
      owner {
        name
        uuid
      }
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      withCopies: // value for 'withCopies'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<Types.ProductsQuery, Types.ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ProductsQuery, Types.ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ProductsQuery, Types.ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ProductsQuery, Types.ProductsQueryVariables>(ProductsDocument, options);
        }
export function useProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ProductsQuery, Types.ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ProductsQuery, Types.ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsSuspenseQueryHookResult = ReturnType<typeof useProductsSuspenseQuery>;
export type ProductsQueryResult = Apollo.QueryResult<Types.ProductsQuery, Types.ProductsQueryVariables>;
export const RecentApplicationsDocument = gql`
    query RecentApplications($after: String, $before: String, $first: Int, $last: Int) {
  recentApplications(after: $after, before: $before, first: $first, last: $last) {
    edges {
      cursor
      node {
        id
        updatedAt
        student {
          uuid
          fullName
        }
        opportunity {
          name
        }
        status
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;

/**
 * __useRecentApplicationsQuery__
 *
 * To run a query within a React component, call `useRecentApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentApplicationsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useRecentApplicationsQuery(baseOptions?: Apollo.QueryHookOptions<Types.RecentApplicationsQuery, Types.RecentApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RecentApplicationsQuery, Types.RecentApplicationsQueryVariables>(RecentApplicationsDocument, options);
      }
export function useRecentApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RecentApplicationsQuery, Types.RecentApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RecentApplicationsQuery, Types.RecentApplicationsQueryVariables>(RecentApplicationsDocument, options);
        }
export function useRecentApplicationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.RecentApplicationsQuery, Types.RecentApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RecentApplicationsQuery, Types.RecentApplicationsQueryVariables>(RecentApplicationsDocument, options);
        }
export type RecentApplicationsQueryHookResult = ReturnType<typeof useRecentApplicationsQuery>;
export type RecentApplicationsLazyQueryHookResult = ReturnType<typeof useRecentApplicationsLazyQuery>;
export type RecentApplicationsSuspenseQueryHookResult = ReturnType<typeof useRecentApplicationsSuspenseQuery>;
export type RecentApplicationsQueryResult = Apollo.QueryResult<Types.RecentApplicationsQuery, Types.RecentApplicationsQueryVariables>;
export const RecommendationRequestDocument = gql`
    query RecommendationRequest($studentUuid: ID!) {
  recommendationRequest(studentUuid: $studentUuid) {
    applicant {
      applicantId
      email
      firstName
      lastName
      uuid
    }
    forms {
      formType
      status
      previewUrl
      deadline
    }
  }
}
    `;

/**
 * __useRecommendationRequestQuery__
 *
 * To run a query within a React component, call `useRecommendationRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendationRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendationRequestQuery({
 *   variables: {
 *      studentUuid: // value for 'studentUuid'
 *   },
 * });
 */
export function useRecommendationRequestQuery(baseOptions: Apollo.QueryHookOptions<Types.RecommendationRequestQuery, Types.RecommendationRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RecommendationRequestQuery, Types.RecommendationRequestQueryVariables>(RecommendationRequestDocument, options);
      }
export function useRecommendationRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RecommendationRequestQuery, Types.RecommendationRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RecommendationRequestQuery, Types.RecommendationRequestQueryVariables>(RecommendationRequestDocument, options);
        }
export function useRecommendationRequestSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.RecommendationRequestQuery, Types.RecommendationRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RecommendationRequestQuery, Types.RecommendationRequestQueryVariables>(RecommendationRequestDocument, options);
        }
export type RecommendationRequestQueryHookResult = ReturnType<typeof useRecommendationRequestQuery>;
export type RecommendationRequestLazyQueryHookResult = ReturnType<typeof useRecommendationRequestLazyQuery>;
export type RecommendationRequestSuspenseQueryHookResult = ReturnType<typeof useRecommendationRequestSuspenseQuery>;
export type RecommendationRequestQueryResult = Apollo.QueryResult<Types.RecommendationRequestQuery, Types.RecommendationRequestQueryVariables>;
export const RecommendationRequestsDocument = gql`
    query RecommendationRequests($page: Int, $perPage: Int) {
  recommendationRequests(page: $page, perPage: $perPage) {
    nodes {
      applicant {
        applicantId
        email
        firstName
        lastName
        uuid
      }
      deadline
      submittedFormsCount
      totalFormsCount
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useRecommendationRequestsQuery__
 *
 * To run a query within a React component, call `useRecommendationRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendationRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendationRequestsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useRecommendationRequestsQuery(baseOptions?: Apollo.QueryHookOptions<Types.RecommendationRequestsQuery, Types.RecommendationRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RecommendationRequestsQuery, Types.RecommendationRequestsQueryVariables>(RecommendationRequestsDocument, options);
      }
export function useRecommendationRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RecommendationRequestsQuery, Types.RecommendationRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RecommendationRequestsQuery, Types.RecommendationRequestsQueryVariables>(RecommendationRequestsDocument, options);
        }
export function useRecommendationRequestsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.RecommendationRequestsQuery, Types.RecommendationRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RecommendationRequestsQuery, Types.RecommendationRequestsQueryVariables>(RecommendationRequestsDocument, options);
        }
export type RecommendationRequestsQueryHookResult = ReturnType<typeof useRecommendationRequestsQuery>;
export type RecommendationRequestsLazyQueryHookResult = ReturnType<typeof useRecommendationRequestsLazyQuery>;
export type RecommendationRequestsSuspenseQueryHookResult = ReturnType<typeof useRecommendationRequestsSuspenseQuery>;
export type RecommendationRequestsQueryResult = Apollo.QueryResult<Types.RecommendationRequestsQuery, Types.RecommendationRequestsQueryVariables>;
export const ReportsAssessmentReportDocument = gql`
    query ReportsAssessmentReport($filter: AssessmentReportFilter) {
  reports {
    assessmentReport(filter: $filter) {
      studentsCount
      summary {
        assessmentCompleted
        assessmentTaken
      }
      highSchoolInterests: interestsCategoryAverageCheckedScores(type: HIGH_SCHOOL) {
        category
        score
      }
      middleSchoolInterests: interestsCategoryAverageCheckedScores(
        type: MIDDLE_SCHOOL
      ) {
        category
        score
      }
      highSchoolWorkValues: workValuesCategoryAverageTokens(type: HIGH_SCHOOL) {
        category
        averageTokens
      }
      middleSchoolWorkValues: workValuesCategoryAverageTokens(type: MIDDLE_SCHOOL) {
        category
        averageTokens
      }
      highSchoolStudyPreferences: studyPreferencesPositionsDistributions(
        type: HIGH_SCHOOL
      ) {
        area
        results {
          position1
          position2
          position3
          position4
          position5
          position6
          position7
        }
      }
      middleSchoolStudyPreferences: studyPreferencesPositionsDistributions(
        type: MIDDLE_SCHOOL
      ) {
        area
        results {
          position1
          position2
          position3
          position4
          position5
        }
      }
      clusterRecommendationCounts {
        cluster {
          name
          id
          pathways {
            name
            id
          }
        }
        pathwayRecommendationCounts {
          recommendationsCount
          pathway {
            name
            id
          }
        }
        recommendationsCount
      }
    }
  }
}
    `;

/**
 * __useReportsAssessmentReportQuery__
 *
 * To run a query within a React component, call `useReportsAssessmentReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportsAssessmentReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportsAssessmentReportQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useReportsAssessmentReportQuery(baseOptions?: Apollo.QueryHookOptions<Types.ReportsAssessmentReportQuery, Types.ReportsAssessmentReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ReportsAssessmentReportQuery, Types.ReportsAssessmentReportQueryVariables>(ReportsAssessmentReportDocument, options);
      }
export function useReportsAssessmentReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ReportsAssessmentReportQuery, Types.ReportsAssessmentReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ReportsAssessmentReportQuery, Types.ReportsAssessmentReportQueryVariables>(ReportsAssessmentReportDocument, options);
        }
export function useReportsAssessmentReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ReportsAssessmentReportQuery, Types.ReportsAssessmentReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ReportsAssessmentReportQuery, Types.ReportsAssessmentReportQueryVariables>(ReportsAssessmentReportDocument, options);
        }
export type ReportsAssessmentReportQueryHookResult = ReturnType<typeof useReportsAssessmentReportQuery>;
export type ReportsAssessmentReportLazyQueryHookResult = ReturnType<typeof useReportsAssessmentReportLazyQuery>;
export type ReportsAssessmentReportSuspenseQueryHookResult = ReturnType<typeof useReportsAssessmentReportSuspenseQuery>;
export type ReportsAssessmentReportQueryResult = Apollo.QueryResult<Types.ReportsAssessmentReportQuery, Types.ReportsAssessmentReportQueryVariables>;
export const ResearchLinkDocument = gql`
    query ResearchLink($id: ID!) {
  researchLink(id: $id) {
    archivedAt
    author
    displayName
    id
    name
    resourceLink
    sourceName
  }
}
    `;

/**
 * __useResearchLinkQuery__
 *
 * To run a query within a React component, call `useResearchLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useResearchLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResearchLinkQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResearchLinkQuery(baseOptions: Apollo.QueryHookOptions<Types.ResearchLinkQuery, Types.ResearchLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ResearchLinkQuery, Types.ResearchLinkQueryVariables>(ResearchLinkDocument, options);
      }
export function useResearchLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ResearchLinkQuery, Types.ResearchLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ResearchLinkQuery, Types.ResearchLinkQueryVariables>(ResearchLinkDocument, options);
        }
export function useResearchLinkSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ResearchLinkQuery, Types.ResearchLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ResearchLinkQuery, Types.ResearchLinkQueryVariables>(ResearchLinkDocument, options);
        }
export type ResearchLinkQueryHookResult = ReturnType<typeof useResearchLinkQuery>;
export type ResearchLinkLazyQueryHookResult = ReturnType<typeof useResearchLinkLazyQuery>;
export type ResearchLinkSuspenseQueryHookResult = ReturnType<typeof useResearchLinkSuspenseQuery>;
export type ResearchLinkQueryResult = Apollo.QueryResult<Types.ResearchLinkQuery, Types.ResearchLinkQueryVariables>;
export const ResearchLinkLessonsDocument = gql`
    query ResearchLinkLessons($id: ID!) {
  researchLink(id: $id) {
    id
    lessons {
      id
      name
    }
  }
}
    `;

/**
 * __useResearchLinkLessonsQuery__
 *
 * To run a query within a React component, call `useResearchLinkLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useResearchLinkLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResearchLinkLessonsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useResearchLinkLessonsQuery(baseOptions: Apollo.QueryHookOptions<Types.ResearchLinkLessonsQuery, Types.ResearchLinkLessonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ResearchLinkLessonsQuery, Types.ResearchLinkLessonsQueryVariables>(ResearchLinkLessonsDocument, options);
      }
export function useResearchLinkLessonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ResearchLinkLessonsQuery, Types.ResearchLinkLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ResearchLinkLessonsQuery, Types.ResearchLinkLessonsQueryVariables>(ResearchLinkLessonsDocument, options);
        }
export function useResearchLinkLessonsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ResearchLinkLessonsQuery, Types.ResearchLinkLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ResearchLinkLessonsQuery, Types.ResearchLinkLessonsQueryVariables>(ResearchLinkLessonsDocument, options);
        }
export type ResearchLinkLessonsQueryHookResult = ReturnType<typeof useResearchLinkLessonsQuery>;
export type ResearchLinkLessonsLazyQueryHookResult = ReturnType<typeof useResearchLinkLessonsLazyQuery>;
export type ResearchLinkLessonsSuspenseQueryHookResult = ReturnType<typeof useResearchLinkLessonsSuspenseQuery>;
export type ResearchLinkLessonsQueryResult = Apollo.QueryResult<Types.ResearchLinkLessonsQuery, Types.ResearchLinkLessonsQueryVariables>;
export const ResearchLinksDocument = gql`
    query ResearchLinks($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: ResearchLinkFilter) {
  researchLinks(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      author
      displayName
      id
      name
      resourceLink
      sourceName
    }
  }
}
    `;

/**
 * __useResearchLinksQuery__
 *
 * To run a query within a React component, call `useResearchLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useResearchLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResearchLinksQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useResearchLinksQuery(baseOptions?: Apollo.QueryHookOptions<Types.ResearchLinksQuery, Types.ResearchLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ResearchLinksQuery, Types.ResearchLinksQueryVariables>(ResearchLinksDocument, options);
      }
export function useResearchLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ResearchLinksQuery, Types.ResearchLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ResearchLinksQuery, Types.ResearchLinksQueryVariables>(ResearchLinksDocument, options);
        }
export function useResearchLinksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ResearchLinksQuery, Types.ResearchLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ResearchLinksQuery, Types.ResearchLinksQueryVariables>(ResearchLinksDocument, options);
        }
export type ResearchLinksQueryHookResult = ReturnType<typeof useResearchLinksQuery>;
export type ResearchLinksLazyQueryHookResult = ReturnType<typeof useResearchLinksLazyQuery>;
export type ResearchLinksSuspenseQueryHookResult = ReturnType<typeof useResearchLinksSuspenseQuery>;
export type ResearchLinksQueryResult = Apollo.QueryResult<Types.ResearchLinksQuery, Types.ResearchLinksQueryVariables>;
export const DcRubricDocument = gql`
    query DcRubric($id: ID!) {
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
      statements {
        id
      }
      id
      multiplier
      name
      tags {
        id
        name
        type
      }
      plans {
        description
        evaluation {
          id
          plan {
            name
          }
          student {
            username
            uuid
          }
        }
        groups {
          description
          name
          id
          statements {
            id
            name
          }
        }
        id
        name
      }
    }
    displayName
    id
    name
    canEdit
  }
}
    `;

/**
 * __useDcRubricQuery__
 *
 * To run a query within a React component, call `useDcRubricQuery` and pass it any options that fit your needs.
 * When your component renders, `useDcRubricQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDcRubricQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDcRubricQuery(baseOptions: Apollo.QueryHookOptions<Types.DcRubricQuery, Types.DcRubricQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DcRubricQuery, Types.DcRubricQueryVariables>(DcRubricDocument, options);
      }
export function useDcRubricLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DcRubricQuery, Types.DcRubricQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DcRubricQuery, Types.DcRubricQueryVariables>(DcRubricDocument, options);
        }
export function useDcRubricSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DcRubricQuery, Types.DcRubricQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DcRubricQuery, Types.DcRubricQueryVariables>(DcRubricDocument, options);
        }
export type DcRubricQueryHookResult = ReturnType<typeof useDcRubricQuery>;
export type DcRubricLazyQueryHookResult = ReturnType<typeof useDcRubricLazyQuery>;
export type DcRubricSuspenseQueryHookResult = ReturnType<typeof useDcRubricSuspenseQuery>;
export type DcRubricQueryResult = Apollo.QueryResult<Types.DcRubricQuery, Types.DcRubricQueryVariables>;
export const RubricAssignmentsDocument = gql`
    query RubricAssignments($id: ID!) {
  rubric(id: $id) {
    id
    assignments {
      id
      name
    }
  }
}
    `;

/**
 * __useRubricAssignmentsQuery__
 *
 * To run a query within a React component, call `useRubricAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRubricAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRubricAssignmentsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRubricAssignmentsQuery(baseOptions: Apollo.QueryHookOptions<Types.RubricAssignmentsQuery, Types.RubricAssignmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RubricAssignmentsQuery, Types.RubricAssignmentsQueryVariables>(RubricAssignmentsDocument, options);
      }
export function useRubricAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RubricAssignmentsQuery, Types.RubricAssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RubricAssignmentsQuery, Types.RubricAssignmentsQueryVariables>(RubricAssignmentsDocument, options);
        }
export function useRubricAssignmentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.RubricAssignmentsQuery, Types.RubricAssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RubricAssignmentsQuery, Types.RubricAssignmentsQueryVariables>(RubricAssignmentsDocument, options);
        }
export type RubricAssignmentsQueryHookResult = ReturnType<typeof useRubricAssignmentsQuery>;
export type RubricAssignmentsLazyQueryHookResult = ReturnType<typeof useRubricAssignmentsLazyQuery>;
export type RubricAssignmentsSuspenseQueryHookResult = ReturnType<typeof useRubricAssignmentsSuspenseQuery>;
export type RubricAssignmentsQueryResult = Apollo.QueryResult<Types.RubricAssignmentsQuery, Types.RubricAssignmentsQueryVariables>;
export const RubricProductsDocument = gql`
    query RubricProducts($id: ID!) {
  rubric(id: $id) {
    id
    products {
      id
      name
    }
  }
}
    `;

/**
 * __useRubricProductsQuery__
 *
 * To run a query within a React component, call `useRubricProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRubricProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRubricProductsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRubricProductsQuery(baseOptions: Apollo.QueryHookOptions<Types.RubricProductsQuery, Types.RubricProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RubricProductsQuery, Types.RubricProductsQueryVariables>(RubricProductsDocument, options);
      }
export function useRubricProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RubricProductsQuery, Types.RubricProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RubricProductsQuery, Types.RubricProductsQueryVariables>(RubricProductsDocument, options);
        }
export function useRubricProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.RubricProductsQuery, Types.RubricProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RubricProductsQuery, Types.RubricProductsQueryVariables>(RubricProductsDocument, options);
        }
export type RubricProductsQueryHookResult = ReturnType<typeof useRubricProductsQuery>;
export type RubricProductsLazyQueryHookResult = ReturnType<typeof useRubricProductsLazyQuery>;
export type RubricProductsSuspenseQueryHookResult = ReturnType<typeof useRubricProductsSuspenseQuery>;
export type RubricProductsQueryResult = Apollo.QueryResult<Types.RubricProductsQuery, Types.RubricProductsQueryVariables>;
export const RubricsDocument = gql`
    query Rubrics($filter: RubricFilter, $scope: ArchivableStatus, $page: Int, $perPage: Int, $withCopies: Boolean) {
  rubrics(
    filter: $filter
    scope: $scope
    page: $page
    perPage: $perPage
    withCopies: $withCopies
  ) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      description
      displayName
      id
      name
      owner {
        name
        uuid
      }
    }
  }
}
    `;

/**
 * __useRubricsQuery__
 *
 * To run a query within a React component, call `useRubricsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRubricsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRubricsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      withCopies: // value for 'withCopies'
 *   },
 * });
 */
export function useRubricsQuery(baseOptions?: Apollo.QueryHookOptions<Types.RubricsQuery, Types.RubricsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RubricsQuery, Types.RubricsQueryVariables>(RubricsDocument, options);
      }
export function useRubricsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RubricsQuery, Types.RubricsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RubricsQuery, Types.RubricsQueryVariables>(RubricsDocument, options);
        }
export function useRubricsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.RubricsQuery, Types.RubricsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RubricsQuery, Types.RubricsQueryVariables>(RubricsDocument, options);
        }
export type RubricsQueryHookResult = ReturnType<typeof useRubricsQuery>;
export type RubricsLazyQueryHookResult = ReturnType<typeof useRubricsLazyQuery>;
export type RubricsSuspenseQueryHookResult = ReturnType<typeof useRubricsSuspenseQuery>;
export type RubricsQueryResult = Apollo.QueryResult<Types.RubricsQuery, Types.RubricsQueryVariables>;
export const DcSchoolClassDocument = gql`
    query DcSchoolClass($uuid: ID!) {
  schoolClass(uuid: $uuid) {
    isDemo
    name
    uuid
    entity {
      name
      uuid
    }
    settings {
      assessmentType
    }
  }
}
    `;

/**
 * __useDcSchoolClassQuery__
 *
 * To run a query within a React component, call `useDcSchoolClassQuery` and pass it any options that fit your needs.
 * When your component renders, `useDcSchoolClassQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDcSchoolClassQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDcSchoolClassQuery(baseOptions: Apollo.QueryHookOptions<Types.DcSchoolClassQuery, Types.DcSchoolClassQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DcSchoolClassQuery, Types.DcSchoolClassQueryVariables>(DcSchoolClassDocument, options);
      }
export function useDcSchoolClassLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DcSchoolClassQuery, Types.DcSchoolClassQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DcSchoolClassQuery, Types.DcSchoolClassQueryVariables>(DcSchoolClassDocument, options);
        }
export function useDcSchoolClassSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DcSchoolClassQuery, Types.DcSchoolClassQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DcSchoolClassQuery, Types.DcSchoolClassQueryVariables>(DcSchoolClassDocument, options);
        }
export type DcSchoolClassQueryHookResult = ReturnType<typeof useDcSchoolClassQuery>;
export type DcSchoolClassLazyQueryHookResult = ReturnType<typeof useDcSchoolClassLazyQuery>;
export type DcSchoolClassSuspenseQueryHookResult = ReturnType<typeof useDcSchoolClassSuspenseQuery>;
export type DcSchoolClassQueryResult = Apollo.QueryResult<Types.DcSchoolClassQuery, Types.DcSchoolClassQueryVariables>;
export const SchoolClassPlansDocument = gql`
    query SchoolClassPlans($uuid: ID!) {
  schoolClass(uuid: $uuid) {
    uuid
    entity {
      uuid
      plans {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useSchoolClassPlansQuery__
 *
 * To run a query within a React component, call `useSchoolClassPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchoolClassPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchoolClassPlansQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useSchoolClassPlansQuery(baseOptions: Apollo.QueryHookOptions<Types.SchoolClassPlansQuery, Types.SchoolClassPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SchoolClassPlansQuery, Types.SchoolClassPlansQueryVariables>(SchoolClassPlansDocument, options);
      }
export function useSchoolClassPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SchoolClassPlansQuery, Types.SchoolClassPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SchoolClassPlansQuery, Types.SchoolClassPlansQueryVariables>(SchoolClassPlansDocument, options);
        }
export function useSchoolClassPlansSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.SchoolClassPlansQuery, Types.SchoolClassPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.SchoolClassPlansQuery, Types.SchoolClassPlansQueryVariables>(SchoolClassPlansDocument, options);
        }
export type SchoolClassPlansQueryHookResult = ReturnType<typeof useSchoolClassPlansQuery>;
export type SchoolClassPlansLazyQueryHookResult = ReturnType<typeof useSchoolClassPlansLazyQuery>;
export type SchoolClassPlansSuspenseQueryHookResult = ReturnType<typeof useSchoolClassPlansSuspenseQuery>;
export type SchoolClassPlansQueryResult = Apollo.QueryResult<Types.SchoolClassPlansQuery, Types.SchoolClassPlansQueryVariables>;
export const SchoolClassWithStudentsDocument = gql`
    query SchoolClassWithStudents($uuid: ID!, $filter: StudentFilter, $page: Int = 1, $perPage: Int = 100, $scope: ArchivableStatus) {
  schoolClass(uuid: $uuid) {
    name
    uuid
    students(page: $page, perPage: $perPage, filter: $filter, scope: $scope) {
      nodes {
        archivedAt
        assessmentCompleted
        coursesCompleted
        coursesEnrolled
        firstName
        gradingNeeded
        lastName
        settings {
          assessmentType {
            value
          }
        }
        uuid
      }
      pagesCount
    }
  }
}
    `;

/**
 * __useSchoolClassWithStudentsQuery__
 *
 * To run a query within a React component, call `useSchoolClassWithStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchoolClassWithStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchoolClassWithStudentsQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      scope: // value for 'scope'
 *   },
 * });
 */
export function useSchoolClassWithStudentsQuery(baseOptions: Apollo.QueryHookOptions<Types.SchoolClassWithStudentsQuery, Types.SchoolClassWithStudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SchoolClassWithStudentsQuery, Types.SchoolClassWithStudentsQueryVariables>(SchoolClassWithStudentsDocument, options);
      }
export function useSchoolClassWithStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SchoolClassWithStudentsQuery, Types.SchoolClassWithStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SchoolClassWithStudentsQuery, Types.SchoolClassWithStudentsQueryVariables>(SchoolClassWithStudentsDocument, options);
        }
export function useSchoolClassWithStudentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.SchoolClassWithStudentsQuery, Types.SchoolClassWithStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.SchoolClassWithStudentsQuery, Types.SchoolClassWithStudentsQueryVariables>(SchoolClassWithStudentsDocument, options);
        }
export type SchoolClassWithStudentsQueryHookResult = ReturnType<typeof useSchoolClassWithStudentsQuery>;
export type SchoolClassWithStudentsLazyQueryHookResult = ReturnType<typeof useSchoolClassWithStudentsLazyQuery>;
export type SchoolClassWithStudentsSuspenseQueryHookResult = ReturnType<typeof useSchoolClassWithStudentsSuspenseQuery>;
export type SchoolClassWithStudentsQueryResult = Apollo.QueryResult<Types.SchoolClassWithStudentsQuery, Types.SchoolClassWithStudentsQueryVariables>;
export const SchoolClassesDocument = gql`
    query SchoolClasses($filter: SchoolClassFilter, $perPage: Int, $page: Int) {
  schoolClasses(page: $page, perPage: $perPage, filter: $filter) {
    nodes {
      name
      uuid
      entity {
        uuid
        name
      }
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useSchoolClassesQuery__
 *
 * To run a query within a React component, call `useSchoolClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchoolClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchoolClassesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      perPage: // value for 'perPage'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useSchoolClassesQuery(baseOptions?: Apollo.QueryHookOptions<Types.SchoolClassesQuery, Types.SchoolClassesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SchoolClassesQuery, Types.SchoolClassesQueryVariables>(SchoolClassesDocument, options);
      }
export function useSchoolClassesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SchoolClassesQuery, Types.SchoolClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SchoolClassesQuery, Types.SchoolClassesQueryVariables>(SchoolClassesDocument, options);
        }
export function useSchoolClassesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.SchoolClassesQuery, Types.SchoolClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.SchoolClassesQuery, Types.SchoolClassesQueryVariables>(SchoolClassesDocument, options);
        }
export type SchoolClassesQueryHookResult = ReturnType<typeof useSchoolClassesQuery>;
export type SchoolClassesLazyQueryHookResult = ReturnType<typeof useSchoolClassesLazyQuery>;
export type SchoolClassesSuspenseQueryHookResult = ReturnType<typeof useSchoolClassesSuspenseQuery>;
export type SchoolClassesQueryResult = Apollo.QueryResult<Types.SchoolClassesQuery, Types.SchoolClassesQueryVariables>;
export const SchoolClassesStudentsDocument = gql`
    query SchoolClassesStudents {
  schoolClasses(page: 1, perPage: 1000) {
    nodes {
      uuid
      name
      students(page: 1, perPage: 1000) {
        nodes {
          uuid
          fullName
        }
      }
    }
  }
}
    `;

/**
 * __useSchoolClassesStudentsQuery__
 *
 * To run a query within a React component, call `useSchoolClassesStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchoolClassesStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchoolClassesStudentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSchoolClassesStudentsQuery(baseOptions?: Apollo.QueryHookOptions<Types.SchoolClassesStudentsQuery, Types.SchoolClassesStudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SchoolClassesStudentsQuery, Types.SchoolClassesStudentsQueryVariables>(SchoolClassesStudentsDocument, options);
      }
export function useSchoolClassesStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SchoolClassesStudentsQuery, Types.SchoolClassesStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SchoolClassesStudentsQuery, Types.SchoolClassesStudentsQueryVariables>(SchoolClassesStudentsDocument, options);
        }
export function useSchoolClassesStudentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.SchoolClassesStudentsQuery, Types.SchoolClassesStudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.SchoolClassesStudentsQuery, Types.SchoolClassesStudentsQueryVariables>(SchoolClassesStudentsDocument, options);
        }
export type SchoolClassesStudentsQueryHookResult = ReturnType<typeof useSchoolClassesStudentsQuery>;
export type SchoolClassesStudentsLazyQueryHookResult = ReturnType<typeof useSchoolClassesStudentsLazyQuery>;
export type SchoolClassesStudentsSuspenseQueryHookResult = ReturnType<typeof useSchoolClassesStudentsSuspenseQuery>;
export type SchoolClassesStudentsQueryResult = Apollo.QueryResult<Types.SchoolClassesStudentsQuery, Types.SchoolClassesStudentsQueryVariables>;
export const SlidesDocument = gql`
    query Slides {
  slides(perPage: 100) {
    nodes {
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
      isShared
      name
      notes
      slideBackgroundImages {
        id
        thumbnailUrl
        url
      }
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
        isShared
        name
        notes
        step
        template
      }
      template
    }
  }
}
    `;

/**
 * __useSlidesQuery__
 *
 * To run a query within a React component, call `useSlidesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlidesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlidesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSlidesQuery(baseOptions?: Apollo.QueryHookOptions<Types.SlidesQuery, Types.SlidesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SlidesQuery, Types.SlidesQueryVariables>(SlidesDocument, options);
      }
export function useSlidesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SlidesQuery, Types.SlidesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SlidesQuery, Types.SlidesQueryVariables>(SlidesDocument, options);
        }
export function useSlidesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.SlidesQuery, Types.SlidesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.SlidesQuery, Types.SlidesQueryVariables>(SlidesDocument, options);
        }
export type SlidesQueryHookResult = ReturnType<typeof useSlidesQuery>;
export type SlidesLazyQueryHookResult = ReturnType<typeof useSlidesLazyQuery>;
export type SlidesSuspenseQueryHookResult = ReturnType<typeof useSlidesSuspenseQuery>;
export type SlidesQueryResult = Apollo.QueryResult<Types.SlidesQuery, Types.SlidesQueryVariables>;
export const StandardSetDocument = gql`
    query StandardSet($id: ID!) {
  standardSet(id: $id) {
    archivedAt
    displayName
    id
    name
    setId
  }
}
    `;

/**
 * __useStandardSetQuery__
 *
 * To run a query within a React component, call `useStandardSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useStandardSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStandardSetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStandardSetQuery(baseOptions: Apollo.QueryHookOptions<Types.StandardSetQuery, Types.StandardSetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StandardSetQuery, Types.StandardSetQueryVariables>(StandardSetDocument, options);
      }
export function useStandardSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StandardSetQuery, Types.StandardSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StandardSetQuery, Types.StandardSetQueryVariables>(StandardSetDocument, options);
        }
export function useStandardSetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StandardSetQuery, Types.StandardSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StandardSetQuery, Types.StandardSetQueryVariables>(StandardSetDocument, options);
        }
export type StandardSetQueryHookResult = ReturnType<typeof useStandardSetQuery>;
export type StandardSetLazyQueryHookResult = ReturnType<typeof useStandardSetLazyQuery>;
export type StandardSetSuspenseQueryHookResult = ReturnType<typeof useStandardSetSuspenseQuery>;
export type StandardSetQueryResult = Apollo.QueryResult<Types.StandardSetQuery, Types.StandardSetQueryVariables>;
export const StandardSetsDocument = gql`
    query StandardSets($page: Int, $perPage: Int, $filter: StandardSetFilter) {
  standardSets(filter: $filter, page: $page, perPage: $perPage) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      displayName
      id
      name
      setId
    }
  }
}
    `;

/**
 * __useStandardSetsQuery__
 *
 * To run a query within a React component, call `useStandardSetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStandardSetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStandardSetsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useStandardSetsQuery(baseOptions?: Apollo.QueryHookOptions<Types.StandardSetsQuery, Types.StandardSetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StandardSetsQuery, Types.StandardSetsQueryVariables>(StandardSetsDocument, options);
      }
export function useStandardSetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StandardSetsQuery, Types.StandardSetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StandardSetsQuery, Types.StandardSetsQueryVariables>(StandardSetsDocument, options);
        }
export function useStandardSetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StandardSetsQuery, Types.StandardSetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StandardSetsQuery, Types.StandardSetsQueryVariables>(StandardSetsDocument, options);
        }
export type StandardSetsQueryHookResult = ReturnType<typeof useStandardSetsQuery>;
export type StandardSetsLazyQueryHookResult = ReturnType<typeof useStandardSetsLazyQuery>;
export type StandardSetsSuspenseQueryHookResult = ReturnType<typeof useStandardSetsSuspenseQuery>;
export type StandardSetsQueryResult = Apollo.QueryResult<Types.StandardSetsQuery, Types.StandardSetsQueryVariables>;
export const DcStudentDocument = gql`
    query DcStudent($uuid: ID!) {
  student(uuid: $uuid) {
    currentCourses {
      id
      name
      progress {
        total
        submitted
      }
    }
    email
    entity {
      name
      uuid
    }
    firstName
    lastName
    settings {
      assessmentEnabled {
        origin
        value
      }
      assessmentType {
        origin
        value
      }
      onboardingEnabled {
        origin
        value
      }
      selfEvaluationEnabled {
        origin
        value
      }
    }
    uuid
  }
}
    `;

/**
 * __useDcStudentQuery__
 *
 * To run a query within a React component, call `useDcStudentQuery` and pass it any options that fit your needs.
 * When your component renders, `useDcStudentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDcStudentQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDcStudentQuery(baseOptions: Apollo.QueryHookOptions<Types.DcStudentQuery, Types.DcStudentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DcStudentQuery, Types.DcStudentQueryVariables>(DcStudentDocument, options);
      }
export function useDcStudentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DcStudentQuery, Types.DcStudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DcStudentQuery, Types.DcStudentQueryVariables>(DcStudentDocument, options);
        }
export function useDcStudentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DcStudentQuery, Types.DcStudentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DcStudentQuery, Types.DcStudentQueryVariables>(DcStudentDocument, options);
        }
export type DcStudentQueryHookResult = ReturnType<typeof useDcStudentQuery>;
export type DcStudentLazyQueryHookResult = ReturnType<typeof useDcStudentLazyQuery>;
export type DcStudentSuspenseQueryHookResult = ReturnType<typeof useDcStudentSuspenseQuery>;
export type DcStudentQueryResult = Apollo.QueryResult<Types.DcStudentQuery, Types.DcStudentQueryVariables>;
export const StudentAllCoursesDocument = gql`
    query StudentAllCourses($uuid: ID!, $filter: StudentCourseFilter, $page: Int, $perPage: Int) {
  student(uuid: $uuid) {
    assessmentCompleted
    uuid
    allCourses(filter: $filter, page: $page, perPage: $perPage) {
      nodes {
        id
        imageUrl
        match
        name
        type
        pathway {
          name
        }
        thumbnailUrl
        collection {
          id
          name
        }
        isRecommended
        isEnrolled
        ...CourseMetadata
      }
      pagesCount
    }
  }
}
    ${CourseMetadataFragmentDoc}`;

/**
 * __useStudentAllCoursesQuery__
 *
 * To run a query within a React component, call `useStudentAllCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentAllCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentAllCoursesQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useStudentAllCoursesQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentAllCoursesQuery, Types.StudentAllCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentAllCoursesQuery, Types.StudentAllCoursesQueryVariables>(StudentAllCoursesDocument, options);
      }
export function useStudentAllCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentAllCoursesQuery, Types.StudentAllCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentAllCoursesQuery, Types.StudentAllCoursesQueryVariables>(StudentAllCoursesDocument, options);
        }
export function useStudentAllCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentAllCoursesQuery, Types.StudentAllCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentAllCoursesQuery, Types.StudentAllCoursesQueryVariables>(StudentAllCoursesDocument, options);
        }
export type StudentAllCoursesQueryHookResult = ReturnType<typeof useStudentAllCoursesQuery>;
export type StudentAllCoursesLazyQueryHookResult = ReturnType<typeof useStudentAllCoursesLazyQuery>;
export type StudentAllCoursesSuspenseQueryHookResult = ReturnType<typeof useStudentAllCoursesSuspenseQuery>;
export type StudentAllCoursesQueryResult = Apollo.QueryResult<Types.StudentAllCoursesQuery, Types.StudentAllCoursesQueryVariables>;
export const StudentApplicationsDocument = gql`
    query StudentApplications($studentUuid: ID!) {
  studentApplications(studentUuid: $studentUuid) {
    forms {
      formType
      status
    }
    institution {
      id
      name
    }
  }
}
    `;

/**
 * __useStudentApplicationsQuery__
 *
 * To run a query within a React component, call `useStudentApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentApplicationsQuery({
 *   variables: {
 *      studentUuid: // value for 'studentUuid'
 *   },
 * });
 */
export function useStudentApplicationsQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentApplicationsQuery, Types.StudentApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentApplicationsQuery, Types.StudentApplicationsQueryVariables>(StudentApplicationsDocument, options);
      }
export function useStudentApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentApplicationsQuery, Types.StudentApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentApplicationsQuery, Types.StudentApplicationsQueryVariables>(StudentApplicationsDocument, options);
        }
export function useStudentApplicationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentApplicationsQuery, Types.StudentApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentApplicationsQuery, Types.StudentApplicationsQueryVariables>(StudentApplicationsDocument, options);
        }
export type StudentApplicationsQueryHookResult = ReturnType<typeof useStudentApplicationsQuery>;
export type StudentApplicationsLazyQueryHookResult = ReturnType<typeof useStudentApplicationsLazyQuery>;
export type StudentApplicationsSuspenseQueryHookResult = ReturnType<typeof useStudentApplicationsSuspenseQuery>;
export type StudentApplicationsQueryResult = Apollo.QueryResult<Types.StudentApplicationsQuery, Types.StudentApplicationsQueryVariables>;
export const StudentAssessmentResultDocument = gql`
    query StudentAssessmentResult($uuid: ID!) {
  student(uuid: $uuid) {
    uuid
    assessmentResult {
      additionalPathways {
        name
        description
      }
      interestsResult {
        interest
        score
      }
      recommendedPathways {
        name
        description
      }
      studyPreferencesResult {
        area
        description
        position
      }
      workValuesResult {
        score
        workValue
      }
    }
    uuid
  }
}
    `;

/**
 * __useStudentAssessmentResultQuery__
 *
 * To run a query within a React component, call `useStudentAssessmentResultQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentAssessmentResultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentAssessmentResultQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useStudentAssessmentResultQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentAssessmentResultQuery, Types.StudentAssessmentResultQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentAssessmentResultQuery, Types.StudentAssessmentResultQueryVariables>(StudentAssessmentResultDocument, options);
      }
export function useStudentAssessmentResultLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentAssessmentResultQuery, Types.StudentAssessmentResultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentAssessmentResultQuery, Types.StudentAssessmentResultQueryVariables>(StudentAssessmentResultDocument, options);
        }
export function useStudentAssessmentResultSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentAssessmentResultQuery, Types.StudentAssessmentResultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentAssessmentResultQuery, Types.StudentAssessmentResultQueryVariables>(StudentAssessmentResultDocument, options);
        }
export type StudentAssessmentResultQueryHookResult = ReturnType<typeof useStudentAssessmentResultQuery>;
export type StudentAssessmentResultLazyQueryHookResult = ReturnType<typeof useStudentAssessmentResultLazyQuery>;
export type StudentAssessmentResultSuspenseQueryHookResult = ReturnType<typeof useStudentAssessmentResultSuspenseQuery>;
export type StudentAssessmentResultQueryResult = Apollo.QueryResult<Types.StudentAssessmentResultQuery, Types.StudentAssessmentResultQueryVariables>;
export const StudentCourseActivityDocument = gql`
    query StudentCourseActivity($uuid: ID!, $courseId: ID!) {
  student(uuid: $uuid) {
    uuid
    course(id: $courseId) {
      id
      lessons {
        id
        step
        name
        assignments {
          id
          step
          description
          displayName
          submission {
            id
            files {
              id
              attachmentUrl: url(options: {responseContentDisposition: "attachment"})
              previewUrl: url
              filename
            }
            rubricGrade {
              pointsAvailable
              pointsScored
              lastGradedBy {
                uuid
                firstName
                lastName
              }
              results {
                criteriaId
                trait
              }
              updatedAt
            }
            grade: acceptanceGrade {
              id
              lastGradedBy {
                uuid
                firstName
                lastName
              }
              updatedAt
              status
            }
            updatedAt
          }
          rubrics {
            pointsAvailable
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
            description
          }
        }
        checkInQuestions {
          id
          answer {
            id
            grade {
              id
              lastGradedBy {
                uuid
                firstName
                lastName
              }
              updatedAt
              status
            }
            updatedAt
            answer
          }
          question
          step
        }
        checkInGroups {
          displayName
          id
          questions {
            answer {
              id
              grade {
                id
                lastGradedBy {
                  uuid
                  firstName
                  lastName
                }
                updatedAt
                status
              }
              updatedAt
              answer
            }
            id
            question
            step
          }
          step
        }
      }
    }
  }
}
    `;

/**
 * __useStudentCourseActivityQuery__
 *
 * To run a query within a React component, call `useStudentCourseActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentCourseActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentCourseActivityQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useStudentCourseActivityQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentCourseActivityQuery, Types.StudentCourseActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentCourseActivityQuery, Types.StudentCourseActivityQueryVariables>(StudentCourseActivityDocument, options);
      }
export function useStudentCourseActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentCourseActivityQuery, Types.StudentCourseActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentCourseActivityQuery, Types.StudentCourseActivityQueryVariables>(StudentCourseActivityDocument, options);
        }
export function useStudentCourseActivitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentCourseActivityQuery, Types.StudentCourseActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentCourseActivityQuery, Types.StudentCourseActivityQueryVariables>(StudentCourseActivityDocument, options);
        }
export type StudentCourseActivityQueryHookResult = ReturnType<typeof useStudentCourseActivityQuery>;
export type StudentCourseActivityLazyQueryHookResult = ReturnType<typeof useStudentCourseActivityLazyQuery>;
export type StudentCourseActivitySuspenseQueryHookResult = ReturnType<typeof useStudentCourseActivitySuspenseQuery>;
export type StudentCourseActivityQueryResult = Apollo.QueryResult<Types.StudentCourseActivityQuery, Types.StudentCourseActivityQueryVariables>;
export const StudentCurrentCoursesDocument = gql`
    query StudentCurrentCourses($uuid: ID!) {
  student(uuid: $uuid) {
    assessmentCompleted
    uuid
    currentCourses {
      id
      imageUrl
      name
      progress {
        submitted
        total
      }
      status
      pathway {
        name
      }
      thumbnailUrl
    }
  }
}
    `;

/**
 * __useStudentCurrentCoursesQuery__
 *
 * To run a query within a React component, call `useStudentCurrentCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentCurrentCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentCurrentCoursesQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useStudentCurrentCoursesQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentCurrentCoursesQuery, Types.StudentCurrentCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentCurrentCoursesQuery, Types.StudentCurrentCoursesQueryVariables>(StudentCurrentCoursesDocument, options);
      }
export function useStudentCurrentCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentCurrentCoursesQuery, Types.StudentCurrentCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentCurrentCoursesQuery, Types.StudentCurrentCoursesQueryVariables>(StudentCurrentCoursesDocument, options);
        }
export function useStudentCurrentCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentCurrentCoursesQuery, Types.StudentCurrentCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentCurrentCoursesQuery, Types.StudentCurrentCoursesQueryVariables>(StudentCurrentCoursesDocument, options);
        }
export type StudentCurrentCoursesQueryHookResult = ReturnType<typeof useStudentCurrentCoursesQuery>;
export type StudentCurrentCoursesLazyQueryHookResult = ReturnType<typeof useStudentCurrentCoursesLazyQuery>;
export type StudentCurrentCoursesSuspenseQueryHookResult = ReturnType<typeof useStudentCurrentCoursesSuspenseQuery>;
export type StudentCurrentCoursesQueryResult = Apollo.QueryResult<Types.StudentCurrentCoursesQuery, Types.StudentCurrentCoursesQueryVariables>;
export const StudentCurrentCoursesPreviewDocument = gql`
    query StudentCurrentCoursesPreview($uuid: ID!, $studentUuid: ID!) {
  student(uuid: $uuid) {
    archivedAt
    assessmentCompleted
    assessmentResult {
      id
    }
    currentCourses {
      id
      name
      progress {
        total
        submitted
      }
      type
      gradingNeeded(studentUuid: $studentUuid)
    }
    firstName
    hasPlans
    lastName
    schoolClasses {
      uuid
      name
    }
    settings {
      assessmentEnabled {
        origin
        value
      }
      assessmentType {
        origin
        value
      }
      onboardingEnabled {
        origin
        value
      }
      selfEvaluationEnabled {
        origin
        value
      }
    }
    uuid
    plans {
      id
    }
  }
}
    `;

/**
 * __useStudentCurrentCoursesPreviewQuery__
 *
 * To run a query within a React component, call `useStudentCurrentCoursesPreviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentCurrentCoursesPreviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentCurrentCoursesPreviewQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      studentUuid: // value for 'studentUuid'
 *   },
 * });
 */
export function useStudentCurrentCoursesPreviewQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentCurrentCoursesPreviewQuery, Types.StudentCurrentCoursesPreviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentCurrentCoursesPreviewQuery, Types.StudentCurrentCoursesPreviewQueryVariables>(StudentCurrentCoursesPreviewDocument, options);
      }
export function useStudentCurrentCoursesPreviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentCurrentCoursesPreviewQuery, Types.StudentCurrentCoursesPreviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentCurrentCoursesPreviewQuery, Types.StudentCurrentCoursesPreviewQueryVariables>(StudentCurrentCoursesPreviewDocument, options);
        }
export function useStudentCurrentCoursesPreviewSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentCurrentCoursesPreviewQuery, Types.StudentCurrentCoursesPreviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentCurrentCoursesPreviewQuery, Types.StudentCurrentCoursesPreviewQueryVariables>(StudentCurrentCoursesPreviewDocument, options);
        }
export type StudentCurrentCoursesPreviewQueryHookResult = ReturnType<typeof useStudentCurrentCoursesPreviewQuery>;
export type StudentCurrentCoursesPreviewLazyQueryHookResult = ReturnType<typeof useStudentCurrentCoursesPreviewLazyQuery>;
export type StudentCurrentCoursesPreviewSuspenseQueryHookResult = ReturnType<typeof useStudentCurrentCoursesPreviewSuspenseQuery>;
export type StudentCurrentCoursesPreviewQueryResult = Apollo.QueryResult<Types.StudentCurrentCoursesPreviewQuery, Types.StudentCurrentCoursesPreviewQueryVariables>;
export const StudentFinalReportDocument = gql`
    query StudentFinalReport($uuid: ID!, $track: Boolean) {
  student(uuid: $uuid) {
    finalReport(track: $track) {
      additionalPathways {
        description
        id
        imageUrl
        name
      }
      assessmentAttempt {
        id
        updatedAt
      }
      currentCourses {
        ...FinalReportCourse
      }
      interestsResult {
        interest
        score
      }
      recommendedCourses {
        description
        id
        name
        pathway {
          cluster {
            id
            name
          }
          id
          name
        }
      }
      recommendedPathways {
        id
        name
        imageUrl
        description
      }
      studyPreferencesResult {
        area
        description
        position
      }
      workValuesResult {
        score
        workValue
      }
    }
    firstName
    lastName
    uuid
  }
}
    ${FinalReportCourseFragmentDoc}`;

/**
 * __useStudentFinalReportQuery__
 *
 * To run a query within a React component, call `useStudentFinalReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentFinalReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentFinalReportQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useStudentFinalReportQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentFinalReportQuery, Types.StudentFinalReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentFinalReportQuery, Types.StudentFinalReportQueryVariables>(StudentFinalReportDocument, options);
      }
export function useStudentFinalReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentFinalReportQuery, Types.StudentFinalReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentFinalReportQuery, Types.StudentFinalReportQueryVariables>(StudentFinalReportDocument, options);
        }
export function useStudentFinalReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentFinalReportQuery, Types.StudentFinalReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentFinalReportQuery, Types.StudentFinalReportQueryVariables>(StudentFinalReportDocument, options);
        }
export type StudentFinalReportQueryHookResult = ReturnType<typeof useStudentFinalReportQuery>;
export type StudentFinalReportLazyQueryHookResult = ReturnType<typeof useStudentFinalReportLazyQuery>;
export type StudentFinalReportSuspenseQueryHookResult = ReturnType<typeof useStudentFinalReportSuspenseQuery>;
export type StudentFinalReportQueryResult = Apollo.QueryResult<Types.StudentFinalReportQuery, Types.StudentFinalReportQueryVariables>;
export const StudentManagementDocument = gql`
    query StudentManagement($page: Int, $perPage: Int, $filter: StudentFilter, $fullNameSortOrder: SortingOrder, $scope: ArchivableStatus) {
  students(
    page: $page
    perPage: $perPage
    filter: $filter
    fullNameSortOrder: $fullNameSortOrder
    scope: $scope
  ) {
    nodes {
      gradYear
      uuid
      firstName
      uuid
      canPostSecondarySettingBeChanged
      postSecondaryApplicationsStatus {
        isEnabled
        isOverridden
      }
      firstName
      fullName
      counselor {
        uuid
        fullName
      }
      lastName
      email
      entity {
        uuid
        name
      }
      sisId
      plans {
        id
      }
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useStudentManagementQuery__
 *
 * To run a query within a React component, call `useStudentManagementQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentManagementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentManagementQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *      fullNameSortOrder: // value for 'fullNameSortOrder'
 *      scope: // value for 'scope'
 *   },
 * });
 */
export function useStudentManagementQuery(baseOptions?: Apollo.QueryHookOptions<Types.StudentManagementQuery, Types.StudentManagementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentManagementQuery, Types.StudentManagementQueryVariables>(StudentManagementDocument, options);
      }
export function useStudentManagementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentManagementQuery, Types.StudentManagementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentManagementQuery, Types.StudentManagementQueryVariables>(StudentManagementDocument, options);
        }
export function useStudentManagementSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentManagementQuery, Types.StudentManagementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentManagementQuery, Types.StudentManagementQueryVariables>(StudentManagementDocument, options);
        }
export type StudentManagementQueryHookResult = ReturnType<typeof useStudentManagementQuery>;
export type StudentManagementLazyQueryHookResult = ReturnType<typeof useStudentManagementLazyQuery>;
export type StudentManagementSuspenseQueryHookResult = ReturnType<typeof useStudentManagementSuspenseQuery>;
export type StudentManagementQueryResult = Apollo.QueryResult<Types.StudentManagementQuery, Types.StudentManagementQueryVariables>;
export const StudentPortfolioInfoDocument = gql`
    query StudentPortfolioInfo($uuid: ID!) {
  student(uuid: $uuid) {
    uuid
    firstName
    lastName
    schoolClasses {
      uuid
      name
    }
  }
}
    `;

/**
 * __useStudentPortfolioInfoQuery__
 *
 * To run a query within a React component, call `useStudentPortfolioInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentPortfolioInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentPortfolioInfoQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useStudentPortfolioInfoQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentPortfolioInfoQuery, Types.StudentPortfolioInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentPortfolioInfoQuery, Types.StudentPortfolioInfoQueryVariables>(StudentPortfolioInfoDocument, options);
      }
export function useStudentPortfolioInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentPortfolioInfoQuery, Types.StudentPortfolioInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentPortfolioInfoQuery, Types.StudentPortfolioInfoQueryVariables>(StudentPortfolioInfoDocument, options);
        }
export function useStudentPortfolioInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentPortfolioInfoQuery, Types.StudentPortfolioInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentPortfolioInfoQuery, Types.StudentPortfolioInfoQueryVariables>(StudentPortfolioInfoDocument, options);
        }
export type StudentPortfolioInfoQueryHookResult = ReturnType<typeof useStudentPortfolioInfoQuery>;
export type StudentPortfolioInfoLazyQueryHookResult = ReturnType<typeof useStudentPortfolioInfoLazyQuery>;
export type StudentPortfolioInfoSuspenseQueryHookResult = ReturnType<typeof useStudentPortfolioInfoSuspenseQuery>;
export type StudentPortfolioInfoQueryResult = Apollo.QueryResult<Types.StudentPortfolioInfoQuery, Types.StudentPortfolioInfoQueryVariables>;
export const StudentRecommendedCoursesDocument = gql`
    query StudentRecommendedCourses($uuid: ID!) {
  student(uuid: $uuid) {
    uuid
    recommendedCourses {
      id
      imageUrl
      match
      type
      name
      pathway {
        name
      }
      thumbnailUrl
      collection {
        id
        name
      }
      ...CourseMetadata
    }
  }
}
    ${CourseMetadataFragmentDoc}`;

/**
 * __useStudentRecommendedCoursesQuery__
 *
 * To run a query within a React component, call `useStudentRecommendedCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentRecommendedCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentRecommendedCoursesQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useStudentRecommendedCoursesQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentRecommendedCoursesQuery, Types.StudentRecommendedCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentRecommendedCoursesQuery, Types.StudentRecommendedCoursesQueryVariables>(StudentRecommendedCoursesDocument, options);
      }
export function useStudentRecommendedCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentRecommendedCoursesQuery, Types.StudentRecommendedCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentRecommendedCoursesQuery, Types.StudentRecommendedCoursesQueryVariables>(StudentRecommendedCoursesDocument, options);
        }
export function useStudentRecommendedCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentRecommendedCoursesQuery, Types.StudentRecommendedCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentRecommendedCoursesQuery, Types.StudentRecommendedCoursesQueryVariables>(StudentRecommendedCoursesDocument, options);
        }
export type StudentRecommendedCoursesQueryHookResult = ReturnType<typeof useStudentRecommendedCoursesQuery>;
export type StudentRecommendedCoursesLazyQueryHookResult = ReturnType<typeof useStudentRecommendedCoursesLazyQuery>;
export type StudentRecommendedCoursesSuspenseQueryHookResult = ReturnType<typeof useStudentRecommendedCoursesSuspenseQuery>;
export type StudentRecommendedCoursesQueryResult = Apollo.QueryResult<Types.StudentRecommendedCoursesQuery, Types.StudentRecommendedCoursesQueryVariables>;
export const StudentsDocument = gql`
    query Students($page: Int, $perPage: Int, $filter: StudentFilter, $scope: ArchivableStatus) {
  students(page: $page, perPage: $perPage, filter: $filter, scope: $scope) {
    nodes {
      uuid
      firstName
      lastName
      entity {
        uuid
        name
      }
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useStudentsQuery__
 *
 * To run a query within a React component, call `useStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *      scope: // value for 'scope'
 *   },
 * });
 */
export function useStudentsQuery(baseOptions?: Apollo.QueryHookOptions<Types.StudentsQuery, Types.StudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentsQuery, Types.StudentsQueryVariables>(StudentsDocument, options);
      }
export function useStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentsQuery, Types.StudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentsQuery, Types.StudentsQueryVariables>(StudentsDocument, options);
        }
export function useStudentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentsQuery, Types.StudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentsQuery, Types.StudentsQueryVariables>(StudentsDocument, options);
        }
export type StudentsQueryHookResult = ReturnType<typeof useStudentsQuery>;
export type StudentsLazyQueryHookResult = ReturnType<typeof useStudentsLazyQuery>;
export type StudentsSuspenseQueryHookResult = ReturnType<typeof useStudentsSuspenseQuery>;
export type StudentsQueryResult = Apollo.QueryResult<Types.StudentsQuery, Types.StudentsQueryVariables>;
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
          assessmentType
        }
        uuid
      }
      pagesCount
    }
    userId
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
export const DcAdminUsersDocument = gql`
    query DcAdminUsers($page: Int, $perPage: Int, $filter: UserFilter) {
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
        gradingNeeded
        lastName
        role
        schoolClassesCount
        uuid
      }
      pagesCount
      nodesCount
    }
    userId
  }
}
    `;

/**
 * __useDcAdminUsersQuery__
 *
 * To run a query within a React component, call `useDcAdminUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useDcAdminUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDcAdminUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useDcAdminUsersQuery(baseOptions?: Apollo.QueryHookOptions<Types.DcAdminUsersQuery, Types.DcAdminUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DcAdminUsersQuery, Types.DcAdminUsersQueryVariables>(DcAdminUsersDocument, options);
      }
export function useDcAdminUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DcAdminUsersQuery, Types.DcAdminUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DcAdminUsersQuery, Types.DcAdminUsersQueryVariables>(DcAdminUsersDocument, options);
        }
export function useDcAdminUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DcAdminUsersQuery, Types.DcAdminUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DcAdminUsersQuery, Types.DcAdminUsersQueryVariables>(DcAdminUsersDocument, options);
        }
export type DcAdminUsersQueryHookResult = ReturnType<typeof useDcAdminUsersQuery>;
export type DcAdminUsersLazyQueryHookResult = ReturnType<typeof useDcAdminUsersLazyQuery>;
export type DcAdminUsersSuspenseQueryHookResult = ReturnType<typeof useDcAdminUsersSuspenseQuery>;
export type DcAdminUsersQueryResult = Apollo.QueryResult<Types.DcAdminUsersQuery, Types.DcAdminUsersQueryVariables>;
export const TagDocument = gql`
    query Tag($id: ID!) {
  tag(id: $id) {
    hasRubricHeadings
    id
    name
    isDefault
    rubricHeadings {
      nodes {
        id
        name
        multiplier
        rubric {
          id
          name
        }
        uuid
      }
      nodesCount
      pagesCount
    }
    type
  }
}
    `;

/**
 * __useTagQuery__
 *
 * To run a query within a React component, call `useTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTagQuery(baseOptions: Apollo.QueryHookOptions<Types.TagQuery, Types.TagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TagQuery, Types.TagQueryVariables>(TagDocument, options);
      }
export function useTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TagQuery, Types.TagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TagQuery, Types.TagQueryVariables>(TagDocument, options);
        }
export function useTagSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TagQuery, Types.TagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TagQuery, Types.TagQueryVariables>(TagDocument, options);
        }
export type TagQueryHookResult = ReturnType<typeof useTagQuery>;
export type TagLazyQueryHookResult = ReturnType<typeof useTagLazyQuery>;
export type TagSuspenseQueryHookResult = ReturnType<typeof useTagSuspenseQuery>;
export type TagQueryResult = Apollo.QueryResult<Types.TagQuery, Types.TagQueryVariables>;
export const TagsDocument = gql`
    query Tags($filter: TagFilter, $page: Int, $perPage: Int) {
  tags(filter: $filter, page: $page, perPage: $perPage) {
    nodes {
      name
      id
      type
      hasRubricHeadings
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useTagsQuery(baseOptions?: Apollo.QueryHookOptions<Types.TagsQuery, Types.TagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TagsQuery, Types.TagsQueryVariables>(TagsDocument, options);
      }
export function useTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TagsQuery, Types.TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TagsQuery, Types.TagsQueryVariables>(TagsDocument, options);
        }
export function useTagsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TagsQuery, Types.TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TagsQuery, Types.TagsQueryVariables>(TagsDocument, options);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsSuspenseQueryHookResult = ReturnType<typeof useTagsSuspenseQuery>;
export type TagsQueryResult = Apollo.QueryResult<Types.TagsQuery, Types.TagsQueryVariables>;
export const TaskDocument = gql`
    query Task($id: ID!) {
  task(id: $id) {
    badges {
      id
      name
      imageUrl
    }
    archivedAt
    checkInQuestions {
      id
      question
      step
    }
    courses {
      name
      id
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
      step
    }
    description
    displayName
    id
    imageUrl
    introduction
    name
    presentationUrl
    pathways {
      id
      name
    }
    standard
    status
    studentResources
    teachingResources
    thumbnailUrl
    files {
      description
      displayName
      filename
      id
      step
      task {
        id
      }
      url
    }
    products {
      id
      name
      displayName
      description
      rubricsUrl
      status
      step
      owner {
        uuid
        name
      }
    }
    presentation {
      id
      status
    }
  }
}
    `;

/**
 * __useTaskQuery__
 *
 * To run a query within a React component, call `useTaskQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskQuery(baseOptions: Apollo.QueryHookOptions<Types.TaskQuery, Types.TaskQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TaskQuery, Types.TaskQueryVariables>(TaskDocument, options);
      }
export function useTaskLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TaskQuery, Types.TaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TaskQuery, Types.TaskQueryVariables>(TaskDocument, options);
        }
export function useTaskSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TaskQuery, Types.TaskQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TaskQuery, Types.TaskQueryVariables>(TaskDocument, options);
        }
export type TaskQueryHookResult = ReturnType<typeof useTaskQuery>;
export type TaskLazyQueryHookResult = ReturnType<typeof useTaskLazyQuery>;
export type TaskSuspenseQueryHookResult = ReturnType<typeof useTaskSuspenseQuery>;
export type TaskQueryResult = Apollo.QueryResult<Types.TaskQuery, Types.TaskQueryVariables>;
export const TaskPresentationDocument = gql`
    query TaskPresentation($id: ID!) {
  task(id: $id) {
    id
    presentation {
      color
      description
      displayName
      id
      name
      slideBackgroundImages {
        id
        thumbnailUrl
        url
      }
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
        isShared
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
          isShared
          iframeUrl
          name
          notes
          step
          template
        }
        checkInGroups {
          displayName
          id
          name
          step
          questions {
            id
            question
            step
          }
        }
        checkInQuestions {
          id
          question
          step
        }
        products {
          description
          displayName
          id
          name
          rubricsUrl
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
            headings {
              id
              multiplier
              name
              uuid
            }
            criteriaLabels {
              displayName
              id
              score
              uuid
            }
          }
          step
        }
      }
      status
      transition
      typography
      type
    }
  }
}
    `;

/**
 * __useTaskPresentationQuery__
 *
 * To run a query within a React component, call `useTaskPresentationQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskPresentationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskPresentationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskPresentationQuery(baseOptions: Apollo.QueryHookOptions<Types.TaskPresentationQuery, Types.TaskPresentationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TaskPresentationQuery, Types.TaskPresentationQueryVariables>(TaskPresentationDocument, options);
      }
export function useTaskPresentationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TaskPresentationQuery, Types.TaskPresentationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TaskPresentationQuery, Types.TaskPresentationQueryVariables>(TaskPresentationDocument, options);
        }
export function useTaskPresentationSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TaskPresentationQuery, Types.TaskPresentationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TaskPresentationQuery, Types.TaskPresentationQueryVariables>(TaskPresentationDocument, options);
        }
export type TaskPresentationQueryHookResult = ReturnType<typeof useTaskPresentationQuery>;
export type TaskPresentationLazyQueryHookResult = ReturnType<typeof useTaskPresentationLazyQuery>;
export type TaskPresentationSuspenseQueryHookResult = ReturnType<typeof useTaskPresentationSuspenseQuery>;
export type TaskPresentationQueryResult = Apollo.QueryResult<Types.TaskPresentationQuery, Types.TaskPresentationQueryVariables>;
export const TaskUnitsDocument = gql`
    query TaskUnits($id: ID!) {
  task(id: $id) {
    id
    units {
      id
      name
    }
  }
}
    `;

/**
 * __useTaskUnitsQuery__
 *
 * To run a query within a React component, call `useTaskUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaskUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaskUnitsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTaskUnitsQuery(baseOptions: Apollo.QueryHookOptions<Types.TaskUnitsQuery, Types.TaskUnitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TaskUnitsQuery, Types.TaskUnitsQueryVariables>(TaskUnitsDocument, options);
      }
export function useTaskUnitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TaskUnitsQuery, Types.TaskUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TaskUnitsQuery, Types.TaskUnitsQueryVariables>(TaskUnitsDocument, options);
        }
export function useTaskUnitsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TaskUnitsQuery, Types.TaskUnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TaskUnitsQuery, Types.TaskUnitsQueryVariables>(TaskUnitsDocument, options);
        }
export type TaskUnitsQueryHookResult = ReturnType<typeof useTaskUnitsQuery>;
export type TaskUnitsLazyQueryHookResult = ReturnType<typeof useTaskUnitsLazyQuery>;
export type TaskUnitsSuspenseQueryHookResult = ReturnType<typeof useTaskUnitsSuspenseQuery>;
export type TaskUnitsQueryResult = Apollo.QueryResult<Types.TaskUnitsQuery, Types.TaskUnitsQueryVariables>;
export const TasksDocument = gql`
    query Tasks($scope: ArchivableStatus, $filter: TaskFilter, $page: Int, $perPage: Int, $withCopies: Boolean) {
  tasks(
    scope: $scope
    filter: $filter
    page: $page
    perPage: $perPage
    withCopies: $withCopies
  ) {
    nodes {
      archivedAt
      id
      imageUrl
      name
      owner {
        name
        uuid
      }
      status
      thumbnailUrl
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      withCopies: // value for 'withCopies'
 *   },
 * });
 */
export function useTasksQuery(baseOptions?: Apollo.QueryHookOptions<Types.TasksQuery, Types.TasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TasksQuery, Types.TasksQueryVariables>(TasksDocument, options);
      }
export function useTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TasksQuery, Types.TasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TasksQuery, Types.TasksQueryVariables>(TasksDocument, options);
        }
export function useTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TasksQuery, Types.TasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TasksQuery, Types.TasksQueryVariables>(TasksDocument, options);
        }
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksSuspenseQueryHookResult = ReturnType<typeof useTasksSuspenseQuery>;
export type TasksQueryResult = Apollo.QueryResult<Types.TasksQuery, Types.TasksQueryVariables>;
export const TeacherClusterEnrollmentStatsDocument = gql`
    query TeacherClusterEnrollmentStats($userUuid: ID, $startYear: Int!) {
  teacherDashboard(userUuid: $userUuid) {
    clusterEnrollmentStats(startYear: $startYear) {
      cluster {
        id
        name
      }
      studentsCount
    }
    userId
  }
}
    `;

/**
 * __useTeacherClusterEnrollmentStatsQuery__
 *
 * To run a query within a React component, call `useTeacherClusterEnrollmentStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeacherClusterEnrollmentStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeacherClusterEnrollmentStatsQuery({
 *   variables: {
 *      userUuid: // value for 'userUuid'
 *      startYear: // value for 'startYear'
 *   },
 * });
 */
export function useTeacherClusterEnrollmentStatsQuery(baseOptions: Apollo.QueryHookOptions<Types.TeacherClusterEnrollmentStatsQuery, Types.TeacherClusterEnrollmentStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TeacherClusterEnrollmentStatsQuery, Types.TeacherClusterEnrollmentStatsQueryVariables>(TeacherClusterEnrollmentStatsDocument, options);
      }
export function useTeacherClusterEnrollmentStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TeacherClusterEnrollmentStatsQuery, Types.TeacherClusterEnrollmentStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TeacherClusterEnrollmentStatsQuery, Types.TeacherClusterEnrollmentStatsQueryVariables>(TeacherClusterEnrollmentStatsDocument, options);
        }
export function useTeacherClusterEnrollmentStatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TeacherClusterEnrollmentStatsQuery, Types.TeacherClusterEnrollmentStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TeacherClusterEnrollmentStatsQuery, Types.TeacherClusterEnrollmentStatsQueryVariables>(TeacherClusterEnrollmentStatsDocument, options);
        }
export type TeacherClusterEnrollmentStatsQueryHookResult = ReturnType<typeof useTeacherClusterEnrollmentStatsQuery>;
export type TeacherClusterEnrollmentStatsLazyQueryHookResult = ReturnType<typeof useTeacherClusterEnrollmentStatsLazyQuery>;
export type TeacherClusterEnrollmentStatsSuspenseQueryHookResult = ReturnType<typeof useTeacherClusterEnrollmentStatsSuspenseQuery>;
export type TeacherClusterEnrollmentStatsQueryResult = Apollo.QueryResult<Types.TeacherClusterEnrollmentStatsQuery, Types.TeacherClusterEnrollmentStatsQueryVariables>;
export const TeacherDashboardActivityLogDocument = gql`
    query TeacherDashboardActivityLog($userUuid: ID, $first: Int, $after: String) {
  teacherDashboard(userUuid: $userUuid) {
    activityLog(first: $first, after: $after) {
      edges {
        cursor
        node {
          activity
          context {
            id
            name
          }
          updatedAt
          student {
            uuid
            firstName
            lastName
          }
          target {
            id
            name
          }
          type
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    userId
  }
}
    `;

/**
 * __useTeacherDashboardActivityLogQuery__
 *
 * To run a query within a React component, call `useTeacherDashboardActivityLogQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeacherDashboardActivityLogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeacherDashboardActivityLogQuery({
 *   variables: {
 *      userUuid: // value for 'userUuid'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useTeacherDashboardActivityLogQuery(baseOptions?: Apollo.QueryHookOptions<Types.TeacherDashboardActivityLogQuery, Types.TeacherDashboardActivityLogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TeacherDashboardActivityLogQuery, Types.TeacherDashboardActivityLogQueryVariables>(TeacherDashboardActivityLogDocument, options);
      }
export function useTeacherDashboardActivityLogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TeacherDashboardActivityLogQuery, Types.TeacherDashboardActivityLogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TeacherDashboardActivityLogQuery, Types.TeacherDashboardActivityLogQueryVariables>(TeacherDashboardActivityLogDocument, options);
        }
export function useTeacherDashboardActivityLogSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TeacherDashboardActivityLogQuery, Types.TeacherDashboardActivityLogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TeacherDashboardActivityLogQuery, Types.TeacherDashboardActivityLogQueryVariables>(TeacherDashboardActivityLogDocument, options);
        }
export type TeacherDashboardActivityLogQueryHookResult = ReturnType<typeof useTeacherDashboardActivityLogQuery>;
export type TeacherDashboardActivityLogLazyQueryHookResult = ReturnType<typeof useTeacherDashboardActivityLogLazyQuery>;
export type TeacherDashboardActivityLogSuspenseQueryHookResult = ReturnType<typeof useTeacherDashboardActivityLogSuspenseQuery>;
export type TeacherDashboardActivityLogQueryResult = Apollo.QueryResult<Types.TeacherDashboardActivityLogQuery, Types.TeacherDashboardActivityLogQueryVariables>;
export const TeacherDashboardClassesStatsDocument = gql`
    query TeacherDashboardClassesStats($userUuid: ID) {
  teacherDashboard(userUuid: $userUuid) {
    schoolClasses {
      enrolledCoursesCount
      entityName
      finishedAssessmentsCount
      finishedCoursesCount
      gradingNeeded
      isDemo
      schoolClassName
      schoolClassUuid
      settings {
        assessmentType
      }
      studentsCount
    }
    userId
  }
}
    `;

/**
 * __useTeacherDashboardClassesStatsQuery__
 *
 * To run a query within a React component, call `useTeacherDashboardClassesStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeacherDashboardClassesStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeacherDashboardClassesStatsQuery({
 *   variables: {
 *      userUuid: // value for 'userUuid'
 *   },
 * });
 */
export function useTeacherDashboardClassesStatsQuery(baseOptions?: Apollo.QueryHookOptions<Types.TeacherDashboardClassesStatsQuery, Types.TeacherDashboardClassesStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TeacherDashboardClassesStatsQuery, Types.TeacherDashboardClassesStatsQueryVariables>(TeacherDashboardClassesStatsDocument, options);
      }
export function useTeacherDashboardClassesStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TeacherDashboardClassesStatsQuery, Types.TeacherDashboardClassesStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TeacherDashboardClassesStatsQuery, Types.TeacherDashboardClassesStatsQueryVariables>(TeacherDashboardClassesStatsDocument, options);
        }
export function useTeacherDashboardClassesStatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TeacherDashboardClassesStatsQuery, Types.TeacherDashboardClassesStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TeacherDashboardClassesStatsQuery, Types.TeacherDashboardClassesStatsQueryVariables>(TeacherDashboardClassesStatsDocument, options);
        }
export type TeacherDashboardClassesStatsQueryHookResult = ReturnType<typeof useTeacherDashboardClassesStatsQuery>;
export type TeacherDashboardClassesStatsLazyQueryHookResult = ReturnType<typeof useTeacherDashboardClassesStatsLazyQuery>;
export type TeacherDashboardClassesStatsSuspenseQueryHookResult = ReturnType<typeof useTeacherDashboardClassesStatsSuspenseQuery>;
export type TeacherDashboardClassesStatsQueryResult = Apollo.QueryResult<Types.TeacherDashboardClassesStatsQuery, Types.TeacherDashboardClassesStatsQueryVariables>;
export const TeacherDashboardMyReportsDocument = gql`
    query TeacherDashboardMyReports($userUuid: ID, $startYear: Int!) {
  teacherDashboard(userUuid: $userUuid) {
    myReports {
      assessmentsFinished(startYear: $startYear)
      assignmentsSubmitted(startYear: $startYear)
      coursesEnrolled(startYear: $startYear)
      coursesFinished(startYear: $startYear)
    }
    userId
  }
}
    `;

/**
 * __useTeacherDashboardMyReportsQuery__
 *
 * To run a query within a React component, call `useTeacherDashboardMyReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeacherDashboardMyReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeacherDashboardMyReportsQuery({
 *   variables: {
 *      userUuid: // value for 'userUuid'
 *      startYear: // value for 'startYear'
 *   },
 * });
 */
export function useTeacherDashboardMyReportsQuery(baseOptions: Apollo.QueryHookOptions<Types.TeacherDashboardMyReportsQuery, Types.TeacherDashboardMyReportsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TeacherDashboardMyReportsQuery, Types.TeacherDashboardMyReportsQueryVariables>(TeacherDashboardMyReportsDocument, options);
      }
export function useTeacherDashboardMyReportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TeacherDashboardMyReportsQuery, Types.TeacherDashboardMyReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TeacherDashboardMyReportsQuery, Types.TeacherDashboardMyReportsQueryVariables>(TeacherDashboardMyReportsDocument, options);
        }
export function useTeacherDashboardMyReportsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TeacherDashboardMyReportsQuery, Types.TeacherDashboardMyReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TeacherDashboardMyReportsQuery, Types.TeacherDashboardMyReportsQueryVariables>(TeacherDashboardMyReportsDocument, options);
        }
export type TeacherDashboardMyReportsQueryHookResult = ReturnType<typeof useTeacherDashboardMyReportsQuery>;
export type TeacherDashboardMyReportsLazyQueryHookResult = ReturnType<typeof useTeacherDashboardMyReportsLazyQuery>;
export type TeacherDashboardMyReportsSuspenseQueryHookResult = ReturnType<typeof useTeacherDashboardMyReportsSuspenseQuery>;
export type TeacherDashboardMyReportsQueryResult = Apollo.QueryResult<Types.TeacherDashboardMyReportsQuery, Types.TeacherDashboardMyReportsQueryVariables>;
export const TeacherDashboardPlansDocument = gql`
    query TeacherDashboardPlans($userUuid: ID!) {
  teacherDashboard(userUuid: $userUuid) {
    userId
    plans {
      id
      name
    }
  }
}
    `;

/**
 * __useTeacherDashboardPlansQuery__
 *
 * To run a query within a React component, call `useTeacherDashboardPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeacherDashboardPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeacherDashboardPlansQuery({
 *   variables: {
 *      userUuid: // value for 'userUuid'
 *   },
 * });
 */
export function useTeacherDashboardPlansQuery(baseOptions: Apollo.QueryHookOptions<Types.TeacherDashboardPlansQuery, Types.TeacherDashboardPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TeacherDashboardPlansQuery, Types.TeacherDashboardPlansQueryVariables>(TeacherDashboardPlansDocument, options);
      }
export function useTeacherDashboardPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TeacherDashboardPlansQuery, Types.TeacherDashboardPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TeacherDashboardPlansQuery, Types.TeacherDashboardPlansQueryVariables>(TeacherDashboardPlansDocument, options);
        }
export function useTeacherDashboardPlansSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TeacherDashboardPlansQuery, Types.TeacherDashboardPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TeacherDashboardPlansQuery, Types.TeacherDashboardPlansQueryVariables>(TeacherDashboardPlansDocument, options);
        }
export type TeacherDashboardPlansQueryHookResult = ReturnType<typeof useTeacherDashboardPlansQuery>;
export type TeacherDashboardPlansLazyQueryHookResult = ReturnType<typeof useTeacherDashboardPlansLazyQuery>;
export type TeacherDashboardPlansSuspenseQueryHookResult = ReturnType<typeof useTeacherDashboardPlansSuspenseQuery>;
export type TeacherDashboardPlansQueryResult = Apollo.QueryResult<Types.TeacherDashboardPlansQuery, Types.TeacherDashboardPlansQueryVariables>;
export const TeacherPathwayEnrollmentStatsDocument = gql`
    query TeacherPathwayEnrollmentStats($userUuid: ID, $startYear: Int!) {
  teacherDashboard(userUuid: $userUuid) {
    pathwayEnrollmentStats(startYear: $startYear) {
      pathway {
        id
        name
      }
      studentsCount
    }
    userId
  }
}
    `;

/**
 * __useTeacherPathwayEnrollmentStatsQuery__
 *
 * To run a query within a React component, call `useTeacherPathwayEnrollmentStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeacherPathwayEnrollmentStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeacherPathwayEnrollmentStatsQuery({
 *   variables: {
 *      userUuid: // value for 'userUuid'
 *      startYear: // value for 'startYear'
 *   },
 * });
 */
export function useTeacherPathwayEnrollmentStatsQuery(baseOptions: Apollo.QueryHookOptions<Types.TeacherPathwayEnrollmentStatsQuery, Types.TeacherPathwayEnrollmentStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TeacherPathwayEnrollmentStatsQuery, Types.TeacherPathwayEnrollmentStatsQueryVariables>(TeacherPathwayEnrollmentStatsDocument, options);
      }
export function useTeacherPathwayEnrollmentStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TeacherPathwayEnrollmentStatsQuery, Types.TeacherPathwayEnrollmentStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TeacherPathwayEnrollmentStatsQuery, Types.TeacherPathwayEnrollmentStatsQueryVariables>(TeacherPathwayEnrollmentStatsDocument, options);
        }
export function useTeacherPathwayEnrollmentStatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TeacherPathwayEnrollmentStatsQuery, Types.TeacherPathwayEnrollmentStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TeacherPathwayEnrollmentStatsQuery, Types.TeacherPathwayEnrollmentStatsQueryVariables>(TeacherPathwayEnrollmentStatsDocument, options);
        }
export type TeacherPathwayEnrollmentStatsQueryHookResult = ReturnType<typeof useTeacherPathwayEnrollmentStatsQuery>;
export type TeacherPathwayEnrollmentStatsLazyQueryHookResult = ReturnType<typeof useTeacherPathwayEnrollmentStatsLazyQuery>;
export type TeacherPathwayEnrollmentStatsSuspenseQueryHookResult = ReturnType<typeof useTeacherPathwayEnrollmentStatsSuspenseQuery>;
export type TeacherPathwayEnrollmentStatsQueryResult = Apollo.QueryResult<Types.TeacherPathwayEnrollmentStatsQuery, Types.TeacherPathwayEnrollmentStatsQueryVariables>;
export const TextDocument = gql`
    query Text($id: ID!) {
  text(id: $id) {
    archivedAt
    content
    displayName
    id
    name
  }
}
    `;

/**
 * __useTextQuery__
 *
 * To run a query within a React component, call `useTextQuery` and pass it any options that fit your needs.
 * When your component renders, `useTextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTextQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTextQuery(baseOptions: Apollo.QueryHookOptions<Types.TextQuery, Types.TextQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TextQuery, Types.TextQueryVariables>(TextDocument, options);
      }
export function useTextLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TextQuery, Types.TextQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TextQuery, Types.TextQueryVariables>(TextDocument, options);
        }
export function useTextSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TextQuery, Types.TextQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TextQuery, Types.TextQueryVariables>(TextDocument, options);
        }
export type TextQueryHookResult = ReturnType<typeof useTextQuery>;
export type TextLazyQueryHookResult = ReturnType<typeof useTextLazyQuery>;
export type TextSuspenseQueryHookResult = ReturnType<typeof useTextSuspenseQuery>;
export type TextQueryResult = Apollo.QueryResult<Types.TextQuery, Types.TextQueryVariables>;
export const TextLessonsDocument = gql`
    query TextLessons($id: ID!) {
  text(id: $id) {
    id
    lessons {
      id
      name
    }
  }
}
    `;

/**
 * __useTextLessonsQuery__
 *
 * To run a query within a React component, call `useTextLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTextLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTextLessonsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTextLessonsQuery(baseOptions: Apollo.QueryHookOptions<Types.TextLessonsQuery, Types.TextLessonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TextLessonsQuery, Types.TextLessonsQueryVariables>(TextLessonsDocument, options);
      }
export function useTextLessonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TextLessonsQuery, Types.TextLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TextLessonsQuery, Types.TextLessonsQueryVariables>(TextLessonsDocument, options);
        }
export function useTextLessonsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TextLessonsQuery, Types.TextLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TextLessonsQuery, Types.TextLessonsQueryVariables>(TextLessonsDocument, options);
        }
export type TextLessonsQueryHookResult = ReturnType<typeof useTextLessonsQuery>;
export type TextLessonsLazyQueryHookResult = ReturnType<typeof useTextLessonsLazyQuery>;
export type TextLessonsSuspenseQueryHookResult = ReturnType<typeof useTextLessonsSuspenseQuery>;
export type TextLessonsQueryResult = Apollo.QueryResult<Types.TextLessonsQuery, Types.TextLessonsQueryVariables>;
export const TextsDocument = gql`
    query Texts($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: TextFilter) {
  texts(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      content
      displayName
      id
      name
    }
  }
}
    `;

/**
 * __useTextsQuery__
 *
 * To run a query within a React component, call `useTextsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTextsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTextsQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useTextsQuery(baseOptions?: Apollo.QueryHookOptions<Types.TextsQuery, Types.TextsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TextsQuery, Types.TextsQueryVariables>(TextsDocument, options);
      }
export function useTextsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TextsQuery, Types.TextsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TextsQuery, Types.TextsQueryVariables>(TextsDocument, options);
        }
export function useTextsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TextsQuery, Types.TextsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TextsQuery, Types.TextsQueryVariables>(TextsDocument, options);
        }
export type TextsQueryHookResult = ReturnType<typeof useTextsQuery>;
export type TextsLazyQueryHookResult = ReturnType<typeof useTextsLazyQuery>;
export type TextsSuspenseQueryHookResult = ReturnType<typeof useTextsSuspenseQuery>;
export type TextsQueryResult = Apollo.QueryResult<Types.TextsQuery, Types.TextsQueryVariables>;
export const TrackDocument = gql`
    query Track($id: ID!) {
  track(id: $id) {
    archivedAt
    description
    displayName
    grades
    id
    imageUrl
    name
    shortDescription
    status
    service
    thumbnailUrl
    units {
      id
      imageUrl
      thumbnailUrl
      name
      step
      service
    }
  }
}
    `;

/**
 * __useTrackQuery__
 *
 * To run a query within a React component, call `useTrackQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrackQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTrackQuery(baseOptions: Apollo.QueryHookOptions<Types.TrackQuery, Types.TrackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TrackQuery, Types.TrackQueryVariables>(TrackDocument, options);
      }
export function useTrackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TrackQuery, Types.TrackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TrackQuery, Types.TrackQueryVariables>(TrackDocument, options);
        }
export function useTrackSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TrackQuery, Types.TrackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TrackQuery, Types.TrackQueryVariables>(TrackDocument, options);
        }
export type TrackQueryHookResult = ReturnType<typeof useTrackQuery>;
export type TrackLazyQueryHookResult = ReturnType<typeof useTrackLazyQuery>;
export type TrackSuspenseQueryHookResult = ReturnType<typeof useTrackSuspenseQuery>;
export type TrackQueryResult = Apollo.QueryResult<Types.TrackQuery, Types.TrackQueryVariables>;
export const TrackCatalogsDocument = gql`
    query TrackCatalogs($id: ID!) {
  track(id: $id) {
    id
    catalogs {
      id
      name
    }
  }
}
    `;

/**
 * __useTrackCatalogsQuery__
 *
 * To run a query within a React component, call `useTrackCatalogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrackCatalogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrackCatalogsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTrackCatalogsQuery(baseOptions: Apollo.QueryHookOptions<Types.TrackCatalogsQuery, Types.TrackCatalogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TrackCatalogsQuery, Types.TrackCatalogsQueryVariables>(TrackCatalogsDocument, options);
      }
export function useTrackCatalogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TrackCatalogsQuery, Types.TrackCatalogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TrackCatalogsQuery, Types.TrackCatalogsQueryVariables>(TrackCatalogsDocument, options);
        }
export function useTrackCatalogsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TrackCatalogsQuery, Types.TrackCatalogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TrackCatalogsQuery, Types.TrackCatalogsQueryVariables>(TrackCatalogsDocument, options);
        }
export type TrackCatalogsQueryHookResult = ReturnType<typeof useTrackCatalogsQuery>;
export type TrackCatalogsLazyQueryHookResult = ReturnType<typeof useTrackCatalogsLazyQuery>;
export type TrackCatalogsSuspenseQueryHookResult = ReturnType<typeof useTrackCatalogsSuspenseQuery>;
export type TrackCatalogsQueryResult = Apollo.QueryResult<Types.TrackCatalogsQuery, Types.TrackCatalogsQueryVariables>;
export const TracksDocument = gql`
    query Tracks($scope: ArchivableStatus, $filter: TrackFilter, $page: Int, $perPage: Int) {
  tracks(scope: $scope, filter: $filter, page: $page, perPage: $perPage) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      description
      displayName
      grades
      id
      imageUrl
      name
      shortDescription
      service
      status
      thumbnailUrl
      units {
        id
        imageUrl
        name
        step
        service
      }
    }
  }
}
    `;

/**
 * __useTracksQuery__
 *
 * To run a query within a React component, call `useTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTracksQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useTracksQuery(baseOptions?: Apollo.QueryHookOptions<Types.TracksQuery, Types.TracksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.TracksQuery, Types.TracksQueryVariables>(TracksDocument, options);
      }
export function useTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.TracksQuery, Types.TracksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.TracksQuery, Types.TracksQueryVariables>(TracksDocument, options);
        }
export function useTracksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.TracksQuery, Types.TracksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.TracksQuery, Types.TracksQueryVariables>(TracksDocument, options);
        }
export type TracksQueryHookResult = ReturnType<typeof useTracksQuery>;
export type TracksLazyQueryHookResult = ReturnType<typeof useTracksLazyQuery>;
export type TracksSuspenseQueryHookResult = ReturnType<typeof useTracksSuspenseQuery>;
export type TracksQueryResult = Apollo.QueryResult<Types.TracksQuery, Types.TracksQueryVariables>;
export const UnitDocument = gql`
    query Unit($id: ID!) {
  unit(id: $id) {
    archivedAt
    description
    displayName
    id
    imageUrl
    name
    status
    service
    tasks {
      id
      name
      step
      thumbnailUrl
      owner {
        name
        uuid
      }
    }
    resources {
      name
      resourceId
      resourceType
      step
      thumbnailUrl
      isVirtualInternship
    }
    thumbnailUrl
  }
}
    `;

/**
 * __useUnitQuery__
 *
 * To run a query within a React component, call `useUnitQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnitQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnitQuery(baseOptions: Apollo.QueryHookOptions<Types.UnitQuery, Types.UnitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UnitQuery, Types.UnitQueryVariables>(UnitDocument, options);
      }
export function useUnitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UnitQuery, Types.UnitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UnitQuery, Types.UnitQueryVariables>(UnitDocument, options);
        }
export function useUnitSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UnitQuery, Types.UnitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UnitQuery, Types.UnitQueryVariables>(UnitDocument, options);
        }
export type UnitQueryHookResult = ReturnType<typeof useUnitQuery>;
export type UnitLazyQueryHookResult = ReturnType<typeof useUnitLazyQuery>;
export type UnitSuspenseQueryHookResult = ReturnType<typeof useUnitSuspenseQuery>;
export type UnitQueryResult = Apollo.QueryResult<Types.UnitQuery, Types.UnitQueryVariables>;
export const UnitTracksDocument = gql`
    query UnitTracks($id: ID!) {
  unit(id: $id) {
    id
    tracks {
      id
      name
    }
    resources {
      description
      imageUrl
      name
      resourceId
      resourceType
      step
      thumbnailUrl
    }
  }
}
    `;

/**
 * __useUnitTracksQuery__
 *
 * To run a query within a React component, call `useUnitTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnitTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnitTracksQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnitTracksQuery(baseOptions: Apollo.QueryHookOptions<Types.UnitTracksQuery, Types.UnitTracksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UnitTracksQuery, Types.UnitTracksQueryVariables>(UnitTracksDocument, options);
      }
export function useUnitTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UnitTracksQuery, Types.UnitTracksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UnitTracksQuery, Types.UnitTracksQueryVariables>(UnitTracksDocument, options);
        }
export function useUnitTracksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UnitTracksQuery, Types.UnitTracksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UnitTracksQuery, Types.UnitTracksQueryVariables>(UnitTracksDocument, options);
        }
export type UnitTracksQueryHookResult = ReturnType<typeof useUnitTracksQuery>;
export type UnitTracksLazyQueryHookResult = ReturnType<typeof useUnitTracksLazyQuery>;
export type UnitTracksSuspenseQueryHookResult = ReturnType<typeof useUnitTracksSuspenseQuery>;
export type UnitTracksQueryResult = Apollo.QueryResult<Types.UnitTracksQuery, Types.UnitTracksQueryVariables>;
export const UnitsDocument = gql`
    query Units($scope: ArchivableStatus, $filter: UnitFilter, $page: Int, $perPage: Int) {
  units(scope: $scope, filter: $filter, page: $page, perPage: $perPage) {
    nodes {
      archivedAt
      description
      displayName
      id
      imageUrl
      name
      status
      service
      tasks {
        id
        name
        step
      }
      thumbnailUrl
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useUnitsQuery__
 *
 * To run a query within a React component, call `useUnitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnitsQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useUnitsQuery(baseOptions?: Apollo.QueryHookOptions<Types.UnitsQuery, Types.UnitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UnitsQuery, Types.UnitsQueryVariables>(UnitsDocument, options);
      }
export function useUnitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UnitsQuery, Types.UnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UnitsQuery, Types.UnitsQueryVariables>(UnitsDocument, options);
        }
export function useUnitsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UnitsQuery, Types.UnitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UnitsQuery, Types.UnitsQueryVariables>(UnitsDocument, options);
        }
export type UnitsQueryHookResult = ReturnType<typeof useUnitsQuery>;
export type UnitsLazyQueryHookResult = ReturnType<typeof useUnitsLazyQuery>;
export type UnitsSuspenseQueryHookResult = ReturnType<typeof useUnitsSuspenseQuery>;
export type UnitsQueryResult = Apollo.QueryResult<Types.UnitsQuery, Types.UnitsQueryVariables>;
export const UserDocument = gql`
    query User($uuid: ID!) {
  user(uuid: $uuid) {
    firstName
    lastName
    email
    permissions {
      wblAdmin
      counselor
      canImpersonate
      canBrowseReports
    }
    role
    uuid
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<Types.UserQuery, Types.UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserQuery, Types.UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserQuery, Types.UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserQuery, Types.UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserQuery, Types.UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserQuery, Types.UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<Types.UserQuery, Types.UserQueryVariables>;
export const UserCoursesDocument = gql`
    query UserCourses($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: CourseFilter) {
  courses(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      metadata {
        alternativeTitles
        averageSalary
        jobZone
        onetCode
        outlook
      }
      archivedAt
      id
      description
      imageUrl
      name
      pathway {
        id
        name
      }
      status
      thumbnailUrl
      type
      collection {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useUserCoursesQuery__
 *
 * To run a query within a React component, call `useUserCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCoursesQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUserCoursesQuery(baseOptions?: Apollo.QueryHookOptions<Types.UserCoursesQuery, Types.UserCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserCoursesQuery, Types.UserCoursesQueryVariables>(UserCoursesDocument, options);
      }
export function useUserCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserCoursesQuery, Types.UserCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserCoursesQuery, Types.UserCoursesQueryVariables>(UserCoursesDocument, options);
        }
export function useUserCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserCoursesQuery, Types.UserCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserCoursesQuery, Types.UserCoursesQueryVariables>(UserCoursesDocument, options);
        }
export type UserCoursesQueryHookResult = ReturnType<typeof useUserCoursesQuery>;
export type UserCoursesLazyQueryHookResult = ReturnType<typeof useUserCoursesLazyQuery>;
export type UserCoursesSuspenseQueryHookResult = ReturnType<typeof useUserCoursesSuspenseQuery>;
export type UserCoursesQueryResult = Apollo.QueryResult<Types.UserCoursesQuery, Types.UserCoursesQueryVariables>;
export const DcUserInfoDocument = gql`
    query DcUserInfo {
  userInfo {
    availableReportTypes
    email
    logoUrl
    iconUrl
    commonAppData {
      hasRecommenderInvitation
      hasTeacherInvitation
      hasCounselorInvitation
      hasCounselorProfileFormCompleted
      hasTeacherProfileFormCompleted
      syncStatus {
        lastSyncedAt
        status
      }
    }
    entities(page: 1, perPage: 1) {
      nodes {
        uuid
        settings {
          postSecondaryApplicationsEnabled
          classManagementEnabled
          schoolYearStartDate {
            day
            month
          }
        }
        reportTypes
      }
    }
    currentSchoolYear
    firstName
    hasUnreadConversation
    hasOpportunitiesEnabled
    hasAccessToPbl
    lastName
    isImpersonated
    permissions {
      wblAdmin
      counselor
      canImpersonate
      canBrowseReports
    }
    role
    username
    uuid
    welcomeMessage
  }
}
    `;

/**
 * __useDcUserInfoQuery__
 *
 * To run a query within a React component, call `useDcUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useDcUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDcUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useDcUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<Types.DcUserInfoQuery, Types.DcUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DcUserInfoQuery, Types.DcUserInfoQueryVariables>(DcUserInfoDocument, options);
      }
export function useDcUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DcUserInfoQuery, Types.DcUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DcUserInfoQuery, Types.DcUserInfoQueryVariables>(DcUserInfoDocument, options);
        }
export function useDcUserInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DcUserInfoQuery, Types.DcUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DcUserInfoQuery, Types.DcUserInfoQueryVariables>(DcUserInfoDocument, options);
        }
export type DcUserInfoQueryHookResult = ReturnType<typeof useDcUserInfoQuery>;
export type DcUserInfoLazyQueryHookResult = ReturnType<typeof useDcUserInfoLazyQuery>;
export type DcUserInfoSuspenseQueryHookResult = ReturnType<typeof useDcUserInfoSuspenseQuery>;
export type DcUserInfoQueryResult = Apollo.QueryResult<Types.DcUserInfoQuery, Types.DcUserInfoQueryVariables>;
export const UserPlansDocument = gql`
    query UserPlans($uuid: ID!) {
  user(uuid: $uuid) {
    entities {
      nodes {
        plans {
          id
          name
        }
        uuid
      }
    }
    uuid
  }
}
    `;

/**
 * __useUserPlansQuery__
 *
 * To run a query within a React component, call `useUserPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPlansQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useUserPlansQuery(baseOptions: Apollo.QueryHookOptions<Types.UserPlansQuery, Types.UserPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserPlansQuery, Types.UserPlansQueryVariables>(UserPlansDocument, options);
      }
export function useUserPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserPlansQuery, Types.UserPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserPlansQuery, Types.UserPlansQueryVariables>(UserPlansDocument, options);
        }
export function useUserPlansSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserPlansQuery, Types.UserPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserPlansQuery, Types.UserPlansQueryVariables>(UserPlansDocument, options);
        }
export type UserPlansQueryHookResult = ReturnType<typeof useUserPlansQuery>;
export type UserPlansLazyQueryHookResult = ReturnType<typeof useUserPlansLazyQuery>;
export type UserPlansSuspenseQueryHookResult = ReturnType<typeof useUserPlansSuspenseQuery>;
export type UserPlansQueryResult = Apollo.QueryResult<Types.UserPlansQuery, Types.UserPlansQueryVariables>;
export const UserWithClassesDocument = gql`
    query UserWithClasses($uuid: ID!) {
  user(uuid: $uuid) {
    email
    firstName
    lastName
    role
    uuid
    gradingNeeded
    schoolClasses(page: 1, perPage: 100) {
      nodes {
        uuid
        name
        gradingNeeded
        entity {
          name
          uuid
        }
      }
    }
  }
}
    `;

/**
 * __useUserWithClassesQuery__
 *
 * To run a query within a React component, call `useUserWithClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserWithClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserWithClassesQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useUserWithClassesQuery(baseOptions: Apollo.QueryHookOptions<Types.UserWithClassesQuery, Types.UserWithClassesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserWithClassesQuery, Types.UserWithClassesQueryVariables>(UserWithClassesDocument, options);
      }
export function useUserWithClassesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserWithClassesQuery, Types.UserWithClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserWithClassesQuery, Types.UserWithClassesQueryVariables>(UserWithClassesDocument, options);
        }
export function useUserWithClassesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserWithClassesQuery, Types.UserWithClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserWithClassesQuery, Types.UserWithClassesQueryVariables>(UserWithClassesDocument, options);
        }
export type UserWithClassesQueryHookResult = ReturnType<typeof useUserWithClassesQuery>;
export type UserWithClassesLazyQueryHookResult = ReturnType<typeof useUserWithClassesLazyQuery>;
export type UserWithClassesSuspenseQueryHookResult = ReturnType<typeof useUserWithClassesSuspenseQuery>;
export type UserWithClassesQueryResult = Apollo.QueryResult<Types.UserWithClassesQuery, Types.UserWithClassesQueryVariables>;
export const UsersOfEntityDocument = gql`
    query UsersOfEntity($uuid: ID!, $page: Int, $perPage: Int, $filter: UserFilter) {
  entity(uuid: $uuid) {
    users(page: $page, perPage: $perPage, filter: $filter) {
      pagesCount
      nodesCount
      nodes {
        firstName
        lastName
        role
        uuid
        gradingNeeded
      }
    }
    uuid
  }
}
    `;

/**
 * __useUsersOfEntityQuery__
 *
 * To run a query within a React component, call `useUsersOfEntityQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersOfEntityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersOfEntityQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUsersOfEntityQuery(baseOptions: Apollo.QueryHookOptions<Types.UsersOfEntityQuery, Types.UsersOfEntityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UsersOfEntityQuery, Types.UsersOfEntityQueryVariables>(UsersOfEntityDocument, options);
      }
export function useUsersOfEntityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UsersOfEntityQuery, Types.UsersOfEntityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UsersOfEntityQuery, Types.UsersOfEntityQueryVariables>(UsersOfEntityDocument, options);
        }
export function useUsersOfEntitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UsersOfEntityQuery, Types.UsersOfEntityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UsersOfEntityQuery, Types.UsersOfEntityQueryVariables>(UsersOfEntityDocument, options);
        }
export type UsersOfEntityQueryHookResult = ReturnType<typeof useUsersOfEntityQuery>;
export type UsersOfEntityLazyQueryHookResult = ReturnType<typeof useUsersOfEntityLazyQuery>;
export type UsersOfEntitySuspenseQueryHookResult = ReturnType<typeof useUsersOfEntitySuspenseQuery>;
export type UsersOfEntityQueryResult = Apollo.QueryResult<Types.UsersOfEntityQuery, Types.UsersOfEntityQueryVariables>;
export const VideoDocument = gql`
    query Video($id: ID!) {
  video(id: $id) {
    archivedAt
    description
    displayName
    filename
    id
    name
    url
  }
}
    `;

/**
 * __useVideoQuery__
 *
 * To run a query within a React component, call `useVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVideoQuery(baseOptions: Apollo.QueryHookOptions<Types.VideoQuery, Types.VideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.VideoQuery, Types.VideoQueryVariables>(VideoDocument, options);
      }
export function useVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.VideoQuery, Types.VideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.VideoQuery, Types.VideoQueryVariables>(VideoDocument, options);
        }
export function useVideoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.VideoQuery, Types.VideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.VideoQuery, Types.VideoQueryVariables>(VideoDocument, options);
        }
export type VideoQueryHookResult = ReturnType<typeof useVideoQuery>;
export type VideoLazyQueryHookResult = ReturnType<typeof useVideoLazyQuery>;
export type VideoSuspenseQueryHookResult = ReturnType<typeof useVideoSuspenseQuery>;
export type VideoQueryResult = Apollo.QueryResult<Types.VideoQuery, Types.VideoQueryVariables>;
export const VideoLessonsDocument = gql`
    query VideoLessons($id: ID!) {
  video(id: $id) {
    id
    lessons {
      id
      name
    }
  }
}
    `;

/**
 * __useVideoLessonsQuery__
 *
 * To run a query within a React component, call `useVideoLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideoLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideoLessonsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVideoLessonsQuery(baseOptions: Apollo.QueryHookOptions<Types.VideoLessonsQuery, Types.VideoLessonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.VideoLessonsQuery, Types.VideoLessonsQueryVariables>(VideoLessonsDocument, options);
      }
export function useVideoLessonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.VideoLessonsQuery, Types.VideoLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.VideoLessonsQuery, Types.VideoLessonsQueryVariables>(VideoLessonsDocument, options);
        }
export function useVideoLessonsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.VideoLessonsQuery, Types.VideoLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.VideoLessonsQuery, Types.VideoLessonsQueryVariables>(VideoLessonsDocument, options);
        }
export type VideoLessonsQueryHookResult = ReturnType<typeof useVideoLessonsQuery>;
export type VideoLessonsLazyQueryHookResult = ReturnType<typeof useVideoLessonsLazyQuery>;
export type VideoLessonsSuspenseQueryHookResult = ReturnType<typeof useVideoLessonsSuspenseQuery>;
export type VideoLessonsQueryResult = Apollo.QueryResult<Types.VideoLessonsQuery, Types.VideoLessonsQueryVariables>;
export const VideosDocument = gql`
    query Videos($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: VideoFilter) {
  videos(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      description
      displayName
      filename
      id
      name
      url
    }
  }
}
    `;

/**
 * __useVideosQuery__
 *
 * To run a query within a React component, call `useVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVideosQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useVideosQuery(baseOptions?: Apollo.QueryHookOptions<Types.VideosQuery, Types.VideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.VideosQuery, Types.VideosQueryVariables>(VideosDocument, options);
      }
export function useVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.VideosQuery, Types.VideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.VideosQuery, Types.VideosQueryVariables>(VideosDocument, options);
        }
export function useVideosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.VideosQuery, Types.VideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.VideosQuery, Types.VideosQueryVariables>(VideosDocument, options);
        }
export type VideosQueryHookResult = ReturnType<typeof useVideosQuery>;
export type VideosLazyQueryHookResult = ReturnType<typeof useVideosLazyQuery>;
export type VideosSuspenseQueryHookResult = ReturnType<typeof useVideosSuspenseQuery>;
export type VideosQueryResult = Apollo.QueryResult<Types.VideosQuery, Types.VideosQueryVariables>;
export const VirtualInternshipDocument = gql`
    query VirtualInternship($id: ID!, $track: Boolean) {
  virtualInternship(id: $id, track: $track) {
    archivedAt
    id
    opportunity {
      id
      name
      availableSpots
      creditsOutcomes
      description
      imageUrl
      opportunityType
      pathways {
        id
        name
      }
      salaryInformation
      tags
    }
    requiredExperiences
    status
    calendarLessons {
      id
      step
      name
      imageUrl
      thumbnailUrl
      type
    }
    experienceOpportunityLessons {
      id
      step
      name
      imageUrl
      thumbnailUrl
      type
    }
    postExperienceLessons {
      id
      step
      name
      imageUrl
      thumbnailUrl
      type
    }
    readinessSkillsLessons {
      id
      step
      name
      imageUrl
      thumbnailUrl
      type
    }
  }
}
    `;

/**
 * __useVirtualInternshipQuery__
 *
 * To run a query within a React component, call `useVirtualInternshipQuery` and pass it any options that fit your needs.
 * When your component renders, `useVirtualInternshipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVirtualInternshipQuery({
 *   variables: {
 *      id: // value for 'id'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useVirtualInternshipQuery(baseOptions: Apollo.QueryHookOptions<Types.VirtualInternshipQuery, Types.VirtualInternshipQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.VirtualInternshipQuery, Types.VirtualInternshipQueryVariables>(VirtualInternshipDocument, options);
      }
export function useVirtualInternshipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.VirtualInternshipQuery, Types.VirtualInternshipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.VirtualInternshipQuery, Types.VirtualInternshipQueryVariables>(VirtualInternshipDocument, options);
        }
export function useVirtualInternshipSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.VirtualInternshipQuery, Types.VirtualInternshipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.VirtualInternshipQuery, Types.VirtualInternshipQueryVariables>(VirtualInternshipDocument, options);
        }
export type VirtualInternshipQueryHookResult = ReturnType<typeof useVirtualInternshipQuery>;
export type VirtualInternshipLazyQueryHookResult = ReturnType<typeof useVirtualInternshipLazyQuery>;
export type VirtualInternshipSuspenseQueryHookResult = ReturnType<typeof useVirtualInternshipSuspenseQuery>;
export type VirtualInternshipQueryResult = Apollo.QueryResult<Types.VirtualInternshipQuery, Types.VirtualInternshipQueryVariables>;
export const UserVirtualInternshipLessonDocument = gql`
    query UserVirtualInternshipLesson($virtualInternshipId: ID!, $lessonId: ID!, $track: Boolean) {
  virtualInternship(id: $virtualInternshipId) {
    id
    opportunity {
      id
      name
    }
    lesson(id: $lessonId, track: $track) {
      assignments {
        description
        displayName
        id
        step
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
        }
      }
      attachments {
        description
        displayName
        files {
          filename
          id
          url(options: {responseContentDisposition: "attachment"})
        }
        id
        step
      }
      careerReviewSurvey {
        questions {
          answer
          id
          options {
            option
            step
          }
          question
          type
        }
      }
      checkInGroups {
        displayName
        id
        questions {
          id
          question
          step
        }
        step
      }
      checkInQuestions {
        id
        question
        step
      }
      description {
        introduction
        goal
        role
        audience
        situation
      }
      hasPresentation
      id
      imageUrl
      name
      externalPresentations {
        displayName
        id
        source
        step
        isExpandable
      }
      researchLinks {
        author
        displayName
        id
        resourceLink
        sourceName
        step
      }
      texts {
        content
        displayName
        id
        step
      }
      type
      videos {
        description
        displayName
        filename
        id
        url
        step
      }
      vocabularies {
        definition
        id
        step
        term
      }
    }
  }
}
    `;

/**
 * __useUserVirtualInternshipLessonQuery__
 *
 * To run a query within a React component, call `useUserVirtualInternshipLessonQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserVirtualInternshipLessonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserVirtualInternshipLessonQuery({
 *   variables: {
 *      virtualInternshipId: // value for 'virtualInternshipId'
 *      lessonId: // value for 'lessonId'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useUserVirtualInternshipLessonQuery(baseOptions: Apollo.QueryHookOptions<Types.UserVirtualInternshipLessonQuery, Types.UserVirtualInternshipLessonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserVirtualInternshipLessonQuery, Types.UserVirtualInternshipLessonQueryVariables>(UserVirtualInternshipLessonDocument, options);
      }
export function useUserVirtualInternshipLessonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserVirtualInternshipLessonQuery, Types.UserVirtualInternshipLessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserVirtualInternshipLessonQuery, Types.UserVirtualInternshipLessonQueryVariables>(UserVirtualInternshipLessonDocument, options);
        }
export function useUserVirtualInternshipLessonSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.UserVirtualInternshipLessonQuery, Types.UserVirtualInternshipLessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserVirtualInternshipLessonQuery, Types.UserVirtualInternshipLessonQueryVariables>(UserVirtualInternshipLessonDocument, options);
        }
export type UserVirtualInternshipLessonQueryHookResult = ReturnType<typeof useUserVirtualInternshipLessonQuery>;
export type UserVirtualInternshipLessonLazyQueryHookResult = ReturnType<typeof useUserVirtualInternshipLessonLazyQuery>;
export type UserVirtualInternshipLessonSuspenseQueryHookResult = ReturnType<typeof useUserVirtualInternshipLessonSuspenseQuery>;
export type UserVirtualInternshipLessonQueryResult = Apollo.QueryResult<Types.UserVirtualInternshipLessonQuery, Types.UserVirtualInternshipLessonQueryVariables>;
export const VirtualInternshipsDocument = gql`
    query VirtualInternships($page: Int, $perPage: Int) {
  virtualInternships(page: $page, perPage: $perPage) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      id
      opportunity {
        id
        name
        availableSpots
        creditsOutcomes
        description
        imageUrl
        opportunityType
        pathways {
          id
          name
        }
        salaryInformation
        tags
      }
      requiredExperiences
      status
    }
  }
}
    `;

/**
 * __useVirtualInternshipsQuery__
 *
 * To run a query within a React component, call `useVirtualInternshipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVirtualInternshipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVirtualInternshipsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useVirtualInternshipsQuery(baseOptions?: Apollo.QueryHookOptions<Types.VirtualInternshipsQuery, Types.VirtualInternshipsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.VirtualInternshipsQuery, Types.VirtualInternshipsQueryVariables>(VirtualInternshipsDocument, options);
      }
export function useVirtualInternshipsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.VirtualInternshipsQuery, Types.VirtualInternshipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.VirtualInternshipsQuery, Types.VirtualInternshipsQueryVariables>(VirtualInternshipsDocument, options);
        }
export function useVirtualInternshipsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.VirtualInternshipsQuery, Types.VirtualInternshipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.VirtualInternshipsQuery, Types.VirtualInternshipsQueryVariables>(VirtualInternshipsDocument, options);
        }
export type VirtualInternshipsQueryHookResult = ReturnType<typeof useVirtualInternshipsQuery>;
export type VirtualInternshipsLazyQueryHookResult = ReturnType<typeof useVirtualInternshipsLazyQuery>;
export type VirtualInternshipsSuspenseQueryHookResult = ReturnType<typeof useVirtualInternshipsSuspenseQuery>;
export type VirtualInternshipsQueryResult = Apollo.QueryResult<Types.VirtualInternshipsQuery, Types.VirtualInternshipsQueryVariables>;
export const VocabulariesDocument = gql`
    query Vocabularies($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: VocabularyFilter) {
  vocabularies(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      archivedAt
      definition
      id
      term
      name: term
    }
  }
}
    `;

/**
 * __useVocabulariesQuery__
 *
 * To run a query within a React component, call `useVocabulariesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVocabulariesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVocabulariesQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useVocabulariesQuery(baseOptions?: Apollo.QueryHookOptions<Types.VocabulariesQuery, Types.VocabulariesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.VocabulariesQuery, Types.VocabulariesQueryVariables>(VocabulariesDocument, options);
      }
export function useVocabulariesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.VocabulariesQuery, Types.VocabulariesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.VocabulariesQuery, Types.VocabulariesQueryVariables>(VocabulariesDocument, options);
        }
export function useVocabulariesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.VocabulariesQuery, Types.VocabulariesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.VocabulariesQuery, Types.VocabulariesQueryVariables>(VocabulariesDocument, options);
        }
export type VocabulariesQueryHookResult = ReturnType<typeof useVocabulariesQuery>;
export type VocabulariesLazyQueryHookResult = ReturnType<typeof useVocabulariesLazyQuery>;
export type VocabulariesSuspenseQueryHookResult = ReturnType<typeof useVocabulariesSuspenseQuery>;
export type VocabulariesQueryResult = Apollo.QueryResult<Types.VocabulariesQuery, Types.VocabulariesQueryVariables>;
export const VocabularyDocument = gql`
    query Vocabulary($id: ID!) {
  vocabulary(id: $id) {
    archivedAt
    definition
    id
    term
  }
}
    `;

/**
 * __useVocabularyQuery__
 *
 * To run a query within a React component, call `useVocabularyQuery` and pass it any options that fit your needs.
 * When your component renders, `useVocabularyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVocabularyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVocabularyQuery(baseOptions: Apollo.QueryHookOptions<Types.VocabularyQuery, Types.VocabularyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.VocabularyQuery, Types.VocabularyQueryVariables>(VocabularyDocument, options);
      }
export function useVocabularyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.VocabularyQuery, Types.VocabularyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.VocabularyQuery, Types.VocabularyQueryVariables>(VocabularyDocument, options);
        }
export function useVocabularySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.VocabularyQuery, Types.VocabularyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.VocabularyQuery, Types.VocabularyQueryVariables>(VocabularyDocument, options);
        }
export type VocabularyQueryHookResult = ReturnType<typeof useVocabularyQuery>;
export type VocabularyLazyQueryHookResult = ReturnType<typeof useVocabularyLazyQuery>;
export type VocabularySuspenseQueryHookResult = ReturnType<typeof useVocabularySuspenseQuery>;
export type VocabularyQueryResult = Apollo.QueryResult<Types.VocabularyQuery, Types.VocabularyQueryVariables>;
export const VocabularyLessonsDocument = gql`
    query VocabularyLessons($id: ID!) {
  vocabulary(id: $id) {
    id
    lessons {
      id
      name
    }
  }
}
    `;

/**
 * __useVocabularyLessonsQuery__
 *
 * To run a query within a React component, call `useVocabularyLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVocabularyLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVocabularyLessonsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVocabularyLessonsQuery(baseOptions: Apollo.QueryHookOptions<Types.VocabularyLessonsQuery, Types.VocabularyLessonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.VocabularyLessonsQuery, Types.VocabularyLessonsQueryVariables>(VocabularyLessonsDocument, options);
      }
export function useVocabularyLessonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.VocabularyLessonsQuery, Types.VocabularyLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.VocabularyLessonsQuery, Types.VocabularyLessonsQueryVariables>(VocabularyLessonsDocument, options);
        }
export function useVocabularyLessonsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.VocabularyLessonsQuery, Types.VocabularyLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.VocabularyLessonsQuery, Types.VocabularyLessonsQueryVariables>(VocabularyLessonsDocument, options);
        }
export type VocabularyLessonsQueryHookResult = ReturnType<typeof useVocabularyLessonsQuery>;
export type VocabularyLessonsLazyQueryHookResult = ReturnType<typeof useVocabularyLessonsLazyQuery>;
export type VocabularyLessonsSuspenseQueryHookResult = ReturnType<typeof useVocabularyLessonsSuspenseQuery>;
export type VocabularyLessonsQueryResult = Apollo.QueryResult<Types.VocabularyLessonsQuery, Types.VocabularyLessonsQueryVariables>;