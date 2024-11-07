import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { useToggle } from 'react-use';

import SharedCard from '@shared/components/Card/Card';
import SharedImage from '@shared/components/Image/Image';
import { NewTag } from '@shared/components/NewTag/NewTag';
import { useDetectApplicationType } from '@shared/hooks/useDetectApplicationType';
import { useIsTruncated } from '@shared/hooks/useIsTruncated';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';
import { cx } from '@shared/utils/cx';
import Button from '@shared/components/Button/Button';
import { ReactComponent as ChevronDownIcon } from '@shared/svg/chevron_down.svg';
import { ReactComponent as ChevronUpIcon } from '@shared/svg/chevron_up.svg';
import { GradesBadge } from '@shared/components/GradesBadge';

import { DcTrack, DlTrack } from './types';

type Props = {
  track: DcTrack | DlTrack;
};

export const TrackSummary = ({ track }: Props) => {
  const { t } = useTranslation();
  const { isCareersApp } = useDetectApplicationType();
  const trackDescriptionRef = useRef<HTMLDivElement>(null);
  const [isExpanded, toggleIsExpanded] = useToggle(false);
  const isTruncated = useIsTruncated({ ref: trackDescriptionRef });

  const resourcesCount = 'resourcesCount' in track ? track.resourcesCount : track.tasksCount;
  const resourcesLabelKey = isCareersApp
    ? 'catalogs.resourcesWithCount'
    : 'catalogs.projectsWithCount';
  const buttonLabel = isExpanded ? t('common.actions.showLess') : t('common.actions.showMore');
  const trackName = 'displayName' in track ? track.displayName : track.name;

  return (
    <SharedCard className='flex gap-base xxxl:gap-md' dataTestId='track-summary-card'>
      <SharedImage
        className='rounded-sm h-[120px] xxxl:h-[180px] w-[213px] xxxl:w-[320px] shrink-0 object-cover'
        src={track.thumbnailUrl}
      />
      <div className='flex flex-col gap-sm'>
        <div className='flex flex-col gap-xs'>
          <div className='flex gap-xs xxxl:gap-sm'>
            <GradesBadge grades={track.grades} isTooltipDisabled={true} />
            <NewTag>{t(resourcesLabelKey, { count: resourcesCount })}</NewTag>
          </div>
          <h5 className='mb-0 text-sm xxxl:text-base'>{trackName}</h5>
        </div>
        {track.description && (
          <InjectedContent
            ref={trackDescriptionRef}
            className={cx('text-xxs xxxl:text-xs leading-lg text-font-secondary', {
              'line-clamp-3': !isExpanded,
            })}
            content={track.description}
          />
        )}
        {(isTruncated || isExpanded) && (
          <Button
            Icon={isExpanded ? ChevronUpIcon : ChevronDownIcon}
            className='self-start hover:!no-underline'
            contentClassName='text-primary-500'
            iconClassName='text-primary-500'
            size='sm'
            variant='link'
            onClick={toggleIsExpanded}>
            {buttonLabel}
          </Button>
        )}
      </div>
    </SharedCard>
  );
};
