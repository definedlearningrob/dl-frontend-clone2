import PropTypes from 'prop-types';

import { ReactComponent as DragHandle } from '@dc/svg/temp/drag_handle.svg';
import { ReactComponent as Remove } from '@dc/svg/remove.svg';

import SharedIcon from '@shared/components/Icon/Icon';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as Search } from '@shared/svg/search.svg';

AdminLessonsFormItemsSharedLessonItem.propTypes = {
  identifier: PropTypes.string,
  label: PropTypes.string,
  onMore: PropTypes.func,
  onRemove: PropTypes.func,
  testPrefix: PropTypes.string,
};

function AdminLessonsFormItemsSharedLessonItem({
  identifier,
  onRemove,
  onMore,
  label,
  testPrefix,
}) {
  return (
    <>
      <SharedIcon className='lessons__list-item__drag-icon' icon={<DragHandle />} size='sm' />
      <div className='lessons__list-item__type-badge'>{label}</div>
      <span className='lessons__list-item__title'>{identifier}</span>
      <div className='lessons__list-item__action-buttons'>
        <DeprecatedIconButton
          className='lessons__list-item__details-button'
          data-testid='lesson-item-more-info'
          icon={<Search />}
          size='sm'
          onClick={onMore}
        />
        <DeprecatedIconButton
          className='lessons__list-item__remove-button'
          data-testid={`${testPrefix}-remove`}
          icon={<Remove />}
          size='sm'
          onClick={onRemove}
        />
      </div>
    </>
  );
}

export default AdminLessonsFormItemsSharedLessonItem;
