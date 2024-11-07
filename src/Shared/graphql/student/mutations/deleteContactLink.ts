import { TypedDocumentNode, gql } from '@apollo/client';

import { ContactLink } from '@shared/resources/types';

export const DELETE_CONTACT_LINK: TypedDocumentNode<
  TDeleteContactLinkMutationData,
  TDeleteContactLinkMutationInput
> = gql`
  mutation DeleteContactLink($input: DeleteContactLinkMutationInput!) {
    deleteContactLink(input: $input) {
      status
    }
  }
`;

export type TDeleteContactLinkMutationInput = {
  input: {
    id: ContactLink['id'];
  };
};

export type TDeleteContactLinkMutationData = {
  deleteContactLink: {
    status: string;
  };
};
