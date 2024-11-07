import { MutationFunctionOptions, useMutation } from '@apollo/client';

import TRACK_SLIDE_VISITED, {
  TrackVisitedSlideMutationData,
  TrackVisitedSlideMutationVariables,
} from '@pbl/graphql/shared/mutations/trackSlideVisit';

const useTrackSlideVisitedMutation = () =>
  useMutation<TrackVisitedSlideMutationData, TrackVisitedSlideMutationVariables>(
    TRACK_SLIDE_VISITED
  );

export type SendTrackSlideFnOptions = MutationFunctionOptions<
  TrackVisitedSlideMutationData,
  TrackVisitedSlideMutationVariables
>;

export default useTrackSlideVisitedMutation;
