import { gql } from '@apollo/client';

export default gql`
  query DcAdminEntityInfo($uuid: ID!) {
    adminDashboard {
      entity(uuid: $uuid) {
        catalogs {
          id
          name
        }
        extensionFields {
          id
          name
        }
        hasChildren
        hierarchyMetrics {
          entitiesCount
          schoolClassesCount
          studentsCount
          teachersCount
        }
        name
        plans {
          id
          name
        }
        settings {
          assessmentEnabled
          assessmentType
          onboardingEnabled
          selfEvaluationEnabled
          schoolYearStartDate {
            day
            month
          }
        }
        standardSets {
          id
          name
        }
        uuid
      }
      userId
    }
  }
`;

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
  extensionFields: TAdminEntityInfoExtensionField[];
  hasChildren: boolean;
  hierarchyMetrics: THierarchyMetrics;
  name: string;
  plans: TPlan[];
  settings: TSettings;
  standardSets: TStandardSet[];
  uuid: string;
};

export type TAdminDashboard = {
  entity: TEntity;
  userId: string;
};

export type TAdminEntityInfoData = {
  adminDashboard: TAdminDashboard;
};

type TAdminEntityInfoExtensionField = {
  id: string;
  name: string;
};
