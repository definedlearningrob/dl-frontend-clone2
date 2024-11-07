import { ApolloCache, InMemoryCache, StoreObject } from '@apollo/client';
import { GraphQLError } from 'graphql';

export const getFormErrors = <T>({ graphQLErrors }: { graphQLErrors: GraphQLError[] }) => {
  const { extensions } = graphQLErrors[0];

  if (extensions) {
    const fieldKeys = Object.keys(extensions);

    return fieldKeys.reduce((acc: typeof extensions, key: keyof typeof extensions) => {
      acc[key] = extensions[key][0];

      return acc;
    }, {}) as T;
  }

  return {} as T;
};

export const removeFromCache =
  (storeObject: StoreObject) => (cache: ApolloCache<InMemoryCache>) => {
    const identity = cache.identify(storeObject);

    cache.evict({ id: identity });
    cache.gc();
  };
