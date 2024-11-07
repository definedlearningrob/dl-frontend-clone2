import { gql } from '@apollo/client';

export default gql`
  mutation CreateStudentItem($input: CreateStudentItemMutationInput!) {
    createStudentItem(input: $input) {
      status
    }
  }
`;
