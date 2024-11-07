import { flatMapDeep } from 'lodash-es';

import { TreeSelectOption } from './TreeSelectListItem';

export const flattenOptions = (options: TreeSelectOption[]): TreeSelectOption[] =>
  flatMapDeep(options, (option) => [{ ...option, children: [] }, flattenOptions(option.children)]);
