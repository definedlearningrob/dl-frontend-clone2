import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import SharedImage from '@shared/components/Image/Image';
import { Tooltip } from '@shared/components/Tooltip';
import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';
import { useDetectApplicationType } from '@shared/hooks/useDetectApplicationType';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';
import { NewTag } from '@shared/components/NewTag/NewTag';

import { GradesBadge } from '../GradesBadge/GradesBadge';

import { Track } from './types';

type Props = {
  track: Track;
};

export const TrackCard = ({ track }: Props) => {
  const { t } = useTranslation();
  const { isCareersApp } = useDetectApplicationType();

  const resourcesCount = track.resourcesCount ?? track.tasksCount;
  const resourcesLabelKey = isCareersApp
    ? 'catalogs.resourcesWithCount'
    : 'catalogs.projectsWithCount';
  const trackName = 'displayName' in track ? track.displayName : track.name;
  const trackPath = isCareersApp ? `/catalog/unit-outline/${track.id}` : `/courses/${track.id}`;

  return (
    <Link
      className='group h-full flex flex-col rounded-sm text-font-primary hover:text-font-primary bg-white border border-neutral-300 hover:border-neutral-400 hover:shadow-300 transition-shadow'
      to={trackPath}>
      <div className='relative before:bg-neutral-800 before:opacity-[48%] before:absolute before:inset-0 before:rounded-t-sm group-hover:before:opacity-0 before:transition-opacity'>
        <SharedImage
          className='rounded-t-sm h-[112px] xxxl:h-[140px] w-full object-cover'
          src={track.thumbnailUrl}
        />
      </div>
      <div className='flex-1 py-xs xxxl:py-sm px-sm border-b border-neutral-300'>
        <div className='flex gap-xxs xxxl:gap-xs mb-xs whitespace-nowrap'>
          <GradesBadge grades={track.grades} />
          <Tooltip
            className='truncate'
            delayDuration={500}
            message={t(resourcesLabelKey, { count: resourcesCount })}>
            <NewTag>{t(resourcesLabelKey, { count: resourcesCount })}</NewTag>
          </Tooltip>
        </div>
        <Tooltip delayDuration={500} message={trackName}>
          <h6 className='text-xs xxxl:text-sm line-clamp-2'>{trackName}</h6>
        </Tooltip>
        {track.shortDescription && (
          <InjectedContent
            className='text-xxs xxxl:text-xs leading-lg text-font-secondary group-hover:text-font-primary transition-colors line-clamp-4 xxxl:line-clamp-6 mb-0'
            content={track.shortDescription}
          />
        )}
      </div>
      <div className='flex items-center gap-xxs group-hover:gap-xs p-sm text-primary-500 group-hover:text-primary-600 transition-all'>
        <span className='text-xs xxxl:text-sm leading-lg font-medium'>
          {t('common.actions.view')}
        </span>
        <IconContainer Icon={ChevronRightIcon} paddingSize='none' size='sm' />
      </div>
    </Link>
  );
};
