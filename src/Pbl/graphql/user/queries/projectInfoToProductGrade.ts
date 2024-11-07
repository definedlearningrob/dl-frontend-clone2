import { gql } from '@apollo/client';

export default gql`
  query ProjectInfoToProductGrade($projectId: ID!, $productId: ID!) {
    project: task(id: $projectId) {
      displayName
      id
      product(id: $productId) {
        id
        displayName
      }
    }
  }
`;

export type TProjectInfoProductData = {
  project: {
    id: string;
    displayName: string;
    product: {
      id: string;
      displayName: string;
    };
  };
};

export type TProjectInfoProductVariables = {
  projectId: string;
  productId: string;
};
