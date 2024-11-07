import { TypedDocumentNode, gql } from '@apollo/client';

import { TUser } from '@dc/graphql/user/queries/user';

export const COUNSELORS: TypedDocumentNode<TCounselorsData, TCounselorsVariables> = gql`
  query Counselors($page: Int, $perPage: Int, $filter: UserFilter) {
    counselors(page: $page, perPage: $perPage, filter: $filter) {
      pagesCount
      nodesCount
      nodes {
        uuid
        firstName
        lastName
        fullName
        uuid
      }
    }
  }
`;

type TCounselor = Pick<TUser, 'uuid' | 'firstName' | 'lastName' | 'fullName'> & {};

export type TCounselorsData = {
  counselors: {
    pagesCount: number;
    nodesCount: number;
    nodes: TCounselor[];
  };
};

type TCounselorsVariables = {
  perPage?: number;
  page?: number;
};
