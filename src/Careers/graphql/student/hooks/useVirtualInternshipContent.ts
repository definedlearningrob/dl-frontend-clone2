import { useQuery } from '@apollo/client';

import { VIRTUAL_INTERNSHIP_CONTENT_QUERY } from '../queries/virtualInternshipContent';

type Params = {
  opportunityId: string;
  skip?: boolean;
};

export const useVirtualInternshipContent = ({ opportunityId, skip }: Params) =>
  useQuery(VIRTUAL_INTERNSHIP_CONTENT_QUERY, {
    variables: { opportunityId },
    skip,
  });
