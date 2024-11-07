import { gql, TypedDocumentNode } from '@apollo/client';

export const SELECT_COUNSELOR: TypedDocumentNode<
  TSelectCounselorData,
  TSelectCounselorVariables
> = gql`
  mutation SelectCounselor($input: SelectCounselorMutationInput!) {
    selectCounselor(input: $input) {
      counselor {
        email
        firstName
        lastName
      }
    }
  }
`;

type TCounselor = {
  email: string;
  firstName: string;
  lastName: string;
};

export type TSelectCounselorData = {
  selectCounselor: {
    counselor: TCounselor;
  };
};

export type TSelectCounselorVariables = {
  input: {
    userUuid: string;
  };
};
