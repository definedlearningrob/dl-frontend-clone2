import { gql } from '@apollo/client';

import { TTag } from '@dc/graphql/user/queries/tag';

import { ReportType } from '@shared/resources/enums';

export default gql`
  query Entity($uuid: ID!) {
    entity(uuid: $uuid) {
      tags {
        id
        name
        type
      }
      catalogs {
        id
        name
        imageUrl
        service
        tracks {
          id
          name
          units {
            id
            name
          }
        }
      }
      name
      parent {
        name
        uuid
      }
      plans {
        id
        name
      }
      reportTypes
      settings {
        assessmentEnabled
        assessmentType
        onboardingEnabled
        opportunitiesEnabled
        postSecondaryApplicationsEnabled
        selfEvaluationEnabled
        classManagementEnabled
        schoolYearStartDate {
          day
          month
        }
      }
      standardSets {
        id
        name
      }
      regionName
      uuid
      dcIconUrl
      dcLogoUrl
      dlIconUrl
      dlLogoUrl
      welcomeMessage {
        dcStudent
        dcTeacher
        dlStudent
        dlTeacher
      }
    }
  }
`;

export type TService = {
  name: string;
  active: boolean;
};

export type TContract = {
  uuid: string;
  name: string;
  startDate: string;
  endDate: string;
  service: TService[];
};

export type TWelcomeMessage = {
  dcStudent: string;
  dcTeacher: string;
  dlStudent: string;
  dlTeacher: string;
};

export type TCatalog = {
  id: string;
  name: string;
  imageUrl: string;
  step: number;
};

export type TParent = {
  name: string;
  uuid: string;
};

export type TPlan = {
  id: string;
  name: string;
  step: number;
};

export type TSchoolYearStartDate = {
  day: number;
  month: number;
};

export type TSettings = {
  assessmentEnabled: boolean;
  assessmentType: string;
  onboardingEnabled: boolean;
  opportunitiesEnabled: boolean;
  selfEvaluationEnabled: boolean;
  classManagementEnabled: boolean;
  postSecondaryApplicationsEnabled: boolean;
  schoolYearStartDate: TSchoolYearStartDate;
};

export type TStandardSet = {
  id: string;
  name: string;
};

export type TEntity = {
  tags: TTag[];
  catalogs: TCatalog[];
  name: string;
  parent: TParent;
  plans: TPlan[];
  reportTypes: ReportType[];
  settings: TSettings;
  standardSets: TStandardSet[];
  dcIconUrl: string;
  dcLogoUrl: string;
  dlIconUrl: string;
  dlLogoUrl: string;
  contracts: TContract[];
  welcomeMessage: TWelcomeMessage;
  regionName: string;
  uuid: string;
};

export type TEntityData = {
  entity: TEntity;
};
