import React, { useEffect } from 'react';
import { compact } from 'lodash-es';
import { useTranslation } from 'react-i18next';

import { ReactComponent as SignOut } from '@pbl/svg/sign_out.svg';
import useUserInfo from '@pbl/hooks/useUserInfo';

import { ReactComponent as OpenInNew } from '@shared/svg/open_in_new.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { useSharedSessionLink } from '@shared/components/SharedSession';

type Props = {
  refProp: React.RefObject<HTMLDivElement>;
  setShow: (show: boolean) => void;
};

function AppHeaderDropdown({ refProp, setShow }: Props) {
  const { t } = useTranslation();
  const {
    logout,
    userInfo: { hasAccessToCareers },
  } = useUserInfo();
  const [redirectToDC, { loading }] = useSharedSessionLink({ type: 'DC' });

  const goToDefinedCareers = async () => {
    await redirectToDC();
  };

  const dropdownList = compact([
    hasAccessToCareers && {
      action: goToDefinedCareers,
      icon: <OpenInNew />,
      text: t('sharedCommon.dc'),
    },
    {
      action: logout,
      icon: <SignOut />,
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
    dropdownList.map(({ action, icon, text }) => (
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
    ));

  return (
    <ul
      className='header-desktop__user-dropdown-section__content'
      data-testid='app-header-dropdown'>
      {renderDropdownList()}
    </ul>
  );
}

export default AppHeaderDropdown;
