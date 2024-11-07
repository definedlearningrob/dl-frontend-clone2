import { useField } from 'formik';
import { FC, SVGProps } from 'react';
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { assignSteps } from '@dc/utils/assignSteps';

import { ListItems } from '@shared/components/SelectableList/ListItems/ListItems';
import { BadgeType } from '@shared/components/Badge/Badge';
import { KickerVariant } from '@shared/components/Kicker';
import EmptyState from '@shared/components/EmptyState/EmptyState';

import '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList.sass';
import '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableListSpinner.sass';

type Props<T> = {
  field: string;
  items: T[];
  getBadge?: (item: T) => { type: BadgeType; text: string };
  getKicker?: (item: T) => { variant: KickerVariant; text: string };
  onDetailsOpen?: (item: T) => void;
  onEditClick?: (item: T) => void;
  narrowedTypename?: string;
  ListItemIcon?: FC<SVGProps<SVGSVGElement>>;
  preserveImageAspectRatio?: boolean;
};

type Item = {
  id: string;
  name: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  __typename?: string;
};

export const SortableAvailableList = <T extends Item>({
  field,
  items,
  narrowedTypename,
  onDetailsOpen,
  onEditClick,
  getBadge,
  getKicker,
  ListItemIcon,
  preserveImageAspectRatio,
}: Props<T>) => {
  const [itemsInput, , itemsHelpers] = useField<T[]>(field);
  const { t } = useTranslation();

  const addedItemIds = itemsInput?.value?.map((input) => {
    if (narrowedTypename && input.__typename !== narrowedTypename) {
      return null;
    }

    return input.id;
  });

  const filteredItems = items.filter((item) => !addedItemIds?.includes(item.id));

  const addItem = (item: T) => {
    const { value } = itemsInput;

    itemsHelpers.setValue(assignSteps([...value, item]));
  };

  if (isEmpty(items)) {
    return (
      <EmptyState
        className='!h-full'
        heading={t('itemsList.emptyStates.noItemsMatchingCriteria')}
      />
    );
  }

  if (isEmpty(filteredItems)) {
    return (
      <EmptyState className='!h-full' heading={t('itemsList.emptyStates.noMoreItems')}>
        <p>{t('itemsList.emptyStates.allItemsSelected')}</p>
      </EmptyState>
    );
  }

  return (
    <ListItems
      ListItemIcon={ListItemIcon}
      getBadge={getBadge}
      getKicker={getKicker}
      isDraggable={false}
      items={filteredItems}
      mode='add'
      preserveImageAspectRatio={preserveImageAspectRatio}
      onChange={addItem}
      onDetailsOpen={onDetailsOpen}
      onEditClick={onEditClick}
    />
  );
};
