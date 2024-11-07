import { gql } from '@apollo/client';

import { TCheckInGroup, TCheckInQuestion } from '@pbl/components/Project/types';

export default gql`
  query ProjectCheckins($projectId: ID!) {
    project: task(id: $projectId) {
      id
      checkInGroups {
        displayName
        id
        name
        questions {
          id
          question
          step
          owner {
            uuid
          }
        }
        step
      }
      checkInQuestions {
        id
        question
        step
        owner {
          uuid
        }
      }
    }
  }
`;

export type TProjectCheckinsData = {
  project: {
    id: string;
    checkInGroups: TCheckInGroup[];
    checkInQuestions: TCheckInQuestion[];
  };
};

export type TProjectCheckinsVariables = {
  projectId: string;
};
