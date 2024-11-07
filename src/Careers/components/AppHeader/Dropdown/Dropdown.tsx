import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { compact } from 'lodash-es';
import { t } from 'i18next';

import { ReactComponent as SignOut } from '@dc/svg/sign_out.svg';
import useUserInfo from '@dc/hooks/useUserInfo';
import { ROLES } from '@dc/resources/constants';

import { ReactComponent as Settings } from '@shared/svg/settings_outlined.svg';
import { ReactComponent as OpenInNew } from '@shared/svg/open_in_new.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { useSharedSessionLink } from '@shared/components/SharedSession';

type Props = {
  refProp: React.RefObject<HTMLDivElement>;
  setShow: (show: boolean) => void;
};

function AppHeaderDropdown({ refProp, setShow }: Props) {
  const history = useHistory();
  const { userInfo, logout } = useUserInfo();
  const isSystemAdmin = 'role' in userInfo && userInfo.role === ROLES.SYSTEM_ADMIN;
  const dashboardPath = history.location.pathname.includes('/admin');
  const [redirectToDL, { loading }] = useSharedSessionLink({ type: 'DL' });

  const switchApp = () => {
    const appUrl = dashboardPath ? '/' : '/admin/courses';

    history.push(appUrl);
  };

  const goToDefinedLearning = async () => {
    await redirectToDL();
  };

  const dropdownList = compact([
    {
      action: switchApp,
      icon: <Settings />,
      onlyAdmin: true,
      text: dashboardPath ? t('admin.navigation.dashboard') : t('admin.navigation.adminPanel'),
    },
    userInfo.hasAccessToPbl && {
      action: goToDefinedLearning,
      icon: <OpenInNew />,
      text: t('sharedCommon.dl'),
    },
    {
      action: logout,
      icon: <SignOut />,
      onlyAdmin: false,
      text: t('appHeader.logout'),
    },
  ]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideDropdown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  const handleClickOutsideDropdown = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement;
    if (refProp.current && refProp.current.contains(clickedElement)) {
      return;
    }

    setShow(false);
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    const escapeKey = 27;

    if (event.keyCode === escapeKey) {
      setShow(false);
    }
  };

  const renderDropdownList = () =>
    dropdownList.map(({ action, icon, onlyAdmin, text }) => {
      if (!onlyAdmin || isSystemAdmin) {
        return (
          <li key={text} data-testid='app-header-dropdown-element' onClick={action}>
            <DeprecatedIconButton
              className='header-desktop__header-item'
              data-testid='dropdown-button'
              disabled={loading}
              icon={icon}
              size='xs'
            />
            <span>{text}</span>
          </li>
        );
      }
    });

  return (
    <ul
      className='header-desktop__user-dropdown-section__content'
      data-testid='app-header-dropdown'>
      {renderDropdownList()}
    </ul>
  );
}

export default AppHeaderDropdown;
