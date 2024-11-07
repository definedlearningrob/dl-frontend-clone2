import * as Types from './types';

export type CourseBaseInfoFragment = { id: string, description: string | null, imageUrl: string, name: string };

export type CourseMetadataFragment = { metadata: { alternativeTitles: string | null, averageSalary: string | null, jobZone: string | null, onetCode: string | null, outlook: string | null } };

export type FinalReportCourseFragment = { id: string, name: string, description: string | null, assignments: Array<{ id: string, displayName: string | null, submission: { id: string, files: Array<{ id: string, filename: string, url: string }> } | null }> | null, pathway: { name: string, cluster: { name: string } } | null, reviewSurvey: { questions: Array<{ id: string, answer: Array<string | null>, question: string }> } | null };

export type SyncCommonAppDataMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type SyncCommonAppDataMutation = { syncCommonAppData: { status: { status: Types.CommonAppSyncStatuses, lastSyncedAt: string | null } } | null };

export type CatalogTrackQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type CatalogTrackQuery = { careersCatalog: { id: string, track: { id: string, name: string, description: string | null, grades: Array<string>, resourcesCount: number, imageUrl: string, thumbnailUrl: string, units: Array<{ id: string, name: string, description: string | null, imageUrl: string, thumbnailUrl: string, resources: Array<{ resourceId: string, name: string, description: string | null, imageUrl: string | null, thumbnailUrl: string | null, resourceType: Types.UnitResourceTypes, isVirtualInternship: boolean | null, pathways: Array<{ name: string }> }> }> } } | null };

export type ClustersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ClustersQuery = { clusters: Array<{ id: string, name: string, pathways: Array<{ id: string, name: string }> }> };

export type CollectionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CollectionsQuery = { collections: Array<{ id: string, name: string }> };

export type CustomCatalogQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CustomCatalogQuery = { careersCatalog: { id: string, description: string | null, name: string, thumbnailUrl: string, imageUrl: string, tracks: Array<{ id: string, name: string, shortDescription: string | null, thumbnailUrl: string, imageUrl: string, grades: Array<string>, resourcesCount: number }> } | null };

export type CustomCatalogOptionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CustomCatalogOptionQuery = { careersCatalog: { id: string, name: string, displayName: string | null } | null };

export type CustomCatalogOverviewQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CustomCatalogOverviewQuery = { careersCatalog: { id: string, description: string | null, name: string, thumbnailUrl: string, imageUrl: string } | null };

export type OpportunityTagsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type OpportunityTagsQuery = { opportunityTags: Array<string> };
