import cx from 'classnames';

import styles from './Rectangle.module.sass';

type Props = {
  className?: string;
  color?: 'standard' | 'darker';
  size?: 'sm' | 'md' | 'lg' | 'full-width' | 'unset';
  radius?: 'none' | 'xs' | 'sm' | 'md';
  withoutAnimation?: boolean;
  height?:
    | 'auto'
    | 'tiny'
    | 'extra-small'
    | 'small'
    | 'base'
    | 'big'
    | 'large'
    | 'extra-large'
    | 'full-height'
    | 'card';
};

function SkeletonRectangle({
  className,
  color = 'darker',
  size = 'full-width',
  radius = 'md',
  withoutAnimation = false,
  height = 'auto',
}: Props) {
  const rectangleClasses = cx(
    'skeleton-rectangle',
    styles.skeletonRectangle,
    className,
    [styles[`radius-${radius}`]],
    [styles[`height-${height}`]],
    {
      [styles[`width-${size}`]]: size !== 'unset',
      [styles[color]]: color,
      [styles.animated]: !withoutAnimation,
    }
  );

  return <div className={rectangleClasses} />;
}

export default SkeletonRectangle;
