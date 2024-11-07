import { useQuery } from '@apollo/client';

import { RECOMMENDATION_REQUESTS_QUERY } from '@dc/graphql/user/queries/recommendationRequests';
import {
  CommonAppRequestsData,
  CommonAppVariables,
} from '@dc/screens/UserApp/CommonApp/CommonAppRequests/types';

type Params = {
  perPage?: number;
};

type Variables = CommonAppVariables & {
  infiniteScroll?: boolean;
};

export const useRecommendationRequestsQuery = ({ perPage = 20 }: Params = {}) =>
  useQuery<CommonAppRequestsData, Variables>(RECOMMENDATION_REQUESTS_QUERY, {
    variables: { page: 1, perPage },
    notifyOnNetworkStatusChange: true,
  });
