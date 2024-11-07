import { memo, useEffect } from 'react';

import useUserInfo from '@pbl/hooks/useUserInfo';

function AuthHandler() {
  const { logout, userInfo } = useUserInfo();

  useEffect(() => {
    if (userInfo) {
      logout();
    }
  }, []);

  return null;
}

export default memo(AuthHandler);
