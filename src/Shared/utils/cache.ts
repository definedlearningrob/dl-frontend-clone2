import { FieldFunctionOptions, StoreObject } from '@apollo/client';

type TPaginationData = {
  nodes: StoreObject[];
  nodesCount: number;
  pagesCount: number;
};

type TCacheObject = {
  data: TPaginationData;
  variables: Record<string, any>;
};

const getCachedByVariables = (cache: TCacheObject[], variables?: Record<string, any>) => {
  const cachedDataByVariables = cache?.find(({ variables: existingVariables }) => {
    const cachedVariablesKeys = Object.keys(existingVariables);

    return cachedVariablesKeys.every(
      (key) => variables && existingVariables[key] === variables[key]
    );
  });

  return cachedDataByVariables;
};

const removeCachedByVariables = (cache: TCacheObject[], variables?: Record<string, any>) => {
  const cachedDataByVariables = cache?.filter(({ variables: existingVariables }) => {
    const cachedVariablesKeys = Object.keys(existingVariables);

    return !cachedVariablesKeys.every(
      (key) => variables && existingVariables[key] === variables[key]
    );
  });

  return cachedDataByVariables;
};

export const dualPagination = () => ({
  merge(
    existing: TCacheObject[] = [],
    incoming: TPaginationData,
    { variables }: FieldFunctionOptions
  ) {
    if (variables?.infiniteScroll) {
      const isNewPageData = !existing.find(
        ({ variables: existingVariables }) => existingVariables.page === variables.page
      );

      // If the incoming data is from a new page, then we want to merge it with the existing data
      if (isNewPageData) {
        return [
          ...existing,
          {
            variables,
            data: incoming,
          },
        ];
      }

      /* If the incoming data is from an existing page but with a different set of variables,
        then we want to replae the existing data with the incoming data */
      return [
        {
          variables,
          data: incoming,
        },
      ];
    }

    const withoutIncoming = removeCachedByVariables(existing, variables);

    return [
      ...withoutIncoming,
      {
        variables,
        data: incoming,
      },
    ];
  },
  read(existing: TCacheObject[] = [], { variables }: FieldFunctionOptions) {
    const cachedDataByVariables = getCachedByVariables(existing, variables);

    if (variables?.infiniteScroll) {
      return existing.reduce(
        (acc, element) => ({
          ...element.data,
          nodes: [...acc.nodes, ...element.data.nodes],
        }),
        { nodes: [] } as { nodes: object[] }
      );
    }

    return cachedDataByVariables ? cachedDataByVariables.data : undefined;
  },
});
