import { gql } from '@apollo/client';

export default gql`
  query Courses(
    $scope: ArchivableStatus
    $page: Int
    $perPage: Int
    $filter: CourseFilter
    $withCopies: Boolean
  ) {
    courses(
      scope: $scope
      page: $page
      perPage: $perPage
      filter: $filter
      withCopies: $withCopies
    ) {
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
        displayName
        imageUrl
        lessons {
          id
          imageUrl
          name
          step
          type
        }
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

export type TCourse = {
  nodesCount: number;
  pagesCount: number;
  nodes: {
    metadata: {
      alternativeTitles: string[];
      averageSalary: number;
      jobZone: number;
      onetCode: string;
      outlook: string;
    };
    archivedAt: string;
    id: string;
    description: string;
    displayName: string;
    imageUrl: string;
    lessons: {
      id: string;
      imageUrl: string;
      name: string;
      step: number;
      type: string;
    }[];
    name: string;
    pathway: {
      id: string;
      name: string;
    };
    status: string;
    thumbnailUrl: string;
    type: string;
    collection: {
      id: string;
      name: string;
    };
  }[];
};

export type TCoursesData = {
  courses: TCourse;
};

export type TCoursesVariables = {
  scope?: string;
  page?: number;
  perPage?: number;
  withCopies?: boolean;
  filter?: {
    nameCont?: string;
    pathwayId?: string;
    collectionId?: string;
  };
};
