import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';

import { TRootState } from '@dc/redux/reducers';

import { USER_ROLE } from '@shared/graphql/user/query/userRole';
import { Roles } from '@shared/resources/enums';

export const useUserRole = () => {
  const { user } = useSelector((state: TRootState) => state.session);
  const isUser = user?.type === 'user';

  const { data } = useQuery(USER_ROLE, { skip: !isUser });

  if (!data || !isUser) {
    return {
      isSystemAdmin: false,
      isTeacher: false,
      isSalesAdmin: false,
      isEntityAdmin: false,
      isUser: false,
    };
  }

  const isSalesAdmin = data.userInfo.role === Roles.SALES_ADMIN;
  const isEntityAdmin = data.userInfo.role === Roles.ENTITY_ADMIN;
  const isSystemAdmin = data.userInfo.role === Roles.SYSTEM_ADMIN;
  const isTeacher = data.userInfo.role === Roles.TEACHER;

  return { isSystemAdmin, isTeacher, isSalesAdmin, isEntityAdmin, isUser };
};
