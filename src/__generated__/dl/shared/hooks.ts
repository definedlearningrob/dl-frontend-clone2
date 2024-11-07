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
export const CreateProductSubmissionFileDocument = gql`
    mutation CreateProductSubmissionFile($input: CreateProductSubmissionFileMutationInput!) {
  createProductSubmissionFile(input: $input) {
    productSubmissionFile {
      filename
      id
      source
      url(options: {responseContentDisposition: "attachment"})
    }
  }
}
    `;
export type CreateProductSubmissionFileMutationFn = Apollo.MutationFunction<Types.CreateProductSubmissionFileMutation, Types.CreateProductSubmissionFileMutationVariables>;

/**
 * __useCreateProductSubmissionFileMutation__
 *
 * To run a mutation, you first call `useCreateProductSubmissionFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductSubmissionFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductSubmissionFileMutation, { data, loading, error }] = useCreateProductSubmissionFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductSubmissionFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateProductSubmissionFileMutation, Types.CreateProductSubmissionFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateProductSubmissionFileMutation, Types.CreateProductSubmissionFileMutationVariables>(CreateProductSubmissionFileDocument, options);
      }
export type CreateProductSubmissionFileMutationHookResult = ReturnType<typeof useCreateProductSubmissionFileMutation>;
export type CreateProductSubmissionFileMutationResult = Apollo.MutationResult<Types.CreateProductSubmissionFileMutation>;
export type CreateProductSubmissionFileMutationOptions = Apollo.BaseMutationOptions<Types.CreateProductSubmissionFileMutation, Types.CreateProductSubmissionFileMutationVariables>;
export const CreateProductSubmissionFileFromGoogleDriveDocument = gql`
    mutation CreateProductSubmissionFileFromGoogleDrive($input: CreateProductSubmissionFileFromGoogleDriveMutationInput!) {
  createProductSubmissionFileFromGoogleDrive(input: $input) {
    productSubmissionFile {
      filename
      googleWeblink
      id
      source
      url(options: {responseContentDisposition: "attachment"})
    }
  }
}
    `;
export type CreateProductSubmissionFileFromGoogleDriveMutationFn = Apollo.MutationFunction<Types.CreateProductSubmissionFileFromGoogleDriveMutation, Types.CreateProductSubmissionFileFromGoogleDriveMutationVariables>;

/**
 * __useCreateProductSubmissionFileFromGoogleDriveMutation__
 *
 * To run a mutation, you first call `useCreateProductSubmissionFileFromGoogleDriveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductSubmissionFileFromGoogleDriveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductSubmissionFileFromGoogleDriveMutation, { data, loading, error }] = useCreateProductSubmissionFileFromGoogleDriveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductSubmissionFileFromGoogleDriveMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateProductSubmissionFileFromGoogleDriveMutation, Types.CreateProductSubmissionFileFromGoogleDriveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateProductSubmissionFileFromGoogleDriveMutation, Types.CreateProductSubmissionFileFromGoogleDriveMutationVariables>(CreateProductSubmissionFileFromGoogleDriveDocument, options);
      }
export type CreateProductSubmissionFileFromGoogleDriveMutationHookResult = ReturnType<typeof useCreateProductSubmissionFileFromGoogleDriveMutation>;
export type CreateProductSubmissionFileFromGoogleDriveMutationResult = Apollo.MutationResult<Types.CreateProductSubmissionFileFromGoogleDriveMutation>;
export type CreateProductSubmissionFileFromGoogleDriveMutationOptions = Apollo.BaseMutationOptions<Types.CreateProductSubmissionFileFromGoogleDriveMutation, Types.CreateProductSubmissionFileFromGoogleDriveMutationVariables>;
export const DeleteProductSubmissionFileDocument = gql`
    mutation DeleteProductSubmissionFile($input: DeleteProductSubmissionFileMutationInput!) {
  deleteProductSubmissionFile(input: $input) {
    status
    productSubmission {
      id
      productId
      grade {
        pointsScored
        pointsAvailable
        updatedAt
      }
      files {
        id
      }
    }
  }
}
    `;
export type DeleteProductSubmissionFileMutationFn = Apollo.MutationFunction<Types.DeleteProductSubmissionFileMutation, Types.DeleteProductSubmissionFileMutationVariables>;

/**
 * __useDeleteProductSubmissionFileMutation__
 *
 * To run a mutation, you first call `useDeleteProductSubmissionFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductSubmissionFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductSubmissionFileMutation, { data, loading, error }] = useDeleteProductSubmissionFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteProductSubmissionFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteProductSubmissionFileMutation, Types.DeleteProductSubmissionFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteProductSubmissionFileMutation, Types.DeleteProductSubmissionFileMutationVariables>(DeleteProductSubmissionFileDocument, options);
      }
export type DeleteProductSubmissionFileMutationHookResult = ReturnType<typeof useDeleteProductSubmissionFileMutation>;
export type DeleteProductSubmissionFileMutationResult = Apollo.MutationResult<Types.DeleteProductSubmissionFileMutation>;
export type DeleteProductSubmissionFileMutationOptions = Apollo.BaseMutationOptions<Types.DeleteProductSubmissionFileMutation, Types.DeleteProductSubmissionFileMutationVariables>;
export const TrackSlideVisitDocument = gql`
    mutation TrackSlideVisit($input: TrackSlideVisitMutationInput!) {
  trackSlideVisit(input: $input) {
    status
    clientMutationId
  }
}
    `;
export type TrackSlideVisitMutationFn = Apollo.MutationFunction<Types.TrackSlideVisitMutation, Types.TrackSlideVisitMutationVariables>;

/**
 * __useTrackSlideVisitMutation__
 *
 * To run a mutation, you first call `useTrackSlideVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackSlideVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackSlideVisitMutation, { data, loading, error }] = useTrackSlideVisitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackSlideVisitMutation(baseOptions?: Apollo.MutationHookOptions<Types.TrackSlideVisitMutation, Types.TrackSlideVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.TrackSlideVisitMutation, Types.TrackSlideVisitMutationVariables>(TrackSlideVisitDocument, options);
      }
export type TrackSlideVisitMutationHookResult = ReturnType<typeof useTrackSlideVisitMutation>;
export type TrackSlideVisitMutationResult = Apollo.MutationResult<Types.TrackSlideVisitMutation>;
export type TrackSlideVisitMutationOptions = Apollo.BaseMutationOptions<Types.TrackSlideVisitMutation, Types.TrackSlideVisitMutationVariables>;
export const CourseDetailsDocument = gql`
    query CourseDetails($projectId: ID!, $courseId: ID!) {
  project: task(id: $projectId) {
    course(id: $courseId) {
      ...CourseDetails
    }
  }
}
    ${CourseDetailsFragmentDoc}`;

/**
 * __useCourseDetailsQuery__
 *
 * To run a query within a React component, call `useCourseDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseDetailsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useCourseDetailsQuery(baseOptions: Apollo.QueryHookOptions<Types.CourseDetailsQuery, Types.CourseDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CourseDetailsQuery, Types.CourseDetailsQueryVariables>(CourseDetailsDocument, options);
      }
export function useCourseDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CourseDetailsQuery, Types.CourseDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CourseDetailsQuery, Types.CourseDetailsQueryVariables>(CourseDetailsDocument, options);
        }
export function useCourseDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CourseDetailsQuery, Types.CourseDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CourseDetailsQuery, Types.CourseDetailsQueryVariables>(CourseDetailsDocument, options);
        }
export type CourseDetailsQueryHookResult = ReturnType<typeof useCourseDetailsQuery>;
export type CourseDetailsLazyQueryHookResult = ReturnType<typeof useCourseDetailsLazyQuery>;
export type CourseDetailsSuspenseQueryHookResult = ReturnType<typeof useCourseDetailsSuspenseQuery>;
export type CourseDetailsQueryResult = Apollo.QueryResult<Types.CourseDetailsQuery, Types.CourseDetailsQueryVariables>;