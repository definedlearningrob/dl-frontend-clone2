import { gql, TypedDocumentNode } from '@apollo/client';

export const GENERATE_FERPA_URL: TypedDocumentNode<
  TGenerateFerpaUrlData,
  TGenerateFerpaUrlMutationInput
> = gql`
  mutation GenerateFerpaUrl($input: GenerateFerpaUrlMutationInput!) {
    generateFerpaUrl(input: $input) {
      url
    }
  }
`;

type TGenerateFerpaUrlData = {
  generateFerpaUrl: {
    url: string;
  };
};

type TGenerateFerpaUrlMutationInput = {
  input: {};
};
