import { gql } from '@apollo/client';

export const PLAN_FRAGMENT = gql`
  fragment Plan on Plan {
    id
    groups {
      id
      statements {
        id
        isLocked
      }
    }
  }
`;

export type TStatement = {
  id: string;
  isLocked: boolean;
};

export type TGroup = {
  id: string;
  statements: TStatement[];
};

export type TPlan = {
  groups: TGroup[];
};
