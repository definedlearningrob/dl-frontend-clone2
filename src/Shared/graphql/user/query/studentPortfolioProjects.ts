import { gql } from '@apollo/client';

import { TPortfolioProjectPageInfo, TPortfolioProject } from '@shared/components/Portfolio/types';

export default gql`
  query StudentPortfolioProjects($uuid: ID!, $type: PortfolioKind!, $first: Int, $after: String) {
    student(uuid: $uuid) {
      portfolio {
        projects(type: $type, first: $first, after: $after) {
          totalCount
          edges {
            cursor
            node {
              description
              id
              imageUrl
              name
              parentName
              resourceClass
              teamSubmission
              type
              isTeamSubmission
              submission {
                files {
                  isOwner
                  filename
                  googleWeblink
                  source
                  url
                  submitter {
                    firstName
                    lastName
                    fullName
                    uuid
                  }
                }
                status
              }
              finishedAt
              thumbnailUrl
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
        studentId
      }
      uuid
    }
  }
`;

export type TPortfolioProjectEdge = {
  cursor: string;
  node: TPortfolioProject;
};

export type TPortfolioProjectsData = {
  edges: TPortfolioProjectEdge[];
  pageInfo: TPortfolioProjectPageInfo;
  totalCount: number;
};

export type TStudentPortfolioProjectConnectionData = {
  student: {
    portfolio: {
      totalCount: number;
      projects: TPortfolioProjectsData;
      studentId: string;
    };
    uuid: string;
  };
};

export type TStudentPortfolioProjectVariables = {
  uuid: string;
  type: string;
  first?: number;
};
