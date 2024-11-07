import { useQuery } from '@apollo/client';

import { RECOMMENDATION_REQUEST_QUERY } from '@dc/graphql/user/queries/recommendationRequest';
import {
  CommonAppRequestData,
  RecommendationRequestVariables,
} from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

type Params = {
  studentUuid: string;
};

export const useRecommendationRequestQuery = ({ studentUuid }: Params) =>
  useQuery<CommonAppRequestData, RecommendationRequestVariables>(RECOMMENDATION_REQUEST_QUERY, {
    variables: { studentUuid },
    notifyOnNetworkStatusChange: true,
  });
