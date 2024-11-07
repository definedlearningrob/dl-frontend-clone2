import { useQuery } from '@apollo/client';

import {
  INSTITUTION_PROGRAMS_QUERY,
  TInstitutionProgramsVariables,
  TInstitutionProgramsData,
} from '../queries/institutionPrograms';

export const PROGRAMS_PER_PAGE = 25;

type Args = TInstitutionProgramsVariables & {
  onCompleted?: (data: TInstitutionProgramsData) => void;
};

export const useInstitutionPrograms = ({ id, onCompleted }: Args) =>
  useQuery(INSTITUTION_PROGRAMS_QUERY, {
    variables: { id, page: 1, perPage: PROGRAMS_PER_PAGE },
    notifyOnNetworkStatusChange: true,
    onCompleted,
  });
