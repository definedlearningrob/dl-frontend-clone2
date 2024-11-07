import { useQuery } from '@apollo/client';

import SubjectsQuery, {
  StandardSetSubjectsData,
  StandardSetSubjectsVariables,
} from '@pbl/graphql/user/queries/standardSetSubjects';

const useStandardSetSubjects = (setId: string) =>
  useQuery<StandardSetSubjectsData, StandardSetSubjectsVariables>(SubjectsQuery, {
    variables: { setId },
  });

export default useStandardSetSubjects;
