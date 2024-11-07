import { gql } from '@apollo/client';

import { TPortfolioProjectPageInfo, TPortfolioProject } from '@shared/components/Portfolio/types';

export default gql`
  query PortfolioProjects($type: PortfolioKind!, $first: Int, $after: String) {
    portfolio {
      projects(type: $type, first: $first, after: $after) {
        edges {
          cursor
          node {
            description
            id
            name
            imageUrl
            parentName
            isTeamSubmission
            resourceClass
            submission {
              files {
                isOwner
                id
                filename
                googleWeblink
                source
                url
                createdAt
                submitter {
                  firstName
                  lastName
                  uuid
                }
              }
              status
            }
            finishedAt
            type
            thumbnailUrl
          }
        }
        totalCount
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
      studentId
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

export type TPortfolioProjectConnectionData = {
  portfolio: {
    projects: TPortfolioProjectsData;
    studentId: string;
  };
};

export type TPortfolioProjectVariables = {
  type: string;
  first?: number;
};
