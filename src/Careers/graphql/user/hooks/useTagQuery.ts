import { useQuery } from '@apollo/client';

import { TAG } from '@dc/graphql/user/queries/tag';

type Props = {
  skip?: boolean;
  id: string;
};

export const useTagQuery = ({ id, skip }: Props) =>
  useQuery(TAG, {
    skip,
    variables: { id },
    fetchPolicy: 'network-only',
  });
