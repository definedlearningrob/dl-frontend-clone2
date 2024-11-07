import cx from 'classnames';

import SharedButton, { type TSharedButtonProps } from '@shared/components/Button/Button';
import { ReactComponent as ArrowForwardIcon } from '@shared/assets/icons/arrow_forward.svg';

import styles from './ViewButton.module.sass';

const ViewButton = ({ className, children, Icon, ...rest }: TSharedButtonProps) => {
  const classes = cx(styles.button, className);

  return (
    <SharedButton Icon={Icon ?? ArrowForwardIcon} className={classes} variant='link' {...rest}>
      {children}
    </SharedButton>
  );
};

export default ViewButton;
