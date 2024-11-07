import { gql } from '@apollo/client';

gql`
  query TaskResources($id: ID!) {
    task(id: $id) {
      name
      id
      teachingResources
      studentResources
      files {
        description
        displayName
        filename
        id
        step
        url
      }
      standard
    }
  }
`;

export type TProjectVariables = {
  id: string;
};

export type TProject = {
  name: string;
  files: TFile[];
  id: string;
  standard: string;
  studentResources: string;
  teachingResources: string;
};

export type TFile = {
  description: string;
  displayName: string;
  filename: string;
  id: string;
  step: string;
  url: string;
};
