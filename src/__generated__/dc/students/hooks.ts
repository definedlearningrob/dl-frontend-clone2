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
export const AddOpportunityToFavoritesDocument = gql`
    mutation AddOpportunityToFavorites($input: AddOpportunityToFavoritesMutationInput!) {
  addOpportunityToFavorites(input: $input) {
    opportunity {
      id
      isFavorite
    }
  }
}
    `;
export type AddOpportunityToFavoritesMutationFn = Apollo.MutationFunction<Types.AddOpportunityToFavoritesMutation, Types.AddOpportunityToFavoritesMutationVariables>;

/**
 * __useAddOpportunityToFavoritesMutation__
 *
 * To run a mutation, you first call `useAddOpportunityToFavoritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOpportunityToFavoritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOpportunityToFavoritesMutation, { data, loading, error }] = useAddOpportunityToFavoritesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddOpportunityToFavoritesMutation(baseOptions?: Apollo.MutationHookOptions<Types.AddOpportunityToFavoritesMutation, Types.AddOpportunityToFavoritesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AddOpportunityToFavoritesMutation, Types.AddOpportunityToFavoritesMutationVariables>(AddOpportunityToFavoritesDocument, options);
      }
export type AddOpportunityToFavoritesMutationHookResult = ReturnType<typeof useAddOpportunityToFavoritesMutation>;
export type AddOpportunityToFavoritesMutationResult = Apollo.MutationResult<Types.AddOpportunityToFavoritesMutation>;
export type AddOpportunityToFavoritesMutationOptions = Apollo.BaseMutationOptions<Types.AddOpportunityToFavoritesMutation, Types.AddOpportunityToFavoritesMutationVariables>;
export const CreateAssessmentAttemptDocument = gql`
    mutation CreateAssessmentAttempt($input: CreateAssessmentAttemptMutationInput!) {
  createAssessmentAttempt(input: $input) {
    id
  }
}
    `;
export type CreateAssessmentAttemptMutationFn = Apollo.MutationFunction<Types.CreateAssessmentAttemptMutation, Types.CreateAssessmentAttemptMutationVariables>;

/**
 * __useCreateAssessmentAttemptMutation__
 *
 * To run a mutation, you first call `useCreateAssessmentAttemptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssessmentAttemptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssessmentAttemptMutation, { data, loading, error }] = useCreateAssessmentAttemptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAssessmentAttemptMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateAssessmentAttemptMutation, Types.CreateAssessmentAttemptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateAssessmentAttemptMutation, Types.CreateAssessmentAttemptMutationVariables>(CreateAssessmentAttemptDocument, options);
      }
export type CreateAssessmentAttemptMutationHookResult = ReturnType<typeof useCreateAssessmentAttemptMutation>;
export type CreateAssessmentAttemptMutationResult = Apollo.MutationResult<Types.CreateAssessmentAttemptMutation>;
export type CreateAssessmentAttemptMutationOptions = Apollo.BaseMutationOptions<Types.CreateAssessmentAttemptMutation, Types.CreateAssessmentAttemptMutationVariables>;
export const CreateAssignmentSubmissionDocument = gql`
    mutation CreateAssignmentSubmission($input: CreateAssignmentSubmissionMutationInput!) {
  createAssignmentSubmission(input: $input) {
    assignmentSubmission {
      id
    }
  }
}
    `;
export type CreateAssignmentSubmissionMutationFn = Apollo.MutationFunction<Types.CreateAssignmentSubmissionMutation, Types.CreateAssignmentSubmissionMutationVariables>;

/**
 * __useCreateAssignmentSubmissionMutation__
 *
 * To run a mutation, you first call `useCreateAssignmentSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssignmentSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssignmentSubmissionMutation, { data, loading, error }] = useCreateAssignmentSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAssignmentSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateAssignmentSubmissionMutation, Types.CreateAssignmentSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateAssignmentSubmissionMutation, Types.CreateAssignmentSubmissionMutationVariables>(CreateAssignmentSubmissionDocument, options);
      }
export type CreateAssignmentSubmissionMutationHookResult = ReturnType<typeof useCreateAssignmentSubmissionMutation>;
export type CreateAssignmentSubmissionMutationResult = Apollo.MutationResult<Types.CreateAssignmentSubmissionMutation>;
export type CreateAssignmentSubmissionMutationOptions = Apollo.BaseMutationOptions<Types.CreateAssignmentSubmissionMutation, Types.CreateAssignmentSubmissionMutationVariables>;
export const CreateAssignmentSubmissionFileDocument = gql`
    mutation CreateAssignmentSubmissionFile($input: CreateAssignmentSubmissionFileMutationInput!) {
  createAssignmentSubmissionFile(input: $input) {
    assignmentSubmissionFile {
      filename
      id
      url(options: {responseContentDisposition: "attachment"})
    }
  }
}
    `;
export type CreateAssignmentSubmissionFileMutationFn = Apollo.MutationFunction<Types.CreateAssignmentSubmissionFileMutation, Types.CreateAssignmentSubmissionFileMutationVariables>;

/**
 * __useCreateAssignmentSubmissionFileMutation__
 *
 * To run a mutation, you first call `useCreateAssignmentSubmissionFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssignmentSubmissionFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssignmentSubmissionFileMutation, { data, loading, error }] = useCreateAssignmentSubmissionFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAssignmentSubmissionFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateAssignmentSubmissionFileMutation, Types.CreateAssignmentSubmissionFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateAssignmentSubmissionFileMutation, Types.CreateAssignmentSubmissionFileMutationVariables>(CreateAssignmentSubmissionFileDocument, options);
      }
export type CreateAssignmentSubmissionFileMutationHookResult = ReturnType<typeof useCreateAssignmentSubmissionFileMutation>;
export type CreateAssignmentSubmissionFileMutationResult = Apollo.MutationResult<Types.CreateAssignmentSubmissionFileMutation>;
export type CreateAssignmentSubmissionFileMutationOptions = Apollo.BaseMutationOptions<Types.CreateAssignmentSubmissionFileMutation, Types.CreateAssignmentSubmissionFileMutationVariables>;
export const CreateAssignmentSubmissionFileFromGoogleDriveDocument = gql`
    mutation CreateAssignmentSubmissionFileFromGoogleDrive($input: CreateAssignmentSubmissionFileFromGoogleDriveMutationInput!) {
  createAssignmentSubmissionFileFromGoogleDrive(input: $input) {
    assignmentSubmissionFile {
      filename
      googleWeblink
      id
      source
      url(options: {responseContentDisposition: "attachment"})
    }
  }
}
    `;
export type CreateAssignmentSubmissionFileFromGoogleDriveMutationFn = Apollo.MutationFunction<Types.CreateAssignmentSubmissionFileFromGoogleDriveMutation, Types.CreateAssignmentSubmissionFileFromGoogleDriveMutationVariables>;

/**
 * __useCreateAssignmentSubmissionFileFromGoogleDriveMutation__
 *
 * To run a mutation, you first call `useCreateAssignmentSubmissionFileFromGoogleDriveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssignmentSubmissionFileFromGoogleDriveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssignmentSubmissionFileFromGoogleDriveMutation, { data, loading, error }] = useCreateAssignmentSubmissionFileFromGoogleDriveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAssignmentSubmissionFileFromGoogleDriveMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateAssignmentSubmissionFileFromGoogleDriveMutation, Types.CreateAssignmentSubmissionFileFromGoogleDriveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateAssignmentSubmissionFileFromGoogleDriveMutation, Types.CreateAssignmentSubmissionFileFromGoogleDriveMutationVariables>(CreateAssignmentSubmissionFileFromGoogleDriveDocument, options);
      }
export type CreateAssignmentSubmissionFileFromGoogleDriveMutationHookResult = ReturnType<typeof useCreateAssignmentSubmissionFileFromGoogleDriveMutation>;
export type CreateAssignmentSubmissionFileFromGoogleDriveMutationResult = Apollo.MutationResult<Types.CreateAssignmentSubmissionFileFromGoogleDriveMutation>;
export type CreateAssignmentSubmissionFileFromGoogleDriveMutationOptions = Apollo.BaseMutationOptions<Types.CreateAssignmentSubmissionFileFromGoogleDriveMutation, Types.CreateAssignmentSubmissionFileFromGoogleDriveMutationVariables>;
export const CreateCareerReviewSurveyAnswersDocument = gql`
    mutation CreateCareerReviewSurveyAnswers($input: CreateCareerReviewSurveyAnswersMutationInput!) {
  createCareerReviewSurveyAnswers(input: $input) {
    status
  }
}
    `;
export type CreateCareerReviewSurveyAnswersMutationFn = Apollo.MutationFunction<Types.CreateCareerReviewSurveyAnswersMutation, Types.CreateCareerReviewSurveyAnswersMutationVariables>;

/**
 * __useCreateCareerReviewSurveyAnswersMutation__
 *
 * To run a mutation, you first call `useCreateCareerReviewSurveyAnswersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCareerReviewSurveyAnswersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCareerReviewSurveyAnswersMutation, { data, loading, error }] = useCreateCareerReviewSurveyAnswersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCareerReviewSurveyAnswersMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateCareerReviewSurveyAnswersMutation, Types.CreateCareerReviewSurveyAnswersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateCareerReviewSurveyAnswersMutation, Types.CreateCareerReviewSurveyAnswersMutationVariables>(CreateCareerReviewSurveyAnswersDocument, options);
      }
export type CreateCareerReviewSurveyAnswersMutationHookResult = ReturnType<typeof useCreateCareerReviewSurveyAnswersMutation>;
export type CreateCareerReviewSurveyAnswersMutationResult = Apollo.MutationResult<Types.CreateCareerReviewSurveyAnswersMutation>;
export type CreateCareerReviewSurveyAnswersMutationOptions = Apollo.BaseMutationOptions<Types.CreateCareerReviewSurveyAnswersMutation, Types.CreateCareerReviewSurveyAnswersMutationVariables>;
export const CreateCareerReviewSurveyAttemptDocument = gql`
    mutation CreateCareerReviewSurveyAttempt($input: CreateCareerReviewSurveyAttemptMutationInput!) {
  createCareerReviewSurveyAttempt(input: $input) {
    careerReviewSurveyAttempt {
      id
      status
    }
  }
}
    `;
export type CreateCareerReviewSurveyAttemptMutationFn = Apollo.MutationFunction<Types.CreateCareerReviewSurveyAttemptMutation, Types.CreateCareerReviewSurveyAttemptMutationVariables>;

/**
 * __useCreateCareerReviewSurveyAttemptMutation__
 *
 * To run a mutation, you first call `useCreateCareerReviewSurveyAttemptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCareerReviewSurveyAttemptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCareerReviewSurveyAttemptMutation, { data, loading, error }] = useCreateCareerReviewSurveyAttemptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCareerReviewSurveyAttemptMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateCareerReviewSurveyAttemptMutation, Types.CreateCareerReviewSurveyAttemptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateCareerReviewSurveyAttemptMutation, Types.CreateCareerReviewSurveyAttemptMutationVariables>(CreateCareerReviewSurveyAttemptDocument, options);
      }
export type CreateCareerReviewSurveyAttemptMutationHookResult = ReturnType<typeof useCreateCareerReviewSurveyAttemptMutation>;
export type CreateCareerReviewSurveyAttemptMutationResult = Apollo.MutationResult<Types.CreateCareerReviewSurveyAttemptMutation>;
export type CreateCareerReviewSurveyAttemptMutationOptions = Apollo.BaseMutationOptions<Types.CreateCareerReviewSurveyAttemptMutation, Types.CreateCareerReviewSurveyAttemptMutationVariables>;
export const DcCreateCheckInQuestionAnswerDocument = gql`
    mutation DcCreateCheckInQuestionAnswer($input: CreateCheckInQuestionAnswerMutationInput!) {
  createCheckInQuestionAnswer(input: $input) {
    checkInQuestionAnswer {
      answer
      id
    }
  }
}
    `;
export type DcCreateCheckInQuestionAnswerMutationFn = Apollo.MutationFunction<Types.DcCreateCheckInQuestionAnswerMutation, Types.DcCreateCheckInQuestionAnswerMutationVariables>;

/**
 * __useDcCreateCheckInQuestionAnswerMutation__
 *
 * To run a mutation, you first call `useDcCreateCheckInQuestionAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDcCreateCheckInQuestionAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dcCreateCheckInQuestionAnswerMutation, { data, loading, error }] = useDcCreateCheckInQuestionAnswerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDcCreateCheckInQuestionAnswerMutation(baseOptions?: Apollo.MutationHookOptions<Types.DcCreateCheckInQuestionAnswerMutation, Types.DcCreateCheckInQuestionAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DcCreateCheckInQuestionAnswerMutation, Types.DcCreateCheckInQuestionAnswerMutationVariables>(DcCreateCheckInQuestionAnswerDocument, options);
      }
export type DcCreateCheckInQuestionAnswerMutationHookResult = ReturnType<typeof useDcCreateCheckInQuestionAnswerMutation>;
export type DcCreateCheckInQuestionAnswerMutationResult = Apollo.MutationResult<Types.DcCreateCheckInQuestionAnswerMutation>;
export type DcCreateCheckInQuestionAnswerMutationOptions = Apollo.BaseMutationOptions<Types.DcCreateCheckInQuestionAnswerMutation, Types.DcCreateCheckInQuestionAnswerMutationVariables>;
export const CreateInstitutionApplicationDocument = gql`
    mutation CreateInstitutionApplication($input: CreateInstitutionApplicationMutationInput!) {
  createInstitutionApplication(input: $input) {
    institutionApplication {
      id
      name
    }
  }
}
    `;
export type CreateInstitutionApplicationMutationFn = Apollo.MutationFunction<Types.CreateInstitutionApplicationMutation, Types.CreateInstitutionApplicationMutationVariables>;

/**
 * __useCreateInstitutionApplicationMutation__
 *
 * To run a mutation, you first call `useCreateInstitutionApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInstitutionApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInstitutionApplicationMutation, { data, loading, error }] = useCreateInstitutionApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInstitutionApplicationMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateInstitutionApplicationMutation, Types.CreateInstitutionApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateInstitutionApplicationMutation, Types.CreateInstitutionApplicationMutationVariables>(CreateInstitutionApplicationDocument, options);
      }
export type CreateInstitutionApplicationMutationHookResult = ReturnType<typeof useCreateInstitutionApplicationMutation>;
export type CreateInstitutionApplicationMutationResult = Apollo.MutationResult<Types.CreateInstitutionApplicationMutation>;
export type CreateInstitutionApplicationMutationOptions = Apollo.BaseMutationOptions<Types.CreateInstitutionApplicationMutation, Types.CreateInstitutionApplicationMutationVariables>;
export const CreateOpportunityApplicationDocument = gql`
    mutation CreateOpportunityApplication($input: CreateOpportunityApplicationMutationInput!) {
  createOpportunityApplication(input: $input) {
    opportunityApplication {
      status
      answers {
        question {
          id
        }
        answer
      }
      opportunity {
        id
        applicationStatus
      }
    }
  }
}
    `;
export type CreateOpportunityApplicationMutationFn = Apollo.MutationFunction<Types.CreateOpportunityApplicationMutation, Types.CreateOpportunityApplicationMutationVariables>;

/**
 * __useCreateOpportunityApplicationMutation__
 *
 * To run a mutation, you first call `useCreateOpportunityApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOpportunityApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOpportunityApplicationMutation, { data, loading, error }] = useCreateOpportunityApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOpportunityApplicationMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateOpportunityApplicationMutation, Types.CreateOpportunityApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateOpportunityApplicationMutation, Types.CreateOpportunityApplicationMutationVariables>(CreateOpportunityApplicationDocument, options);
      }
export type CreateOpportunityApplicationMutationHookResult = ReturnType<typeof useCreateOpportunityApplicationMutation>;
export type CreateOpportunityApplicationMutationResult = Apollo.MutationResult<Types.CreateOpportunityApplicationMutation>;
export type CreateOpportunityApplicationMutationOptions = Apollo.BaseMutationOptions<Types.CreateOpportunityApplicationMutation, Types.CreateOpportunityApplicationMutationVariables>;
export const CreatePortfolioProjectDocument = gql`
    mutation CreatePortfolioProject($input: CreatePortfolioProjectMutationInput!) {
  createPortfolioProject(input: $input) {
    portfolioProject {
      description
      id
      imageUrl
      name
      submission {
        files {
          filename
          id
          url
        }
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
      id
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
export const CreateResumeDocument = gql`
    mutation CreateResume($input: CreateResumeMutationInput!) {
  createResume(input: $input) {
    resume {
      filename
      id
      url(options: {responseContentDisposition: "attachment"})
    }
  }
}
    `;
export type CreateResumeMutationFn = Apollo.MutationFunction<Types.CreateResumeMutation, Types.CreateResumeMutationVariables>;

/**
 * __useCreateResumeMutation__
 *
 * To run a mutation, you first call `useCreateResumeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateResumeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createResumeMutation, { data, loading, error }] = useCreateResumeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateResumeMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateResumeMutation, Types.CreateResumeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateResumeMutation, Types.CreateResumeMutationVariables>(CreateResumeDocument, options);
      }
export type CreateResumeMutationHookResult = ReturnType<typeof useCreateResumeMutation>;
export type CreateResumeMutationResult = Apollo.MutationResult<Types.CreateResumeMutation>;
export type CreateResumeMutationOptions = Apollo.BaseMutationOptions<Types.CreateResumeMutation, Types.CreateResumeMutationVariables>;
export const CreateStudentItemDocument = gql`
    mutation CreateStudentItem($input: CreateStudentItemMutationInput!) {
  createStudentItem(input: $input) {
    status
  }
}
    `;
export type CreateStudentItemMutationFn = Apollo.MutationFunction<Types.CreateStudentItemMutation, Types.CreateStudentItemMutationVariables>;

/**
 * __useCreateStudentItemMutation__
 *
 * To run a mutation, you first call `useCreateStudentItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudentItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudentItemMutation, { data, loading, error }] = useCreateStudentItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStudentItemMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateStudentItemMutation, Types.CreateStudentItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateStudentItemMutation, Types.CreateStudentItemMutationVariables>(CreateStudentItemDocument, options);
      }
export type CreateStudentItemMutationHookResult = ReturnType<typeof useCreateStudentItemMutation>;
export type CreateStudentItemMutationResult = Apollo.MutationResult<Types.CreateStudentItemMutation>;
export type CreateStudentItemMutationOptions = Apollo.BaseMutationOptions<Types.CreateStudentItemMutation, Types.CreateStudentItemMutationVariables>;
export const DeleteAssignmentSubmissionFileDocument = gql`
    mutation DeleteAssignmentSubmissionFile($input: DeleteAssignmentSubmissionFileMutationInput!) {
  deleteAssignmentSubmissionFile(input: $input) {
    status
  }
}
    `;
export type DeleteAssignmentSubmissionFileMutationFn = Apollo.MutationFunction<Types.DeleteAssignmentSubmissionFileMutation, Types.DeleteAssignmentSubmissionFileMutationVariables>;

/**
 * __useDeleteAssignmentSubmissionFileMutation__
 *
 * To run a mutation, you first call `useDeleteAssignmentSubmissionFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAssignmentSubmissionFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAssignmentSubmissionFileMutation, { data, loading, error }] = useDeleteAssignmentSubmissionFileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteAssignmentSubmissionFileMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteAssignmentSubmissionFileMutation, Types.DeleteAssignmentSubmissionFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteAssignmentSubmissionFileMutation, Types.DeleteAssignmentSubmissionFileMutationVariables>(DeleteAssignmentSubmissionFileDocument, options);
      }
export type DeleteAssignmentSubmissionFileMutationHookResult = ReturnType<typeof useDeleteAssignmentSubmissionFileMutation>;
export type DeleteAssignmentSubmissionFileMutationResult = Apollo.MutationResult<Types.DeleteAssignmentSubmissionFileMutation>;
export type DeleteAssignmentSubmissionFileMutationOptions = Apollo.BaseMutationOptions<Types.DeleteAssignmentSubmissionFileMutation, Types.DeleteAssignmentSubmissionFileMutationVariables>;
export const DeleteInstitutionApplicationDocument = gql`
    mutation DeleteInstitutionApplication($input: DeleteInstitutionApplicationMutationInput!) {
  deleteInstitutionApplication(input: $input) {
    status
  }
}
    `;
export type DeleteInstitutionApplicationMutationFn = Apollo.MutationFunction<Types.DeleteInstitutionApplicationMutation, Types.DeleteInstitutionApplicationMutationVariables>;

/**
 * __useDeleteInstitutionApplicationMutation__
 *
 * To run a mutation, you first call `useDeleteInstitutionApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInstitutionApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInstitutionApplicationMutation, { data, loading, error }] = useDeleteInstitutionApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteInstitutionApplicationMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteInstitutionApplicationMutation, Types.DeleteInstitutionApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteInstitutionApplicationMutation, Types.DeleteInstitutionApplicationMutationVariables>(DeleteInstitutionApplicationDocument, options);
      }
export type DeleteInstitutionApplicationMutationHookResult = ReturnType<typeof useDeleteInstitutionApplicationMutation>;
export type DeleteInstitutionApplicationMutationResult = Apollo.MutationResult<Types.DeleteInstitutionApplicationMutation>;
export type DeleteInstitutionApplicationMutationOptions = Apollo.BaseMutationOptions<Types.DeleteInstitutionApplicationMutation, Types.DeleteInstitutionApplicationMutationVariables>;
export const DeleteOpportunityApplicationDocument = gql`
    mutation DeleteOpportunityApplication($input: DeleteOpportunityApplicationMutationInput!) {
  deleteOpportunityApplication(input: $input) {
    status
  }
}
    `;
export type DeleteOpportunityApplicationMutationFn = Apollo.MutationFunction<Types.DeleteOpportunityApplicationMutation, Types.DeleteOpportunityApplicationMutationVariables>;

/**
 * __useDeleteOpportunityApplicationMutation__
 *
 * To run a mutation, you first call `useDeleteOpportunityApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOpportunityApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOpportunityApplicationMutation, { data, loading, error }] = useDeleteOpportunityApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteOpportunityApplicationMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteOpportunityApplicationMutation, Types.DeleteOpportunityApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteOpportunityApplicationMutation, Types.DeleteOpportunityApplicationMutationVariables>(DeleteOpportunityApplicationDocument, options);
      }
export type DeleteOpportunityApplicationMutationHookResult = ReturnType<typeof useDeleteOpportunityApplicationMutation>;
export type DeleteOpportunityApplicationMutationResult = Apollo.MutationResult<Types.DeleteOpportunityApplicationMutation>;
export type DeleteOpportunityApplicationMutationOptions = Apollo.BaseMutationOptions<Types.DeleteOpportunityApplicationMutation, Types.DeleteOpportunityApplicationMutationVariables>;
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
export const DeleteResumeDocument = gql`
    mutation DeleteResume($input: DeleteResumeMutationInput!) {
  deleteResume(input: $input) {
    status
  }
}
    `;
export type DeleteResumeMutationFn = Apollo.MutationFunction<Types.DeleteResumeMutation, Types.DeleteResumeMutationVariables>;

/**
 * __useDeleteResumeMutation__
 *
 * To run a mutation, you first call `useDeleteResumeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteResumeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteResumeMutation, { data, loading, error }] = useDeleteResumeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteResumeMutation(baseOptions?: Apollo.MutationHookOptions<Types.DeleteResumeMutation, Types.DeleteResumeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DeleteResumeMutation, Types.DeleteResumeMutationVariables>(DeleteResumeDocument, options);
      }
export type DeleteResumeMutationHookResult = ReturnType<typeof useDeleteResumeMutation>;
export type DeleteResumeMutationResult = Apollo.MutationResult<Types.DeleteResumeMutation>;
export type DeleteResumeMutationOptions = Apollo.BaseMutationOptions<Types.DeleteResumeMutation, Types.DeleteResumeMutationVariables>;
export const DisenrollFromCourseDocument = gql`
    mutation DisenrollFromCourse($input: DisenrollFromCourseMutationInput!) {
  disenrollFromCourse(input: $input) {
    courseId
  }
}
    `;
export type DisenrollFromCourseMutationFn = Apollo.MutationFunction<Types.DisenrollFromCourseMutation, Types.DisenrollFromCourseMutationVariables>;

/**
 * __useDisenrollFromCourseMutation__
 *
 * To run a mutation, you first call `useDisenrollFromCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDisenrollFromCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [disenrollFromCourseMutation, { data, loading, error }] = useDisenrollFromCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDisenrollFromCourseMutation(baseOptions?: Apollo.MutationHookOptions<Types.DisenrollFromCourseMutation, Types.DisenrollFromCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DisenrollFromCourseMutation, Types.DisenrollFromCourseMutationVariables>(DisenrollFromCourseDocument, options);
      }
export type DisenrollFromCourseMutationHookResult = ReturnType<typeof useDisenrollFromCourseMutation>;
export type DisenrollFromCourseMutationResult = Apollo.MutationResult<Types.DisenrollFromCourseMutation>;
export type DisenrollFromCourseMutationOptions = Apollo.BaseMutationOptions<Types.DisenrollFromCourseMutation, Types.DisenrollFromCourseMutationVariables>;
export const EnrollInCourseDocument = gql`
    mutation EnrollInCourse($input: EnrollInCourseMutationInput!) {
  enrollInCourse(input: $input) {
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
export type EnrollInCourseMutationFn = Apollo.MutationFunction<Types.EnrollInCourseMutation, Types.EnrollInCourseMutationVariables>;

/**
 * __useEnrollInCourseMutation__
 *
 * To run a mutation, you first call `useEnrollInCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollInCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollInCourseMutation, { data, loading, error }] = useEnrollInCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEnrollInCourseMutation(baseOptions?: Apollo.MutationHookOptions<Types.EnrollInCourseMutation, Types.EnrollInCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.EnrollInCourseMutation, Types.EnrollInCourseMutationVariables>(EnrollInCourseDocument, options);
      }
export type EnrollInCourseMutationHookResult = ReturnType<typeof useEnrollInCourseMutation>;
export type EnrollInCourseMutationResult = Apollo.MutationResult<Types.EnrollInCourseMutation>;
export type EnrollInCourseMutationOptions = Apollo.BaseMutationOptions<Types.EnrollInCourseMutation, Types.EnrollInCourseMutationVariables>;
export const FinishAssessmentDocument = gql`
    mutation FinishAssessment($attemptId: ID!) {
  createAssessmentResult(input: {attemptId: $attemptId}) {
    status
  }
}
    `;
export type FinishAssessmentMutationFn = Apollo.MutationFunction<Types.FinishAssessmentMutation, Types.FinishAssessmentMutationVariables>;

/**
 * __useFinishAssessmentMutation__
 *
 * To run a mutation, you first call `useFinishAssessmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinishAssessmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finishAssessmentMutation, { data, loading, error }] = useFinishAssessmentMutation({
 *   variables: {
 *      attemptId: // value for 'attemptId'
 *   },
 * });
 */
export function useFinishAssessmentMutation(baseOptions?: Apollo.MutationHookOptions<Types.FinishAssessmentMutation, Types.FinishAssessmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.FinishAssessmentMutation, Types.FinishAssessmentMutationVariables>(FinishAssessmentDocument, options);
      }
export type FinishAssessmentMutationHookResult = ReturnType<typeof useFinishAssessmentMutation>;
export type FinishAssessmentMutationResult = Apollo.MutationResult<Types.FinishAssessmentMutation>;
export type FinishAssessmentMutationOptions = Apollo.BaseMutationOptions<Types.FinishAssessmentMutation, Types.FinishAssessmentMutationVariables>;
export const GenerateFerpaUrlDocument = gql`
    mutation GenerateFerpaUrl($input: GenerateFerpaUrlMutationInput!) {
  generateFerpaUrl(input: $input) {
    url
  }
}
    `;
export type GenerateFerpaUrlMutationFn = Apollo.MutationFunction<Types.GenerateFerpaUrlMutation, Types.GenerateFerpaUrlMutationVariables>;

/**
 * __useGenerateFerpaUrlMutation__
 *
 * To run a mutation, you first call `useGenerateFerpaUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateFerpaUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateFerpaUrlMutation, { data, loading, error }] = useGenerateFerpaUrlMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateFerpaUrlMutation(baseOptions?: Apollo.MutationHookOptions<Types.GenerateFerpaUrlMutation, Types.GenerateFerpaUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.GenerateFerpaUrlMutation, Types.GenerateFerpaUrlMutationVariables>(GenerateFerpaUrlDocument, options);
      }
export type GenerateFerpaUrlMutationHookResult = ReturnType<typeof useGenerateFerpaUrlMutation>;
export type GenerateFerpaUrlMutationResult = Apollo.MutationResult<Types.GenerateFerpaUrlMutation>;
export type GenerateFerpaUrlMutationOptions = Apollo.BaseMutationOptions<Types.GenerateFerpaUrlMutation, Types.GenerateFerpaUrlMutationVariables>;
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
export const ManageOpportunityExperienceLessonsDocument = gql`
    mutation ManageOpportunityExperienceLessons($input: ManageOpportunityExperienceLessonsMutationInput!) {
  manageOpportunityExperienceLessons(input: $input) {
    virtualInternship {
      id
      studentExperienceOpportunityLessons {
        type
        id
        name
        thumbnailUrl
        progress {
          submitted
          total
        }
      }
      content {
        id
        name
        items {
          id
          name
          type
          completed
        }
        checkIns {
          id
          name
          type
          completed
        }
        type
      }
    }
  }
}
    `;
export type ManageOpportunityExperienceLessonsMutationFn = Apollo.MutationFunction<Types.ManageOpportunityExperienceLessonsMutation, Types.ManageOpportunityExperienceLessonsMutationVariables>;

/**
 * __useManageOpportunityExperienceLessonsMutation__
 *
 * To run a mutation, you first call `useManageOpportunityExperienceLessonsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useManageOpportunityExperienceLessonsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [manageOpportunityExperienceLessonsMutation, { data, loading, error }] = useManageOpportunityExperienceLessonsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useManageOpportunityExperienceLessonsMutation(baseOptions?: Apollo.MutationHookOptions<Types.ManageOpportunityExperienceLessonsMutation, Types.ManageOpportunityExperienceLessonsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ManageOpportunityExperienceLessonsMutation, Types.ManageOpportunityExperienceLessonsMutationVariables>(ManageOpportunityExperienceLessonsDocument, options);
      }
export type ManageOpportunityExperienceLessonsMutationHookResult = ReturnType<typeof useManageOpportunityExperienceLessonsMutation>;
export type ManageOpportunityExperienceLessonsMutationResult = Apollo.MutationResult<Types.ManageOpportunityExperienceLessonsMutation>;
export type ManageOpportunityExperienceLessonsMutationOptions = Apollo.BaseMutationOptions<Types.ManageOpportunityExperienceLessonsMutation, Types.ManageOpportunityExperienceLessonsMutationVariables>;
export const MarkFinalReportAsSeenDocument = gql`
    mutation MarkFinalReportAsSeen($input: MarkFinalReportAsSeenMutationInput!) {
  markFinalReportAsSeen(input: $input) {
    status
  }
}
    `;
export type MarkFinalReportAsSeenMutationFn = Apollo.MutationFunction<Types.MarkFinalReportAsSeenMutation, Types.MarkFinalReportAsSeenMutationVariables>;

/**
 * __useMarkFinalReportAsSeenMutation__
 *
 * To run a mutation, you first call `useMarkFinalReportAsSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkFinalReportAsSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markFinalReportAsSeenMutation, { data, loading, error }] = useMarkFinalReportAsSeenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarkFinalReportAsSeenMutation(baseOptions?: Apollo.MutationHookOptions<Types.MarkFinalReportAsSeenMutation, Types.MarkFinalReportAsSeenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.MarkFinalReportAsSeenMutation, Types.MarkFinalReportAsSeenMutationVariables>(MarkFinalReportAsSeenDocument, options);
      }
export type MarkFinalReportAsSeenMutationHookResult = ReturnType<typeof useMarkFinalReportAsSeenMutation>;
export type MarkFinalReportAsSeenMutationResult = Apollo.MutationResult<Types.MarkFinalReportAsSeenMutation>;
export type MarkFinalReportAsSeenMutationOptions = Apollo.BaseMutationOptions<Types.MarkFinalReportAsSeenMutation, Types.MarkFinalReportAsSeenMutationVariables>;
export const RemoveOpportunityFromFavoritesDocument = gql`
    mutation RemoveOpportunityFromFavorites($input: RemoveOpportunityFromFavoritesMutationInput!) {
  removeOpportunityFromFavorites(input: $input) {
    opportunity {
      id
      isFavorite
    }
  }
}
    `;
export type RemoveOpportunityFromFavoritesMutationFn = Apollo.MutationFunction<Types.RemoveOpportunityFromFavoritesMutation, Types.RemoveOpportunityFromFavoritesMutationVariables>;

/**
 * __useRemoveOpportunityFromFavoritesMutation__
 *
 * To run a mutation, you first call `useRemoveOpportunityFromFavoritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveOpportunityFromFavoritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeOpportunityFromFavoritesMutation, { data, loading, error }] = useRemoveOpportunityFromFavoritesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveOpportunityFromFavoritesMutation(baseOptions?: Apollo.MutationHookOptions<Types.RemoveOpportunityFromFavoritesMutation, Types.RemoveOpportunityFromFavoritesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.RemoveOpportunityFromFavoritesMutation, Types.RemoveOpportunityFromFavoritesMutationVariables>(RemoveOpportunityFromFavoritesDocument, options);
      }
export type RemoveOpportunityFromFavoritesMutationHookResult = ReturnType<typeof useRemoveOpportunityFromFavoritesMutation>;
export type RemoveOpportunityFromFavoritesMutationResult = Apollo.MutationResult<Types.RemoveOpportunityFromFavoritesMutation>;
export type RemoveOpportunityFromFavoritesMutationOptions = Apollo.BaseMutationOptions<Types.RemoveOpportunityFromFavoritesMutation, Types.RemoveOpportunityFromFavoritesMutationVariables>;
export const SaveAssessmentProgressDocument = gql`
    mutation SaveAssessmentProgress($async: Boolean, $attemptId: ID!, $interestsAnswers: [InterestsAnswerAttributes!]!, $studyPreferencesAnswers: [StudyPreferencesAnswerAttributes!]!, $workValuesAnswers: [WorkValuesAnswerAttributes!]!) {
  createInterestsAnswers(
    input: {attemptId: $attemptId, async: $async, answers: $interestsAnswers}
  ) {
    status
  }
  createWorkValuesAnswers(
    input: {attemptId: $attemptId, async: $async, answers: $workValuesAnswers}
  ) {
    status
  }
  createStudyPreferencesAnswers(
    input: {attemptId: $attemptId, async: $async, answers: $studyPreferencesAnswers}
  ) {
    status
  }
}
    `;
export type SaveAssessmentProgressMutationFn = Apollo.MutationFunction<Types.SaveAssessmentProgressMutation, Types.SaveAssessmentProgressMutationVariables>;

/**
 * __useSaveAssessmentProgressMutation__
 *
 * To run a mutation, you first call `useSaveAssessmentProgressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveAssessmentProgressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveAssessmentProgressMutation, { data, loading, error }] = useSaveAssessmentProgressMutation({
 *   variables: {
 *      async: // value for 'async'
 *      attemptId: // value for 'attemptId'
 *      interestsAnswers: // value for 'interestsAnswers'
 *      studyPreferencesAnswers: // value for 'studyPreferencesAnswers'
 *      workValuesAnswers: // value for 'workValuesAnswers'
 *   },
 * });
 */
export function useSaveAssessmentProgressMutation(baseOptions?: Apollo.MutationHookOptions<Types.SaveAssessmentProgressMutation, Types.SaveAssessmentProgressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SaveAssessmentProgressMutation, Types.SaveAssessmentProgressMutationVariables>(SaveAssessmentProgressDocument, options);
      }
export type SaveAssessmentProgressMutationHookResult = ReturnType<typeof useSaveAssessmentProgressMutation>;
export type SaveAssessmentProgressMutationResult = Apollo.MutationResult<Types.SaveAssessmentProgressMutation>;
export type SaveAssessmentProgressMutationOptions = Apollo.BaseMutationOptions<Types.SaveAssessmentProgressMutation, Types.SaveAssessmentProgressMutationVariables>;
export const SelectCounselorDocument = gql`
    mutation SelectCounselor($input: SelectCounselorMutationInput!) {
  selectCounselor(input: $input) {
    counselor {
      email
      firstName
      lastName
    }
  }
}
    `;
export type SelectCounselorMutationFn = Apollo.MutationFunction<Types.SelectCounselorMutation, Types.SelectCounselorMutationVariables>;

/**
 * __useSelectCounselorMutation__
 *
 * To run a mutation, you first call `useSelectCounselorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSelectCounselorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [selectCounselorMutation, { data, loading, error }] = useSelectCounselorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSelectCounselorMutation(baseOptions?: Apollo.MutationHookOptions<Types.SelectCounselorMutation, Types.SelectCounselorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SelectCounselorMutation, Types.SelectCounselorMutationVariables>(SelectCounselorDocument, options);
      }
export type SelectCounselorMutationHookResult = ReturnType<typeof useSelectCounselorMutation>;
export type SelectCounselorMutationResult = Apollo.MutationResult<Types.SelectCounselorMutation>;
export type SelectCounselorMutationOptions = Apollo.BaseMutationOptions<Types.SelectCounselorMutation, Types.SelectCounselorMutationVariables>;
export const SelectTeachersDocument = gql`
    mutation SelectTeachers($input: SelectTeachersMutationInput!) {
  selectTeachers(input: $input) {
    teachers {
      email
      fullName
      name
      username
      uuid
    }
  }
}
    `;
export type SelectTeachersMutationFn = Apollo.MutationFunction<Types.SelectTeachersMutation, Types.SelectTeachersMutationVariables>;

/**
 * __useSelectTeachersMutation__
 *
 * To run a mutation, you first call `useSelectTeachersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSelectTeachersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [selectTeachersMutation, { data, loading, error }] = useSelectTeachersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSelectTeachersMutation(baseOptions?: Apollo.MutationHookOptions<Types.SelectTeachersMutation, Types.SelectTeachersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SelectTeachersMutation, Types.SelectTeachersMutationVariables>(SelectTeachersDocument, options);
      }
export type SelectTeachersMutationHookResult = ReturnType<typeof useSelectTeachersMutation>;
export type SelectTeachersMutationResult = Apollo.MutationResult<Types.SelectTeachersMutation>;
export type SelectTeachersMutationOptions = Apollo.BaseMutationOptions<Types.SelectTeachersMutation, Types.SelectTeachersMutationVariables>;
export const ToggleInstitutionFavoriteDocument = gql`
    mutation ToggleInstitutionFavorite($input: ToggleInstitutionFavoriteMutationInput!) {
  toggleInstitutionFavorite(input: $input) {
    institution {
      id
      name
      isFavorite
    }
  }
}
    `;
export type ToggleInstitutionFavoriteMutationFn = Apollo.MutationFunction<Types.ToggleInstitutionFavoriteMutation, Types.ToggleInstitutionFavoriteMutationVariables>;

/**
 * __useToggleInstitutionFavoriteMutation__
 *
 * To run a mutation, you first call `useToggleInstitutionFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleInstitutionFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleInstitutionFavoriteMutation, { data, loading, error }] = useToggleInstitutionFavoriteMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleInstitutionFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<Types.ToggleInstitutionFavoriteMutation, Types.ToggleInstitutionFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ToggleInstitutionFavoriteMutation, Types.ToggleInstitutionFavoriteMutationVariables>(ToggleInstitutionFavoriteDocument, options);
      }
export type ToggleInstitutionFavoriteMutationHookResult = ReturnType<typeof useToggleInstitutionFavoriteMutation>;
export type ToggleInstitutionFavoriteMutationResult = Apollo.MutationResult<Types.ToggleInstitutionFavoriteMutation>;
export type ToggleInstitutionFavoriteMutationOptions = Apollo.BaseMutationOptions<Types.ToggleInstitutionFavoriteMutation, Types.ToggleInstitutionFavoriteMutationVariables>;
export const UpdateAssessmentAttemptDocument = gql`
    mutation UpdateAssessmentAttempt($input: UpdateAssessmentAttemptMutationInput!) {
  updateAssessmentAttempt(input: $input) {
    status
  }
}
    `;
export type UpdateAssessmentAttemptMutationFn = Apollo.MutationFunction<Types.UpdateAssessmentAttemptMutation, Types.UpdateAssessmentAttemptMutationVariables>;

/**
 * __useUpdateAssessmentAttemptMutation__
 *
 * To run a mutation, you first call `useUpdateAssessmentAttemptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssessmentAttemptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssessmentAttemptMutation, { data, loading, error }] = useUpdateAssessmentAttemptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAssessmentAttemptMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateAssessmentAttemptMutation, Types.UpdateAssessmentAttemptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateAssessmentAttemptMutation, Types.UpdateAssessmentAttemptMutationVariables>(UpdateAssessmentAttemptDocument, options);
      }
export type UpdateAssessmentAttemptMutationHookResult = ReturnType<typeof useUpdateAssessmentAttemptMutation>;
export type UpdateAssessmentAttemptMutationResult = Apollo.MutationResult<Types.UpdateAssessmentAttemptMutation>;
export type UpdateAssessmentAttemptMutationOptions = Apollo.BaseMutationOptions<Types.UpdateAssessmentAttemptMutation, Types.UpdateAssessmentAttemptMutationVariables>;
export const UpdateAssignmentSubmissionMutationDocument = gql`
    mutation UpdateAssignmentSubmissionMutation($input: UpdateAssignmentSubmissionMutationInput!) {
  updateAssignmentSubmission(input: $input) {
    assignmentSubmission {
      files {
        filename
      }
      grade {
        createdAt
        id
      }
      id
      status
    }
    clientMutationId
  }
}
    `;
export type UpdateAssignmentSubmissionMutationMutationFn = Apollo.MutationFunction<Types.UpdateAssignmentSubmissionMutation, Types.UpdateAssignmentSubmissionMutationVariables>;

/**
 * __useUpdateAssignmentSubmissionMutation__
 *
 * To run a mutation, you first call `useUpdateAssignmentSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssignmentSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssignmentSubmissionMutation, { data, loading, error }] = useUpdateAssignmentSubmissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAssignmentSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateAssignmentSubmissionMutation, Types.UpdateAssignmentSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateAssignmentSubmissionMutation, Types.UpdateAssignmentSubmissionMutationVariables>(UpdateAssignmentSubmissionMutationDocument, options);
      }
export type UpdateAssignmentSubmissionMutationHookResult = ReturnType<typeof useUpdateAssignmentSubmissionMutation>;
export type UpdateAssignmentSubmissionMutationMutationResult = Apollo.MutationResult<Types.UpdateAssignmentSubmissionMutation>;
export type UpdateAssignmentSubmissionMutationMutationOptions = Apollo.BaseMutationOptions<Types.UpdateAssignmentSubmissionMutation, Types.UpdateAssignmentSubmissionMutationVariables>;
export const DcUpdateCheckInQuestionAnswerDocument = gql`
    mutation DcUpdateCheckInQuestionAnswer($input: UpdateCheckInQuestionAnswerMutationInput!) {
  updateCheckInQuestionAnswer(input: $input) {
    checkInQuestionAnswer {
      answer
      id
    }
  }
}
    `;
export type DcUpdateCheckInQuestionAnswerMutationFn = Apollo.MutationFunction<Types.DcUpdateCheckInQuestionAnswerMutation, Types.DcUpdateCheckInQuestionAnswerMutationVariables>;

/**
 * __useDcUpdateCheckInQuestionAnswerMutation__
 *
 * To run a mutation, you first call `useDcUpdateCheckInQuestionAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDcUpdateCheckInQuestionAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dcUpdateCheckInQuestionAnswerMutation, { data, loading, error }] = useDcUpdateCheckInQuestionAnswerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDcUpdateCheckInQuestionAnswerMutation(baseOptions?: Apollo.MutationHookOptions<Types.DcUpdateCheckInQuestionAnswerMutation, Types.DcUpdateCheckInQuestionAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.DcUpdateCheckInQuestionAnswerMutation, Types.DcUpdateCheckInQuestionAnswerMutationVariables>(DcUpdateCheckInQuestionAnswerDocument, options);
      }
export type DcUpdateCheckInQuestionAnswerMutationHookResult = ReturnType<typeof useDcUpdateCheckInQuestionAnswerMutation>;
export type DcUpdateCheckInQuestionAnswerMutationResult = Apollo.MutationResult<Types.DcUpdateCheckInQuestionAnswerMutation>;
export type DcUpdateCheckInQuestionAnswerMutationOptions = Apollo.BaseMutationOptions<Types.DcUpdateCheckInQuestionAnswerMutation, Types.DcUpdateCheckInQuestionAnswerMutationVariables>;
export const UpdateCommonAppMetadataDocument = gql`
    mutation UpdateCommonAppMetadata($input: UpdateCommonAppMetadataMutationInput!) {
  updateCommonAppMetadata(input: $input) {
    userInfo {
      settings {
        assessmentEnabled
        assessmentType
        onboardingEnabled
        selfEvaluationEnabled
      }
      commonAppData {
        connectionUrl
        hasAccountConnected
        hasFerpaSigned
      }
      email
      hasCompletedAssessment
      hasCompletedOnboarding
      hasUnreadConversation
      hasAccessToPbl
      firstName
      isImpersonated
      lastName
      state
      unreadAnnouncementsCount
      unreadNotificationsCount
      username
      uuid
    }
  }
}
    `;
export type UpdateCommonAppMetadataMutationFn = Apollo.MutationFunction<Types.UpdateCommonAppMetadataMutation, Types.UpdateCommonAppMetadataMutationVariables>;

/**
 * __useUpdateCommonAppMetadataMutation__
 *
 * To run a mutation, you first call `useUpdateCommonAppMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommonAppMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommonAppMetadataMutation, { data, loading, error }] = useUpdateCommonAppMetadataMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCommonAppMetadataMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateCommonAppMetadataMutation, Types.UpdateCommonAppMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateCommonAppMetadataMutation, Types.UpdateCommonAppMetadataMutationVariables>(UpdateCommonAppMetadataDocument, options);
      }
export type UpdateCommonAppMetadataMutationHookResult = ReturnType<typeof useUpdateCommonAppMetadataMutation>;
export type UpdateCommonAppMetadataMutationResult = Apollo.MutationResult<Types.UpdateCommonAppMetadataMutation>;
export type UpdateCommonAppMetadataMutationOptions = Apollo.BaseMutationOptions<Types.UpdateCommonAppMetadataMutation, Types.UpdateCommonAppMetadataMutationVariables>;
export const UpdateInstitutionDocument = gql`
    mutation UpdateInstitution($input: UpdateInstitutionApplicationMutationInput!) {
  updateInstitutionApplication(input: $input) {
    institutionApplication {
      status
      name
    }
  }
}
    `;
export type UpdateInstitutionMutationFn = Apollo.MutationFunction<Types.UpdateInstitutionMutation, Types.UpdateInstitutionMutationVariables>;

/**
 * __useUpdateInstitutionMutation__
 *
 * To run a mutation, you first call `useUpdateInstitutionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInstitutionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInstitutionMutation, { data, loading, error }] = useUpdateInstitutionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateInstitutionMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateInstitutionMutation, Types.UpdateInstitutionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateInstitutionMutation, Types.UpdateInstitutionMutationVariables>(UpdateInstitutionDocument, options);
      }
export type UpdateInstitutionMutationHookResult = ReturnType<typeof useUpdateInstitutionMutation>;
export type UpdateInstitutionMutationResult = Apollo.MutationResult<Types.UpdateInstitutionMutation>;
export type UpdateInstitutionMutationOptions = Apollo.BaseMutationOptions<Types.UpdateInstitutionMutation, Types.UpdateInstitutionMutationVariables>;
export const UpdateNotificationDocument = gql`
    mutation UpdateNotification($input: UpdateNotificationMutationInput!) {
  updateNotification(input: $input) {
    notification {
      id
      read
    }
  }
}
    `;
export type UpdateNotificationMutationFn = Apollo.MutationFunction<Types.UpdateNotificationMutation, Types.UpdateNotificationMutationVariables>;

/**
 * __useUpdateNotificationMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationMutation, { data, loading, error }] = useUpdateNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNotificationMutation(baseOptions?: Apollo.MutationHookOptions<Types.UpdateNotificationMutation, Types.UpdateNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.UpdateNotificationMutation, Types.UpdateNotificationMutationVariables>(UpdateNotificationDocument, options);
      }
export type UpdateNotificationMutationHookResult = ReturnType<typeof useUpdateNotificationMutation>;
export type UpdateNotificationMutationResult = Apollo.MutationResult<Types.UpdateNotificationMutation>;
export type UpdateNotificationMutationOptions = Apollo.BaseMutationOptions<Types.UpdateNotificationMutation, Types.UpdateNotificationMutationVariables>;
export const UpdatePortfolioProjectDocument = gql`
    mutation UpdatePortfolioProject($input: UpdatePortfolioProjectMutationInput!) {
  updatePortfolioProject(input: $input) {
    portfolioProject {
      description
      id
      imageUrl
      name
      submission {
        files {
          filename
          id
          url
        }
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
export const AllCoursesDocument = gql`
    query AllCourses($filter: StudentCourseFilter, $page: Int, $perPage: Int) {
  allCourses(filter: $filter, page: $page, perPage: $perPage) {
    nodes {
      id
      imageUrl
      thumbnailUrl
      match
      name
      pathway {
        name
      }
      type
      collection {
        id
        name
      }
      metadata {
        alternativeTitles
        averageSalary
        jobZone
        onetCode
        outlook
      }
      collection {
        id
        name
      }
      isRecommended
      isEnrolled
    }
    pagesCount
  }
}
    `;

/**
 * __useAllCoursesQuery__
 *
 * To run a query within a React component, call `useAllCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCoursesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useAllCoursesQuery(baseOptions?: Apollo.QueryHookOptions<Types.AllCoursesQuery, Types.AllCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AllCoursesQuery, Types.AllCoursesQueryVariables>(AllCoursesDocument, options);
      }
export function useAllCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AllCoursesQuery, Types.AllCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AllCoursesQuery, Types.AllCoursesQueryVariables>(AllCoursesDocument, options);
        }
export function useAllCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AllCoursesQuery, Types.AllCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AllCoursesQuery, Types.AllCoursesQueryVariables>(AllCoursesDocument, options);
        }
export type AllCoursesQueryHookResult = ReturnType<typeof useAllCoursesQuery>;
export type AllCoursesLazyQueryHookResult = ReturnType<typeof useAllCoursesLazyQuery>;
export type AllCoursesSuspenseQueryHookResult = ReturnType<typeof useAllCoursesSuspenseQuery>;
export type AllCoursesQueryResult = Apollo.QueryResult<Types.AllCoursesQuery, Types.AllCoursesQueryVariables>;
export const AnnouncementDocument = gql`
    query Announcement($id: ID!) {
  announcement(id: $id) {
    author {
      email
      firstName
      lastName
      username
      uuid
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
    `;

/**
 * __useAnnouncementQuery__
 *
 * To run a query within a React component, call `useAnnouncementQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnnouncementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnnouncementQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAnnouncementQuery(baseOptions: Apollo.QueryHookOptions<Types.AnnouncementQuery, Types.AnnouncementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AnnouncementQuery, Types.AnnouncementQueryVariables>(AnnouncementDocument, options);
      }
export function useAnnouncementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AnnouncementQuery, Types.AnnouncementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AnnouncementQuery, Types.AnnouncementQueryVariables>(AnnouncementDocument, options);
        }
export function useAnnouncementSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AnnouncementQuery, Types.AnnouncementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AnnouncementQuery, Types.AnnouncementQueryVariables>(AnnouncementDocument, options);
        }
export type AnnouncementQueryHookResult = ReturnType<typeof useAnnouncementQuery>;
export type AnnouncementLazyQueryHookResult = ReturnType<typeof useAnnouncementLazyQuery>;
export type AnnouncementSuspenseQueryHookResult = ReturnType<typeof useAnnouncementSuspenseQuery>;
export type AnnouncementQueryResult = Apollo.QueryResult<Types.AnnouncementQuery, Types.AnnouncementQueryVariables>;
export const AnnouncementsDocument = gql`
    query Announcements($after: String, $before: String, $first: Int, $last: Int) {
  announcements(after: $after, before: $before, first: $first, last: $last) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    edges {
      cursor
      node {
        author {
          uuid
          firstName
          lastName
          username
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
}
    `;

/**
 * __useAnnouncementsQuery__
 *
 * To run a query within a React component, call `useAnnouncementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnnouncementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnnouncementsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useAnnouncementsQuery(baseOptions?: Apollo.QueryHookOptions<Types.AnnouncementsQuery, Types.AnnouncementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AnnouncementsQuery, Types.AnnouncementsQueryVariables>(AnnouncementsDocument, options);
      }
export function useAnnouncementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AnnouncementsQuery, Types.AnnouncementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AnnouncementsQuery, Types.AnnouncementsQueryVariables>(AnnouncementsDocument, options);
        }
export function useAnnouncementsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AnnouncementsQuery, Types.AnnouncementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AnnouncementsQuery, Types.AnnouncementsQueryVariables>(AnnouncementsDocument, options);
        }
export type AnnouncementsQueryHookResult = ReturnType<typeof useAnnouncementsQuery>;
export type AnnouncementsLazyQueryHookResult = ReturnType<typeof useAnnouncementsLazyQuery>;
export type AnnouncementsSuspenseQueryHookResult = ReturnType<typeof useAnnouncementsSuspenseQuery>;
export type AnnouncementsQueryResult = Apollo.QueryResult<Types.AnnouncementsQuery, Types.AnnouncementsQueryVariables>;
export const StudentAssesmentCourseDocument = gql`
    query StudentAssesmentCourse($id: ID!, $track: Boolean) {
  course(id: $id, track: $track) {
    id
    imageUrl
    thumbnailUrl
  }
}
    `;

/**
 * __useStudentAssesmentCourseQuery__
 *
 * To run a query within a React component, call `useStudentAssesmentCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentAssesmentCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentAssesmentCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useStudentAssesmentCourseQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentAssesmentCourseQuery, Types.StudentAssesmentCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentAssesmentCourseQuery, Types.StudentAssesmentCourseQueryVariables>(StudentAssesmentCourseDocument, options);
      }
export function useStudentAssesmentCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentAssesmentCourseQuery, Types.StudentAssesmentCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentAssesmentCourseQuery, Types.StudentAssesmentCourseQueryVariables>(StudentAssesmentCourseDocument, options);
        }
export function useStudentAssesmentCourseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentAssesmentCourseQuery, Types.StudentAssesmentCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentAssesmentCourseQuery, Types.StudentAssesmentCourseQueryVariables>(StudentAssesmentCourseDocument, options);
        }
export type StudentAssesmentCourseQueryHookResult = ReturnType<typeof useStudentAssesmentCourseQuery>;
export type StudentAssesmentCourseLazyQueryHookResult = ReturnType<typeof useStudentAssesmentCourseLazyQuery>;
export type StudentAssesmentCourseSuspenseQueryHookResult = ReturnType<typeof useStudentAssesmentCourseSuspenseQuery>;
export type StudentAssesmentCourseQueryResult = Apollo.QueryResult<Types.StudentAssesmentCourseQuery, Types.StudentAssesmentCourseQueryVariables>;
export const AssessmentAttemptStatusDocument = gql`
    query AssessmentAttemptStatus {
  assessmentProgress {
    attempt {
      assessmentType
      updatedAt
      id
      status
    }
  }
}
    `;

/**
 * __useAssessmentAttemptStatusQuery__
 *
 * To run a query within a React component, call `useAssessmentAttemptStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssessmentAttemptStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssessmentAttemptStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useAssessmentAttemptStatusQuery(baseOptions?: Apollo.QueryHookOptions<Types.AssessmentAttemptStatusQuery, Types.AssessmentAttemptStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AssessmentAttemptStatusQuery, Types.AssessmentAttemptStatusQueryVariables>(AssessmentAttemptStatusDocument, options);
      }
export function useAssessmentAttemptStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AssessmentAttemptStatusQuery, Types.AssessmentAttemptStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AssessmentAttemptStatusQuery, Types.AssessmentAttemptStatusQueryVariables>(AssessmentAttemptStatusDocument, options);
        }
export function useAssessmentAttemptStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AssessmentAttemptStatusQuery, Types.AssessmentAttemptStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AssessmentAttemptStatusQuery, Types.AssessmentAttemptStatusQueryVariables>(AssessmentAttemptStatusDocument, options);
        }
export type AssessmentAttemptStatusQueryHookResult = ReturnType<typeof useAssessmentAttemptStatusQuery>;
export type AssessmentAttemptStatusLazyQueryHookResult = ReturnType<typeof useAssessmentAttemptStatusLazyQuery>;
export type AssessmentAttemptStatusSuspenseQueryHookResult = ReturnType<typeof useAssessmentAttemptStatusSuspenseQuery>;
export type AssessmentAttemptStatusQueryResult = Apollo.QueryResult<Types.AssessmentAttemptStatusQuery, Types.AssessmentAttemptStatusQueryVariables>;
export const AssessmentResultsDocument = gql`
    query AssessmentResults {
  assessmentProgress(scope: FINISHED) {
    result {
      id
      additionalPathways {
        id
        description
        name
        imageUrl
        cluster {
          name
        }
        courses {
          id
          description
          name
          status
          type
          ...CourseMetadata
        }
      }
      recommendedPathways {
        id
        description
        name
        imageUrl
        cluster {
          name
        }
        courses {
          id
          description
          name
          status
          type
          ...CourseMetadata
        }
      }
    }
  }
  currentCourses {
    id
    description
    name
  }
}
    ${CourseMetadataFragmentDoc}`;

/**
 * __useAssessmentResultsQuery__
 *
 * To run a query within a React component, call `useAssessmentResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssessmentResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssessmentResultsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAssessmentResultsQuery(baseOptions?: Apollo.QueryHookOptions<Types.AssessmentResultsQuery, Types.AssessmentResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AssessmentResultsQuery, Types.AssessmentResultsQueryVariables>(AssessmentResultsDocument, options);
      }
export function useAssessmentResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AssessmentResultsQuery, Types.AssessmentResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AssessmentResultsQuery, Types.AssessmentResultsQueryVariables>(AssessmentResultsDocument, options);
        }
export function useAssessmentResultsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AssessmentResultsQuery, Types.AssessmentResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AssessmentResultsQuery, Types.AssessmentResultsQueryVariables>(AssessmentResultsDocument, options);
        }
export type AssessmentResultsQueryHookResult = ReturnType<typeof useAssessmentResultsQuery>;
export type AssessmentResultsLazyQueryHookResult = ReturnType<typeof useAssessmentResultsLazyQuery>;
export type AssessmentResultsSuspenseQueryHookResult = ReturnType<typeof useAssessmentResultsSuspenseQuery>;
export type AssessmentResultsQueryResult = Apollo.QueryResult<Types.AssessmentResultsQuery, Types.AssessmentResultsQueryVariables>;
export const AssessmentStepsDocument = gql`
    query AssessmentSteps {
  assessmentProgress {
    attempt {
      assessmentType
      id
      status
    }
    interestsAnswers {
      checked
      option {
        id
        group {
          id
        }
      }
    }
    status {
      interests
      studyPreferences
      workValues
      reviewSurvey
    }
    studyPreferencesAnswers {
      option {
        id
      }
      position
    }
    workValuesAnswers {
      option {
        id
      }
      tokens
    }
    reviewSurveyAnswers {
      answer
      id
      question {
        id
      }
    }
  }
}
    `;

/**
 * __useAssessmentStepsQuery__
 *
 * To run a query within a React component, call `useAssessmentStepsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssessmentStepsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssessmentStepsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAssessmentStepsQuery(baseOptions?: Apollo.QueryHookOptions<Types.AssessmentStepsQuery, Types.AssessmentStepsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AssessmentStepsQuery, Types.AssessmentStepsQueryVariables>(AssessmentStepsDocument, options);
      }
export function useAssessmentStepsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AssessmentStepsQuery, Types.AssessmentStepsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AssessmentStepsQuery, Types.AssessmentStepsQueryVariables>(AssessmentStepsDocument, options);
        }
export function useAssessmentStepsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AssessmentStepsQuery, Types.AssessmentStepsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AssessmentStepsQuery, Types.AssessmentStepsQueryVariables>(AssessmentStepsDocument, options);
        }
export type AssessmentStepsQueryHookResult = ReturnType<typeof useAssessmentStepsQuery>;
export type AssessmentStepsLazyQueryHookResult = ReturnType<typeof useAssessmentStepsLazyQuery>;
export type AssessmentStepsSuspenseQueryHookResult = ReturnType<typeof useAssessmentStepsSuspenseQuery>;
export type AssessmentStepsQueryResult = Apollo.QueryResult<Types.AssessmentStepsQuery, Types.AssessmentStepsQueryVariables>;
export const AvailableCounselorsDocument = gql`
    query AvailableCounselors {
  availableCounselors {
    email
    firstName
    fullName
    lastName
    name
    username
    uuid
  }
}
    `;

/**
 * __useAvailableCounselorsQuery__
 *
 * To run a query within a React component, call `useAvailableCounselorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailableCounselorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailableCounselorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAvailableCounselorsQuery(baseOptions?: Apollo.QueryHookOptions<Types.AvailableCounselorsQuery, Types.AvailableCounselorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AvailableCounselorsQuery, Types.AvailableCounselorsQueryVariables>(AvailableCounselorsDocument, options);
      }
export function useAvailableCounselorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AvailableCounselorsQuery, Types.AvailableCounselorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AvailableCounselorsQuery, Types.AvailableCounselorsQueryVariables>(AvailableCounselorsDocument, options);
        }
export function useAvailableCounselorsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AvailableCounselorsQuery, Types.AvailableCounselorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AvailableCounselorsQuery, Types.AvailableCounselorsQueryVariables>(AvailableCounselorsDocument, options);
        }
export type AvailableCounselorsQueryHookResult = ReturnType<typeof useAvailableCounselorsQuery>;
export type AvailableCounselorsLazyQueryHookResult = ReturnType<typeof useAvailableCounselorsLazyQuery>;
export type AvailableCounselorsSuspenseQueryHookResult = ReturnType<typeof useAvailableCounselorsSuspenseQuery>;
export type AvailableCounselorsQueryResult = Apollo.QueryResult<Types.AvailableCounselorsQuery, Types.AvailableCounselorsQueryVariables>;
export const AvailableTeachersDocument = gql`
    query AvailableTeachers {
  availableTeachers(perPage: 1000) {
    nodes {
      email
      fullName
      name
      username
      uuid
    }
  }
}
    `;

/**
 * __useAvailableTeachersQuery__
 *
 * To run a query within a React component, call `useAvailableTeachersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailableTeachersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailableTeachersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAvailableTeachersQuery(baseOptions?: Apollo.QueryHookOptions<Types.AvailableTeachersQuery, Types.AvailableTeachersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.AvailableTeachersQuery, Types.AvailableTeachersQueryVariables>(AvailableTeachersDocument, options);
      }
export function useAvailableTeachersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.AvailableTeachersQuery, Types.AvailableTeachersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.AvailableTeachersQuery, Types.AvailableTeachersQueryVariables>(AvailableTeachersDocument, options);
        }
export function useAvailableTeachersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.AvailableTeachersQuery, Types.AvailableTeachersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.AvailableTeachersQuery, Types.AvailableTeachersQueryVariables>(AvailableTeachersDocument, options);
        }
export type AvailableTeachersQueryHookResult = ReturnType<typeof useAvailableTeachersQuery>;
export type AvailableTeachersLazyQueryHookResult = ReturnType<typeof useAvailableTeachersLazyQuery>;
export type AvailableTeachersSuspenseQueryHookResult = ReturnType<typeof useAvailableTeachersSuspenseQuery>;
export type AvailableTeachersQueryResult = Apollo.QueryResult<Types.AvailableTeachersQuery, Types.AvailableTeachersQueryVariables>;
export const CommonAppSyncStatusDocument = gql`
    query CommonAppSyncStatus {
  userInfo {
    uuid
    commonAppData {
      syncStatus {
        lastSyncedAt
        status
      }
    }
  }
}
    `;

/**
 * __useCommonAppSyncStatusQuery__
 *
 * To run a query within a React component, call `useCommonAppSyncStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommonAppSyncStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommonAppSyncStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommonAppSyncStatusQuery(baseOptions?: Apollo.QueryHookOptions<Types.CommonAppSyncStatusQuery, Types.CommonAppSyncStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CommonAppSyncStatusQuery, Types.CommonAppSyncStatusQueryVariables>(CommonAppSyncStatusDocument, options);
      }
export function useCommonAppSyncStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CommonAppSyncStatusQuery, Types.CommonAppSyncStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CommonAppSyncStatusQuery, Types.CommonAppSyncStatusQueryVariables>(CommonAppSyncStatusDocument, options);
        }
export function useCommonAppSyncStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CommonAppSyncStatusQuery, Types.CommonAppSyncStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CommonAppSyncStatusQuery, Types.CommonAppSyncStatusQueryVariables>(CommonAppSyncStatusDocument, options);
        }
export type CommonAppSyncStatusQueryHookResult = ReturnType<typeof useCommonAppSyncStatusQuery>;
export type CommonAppSyncStatusLazyQueryHookResult = ReturnType<typeof useCommonAppSyncStatusLazyQuery>;
export type CommonAppSyncStatusSuspenseQueryHookResult = ReturnType<typeof useCommonAppSyncStatusSuspenseQuery>;
export type CommonAppSyncStatusQueryResult = Apollo.QueryResult<Types.CommonAppSyncStatusQuery, Types.CommonAppSyncStatusQueryVariables>;
export const CompletedCourseDocument = gql`
    query CompletedCourse($id: ID!) {
  course(id: $id) {
    id
    lessons {
      id
      step
      careerReviewSurvey {
        performed
      }
    }
    progress {
      submitted
      total
    }
  }
}
    `;

/**
 * __useCompletedCourseQuery__
 *
 * To run a query within a React component, call `useCompletedCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompletedCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompletedCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCompletedCourseQuery(baseOptions: Apollo.QueryHookOptions<Types.CompletedCourseQuery, Types.CompletedCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CompletedCourseQuery, Types.CompletedCourseQueryVariables>(CompletedCourseDocument, options);
      }
export function useCompletedCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CompletedCourseQuery, Types.CompletedCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CompletedCourseQuery, Types.CompletedCourseQueryVariables>(CompletedCourseDocument, options);
        }
export function useCompletedCourseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CompletedCourseQuery, Types.CompletedCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CompletedCourseQuery, Types.CompletedCourseQueryVariables>(CompletedCourseDocument, options);
        }
export type CompletedCourseQueryHookResult = ReturnType<typeof useCompletedCourseQuery>;
export type CompletedCourseLazyQueryHookResult = ReturnType<typeof useCompletedCourseLazyQuery>;
export type CompletedCourseSuspenseQueryHookResult = ReturnType<typeof useCompletedCourseSuspenseQuery>;
export type CompletedCourseQueryResult = Apollo.QueryResult<Types.CompletedCourseQuery, Types.CompletedCourseQueryVariables>;
export const StudentCourseDocument = gql`
    query StudentCourse($id: ID!, $track: Boolean) {
  course(id: $id, track: $track) {
    description
    id
    imageUrl
    lessons {
      careerReviewSurvey {
        performed
        version
      }
      id
      imageUrl
      name
      progress {
        submitted
        total
      }
      step
      type
      thumbnailUrl
    }
    name
    pathway {
      name
    }
    progress {
      submitted
      total
    }
    type
  }
}
    `;

/**
 * __useStudentCourseQuery__
 *
 * To run a query within a React component, call `useStudentCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useStudentCourseQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentCourseQuery, Types.StudentCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentCourseQuery, Types.StudentCourseQueryVariables>(StudentCourseDocument, options);
      }
export function useStudentCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentCourseQuery, Types.StudentCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentCourseQuery, Types.StudentCourseQueryVariables>(StudentCourseDocument, options);
        }
export function useStudentCourseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentCourseQuery, Types.StudentCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentCourseQuery, Types.StudentCourseQueryVariables>(StudentCourseDocument, options);
        }
export type StudentCourseQueryHookResult = ReturnType<typeof useStudentCourseQuery>;
export type StudentCourseLazyQueryHookResult = ReturnType<typeof useStudentCourseLazyQuery>;
export type StudentCourseSuspenseQueryHookResult = ReturnType<typeof useStudentCourseSuspenseQuery>;
export type StudentCourseQueryResult = Apollo.QueryResult<Types.StudentCourseQuery, Types.StudentCourseQueryVariables>;
export const CurrentCoursesDocument = gql`
    query CurrentCourses {
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
    type
  }
}
    `;

/**
 * __useCurrentCoursesQuery__
 *
 * To run a query within a React component, call `useCurrentCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentCoursesQuery(baseOptions?: Apollo.QueryHookOptions<Types.CurrentCoursesQuery, Types.CurrentCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CurrentCoursesQuery, Types.CurrentCoursesQueryVariables>(CurrentCoursesDocument, options);
      }
export function useCurrentCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CurrentCoursesQuery, Types.CurrentCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CurrentCoursesQuery, Types.CurrentCoursesQueryVariables>(CurrentCoursesDocument, options);
        }
export function useCurrentCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CurrentCoursesQuery, Types.CurrentCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CurrentCoursesQuery, Types.CurrentCoursesQueryVariables>(CurrentCoursesDocument, options);
        }
export type CurrentCoursesQueryHookResult = ReturnType<typeof useCurrentCoursesQuery>;
export type CurrentCoursesLazyQueryHookResult = ReturnType<typeof useCurrentCoursesLazyQuery>;
export type CurrentCoursesSuspenseQueryHookResult = ReturnType<typeof useCurrentCoursesSuspenseQuery>;
export type CurrentCoursesQueryResult = Apollo.QueryResult<Types.CurrentCoursesQuery, Types.CurrentCoursesQueryVariables>;
export const DashboardRecentResourcesDocument = gql`
    query DashboardRecentResources {
  dashboardRecentResources {
    resourceId
    resourceType
    name
    pathways {
      name
    }
    thumbnailUrl
    imageUrl
    collection {
      name
    }
    updatedAt
  }
}
    `;

/**
 * __useDashboardRecentResourcesQuery__
 *
 * To run a query within a React component, call `useDashboardRecentResourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardRecentResourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardRecentResourcesQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashboardRecentResourcesQuery(baseOptions?: Apollo.QueryHookOptions<Types.DashboardRecentResourcesQuery, Types.DashboardRecentResourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DashboardRecentResourcesQuery, Types.DashboardRecentResourcesQueryVariables>(DashboardRecentResourcesDocument, options);
      }
export function useDashboardRecentResourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DashboardRecentResourcesQuery, Types.DashboardRecentResourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DashboardRecentResourcesQuery, Types.DashboardRecentResourcesQueryVariables>(DashboardRecentResourcesDocument, options);
        }
export function useDashboardRecentResourcesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DashboardRecentResourcesQuery, Types.DashboardRecentResourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DashboardRecentResourcesQuery, Types.DashboardRecentResourcesQueryVariables>(DashboardRecentResourcesDocument, options);
        }
export type DashboardRecentResourcesQueryHookResult = ReturnType<typeof useDashboardRecentResourcesQuery>;
export type DashboardRecentResourcesLazyQueryHookResult = ReturnType<typeof useDashboardRecentResourcesLazyQuery>;
export type DashboardRecentResourcesSuspenseQueryHookResult = ReturnType<typeof useDashboardRecentResourcesSuspenseQuery>;
export type DashboardRecentResourcesQueryResult = Apollo.QueryResult<Types.DashboardRecentResourcesQuery, Types.DashboardRecentResourcesQueryVariables>;
export const FinalReportDocument = gql`
    query FinalReport($track: Boolean) {
  finalReport(track: $track) {
    additionalPathways {
      id
      name
      imageUrl
      description
    }
    recommendedCourses {
      id
      name
      description
      pathway {
        id
        name
        cluster {
          id
          name
        }
      }
    }
    recommendedPathways {
      id
      name
      imageUrl
      description
    }
    assessmentAttempt {
      id
      updatedAt
    }
    currentCourses {
      ...FinalReportCourse
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
    interestsResult {
      interest
      score
    }
  }
  userInfo {
    firstName
    lastName
  }
}
    ${FinalReportCourseFragmentDoc}`;

/**
 * __useFinalReportQuery__
 *
 * To run a query within a React component, call `useFinalReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useFinalReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFinalReportQuery({
 *   variables: {
 *      track: // value for 'track'
 *   },
 * });
 */
export function useFinalReportQuery(baseOptions?: Apollo.QueryHookOptions<Types.FinalReportQuery, Types.FinalReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.FinalReportQuery, Types.FinalReportQueryVariables>(FinalReportDocument, options);
      }
export function useFinalReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.FinalReportQuery, Types.FinalReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.FinalReportQuery, Types.FinalReportQueryVariables>(FinalReportDocument, options);
        }
export function useFinalReportSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.FinalReportQuery, Types.FinalReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.FinalReportQuery, Types.FinalReportQueryVariables>(FinalReportDocument, options);
        }
export type FinalReportQueryHookResult = ReturnType<typeof useFinalReportQuery>;
export type FinalReportLazyQueryHookResult = ReturnType<typeof useFinalReportLazyQuery>;
export type FinalReportSuspenseQueryHookResult = ReturnType<typeof useFinalReportSuspenseQuery>;
export type FinalReportQueryResult = Apollo.QueryResult<Types.FinalReportQuery, Types.FinalReportQueryVariables>;
export const FinishedAssessmentStatusDocument = gql`
    query FinishedAssessmentStatus {
  assessmentProgress(scope: FINISHED) {
    attempt {
      id
      status
    }
  }
}
    `;

/**
 * __useFinishedAssessmentStatusQuery__
 *
 * To run a query within a React component, call `useFinishedAssessmentStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useFinishedAssessmentStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFinishedAssessmentStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useFinishedAssessmentStatusQuery(baseOptions?: Apollo.QueryHookOptions<Types.FinishedAssessmentStatusQuery, Types.FinishedAssessmentStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.FinishedAssessmentStatusQuery, Types.FinishedAssessmentStatusQueryVariables>(FinishedAssessmentStatusDocument, options);
      }
export function useFinishedAssessmentStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.FinishedAssessmentStatusQuery, Types.FinishedAssessmentStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.FinishedAssessmentStatusQuery, Types.FinishedAssessmentStatusQueryVariables>(FinishedAssessmentStatusDocument, options);
        }
export function useFinishedAssessmentStatusSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.FinishedAssessmentStatusQuery, Types.FinishedAssessmentStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.FinishedAssessmentStatusQuery, Types.FinishedAssessmentStatusQueryVariables>(FinishedAssessmentStatusDocument, options);
        }
export type FinishedAssessmentStatusQueryHookResult = ReturnType<typeof useFinishedAssessmentStatusQuery>;
export type FinishedAssessmentStatusLazyQueryHookResult = ReturnType<typeof useFinishedAssessmentStatusLazyQuery>;
export type FinishedAssessmentStatusSuspenseQueryHookResult = ReturnType<typeof useFinishedAssessmentStatusSuspenseQuery>;
export type FinishedAssessmentStatusQueryResult = Apollo.QueryResult<Types.FinishedAssessmentStatusQuery, Types.FinishedAssessmentStatusQueryVariables>;
export const InstitutionDocument = gql`
    query Institution($id: ID!, $track: Boolean) {
  institution(id: $id, track: $track) {
    id
    type
    applicationType
    applicationId
    name
    size
    sizeType
    sizeDescription
    hasApplied
    cost
    commonAppApplicationUrl
    imageUrl
    isFavorite
    maxTeacherEval
    minTeacherEval
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
 * __useInstitutionQuery__
 *
 * To run a query within a React component, call `useInstitutionQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutionQuery({
 *   variables: {
 *      id: // value for 'id'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useInstitutionQuery(baseOptions: Apollo.QueryHookOptions<Types.InstitutionQuery, Types.InstitutionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.InstitutionQuery, Types.InstitutionQueryVariables>(InstitutionDocument, options);
      }
export function useInstitutionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.InstitutionQuery, Types.InstitutionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.InstitutionQuery, Types.InstitutionQueryVariables>(InstitutionDocument, options);
        }
export function useInstitutionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.InstitutionQuery, Types.InstitutionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.InstitutionQuery, Types.InstitutionQueryVariables>(InstitutionDocument, options);
        }
export type InstitutionQueryHookResult = ReturnType<typeof useInstitutionQuery>;
export type InstitutionLazyQueryHookResult = ReturnType<typeof useInstitutionLazyQuery>;
export type InstitutionSuspenseQueryHookResult = ReturnType<typeof useInstitutionSuspenseQuery>;
export type InstitutionQueryResult = Apollo.QueryResult<Types.InstitutionQuery, Types.InstitutionQueryVariables>;
export const InstitutionApplicationQueryDocument = gql`
    query InstitutionApplicationQuery($id: ID!) {
  institutionApplication(id: $id) {
    id
    name
    appliedAt
    type
    institution {
      id
    }
    deadline
    recommenders {
      email
      firstName
      lastName
      type
      formStatuses {
        formType
        downloadedDate
        submittedDate
        status
      }
    }
  }
}
    `;

/**
 * __useInstitutionApplicationQuery__
 *
 * To run a query within a React component, call `useInstitutionApplicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutionApplicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutionApplicationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInstitutionApplicationQuery(baseOptions: Apollo.QueryHookOptions<Types.InstitutionApplicationQuery, Types.InstitutionApplicationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.InstitutionApplicationQuery, Types.InstitutionApplicationQueryVariables>(InstitutionApplicationQueryDocument, options);
      }
export function useInstitutionApplicationQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.InstitutionApplicationQuery, Types.InstitutionApplicationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.InstitutionApplicationQuery, Types.InstitutionApplicationQueryVariables>(InstitutionApplicationQueryDocument, options);
        }
export function useInstitutionApplicationQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.InstitutionApplicationQuery, Types.InstitutionApplicationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.InstitutionApplicationQuery, Types.InstitutionApplicationQueryVariables>(InstitutionApplicationQueryDocument, options);
        }
export type InstitutionApplicationQueryHookResult = ReturnType<typeof useInstitutionApplicationQuery>;
export type InstitutionApplicationQueryLazyQueryHookResult = ReturnType<typeof useInstitutionApplicationQueryLazyQuery>;
export type InstitutionApplicationQuerySuspenseQueryHookResult = ReturnType<typeof useInstitutionApplicationQuerySuspenseQuery>;
export type InstitutionApplicationQueryQueryResult = Apollo.QueryResult<Types.InstitutionApplicationQuery, Types.InstitutionApplicationQueryVariables>;
export const InstitutionApplicationsDocument = gql`
    query InstitutionApplications($page: Int, $perPage: Int) {
  institutionApplications(page: $page, perPage: $perPage) {
    nodes {
      id
      name
      type
      status
      institution {
        commonAppApplicationUrl
        id
        minTeacherEval
        commonAppEnabled
      }
      appliedAt
      acceptsTeacherRecommendation
      recommenders {
        email
        firstName
        lastName
        type
      }
    }
  }
}
    `;

/**
 * __useInstitutionApplicationsQuery__
 *
 * To run a query within a React component, call `useInstitutionApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutionApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutionApplicationsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useInstitutionApplicationsQuery(baseOptions?: Apollo.QueryHookOptions<Types.InstitutionApplicationsQuery, Types.InstitutionApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.InstitutionApplicationsQuery, Types.InstitutionApplicationsQueryVariables>(InstitutionApplicationsDocument, options);
      }
export function useInstitutionApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.InstitutionApplicationsQuery, Types.InstitutionApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.InstitutionApplicationsQuery, Types.InstitutionApplicationsQueryVariables>(InstitutionApplicationsDocument, options);
        }
export function useInstitutionApplicationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.InstitutionApplicationsQuery, Types.InstitutionApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.InstitutionApplicationsQuery, Types.InstitutionApplicationsQueryVariables>(InstitutionApplicationsDocument, options);
        }
export type InstitutionApplicationsQueryHookResult = ReturnType<typeof useInstitutionApplicationsQuery>;
export type InstitutionApplicationsLazyQueryHookResult = ReturnType<typeof useInstitutionApplicationsLazyQuery>;
export type InstitutionApplicationsSuspenseQueryHookResult = ReturnType<typeof useInstitutionApplicationsSuspenseQuery>;
export type InstitutionApplicationsQueryResult = Apollo.QueryResult<Types.InstitutionApplicationsQuery, Types.InstitutionApplicationsQueryVariables>;
export const InstitutionProgramsDocument = gql`
    query InstitutionPrograms($id: ID!, $page: Int, $perPage: Int, $filter: ProgramFilter) {
  institution(id: $id) {
    id
    programs(page: $page, perPage: $perPage, filter: $filter) {
      nodes {
        title
        degrees
      }
      nodesCount
      pagesCount
    }
  }
}
    `;

/**
 * __useInstitutionProgramsQuery__
 *
 * To run a query within a React component, call `useInstitutionProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstitutionProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstitutionProgramsQuery({
 *   variables: {
 *      id: // value for 'id'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useInstitutionProgramsQuery(baseOptions: Apollo.QueryHookOptions<Types.InstitutionProgramsQuery, Types.InstitutionProgramsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.InstitutionProgramsQuery, Types.InstitutionProgramsQueryVariables>(InstitutionProgramsDocument, options);
      }
export function useInstitutionProgramsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.InstitutionProgramsQuery, Types.InstitutionProgramsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.InstitutionProgramsQuery, Types.InstitutionProgramsQueryVariables>(InstitutionProgramsDocument, options);
        }
export function useInstitutionProgramsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.InstitutionProgramsQuery, Types.InstitutionProgramsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.InstitutionProgramsQuery, Types.InstitutionProgramsQueryVariables>(InstitutionProgramsDocument, options);
        }
export type InstitutionProgramsQueryHookResult = ReturnType<typeof useInstitutionProgramsQuery>;
export type InstitutionProgramsLazyQueryHookResult = ReturnType<typeof useInstitutionProgramsLazyQuery>;
export type InstitutionProgramsSuspenseQueryHookResult = ReturnType<typeof useInstitutionProgramsSuspenseQuery>;
export type InstitutionProgramsQueryResult = Apollo.QueryResult<Types.InstitutionProgramsQuery, Types.InstitutionProgramsQueryVariables>;
export const StudentInstitutionsDocument = gql`
    query StudentInstitutions($page: Int, $perPage: Int, $filter: StudentInstitutionFilter, $track: Boolean) {
  institutions(page: $page, perPage: $perPage, filter: $filter, track: $track) {
    nodes {
      type
      sizeType
      sizeDescription
      cost
      commonAppEnabled
      thumbnailUrl
      id
      isFavorite
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
 * __useStudentInstitutionsQuery__
 *
 * To run a query within a React component, call `useStudentInstitutionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentInstitutionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentInstitutionsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useStudentInstitutionsQuery(baseOptions?: Apollo.QueryHookOptions<Types.StudentInstitutionsQuery, Types.StudentInstitutionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentInstitutionsQuery, Types.StudentInstitutionsQueryVariables>(StudentInstitutionsDocument, options);
      }
export function useStudentInstitutionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentInstitutionsQuery, Types.StudentInstitutionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentInstitutionsQuery, Types.StudentInstitutionsQueryVariables>(StudentInstitutionsDocument, options);
        }
export function useStudentInstitutionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentInstitutionsQuery, Types.StudentInstitutionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentInstitutionsQuery, Types.StudentInstitutionsQueryVariables>(StudentInstitutionsDocument, options);
        }
export type StudentInstitutionsQueryHookResult = ReturnType<typeof useStudentInstitutionsQuery>;
export type StudentInstitutionsLazyQueryHookResult = ReturnType<typeof useStudentInstitutionsLazyQuery>;
export type StudentInstitutionsSuspenseQueryHookResult = ReturnType<typeof useStudentInstitutionsSuspenseQuery>;
export type StudentInstitutionsQueryResult = Apollo.QueryResult<Types.StudentInstitutionsQuery, Types.StudentInstitutionsQueryVariables>;
export const InterestsGroupsDocument = gql`
    query InterestsGroups {
  interestsGroups {
    category
    id
    options {
      activity
      id
      imageUrl
    }
  }
}
    `;

/**
 * __useInterestsGroupsQuery__
 *
 * To run a query within a React component, call `useInterestsGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useInterestsGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInterestsGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useInterestsGroupsQuery(baseOptions?: Apollo.QueryHookOptions<Types.InterestsGroupsQuery, Types.InterestsGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.InterestsGroupsQuery, Types.InterestsGroupsQueryVariables>(InterestsGroupsDocument, options);
      }
export function useInterestsGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.InterestsGroupsQuery, Types.InterestsGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.InterestsGroupsQuery, Types.InterestsGroupsQueryVariables>(InterestsGroupsDocument, options);
        }
export function useInterestsGroupsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.InterestsGroupsQuery, Types.InterestsGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.InterestsGroupsQuery, Types.InterestsGroupsQueryVariables>(InterestsGroupsDocument, options);
        }
export type InterestsGroupsQueryHookResult = ReturnType<typeof useInterestsGroupsQuery>;
export type InterestsGroupsLazyQueryHookResult = ReturnType<typeof useInterestsGroupsLazyQuery>;
export type InterestsGroupsSuspenseQueryHookResult = ReturnType<typeof useInterestsGroupsSuspenseQuery>;
export type InterestsGroupsQueryResult = Apollo.QueryResult<Types.InterestsGroupsQuery, Types.InterestsGroupsQueryVariables>;
export const InterestsResultDocument = gql`
    query InterestsResult($assessmentAttemptId: ID!) {
  interestsResult(assessmentAttemptId: $assessmentAttemptId) {
    interest
    score
  }
}
    `;

/**
 * __useInterestsResultQuery__
 *
 * To run a query within a React component, call `useInterestsResultQuery` and pass it any options that fit your needs.
 * When your component renders, `useInterestsResultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInterestsResultQuery({
 *   variables: {
 *      assessmentAttemptId: // value for 'assessmentAttemptId'
 *   },
 * });
 */
export function useInterestsResultQuery(baseOptions: Apollo.QueryHookOptions<Types.InterestsResultQuery, Types.InterestsResultQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.InterestsResultQuery, Types.InterestsResultQueryVariables>(InterestsResultDocument, options);
      }
export function useInterestsResultLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.InterestsResultQuery, Types.InterestsResultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.InterestsResultQuery, Types.InterestsResultQueryVariables>(InterestsResultDocument, options);
        }
export function useInterestsResultSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.InterestsResultQuery, Types.InterestsResultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.InterestsResultQuery, Types.InterestsResultQueryVariables>(InterestsResultDocument, options);
        }
export type InterestsResultQueryHookResult = ReturnType<typeof useInterestsResultQuery>;
export type InterestsResultLazyQueryHookResult = ReturnType<typeof useInterestsResultLazyQuery>;
export type InterestsResultSuspenseQueryHookResult = ReturnType<typeof useInterestsResultSuspenseQuery>;
export type InterestsResultQueryResult = Apollo.QueryResult<Types.InterestsResultQuery, Types.InterestsResultQueryVariables>;
export const LessonInCourseExtensionsDocument = gql`
    query LessonInCourseExtensions($courseId: ID!, $lessonId: ID!, $track: Boolean) {
  course(id: $courseId) {
    id
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
}
    `;

/**
 * __useLessonInCourseExtensionsQuery__
 *
 * To run a query within a React component, call `useLessonInCourseExtensionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLessonInCourseExtensionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLessonInCourseExtensionsQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      lessonId: // value for 'lessonId'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useLessonInCourseExtensionsQuery(baseOptions: Apollo.QueryHookOptions<Types.LessonInCourseExtensionsQuery, Types.LessonInCourseExtensionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.LessonInCourseExtensionsQuery, Types.LessonInCourseExtensionsQueryVariables>(LessonInCourseExtensionsDocument, options);
      }
export function useLessonInCourseExtensionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.LessonInCourseExtensionsQuery, Types.LessonInCourseExtensionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.LessonInCourseExtensionsQuery, Types.LessonInCourseExtensionsQueryVariables>(LessonInCourseExtensionsDocument, options);
        }
export function useLessonInCourseExtensionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.LessonInCourseExtensionsQuery, Types.LessonInCourseExtensionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.LessonInCourseExtensionsQuery, Types.LessonInCourseExtensionsQueryVariables>(LessonInCourseExtensionsDocument, options);
        }
export type LessonInCourseExtensionsQueryHookResult = ReturnType<typeof useLessonInCourseExtensionsQuery>;
export type LessonInCourseExtensionsLazyQueryHookResult = ReturnType<typeof useLessonInCourseExtensionsLazyQuery>;
export type LessonInCourseExtensionsSuspenseQueryHookResult = ReturnType<typeof useLessonInCourseExtensionsSuspenseQuery>;
export type LessonInCourseExtensionsQueryResult = Apollo.QueryResult<Types.LessonInCourseExtensionsQuery, Types.LessonInCourseExtensionsQueryVariables>;
export const LessonInCourseDocument = gql`
    query LessonInCourse($courseId: ID!, $lessonId: ID!, $track: Boolean) {
  course(id: $courseId) {
    careerName
    hasInstitutionsInStudentState
    id
    lesson(id: $lessonId, track: $track) {
      assignments {
        description
        displayName
        id
        step
        submission {
          id
          files {
            filename
            googleWeblink
            id
            source
            url(options: {responseContentDisposition: "attachment"})
          }
          updatedAt
          status
          rubricGrade {
            pointsScored
            pointsAvailable
            results {
              criteriaId
              trait
            }
            lastGradedBy {
              firstName
              lastName
              fullName
              uuid
            }
          }
          grade {
            status
            updatedAt
            lastGradedBy {
              firstName
              lastName
              fullName
              uuid
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
          description
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
        version
        performed
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
          answer {
            answer
            checkInQuestionId
            id
            studentId
            updatedAt
            grade {
              lastGradedBy {
                uuid
                firstName
                lastName
              }
              updatedAt
              status
            }
          }
          id
          question
        }
        step
      }
      checkInQuestions {
        answer {
          answer
          checkInQuestionId
          id
          studentId
          updatedAt
          grade {
            lastGradedBy {
              uuid
              firstName
              lastName
            }
            updatedAt
            status
          }
        }
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
    lessons {
      id
      step
      careerReviewSurvey {
        performed
      }
    }
    name
    progress {
      submitted
      total
    }
    reviewSurvey {
      questions {
        id
      }
    }
    content {
      checkIns {
        completed
      }
      items {
        type
        completed
      }
    }
  }
}
    `;

/**
 * __useLessonInCourseQuery__
 *
 * To run a query within a React component, call `useLessonInCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useLessonInCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLessonInCourseQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      lessonId: // value for 'lessonId'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useLessonInCourseQuery(baseOptions: Apollo.QueryHookOptions<Types.LessonInCourseQuery, Types.LessonInCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.LessonInCourseQuery, Types.LessonInCourseQueryVariables>(LessonInCourseDocument, options);
      }
export function useLessonInCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.LessonInCourseQuery, Types.LessonInCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.LessonInCourseQuery, Types.LessonInCourseQueryVariables>(LessonInCourseDocument, options);
        }
export function useLessonInCourseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.LessonInCourseQuery, Types.LessonInCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.LessonInCourseQuery, Types.LessonInCourseQueryVariables>(LessonInCourseDocument, options);
        }
export type LessonInCourseQueryHookResult = ReturnType<typeof useLessonInCourseQuery>;
export type LessonInCourseLazyQueryHookResult = ReturnType<typeof useLessonInCourseLazyQuery>;
export type LessonInCourseSuspenseQueryHookResult = ReturnType<typeof useLessonInCourseSuspenseQuery>;
export type LessonInCourseQueryResult = Apollo.QueryResult<Types.LessonInCourseQuery, Types.LessonInCourseQueryVariables>;
export const MarkOnboardingAsCompletedDocument = gql`
    mutation MarkOnboardingAsCompleted($input: MarkOnboardingAsCompletedMutationInput!) {
  markOnboardingAsCompleted(input: $input) {
    status
  }
}
    `;
export type MarkOnboardingAsCompletedMutationFn = Apollo.MutationFunction<Types.MarkOnboardingAsCompletedMutation, Types.MarkOnboardingAsCompletedMutationVariables>;

/**
 * __useMarkOnboardingAsCompletedMutation__
 *
 * To run a mutation, you first call `useMarkOnboardingAsCompletedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkOnboardingAsCompletedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markOnboardingAsCompletedMutation, { data, loading, error }] = useMarkOnboardingAsCompletedMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarkOnboardingAsCompletedMutation(baseOptions?: Apollo.MutationHookOptions<Types.MarkOnboardingAsCompletedMutation, Types.MarkOnboardingAsCompletedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.MarkOnboardingAsCompletedMutation, Types.MarkOnboardingAsCompletedMutationVariables>(MarkOnboardingAsCompletedDocument, options);
      }
export type MarkOnboardingAsCompletedMutationHookResult = ReturnType<typeof useMarkOnboardingAsCompletedMutation>;
export type MarkOnboardingAsCompletedMutationResult = Apollo.MutationResult<Types.MarkOnboardingAsCompletedMutation>;
export type MarkOnboardingAsCompletedMutationOptions = Apollo.BaseMutationOptions<Types.MarkOnboardingAsCompletedMutation, Types.MarkOnboardingAsCompletedMutationVariables>;
export const MyInstitutionsDocument = gql`
    query MyInstitutions($page: Int, $perPage: Int) {
  myInstitutions(page: $page, perPage: $perPage) {
    nodes {
      type
      sizeType
      sizeDescription
      cost
      thumbnailUrl
      commonAppEnabled
      id
      isFavorite
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
 * __useMyInstitutionsQuery__
 *
 * To run a query within a React component, call `useMyInstitutionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyInstitutionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyInstitutionsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useMyInstitutionsQuery(baseOptions?: Apollo.QueryHookOptions<Types.MyInstitutionsQuery, Types.MyInstitutionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.MyInstitutionsQuery, Types.MyInstitutionsQueryVariables>(MyInstitutionsDocument, options);
      }
export function useMyInstitutionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.MyInstitutionsQuery, Types.MyInstitutionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.MyInstitutionsQuery, Types.MyInstitutionsQueryVariables>(MyInstitutionsDocument, options);
        }
export function useMyInstitutionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.MyInstitutionsQuery, Types.MyInstitutionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.MyInstitutionsQuery, Types.MyInstitutionsQueryVariables>(MyInstitutionsDocument, options);
        }
export type MyInstitutionsQueryHookResult = ReturnType<typeof useMyInstitutionsQuery>;
export type MyInstitutionsLazyQueryHookResult = ReturnType<typeof useMyInstitutionsLazyQuery>;
export type MyInstitutionsSuspenseQueryHookResult = ReturnType<typeof useMyInstitutionsSuspenseQuery>;
export type MyInstitutionsQueryResult = Apollo.QueryResult<Types.MyInstitutionsQuery, Types.MyInstitutionsQueryVariables>;
export const MyOpportunitiesDocument = gql`
    query MyOpportunities($page: Int, $perPage: Int) {
  myOpportunities(page: $page, perPage: $perPage) {
    nodes {
      applicationStatus
      id
      imageUrl
      isFavorite
      name
      opportunityType
      partner {
        id
        name
      }
      periodStart
      periodEnd
      deadline
      virtualInternship {
        id
        roadmapItemsCount
        requiredExperiences
        readinessSkillsLessons {
          id
        }
        status
      }
      pathways {
        id
        name
      }
      partner {
        id
        name
      }
      imageFitToContainer
    }
    nodesCount
    pagesCount
  }
}
    `;

/**
 * __useMyOpportunitiesQuery__
 *
 * To run a query within a React component, call `useMyOpportunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOpportunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOpportunitiesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useMyOpportunitiesQuery(baseOptions?: Apollo.QueryHookOptions<Types.MyOpportunitiesQuery, Types.MyOpportunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.MyOpportunitiesQuery, Types.MyOpportunitiesQueryVariables>(MyOpportunitiesDocument, options);
      }
export function useMyOpportunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.MyOpportunitiesQuery, Types.MyOpportunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.MyOpportunitiesQuery, Types.MyOpportunitiesQueryVariables>(MyOpportunitiesDocument, options);
        }
export function useMyOpportunitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.MyOpportunitiesQuery, Types.MyOpportunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.MyOpportunitiesQuery, Types.MyOpportunitiesQueryVariables>(MyOpportunitiesDocument, options);
        }
export type MyOpportunitiesQueryHookResult = ReturnType<typeof useMyOpportunitiesQuery>;
export type MyOpportunitiesLazyQueryHookResult = ReturnType<typeof useMyOpportunitiesLazyQuery>;
export type MyOpportunitiesSuspenseQueryHookResult = ReturnType<typeof useMyOpportunitiesSuspenseQuery>;
export type MyOpportunitiesQueryResult = Apollo.QueryResult<Types.MyOpportunitiesQuery, Types.MyOpportunitiesQueryVariables>;
export const DcNotificationsDocument = gql`
    query DcNotifications($scope: NotificationStatus, $type: NotificationTypes!, $page: Int, $perPage: Int) {
  notifications(scope: $scope, type: $type, page: $page, perPage: $perPage) {
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
      type
      updatedAt
    }
  }
}
    `;

/**
 * __useDcNotificationsQuery__
 *
 * To run a query within a React component, call `useDcNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDcNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDcNotificationsQuery({
 *   variables: {
 *      scope: // value for 'scope'
 *      type: // value for 'type'
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useDcNotificationsQuery(baseOptions: Apollo.QueryHookOptions<Types.DcNotificationsQuery, Types.DcNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DcNotificationsQuery, Types.DcNotificationsQueryVariables>(DcNotificationsDocument, options);
      }
export function useDcNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DcNotificationsQuery, Types.DcNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DcNotificationsQuery, Types.DcNotificationsQueryVariables>(DcNotificationsDocument, options);
        }
export function useDcNotificationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DcNotificationsQuery, Types.DcNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DcNotificationsQuery, Types.DcNotificationsQueryVariables>(DcNotificationsDocument, options);
        }
export type DcNotificationsQueryHookResult = ReturnType<typeof useDcNotificationsQuery>;
export type DcNotificationsLazyQueryHookResult = ReturnType<typeof useDcNotificationsLazyQuery>;
export type DcNotificationsSuspenseQueryHookResult = ReturnType<typeof useDcNotificationsSuspenseQuery>;
export type DcNotificationsQueryResult = Apollo.QueryResult<Types.DcNotificationsQuery, Types.DcNotificationsQueryVariables>;
export const StudentOpportunitiesDocument = gql`
    query StudentOpportunities($page: Int, $perPage: Int, $filter: StudentOpportunityFilter) {
  opportunities(page: $page, perPage: $perPage, filter: $filter) {
    nodesCount
    pagesCount
    nodes {
      id
      name
      applicationStatus
      isFavorite
      isRecommended
      imageUrl
      opportunityType
      deadline
      periodStart
      partner {
        id
        name
      }
      periodEnd
      virtualInternship {
        id
        requiredExperiences
        roadmapItemsCount
        readinessSkillsLessons {
          id
        }
        status
      }
      pathways {
        id
        name
      }
      imageFitToContainer
    }
  }
}
    `;

/**
 * __useStudentOpportunitiesQuery__
 *
 * To run a query within a React component, call `useStudentOpportunitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentOpportunitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentOpportunitiesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useStudentOpportunitiesQuery(baseOptions?: Apollo.QueryHookOptions<Types.StudentOpportunitiesQuery, Types.StudentOpportunitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentOpportunitiesQuery, Types.StudentOpportunitiesQueryVariables>(StudentOpportunitiesDocument, options);
      }
export function useStudentOpportunitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentOpportunitiesQuery, Types.StudentOpportunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentOpportunitiesQuery, Types.StudentOpportunitiesQueryVariables>(StudentOpportunitiesDocument, options);
        }
export function useStudentOpportunitiesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentOpportunitiesQuery, Types.StudentOpportunitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentOpportunitiesQuery, Types.StudentOpportunitiesQueryVariables>(StudentOpportunitiesDocument, options);
        }
export type StudentOpportunitiesQueryHookResult = ReturnType<typeof useStudentOpportunitiesQuery>;
export type StudentOpportunitiesLazyQueryHookResult = ReturnType<typeof useStudentOpportunitiesLazyQuery>;
export type StudentOpportunitiesSuspenseQueryHookResult = ReturnType<typeof useStudentOpportunitiesSuspenseQuery>;
export type StudentOpportunitiesQueryResult = Apollo.QueryResult<Types.StudentOpportunitiesQuery, Types.StudentOpportunitiesQueryVariables>;
export const StudentOpportunityDocument = gql`
    query StudentOpportunity($id: ID!, $track: Boolean, $trackVI: Boolean) {
  opportunity(id: $id, track: $track) {
    id
    name
    applicationStatus
    automaticAcceptance
    availableSpots
    creditsOutcomes
    isFavorite
    isRecommended
    description
    imageUrl
    location
    deadline
    periodStart
    periodEnd
    questions {
      id
      question
    }
    virtualInternship(track: $trackVI) {
      id
      status
      requiredExperiences
      readinessSkillsLessons {
        type
        id
        name
        thumbnailUrl
        progress {
          submitted
          total
        }
      }
      experienceOpportunityLessons {
        type
        id
        name
        thumbnailUrl
        description {
          audience
          goal
          introduction
          role
          situation
        }
        progress {
          submitted
          total
        }
      }
      postExperienceLessons {
        type
        id
        name
        thumbnailUrl
        progress {
          submitted
          total
        }
        careerReviewSurvey {
          performed
        }
      }
      calendarLessons {
        type
        id
        name
        thumbnailUrl
        progress {
          submitted
          total
        }
      }
      studentExperienceOpportunityLessons {
        type
        id
        name
        thumbnailUrl
        progress {
          submitted
          total
        }
      }
    }
    opportunityType
    opportunityApplication {
      id
      answers {
        answer
      }
    }
    pathways {
      id
      name
    }
    salaryInformation
    tags
    visibilityScope
    partner {
      id
      name
    }
    imageFitToContainer
  }
}
    `;

/**
 * __useStudentOpportunityQuery__
 *
 * To run a query within a React component, call `useStudentOpportunityQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentOpportunityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentOpportunityQuery({
 *   variables: {
 *      id: // value for 'id'
 *      track: // value for 'track'
 *      trackVI: // value for 'trackVI'
 *   },
 * });
 */
export function useStudentOpportunityQuery(baseOptions: Apollo.QueryHookOptions<Types.StudentOpportunityQuery, Types.StudentOpportunityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentOpportunityQuery, Types.StudentOpportunityQueryVariables>(StudentOpportunityDocument, options);
      }
export function useStudentOpportunityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentOpportunityQuery, Types.StudentOpportunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentOpportunityQuery, Types.StudentOpportunityQueryVariables>(StudentOpportunityDocument, options);
        }
export function useStudentOpportunitySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentOpportunityQuery, Types.StudentOpportunityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentOpportunityQuery, Types.StudentOpportunityQueryVariables>(StudentOpportunityDocument, options);
        }
export type StudentOpportunityQueryHookResult = ReturnType<typeof useStudentOpportunityQuery>;
export type StudentOpportunityLazyQueryHookResult = ReturnType<typeof useStudentOpportunityLazyQuery>;
export type StudentOpportunitySuspenseQueryHookResult = ReturnType<typeof useStudentOpportunitySuspenseQuery>;
export type StudentOpportunityQueryResult = Apollo.QueryResult<Types.StudentOpportunityQuery, Types.StudentOpportunityQueryVariables>;
export const OpportunityPeriodsDocument = gql`
    query OpportunityPeriods($id: ID!) {
  opportunity(id: $id) {
    id
    periodStart
    periodEnd
  }
}
    `;

/**
 * __useOpportunityPeriodsQuery__
 *
 * To run a query within a React component, call `useOpportunityPeriodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityPeriodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityPeriodsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOpportunityPeriodsQuery(baseOptions: Apollo.QueryHookOptions<Types.OpportunityPeriodsQuery, Types.OpportunityPeriodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.OpportunityPeriodsQuery, Types.OpportunityPeriodsQueryVariables>(OpportunityPeriodsDocument, options);
      }
export function useOpportunityPeriodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.OpportunityPeriodsQuery, Types.OpportunityPeriodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.OpportunityPeriodsQuery, Types.OpportunityPeriodsQueryVariables>(OpportunityPeriodsDocument, options);
        }
export function useOpportunityPeriodsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.OpportunityPeriodsQuery, Types.OpportunityPeriodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.OpportunityPeriodsQuery, Types.OpportunityPeriodsQueryVariables>(OpportunityPeriodsDocument, options);
        }
export type OpportunityPeriodsQueryHookResult = ReturnType<typeof useOpportunityPeriodsQuery>;
export type OpportunityPeriodsLazyQueryHookResult = ReturnType<typeof useOpportunityPeriodsLazyQuery>;
export type OpportunityPeriodsSuspenseQueryHookResult = ReturnType<typeof useOpportunityPeriodsSuspenseQuery>;
export type OpportunityPeriodsQueryResult = Apollo.QueryResult<Types.OpportunityPeriodsQuery, Types.OpportunityPeriodsQueryVariables>;
export const OverallProgressDocument = gql`
    query OverallProgress {
  overallProgress {
    assessmentFinished
    courseCompleted
    enrolledInCourse
    finalReportSeen
  }
}
    `;

/**
 * __useOverallProgressQuery__
 *
 * To run a query within a React component, call `useOverallProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useOverallProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOverallProgressQuery({
 *   variables: {
 *   },
 * });
 */
export function useOverallProgressQuery(baseOptions?: Apollo.QueryHookOptions<Types.OverallProgressQuery, Types.OverallProgressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.OverallProgressQuery, Types.OverallProgressQueryVariables>(OverallProgressDocument, options);
      }
export function useOverallProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.OverallProgressQuery, Types.OverallProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.OverallProgressQuery, Types.OverallProgressQueryVariables>(OverallProgressDocument, options);
        }
export function useOverallProgressSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.OverallProgressQuery, Types.OverallProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.OverallProgressQuery, Types.OverallProgressQueryVariables>(OverallProgressDocument, options);
        }
export type OverallProgressQueryHookResult = ReturnType<typeof useOverallProgressQuery>;
export type OverallProgressLazyQueryHookResult = ReturnType<typeof useOverallProgressLazyQuery>;
export type OverallProgressSuspenseQueryHookResult = ReturnType<typeof useOverallProgressSuspenseQuery>;
export type OverallProgressQueryResult = Apollo.QueryResult<Types.OverallProgressQuery, Types.OverallProgressQueryVariables>;
export const StudentPartnerOptionsDocument = gql`
    query StudentPartnerOptions($page: Int, $perPage: Int, $filter: StudentPartnerFilter) {
  partners(page: $page, perPage: $perPage, filter: $filter) {
    nodes {
      id
      name
    }
    pagesCount
  }
}
    `;

/**
 * __useStudentPartnerOptionsQuery__
 *
 * To run a query within a React component, call `useStudentPartnerOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentPartnerOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentPartnerOptionsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useStudentPartnerOptionsQuery(baseOptions?: Apollo.QueryHookOptions<Types.StudentPartnerOptionsQuery, Types.StudentPartnerOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudentPartnerOptionsQuery, Types.StudentPartnerOptionsQueryVariables>(StudentPartnerOptionsDocument, options);
      }
export function useStudentPartnerOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudentPartnerOptionsQuery, Types.StudentPartnerOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudentPartnerOptionsQuery, Types.StudentPartnerOptionsQueryVariables>(StudentPartnerOptionsDocument, options);
        }
export function useStudentPartnerOptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudentPartnerOptionsQuery, Types.StudentPartnerOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudentPartnerOptionsQuery, Types.StudentPartnerOptionsQueryVariables>(StudentPartnerOptionsDocument, options);
        }
export type StudentPartnerOptionsQueryHookResult = ReturnType<typeof useStudentPartnerOptionsQuery>;
export type StudentPartnerOptionsLazyQueryHookResult = ReturnType<typeof useStudentPartnerOptionsLazyQuery>;
export type StudentPartnerOptionsSuspenseQueryHookResult = ReturnType<typeof useStudentPartnerOptionsSuspenseQuery>;
export type StudentPartnerOptionsQueryResult = Apollo.QueryResult<Types.StudentPartnerOptionsQuery, Types.StudentPartnerOptionsQueryVariables>;
export const PartnerOverviewDocument = gql`
    query PartnerOverview($id: ID!) {
  partner(id: $id) {
    about
    additionalUrls
    address
    details
    email
    id
    name
    phone
    thumbnailUrl
    imageFitToContainer
    imageUrl
    url
    courses {
      id
    }
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
        status
        roadmapItemsCount
        readinessSkillsLessons {
          id
        }
      }
      applicationStatus
      isFavorite
      isRecommended
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
      description
      match
      isEnrolled
      status
      type
      metadata {
        alternativeTitles
        averageSalary
        jobZone
        onetCode
        outlook
      }
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
    query Partners {
  partners {
    nodes {
      id
      name
      thumbnailUrl
      about
      imageUrl
      imageFitToContainer
      opportunities {
        id
        opportunityType
      }
      courses {
        id
      }
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
export const PlanProgressDocument = gql`
    query PlanProgress {
  plans {
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
 * __usePlanProgressQuery__
 *
 * To run a query within a React component, call `usePlanProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlanProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlanProgressQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlanProgressQuery(baseOptions?: Apollo.QueryHookOptions<Types.PlanProgressQuery, Types.PlanProgressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PlanProgressQuery, Types.PlanProgressQueryVariables>(PlanProgressDocument, options);
      }
export function usePlanProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PlanProgressQuery, Types.PlanProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PlanProgressQuery, Types.PlanProgressQueryVariables>(PlanProgressDocument, options);
        }
export function usePlanProgressSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PlanProgressQuery, Types.PlanProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PlanProgressQuery, Types.PlanProgressQueryVariables>(PlanProgressDocument, options);
        }
export type PlanProgressQueryHookResult = ReturnType<typeof usePlanProgressQuery>;
export type PlanProgressLazyQueryHookResult = ReturnType<typeof usePlanProgressLazyQuery>;
export type PlanProgressSuspenseQueryHookResult = ReturnType<typeof usePlanProgressSuspenseQuery>;
export type PlanProgressQueryResult = Apollo.QueryResult<Types.PlanProgressQuery, Types.PlanProgressQueryVariables>;
export const RecommendedCoursesDocument = gql`
    query RecommendedCourses {
  recommendedCourses {
    id
    imageUrl
    match
    name
    pathway {
      name
    }
    thumbnailUrl
    type
    collection {
      id
      name
    }
    metadata {
      alternativeTitles
      averageSalary
      jobZone
      onetCode
      outlook
    }
  }
}
    `;

/**
 * __useRecommendedCoursesQuery__
 *
 * To run a query within a React component, call `useRecommendedCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendedCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendedCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRecommendedCoursesQuery(baseOptions?: Apollo.QueryHookOptions<Types.RecommendedCoursesQuery, Types.RecommendedCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.RecommendedCoursesQuery, Types.RecommendedCoursesQueryVariables>(RecommendedCoursesDocument, options);
      }
export function useRecommendedCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.RecommendedCoursesQuery, Types.RecommendedCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.RecommendedCoursesQuery, Types.RecommendedCoursesQueryVariables>(RecommendedCoursesDocument, options);
        }
export function useRecommendedCoursesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.RecommendedCoursesQuery, Types.RecommendedCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.RecommendedCoursesQuery, Types.RecommendedCoursesQueryVariables>(RecommendedCoursesDocument, options);
        }
export type RecommendedCoursesQueryHookResult = ReturnType<typeof useRecommendedCoursesQuery>;
export type RecommendedCoursesLazyQueryHookResult = ReturnType<typeof useRecommendedCoursesLazyQuery>;
export type RecommendedCoursesSuspenseQueryHookResult = ReturnType<typeof useRecommendedCoursesSuspenseQuery>;
export type RecommendedCoursesQueryResult = Apollo.QueryResult<Types.RecommendedCoursesQuery, Types.RecommendedCoursesQueryVariables>;
export const StudyPreferencesOptionsDocument = gql`
    query StudyPreferencesOptions {
  studyPreferencesOptions {
    area
    description
    id
  }
}
    `;

/**
 * __useStudyPreferencesOptionsQuery__
 *
 * To run a query within a React component, call `useStudyPreferencesOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudyPreferencesOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudyPreferencesOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStudyPreferencesOptionsQuery(baseOptions?: Apollo.QueryHookOptions<Types.StudyPreferencesOptionsQuery, Types.StudyPreferencesOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudyPreferencesOptionsQuery, Types.StudyPreferencesOptionsQueryVariables>(StudyPreferencesOptionsDocument, options);
      }
export function useStudyPreferencesOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudyPreferencesOptionsQuery, Types.StudyPreferencesOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudyPreferencesOptionsQuery, Types.StudyPreferencesOptionsQueryVariables>(StudyPreferencesOptionsDocument, options);
        }
export function useStudyPreferencesOptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudyPreferencesOptionsQuery, Types.StudyPreferencesOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudyPreferencesOptionsQuery, Types.StudyPreferencesOptionsQueryVariables>(StudyPreferencesOptionsDocument, options);
        }
export type StudyPreferencesOptionsQueryHookResult = ReturnType<typeof useStudyPreferencesOptionsQuery>;
export type StudyPreferencesOptionsLazyQueryHookResult = ReturnType<typeof useStudyPreferencesOptionsLazyQuery>;
export type StudyPreferencesOptionsSuspenseQueryHookResult = ReturnType<typeof useStudyPreferencesOptionsSuspenseQuery>;
export type StudyPreferencesOptionsQueryResult = Apollo.QueryResult<Types.StudyPreferencesOptionsQuery, Types.StudyPreferencesOptionsQueryVariables>;
export const StudyPreferencesResultDocument = gql`
    query StudyPreferencesResult($assessmentAttemptId: ID!) {
  studyPreferencesResult(assessmentAttemptId: $assessmentAttemptId) {
    area
    description
    position
  }
}
    `;

/**
 * __useStudyPreferencesResultQuery__
 *
 * To run a query within a React component, call `useStudyPreferencesResultQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudyPreferencesResultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudyPreferencesResultQuery({
 *   variables: {
 *      assessmentAttemptId: // value for 'assessmentAttemptId'
 *   },
 * });
 */
export function useStudyPreferencesResultQuery(baseOptions: Apollo.QueryHookOptions<Types.StudyPreferencesResultQuery, Types.StudyPreferencesResultQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.StudyPreferencesResultQuery, Types.StudyPreferencesResultQueryVariables>(StudyPreferencesResultDocument, options);
      }
export function useStudyPreferencesResultLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.StudyPreferencesResultQuery, Types.StudyPreferencesResultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.StudyPreferencesResultQuery, Types.StudyPreferencesResultQueryVariables>(StudyPreferencesResultDocument, options);
        }
export function useStudyPreferencesResultSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.StudyPreferencesResultQuery, Types.StudyPreferencesResultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.StudyPreferencesResultQuery, Types.StudyPreferencesResultQueryVariables>(StudyPreferencesResultDocument, options);
        }
export type StudyPreferencesResultQueryHookResult = ReturnType<typeof useStudyPreferencesResultQuery>;
export type StudyPreferencesResultLazyQueryHookResult = ReturnType<typeof useStudyPreferencesResultLazyQuery>;
export type StudyPreferencesResultSuspenseQueryHookResult = ReturnType<typeof useStudyPreferencesResultSuspenseQuery>;
export type StudyPreferencesResultQueryResult = Apollo.QueryResult<Types.StudyPreferencesResultQuery, Types.StudyPreferencesResultQueryVariables>;
export const SurveyQuestionsDocument = gql`
    query SurveyQuestions {
  surveyQuestions {
    id
    question
    type
    options {
      step
      option
    }
  }
}
    `;

/**
 * __useSurveyQuestionsQuery__
 *
 * To run a query within a React component, call `useSurveyQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSurveyQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSurveyQuestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSurveyQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<Types.SurveyQuestionsQuery, Types.SurveyQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.SurveyQuestionsQuery, Types.SurveyQuestionsQueryVariables>(SurveyQuestionsDocument, options);
      }
export function useSurveyQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.SurveyQuestionsQuery, Types.SurveyQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.SurveyQuestionsQuery, Types.SurveyQuestionsQueryVariables>(SurveyQuestionsDocument, options);
        }
export function useSurveyQuestionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.SurveyQuestionsQuery, Types.SurveyQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.SurveyQuestionsQuery, Types.SurveyQuestionsQueryVariables>(SurveyQuestionsDocument, options);
        }
export type SurveyQuestionsQueryHookResult = ReturnType<typeof useSurveyQuestionsQuery>;
export type SurveyQuestionsLazyQueryHookResult = ReturnType<typeof useSurveyQuestionsLazyQuery>;
export type SurveyQuestionsSuspenseQueryHookResult = ReturnType<typeof useSurveyQuestionsSuspenseQuery>;
export type SurveyQuestionsQueryResult = Apollo.QueryResult<Types.SurveyQuestionsQuery, Types.SurveyQuestionsQueryVariables>;
export const CourseTableOfContentDocument = gql`
    query CourseTableOfContent($id: ID!, $track: Boolean) {
  course(id: $id, track: $track) {
    content {
      id
      name
      items {
        id
        name
        type
        completed
      }
      checkIns {
        id
        name
        type
        completed
      }
      extensionFields {
        name
        id
      }
      type
      surveyPerformed
    }
  }
}
    `;

/**
 * __useCourseTableOfContentQuery__
 *
 * To run a query within a React component, call `useCourseTableOfContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseTableOfContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseTableOfContentQuery({
 *   variables: {
 *      id: // value for 'id'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useCourseTableOfContentQuery(baseOptions: Apollo.QueryHookOptions<Types.CourseTableOfContentQuery, Types.CourseTableOfContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CourseTableOfContentQuery, Types.CourseTableOfContentQueryVariables>(CourseTableOfContentDocument, options);
      }
export function useCourseTableOfContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CourseTableOfContentQuery, Types.CourseTableOfContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CourseTableOfContentQuery, Types.CourseTableOfContentQueryVariables>(CourseTableOfContentDocument, options);
        }
export function useCourseTableOfContentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CourseTableOfContentQuery, Types.CourseTableOfContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CourseTableOfContentQuery, Types.CourseTableOfContentQueryVariables>(CourseTableOfContentDocument, options);
        }
export type CourseTableOfContentQueryHookResult = ReturnType<typeof useCourseTableOfContentQuery>;
export type CourseTableOfContentLazyQueryHookResult = ReturnType<typeof useCourseTableOfContentLazyQuery>;
export type CourseTableOfContentSuspenseQueryHookResult = ReturnType<typeof useCourseTableOfContentSuspenseQuery>;
export type CourseTableOfContentQueryResult = Apollo.QueryResult<Types.CourseTableOfContentQuery, Types.CourseTableOfContentQueryVariables>;
export const DcStudentInfoDocument = gql`
    query DcStudentInfo {
  userInfo {
    settings {
      assessmentEnabled
      assessmentType
      onboardingEnabled
      selfEvaluationEnabled
    }
    commonAppData {
      canSelectCounselor
      hasCounselorInvited
      canChangeCounselor
      connectionUrl
      hasAccountConnected
      syncStatus {
        lastSyncedAt
        status
      }
      currentCounselor {
        email
        firstName
        lastName
        uuid
      }
      hasFerpaSigned
    }
    currentSchoolYear
    email
    hasCompletedAssessment
    hasCompletedOnboarding
    hasUnreadConversation
    hasOpportunitiesEnabled
    hasPlans
    postSecondaryApplicationsEnabled
    hasAccessToPbl
    firstName
    isImpersonated
    lastName
    logoUrl
    iconUrl
    state
    unreadAnnouncementsCount
    unreadNotificationsCount
    username
    uuid
    welcomeMessage
  }
}
    `;

/**
 * __useDcStudentInfoQuery__
 *
 * To run a query within a React component, call `useDcStudentInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useDcStudentInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDcStudentInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useDcStudentInfoQuery(baseOptions?: Apollo.QueryHookOptions<Types.DcStudentInfoQuery, Types.DcStudentInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.DcStudentInfoQuery, Types.DcStudentInfoQueryVariables>(DcStudentInfoDocument, options);
      }
export function useDcStudentInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.DcStudentInfoQuery, Types.DcStudentInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.DcStudentInfoQuery, Types.DcStudentInfoQueryVariables>(DcStudentInfoDocument, options);
        }
export function useDcStudentInfoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.DcStudentInfoQuery, Types.DcStudentInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.DcStudentInfoQuery, Types.DcStudentInfoQueryVariables>(DcStudentInfoDocument, options);
        }
export type DcStudentInfoQueryHookResult = ReturnType<typeof useDcStudentInfoQuery>;
export type DcStudentInfoLazyQueryHookResult = ReturnType<typeof useDcStudentInfoLazyQuery>;
export type DcStudentInfoSuspenseQueryHookResult = ReturnType<typeof useDcStudentInfoSuspenseQuery>;
export type DcStudentInfoQueryResult = Apollo.QueryResult<Types.DcStudentInfoQuery, Types.DcStudentInfoQueryVariables>;
export const VirtualInternshipContentDocument = gql`
    query VirtualInternshipContent($opportunityId: ID!) {
  opportunity(id: $opportunityId) {
    id
    virtualInternship {
      postExperienceLessons {
        id
        careerReviewSurvey {
          performed
          version
        }
      }
      studentExperienceOpportunityLessons {
        id
      }
      requiredExperiences
      content {
        id
        name
        items {
          id
          name
          type
          completed
        }
        checkIns {
          id
          name
          type
          completed
        }
        type
      }
    }
  }
}
    `;

/**
 * __useVirtualInternshipContentQuery__
 *
 * To run a query within a React component, call `useVirtualInternshipContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useVirtualInternshipContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVirtualInternshipContentQuery({
 *   variables: {
 *      opportunityId: // value for 'opportunityId'
 *   },
 * });
 */
export function useVirtualInternshipContentQuery(baseOptions: Apollo.QueryHookOptions<Types.VirtualInternshipContentQuery, Types.VirtualInternshipContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.VirtualInternshipContentQuery, Types.VirtualInternshipContentQueryVariables>(VirtualInternshipContentDocument, options);
      }
export function useVirtualInternshipContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.VirtualInternshipContentQuery, Types.VirtualInternshipContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.VirtualInternshipContentQuery, Types.VirtualInternshipContentQueryVariables>(VirtualInternshipContentDocument, options);
        }
export function useVirtualInternshipContentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.VirtualInternshipContentQuery, Types.VirtualInternshipContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.VirtualInternshipContentQuery, Types.VirtualInternshipContentQueryVariables>(VirtualInternshipContentDocument, options);
        }
export type VirtualInternshipContentQueryHookResult = ReturnType<typeof useVirtualInternshipContentQuery>;
export type VirtualInternshipContentLazyQueryHookResult = ReturnType<typeof useVirtualInternshipContentLazyQuery>;
export type VirtualInternshipContentSuspenseQueryHookResult = ReturnType<typeof useVirtualInternshipContentSuspenseQuery>;
export type VirtualInternshipContentQueryResult = Apollo.QueryResult<Types.VirtualInternshipContentQuery, Types.VirtualInternshipContentQueryVariables>;
export const VirtualInternshipLessonDocument = gql`
    query VirtualInternshipLesson($opportunityId: ID!, $lessonId: ID!, $track: Boolean) {
  opportunity(id: $opportunityId) {
    name
    virtualInternship {
      id
      lesson(id: $lessonId, track: $track) {
        assignments {
          description
          displayName
          id
          step
          submission {
            id
            files {
              filename
              googleWeblink
              id
              source
              url(options: {responseContentDisposition: "attachment"})
            }
            status
            grade {
              status
              lastGradedBy {
                firstName
                lastName
                fullName
                uuid
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
          version
          performed
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
            answer {
              answer
              checkInQuestionId
              id
              studentId
              grade {
                lastGradedBy {
                  uuid
                  firstName
                  lastName
                }
                status
              }
            }
            id
            question
            step
          }
          step
        }
        checkInQuestions {
          answer {
            answer
            checkInQuestionId
            id
            studentId
            grade {
              lastGradedBy {
                uuid
                firstName
                lastName
              }
              status
            }
          }
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
        progress {
          accepted
          submitted
          total
        }
      }
    }
  }
}
    `;

/**
 * __useVirtualInternshipLessonQuery__
 *
 * To run a query within a React component, call `useVirtualInternshipLessonQuery` and pass it any options that fit your needs.
 * When your component renders, `useVirtualInternshipLessonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVirtualInternshipLessonQuery({
 *   variables: {
 *      opportunityId: // value for 'opportunityId'
 *      lessonId: // value for 'lessonId'
 *      track: // value for 'track'
 *   },
 * });
 */
export function useVirtualInternshipLessonQuery(baseOptions: Apollo.QueryHookOptions<Types.VirtualInternshipLessonQuery, Types.VirtualInternshipLessonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.VirtualInternshipLessonQuery, Types.VirtualInternshipLessonQueryVariables>(VirtualInternshipLessonDocument, options);
      }
export function useVirtualInternshipLessonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.VirtualInternshipLessonQuery, Types.VirtualInternshipLessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.VirtualInternshipLessonQuery, Types.VirtualInternshipLessonQueryVariables>(VirtualInternshipLessonDocument, options);
        }
export function useVirtualInternshipLessonSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.VirtualInternshipLessonQuery, Types.VirtualInternshipLessonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.VirtualInternshipLessonQuery, Types.VirtualInternshipLessonQueryVariables>(VirtualInternshipLessonDocument, options);
        }
export type VirtualInternshipLessonQueryHookResult = ReturnType<typeof useVirtualInternshipLessonQuery>;
export type VirtualInternshipLessonLazyQueryHookResult = ReturnType<typeof useVirtualInternshipLessonLazyQuery>;
export type VirtualInternshipLessonSuspenseQueryHookResult = ReturnType<typeof useVirtualInternshipLessonSuspenseQuery>;
export type VirtualInternshipLessonQueryResult = Apollo.QueryResult<Types.VirtualInternshipLessonQuery, Types.VirtualInternshipLessonQueryVariables>;
export const WorkValuesPairsDocument = gql`
    query WorkValuesPairs {
  workValuesPairs {
    id
    options {
      category
      id
      value
    }
  }
}
    `;

/**
 * __useWorkValuesPairsQuery__
 *
 * To run a query within a React component, call `useWorkValuesPairsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkValuesPairsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkValuesPairsQuery({
 *   variables: {
 *   },
 * });
 */
export function useWorkValuesPairsQuery(baseOptions?: Apollo.QueryHookOptions<Types.WorkValuesPairsQuery, Types.WorkValuesPairsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.WorkValuesPairsQuery, Types.WorkValuesPairsQueryVariables>(WorkValuesPairsDocument, options);
      }
export function useWorkValuesPairsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.WorkValuesPairsQuery, Types.WorkValuesPairsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.WorkValuesPairsQuery, Types.WorkValuesPairsQueryVariables>(WorkValuesPairsDocument, options);
        }
export function useWorkValuesPairsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.WorkValuesPairsQuery, Types.WorkValuesPairsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.WorkValuesPairsQuery, Types.WorkValuesPairsQueryVariables>(WorkValuesPairsDocument, options);
        }
export type WorkValuesPairsQueryHookResult = ReturnType<typeof useWorkValuesPairsQuery>;
export type WorkValuesPairsLazyQueryHookResult = ReturnType<typeof useWorkValuesPairsLazyQuery>;
export type WorkValuesPairsSuspenseQueryHookResult = ReturnType<typeof useWorkValuesPairsSuspenseQuery>;
export type WorkValuesPairsQueryResult = Apollo.QueryResult<Types.WorkValuesPairsQuery, Types.WorkValuesPairsQueryVariables>;
export const WorkValuesResultDocument = gql`
    query WorkValuesResult($assessmentAttemptId: ID!) {
  workValuesResult(assessmentAttemptId: $assessmentAttemptId) {
    score
    workValue
  }
}
    `;

/**
 * __useWorkValuesResultQuery__
 *
 * To run a query within a React component, call `useWorkValuesResultQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkValuesResultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkValuesResultQuery({
 *   variables: {
 *      assessmentAttemptId: // value for 'assessmentAttemptId'
 *   },
 * });
 */
export function useWorkValuesResultQuery(baseOptions: Apollo.QueryHookOptions<Types.WorkValuesResultQuery, Types.WorkValuesResultQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.WorkValuesResultQuery, Types.WorkValuesResultQueryVariables>(WorkValuesResultDocument, options);
      }
export function useWorkValuesResultLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.WorkValuesResultQuery, Types.WorkValuesResultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.WorkValuesResultQuery, Types.WorkValuesResultQueryVariables>(WorkValuesResultDocument, options);
        }
export function useWorkValuesResultSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.WorkValuesResultQuery, Types.WorkValuesResultQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.WorkValuesResultQuery, Types.WorkValuesResultQueryVariables>(WorkValuesResultDocument, options);
        }
export type WorkValuesResultQueryHookResult = ReturnType<typeof useWorkValuesResultQuery>;
export type WorkValuesResultLazyQueryHookResult = ReturnType<typeof useWorkValuesResultLazyQuery>;
export type WorkValuesResultSuspenseQueryHookResult = ReturnType<typeof useWorkValuesResultSuspenseQuery>;
export type WorkValuesResultQueryResult = Apollo.QueryResult<Types.WorkValuesResultQuery, Types.WorkValuesResultQueryVariables>;