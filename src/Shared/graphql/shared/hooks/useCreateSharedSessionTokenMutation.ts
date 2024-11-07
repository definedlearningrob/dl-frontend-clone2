import { useMutation } from '@apollo/client';

import CREATE_SHARED_SESSION_TOKEN, {
  TCreateSharedSessionToken,
} from '../mutations/createSharedSessionToken';

export const useCreateSharedSessionTokenMutation = () => {
  const [mutate, { loading }] = useMutation<TCreateSharedSessionToken>(
    CREATE_SHARED_SESSION_TOKEN,
    { variables: { input: {} } }
  );

  return [mutate, { loading }] as const;
};
