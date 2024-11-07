import PropTypes from 'prop-types';

import SharedIcon from '@shared/components/Icon/Icon';

StudentLessonSharedButton.propTypes = {
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

function StudentLessonSharedButton({ icon, onClick }) {
  return (
    <button
      className='lesson-item-button'
      data-testid='item-button'
      type='button'
      onClick={onClick}>
      <SharedIcon className='lesson-item-button__icon' icon={icon} size='sm' />
    </button>
  );
}

export default StudentLessonSharedButton;
