import { gql } from '@apollo/client';

import { TCheckInQuestion } from '@pbl/components/Project/types';
import { CHECK_IN_ITEM_TYPES } from '@pbl/resources/enums';

export default gql`
  mutation UpdateProjectCheckInQuestion($input: UpdateTaskMutationInput!) {
    updateTask(input: $input) {
      project: task {
        checkInQuestions {
          id
          isArchived
          question
          step
          owner {
            uuid
          }
        }
      }
    }
  }
`;

export type TUpdateProjectCheckInQuestionData = {
  updateTask: {
    project: TUpdateProjectCheckInQuestionTask;
  };
};

type TUpdateProjectCheckInQuestionTask = {
  checkInQuestions: TCheckInQuestion[];
};

export type TCheckInItems = {
  itemId: string;
  itemType: CHECK_IN_ITEM_TYPES;
  step: number;
};

export type TUpdateProjectStatusVariables = {
  input: {
    id: string;
    checkInItems: TCheckInItems[];
  };
};
