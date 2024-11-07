import { gql } from '@apollo/client';

export default gql`
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

export type TSystemAdminEntities = {
  entities: {
    nodes: TEntity;
    pagesCount: string;
  };
};

export type TEntity = {
  nodes: {
    hierarchyMetrics: {
      entitiesCount: string;
      schoolClassesCount: string;
      studentsCount: string;
      teachersCount: string;
    };
    name: string;
    uuid: string;
  };
};
export type SystemAdminData = {
  systemAdminEntities: TSystemAdminEntities;
};

export type SystemAdminVariables = {
  page: string;
  perPage: string;
  filter: string;
};
