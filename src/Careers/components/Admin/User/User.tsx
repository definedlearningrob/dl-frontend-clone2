import { useMutation } from '@apollo/client';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useReducer } from 'react';
import { SingleValue, MultiValue } from 'react-select';

import updateUserMutation, {
  TUpdateUserResult,
  TUpdateUserVariables,
} from '@dc/graphql/user/mutations/updateUser';
import useUserInfo from '@dc/hooks/useUserInfo';
import { Roles } from '@dc/resources/enums';
import { TUser, TUserPermissions } from '@dc/graphql/user/queries/user';
import { TUserInfo } from '@dc/graphql/user/queries/userInfo';

import SharedButton from '@shared/components/Button/Button';
import { Permissions } from '@shared/resources/enums';
import { callToast } from '@shared/components/Toaster/Toaster';
import { Select } from '@shared/components/Select';

import './User.sass';

type Props = {
  user: TUser;
};

enum UserActionType {
  CHANGE_ROLE = 'CHANGE_ROLE',
  CHANGE_PERMISSIONS = 'CHANGE_PERMISSIONS',
}

type UserAction = {
  type: UserActionType;
  payload: SingleValue<UserRoles> | MultiValue<UserPermissions>;
};

type UserState = {
  selectedRole: SingleValue<UserRoles>;
  selectedPermissions: MultiValue<UserPermissions>;
};

type UserRoles = {
  value: Roles;
  label: string;
};

type UserPermissions = {
  value: Permissions;
  label: string;
};

function reducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case UserActionType.CHANGE_ROLE: {
      return {
        ...state,
        selectedRole: action.payload as SingleValue<UserRoles>,
      };
    }
    case UserActionType.CHANGE_PERMISSIONS: {
      return {
        ...state,
        selectedPermissions: action.payload as MultiValue<UserPermissions>,
      };
    }
  }
}
export const AdminUser = ({ user }: Props) => {
  const { t } = useTranslation();
  const { userUuid } = useParams<{ userUuid: string }>();
  const { isSelf } = useUserInfo<TUserInfo>();
  const [mutateUpdateUser, { loading }] = useMutation<TUpdateUserResult, TUpdateUserVariables>(
    updateUserMutation
  );
  const roleOptions: UserRoles[] = [
    { value: Roles.ENTITY_ADMIN, label: t('common.roles.entityAdmin') },
    { value: Roles.SALES_ADMIN, label: t('common.roles.salesAdmin') },
    { value: Roles.SYSTEM_ADMIN, label: t('common.roles.systemAdmin') },
    { value: Roles.TEACHER, label: t('common.roles.teacher') },
  ];

  const permissionOptions: UserPermissions[] = [
    { value: Permissions.WBL_ADMIN, label: t('common.permissions.wbl') },
    { value: Permissions.COUNSELOR, label: t('common.permissions.counselor') },
    { value: Permissions.IMPERSONATE, label: t('common.permissions.impersonate') },
    { value: Permissions.REPORTS, label: t('common.permissions.reports') },
  ];

  const DEFAULT_ROLE_INDEX = roleOptions.length - 1;

  const selectedOption =
    roleOptions.find((role) => role.value === user.role) || roleOptions[DEFAULT_ROLE_INDEX];

  const initialState = {
    selectedRole: selectedOption,
    selectedPermissions: permissionOptions.filter(
      (permission) => user.permissions[permission.value]
    ),
  };

  const [{ selectedPermissions, selectedRole }, dispatch] = useReducer(reducer, initialState);

  const handleSave = async () => {
    if (!selectedRole) return;

    const selectedPermissionsValues = selectedPermissions.map((permission) => permission.value);
    const newPermissions = permissionOptions.reduce((acc, permission) => {
      acc[permission.value] = selectedPermissionsValues.includes(permission.value);

      return acc;
    }, {} as TUserPermissions);

    await mutateUpdateUser({
      variables: {
        input: {
          uuid: userUuid,
          role: selectedRole.value,
          permissions: newPermissions,
        },
      },
    });

    callToast(
      'success',
      t('common.notifications.success.updated', { name: t('admin.user.label') })
    );
  };

  const onRoleChange = (selectedRole: SingleValue<UserRoles>) => {
    dispatch({ type: UserActionType.CHANGE_ROLE, payload: selectedRole });
  };

  const onPermissionsChange = (selectedPermissions: MultiValue<UserPermissions> | null) => {
    dispatch({ type: UserActionType.CHANGE_PERMISSIONS, payload: selectedPermissions });
  };

  return (
    <section className='admin-user'>
      <h1 className='admin-user__heading'>
        {user.firstName} {user.lastName}
      </h1>
      <p className='admin-user__sub-heading'>{user.email}</p>
      <div className='flex flex-col gap-sm'>
        <Select
          isDisabled={isSelf(userUuid)}
          label={t('common.fields.user.role')}
          options={roleOptions}
          value={selectedRole}
          onChange={onRoleChange}
        />
        <Select
          isDisabled={isSelf(userUuid)}
          isMulti={true}
          label={t('common.fields.user.permissions')}
          options={permissionOptions}
          value={selectedPermissions}
          onChange={onPermissionsChange}
        />
      </div>

      <SharedButton
        className='admin-user__button'
        isLoading={loading}
        size='md'
        variant='primary'
        onClick={handleSave}>
        {t('common.actions.save')}
      </SharedButton>
    </section>
  );
};
