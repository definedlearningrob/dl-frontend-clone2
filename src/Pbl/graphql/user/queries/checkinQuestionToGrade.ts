import { gql } from '@apollo/client';

import { SUBMISSION_GRADE_STATUS } from '@shared/resources/enums';

export default gql`
  query CheckinQuestionToGrade(
    $projectId: ID!
    $questionId: ID!
    $subjectUuid: ID!
    $isTeamGrading: Boolean!
  ) {
    project: task(id: $projectId) {
      id
      displayName
      checkInQuestion(id: $questionId) {
        question
        answer(studentUuid: $subjectUuid) @skip(if: $isTeamGrading) {
          id
          answer
          updatedAt
          grade {
            id
            status
            updatedAt
            lastGradedBy {
              firstName
              lastName
            }
          }
        }
        teamSubmission(teamUuid: $subjectUuid) @include(if: $isTeamGrading) {
          id
          grade {
            status
            updatedAt
            lastGradedBy {
              firstName
              lastName
            }
          }
          answers {
            answer
            id
            student {
              uuid
              firstName
              lastName
            }
            updatedAt
          }
        }
      }
    }
  }
`;

export type TCheckinQuestionToGradeData = {
  project: {
    id: string;
    checkInQuestion: TCheckinQuestionToGrade;
    displayName: string;
  };
};

export type TCheckinQuestionToGradeVariables = {
  projectId: string;
  questionId: string;
  subjectUuid: string;
  isTeamGrading?: boolean;
};

export type TCheckinQuestionAnswer = {
  id: string;
  answer: string;
  updatedAt: string;
  grade?: {
    status: SUBMISSION_GRADE_STATUS;
    updatedAt: string;
    lastGradedBy: {
      firstName: string;
      lastName: string;
    };
  };
};

export type TCheckinTeamSubmission = {
  id: string;
  canSubmit: boolean;
  answers: {
    answer: string;
    id: string;
    student: {
      uuid: string;
      firstName: string;
      lastName: string;
    };
    updatedAt: string;
  }[];
  grade: {
    updatedAt: string;
    createdAt: string;
    lastGradedBy: {
      firstName: string;
      lastName: string;
    };
    status: SUBMISSION_GRADE_STATUS;
  };
};

type TCheckinQuestionToGrade = {
  question: string;
  answer?: TCheckinQuestionAnswer;
  teamSubmission?: TCheckinTeamSubmission;
};
