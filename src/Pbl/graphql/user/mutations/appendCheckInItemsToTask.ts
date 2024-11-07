import { gql } from '@apollo/client';

import { CHECK_IN_ITEM_TYPES } from '@pbl/resources/enums';
import { TCheckInQuestion } from '@pbl/components/Project/types';

export default gql`
  mutation AppendCheckInItemsToTask($input: AppendCheckInItemsToTaskMutationInput!) {
    appendCheckInItemsToTask(input: $input) {
      task {
        id
        checkInQuestions {
          id
          isArchived
          owner {
            uuid
          }
          question
          step
        }
      }
    }
  }
`;

export type TAppendCheckInItemsToTaskData = {
  appendCheckInItemsToTask: {
    task: TTask;
  };
};

export type TAppendCheckInItemsToTaskVariables = {
  input: {
    checkInItems: TCheckInItem[];
    taskId: string;
  };
};

type TCheckInItem = {
  itemId: string;
  itemType: CHECK_IN_ITEM_TYPES;
};

type TTask = {
  id: string;
  checkInQuestions: TCheckInQuestion[];
};
