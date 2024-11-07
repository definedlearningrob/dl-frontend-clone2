import { useQuery } from '@apollo/client';

import {
  TAGS_FULL_DATA,
  TTagsFullData,
  TTagsFullDataVariables,
} from '@shared/graphql/user/query/tagsFullData';

export const useTagsFullData = ({
  filter,
  sort,
  page = 1,
  perPage = 20,
  onCompleted,
}: TTagsFullDataVariables & { onCompleted?: (data: TTagsFullData) => void }) =>
  useQuery(TAGS_FULL_DATA, {
    variables: { filter, sort, page, perPage },
    onCompleted,
  });
