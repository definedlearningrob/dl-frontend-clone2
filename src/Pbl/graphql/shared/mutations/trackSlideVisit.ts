import { gql } from '@apollo/client';

export default gql`
  mutation TrackSlideVisit($input: TrackSlideVisitMutationInput!) {
    trackSlideVisit(input: $input) {
      status
      clientMutationId
    }
  }
`;

export type TrackVisitedSlideMutationData = {
  trackSlideVisit: {
    status: string;
    clientMutationId: string;
  };
};

export type TrackVisitedSlideMutationVariables = {
  input: {
    slideId: string;
    taskId?: string;
  };
};
