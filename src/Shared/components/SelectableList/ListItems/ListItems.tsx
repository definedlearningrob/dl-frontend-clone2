import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { FC, SVGProps } from 'react';

import ItemsDraggable from '@dc/components/Admin/Lessons/Form/Items/Shared/Draggable/Draggable';

import { ListItem } from '@shared/components/SelectableList/ListItem/ListItem';
import { KickerVariant } from '@shared/components/Kicker';
import { BadgeType } from '@shared/components/Badge/Badge';

type Props<T> = {
  items: T[];
  onDetailsOpen?: (item: T) => void;
  onChange: (item: T) => void;
  isDraggable?: boolean;
  mode: 'add' | 'remove';
  canDrag?: (item: T) => void;
  getKicker?: (item: T) => { variant: KickerVariant; text: string };
  getBadge?: (item: T) => { type: BadgeType; text: string };
  onDragEnd?: (results: DropResult) => void;
  onEditClick?: (item: T) => void;
  ListItemIcon?: FC<SVGProps<SVGSVGElement>>;
  preserveImageAspectRatio?: boolean;
  tooltipMessage?: string;
  getIcon?: (item: T) => FC<SVGProps<SVGSVGElement>>;
};

type Item = {
  id: string;
  name: string;
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  underlineClass?: string;
  isDisabled?: boolean;
  tooltipMessage?: string;
  __typename?: string;
};

export const ListItems = <T extends Item>({
  items,
  onDetailsOpen,
  onChange,
  isDraggable = false,
  mode = 'add',
  tooltipMessage,
  canDrag,
  getKicker,
  onEditClick,
  getIcon,
  getBadge,
  onDragEnd,
  ListItemIcon,
  preserveImageAspectRatio,
}: Props<T>) => {
  const isRemoving = mode === 'remove';
  const listClassname = 'bg-white p-xs overflow-auto scrollbar min-h-0 h-full';
  if (isDraggable && onDragEnd) {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <ul className={listClassname} {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => {
                const itemCanBeDragged = !canDrag || canDrag(item);
                const kicker = getKicker && getKicker(item);
                const badge = getBadge && getBadge(item);
                const conditionalProps = {
                  ...(onEditClick && { onEditClick: () => onEditClick(item) }),
                  ...(onDetailsOpen && { onDetailsClick: () => onDetailsOpen(item) }),
                };

                return (
                  <Draggable
                    key={`${item.__typename}-${item.id}`}
                    draggableId={item.id}
                    index={index}
                    isDragDisabled={!itemCanBeDragged}>
                    {({ draggableProps, dragHandleProps, innerRef }, snapshot) => (
                      <ItemsDraggable
                        key={`${item.id}-${item.name}`}
                        className='rounded-sm hover:bg-neutral-200'
                        disabled={!itemCanBeDragged}
                        innerRef={innerRef}
                        isDragging={snapshot.isDragging}
                        {...draggableProps}
                        {...dragHandleProps}>
                        <ListItem
                          Icon={getIcon ? getIcon(item) : ListItemIcon}
                          asListItem={false}
                          badge={badge}
                          className='!pl-xxxs'
                          imageUrl={item.thumbnailUrl || item.imageUrl}
                          isSelected={isRemoving}
                          kicker={kicker}
                          name={item.name}
                          preserveImageAspectRatio={preserveImageAspectRatio}
                          onChange={() => onChange(item)}
                          {...conditionalProps}
                        />
                      </ItemsDraggable>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  return (
    <ul className={listClassname}>
      {items.map((item) => {
        const kicker = getKicker && getKicker(item);
        const badge = getBadge && getBadge(item);
        const conditionalProps = {
          ...(onEditClick && { onEditClick: () => onEditClick(item) }),
          ...(onDetailsOpen && { onDetailsClick: () => onDetailsOpen(item) }),
        };

        return (
          <ListItem
            key={`${item.id}-${item.name}`}
            Icon={getIcon ? getIcon(item) : ListItemIcon}
            badge={badge}
            className={item.underlineClass}
            imageUrl={item.thumbnailUrl || item.imageUrl}
            isDisabled={item.isDisabled}
            isSelected={isRemoving}
            kicker={kicker}
            name={item.name}
            preserveImageAspectRatio={preserveImageAspectRatio}
            tooltipMessage={item.tooltipMessage || tooltipMessage}
            onChange={() => onChange(item)}
            {...conditionalProps}
          />
        );
      })}
    </ul>
  );
};
