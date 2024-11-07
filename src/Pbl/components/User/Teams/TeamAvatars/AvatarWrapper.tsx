import React, { ReactNode, useState } from 'react';
import cx from 'classnames';

import styles from './TeamAvatars.module.sass';

type ChildrenProps = {
  isHover: boolean;
  isInteractive: boolean;
};

type Props = {
  children: ({ isHover, isInteractive }: ChildrenProps) => ReactNode;
  interactive: boolean;
};

export const AvatarWrapper = ({ children, interactive }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const avatarWrapperClassName = cx(styles.avatarWrapper, {
    [styles.interactiveWrapper]: interactive,
  });

  return (
    <div
      className={avatarWrapperClassName}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}>
      {children && children({ isHover, isInteractive: interactive })}
    </div>
  );
};
