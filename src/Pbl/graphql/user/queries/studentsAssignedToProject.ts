import { gql } from '@apollo/client';

import { GRADING_STATUS } from '@pbl/resources/enums';

const STUDENTS_DATA = `
    edges {
      cursor,
      node {
        uuid,
        name
      }
    },
    pageInfo {
      endCursor,
      hasNextPage,
    },
`;

export default gql(`
  query StudentsAssignedToProject($after: String, $before: String, $first: Int, $last: Int, $projectId: ID!, $itemType: GradingItemTypes!, $itemId: ID!) {
    studentsToBeGraded: studentsAssignedToTask(
      after: $after,
      before: $before,
      first: $first,
      last: $last,
      filter: {
        gradingStatus: {
          taskId: $projectId
          itemId: $itemId
          itemType: $itemType
          status: ${GRADING_STATUS.WAITING_FOR_GRADING}
        }
      },
      taskId: $projectId,
      excludeSchoolClassStudents: true
    ) {
      ${STUDENTS_DATA}
    }
  studentsGraded: studentsAssignedToTask(
      after: $after,
      before: $before,
      first: $first,
      last: $last,
      filter: {
        gradingStatus: {
          taskId: $projectId
          itemId: $itemId
          itemType: $itemType
          status: ${GRADING_STATUS.ALREADY_GRADED}
        }
      },
      taskId: $projectId,
      excludeSchoolClassStudents: true
    ) {
      ${STUDENTS_DATA}
    }
  studentsNotSubmitted: studentsAssignedToTask(
      after: $after,
      before: $before,
      first: $first,
      last: $last,
      filter: {
        gradingStatus: {
          taskId: $projectId
          itemId: $itemId
          itemType: $itemType
          status: ${GRADING_STATUS.NOT_YET_SUBMITTED}
        }
      },
      taskId: $projectId,
      excludeSchoolClassStudents: true
    ) {
      ${STUDENTS_DATA}
    }
  }
`);

export type TStudentsAssignedToProjectData = {
  studentsToBeGraded: TStudentsData;
  studentsGraded: TStudentsData;
  studentsNotSubmitted: TStudentsData;
};

export type TStudentsAssignedToProjectVariables = {
  after?: string;
  before?: string;
  first?: number;
  last?: number;
  projectId: string;
  itemId: string;
  itemType: string;
  filter?: StudentFilter;
  excludeSchoolClassStudents?: boolean;
};

type TStudentsData = {
  edges: {
    cursor: string;
    node: TStudent;
  }[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
  };
};

type TStudent = {
  isAssignedToTask: boolean;
  name: string;
  uuid: string;
};

type StudentFilter = {
  fullNameCont?: string;
  gradingStatus?: {
    itemId: string;
    status: GRADING_STATUS;
  };
};
