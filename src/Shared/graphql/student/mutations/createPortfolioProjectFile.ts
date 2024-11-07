import { gql } from '@apollo/client';

import { SUBMISSION_FILE_SOURCE } from '@shared/resources/enums';

export default gql`
  mutation CreatePortfolioProjectFile($input: CreatePortfolioProjectFileMutationInput!) {
    createPortfolioProjectFile(input: $input) {
      portfolioProjectFile {
        filename
        googleWeblink
        source
        url
      }
    }
  }
`;

export type TCreatePortfolioProjectFileMutationInput = {
  portfolioProjectId: string;
  fileUuid: string;
  fileFilename: string;
};

export type TCreatePortfolioProjectFileData = {
  filename: string;
  googleWeblink: string;
  source: SUBMISSION_FILE_SOURCE;
  url: string;
};
