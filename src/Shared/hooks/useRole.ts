import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash-es';

import { TRootState } from '@dc/redux/reducers';

export const useRole = () => {
  const { user } = useSelector((state: TRootState) => state.session);
  const isStudent = useMemo(() => user?.type === 'student', [user]);
  const isUser = useMemo(() => user?.type === 'user', [user]);
  const isPublic = useMemo(() => isEmpty(user), [user]);

  return {
    isStudent,
    isUser,
    isPublic,
  };
};
