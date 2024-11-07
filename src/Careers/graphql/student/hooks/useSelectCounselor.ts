import { useMutation } from '@apollo/client';

import { SELECT_COUNSELOR } from '@dc/graphql/student/mutations/selectCounselor';

type Params = {
  userUuid: string;
};

export const useSelectCounselor = () => {
  const [mutate, { loading, error }] = useMutation(SELECT_COUNSELOR);

  const selectCounselor = async ({ userUuid }: Params) => {
    await mutate({
      variables: {
        input: {
          userUuid,
        },
      },
    });
  };

  return [selectCounselor, { loading, error }] as const;
};
