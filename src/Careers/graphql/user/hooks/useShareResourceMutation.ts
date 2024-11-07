import { useMutation } from '@apollo/client';

import courseQuery from '@dc/graphql/user/queries/course';
import { SHARE_RESOURCE, SHARED_RESOURCE_TYPES } from '@dc/graphql/user/mutations/shareResource';

type Params = {
  allowLogin: boolean;
  courseId: string;
};

export const useShareResourceMutation = () => {
  const [mutate, { error, loading }] = useMutation(SHARE_RESOURCE);

  const shareResource = async ({ allowLogin, courseId }: Params) =>
    await mutate({
      variables: {
        input: {
          resourceId: courseId,
          resourceType: SHARED_RESOURCE_TYPES.COURSE,
          allowLogin,
        },
      },
      refetchQueries: [{ query: courseQuery, variables: { id: courseId } }],
    });

  return [shareResource, { error, loading }] as const;
};
