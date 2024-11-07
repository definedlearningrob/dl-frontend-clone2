import PropTypes from 'prop-types';

import useLessonItems from '@dc/hooks/useLessonItems';
import { ReactComponent as ClearIcon } from '@dc/svg/clear.svg';

import { ReactComponent as AddIcon } from '@shared/svg/add.svg';
import { ReactComponent as EditIcon } from '@shared/svg/edit.svg';
import { ReactComponent as Search } from '@shared/svg/search.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';

AdminLessonsFormItemsSharedItem.propTypes = {
  identifier: PropTypes.string,
  item: PropTypes.object,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  testIdPrefix: PropTypes.string,
};

function AdminLessonsFormItemsSharedItem({ item, identifier, testIdPrefix }) {
  const { addItem, setPreviewItem, openForm, openDeletionModal } = useLessonItems();
  const withItem = (func) => () => func(item);

  return (
    <li className='lessons__list-item' data-testid={`${testIdPrefix}-item`}>
      {identifier}
      <div className='lessons__list-item__action-buttons'>
        <DeprecatedIconButton
          className='lessons__list-item__details-button'
          data-testid={`${testIdPrefix}-more-info`}
          icon={<Search />}
          size='sm'
          type='button'
          onClick={withItem(setPreviewItem)}
        />
        <DeprecatedIconButton
          className='lessons__list-item__add-button'
          data-testid={`${testIdPrefix}-add`}
          icon={<AddIcon />}
          size='sm'
          type='button'
          onClick={withItem(addItem)}
        />
        <DeprecatedIconButton
          className='lessons__list-item__edit-button'
          data-testid={`${testIdPrefix}-edit`}
          icon={<EditIcon />}
          size='sm'
          type='button'
          onClick={withItem(openForm)}
        />
        <DeprecatedIconButton
          className='lessons__list-item__delete-button'
          data-testid={`${testIdPrefix}-archive`}
          disabled={!!item.archivedAt}
          icon={<ClearIcon />}
          size='sm'
          type='button'
          onClick={withItem(openDeletionModal)}
        />
      </div>
    </li>
  );
}

export default AdminLessonsFormItemsSharedItem;
