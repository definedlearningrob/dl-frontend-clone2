import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import AdminUnitsEdit from '@dc/components/Admin/Units/Edit/Edit';
import SharedMainContent from '@dc/shared/MainContent/MainContent';
import { UNIT } from '@dc/graphql/user/queries/unit';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminAppUnitEdit() {
  const { id } = useParams<{ id: string }>();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <SharedMainContent>
      <SharedDataLoader options={{ fetchPolicy: 'network-only', variables: { id } }} query={UNIT}>
        {({ unit }) => <AdminUnitsEdit unit={unit} />}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppUnitEdit;
