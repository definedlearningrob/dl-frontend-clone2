import { useMemo } from 'react';

import { TagTypes } from '@dc/resources/enums';
import { TTag } from '@dc/graphql/user/queries/tag';

type TransformedTag = {
  value: TagTypes | string | undefined;
  label: string;
};

const tagsMap: { [key: string]: TagTypes | string } = {
  SYSTEM: TagTypes.SYSTEM,
  ENTITY: TagTypes.ENTITY,
  ALL: 'ALL',
};

export const useTransformedTags = (tagsData: TTag[] | undefined) =>
  useMemo(() => {
    if (!tagsData) {
      return [];
    }
    const tagsArray = tagsData.map((tag) => ({ value: tagsMap[tag.type], label: tag.type }));

    return tagsArray.reduce(
      (acc: TransformedTag[], curr) => {
        if (!acc.find((tag) => tag.label === curr.label)) {
          acc.push(curr);
        }

        return acc;
      },
      [{ value: undefined, label: tagsMap.ALL }]
    );
  }, [tagsData]);
