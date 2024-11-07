import { gql } from '@apollo/client';

export default gql`
  query DlAdminEntityInfo($uuid: ID!, $page: Int, $perPage: Int, $filter: UserFilter) {
    adminDashboard {
      entity(uuid: $uuid) {
        uuid
        name
        hasChildren
        users(page: $page, perPage: $perPage, filter: $filter) {
          nodes {
            entity {
              name
              parent {
                name
                uuid
              }
              uuid
              hasChildren
            }
            firstName
            lastName
            role
            schoolClassesCount
            uuid
          }
        }
        hierarchyMetrics {
          studentsCount
          teachersCount
          entitiesCount
          schoolClassesCount
        }
        settings {
          selfEvaluationEnabled
          schoolYearStartDate {
            day
            month
          }
        }
        plans {
          name
        }
        catalogs {
          name
        }
        standardSets {
          name
        }
      }
    }
  }
`;

export type TAdminEntityInfoData = {
  adminDashboard: {
    entity: TEntity;
  };
};

export type TAdminEntityInfoVariables = {
  uuid: string;
};

export type TCatalog = {
  id: string;
  name: string;
};

export type THierarchyMetrics = {
  entitiesCount: number;
  schoolClassesCount: number;
  studentsCount: number;
  teachersCount: number;
};

export type TPlan = {
  id: string;
  name: string;
};

export type TSchoolYearStartDate = {
  day: number;
  month: number;
};

export type TSettings = {
  assessmentEnabled: boolean;
  assessmentType: string;
  onboardingEnabled: boolean;
  selfEvaluationEnabled: boolean;
  schoolYearStartDate: TSchoolYearStartDate;
};

export type TStandardSet = {
  id: string;
  name: string;
};

export type TEntity = {
  catalogs: TCatalog[];
  hierarchyMetrics: THierarchyMetrics;
  hasChildren: boolean;
  name: string;
  plans: TPlan[];
  settings: TSettings;
  standardSets: TStandardSet[];
  uuid: string;
};
