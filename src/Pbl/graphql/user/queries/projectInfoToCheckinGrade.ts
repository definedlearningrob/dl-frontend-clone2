import { gql } from '@apollo/client';

export default gql`
  query ProjectInfoToCheckinGrade($projectId: ID!, $checkinId: ID!) {
    project: task(id: $projectId) {
      displayName
      id
      checkInQuestion(id: $checkinId) {
        id
        question
      }
    }
  }
`;

export type TProjectInfoCheckinData = {
  project: {
    id: string;
    checkInQuestion: {
      id: string;
      question: string;
    };
    displayName: string;
  };
};

export type TProjectInfoCheckinVariables = {
  projectId: string;
  checkinId: string;
};
