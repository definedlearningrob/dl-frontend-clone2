import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'lodash-es';

import { ReactComponent as DragHandle } from '@dc/svg/temp/drag_handle.svg';
import { ReactComponent as RemoveIcon } from '@dc/svg/remove.svg';
import { assignSteps } from '@dc/utils/assignSteps';

import { ReactComponent as AddIcon } from '@shared/svg/add.svg';
import { ReactComponent as UserIcon } from '@shared/svg/user_outlined.svg';
import { ReactComponent as Search } from '@shared/svg/search.svg';
import SharedIcon from '@shared/components/Icon/Icon';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import './SortableListItem.sass';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Badge } from '@shared/components/Badge/Badge';

AdminSharedSortableListItem.propTypes = {
  draggable: PropTypes.bool,
  field: PropTypes.string,
  item: PropTypes.shape({
    __typename: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    owner: PropTypes.shape({
      name: PropTypes.string,
    }),
    status: PropTypes.string,
  }),
  onDetailsOpen: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  typenamesWithDetails: PropTypes.array,
  withBadge: PropTypes.bool,
};

function AdminSharedSortableListItem({
  draggable,
  field,
  item,
  onDetailsOpen,
  typenamesWithDetails,
  withBadge,
}) {
  const { t } = useTranslation();
  const [itemsInput, , itemsHelpers] = useField(field);
  const isItemSelected = itemsInput?.value?.find((input) => {
    if (input.__typename) {
      return input.__typename === item.__typename ? input.id === item.id : false;
    }

    return input.id === item.id;
  });

  const addItem = (item) => () => {
    const { value } = itemsInput;
    const lastItem = value[value?.length - 1];
    const step = lastItem ? lastItem.step + 1 : 1;

    itemsHelpers.setValue(assignSteps([...value, { ...item, step }]));
  };

  const removeItem = (item) => () => {
    const newTasks = itemsInput.value.filter((existingItem) => {
      if (item.__typename) {
        return item.__typename === existingItem.__typename ? existingItem.id !== item.id : true;
      }

      return existingItem.id !== item.id;
    });

    itemsHelpers.setValue(assignSteps(newTasks));
  };

  const renderAddRemoveButton = () =>
    isItemSelected ? (
      <DeprecatedIconButton
        className='!bg-danger-500 text-white hover:!bg-danger-600 hover:!text-white'
        data-testid='remove-item'
        icon={<RemoveIcon />}
        iconSize='sm'
        size='sm'
        onClick={removeItem(item)}
      />
    ) : (
      <DeprecatedIconButton
        className='!bg-success-500 text-white hover:!bg-success-600 hover:!text-white'
        data-testid='add-item'
        icon={<AddIcon />}
        iconSize='sm'
        size='sm'
        onClick={addItem(item)}
      />
    );

  const renderDetailsModal = () => {
    if (
      !onDetailsOpen ||
      (typenamesWithDetails && !typenamesWithDetails.includes(item.__typename))
    ) {
      return null;
    }

    const props = {
      className: 'text-font-secondary mr-xs',
      'data-testid': 'item-more-info',
      icon: <Search />,
      size: 'sm',
      iconSize: 'sm',
      onClick: () => onDetailsOpen(item),
    };

    return <DeprecatedIconButton {...props} />;
  };

  return (
    <>
      {draggable && (
        <SharedIcon className='sortable-list-item__drag-icon' icon={<DragHandle />} size='sm' />
      )}
      {withBadge && (
        <div className='lessons__list-item__type-badge'>
          {t(`admin.shared.sortableList.badges.${item.__typename.toLowerCase()}`)}
        </div>
      )}
      <div className='flex flex-1 items-center'>
        <span className='leading-lg'>{item.name}</span>

        {item.owner && (
          <>
            <IconContainer Icon={UserIcon} size='sm' />
            <span className='sortable-list-item__title'>{item.owner.name}</span>
          </>
        )}
      </div>
      {item.status && (
        <Badge type={item.status === 'DRAFT' ? 'secondary' : 'primary'}>
          {capitalize(item.status)}
        </Badge>
      )}
      <div className='flex ml-base items-center'>
        {renderDetailsModal()}
        {renderAddRemoveButton()}
      </div>
    </>
  );
}

export default AdminSharedSortableListItem;
