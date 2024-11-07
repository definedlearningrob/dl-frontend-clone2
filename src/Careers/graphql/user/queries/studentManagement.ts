import { gql, TypedDocumentNode } from '@apollo/client';

import { TStudentPlan } from '@dc/graphql/user/queries/studentCurrentCoursesPreview';

import { ArchivableStatusTypes } from '@pbl/resources/enums';

import { SORT_ORDER } from '@shared/resources/enums';

export const STUDENT_MANAGEMENT_QUERY: TypedDocumentNode<
  TStudentManagementData,
  TStudentManagementVariables
> = gql`
  query StudentManagement(
    $page: Int
    $perPage: Int
    $filter: StudentFilter
    $fullNameSortOrder: SortingOrder
    $scope: ArchivableStatus
  ) {
    students(
      page: $page
      perPage: $perPage
      filter: $filter
      fullNameSortOrder: $fullNameSortOrder
      scope: $scope
    ) {
      nodes {
        gradYear
        uuid
        firstName
        uuid
        canPostSecondarySettingBeChanged
        postSecondaryApplicationsStatus {
          isEnabled
          isOverridden
        }
        firstName
        fullName
        counselor {
          uuid
          fullName
        }
        lastName
        email
        entity {
          uuid
          name
        }
        sisId
        plans {
          id
        }
      }
      nodesCount
      pagesCount
    }
  }
`;

export type Counselor = {
  uuid: string;
  fullName: string;
};

export type Student = {
  gradYear: number | null;
  uuid: string;
  firstName: string;
  fullName: string;
  lastName: string;
  email: string;
  canPostSecondarySettingBeChanged: boolean;
  postSecondaryApplicationsStatus: {
    isEnabled: boolean;
    isOverridden: boolean;
  };
  entity: {
    uuid: string;
    name: string;
  };
  counselor: {
    uuid: string;
    fullName: string;
  } | null;
  sisId: string | null;
  plans: TStudentPlan[];
};

export type StudentPage = {
  nodes: Student[];
  nodesCount: number;
  pagesCount: number;
};

export type TStudentManagementData = {
  students: StudentPage;
};

export type TStudentManagementVariables = {
  page?: number;
  perPage?: number;
  filter?: {
    counselorUuidEq?: string | null;
    currentCoursesIdEq?: string;
    entityUuidIn?: string[];
    fullNameCont?: string;
    gradYearIn?: number[];
  };
  scope: ArchivableStatusTypes;
  fullNameSortOrder?: SORT_ORDER;
};
