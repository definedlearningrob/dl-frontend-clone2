import { useState, useRef } from 'react';
import cx from 'classnames';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AppHeaderDropdown from '@dc/components/AppHeader/Dropdown/Dropdown';
import useExpandSidebar from '@dc/hooks/useExpandSidebar';
import SharedTempBackNavButton from '@dc/components/shared/TempBackNavButton/TempBackNavButton';
import useUserInfo from '@dc/hooks/useUserInfo';
import notificationsQuery from '@dc/graphql/student/queries/notifications';
import { TRootState } from '@dc/redux/reducers';

import { LanguageSwitcher } from '@shared/components/LanguageSwitcher/LanguageSwitcher';
import { Notifications } from '@shared/components/Notifications';
import SharedAvatar from '@shared/components/Avatar/Avatar';
import SharedButton from '@shared/components/Button/Button';
import SharedIcon from '@shared/components/Icon/Icon';
import { ReactComponent as ArrowUp } from '@shared/svg/chevron_up.svg';
import { ReactComponent as ArrowDown } from '@shared/svg/chevron_down.svg';
import { NOTIFICATION_TYPES } from '@shared/resources/constants';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { callToast } from '@shared/components/Toaster/Toaster';
import { usePresentationState } from '@shared/hooks/usePresentationState';
import { HelpScout } from '@shared/components/HelpScout/HelpScout';
import { APP_TYPES } from '@shared/resources/enums';
import { useLocalize } from '@shared/hooks/useLocalize';

import PresentationItems from './PresentationItems/PresentationItems';

import './Header.sass';

type Props = {
  beforeOnboarding?: boolean;
};

function AppHeader({ beforeOnboarding }: Props) {
  const node = useRef(null);
  const { hideHeader } = useExpandSidebar();
  const { presentationState, presentationDispatch } = usePresentationState();
  const { isExpanded, isHidden, backNavButton } = useNavigation();
  const { user } = useSelector((state: TRootState) => state.session);
  const { userInfo, impersonateStop } = useUserInfo();
  const { selectedLocale, localesToSelect, setLanguage } = useLocalize();
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();

  const isImpersonated = 'isImpersonated' in userInfo && userInfo.isImpersonated;
  const hasRole = 'role' in userInfo;

  const desktopHeaderClasses = cx('header-desktop', {
    '-expanded-sidebar-left': isExpanded,
    '-with-impersonate': isImpersonated,
    '-animation-open': !isExpanded,
    '-animation-close': isExpanded,
    '-hide-navigation': isHidden,
    '-hide-header': hideHeader,
  });

  const userDropdownClasses = cx('header-desktop__user-dropdown-button', {
    '-dropdown-active': show,
  });

  const stopImpersonate = async () => {
    try {
      const studentUuid = userInfo.uuid;
      const redirectPath = 'role' in userInfo ? '/post-secondary' : `/students/${studentUuid}`;
      await impersonateStop();
      history.replace(redirectPath);
    } catch (error) {
      callToast('error', t('common.error', { error }));
    }
  };

  const setShowPresentationSettings = (payload: unknown) =>
    presentationDispatch({ type: 'SET_SHOW_PRESENTATION_SETTINGS', payload });

  const notificationsTheme = isImpersonated ? 'light' : 'default';

  return (
    <>
      <div className={desktopHeaderClasses} data-testid='header-desktop'>
        {backNavButton.show && (
          <SharedTempBackNavButton
            data-testid='shared-temp-button'
            destination={backNavButton.destination}
            presentationDispatch={presentationDispatch}
            presentationState={presentationState}
            setShowPresentationSettings={setShowPresentationSettings}
            text={backNavButton.text}
            onBack={backNavButton.callback}
          />
        )}
        {!beforeOnboarding && user?.type === 'student' && (
          <div className='notifications-wrapper'>
            <Notifications
              query={notificationsQuery}
              theme={notificationsTheme}
              type={NOTIFICATION_TYPES.GENERAL}
            />
            <Notifications
              query={notificationsQuery}
              theme={notificationsTheme}
              type={NOTIFICATION_TYPES.ANNOUNCEMENT}
            />
          </div>
        )}
        {hasRole && (presentationState.taskId || presentationState.slideLibraryId) && (
          <PresentationItems userRole={userInfo.role} />
        )}
        {user?.type === 'user' && <HelpScout app={APP_TYPES.CAREERS} />}
        <LanguageSwitcher
          languages={localesToSelect}
          selectedLanguage={selectedLocale}
          setLanguage={setLanguage}
        />
        <div
          ref={node}
          className='header-desktop__user-dropdown-section'
          data-testid='dropdown-section'
          // Temporary hide dropdown for impersonated since there is only logout option //
          onClick={() => !isImpersonated && setShow(!show)}>
          <SharedAvatar
            className='header-desktop__header-item'
            size='32'
            theme={show ? 'active' : 'light'}
            user={userInfo}
          />
          <button className={userDropdownClasses} data-testid='app-header-dropdown-trigger'>
            <div>
              {isImpersonated && (
                <div className='text-xs' data-testid='impersonated-label'>
                  {t('appHeader.impersonating')}
                </div>
              )}
              <span data-testid='user-first-last-name'>
                {userInfo?.firstName} {userInfo?.lastName}
              </span>
            </div>
            {/* Temporary hide dropdown for impersonated since there is only logout option */}
            {!isImpersonated && (
              <SharedIcon
                className='header-desktop__dropdown-icon'
                icon={show ? <ArrowUp /> : <ArrowDown />}
                size='xs'
              />
            )}
          </button>
          {show && <AppHeaderDropdown refProp={node} setShow={setShow} />}
          {isImpersonated && (
            <SharedButton
              className='ml-base'
              data-testid='stop-impersonating-button'
              size='sm'
              onClick={stopImpersonate}>
              {t('appHeader.exitSession')}
            </SharedButton>
          )}
        </div>
      </div>
    </>
  );
}
export default AppHeader;
