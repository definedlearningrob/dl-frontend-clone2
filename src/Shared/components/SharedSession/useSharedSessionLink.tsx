import { useCreateSharedSessionTokenMutation } from '@shared/graphql/shared/hooks/useCreateSharedSessionTokenMutation';

import {
  AvailableSharedSessionResources,
  createDCSessionUrl,
  createDLSessionUrl,
} from './SharedSession';

type Options = {
  type: 'DL' | 'DC';
  resource?: AvailableSharedSessionResources;
  resourceId?: string;
};

export const useSharedSessionLink = ({ type, resource, resourceId }: Options) => {
  const [getToken, { loading }] = useCreateSharedSessionTokenMutation();

  const goToProduct = async (res?: AvailableSharedSessionResources, resId?: string) => {
    const { data } = await getToken();
    const token = data?.createSharedSessionToken?.token;

    if (!token) return;

    const isDc = type === 'DC';
    const correctFn = isDc ? createDCSessionUrl : createDLSessionUrl;

    const link = correctFn(token, res || resource, resId || resourceId);
    window.open(link, '_blank');
  };

  return [goToProduct, { loading }] as const;
};
