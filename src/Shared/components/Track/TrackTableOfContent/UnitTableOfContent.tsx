import { useTranslation } from 'react-i18next';

import { cx } from '@shared/utils/cx';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as ArrowDownIcon } from '@shared/svg/arrow_downward.svg';
import { Kicker } from '@shared/components/Kicker';

import { DcUnit, DlUnit } from '../types';

import { ResourceLink } from './ResourceLink';

type Props = {
  unit: DcUnit | DlUnit;
  index: number;
};

const appHeaderHeight = 48;
const viewPadding = 8;

export const UnitTableOfContent = ({ unit, index }: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const unitListClasses = cx(
    'relative flex flex-col gap-xs xxxl:gap-sm',
    'after:w-full after:h-[1px] after:bg-neutral-300 after:absolute after:-bottom-sm after:xxxl:-bottom-base last:after:content-none'
  );

  const handleUnitClick = (id: string) => {
    const unitSection = id && document.getElementById(id);
    if (unitSection) {
      window.scrollTo({
        top: unitSection.offsetTop - appHeaderHeight - viewPadding,
        behavior: 'smooth',
      });
    }
  };

  const unitName = 'displayName' in unit ? unit.displayName : unit.name;
  const unitResources = 'tasks' in unit ? unit.tasks : unit.resources;

  return (
    <div key={unit.id} className={unitListClasses}>
      <button className='flex gap-xs text-left' onClick={() => handleUnitClick(`unit-${unit.id}`)}>
        <IconContainer
          Icon={ArrowDownIcon}
          className='bg-neutral-200 rounded-sm text-primary-500'
          size={isFullHD ? 'base' : 'sm'}
        />
        <div>
          <Kicker className='!mb-xxs xxxl:!mb-xs' size={isFullHD ? 'md' : 'sm'} variant='dark'>
            {t('catalogs.track.unitWithNumber', { number: index + 1 })}
          </Kicker>
          <h6 className='text-xs xxxl:text-sm mb-0 text-primary-500'>{unitName}</h6>
        </div>
      </button>
      <ul className='pt-xs px-base xxxl:px-md flex flex-col gap-xs xxxl:gap-x'>
        {unitResources.map((resource) => {
          const resourceId = 'resourceId' in resource ? resource.resourceId : resource.id;

          return (
            <li key={resourceId}>
              <ResourceLink resource={resource} unitId={unit.id} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
