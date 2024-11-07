import cx from 'classnames';
import Avatar, { ReactAvatarProps } from 'react-avatar';

import './Avatar.sass';

type Props = {
  className?: string;
  avatarClassName?: string;
  size: ReactAvatarProps['size'];
  title?: ReactAvatarProps['title'];
  theme?: 'light' | 'base' | 'dark' | 'primary' | 'active';
} & (
  | {
      user: User;
      label?: never;
    }
  | {
      label: string;
      user?: never;
    }
);

type User = {
  firstName?: string;
  lastName?: string;
};

function SharedAvatar({
  className,
  avatarClassName,
  size,
  theme = 'base',
  user,
  label,
  title,
}: Props) {
  const avatarWrapperClasses = cx('avatar', className);
  const avatarSize = size?.replace(/[^0-9]/g, '') || 32;
  const textSizeRatio = parseFloat(String(avatarSize)) < 32 ? 2.4 : 2.65;

  const backgroundColor = {
    light: '#FCFCFC',
    base: '#F0F2F7',
    dark: '#D5DEED',
    primary: '#EBF7FF',
    active: '#FCFCFC',
  }[theme];

  const textColor = {
    light: '#6A6E7C',
    base: '#747A88',
    dark: '#747A88',
    primary: '#004775',
    active: '#004775',
  }[theme];

  const letters = user ? `${user.firstName} ${user.lastName}` : label;

  return (
    <div className={avatarWrapperClasses} data-testid='avatar-image'>
      <Avatar
        className={cx('avatar__image', avatarClassName)}
        color={backgroundColor}
        fgColor={textColor}
        name={letters}
        round={true}
        size={size}
        textSizeRatio={textSizeRatio}
        title={title}
      />
    </div>
  );
}

export default SharedAvatar;
