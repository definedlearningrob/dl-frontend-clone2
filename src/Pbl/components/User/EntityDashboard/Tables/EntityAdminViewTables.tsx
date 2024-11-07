import i18n from 'i18next';

import Content from '@pbl/components/User/EntityDashboard/content/Content';

import SharedTabs, { type Tab } from '@shared/components/DeprecatedTabs/DeprecatedTabs';

import './EntityAdminViewTables.sass';

type Props = {
  hasChildren: boolean;
};

const usersTab: Tab = { id: 'users', label: i18n.t('user.dashboard.tables.users') };
const entitiesTab: Tab = { id: 'entities', label: i18n.t('user.dashboard.tables.entities') };

export const EntityAdminViewTables = ({ hasChildren }: Props) => {
  const tabs = [hasChildren && entitiesTab, usersTab].filter(Boolean) as Tab[];
  const defaultTabId = hasChildren ? entitiesTab.id : usersTab.id;

  return (
    <div className='entity-admin-dashboard-tables'>
      <SharedTabs defaultTabId={defaultTabId} tabs={tabs}>
        <Content />
      </SharedTabs>
    </div>
  );
};
