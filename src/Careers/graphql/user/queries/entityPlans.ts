import { gql } from '@apollo/client';

export default gql`
  query EntityPlans($uuid: ID!) {
    entity(uuid: $uuid) {
      uuid
      plans {
        id
        name
      }
    }
  }
`;

export type TPlan = {
  id: string;
  name: string;
  step: string;
};

export type TEntity = {
  uuid: string;
  plans: TPlan[];
};

export type TEntityPlansData = {
  entity: TEntity;
};

export type TEntityPlansVariables = {
  uuid: string;
};
