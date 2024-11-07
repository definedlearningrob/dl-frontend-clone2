import { useQuery } from '@apollo/client';

import {
  RECENT_APPLICATIONS_QUERY,
  TRecentApplicationsData,
  TRecentApplicationsVariables,
} from '@dc/graphql/user/queries/recentApplications';

type Props = {
  initialActivities?: number;
};

export const useRecentApplicationsQuery = ({ initialActivities = 15 }: Props = {}) =>
  useQuery<TRecentApplicationsData, TRecentApplicationsVariables>(RECENT_APPLICATIONS_QUERY, {
    variables: { first: initialActivities },
  });
