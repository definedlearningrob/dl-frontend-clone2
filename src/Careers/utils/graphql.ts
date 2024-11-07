import { ApolloCache, InMemoryCache } from '@apollo/client';
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
  (id: string, __typename: string) => (cache: ApolloCache<InMemoryCache>) => {
    const identity = cache.identify({ id, __typename });

    cache.evict({ id: identity });
    cache.gc();
  };
