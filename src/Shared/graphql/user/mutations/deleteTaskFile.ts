import { gql, TypedDocumentNode } from '@apollo/client';

export const DELETE_TASK_FILE: TypedDocumentNode<DeleteTaskFileData, DeleteTaskFileVariables> = gql`
  mutation DeleteTaskFile($input: DeleteTaskFileMutationInput!) {
    deleteTaskFile(input: $input) {
      status
    }
  }
`;

type DeleteTaskFileVariables = {
  input: {
    id: string;
  };
};

type DeleteTaskFileData = {
  deleteTaskFile: {
    status: string;
  };
};
