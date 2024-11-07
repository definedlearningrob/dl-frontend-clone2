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
export const PublicCourseDocument = gql`
    query PublicCourse($shareId: ID!, $code: String!, $track: Boolean) {
  course(shareId: $shareId, code: $code, track: $track) {
    id
    description
    name
    pathway {
      name
    }
    lessons {
      name
      description {
        audience
        introduction
        goal
        role
        situation
      }
      archivedAt
      assignments {
        description
        displayName
        id
        rubrics {
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
          description
          headings {
            id
            multiplier
            name
            uuid
          }
          id
          name
          uuid
        }
        step
      }
      attachments {
        description
        displayName
        files {
          filename
          id
          url
        }
        id
        step
      }
      careerReviewSurvey {
        questions {
          id
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
        step
      }
      checkInQuestions {
        id
        question
        step
      }
      externalPresentations {
        displayName
        isExpandable
        id
        source
        step
      }
      hasPresentation
      id
      imageUrl
      name
      researchLinks {
        author
        displayName
        id
        resourceLink
        sourceName
        step
      }
      step
      texts {
        content
        displayName
        id
        step
      }
      thumbnailUrl
      type
      videos {
        description
        displayName
        filename
        id
        step
        url
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
 * __usePublicCourseQuery__
 *
 * To run a query within a React component, call `usePublicCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicCourseQuery({
 *   variables: {
 *      shareId: // value for 'shareId'
 *      code: // value for 'code'
 *      track: // value for 'track'
 *   },
 * });
 */
export function usePublicCourseQuery(baseOptions: Apollo.QueryHookOptions<Types.PublicCourseQuery, Types.PublicCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PublicCourseQuery, Types.PublicCourseQueryVariables>(PublicCourseDocument, options);
      }
export function usePublicCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PublicCourseQuery, Types.PublicCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PublicCourseQuery, Types.PublicCourseQueryVariables>(PublicCourseDocument, options);
        }
export function usePublicCourseSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.PublicCourseQuery, Types.PublicCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PublicCourseQuery, Types.PublicCourseQueryVariables>(PublicCourseDocument, options);
        }
export type PublicCourseQueryHookResult = ReturnType<typeof usePublicCourseQuery>;
export type PublicCourseLazyQueryHookResult = ReturnType<typeof usePublicCourseLazyQuery>;
export type PublicCourseSuspenseQueryHookResult = ReturnType<typeof usePublicCourseSuspenseQuery>;
export type PublicCourseQueryResult = Apollo.QueryResult<Types.PublicCourseQuery, Types.PublicCourseQueryVariables>;