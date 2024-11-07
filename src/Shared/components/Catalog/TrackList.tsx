import { cx } from '@shared/utils/cx';

import { TrackCard } from './TrackCard';
import { Track } from './types';
import { TrackListSkeleton } from './TrackListSkeleton';

type Props = {
  tracks: Track[] | undefined;
  isLoading?: boolean;
};

export const TrackList = ({ tracks, isLoading }: Props) => {
  if (isLoading) {
    return <TrackListSkeleton />;
  }

  if (!tracks) {
    return null;
  }

  const hasFullRow = tracks.length >= 5;

  return (
    <ul
      className={cx({
        'grid grid-cols-5 gap-sm': hasFullRow,
        'flex gap-sm': !hasFullRow,
      })}>
      {tracks.map((track) => {
        const trackName = 'displayName' in track ? track.displayName : track.name;

        return (
          <li
            key={track.id}
            aria-label={trackName}
            className={cx({ 'basis-[320px] xxxl:basis-[520px]': !hasFullRow })}>
            <TrackCard track={track} />
          </li>
        );
      })}
    </ul>
  );
};
