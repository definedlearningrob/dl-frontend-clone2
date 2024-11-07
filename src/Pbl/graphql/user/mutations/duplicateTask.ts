import { gql, TypedDocumentNode } from '@apollo/client';

import { TTaskCopies } from '@pbl/graphql/user/queries/taskTemplates';

export const DUPLICATE_TASK: TypedDocumentNode<TDuplicateTaskData, TDuplicateTaskVariables> = gql`
  mutation DuplicateTask($input: DuplicateTaskMutationInput!) {
    duplicateTask(input: $input) {
      task {
        id
        name
        assignedAt
      }
    }
  }
`;

export type TTaskInput = {
  displayName?: string;
  id: string;
  name?: string;
};

export type TDuplicateTaskVariables = {
  input: TTaskInput;
};

export type TDuplicateTaskData = {
  duplicateTask: {
    task: {
      id: string;
      name: string;
      copies?: TTaskCopies[];
      assignedAt: string;
    };
  };
};
