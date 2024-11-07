import { gql } from '@apollo/client';

import { GRADING_ITEM_TYPES } from '@pbl/resources/enums';

export default gql`
  query schoolClassAssignedToTask(
    $taskId: ID!
    $itemId: ID!
    $itemType: GradingItemTypes!
    $page: Int
    $perPage: Int
  ) {
    schoolClassesAssignedToProject: schoolClassesAssignedToTask(
      taskId: $taskId
      page: $page
      perPage: $perPage
    ) {
      nodes {
        gradingNeeded(filter: { itemId: $itemId, itemType: $itemType, taskId: $taskId })
        name
        uuid
      }
      nodesCount
      pagesCount
    }
  }
`;

export type TSchoolClassesData = {
  schoolClassesAssignedToProject: {
    nodesCount: number;
    pagesCount: number;
    nodes: TAssginedSchoolClass[];
  };
};

export type TSchoolClassesVariables = {
  taskId: string;
  itemId: string;
  itemType: GRADING_ITEM_TYPES;
  page: number;
  perPage: number;
};

export type TAssginedSchoolClass = {
  gradingNeeded: boolean;
  name: string;
  uuid: string;
};
