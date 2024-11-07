import { gql } from '@apollo/client';

export default gql`
  query Contracts($page: Int, $perPage: Int, $filter: ContractFilter) {
    contracts(page: $page, perPage: $perPage, filter: $filter) {
      nodesCount
      nodes {
        definedLearningUuid
        endDate
        entities {
          uuid
          name
        }
        id
        name
        startDate
        syncable
        uuid
      }
      pagesCount
    }
  }
`;

export type TContractData = {
  contracts: {
    nodesCount: number;
    nodes: TContract[];
    pagesCount: number;
  };
};

export type TContractVariables = {
  page?: number;
  perPage?: number;
  filter?: TContractFilter;
};

type TContractFilter = {
  nameCont: string;
  serviceNameCont: string;
};

export type TContractEntity = {
  uuid: string;
  name: string;
};

export type TContract = {
  definedLearningUuid: string;
  endDate: string;
  id: string;
  name: string;
  entities: TContractEntity[];
  startDate: string;
  syncable: boolean;
  uuid: string;
};
