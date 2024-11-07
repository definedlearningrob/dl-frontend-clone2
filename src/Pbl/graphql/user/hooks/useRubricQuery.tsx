import { useQuery } from '@apollo/client';

import GET_RUBRIC, { TRubricData, TRubricVariables } from '../queries/rubric';

export const useRubricQuery = (id: string) => {
  const response = useQuery<TRubricData, TRubricVariables>(GET_RUBRIC, {
    variables: {
      id,
    },
    fetchPolicy: 'cache-first',
  });

  return response;
};
