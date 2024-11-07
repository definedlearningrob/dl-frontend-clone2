import cx from 'classnames';
import { ReactNode, FC } from 'react';
import { useHistory } from 'react-router-dom';

import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';
import { Roles } from '@dc/resources/enums';

import { TUserInfo as PblTUserInfo } from '@pbl/graphql/user/queries/userInfo';
import { TStudentInfo as PblTStudentInfo } from '@pbl/graphql/student/queries/userInfo';

import { ExpandButton } from '@shared/components/Sidebar/ExpandButton/ExpandButton';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { BrandedSidebar } from '@shared/components/Sidebar/BrandedSidebar/BrandedSidebar';
import { ReadSpeaker } from '@shared/components/ReadSpeaker/ReadSpeaker';
import { useRole } from '@shared/hooks/useRole';

import styles from './Sidebar.module.sass';

type Props = {
  children?: ReactNode;
  disabled?: boolean;
  LogoComponent: FC<{ className: string }>;
  collapsible?: boolean;
  userInfo?: TUserInfo | TStudentInfo | PblTUserInfo | PblTStudentInfo;
};

export const Sidebar = ({
  children,
  disabled,
  LogoComponent,
  collapsible = true,
  userInfo,
}: Props) => {
  const { isExpanded, isHidden } = useNavigation();
  const history = useHistory();
  const { isStudent } = useRole();

  const sidebarClassNames = cx(
    styles.sidebar,
    'flex flex-col fixed top-0 z-higher bg-white shadow-200 h-screen',
    {
      [styles.animationClose]: isExpanded,
      [styles.animationOpen]: !isExpanded,
      [styles.overlay]: disabled,
      [styles.small]: !isExpanded,
      hidden: isHidden,
    }
  );
  const isAdmin = userInfo && 'role' in userInfo && userInfo?.role === Roles.SYSTEM_ADMIN;
  const hasCustomBranding = userInfo && (userInfo.logoUrl || userInfo.iconUrl);
  const customLogoClassNames = cx('flex flex-col p-sm justify-center items-center gap-xs', {
    'px-xs': !isExpanded,
  });

  const logoClassNames = cx(styles.logoIcon, {
    [styles.smallLogo]: !isExpanded,
  });

  return (
    <div className={sidebarClassNames}>
      <div onClick={() => history.push('/')}>
        {isAdmin || !hasCustomBranding ? (
          <LogoComponent className={logoClassNames} />
        ) : (
          <div className={customLogoClassNames}>
            <BrandedSidebar
              LogoComponent={LogoComponent}
              isExpanded={isExpanded}
              userInfo={userInfo}
            />
          </div>
        )}
      </div>
      {children}
      {isStudent && <ReadSpeaker isCollapsed={!isExpanded} />}
      {collapsible && (
        <div className='mt-auto'>
          <ExpandButton />
        </div>
      )}
    </div>
  );
};
