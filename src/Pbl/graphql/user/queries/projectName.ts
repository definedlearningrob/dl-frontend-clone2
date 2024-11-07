import { gql } from '@apollo/client';

export default gql`
  query ProjectName($id: ID!, $track: Boolean) {
    project: task(id: $id, track: $track) {
      id
      displayName
    }
  }
`;

export type TProjectNameData = {
  project: TProject;
};

export type TProjectNameVariables = {
  id: string;
  track?: boolean;
};

export type TProject = {
  displayName: string;
  id: string;
};
