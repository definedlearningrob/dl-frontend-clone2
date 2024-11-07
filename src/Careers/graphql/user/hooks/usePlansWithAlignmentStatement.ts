import { useQuery } from '@apollo/client';

import {
  PLANS_WITH_ALIGNMENT_STATEMENTS,
  TPlansData,
  TPlansVariables,
} from '@dc/graphql/user/queries/plansWithAlignmentStatement';

type Options = {
  rubricHeadingId: string;
  page?: number;
  perPage?: number;
};

export const usePlansWithAlignmentStatement = ({
  rubricHeadingId,
  perPage = 100,
  page = 1,
}: Options) =>
  useQuery<TPlansData, TPlansVariables>(PLANS_WITH_ALIGNMENT_STATEMENTS, {
    variables: { page, perPage, rubricHeadingId },
    skip: !rubricHeadingId,
  });
