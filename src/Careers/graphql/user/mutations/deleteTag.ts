import { gql, TypedDocumentNode } from '@apollo/client';

export const DELETE_TAG: TypedDocumentNode<TDeleteTagData, TDeleteTagVariables> = gql`
  mutation DeleteTag($input: DeleteTagMutationInput!) {
    deleteTag(input: $input) {
      status
    }
  }
`;

export type TDeleteTagData = {
  deleteTag: {
    status: string;
  };
};

export type TDeleteTagVariables = {
  input: {
    id: string;
  };
};
