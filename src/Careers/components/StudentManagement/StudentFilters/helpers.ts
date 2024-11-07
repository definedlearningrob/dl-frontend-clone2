import { EntitiesWithChildrenData } from '@dc/graphql/user/queries/entitiesWithChildrens';

export type SelectOption<T> = { label: string; value: T };

type EntityPage = {
  __typename?: string;
  pagesCount?: number;
  nodesCount?: number;
  nodes: Entity[];
};

type Entity = {
  __typename?: string;
  uuid: string;
  name: string;
  children?: EntityPage;
  level?: number;
};

type EntityWithoutChildren = {
  uuid: string;
  name: string;
  level?: number;
};

export function flatEntities(data: EntitiesWithChildrenData['entities']) {
  let result: EntityWithoutChildren[] = [];

  function traverse(dataToTraverse: Entity[], level: number) {
    dataToTraverse.forEach((node) => {
      let { children, __typename, ...entityWithoutChildren } = node;
      entityWithoutChildren.level = level;
      result.push(entityWithoutChildren);
      if (children && children.nodes.length > 0) {
        traverse(children.nodes, level + 1);
      }
    });
  }

  if (data && data.nodes) {
    traverse(data.nodes, 0);
  }

  return result;
}

export function getGradYearOptions() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(6), (val, index) => currentYear + index);

  return years.map((year) => ({ value: year, label: String(year) }));
}
