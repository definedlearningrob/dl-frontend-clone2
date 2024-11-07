import { TypedDocumentNode, gql } from '@apollo/client';

export const ASSESSMENT_REPORT_FILTERS: TypedDocumentNode<
  TAssessmentReportFiltersData,
  TAssessmentReportFiltersVariables
> = gql`
  query AssessmentReportFilters(
    $filters: ReportFiltersFilter
    $entityFilter: EntityFilter
    $userFilter: UserFilter
    $schoolClassFilter: SchoolClassFilter
  ) {
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

type TAssessmentReportFiltersVariables = {
  filters?: {
    entityUuids?: string[];
    gradeLevels?: string[];
    userUuids?: string[];
  };
  entityFilter?: {
    nameCont: string;
  };
  userFilter?: {
    fullNameCont: string;
  };
  schoolClassFilter?: {
    nameCont: string;
  };
};

export type TAssessmentReportFiltersData = {
  assessmentReportFilters: {
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
