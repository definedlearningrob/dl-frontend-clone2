import { gql } from '@apollo/client';

export default gql`
  query SchoolClassTeam($classUuid: ID!, $teamUuid: ID!) {
    schoolClass(uuid: $classUuid) {
      uuid
      team(uuid: $teamUuid) {
        uuid
        name
        students(page: 1, perPage: 1000) {
          nodes {
            firstName
            lastName
            uuid
          }
        }
      }
    }
  }
`;

export type TSchoolClassTeamData = {
  schoolClass: TSchoolClassTeam;
};

export type TSchoolClassTeamVariables = {
  classUuid: string;
  teamUuid: string;
};

type TSchoolClassTeam = {
  name: string;
  uuid: string;
  team: {
    uuid: string;
    name: string;
    students: {
      nodes: {
        firstName: string;
        lastName: string;
        uuid: string;
      }[];
    };
  };
};
