import { useTranslation } from 'react-i18next';

import Content from '@dc/components/User/Dashboard/SystemAdminView/Content/Content';
import SharedTabs from '@dc/components/Portfolio/Tabs/Tabs';
import '@dc/components/User/Dashboard/SystemAdminView/SystemAdminView.sass';

function UserDashboardSystemAdminView() {
  const { t } = useTranslation();

  const tabs = [
    { id: 'entities', label: t('user.dashboard.tables.entities') },
    { id: 'users', label: t('user.dashboard.tables.users') },
  ];

  return (
    <div className='system-admin-view' data-testid='admin-view'>
      <SharedTabs tabs={tabs}>
        <Content />
      </SharedTabs>
    </div>
  );
}

export default UserDashboardSystemAdminView;
