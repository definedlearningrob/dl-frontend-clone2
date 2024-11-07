import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedFilterProvider from '@dc/components/shared/FilterProvider/FilterProvider';

import useUserInfo from '@pbl/hooks/useUserInfo';
import { UsersList } from '@pbl/components/User/EntityDashboard/UsersList/UsersList';
import { TUserInfo } from '@pbl/graphql/user/queries/userInfo';
import { EntitiesList } from '@pbl/components/User/EntityDashboard/EntitiesList/EntitiesList';

import SharedTabs, { useTabsContext } from '@shared/components/DeprecatedTabs/DeprecatedTabs';

export const TABS_IDS = {
  ENTITIES: 'entities',
  USERS: 'users',
};

type EntityParams = {
  uuid: string;
};

export const UserDashboardEntityAdminViewTablesContent = () => {
  const {
    userInfo: { entities },
  } = useUserInfo<TUserInfo>();
  const { uuid } = useParams<EntityParams>();
  const { tab, resetTabs } = useTabsContext();
  const { t } = useTranslation();
  const entityUuid = uuid || entities.nodes[0].uuid;
  const isEntities = tab?.id === TABS_IDS.ENTITIES;
  const filterConfig = {
    field: isEntities ? 'name' : 'fullName',
    placeholder: isEntities
      ? t('common.placeholders.searchFor', {
          field: t('common.fields.entity.entities').toLowerCase(),
        })
      : t('common.placeholders.searchFor', {
          field: t('common.fields.common.users').toLowerCase(),
        }),
  };

  useEffect(() => {
    resetTabs();
  }, [uuid]);

  return (
    <div>
      <SharedFilterProvider>
        {({ filter, ...filterProps }) => (
          <>
            <header className='entity-admin-dashboard-tables__header'>
              <SharedTabs.Tabs />
              <SharedFilterProvider.Search
                className='entity-admin-dashboard-tables__filter'
                field={filterConfig.field}
                placeholder={filterConfig.placeholder}
                {...filterProps}
              />
            </header>
            {isEntities && <EntitiesList entityUuid={entityUuid} filter={filter} />}
            {!isEntities && <UsersList entityUuid={entityUuid} filter={filter} />}
          </>
        )}
      </SharedFilterProvider>
    </div>
  );
};

export default UserDashboardEntityAdminViewTablesContent;
