import { useTranslation } from 'react-i18next';

import useUserInfo from '@pbl/hooks/useUserInfo';
import { ReactComponent as DashboardIcon } from '@pbl/svg/home_dashboard.svg';
import { TStudentInfo } from '@pbl/graphql/student/queries/userInfo';

import { SidebarNavItem } from '@shared/components/Sidebar/NavItem/NavItem';
import { QuestionBox } from '@shared/components/QuestionBox/QuestionBox';
import { ReactComponent as MessageIcon } from '@shared/svg/messages.svg';
import { ReactComponent as PortfolioIcon } from '@shared/svg/portfolio.svg';
import { ReactComponent as PlansIcon } from '@shared/svg/certificate.svg';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './Navigation.module.sass';

function StudentNavigation() {
  const { t } = useTranslation();
  const { userInfo } = useUserInfo<TStudentInfo>();
  const { isExpanded } = useNavigation();

  const navItems = [
    {
      id: 'dashboard',
      icon: <DashboardIcon />,
      path: '/',
      text: t('student.navigation.dashboard'),
    },
    {
      id: 'portfolio',
      icon: <PortfolioIcon />,
      path: '/portfolio',
      text: t('student.navigation.portfolio'),
    },
    {
      id: 'plans',
      icon: <PlansIcon />,
      path: '/plans',
      text: t('student.navigation.plans'),
      hidden: !userInfo.hasPlans,
    },
    {
      id: 'messaging',
      icon: <MessageIcon />,
      path: '/messages',
      needsAttention: userInfo?.hasUnreadConversation,
      text: t('navigation.messages'),
    },
  ];

  const renderNavItems = navItems.map((item) => <SidebarNavItem key={item.id} {...item} />);

  return (
    <>
      <nav className={styles.navigation}>{renderNavItems}</nav>
      <QuestionBox isExpanded={isExpanded} />
    </>
  );
}

export default StudentNavigation;
