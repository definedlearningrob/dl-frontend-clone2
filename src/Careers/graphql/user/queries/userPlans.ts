import { gql } from '@apollo/client';

export default gql`
  query UserPlans($uuid: ID!) {
    user(uuid: $uuid) {
      entities {
        nodes {
          plans {
            id
            name
          }
          uuid
        }
      }
      uuid
    }
  }
`;

export type TPlan = {
  id: string;
  name: string;
};

export type TEntity = {
  uuid: string;
  plans: TPlan[];
};

export type TUser = {
  uuid: string;
  entities: {
    nodes: TEntity;
  };
};

export type TUserPlansData = {
  user: TUser;
};

export type TUserPlansVariables = {
  uuid: string;
};
