import { gql, TypedDocumentNode } from '@apollo/client';

export const ARCHIVE_VIRTUAL_INTERNSHIP: TypedDocumentNode<
  TArchiveVirtualInternshipData,
  TArchiveVirtualInternshipVariables
> = gql`
  mutation ArchiveVirtualInternship($input: ArchiveVirtualInternshipMutationInput!) {
    archiveVirtualInternship(input: $input) {
      virtualInternship {
        id
      }
    }
  }
`;

export type TArchiveVirtualInternshipData = {
  archiveVirtualInternship: {
    virtualInternship: {
      id: string;
    };
  };
};

export type TArchiveVirtualInternshipVariables = {
  input: {
    id: string;
  };
};
