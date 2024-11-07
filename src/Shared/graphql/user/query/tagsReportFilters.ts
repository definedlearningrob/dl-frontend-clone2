import { TypedDocumentNode, gql } from '@apollo/client';

export const TAGS_REPORT_FILTERS: TypedDocumentNode<TTagsFiltersData, TTagsFiltersVariables> = gql`
  query PerformanceIndicatorsFilters(
    $tagIds: [ID!]!
    $filters: ReportFiltersFilter
    $entityFilter: EntityFilter
    $userFilter: UserFilter
    $schoolClassFilter: SchoolClassFilter
  ) {
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

type TTagsFiltersVariables = {
  tagIds: string[] | null;
  filters?: {
    entityUuids?: string[];
    gradeLevels?: string[];
    userUuids?: string[];
  };
  entityFilter?: {
    nameCont: string;
  };
  userFilter?: {
    fullNameCont?: string;
  };
  schoolClassFilter?: {
    nameCont: string;
  };
};

type TTagsFiltersData = {
  tagReportFilters: {
    entities: {
      nodesCount: number;
      pagesCount: number;
      nodes: {
        uuid: string;
        name: string;
      }[];
    };
    gradeLevels: string[];
    users: {
      nodesCount: number;
      pagesCount: number;
      nodes: {
        uuid: string;
        fullName: string;
      }[];
    };
    schoolClasses: {
      nodesCount: number;
      pagesCount: number;
      nodes: {
        uuid: string;
        name: string;
        users: {
          nodes: {
            fullName: string;
          }[];
        };
      }[];
    };
  };
};
