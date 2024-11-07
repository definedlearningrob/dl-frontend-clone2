import { useCatalogTrackQuery } from '@graphql/dc/shared/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useNavigation } from '@shared/components/Sidebar/useNavigation';
import { Track } from '@shared/components/Track/Track';

export const CatalogTrack = () => {
  const { setBackNavButton } = useNavigation();
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useCatalogTrackQuery({ variables: { id } });

  useEffect(() => {
    setBackNavButton(true);

    return () => {
      setBackNavButton(false);
    };
  }, []);

  return <Track isLoading={loading} track={data?.careersCatalog?.track} />;
};
