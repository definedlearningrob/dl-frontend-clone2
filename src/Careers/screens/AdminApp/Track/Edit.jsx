import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import SharedMainContent from '@dc/shared/MainContent/MainContent';
import TrackEdit from '@dc/components/Admin/Tracks/Edit/Edit';
import trackQuery from '@dc/graphql/user/queries/track';

import SharedDataLoader from '@shared/components/DataLoader/DataLoader';
import { useNavigation } from '@shared/components/Sidebar/useNavigation';

function AdminAppTrackEdit() {
  const { id } = useParams();
  const { setBackNavButton } = useNavigation();

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return (
    <SharedMainContent>
      <SharedDataLoader
        options={{ fetchPolicy: 'network-only', variables: { id } }}
        query={trackQuery}>
        {({ track }) => <TrackEdit track={track} />}
      </SharedDataLoader>
    </SharedMainContent>
  );
}

export default AdminAppTrackEdit;
