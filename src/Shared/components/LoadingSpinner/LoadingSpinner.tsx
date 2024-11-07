import cx from 'classnames';

import './LoadingSpinner.sass';

type Color = 'disabled' | 'primary' | 'white' | 'primary-outlined';
type Size = 'xs' | 'small' | 'medium' | 'list' | 'full-screen';

type Props = {
  className?: string;
  color?: Color;
  size?: Size;
};

function SharedLoadingSpinner({ className, color = 'primary', size = 'medium' }: Props) {
  const classesWrapper = cx('loading-spinner', className, `-color-${color}`, `-size-${size}`);

  return (
    <div className={classesWrapper} data-testid='loading-spinner'>
      <div className='loading-spinner__spinner'>
        <div className='loading-spinner__cube -first' />
        <div className='loading-spinner__cube -second' />
        <div className='loading-spinner__cube -third' />
        <div className='loading-spinner__cube -fourth' />
      </div>
    </div>
  );
}

export default SharedLoadingSpinner;
