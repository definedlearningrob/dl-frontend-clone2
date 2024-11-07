import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { AdminUser } from '@dc/components/Admin/User/User';
import userQuery, { TUserData, TUserVariables } from '@dc/graphql/user/queries/user';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminAppUser() {
  const { userUuid } = useParams<{ userUuid: string }>();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => setBackNavButton(false);
  }, []);

  return (
    <SharedMainContent>
      <SharedDataLoader<TUserData, TUserVariables>
        options={{ fetchPolicy: 'network-only', variables: { uuid: userUuid } }}
        query={userQuery}>
        {({ user }) => <AdminUser user={user} />}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppUser;
