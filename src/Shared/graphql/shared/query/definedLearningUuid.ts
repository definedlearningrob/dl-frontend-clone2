import { gql } from '@apollo/client';

gql`
  query DefinedLearningUuid {
    userInfo {
      definedLearningUuid
      uuid
    }
  }
`;
