import { useQuery } from '@apollo/client';

import ADMIN_ENTITY_INFO_QUERY, {
  TAdminEntityInfoData,
  TAdminEntityInfoVariables,
} from '@dc/graphql/user/queries/adminEntityInfo';

export const useEntityAdminInfo = ({ uuid }: { uuid: string }) =>
  useQuery<TAdminEntityInfoData, TAdminEntityInfoVariables>(ADMIN_ENTITY_INFO_QUERY, {
    variables: { uuid },
  });
