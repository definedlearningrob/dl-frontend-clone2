import { Content } from '@pbl/components/User/AdminDashboard/Content/Content';
import { SharedTabs } from '@pbl/components/User/AdminDashboard/context/SharedTabs';
import { renderDashboardTabs } from '@pbl/components/User/AdminDashboard/DashboardTabs/renderDashboardTabs';

import styles from './AdminDashboard.module.sass';
import '@dc/components/User/Dashboard/EntityAdminView/Skeleton/Skeleton.sass';

export const AdminDashboard = () => (
  <div className={styles.adminDashboard}>
    <SharedTabs tabs={renderDashboardTabs()}>
      <Content />
    </SharedTabs>
  </div>
);
