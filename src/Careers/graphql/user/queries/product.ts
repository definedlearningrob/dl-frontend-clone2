import { gql, TypedDocumentNode } from '@apollo/client';

export const PRODUCT_QUERY: TypedDocumentNode<TProductData, TProductVariables> = gql`
  query Product($id: ID!) {
    product(id: $id) {
      badges {
        id
        name
        imageUrl
      }
      archivedAt
      description
      displayName
      id
      name
      rubrics {
        id
        name
        description
      }
      rubricsUrl
      status
    }
  }
`;

type TProductData = {
  product: {
    badges: {
      id: string;
      name: string;
      imageUrl: string;
    }[];
    archivedAt: string;
    description: string;
    displayName: string;
    id: string;
    name: string;
    rubrics: {
      id: string;
      name: string;
      description: string;
    }[];
    rubricsUrl: string;
    status: string;
  };
};

type TProductVariables = {
  id: string;
};
