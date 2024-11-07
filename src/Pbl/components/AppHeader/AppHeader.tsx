import cx from 'classnames';
import { useState, useRef, MutableRefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import PresentationItems from '@dc/components/AppHeader/PresentationItems/PresentationItems';

import useExpandSidebar from '@pbl/hooks/useExpandSidebar';
import { LOCAL_STORAGE_CLASS_ID } from '@pbl/resources/localStorageKeys';
import AppHeaderDropdown from '@pbl/components/AppHeader/Dropdown/Dropdown';
import notificationsQuery from '@pbl/graphql/student/queries/notifications';
import SharedRoleGuard from '@pbl/shared/RoleGuard/RoleGuard';
import SharedTempBackNavButton from '@pbl/components/shared/TempBackNavButton/TempBackNavButton';
import useUserInfo from '@pbl/hooks/useUserInfo';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ArrowDown } from '@shared/svg/chevron_down.svg';
import { ReactComponent as ArrowUp } from '@shared/svg/chevron_up.svg';
import SharedButton from '@shared/components/Button/Button';
import Link from '@shared/components/Link';
import { Notifications } from '@shared/components/Notifications';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { callToast } from '@shared/components/Toaster/Toaster';
import { usePresentationState } from '@shared/hooks/usePresentationState';
import { HelpScout } from '@shared/components/HelpScout/HelpScout';
import { APP_TYPES } from '@shared/resources/enums';
import { LanguageSwitcher } from '@shared/components/LanguageSwitcher/LanguageSwitcher';
import { useLocalize } from '@shared/hooks/useLocalize';

import SearchBox from './SearchBox/SearchBox';

import './Header.sass';

function AppHeader() {
  const node = useRef() as MutableRefObject<HTMLDivElement>;
  const { hideHeader } = useExpandSidebar();
  const { selectedLocale, localesToSelect, setLanguage } = useLocalize();
  const { presentationState, presentationDispatch } = usePresentationState();
  const { isExpanded, isHidden, backNavButton } = useNavigation();
  const { userInfo, impersonateStop } = useUserInfo();
  const { t } = useTranslation();
  const history = useHistory();

  const isStudent = 'isImpersonated' in userInfo;
  const isImpersonated = isStudent && userInfo.isImpersonated;

  const [show, setShow] = useState(false);

  const userDropdownClasses = cx('header-desktop__user-dropdown-button', {
    '-dropdown-active': show,
  });

  const desktopHeaderClasses = cx('header-desktop', {
    '-expanded-sidebar-left': isExpanded,
    '-with-impersonate': isImpersonated,
    '-hide-navigation': isHidden,
    '-hide-header': hideHeader,
  });

  const parsedUserInfo = {
    firstName: userInfo?.firstName,
    lastName: userInfo?.lastName,
  };

  const setShowPresentationSettings = (payload: any) =>
    presentationDispatch({ type: 'SET_SHOW_PRESENTATION_SETTINGS', payload });

  const stopImpersonate = async () => {
    const classId = localStorage.getItem(LOCAL_STORAGE_CLASS_ID);

    try {
      await impersonateStop();
      history.replace(`/my-classes/${classId}`);
      localStorage.removeItem(LOCAL_STORAGE_CLASS_ID);
    } catch (error) {
      callToast('error', t('common.error', { error }));
    }
  };

  return (
    <>
      <div className={desktopHeaderClasses} data-testid='header-desktop'>
        {backNavButton.show && (
          <div className='back-button-wrapper mr-auto'>
            <SharedTempBackNavButton
              data-testid='shared-temp-button'
              destination={backNavButton.destination}
              presentationDispatch={presentationDispatch}
              presentationState={presentationState}
              setShowPresentationSettings={setShowPresentationSettings}
              text={backNavButton.text}
              onClick={backNavButton.callback}
            />
          </div>
        )}
        {!isHidden && (
          <SharedRoleGuard.Teacher>
            <SearchBox />
            <Link size='sm' to='/standards-search' variant='primary-outlined'>
              {t('user.standardSearch.search')}
            </Link>
          </SharedRoleGuard.Teacher>
        )}
        {!isStudent && (presentationState.taskId || presentationState.slideLibraryId) && (
          <PresentationItems isOnPBL={true} userRole={userInfo.role} />
        )}
        {isStudent && (
          <Notifications query={notificationsQuery} theme={isImpersonated ? 'light' : 'default'} />
        )}
        {!isStudent && <HelpScout app={APP_TYPES.PBL} />}
        <LanguageSwitcher
          languages={localesToSelect}
          selectedLanguage={selectedLocale}
          setLanguage={setLanguage}
        />
        <div
          ref={node}
          className='header-desktop__user-dropdown-section'
          data-testid='dropdown-section'
          role='button'
          onClick={() => !isImpersonated && setShow(!show)}>
          <SharedAvatar
            className='header-desktop__header-item'
            size='32'
            theme={show ? 'active' : 'light'}
            user={parsedUserInfo}
          />
          <button className={userDropdownClasses} data-testid='app-header-dropdown-trigger'>
            <div>
              {isImpersonated && (
                <span
                  className='header-desktop__impersonating-label'
                  data-testid='impersonated-label'>
                  {t('appHeader.impersonating')}
                </span>
              )}
              <span data-testid='user-first-last-name'>
                {userInfo?.firstName} {userInfo?.lastName}
              </span>
            </div>

            {!isImpersonated && (
              <SharedIcon
                className='header-desktop__dropdown-icon'
                icon={show ? <ArrowUp /> : <ArrowDown />}
                size='xs'
              />
            )}
          </button>
          {isImpersonated && (
            <SharedButton
              className='ml-base'
              data-testid='stop-impersonating-button'
              size='sm'
              onClick={stopImpersonate}>
              {t('appHeader.exitSession')}
            </SharedButton>
          )}
          {show && <AppHeaderDropdown refProp={node} setShow={setShow} />}
        </div>
      </div>
    </>
  );
}

export default AppHeader;
