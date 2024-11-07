import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { ReactComponent as BookOutlined } from '@dc/svg/book_outlined.svg';
import { ReactComponent as Entity } from '@dc/svg/home_dashboard.svg';
import { ReactComponent as VIIcon } from '@dc/svg/match.svg';

import { ReactComponent as RubricIcon } from '@shared/assets/icons/table.svg';
import { ReactComponent as BadgeIcon } from '@shared/assets/icons/award.svg';
import { SidebarNavItem } from '@shared/components/Sidebar/NavItem/NavItem';
import { ReactComponent as User } from '@shared/svg/user_outlined.svg';
import { ReactComponent as SettingsOutlined } from '@shared/svg/settings_outlined.svg';
import { ReactComponent as SchoolClass } from '@shared/svg/class.svg';
import { ReactComponent as Student } from '@shared/svg/student.svg';
import { ReactComponent as Tag } from '@shared/svg/tag_icon.svg';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminNavigation() {
  const { isExpanded } = useNavigation();

  const { t } = useTranslation();

  const mainNavClasses = cx('navbar', {
    '-small': !isExpanded,
    '-animation-open': !isExpanded,
    '-animation-close': isExpanded,
  });

  const dividerClasses = cx('admin-nav-divider', { '-small': !isExpanded });

  const divider = (groupName) => (
    <div className={dividerClasses}>
      {groupName && <span className='admin-nav-divider__text'>{groupName}</span>}
      <hr className='admin-nav-divider__line' />
    </div>
  );

  const entitiesNavItems = [
    {
      id: 'entities',
      icon: <Entity />,
      path: '/admin/entities',
      text: t('sidebar.adminNavigation.entities'),
    },
    {
      id: 'users',
      icon: <User />,
      path: '/admin/users',
      text: t('sidebar.adminNavigation.users'),
    },
    {
      id: 'schoolclasses',
      icon: <SchoolClass />,
      path: '/admin/school-classes',
      text: t('sidebar.adminNavigation.schoolClasses'),
    },
    {
      id: 'students',
      icon: <Student />,
      path: '/admin/students',
      text: t('sidebar.adminNavigation.students'),
    },
    {
      id: 'virtualInternships',
      icon: <VIIcon />,
      path: '/admin/virtual-internships',
      text: t('sidebar.adminNavigation.virtualInternships'),
    },
  ].map((item) => <SidebarNavItem key={item.id} {...item} />);

  const courseNavItems = [
    {
      id: 'courses',
      icon: <BookOutlined />,
      path: '/admin/courses',
      text: t('sidebar.adminNavigation.courses'),
    },
    {
      id: 'lessons',
      icon: <BookOutlined />,
      path: '/admin/lessons',
      text: t('sidebar.adminNavigation.lessons'),
    },
    {
      id: 'lesson-items',
      icon: <BookOutlined />,
      path: '/admin/lesson-items',
      text: t('sidebar.adminNavigation.lessonItems'),
    },
  ].map((item) => <SidebarNavItem key={item.id} {...item} />);

  const planNavItems = [
    {
      id: 'plans',
      icon: <BookOutlined />,
      path: '/admin/plans',
      text: t('sidebar.adminNavigation.plan'),
    },
    {
      id: 'plan-groups',
      icon: <BookOutlined />,
      path: '/admin/plan-groups',
      text: t('sidebar.adminNavigation.planGroups'),
    },
    {
      id: 'standard-sets',
      icon: <BookOutlined />,
      path: '/admin/standard-sets',
      text: t('sidebar.adminNavigation.standardSets'),
    },
  ].map((item) => <SidebarNavItem key={item.id} {...item} />);

  const tagsNavItem = (
    <SidebarNavItem
      icon={<Tag />}
      id='tags'
      path='/admin/performance-indicators'
      text={t('sidebar.adminNavigation.performanceIndicators')}
    />
  );

  const contractsNavItem = (
    <SidebarNavItem
      {...{
        id: 'contracts',
        icon: <BookOutlined />,
        path: '/admin/contracts',
        text: t('sidebar.adminNavigation.contracts'),
      }}
    />
  );

  const checkInItems = [
    {
      id: 'check-ins',
      icon: <BookOutlined />,
      path: '/admin/check-ins',
      text: t('sidebar.adminNavigation.checkIns'),
    },
    {
      id: 'check-in-items',
      icon: <BookOutlined />,
      path: '/admin/checkin-groups',
      text: t('sidebar.adminNavigation.checkinGroups'),
    },
  ].map((item) => <SidebarNavItem key={item.id} {...item} />);

  const rubricsNavItem = (
    <SidebarNavItem
      {...{
        id: 'rubrics',
        icon: <RubricIcon />,
        path: '/admin/rubrics',
        text: t('sidebar.adminNavigation.rubrics'),
      }}
    />
  );
  const badgesNavItem = (
    <SidebarNavItem
      {...{
        id: 'badges',
        icon: <BadgeIcon />,
        path: '/admin/badges',
        text: t('sidebar.adminNavigation.badges'),
      }}
    />
  );

  const catalogNavItems = [
    {
      id: 'tasks',
      icon: <BookOutlined />,
      path: '/admin/tasks',
      text: t('sidebar.adminNavigation.tasks'),
    },
    {
      id: 'products',
      icon: <BookOutlined />,
      path: '/admin/products',
      text: t('sidebar.adminNavigation.products'),
    },
  ].map((item) => <SidebarNavItem key={item.id} {...item} />);

  const sharedCatalogs = [
    {
      id: 'catalogs',
      icon: <BookOutlined />,
      path: '/admin/catalogs',
      text: t('sidebar.adminNavigation.catalogs'),
    },
    {
      id: 'tracks',
      icon: <BookOutlined />,
      path: '/admin/tracks',
      text: t('sidebar.adminNavigation.tracks'),
    },
    {
      id: 'units',
      icon: <BookOutlined />,
      path: '/admin/units',
      text: t('sidebar.adminNavigation.units'),
    },
  ].map((item) => <SidebarNavItem key={item.id} {...item} />);

  const maintenanceNavItem = (
    <SidebarNavItem
      key='maintenance'
      {...{
        id: 'maintenance',
        icon: <SettingsOutlined />,
        path: '/admin/maintenance',
        text: t('sidebar.adminNavigation.maintenance'),
      }}
    />
  );

  return (
    <nav className={mainNavClasses}>
      {divider(t('sidebar.adminNavigation.dc'))}
      {entitiesNavItems}
      {courseNavItems}
      {planNavItems}
      {tagsNavItem}
      {contractsNavItem}
      {checkInItems}
      {rubricsNavItem}
      {badgesNavItem}
      {divider(t('sidebar.adminNavigation.pbl'))}
      {catalogNavItems}
      {divider(t('sidebar.adminNavigation.shared'))}
      {sharedCatalogs}
      {divider()}
      {maintenanceNavItem}
    </nav>
  );
}

export default AdminNavigation;
