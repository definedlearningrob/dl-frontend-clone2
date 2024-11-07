import { useTranslation } from 'react-i18next';

import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import { TPaginatedLoaderParams } from '@dc/shared/PaginatedLoader/PaginatedLoader';
import { TUsers } from '@dc/graphql/user/queries/systemAdminUsers';

import AdminUsersListItem from './Item/Item';

type Props = {
  pagingProps: TPaginatedLoaderParams<TUsers>;
};

function AdminUsersList({ pagingProps }: Props) {
  const { t } = useTranslation();

  const headers = [
    { label: t('common.fields.common.name'), id: 'name' },
    { label: t('common.fields.user.role'), id: 'role' },
    { label: t('common.fields.common.entity'), id: 'entity' },
  ];

  return (
    <AdminSharedList
      headers={headers}
      itemsKey='adminDashboard.users'
      pagingProps={pagingProps}
      skipManagement={true}>
      {(item) => <AdminUsersListItem key={item.uuid} user={item} />}
    </AdminSharedList>
  );
}

export default AdminUsersList;
