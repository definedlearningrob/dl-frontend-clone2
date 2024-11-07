import cx from 'classnames';

import { ReactComponent as ArrowLeft } from '@shared/svg/chevron_left.svg';
import { ReactComponent as ArrowRight } from '@shared/svg/chevron_right.svg';
import { IconButton } from '@shared/components/IconButton/IconButton';

import styles from './Arrow.module.sass';

type TArrowProps = {
  direction: 'left' | 'right';
};

export const CarouselArrow = ({ direction }: TArrowProps) => {
  const properIcon = {
    left: ArrowLeft,
    right: ArrowRight,
  }[direction];

  return <IconButton Icon={properIcon} className={cx(styles.arrow)} size='md' />;
};
