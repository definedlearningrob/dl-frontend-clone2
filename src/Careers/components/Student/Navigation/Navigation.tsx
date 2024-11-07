import { useTranslation } from 'react-i18next';
import { useOverallProgressQuery } from '@graphql/dc/students/hooks';

import useUserInfo from '@dc/hooks/useUserInfo';
import { ReactComponent as CoursesIcon } from '@dc/svg/courses.svg';
import { ReactComponent as DashboardIcon } from '@dc/svg/home_dashboard.svg';
import { ReactComponent as FinalReportIcon } from '@dc/svg/file_document.svg';
import { ReactComponent as MessagesIcon } from '@dc/svg/messages.svg';
import { ReactComponent as OpportunitiesIcon } from '@dc/svg/match.svg';
import { ReactComponent as PostSecondaryIcon } from '@dc/svg/test-checkmark-done.svg';
import { ReactComponent as ExperiencesSummaryIcon } from '@dc/svg/experiencesSummary.svg';
import { TStudentInfo } from '@dc/graphql/student/queries/userInfo';

import { ReactComponent as PlansIcon } from '@shared/svg/certificate.svg';
import { ReactComponent as PortfolioIcon } from '@shared/svg/portfolio.svg';
import { SidebarNavItem } from '@shared/components/Sidebar/NavItem/NavItem';
import { useFeatureFlags } from '@shared/components/FeatureProvider';
import { QuestionBox } from '@shared/components/QuestionBox/QuestionBox';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

import styles from './Navigation.module.sass';

export const StudentNavigation = () => {
  const { t } = useTranslation();
  const { isExpanded } = useNavigation();
  const { userInfo } = useUserInfo<TStudentInfo>();
  const { POST_SECONDARY_ON } = useFeatureFlags();
  const { data: overallProgressData } = useOverallProgressQuery();
  const isOpportunitiesFeatureDisabled = !userInfo.hasOpportunitiesEnabled;
  const isPostSecondaryFeatureDisabled = !POST_SECONDARY_ON;
  const isEnrolledInCourse = overallProgressData?.overallProgress?.enrolledInCourse;

  const navItems = [
    {
      id: 'dashboard',
      icon: <DashboardIcon />,
      path: '/',
      text: t('student.navigation.dashboard'),
      childrenItems: [
        {
          id: 'final-report',
          icon: <FinalReportIcon />,
          path: '/final-report',
          hidden: !userInfo?.hasCompletedAssessment && !isEnrolledInCourse,
          text: t('student.navigation.finalReport'),
        },
        {
          id: 'final-report',
          icon: <ExperiencesSummaryIcon />,
          path: '/portfolio/experiences',
          hidden: !userInfo?.hasCompletedAssessment,
          text: t('student.navigation.experiencesSummary'),
        },
      ],
    },
    {
      id: 'courses',
      icon: <CoursesIcon />,
      path: '/courses',
      text: t('student.navigation.courses'),
    },
    {
      id: 'opportunities',
      icon: <OpportunitiesIcon />,
      hidden: isOpportunitiesFeatureDisabled,
      path: '/opportunities',
      text: t('student.navigation.opportunities'),
    },
    {
      id: 'post-secondary',
      icon: <PostSecondaryIcon />,
      path: '/post-secondary',
      text: t('student.navigation.postSecondary'),
      hidden: isPostSecondaryFeatureDisabled,
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
      id: 'messages',
      icon: <MessagesIcon />,
      path: '/messages',
      needsAttention: userInfo?.hasUnreadConversation,
      text: t('student.navigation.messages'),
    },
  ];

  const renderNavItems = navItems.map((item) => <SidebarNavItem key={item.id} {...item} />);

  return (
    <>
      <nav className={styles.navigation}>{renderNavItems}</nav>
      <QuestionBox isExpanded={isExpanded} />
    </>
  );
};
