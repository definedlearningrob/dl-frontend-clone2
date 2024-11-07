import { omit } from 'lodash-es';

export const omitTypename = <T extends object>(element: T): Omit<T, '__typename'> =>
  omit(element, '__typename');
