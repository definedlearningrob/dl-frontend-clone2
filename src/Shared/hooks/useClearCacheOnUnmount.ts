import { useApolloClient } from '@apollo/client';
import { useEffect } from 'react';

const useClearCacheOnUnmount = (key: string) => {
  const client = useApolloClient();

  const clearCache = () =>
    client.cache.modify({
      fields: {
        [key]() {
          return;
        },
      },
    });

  useEffect(
    () => () => {
      clearCache();
    },
    []
  );
};

export default useClearCacheOnUnmount;
