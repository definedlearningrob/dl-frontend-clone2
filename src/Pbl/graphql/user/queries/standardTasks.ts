import { gql } from '@apollo/client';

export default gql`
  query StandardTasks($standardGuid: String!) {
    standardTasks(standardGuid: $standardGuid) {
      id
      displayName
      description
      imageUrl
      thumbnailUrl
    }
  }
`;

export type TStandardTask = {
  id: string;
  displayName: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
};

export type StandardTasksData = {
  standardTasks: TStandardTask[];
};

export type StandardTasksVariables = {
  standardGuid: string;
};
