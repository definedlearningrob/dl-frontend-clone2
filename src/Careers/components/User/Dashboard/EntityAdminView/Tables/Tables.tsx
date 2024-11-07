import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import './Tables.sass';

import SharedFilterProvider from '@dc/shared/FilterProvider/FilterProvider';
import EntitiesList from '@dc/components/User/Dashboard/EntityAdminView/Tables/EntitiesList/EntitiesList';
import UsersList from '@dc/components/User/Dashboard/EntityAdminView/Tables/UsersList/UsersList';
import useUserInfo from '@dc/hooks/useUserInfo';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import { Tabs, type Tab } from '@shared/components/Tabs/Tabs';

type Props = {
  hasChildren: boolean;
};

function UserDashboardEntityAdminViewTables({ hasChildren }: Props) {
  const { t } = useTranslation();

  const usersTab: Tab = { tabId: 'users', label: t('user.dashboard.tables.users') };
  const entitiesTab: Tab = { tabId: 'entities', label: t('user.dashboard.tables.entities') };

  const tabs = [hasChildren && entitiesTab, usersTab].filter(Boolean) as Tab[];
  const defaultTabId = hasChildren ? entitiesTab.tabId : usersTab.tabId;

  const {
    userInfo: { entities },
  } = useUserInfo<TUserInfo>();

  const { uuid } = useParams<{ uuid: string }>();

  const entityUuid = uuid || entities.nodes[0].uuid;

  const getFilterConfig = (tabId: string) => {
    const isEntityTab = tabId === 'entities';

    return isEntityTab
      ? {
          field: 'name',
          placeholder: t('common.placeholders.searchFor', {
            field: t('common.fields.entity.entities').toLowerCase(),
          }),
        }
      : {
          field: 'fullName',
          placeholder: t('common.placeholders.searchFor', {
            field: t('common.fields.common.users').toLowerCase(),
          }),
        };
  };

  return (
    <div className='entity-admin-dashboard-tables'>
      <Tabs defaultTabId={defaultTabId}>
        {tabs.map((tab) => {
          const filterConfig = getFilterConfig(tab.tabId);

          return (
            <Tabs.Content key={tab.tabId} tabId={tab.tabId}>
              <SharedFilterProvider>
                {({ filter, ...filterProps }) => (
                  <>
                    <header className='entity-admin-dashboard-tables__header'>
                      <Tabs.List fullWidth={false} tabs={tabs} />
                      <SharedFilterProvider.Search
                        className='entity-admin-dashboard-tables__filter'
                        field={filterConfig.field}
                        placeholder={filterConfig.placeholder}
                        {...filterProps}
                      />
                    </header>
                    {tab.tabId === 'entities' && (
                      <EntitiesList entityUuid={entityUuid} filter={filter} />
                    )}
                    {tab.tabId === 'users' && <UsersList entityUuid={entityUuid} filter={filter} />}
                  </>
                )}
              </SharedFilterProvider>
            </Tabs.Content>
          );
        })}
      </Tabs>
    </div>
  );
}

export default UserDashboardEntityAdminViewTables;
