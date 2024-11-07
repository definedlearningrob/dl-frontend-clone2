import { gql, TypedDocumentNode } from '@apollo/client';

export const TASK_TEMPLATES: TypedDocumentNode<TTaskTemplatesData> = gql`
  query TaskTemplate {
    taskTemplates {
      id
      copies {
        id
        name
        copies {
          id
          name
          assignedAt
        }
      }
    }
  }
`;

export type TTaskCopies = {
  id: string;
  name: string;
  assignedAt: string;
};

export type TTaskTemplates = {
  id: string;
  copies: TTaskCopies[];
};

export type TTaskTemplatesData = {
  taskTemplates: TTaskTemplates[];
};
