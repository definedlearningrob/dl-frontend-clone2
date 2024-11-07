import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedTableList from '@dc/shared/TableList/TableList';
import { Roles } from '@dc/resources/enums';
import { TUser } from '@dc/graphql/user/queries/systemAdminUsers';

import SharedButton from '@shared/components/Button/Button';

import './Item.sass';

type Props = {
  user: TUser;
};

function AdminUsersListItem({ user }: Props) {
  const { t } = useTranslation();
  const history = useHistory();

  const roleKey = {
    [Roles.ENTITY_ADMIN]: 'entityAdmin',
    [Roles.SALES_ADMIN]: 'salesAdmin',
    [Roles.SYSTEM_ADMIN]: 'systemAdmin',
    [Roles.TEACHER]: 'teacher',
  }[user.role];

  const onSettingsClick = () => {
    history.push(`/admin/users/${user.uuid}`);
  };

  return (
    <SharedTableList.Row>
      <SharedTableList.Cell>
        <span>
          {user.firstName} {user.lastName}
        </span>
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <span>{t(`common.roles.${roleKey}`)}</span>
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <span>{user.entity.name}</span>
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <div className='user-list-item__actions'>
          <SharedButton
            className='user-list-item__button'
            variant='success'
            onClick={onSettingsClick}>
            <>{t('common.actions.show')}</>
          </SharedButton>
        </div>
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminUsersListItem;
