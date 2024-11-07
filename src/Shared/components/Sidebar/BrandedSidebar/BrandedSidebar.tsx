import { FC } from 'react';
import cx from 'classnames';

import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

import { TUserInfo as PblTUserInfo } from '@pbl/graphql/user/queries/userInfo';
import { TStudentInfo as PblTStudentInfo } from '@pbl/graphql/student/queries/userInfo';

import { ReactComponent as DefinedLogo } from '@shared/assets/icons/DefinedLogoIcon.svg';
import { BrandedItem } from '@shared/components/Sidebar/BrandedSidebar/BrandedItem';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

import styles from './BrandedSidebar.module.sass';

type Props = {
  isExpanded: boolean;
  userInfo?: TUserInfo | TStudentInfo | PblTUserInfo | PblTStudentInfo;
  LogoComponent: FC<{ className: string }>;
};

export const BrandedSidebar = ({ isExpanded, userInfo, LogoComponent }: Props) => {
  if (!userInfo) return null;

  const { logoUrl, iconUrl } = userInfo;

  const customLogoClassNames = 'h-lg object-contain overflow-hidden';
  const customIconClassNames = 'w-[40px] h-lg object-scale-down overflow-hidden';
  const defaultLogoClassNames = cx('h-sm object-cover overflow-hidden', {
    [styles.logoIcon]: !logoUrl,
  });
  const defaultIconClassNames = cx('object-cover overflow-hidden', {
    [styles.logoIcon]: !iconUrl,
  });
  const collapsedIconSize = iconUrl ? 'sm' : undefined;

  const expandedBrandedItem = logoUrl ? (
    <BrandedItem customClassName={customLogoClassNames} url={logoUrl} />
  ) : null;

  const hasLogoOrIcon = logoUrl || iconUrl;

  const collapsedBrandedItem = hasLogoOrIcon ? (
    <BrandedItem customClassName={customIconClassNames} url={iconUrl || logoUrl} />
  ) : null;

  return (
    <>
      {isExpanded ? (
        <>
          {expandedBrandedItem}
          <LogoComponent className={defaultLogoClassNames} />
        </>
      ) : (
        <>
          {collapsedBrandedItem}
          <IconContainer
            Icon={DefinedLogo}
            className={defaultIconClassNames}
            size={collapsedIconSize}
          />
        </>
      )}
    </>
  );
};
