import { gql } from '@apollo/client';

export default gql`
  query DlStudent($uuid: ID!) {
    student(uuid: $uuid) {
      uuid
      name
    }
  }
`;

export type StudentData = {
  student: {
    uuid: string;
    name: string;
  };
};

export type StudentVariables = {
  uuid: string;
};
