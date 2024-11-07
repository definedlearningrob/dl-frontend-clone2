import { TypedDocumentNode, gql } from '@apollo/client';

export const TOGGLE_CHECK_IN_QUESTION_HIDDEN: TypedDocumentNode<
  TToggleCheckInQuestionHiddenData,
  TToggleCheckInQuestionHiddenMutationInput
> = gql`
  mutation ToggleCheckInQuestionHidden($input: ToggleCheckInQuestionHiddenMutationInput!) {
    toggleCheckInQuestionHidden(input: $input) {
      checkInGroup {
        id
        questions {
          id
          isHidden
        }
      }
    }
  }
`;

type TToggleCheckInQuestionHiddenData = {
  toggleCheckInQuestionHidden: {
    checkInGroup: {
      id: string;
      questions: {
        id: string;
        isHidden: boolean;
      }[];
    };
  };
};

type TToggleCheckInQuestionHiddenMutationInput = {
  input: {
    taskId: string;
    checkInGroupId: string;
    checkInQuestionId: string;
  };
};
