import { gql } from '@apollo/client';

import ProjectFragmentData, { TProject } from '@pbl/graphql/student/fragments/projectFragment';

export default gql`
  query StudentProject($id: ID!, $track: Boolean, $trackPresentation: Boolean) {
    project: task(id: $id, track: $track) {
      ...ProjectFragmentData
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
};
