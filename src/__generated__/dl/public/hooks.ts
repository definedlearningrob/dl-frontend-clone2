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
export const PublicCourseDetailsDocument = gql`
    query PublicCourseDetails($shareId: ID!, $code: String!, $courseId: ID!) {
  project: task(shareId: $shareId, code: $code) {
    course(id: $courseId) {
      exploreMoreAvailable
      ...CourseDetails
    }
  }
}
    ${CourseDetailsFragmentDoc}`;

/**
 * __usePublicCourseDetailsQuery__
 *
 * To run a query within a React component, call `usePublicCourseDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicCourseDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicCourseDetailsQuery({
 *   variables: {
 *      shareId: // value for 'shareId'
 *      code: // value for 'code'
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function usePublicCourseDetailsQuery(baseOptions: Apollo.QueryHookOptions<Types.PublicCourseDetailsQuery, Types.PublicCourseDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PublicCourseDetailsQuery, Types.PublicCourseDetailsQueryVariables>(PublicCourseDetailsDocument, options);
      }
export function usePublicCourseDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PublicCourseDetailsQuery, Types.PublicCourseDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PublicCourseDetailsQuery, Types.PublicCourseDetailsQueryVariables>(PublicCourseDetailsDocument, options);
        }
export function usePublicCourseDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PublicCourseDetailsQuery, Types.PublicCourseDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PublicCourseDetailsQuery, Types.PublicCourseDetailsQueryVariables>(PublicCourseDetailsDocument, options);
        }
export type PublicCourseDetailsQueryHookResult = ReturnType<typeof usePublicCourseDetailsQuery>;
export type PublicCourseDetailsLazyQueryHookResult = ReturnType<typeof usePublicCourseDetailsLazyQuery>;
export type PublicCourseDetailsSuspenseQueryHookResult = ReturnType<typeof usePublicCourseDetailsSuspenseQuery>;
export type PublicCourseDetailsQueryResult = Apollo.QueryResult<Types.PublicCourseDetailsQuery, Types.PublicCourseDetailsQueryVariables>;
export const PublicProjectDocument = gql`
    query PublicProject($shareId: ID!, $code: String!, $trackPresentation: Boolean) {
  project: task(shareId: $shareId, code: $code, track: true) {
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
    checkInQuestions {
      id
      question
      step
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
      slides {
        backgroundColor
        backgroundImage
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
          questions {
            id
            question
            step
          }
        }
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
          rubrics {
            description
            displayName
            id
            name
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
    presentationUrl
    standard
    studentResources
    teachingResources
    units {
      displayName
      id
    }
  }
}
    `;

/**
 * __usePublicProjectQuery__
 *
 * To run a query within a React component, call `usePublicProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicProjectQuery({
 *   variables: {
 *      shareId: // value for 'shareId'
 *      code: // value for 'code'
 *      trackPresentation: // value for 'trackPresentation'
 *   },
 * });
 */
export function usePublicProjectQuery(baseOptions: Apollo.QueryHookOptions<Types.PublicProjectQuery, Types.PublicProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PublicProjectQuery, Types.PublicProjectQueryVariables>(PublicProjectDocument, options);
      }
export function usePublicProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PublicProjectQuery, Types.PublicProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PublicProjectQuery, Types.PublicProjectQueryVariables>(PublicProjectDocument, options);
        }
export function usePublicProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PublicProjectQuery, Types.PublicProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PublicProjectQuery, Types.PublicProjectQueryVariables>(PublicProjectDocument, options);
        }
export type PublicProjectQueryHookResult = ReturnType<typeof usePublicProjectQuery>;
export type PublicProjectLazyQueryHookResult = ReturnType<typeof usePublicProjectLazyQuery>;
export type PublicProjectSuspenseQueryHookResult = ReturnType<typeof usePublicProjectSuspenseQuery>;
export type PublicProjectQueryResult = Apollo.QueryResult<Types.PublicProjectQuery, Types.PublicProjectQueryVariables>;
export const PublicProjectProductsDocument = gql`
    query PublicProjectProducts($shareId: ID!, $code: String!) {
  project: task(shareId: $shareId, code: $code) {
    id
    products {
      id
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
    }
  }
}
    `;

/**
 * __usePublicProjectProductsQuery__
 *
 * To run a query within a React component, call `usePublicProjectProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicProjectProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicProjectProductsQuery({
 *   variables: {
 *      shareId: // value for 'shareId'
 *      code: // value for 'code'
 *   },
 * });
 */
export function usePublicProjectProductsQuery(baseOptions: Apollo.QueryHookOptions<Types.PublicProjectProductsQuery, Types.PublicProjectProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PublicProjectProductsQuery, Types.PublicProjectProductsQueryVariables>(PublicProjectProductsDocument, options);
      }
export function usePublicProjectProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PublicProjectProductsQuery, Types.PublicProjectProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PublicProjectProductsQuery, Types.PublicProjectProductsQueryVariables>(PublicProjectProductsDocument, options);
        }
export function usePublicProjectProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PublicProjectProductsQuery, Types.PublicProjectProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PublicProjectProductsQuery, Types.PublicProjectProductsQueryVariables>(PublicProjectProductsDocument, options);
        }
export type PublicProjectProductsQueryHookResult = ReturnType<typeof usePublicProjectProductsQuery>;
export type PublicProjectProductsLazyQueryHookResult = ReturnType<typeof usePublicProjectProductsLazyQuery>;
export type PublicProjectProductsSuspenseQueryHookResult = ReturnType<typeof usePublicProjectProductsSuspenseQuery>;
export type PublicProjectProductsQueryResult = Apollo.QueryResult<Types.PublicProjectProductsQuery, Types.PublicProjectProductsQueryVariables>;
export const PublicProjectStandardsDocument = gql`
    query PublicProjectStandards($shareId: ID!, $setId: String!, $code: String!) {
  project: task(shareId: $shareId, code: $code) {
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
 * __usePublicProjectStandardsQuery__
 *
 * To run a query within a React component, call `usePublicProjectStandardsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicProjectStandardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicProjectStandardsQuery({
 *   variables: {
 *      shareId: // value for 'shareId'
 *      setId: // value for 'setId'
 *      code: // value for 'code'
 *   },
 * });
 */
export function usePublicProjectStandardsQuery(baseOptions: Apollo.QueryHookOptions<Types.PublicProjectStandardsQuery, Types.PublicProjectStandardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PublicProjectStandardsQuery, Types.PublicProjectStandardsQueryVariables>(PublicProjectStandardsDocument, options);
      }
export function usePublicProjectStandardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PublicProjectStandardsQuery, Types.PublicProjectStandardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PublicProjectStandardsQuery, Types.PublicProjectStandardsQueryVariables>(PublicProjectStandardsDocument, options);
        }
export function usePublicProjectStandardsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PublicProjectStandardsQuery, Types.PublicProjectStandardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PublicProjectStandardsQuery, Types.PublicProjectStandardsQueryVariables>(PublicProjectStandardsDocument, options);
        }
export type PublicProjectStandardsQueryHookResult = ReturnType<typeof usePublicProjectStandardsQuery>;
export type PublicProjectStandardsLazyQueryHookResult = ReturnType<typeof usePublicProjectStandardsLazyQuery>;
export type PublicProjectStandardsSuspenseQueryHookResult = ReturnType<typeof usePublicProjectStandardsSuspenseQuery>;
export type PublicProjectStandardsQueryResult = Apollo.QueryResult<Types.PublicProjectStandardsQuery, Types.PublicProjectStandardsQueryVariables>;
export const StandardSetsDocument = gql`
    query StandardSets($code: String!) {
  standardSets(code: $code) {
    name
    setId
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
 *      code: // value for 'code'
 *   },
 * });
 */
export function useStandardSetsQuery(baseOptions: Apollo.QueryHookOptions<Types.StandardSetsQuery, Types.StandardSetsQueryVariables>) {
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