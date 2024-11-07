import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { isEmpty, some } from 'lodash-es';
import { useCustomCatalogOptionQuery } from '@graphql/dc/shared/hooks';

import useExpandSidebar from '@dc/hooks/useExpandSidebar';
import { ReactComponent as Courses } from '@dc/svg/courses.svg';
import { ReactComponent as Dashboard } from '@dc/svg/home_dashboard.svg';
import { ReactComponent as Extensions } from '@dc/svg/puzzle.svg';
import { ReactComponent as Opportunities } from '@dc/svg/match.svg';
import { ReactComponent as Message } from '@dc/svg/messages.svg';
import { ReactComponent as PostSecondary } from '@dc/svg/test-checkmark-done.svg';
import useUserInfo from '@dc/hooks/useUserInfo';
import { Roles } from '@dc/resources/enums';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';
import { RECEIVER_TYPES } from '@dc/resources/constants';

import style from '@pbl/components/User/Navigation/Navigation.module.sass';

import { ReactComponent as GoalsAndReportsIcon } from '@shared/assets/icons/bar_graph.svg';
import { ReactComponent as GoalsIcon } from '@shared/assets/icons/sport-cup.svg';
import { ReactComponent as StudentIcon } from '@shared/assets/icons/student.svg';
import { SidebarNavItem } from '@shared/components/Sidebar/NavItem/NavItem';
import Modal from '@shared/components/Messaging/Modal/Modal';
import { useMessaging } from '@shared/hooks/useMessaging';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { useFeatureFlags } from '@shared/components/FeatureProvider';
import { callToast } from '@shared/components/Toaster/Toaster';
import { useUserRole } from '@shared/graphql/user/hooks/useUserRole';
import { GOALS_REPORTS } from '@shared/resources/constants';
import { REPORT_PATHS } from '@shared/resources/constants';
import { HighlightedCatalog } from '@shared/components/Sidebar/HighlightCatalog/highlightedCatalog';

const getPermissions = (userInfo: TUserInfo) => {
  const permissionKeys = Object.keys(userInfo.permissions) as (keyof typeof userInfo.permissions)[];
  const permissions = permissionKeys.reduce((acc, key) => {
    acc[key] = userInfo.permissions[key] || userInfo.role === Roles.SYSTEM_ADMIN;

    return acc;
  }, {} as typeof userInfo.permissions);

  return {
    extensions: userInfo.role === Roles.SYSTEM_ADMIN || userInfo.role === Roles.ENTITY_ADMIN,
    ...permissions,
  };
};

export const Navigation = () => {
  const { t } = useTranslation();
  const { activeDashboard } = useExpandSidebar();
  const { isExpanded } = useNavigation();
  const { messagingState, setMessagingState } = useMessaging();
  const { userInfo } = useUserInfo<TUserInfo>();
  const { isEntityAdmin } = useUserRole();
  const { TEACHER_OPPORTUNITIES_ON } = useFeatureFlags();
  const { data } = useCustomCatalogOptionQuery();
  const isOpportunitiesFeatureDisabled =
    !TEACHER_OPPORTUNITIES_ON || !userInfo.hasOpportunitiesEnabled;
  const canBrowseReports =
    userInfo.permissions.canBrowseReports && !isEmpty(userInfo.availableReportTypes);
  const mainNavClasses = cx({
    '-small': !isExpanded,
    '-animation-open': !isExpanded,
    '-animation-close': isExpanded,
  });
  const { extensions, counselor } = getPermissions(userInfo);
  const onMessageSend = () => callToast('success', t('messaging.sentSuccessfully'));

  const isOnlyOneReport = userInfo.availableReportTypes.length === 1;

  const hasAnyGoalsReport = some(userInfo.availableReportTypes, (reportType) =>
    GOALS_REPORTS.includes(reportType)
  );

  const navItems = [
    {
      id: 'dashboard',
      icon: <Dashboard />,
      path: activeDashboard.dashboardLink as string,
      text: t('user.navigation.dashboard'),
    },
    {
      id: 'student-management',
      icon: <StudentIcon />,
      path: '/student-management',
      hidden: !isEntityAdmin && !counselor,
      text: t('user.navigation.students'),
    },
    {
      id: 'reports',
      path: isOnlyOneReport
        ? `/reports/${REPORT_PATHS[userInfo.availableReportTypes[0]]}`
        : '/reports',
      icon: hasAnyGoalsReport ? <GoalsIcon /> : <GoalsAndReportsIcon />,
      text: hasAnyGoalsReport ? t('user.navigation.goalsAndReports') : t('user.navigation.reports'),
      hidden: !canBrowseReports,
    },
    {
      id: 'courses',
      icon: <Courses />,
      path: '/courses',
      text: t('student.navigation.courses'),
    },
    extensions && {
      id: 'extensions',
      icon: <Extensions />,
      path: '/extensions',
      text: 'Extensions',
    },
    {
      id: 'opportunities',
      icon: <Opportunities />,
      path: '/opportunities',
      text: t('user.navigation.opportunities'),
      hidden: isOpportunitiesFeatureDisabled,
    },
    {
      id: 'post-secondary',
      icon: <PostSecondary />,
      path: '/post-secondary',
      text: t('user.navigation.postSecondary'),
    },
    {
      id: 'messaging',
      icon: <Message />,
      needsAttention: userInfo?.hasUnreadConversation,
      path: '/messages',
      text: t('user.navigation.messages'),
    },
  ];

  const renderNavItems = navItems.map((item) => item && <SidebarNavItem key={item.id} {...item} />);
  const closeGuidance = useCallback(() => {
    setMessagingState({
      ...messagingState,
      actionContext: null,
      show: false,
    });
  }, [messagingState]);

  const shouldDisplayCustomCatalog = data && !isEmpty(data.careersCatalog);

  return (
    <>
      <nav className={mainNavClasses}>
        {renderNavItems}
        {shouldDisplayCustomCatalog && (
          <>
            <div className='mt-md ml-sm mb-xs'>
              {isExpanded && (
                <p className={style.highlightedSectionDivide}>{t('user.navigation.featured')}</p>
              )}
            </div>
            <HighlightedCatalog
              catalog={{
                text: data!.careersCatalog!.name,
                id: data!.careersCatalog!.id,
                icon: <PostSecondary />,
                path: '/catalog',
              }}
            />
          </>
        )}
      </nav>
      {messagingState.show && (
        <Modal
          context={{ ...messagingState.actionContext, ...messagingState.context }}
          initialReceiver={messagingState.receiver}
          receiverType={RECEIVER_TYPES.STUDENT}
          toggleModal={closeGuidance}
          onSuccess={onMessageSend}
        />
      )}
    </>
  );
};
