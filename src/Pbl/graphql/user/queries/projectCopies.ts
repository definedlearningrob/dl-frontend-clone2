import { gql } from '@apollo/client';

export default gql`
  query ProjectCopies($id: ID!) {
    project: task(id: $id) {
      copies {
        id
        copies {
          id
          copies {
            id
            displayName
          }
          displayName
        }
        displayName
      }
      id
    }
  }
`;

export type TProjectCopesData = {
  project: TProject;
};

export type TProjectCopiesVariables = {
  id: string;
};

export type TProject = {
  copies: TProjectCopy[];
  id: string;
};

type TProjectCopy = {
  id: string;
  copies: {
    id: string;
    copies: {
      id: string;
      displayName: string;
    }[];
    displayName: string;
  }[];
  displayName: string;
};
