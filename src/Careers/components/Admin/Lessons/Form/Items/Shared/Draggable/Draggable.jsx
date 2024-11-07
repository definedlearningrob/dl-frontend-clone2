import cx from 'classnames';
import PropTypes from 'prop-types';

import { ReactComponent as DragHandle } from '@dc/svg/temp/drag_handle.svg';

import { ReactComponent as PadlockIcon } from '@shared/svg/padlock.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

AdminLessonsFormItemsSharedDraggable.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  innerRef: PropTypes.func,
  isDragging: PropTypes.bool,
  onRemove: PropTypes.func,
};

function AdminLessonsFormItemsSharedDraggable({
  children,
  className,
  disabled,
  innerRef,
  isDragging,
  ...attributes
}) {
  const classes = cx('dc-draggable flex items-center grow-1 group pl-xxxs', {
    'bg-neutral-200 border border-neutral-400 shadow-200': isDragging,
    '-disabled': disabled,
    [className]: className,
  });

  const DragHandleIcon = disabled ? PadlockIcon : DragHandle;

  return (
    <li ref={innerRef} className={classes} data-testid='draggable-item' {...attributes}>
      <div className='invisible group-hover:visible'>
        <IconContainer Icon={DragHandleIcon} paddingSize='none' size='sm' />
      </div>
      {children}
    </li>
  );
}

export default AdminLessonsFormItemsSharedDraggable;
