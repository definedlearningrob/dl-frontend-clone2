import { gql } from '@apollo/client';

import { TCheckInGroup } from '@pbl/components/Project/types';
import { CHECK_IN_ITEM_TYPES } from '@pbl/resources/enums';

export default gql`
  mutation UpdateProjectCheckInGroup($input: UpdateTaskMutationInput!) {
    updateTask(input: $input) {
      project: task {
        checkInGroups {
          displayName
          id
          name
          questions {
            id
            isArchived
            owner {
              uuid
            }
            question
            step
          }
          step
        }
      }
    }
  }
`;

export type TUpdateProjectCheckInGroupData = {
  updateTask: {
    project: TUpdateProjectCheckInGroupTask;
  };
};

type TUpdateProjectCheckInGroupTask = {
  checkInGroups: TCheckInGroup[];
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
