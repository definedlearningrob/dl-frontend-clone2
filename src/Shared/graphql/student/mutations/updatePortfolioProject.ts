import { gql } from '@apollo/client';

import { TPortfolioProject } from '@shared/components/Portfolio/types';

export default gql`
  mutation UpdatePortfolioProject($input: UpdatePortfolioProjectMutationInput!) {
    updatePortfolioProject(input: $input) {
      portfolioProject {
        description
        id
        imageUrl
        name
        resourceClass
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

export type TUpdatePortfolioProjectMutationInput = {
  id: string;
  name: string;
  description: string;
  imageUuid?: string | null;
  imageFilename?: string | null;
};

export type TUpdatePortfolioProjectData = {
  updatePortfolioProject: {
    portfolioProject: TPortfolioProject;
  };
};
