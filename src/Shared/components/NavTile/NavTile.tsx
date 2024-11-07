import cx from 'classnames';
import { Link, useHistory } from 'react-router-dom';
import { FC, MouseEvent, SVGProps } from 'react';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as RightChevronIcon } from '@shared/svg/chevron_right.svg';

type Props = {
  title: string;
  subtitle?: string;
  to: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  variant?: 'primary' | 'secondary';
  onClick?: () => Promise<any>;
  size?: 'small' | 'base';
  isLoading?: boolean;
};

export const NavTile = ({
  title,
  subtitle,
  to,
  Icon,
  variant = 'primary',
  onClick,
  size = 'base',
  isLoading,
}: Props) => {
  const history = useHistory();

  const isPrimary = variant === 'primary';
  const isSmall = size === 'small';
  const linkClassName = cx(
    'flex gap-x !border !border-neutral-300 rounded-sm items-start leading-lg text-xs group/link',
    {
      'hover:!border-primary-500 hover:!bg-primary-200': isPrimary,
      'hover:!border-secondary-500 hover:!bg-secondary-200': !isPrimary,
      'p-x': isSmall,
      'p-sm': !isSmall,
      'pointer-events-none animate-pulse': isLoading,
    }
  );
  const iconClassName = cx('text-primary-500 bg-primary-200 rounded-sm group-hover/link:bg-white', {
    'text-secondary-500 bg-secondary-200': !isPrimary,
    'text-primary-500 bg-primary-200': isPrimary,
    '[&_svg]:animate-spin': isLoading,
  });

  const chevronClassName = cx('text-primary-500 rounded-sm self-start group-hover/link:bg-white', {
    'text-secondary-500': !isPrimary,
    'text-primary-500': isPrimary,
  });

  const headingClassName = cx('mb-0 font-medium leading-base', {
    'text-xs': isSmall,
    'text-sm': !isSmall,
  });

  const subHeadingClassName = cx('mb-0 font-regular leading-base', {
    'text-xxs': isSmall,
    'text-xs': !isSmall,
  });

  const handleLinkClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onClick) {
      return;
    }

    event.preventDefault();
    await onClick();

    history.push(to);
  };

  return (
    <Link className={linkClassName} to={to} onClick={handleLinkClick}>
      <IconContainer
        Icon={Icon}
        className={iconClassName}
        paddingSize='xs'
        size={isSmall ? 'sm' : 'base'}
      />
      <div className='text-font-primary font-medium tracking-normal grow flex flex-col gap-xxs xxxl:gap-xs self-center'>
        <h5 className={headingClassName}>{title}</h5>
        {subtitle && <p className={subHeadingClassName}>{subtitle}</p>}
      </div>
      <IconContainer
        Icon={RightChevronIcon}
        className={chevronClassName}
        paddingSize={isSmall ? 'xxs' : 'xs'}
        size={isSmall ? 'sm' : 'base'}
      />
    </Link>
  );
};
