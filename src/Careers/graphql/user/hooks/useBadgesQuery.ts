import { useQuery } from '@apollo/client';

import { BADGES } from '@dc/graphql/user/queries/badges';
import { ArchivableStatusTypes } from '@dc/resources/enums';

type Props = {
  filters: { nameCont?: string };
  scope?: ArchivableStatusTypes;
  page?: number;
  perPage?: number;
};

export const useBadgesQuery = ({
  filters,
  scope = ArchivableStatusTypes.ACTIVE,
  page = 1,
  perPage = 20,
}: Props) =>
  useQuery(BADGES, {
    variables: { scope, filter: filters, page, perPage },
  });
