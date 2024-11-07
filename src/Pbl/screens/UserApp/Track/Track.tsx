import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDlTrackQuery } from '@graphql/dl/users/hooks';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { Track as TrackContent } from '@shared/components/Track/Track';

export const Track = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { setBackNavButton } = useNavigation();
  const { data, loading } = useDlTrackQuery({ variables: { id: courseId } });

  useEffect(() => {
    setBackNavButton(true, '/');

    return () => setBackNavButton(false);
  }, []);

  return <TrackContent isLoading={loading} track={data?.track} />;
};
