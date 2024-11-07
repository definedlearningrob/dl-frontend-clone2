import { Link } from 'react-router-dom';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';
import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';

import { getResourcePath } from '../helpers';

import type { Resource } from '../types';

type Props = {
  resource: Resource;
  unitId: string;
};

export const ResourceLink = ({ resource, unitId }: Props) => {
  const resourceName = 'displayName' in resource ? resource.displayName : resource.name;
  const resourcePath = getResourcePath(resource, unitId);

  return (
    <Link className='flex items-center gap-xs' to={resourcePath}>
      <IconContainer
        Icon={ChevronRightIcon}
        className='rounded-xs bg-primary-200 text-primary-500'
        paddingSize='xxs'
        size='sm'
      />
      <Tooltip delayDuration={500} message={resourceName}>
        <span className='text-xxs xxxl:text-xs font-medium leading-lg line-clamp-2'>
          {resourceName}
        </span>
      </Tooltip>
    </Link>
  );
};
