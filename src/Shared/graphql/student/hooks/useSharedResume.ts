import { useQuery } from '@apollo/client';

import {
  SHARED_RESUME,
  TSharedResumeData,
  TSharedResumeVariables,
} from '@shared/graphql/student/query/portfolioShareResume';
import { PUBLIC_SHARED_RESUME } from '@shared/graphql/shared/query/publicPortfolioSharedCode';

export const useSharedResume = (shareCode: string, isPublic: boolean) => {
  const { data, loading, error } = useQuery<TSharedResumeData, TSharedResumeVariables>(
    isPublic ? PUBLIC_SHARED_RESUME : SHARED_RESUME,
    {
      variables: { shareCode },
      fetchPolicy: 'network-only',
    }
  );

  return { data, loading, error };
};
