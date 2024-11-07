import { gql, TypedDocumentNode } from '@apollo/client';

export const CREATE_TASK_FILE: TypedDocumentNode<
  TCreateTaskFileData,
  TCreateTaskFileMutationInput
> = gql`
  mutation CreateTaskFile($input: CreateTaskFileMutationInput!) {
    createTaskFile(input: $input) {
      taskFile {
        id
        filename
        url
        step
      }
    }
  }
`;

type TCreateTaskFileData = {
  createTaskFile: {
    taskFile: {
      id: string;
      url: string;
      step: string;
      filename: string;
    };
  };
};

type TCreateTaskFileMutationInput = {
  input: {
    fileFilename: string;
    fileUuid: string;
    taskId: string;
  };
};
