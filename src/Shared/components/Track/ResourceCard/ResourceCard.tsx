import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash-es';

import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import SharedImage from '@shared/components/Image/Image';
import { Tooltip } from '@shared/components/Tooltip';
import { InjectedContent } from '@shared/components/IncjectedContent/InjectedContent';

import { getResourcePath } from '../helpers';

import { PathwayBadge } from './PathwayBadge';
import { ResourceTypeIcon } from './ResourceTypeIcon';

import type { Resource } from '../types';

type Props = {
  resource: Resource;
  unitId: string;
};

export const ResourceCard = ({ resource, unitId }: Props) => {
  const { t } = useTranslation();
  const location = useLocation();

  const resourceName = 'displayName' in resource ? resource.displayName : resource.name;
  const resourcePath = getResourcePath(resource, unitId);
  const hasPathway = 'pathways' in resource && !isEmpty(resource.pathways);
  const hasResourceType = 'resourceType' in resource;

  return (
    <Link
      className='group h-full flex flex-col rounded-sm text-font-primary hover:text-font-primary bg-white border border-neutral-300 hover:border-neutral-400 hover:shadow-300 transition-shadow'
      to={{
        pathname: resourcePath,
        state: { from: location.pathname },
      }}>
      <div className='relative before:bg-neutral-800 before:opacity-[48%] before:absolute before:inset-0 before:rounded-t-sm group-hover:before:opacity-0 before:transition-opacity'>
        <SharedImage
          className='rounded-t-sm h-[180px] xxxl:h-[192px] w-full object-cover'
          fallbackSrc={resource.imageUrl ?? undefined}
          src={resource.thumbnailUrl ?? undefined}
        />
        {hasResourceType && (
          <ResourceTypeIcon
            isVirtualInternship={resource.isVirtualInternship}
            resourceType={resource.resourceType}
          />
        )}
      </div>
      <div className='flex-1 py-xs xxxl:py-sm px-sm border-b border-neutral-300'>
        {hasPathway && <PathwayBadge pathways={resource.pathways} />}
        <Tooltip delayDuration={500} message={resourceName}>
          <h6 className='text-xs xxxl:text-sm line-clamp-2'>{resourceName}</h6>
        </Tooltip>
        {resource.description && (
          <InjectedContent
            className='text-xxs xxxl:text-xs leading-lg text-font-secondary group-hover:text-font-primary transition-colors line-clamp-4 xxxl:line-clamp-6'
            content={resource.description}
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
