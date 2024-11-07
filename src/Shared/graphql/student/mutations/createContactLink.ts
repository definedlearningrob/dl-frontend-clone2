import { TypedDocumentNode, gql } from '@apollo/client';

import { ContactLink } from '@shared/resources/types';
import { CONTACT_LINK_TYPES } from '@shared/resources/enums';

export const CREATE_CONTACT_LINK: TypedDocumentNode<
  TCreateContactLinkMutationData,
  TCreateContactLinkMutationInput
> = gql`
  mutation CreateContactLink($input: CreateContactLinkMutationInput!) {
    createContactLink(input: $input) {
      contactLink {
        id
        value
        visible
        type
      }
    }
  }
`;

export type TCreateContactLinkMutationInput = {
  input: {
    type: CONTACT_LINK_TYPES;
    value: string;
    visible: boolean;
  };
};

export type TCreateContactLinkMutationData = {
  createContactLink: {
    contactLink: ContactLink;
  };
};
