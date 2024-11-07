import { gql } from '@apollo/client';

export default gql`
  query CheckinGroups($page: Int, $perPage: Int, $filter: CheckInGroupFilter) {
    checkInGroups(page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      pagesCount
      nodes {
        archivedAt
        displayName
        id
        name
        questions {
          id
          question
          step
        }
      }
    }
  }
`;

export type TCheckInGroupsData = {
  checkInGroups: {
    nodes: TCheckInGroup[];
  };
};

export type TCheckInGroupsVariables = {
  page?: number;
  perPage?: number;
  filter?: TCheckInGroupsFilter;
};

type TCheckInGroupsFilter = {
  nameCont: string;
  displayNameCont: string;
};

export type TCheckInGroup = {
  archivedAt: string;
  displayName: string;
  id: string;
  name: string;
  questions: TCheckInQuestion[];
};

export type TCheckInQuestion = {
  id: string;
  question: string;
  step: number;
};
