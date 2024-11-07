import { gql } from '@apollo/client';

import { TPortfolioProject } from '@shared/components/Portfolio/types';

export default gql`
  mutation CreatePortfolioProject($input: CreatePortfolioProjectMutationInput!) {
    createPortfolioProject(input: $input) {
      portfolioProject {
        description
        id
        imageUrl
        resourceClass
        name
        parentName
        submission {
          files {
            filename
            googleWeblink
            source
            url
          }
          status
        }
      }
    }
  }
`;

export type TCreatePortfolioProjectMutationInput = {
  name: string;
  description: string;
  imageUuid?: string;
  imageFilename?: string;
};

export type TCreatePortfolioProjectMutationVariables = {
  input: TCreatePortfolioProjectMutationInput;
};

export type TCreatePortfolioProjectData = {
  createPortfolioProject: {
    portfolioProject: Pick<
      TPortfolioProject,
      'description' | 'id' | 'imageUrl' | 'resourceClass' | 'name' | 'parentName' | 'submission'
    >;
  };
};
