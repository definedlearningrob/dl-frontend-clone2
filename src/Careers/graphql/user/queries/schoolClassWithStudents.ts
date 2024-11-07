import { gql } from '@apollo/client';

import { ArchivableStatusTypes, AssessmentType } from '@dc/resources/enums';

export default gql`
  query SchoolClassWithStudents(
    $uuid: ID!
    $filter: StudentFilter
    $page: Int = 1
    $perPage: Int = 100
    $scope: ArchivableStatus
  ) {
    schoolClass(uuid: $uuid) {
      name
      uuid
      students(page: $page, perPage: $perPage, filter: $filter, scope: $scope) {
        nodes {
          archivedAt
          assessmentCompleted
          coursesCompleted
          coursesEnrolled
          firstName
          gradingNeeded
          lastName
          settings {
            assessmentType {
              value
            }
          }
          uuid
        }
        pagesCount
      }
    }
  }
`;

export type TSchoolClassWithStudentsVariables = {
  uuid: string;
  page?: number;
  perPage?: number;
  filter?: { fullNameCont: string };
  scope: ArchivableStatusTypes;
};

export type TSchoolClassStudentSettings = {
  assessmentType: {
    value: AssessmentType;
  };
};

export type TSchoolClassStudent = {
  archivedAt: string;
  assessmentCompleted: number;
  coursesCompleted: number;
  coursesEnrolled: number;
  firstName: string;
  gradingNeeded: boolean;
  lastName: string;
  settings: TSchoolClassStudentSettings;
  uuid: string;
};

export type TSchoolClassStudents = {
  nodes: TSchoolClassStudent[];
  pagesCount: number;
};

export type TSchoolClassWithStudents = {
  name: string;
  uuid: string;
  students: TSchoolClassStudents;
};

export type TSchoolClassWithStudentsData = {
  schoolClass: TSchoolClassWithStudents;
};
