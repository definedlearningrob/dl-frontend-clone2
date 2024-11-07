import { useTranslation } from 'react-i18next';

import { MainContent } from '@shared/components/MainContent/MainContent';

import { TrackSummary } from './TrackSummary';
import { TrackTableOfContent } from './TrackTableOfContent/TrackTableOfContent';
import { TrackUnit } from './TrackUnit';
import { TrackSkeleton } from './TrackSkeleton';

import type { DcTrack, DlTrack } from './types';

type Props = {
  track: DcTrack | DlTrack | null | undefined;
  isLoading?: boolean;
};

export const Track = ({ track, isLoading }: Props) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <TrackSkeleton />;
  }

  if (!track) {
    return <div className='text-center'>{t('common.messages.dataLoadingError')}</div>;
  }

  return (
    <MainContent className='flex gap-base xxxl:gap-md pt-xs xxxl:pt-sm'>
      <div className='flex-1 flex flex-col gap-base xxxl:gap-md'>
        <TrackSummary track={track} />
        <ul aria-label={t('catalogs.track.unitList')} className='flex flex-col gap-sm'>
          {track.units.map((unit, index) => {
            const unitName = 'displayName' in unit ? unit.displayName : unit.name;

            return (
              <li key={unit.id} aria-label={unitName}>
                <TrackUnit key={unit.id} index={index} unit={unit} />
              </li>
            );
          })}
        </ul>
      </div>
      <TrackTableOfContent units={track?.units} />
    </MainContent>
  );
};
