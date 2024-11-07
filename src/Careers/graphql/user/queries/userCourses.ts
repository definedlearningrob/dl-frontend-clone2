import { TypedDocumentNode, gql } from '@apollo/client';
import { CourseStatuses, CourseTypes } from '@graphql/dc/users/types';

import { ArchivableStatusTypes, CourseType } from '@dc/resources/enums';

import { ContentStatusesTypes } from '@shared/resources/enums';

export const USER_COURSES_QUERY: TypedDocumentNode<TUserCoursesData, TUserCoursesVariables> = gql`
  query UserCourses($scope: ArchivableStatus, $page: Int, $perPage: Int, $filter: CourseFilter) {
    courses(scope: $scope, page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        metadata {
          alternativeTitles
          averageSalary
          jobZone
          onetCode
          outlook
        }
        archivedAt
        id
        description
        imageUrl
        name
        pathway {
          id
          name
        }
        status
        thumbnailUrl
        type
        collection {
          id
          name
        }
      }
    }
  }
`;

export type TUserCoursesVariables = {
  scope?: ArchivableStatusTypes;
  page?: number;
  perPage?: number;
  filter: {
    searchableColumnsCont?: string;
    collectionIdIn?: string[];
    pathwayIdIn?: string[];
    typeEq?: CourseTypes;
    statusEq?: CourseStatuses;
  };
};

export type TUserCourseMetadata = {
  alternativeTitles: string;
  averageSalary: string;
  jobZone: string;
  onetCode: string;
  outlook: string;
};

export type TUserCoursePathway = {
  id: string;
  name: string;
};

export type TUserCourse = {
  metadata: TUserCourseMetadata;
  archivedAt: string;
  id: string;
  description: string;
  imageUrl: string;
  name: string;
  pathway: TUserCoursePathway;
  status: ContentStatusesTypes;
  thumbnailUrl: string;
  type: CourseType;
  collection: {
    id: string;
    name: string;
  };
};

export type TUserCourses = {
  nodesCount: number;
  pagesCount: number;
  nodes: TUserCourse[];
};

export type TUserCoursesData = {
  courses: TUserCourses;
};
