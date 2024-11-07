import { gql } from '@apollo/client';

export default gql`
  query SchoolClassPlans($uuid: ID!) {
    schoolClass(uuid: $uuid) {
      uuid
      entity {
        uuid
        plans {
          id
          name
        }
      }
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

export type TSchoolClass = {
  uuid: string;
  entity: TEntity;
};

export type TSchoolClassPlansData = {
  schoolClass: TSchoolClass;
};

export type TSchoolClassPlansVariables = {
  uuid: string;
};
