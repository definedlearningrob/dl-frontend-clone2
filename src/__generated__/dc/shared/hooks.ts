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
export const SyncCommonAppDataMutationDocument = gql`
    mutation SyncCommonAppDataMutation {
  syncCommonAppData(input: {}) {
    status {
      status
      lastSyncedAt
    }
  }
}
    `;
export type SyncCommonAppDataMutationMutationFn = Apollo.MutationFunction<Types.SyncCommonAppDataMutation, Types.SyncCommonAppDataMutationVariables>;

/**
 * __useSyncCommonAppDataMutation__
 *
 * To run a mutation, you first call `useSyncCommonAppDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncCommonAppDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncCommonAppDataMutation, { data, loading, error }] = useSyncCommonAppDataMutation({
 *   variables: {
 *   },
 * });
 */
export function useSyncCommonAppDataMutation(baseOptions?: Apollo.MutationHookOptions<Types.SyncCommonAppDataMutation, Types.SyncCommonAppDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.SyncCommonAppDataMutation, Types.SyncCommonAppDataMutationVariables>(SyncCommonAppDataMutationDocument, options);
      }
export type SyncCommonAppDataMutationHookResult = ReturnType<typeof useSyncCommonAppDataMutation>;
export type SyncCommonAppDataMutationMutationResult = Apollo.MutationResult<Types.SyncCommonAppDataMutation>;
export type SyncCommonAppDataMutationMutationOptions = Apollo.BaseMutationOptions<Types.SyncCommonAppDataMutation, Types.SyncCommonAppDataMutationVariables>;
export const CatalogTrackDocument = gql`
    query CatalogTrack($id: ID!) {
  careersCatalog {
    id
    track(id: $id) {
      id
      name
      description
      grades
      resourcesCount
      imageUrl
      thumbnailUrl
      units {
        id
        name
        description
        imageUrl
        thumbnailUrl
        resources {
          resourceId
          name
          description
          imageUrl
          thumbnailUrl
          resourceType
          isVirtualInternship
          pathways {
            name
          }
        }
      }
    }
  }
}
    `;

/**
 * __useCatalogTrackQuery__
 *
 * To run a query within a React component, call `useCatalogTrackQuery` and pass it any options that fit your needs.
 * When your component renders, `useCatalogTrackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCatalogTrackQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCatalogTrackQuery(baseOptions: Apollo.QueryHookOptions<Types.CatalogTrackQuery, Types.CatalogTrackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CatalogTrackQuery, Types.CatalogTrackQueryVariables>(CatalogTrackDocument, options);
      }
export function useCatalogTrackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CatalogTrackQuery, Types.CatalogTrackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CatalogTrackQuery, Types.CatalogTrackQueryVariables>(CatalogTrackDocument, options);
        }
export function useCatalogTrackSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CatalogTrackQuery, Types.CatalogTrackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CatalogTrackQuery, Types.CatalogTrackQueryVariables>(CatalogTrackDocument, options);
        }
export type CatalogTrackQueryHookResult = ReturnType<typeof useCatalogTrackQuery>;
export type CatalogTrackLazyQueryHookResult = ReturnType<typeof useCatalogTrackLazyQuery>;
export type CatalogTrackSuspenseQueryHookResult = ReturnType<typeof useCatalogTrackSuspenseQuery>;
export type CatalogTrackQueryResult = Apollo.QueryResult<Types.CatalogTrackQuery, Types.CatalogTrackQueryVariables>;
export const ClustersDocument = gql`
    query Clusters {
  clusters {
    id
    name
    pathways {
      id
      name
    }
  }
}
    `;

/**
 * __useClustersQuery__
 *
 * To run a query within a React component, call `useClustersQuery` and pass it any options that fit your needs.
 * When your component renders, `useClustersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClustersQuery({
 *   variables: {
 *   },
 * });
 */
export function useClustersQuery(baseOptions?: Apollo.QueryHookOptions<Types.ClustersQuery, Types.ClustersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ClustersQuery, Types.ClustersQueryVariables>(ClustersDocument, options);
      }
export function useClustersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ClustersQuery, Types.ClustersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ClustersQuery, Types.ClustersQueryVariables>(ClustersDocument, options);
        }
export function useClustersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.ClustersQuery, Types.ClustersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ClustersQuery, Types.ClustersQueryVariables>(ClustersDocument, options);
        }
export type ClustersQueryHookResult = ReturnType<typeof useClustersQuery>;
export type ClustersLazyQueryHookResult = ReturnType<typeof useClustersLazyQuery>;
export type ClustersSuspenseQueryHookResult = ReturnType<typeof useClustersSuspenseQuery>;
export type ClustersQueryResult = Apollo.QueryResult<Types.ClustersQuery, Types.ClustersQueryVariables>;
export const CollectionsDocument = gql`
    query Collections {
  collections {
    id
    name
  }
}
    `;

/**
 * __useCollectionsQuery__
 *
 * To run a query within a React component, call `useCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCollectionsQuery(baseOptions?: Apollo.QueryHookOptions<Types.CollectionsQuery, Types.CollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CollectionsQuery, Types.CollectionsQueryVariables>(CollectionsDocument, options);
      }
export function useCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CollectionsQuery, Types.CollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CollectionsQuery, Types.CollectionsQueryVariables>(CollectionsDocument, options);
        }
export function useCollectionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CollectionsQuery, Types.CollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CollectionsQuery, Types.CollectionsQueryVariables>(CollectionsDocument, options);
        }
export type CollectionsQueryHookResult = ReturnType<typeof useCollectionsQuery>;
export type CollectionsLazyQueryHookResult = ReturnType<typeof useCollectionsLazyQuery>;
export type CollectionsSuspenseQueryHookResult = ReturnType<typeof useCollectionsSuspenseQuery>;
export type CollectionsQueryResult = Apollo.QueryResult<Types.CollectionsQuery, Types.CollectionsQueryVariables>;
export const CustomCatalogDocument = gql`
    query CustomCatalog {
  careersCatalog {
    id
    description
    name
    thumbnailUrl
    imageUrl
    tracks {
      id
      name
      shortDescription
      thumbnailUrl
      imageUrl
      grades
      resourcesCount
    }
  }
}
    `;

/**
 * __useCustomCatalogQuery__
 *
 * To run a query within a React component, call `useCustomCatalogQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomCatalogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomCatalogQuery({
 *   variables: {
 *   },
 * });
 */
export function useCustomCatalogQuery(baseOptions?: Apollo.QueryHookOptions<Types.CustomCatalogQuery, Types.CustomCatalogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CustomCatalogQuery, Types.CustomCatalogQueryVariables>(CustomCatalogDocument, options);
      }
export function useCustomCatalogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CustomCatalogQuery, Types.CustomCatalogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CustomCatalogQuery, Types.CustomCatalogQueryVariables>(CustomCatalogDocument, options);
        }
export function useCustomCatalogSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CustomCatalogQuery, Types.CustomCatalogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CustomCatalogQuery, Types.CustomCatalogQueryVariables>(CustomCatalogDocument, options);
        }
export type CustomCatalogQueryHookResult = ReturnType<typeof useCustomCatalogQuery>;
export type CustomCatalogLazyQueryHookResult = ReturnType<typeof useCustomCatalogLazyQuery>;
export type CustomCatalogSuspenseQueryHookResult = ReturnType<typeof useCustomCatalogSuspenseQuery>;
export type CustomCatalogQueryResult = Apollo.QueryResult<Types.CustomCatalogQuery, Types.CustomCatalogQueryVariables>;
export const CustomCatalogOptionDocument = gql`
    query CustomCatalogOption {
  careersCatalog {
    id
    name
    displayName
  }
}
    `;

/**
 * __useCustomCatalogOptionQuery__
 *
 * To run a query within a React component, call `useCustomCatalogOptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomCatalogOptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomCatalogOptionQuery({
 *   variables: {
 *   },
 * });
 */
export function useCustomCatalogOptionQuery(baseOptions?: Apollo.QueryHookOptions<Types.CustomCatalogOptionQuery, Types.CustomCatalogOptionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CustomCatalogOptionQuery, Types.CustomCatalogOptionQueryVariables>(CustomCatalogOptionDocument, options);
      }
export function useCustomCatalogOptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CustomCatalogOptionQuery, Types.CustomCatalogOptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CustomCatalogOptionQuery, Types.CustomCatalogOptionQueryVariables>(CustomCatalogOptionDocument, options);
        }
export function useCustomCatalogOptionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CustomCatalogOptionQuery, Types.CustomCatalogOptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CustomCatalogOptionQuery, Types.CustomCatalogOptionQueryVariables>(CustomCatalogOptionDocument, options);
        }
export type CustomCatalogOptionQueryHookResult = ReturnType<typeof useCustomCatalogOptionQuery>;
export type CustomCatalogOptionLazyQueryHookResult = ReturnType<typeof useCustomCatalogOptionLazyQuery>;
export type CustomCatalogOptionSuspenseQueryHookResult = ReturnType<typeof useCustomCatalogOptionSuspenseQuery>;
export type CustomCatalogOptionQueryResult = Apollo.QueryResult<Types.CustomCatalogOptionQuery, Types.CustomCatalogOptionQueryVariables>;
export const CustomCatalogOverviewDocument = gql`
    query CustomCatalogOverview {
  careersCatalog {
    id
    description
    name
    thumbnailUrl
    imageUrl
  }
}
    `;

/**
 * __useCustomCatalogOverviewQuery__
 *
 * To run a query within a React component, call `useCustomCatalogOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomCatalogOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomCatalogOverviewQuery({
 *   variables: {
 *   },
 * });
 */
export function useCustomCatalogOverviewQuery(baseOptions?: Apollo.QueryHookOptions<Types.CustomCatalogOverviewQuery, Types.CustomCatalogOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.CustomCatalogOverviewQuery, Types.CustomCatalogOverviewQueryVariables>(CustomCatalogOverviewDocument, options);
      }
export function useCustomCatalogOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.CustomCatalogOverviewQuery, Types.CustomCatalogOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.CustomCatalogOverviewQuery, Types.CustomCatalogOverviewQueryVariables>(CustomCatalogOverviewDocument, options);
        }
export function useCustomCatalogOverviewSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.CustomCatalogOverviewQuery, Types.CustomCatalogOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.CustomCatalogOverviewQuery, Types.CustomCatalogOverviewQueryVariables>(CustomCatalogOverviewDocument, options);
        }
export type CustomCatalogOverviewQueryHookResult = ReturnType<typeof useCustomCatalogOverviewQuery>;
export type CustomCatalogOverviewLazyQueryHookResult = ReturnType<typeof useCustomCatalogOverviewLazyQuery>;
export type CustomCatalogOverviewSuspenseQueryHookResult = ReturnType<typeof useCustomCatalogOverviewSuspenseQuery>;
export type CustomCatalogOverviewQueryResult = Apollo.QueryResult<Types.CustomCatalogOverviewQuery, Types.CustomCatalogOverviewQueryVariables>;
export const OpportunityTagsDocument = gql`
    query OpportunityTags {
  opportunityTags
}
    `;

/**
 * __useOpportunityTagsQuery__
 *
 * To run a query within a React component, call `useOpportunityTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpportunityTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpportunityTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOpportunityTagsQuery(baseOptions?: Apollo.QueryHookOptions<Types.OpportunityTagsQuery, Types.OpportunityTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.OpportunityTagsQuery, Types.OpportunityTagsQueryVariables>(OpportunityTagsDocument, options);
      }
export function useOpportunityTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.OpportunityTagsQuery, Types.OpportunityTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.OpportunityTagsQuery, Types.OpportunityTagsQueryVariables>(OpportunityTagsDocument, options);
        }
export function useOpportunityTagsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<Types.OpportunityTagsQuery, Types.OpportunityTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.OpportunityTagsQuery, Types.OpportunityTagsQueryVariables>(OpportunityTagsDocument, options);
        }
export type OpportunityTagsQueryHookResult = ReturnType<typeof useOpportunityTagsQuery>;
export type OpportunityTagsLazyQueryHookResult = ReturnType<typeof useOpportunityTagsLazyQuery>;
export type OpportunityTagsSuspenseQueryHookResult = ReturnType<typeof useOpportunityTagsSuspenseQuery>;
export type OpportunityTagsQueryResult = Apollo.QueryResult<Types.OpportunityTagsQuery, Types.OpportunityTagsQueryVariables>;