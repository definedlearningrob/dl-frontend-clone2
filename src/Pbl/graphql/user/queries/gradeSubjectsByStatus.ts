import { gql } from '@apollo/client';

import { GRADING_ITEM_TYPES, GRADING_STATUS } from '@pbl/resources/enums';

export default gql`
  query GradeSubjectsByStatus($uuid: ID!, $itemId: ID!, $itemType: GradingItemTypes!, $projectId: ID!) {
    schoolClass(uuid: $uuid) {
      uuid,
      studentsGraded: students(page: 1, perPage: 100, filter: {
        gradingStatus: {
          taskId: $projectId
          itemId: $itemId
          itemType: $itemType
          status: ${GRADING_STATUS.ALREADY_GRADED}
        }
      }) {
        nodes {
          uuid
          name
        }
      }
      studentsToBeGraded: students(page: 1, perPage: 100, filter: {
        gradingStatus: {
          taskId: $projectId
          itemId: $itemId
          itemType: $itemType
          status: ${GRADING_STATUS.WAITING_FOR_GRADING}
        }
      }) {
        nodes {
          uuid
          name
        }
      }
      studentsNotSubmitted: students(page: 1, perPage: 100, filter: {
        gradingStatus: {
          taskId: $projectId
          itemId: $itemId
          itemType: $itemType
          status: ${GRADING_STATUS.NOT_YET_SUBMITTED}
        }
      }) {
        nodes {
          uuid
          name
        }
      },
      teamsGraded: teams(
        filter: {
          gradingStatus: {
            taskId: $projectId
            itemId: $itemId
            itemType: $itemType
            status: ALREADY_GRADED
          }
        }
      ) {
        uuid
        name
      }
      teamsToBeGraded: teams(
        filter: {
          gradingStatus: {
            taskId: $projectId
            itemId: $itemId
            itemType: $itemType
            status: WAITING_FOR_GRADING
          }
        }
      ) {
        uuid
        name
      }
      teamsNotSubmitted: teams(
        filter: {
          gradingStatus: {
            taskId: $projectId
            itemId: $itemId
            itemType: $itemType
            status: NOT_YET_SUBMITTED
          }
        }
      ) {
        uuid
        name
      }
    },
  }

`;

export type TGradeSubjectsData = {
  schoolClass: TSchoolClass;
};

export type TGradeSubjectsVariables = {
  uuid: string;
  itemId: string;
  itemType: GRADING_ITEM_TYPES;
  projectId: string;
};

type TSchoolClass = {
  uuid: string;
  studentsGraded: {
    nodes: TStudent[];
  };
  studentsToBeGraded: {
    nodes: TStudent[];
  };
  studentsNotSubmitted: {
    nodes: TStudent[];
  };
  teamsGraded: TTeam[];
  teamsToBeGraded: TTeam[];
  teamsNotSubmitted: TTeam[];
};

export type TStudent = {
  name: string;
  uuid: string;
  __typename: 'Student';
};

export type TTeam = {
  name: string;
  uuid: string;
  __typename: 'Team';
};
