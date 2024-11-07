import { Trans, useTranslation } from 'react-i18next';

import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { useDetectApplicationType } from '@shared/hooks/useDetectApplicationType';
import SharedCard from '@shared/components/Card/Card';
import SharedImage from '@shared/components/Image/Image';
import { Kicker } from '@shared/components/Kicker';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';

import { ResourceCard } from './ResourceCard/ResourceCard';

import type { DcUnit, DlUnit } from './types';

type Props = {
  unit: DlUnit | DcUnit;
  index: number;
};

export const TrackUnit = ({ unit, index }: Props) => {
  const { t } = useTranslation();
  const { isCareersApp } = useDetectApplicationType();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const unitName = 'displayName' in unit ? unit.displayName : unit.name;
  const unitResources = 'tasks' in unit ? unit.tasks : unit.resources;

  return (
    <SharedCard key={unit.id} id={`unit-${unit.id}`}>
      <div className='flex gap-base mb-base'>
        <SharedImage
          className='rounded-sm h-[80px] xxxl:h-[124px] w-[142px] xxxl:w-[220px] shrink-0 object-cover'
          src={unit.thumbnailUrl}
        />
        <div>
          <Kicker size={isFullHD ? 'md' : 'sm'}>
            {t('catalogs.track.unitWithNumber', { number: index + 1 })}
          </Kicker>
          <h6 className='text-xs xxxl:text-sm mb-xs xxxl:mb-sm'>{unitName}</h6>
          {unit.description && (
            <InjectedContent
              className='text-xxs xxxl:text-xs leading-lg text-font-secondary'
              content={unit.description}
            />
          )}
        </div>
      </div>
      <div>
        <div className='flex gap-sm items-center text-xs xxxl:text-sm font-bold after:block after:w-full after:h-[1px] after:bg-neutral-300'>
          <span className='whitespace-nowrap'>
            <Trans
              components={{ neutralText: <span className='text-neutral-600' /> }}
              i18nKey={
                isCareersApp
                  ? 'catalogs.track.resourcesWithCount'
                  : 'catalogs.track.projectsWithCount'
              }
              values={{ count: unitResources.length }}
            />
          </span>
        </div>
        <ul className='grid grid-cols-2 xxl:grid-cols-3 gap-sm pt-sm'>
          {unitResources.map((resource) => {
            const resourceId = 'resourceId' in resource ? resource.resourceId : resource.id;

            return (
              <li key={resourceId}>
                <ResourceCard resource={resource} unitId={unit.id} />
              </li>
            );
          })}
        </ul>
      </div>
    </SharedCard>
  );
};
