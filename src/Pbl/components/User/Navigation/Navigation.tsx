import { useTranslation } from 'react-i18next';
import { isEmpty, some } from 'lodash-es';
import cx from 'classnames';

import { ReactComponent as Message } from '@dc/svg/messages.svg';

import useUserInfo from '@pbl/hooks/useUserInfo';
import { ReactComponent as Home } from '@pbl/svg/home_dashboard.svg';
import { ReactComponent as Projects } from '@pbl/svg/projects.svg';
import { THighlightedCatalogOption, TUserInfo } from '@pbl/graphql/user/queries/userInfo';
import { Roles } from '@pbl/resources/enums';

import { HighlightedCatalog } from '@shared/components/Sidebar/HighlightCatalog/highlightedCatalog';
import {
  SidebarNavItem,
  type SidebarNavItemProps,
} from '@shared/components/Sidebar/NavItem/NavItem';
import { ReactComponent as Educator } from '@shared/svg/educator.svg';
import { ReactComponent as Book } from '@shared/svg/book_opened.svg';
import { ReactComponent as ClassIcon } from '@shared/svg/class.svg';
import { ReactComponent as GoalsIcon } from '@shared/assets/icons/sport-cup.svg';
import MessagingModal from '@shared/components/Messaging/Modal/Modal';
import { REPORT_PATHS, RECEIVER_TYPES, DL_REPORTS } from '@shared/resources/constants';
import { useFeatureFlags } from '@shared/components/FeatureProvider';
import { useMessaging } from '@shared/hooks/useMessaging';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { GOALS_REPORTS } from '@shared/resources/constants';

import style from './Navigation.module.sass';

export const Navigation = () => {
  const { t } = useTranslation();
  const { userInfo } = useUserInfo<TUserInfo>();
  const { messagingState, setMessagingState } = useMessaging();
  const { DL_ADMIN } = useFeatureFlags();
  const { isExpanded } = useNavigation();

  const canBrowseReports =
    userInfo.permissions.canBrowseReports &&
    some(
      userInfo.availableReportTypes,
      (reportType) => GOALS_REPORTS.includes(reportType) || DL_REPORTS.includes(reportType)
    );

  const isOnlyOneReport = userInfo.availableReportTypes.length === 1;

  const navItems: SidebarNavItemProps[] = [
    {
      id: 'home',
      icon: <Home />,
      path: '/',
      text: t('user.navigation.home'),
    },
    {
      id: 'reports',
      path: isOnlyOneReport
        ? `/reports/${REPORT_PATHS[userInfo.availableReportTypes[0]]}`
        : '/reports',
      icon: <GoalsIcon />,
      text: t('user.navigation.reports'),
      hidden: !canBrowseReports,
    },
    {
      id: 'myProjects',
      icon: <Projects />,
      path: '/my-projects',
      text: t('user.navigation.myProjects'),
    },
    {
      id: 'myClasses',
      icon: <ClassIcon />,
      path: '/my-classes',
      text: t('user.navigation.myClasses'),
    },
    {
      id: 'messaging',
      icon: <Message />,
      needsAttention: userInfo?.hasUnreadConversation,
      path: '/messages',
      text: t('navigation.messages'),
    },
    {
      id: 'dashboard',
      icon: <Educator />,
      path: '/admin-dashboard',
      text: t('user.navigation.dashboard'),
      hidden: !DL_ADMIN || ![Roles.ENTITY_ADMIN, Roles.SYSTEM_ADMIN].includes(userInfo.role),
    },
  ];

  const filteredNavItems = navItems.filter((item) => !item.hidden);
  const highlightedCatalogsData = userInfo?.highlightedCatalogs.map(
    (catalog: THighlightedCatalogOption) => ({
      id: catalog.id,
      text: catalog.name,
      icon: <Book />,
      path: `/my-catalogs/${catalog.id}`,
    })
  );

  const toggleMessagingModal = () => {
    setMessagingState({ ...messagingState, show: !messagingState.show });
  };

  const highlightedSectionClassnames = cx(style.highlightedSection, {
    [style.small]: !isExpanded,
  });

  return (
    <nav>
      {filteredNavItems.map((item: SidebarNavItemProps) => (
        <SidebarNavItem key={item.id} {...item} />
      ))}
      {messagingState.show && (
        <MessagingModal
          initialReceiver={messagingState.receiver}
          receiverType={RECEIVER_TYPES.STUDENT}
          toggleModal={toggleMessagingModal}
        />
      )}
      {!isEmpty(highlightedCatalogsData) && (
        <>
          <div className={highlightedSectionClassnames}>
            {isExpanded && (
              <p className={style.highlightedSectionDivide}>{t('user.navigation.featured')}</p>
            )}
          </div>
          {highlightedCatalogsData.map((item) => (
            <HighlightedCatalog key={item.id} catalog={item} />
          ))}
        </>
      )}
    </nav>
  );
};
