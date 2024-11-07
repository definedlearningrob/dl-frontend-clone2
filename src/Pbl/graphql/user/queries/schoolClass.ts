import { gql } from '@apollo/client';

import Students, { TStudents } from '../fragments/schoolClassStudents';
import Team, { TTeam } from '../fragments/team';

export default gql`
  query DlSchoolClass($uuid: ID!) {
    schoolClass(uuid: $uuid) {
      isDemo
      name
      uuid
      ...Students
      teams {
        ...Team
      }
    }
  }
  ${Students}
  ${Team}
`;

export type TSchoolClassData = {
  schoolClass: TSchoolClass;
};

export type TSchoolClassVariables = {
  uuid: string;
};

type TSchoolClass = {
  isDemo: boolean;
  name: string;
  uuid: string;
  students: TStudents;
  teams: TTeam[];
};
