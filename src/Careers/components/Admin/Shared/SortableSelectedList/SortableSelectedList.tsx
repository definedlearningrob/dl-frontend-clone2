import { useField } from 'formik';
import { FC, SVGProps } from 'react';
import { isEmpty } from 'lodash-es';
import { DropResult } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

import { assignSteps } from '@dc/utils/assignSteps';

import { ListItems } from '@shared/components/SelectableList/ListItems/ListItems';
import { BadgeType } from '@shared/components/Badge/Badge';
import { KickerVariant } from '@shared/components/Kicker';
import EmptyState from '@shared/components/EmptyState/EmptyState';
import { ErrorMessage } from '@shared/components/ErrorMessage/ErrorMessage';

type Props<T> = {
  field: string;
  items: T[];
  getBadge?: (item: T) => { type: BadgeType; text: string };
  getKicker?: (item: T) => { variant: KickerVariant; text: string };
  getIcon?: (item: T) => FC<SVGProps<SVGSVGElement>>;
  onDetailsOpen?: (item: T) => void;
  onEditClick?: (item: T) => void;
  error?: string;
  ListItemIcon?: FC<SVGProps<SVGSVGElement>>;
  isDraggable?: boolean;
  preserveImageAspectRatio?: boolean;
};

type Item = {
  id: string;
  name: string;
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  __typename?: string;
};

export const SortableSelectedList = <T extends Item>({
  error,
  field,
  items,
  onDetailsOpen,
  onEditClick,
  getIcon,
  getKicker,
  getBadge,
  ListItemIcon,
  isDraggable = true,
  preserveImageAspectRatio,
}: Props<T>) => {
  const [itemsInput, , itemsHelpers] = useField<T[]>(field);
  const { t } = useTranslation();

  const reorder = ({ source, destination }: DropResult) => {
    const result = Array.from(items);
    if (destination) {
      const [removed] = result.splice(source.index, 1);

      result.splice(destination.index, 0, removed);
    }

    return assignSteps(result);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reordered = reorder(result);
    itemsHelpers.setValue(reordered);
  };

  const removeItem = (item: T) => {
    const newItem = itemsInput.value.filter((existingItem) => {
      if (item.__typename) {
        return item.__typename !== existingItem.__typename || existingItem.id !== item.id;
      }

      return existingItem.id !== item.id;
    });

    itemsHelpers.setValue(assignSteps(newItem));
  };

  if (isEmpty(items)) {
    return <EmptyState className='!h-full' heading={t('itemsList.emptyStates.nothingSelected')} />;
  }

  return (
    <>
      <ListItems
        ListItemIcon={ListItemIcon}
        getBadge={getBadge}
        getIcon={getIcon}
        getKicker={getKicker}
        isDraggable={isDraggable}
        items={items}
        mode='remove'
        preserveImageAspectRatio={preserveImageAspectRatio}
        onChange={removeItem}
        onDetailsOpen={onDetailsOpen}
        onDragEnd={onDragEnd}
        onEditClick={onEditClick}
      />
      <ErrorMessage errorMessage={error} />
    </>
  );
};
