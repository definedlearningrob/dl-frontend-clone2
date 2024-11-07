import { useQuery } from '@apollo/client';

import SystemAdminEntities, {
  SystemAdminData,
  SystemAdminVariables,
} from '@pbl/graphql/user/queries/systemAdminEntity';

const useSystemAdminEntities = () =>
  useQuery<SystemAdminVariables, SystemAdminData>(SystemAdminEntities);

export default useSystemAdminEntities;
