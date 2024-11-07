import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const useBlockNavigation = () => {
  const history = useHistory();

  useEffect(() => {
    const unblock = history.block((location, action) => (action === 'PUSH') as unknown as void);

    return () => {
      unblock();
    };
  }, []);
};
