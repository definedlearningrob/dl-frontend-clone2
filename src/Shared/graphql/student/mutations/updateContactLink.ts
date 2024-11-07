import { TypedDocumentNode, gql } from '@apollo/client';

import { ContactLink } from '@shared/resources/types';

export const UPDATE_CONTACT_LINK: TypedDocumentNode<
  TUpdateContactLinkMutationData,
  TUpdateContactLinkMutationInput
> = gql`
  mutation UpdateContactLink($input: UpdateContactLinkMutationInput!) {
    updateContactLink(input: $input) {
      contactLink {
        id
        value
        visible
        type
      }
    }
  }
`;

export type TUpdateContactLinkMutationInput = {
  input: ContactLink;
};

export type TUpdateContactLinkMutationData = {
  updateContactLink: {
    contactLink: ContactLink;
  };
};
