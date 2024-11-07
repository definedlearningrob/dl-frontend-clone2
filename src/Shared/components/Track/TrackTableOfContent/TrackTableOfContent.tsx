import { useTranslation } from 'react-i18next';

import SharedCard from '@shared/components/Card/Card';
import { cx } from '@shared/utils/cx';

import { DcTrack, DlTrack } from '../types';

import { UnitTableOfContent } from './UnitTableOfContent';

type Props = {
  units: DlTrack['units'] | DcTrack['units'];
};

export const TrackTableOfContent = ({ units }: Props) => {
  const { t } = useTranslation();

  const cardClasses = cx(
    'basis-[318px] xxxl:basis-[512px] grow-0 shrink-0',
    'max-h-[calc(theme(layout.containerHeight)-32px)] xxxl:max-h-[calc(theme(layout.containerHeight)-48px)]',
    'scrollbar sticky top-[56px] xxxl:top-[64px]'
  );

  if (!units) {
    return null;
  }

  return (
    <SharedCard className={cardClasses} dataTestId='table-of-content' withoutPadding={true}>
      <div className='p-base pb-sm xxxl:p-md bg-white sticky top-0 z-lower'>
        <h5 className='text-sm xxxl:text-base mb-0'>{t('catalogs.track.unitOutlineContent')}</h5>
      </div>
      <div className='flex flex-col gap-md xxxl:gap-lg p-base xxxl:p-md !pt-0'>
        {units.map((unit, index) => (
          <UnitTableOfContent key={unit.id} index={index} unit={unit} />
        ))}
      </div>
    </SharedCard>
  );
};
