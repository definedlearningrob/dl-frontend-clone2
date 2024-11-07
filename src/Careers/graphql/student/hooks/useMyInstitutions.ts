import { useQuery } from '@apollo/client';

import { MY_INSTITUTIONS_QUERY } from '@dc/graphql/student/queries/myInstitutions';

export const useMyInstitutions = () => useQuery(MY_INSTITUTIONS_QUERY);
