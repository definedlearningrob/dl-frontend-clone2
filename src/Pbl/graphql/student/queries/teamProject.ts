import { gql } from '@apollo/client';

import ProjectFragmentData, { TProject } from '@pbl/graphql/student/fragments/projectFragment';

export default gql`
  query TeamProject($id: ID!, $track: Boolean, $trackPresentation: Boolean, $teamId: ID) {
    project: task(id: $id, track: $track, teamId: $teamId) {
      ...ProjectFragmentData
      team {
        id
        name
        uuid
      }
    }
  }
  ${ProjectFragmentData}
`;

export type TProjectData = {
  project: TProject;
};

export type TProjectVariables = {
  id: string;
  track?: boolean;
  trackPresentation?: boolean;
  teamId: string;
};
