import { useApolloClient } from '@apollo/client';

const useClearCacheKey = () => {
  const client = useApolloClient();
  const clearCache = (key: string) =>
    client.cache.modify({
      fields: {
        [key]() {
          return;
        },
      },
    });

  return { clearCache };
};

export default useClearCacheKey;
