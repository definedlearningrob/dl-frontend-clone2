import { useMutation } from '@apollo/client';

import { SELECT_TEACHER } from '@dc/graphql/student/mutations/selectTeachers';
import { INSTITUTION_APPLICATIONS } from '@dc/graphql/student/queries/institutionApplications';

type Params = {
  userUuids: string[];
  institutionId: number;
};

export const useSelectTeachers = () => {
  const [mutate, { loading, error }] = useMutation(SELECT_TEACHER);

  const selectTeachers = async ({ userUuids, institutionId }: Params) => {
    await mutate({
      variables: { input: { userUuids, institutionId } },
      refetchQueries: [{ query: INSTITUTION_APPLICATIONS }],
    });
  };

  return [selectTeachers, { loading, error }] as const;
};
