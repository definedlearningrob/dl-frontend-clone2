import { ReactComponent as OpportunityIcon } from '@dc/assets/icons/match.svg';

import { ReactComponent as VIIcon } from '@shared/assets/icons/laptop.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  opportunitiesCount: number;
  virtualInternshipsCount: number;
};

const iconWrapperClasses =
  'p-xxs xxxl:p-xs bg-primary-200 group-hover/row:bg-white rounded-sm items-center text-primary-500 font-medium text-xxs xxxl:text-xs flex leading-lg gap-xxs xxxl:gap-xs';

export const OpportunityCell = ({ opportunitiesCount, virtualInternshipsCount }: Props) => (
  <div className='flex gap-xxs xxxl:gap-xs'>
    {opportunitiesCount > 0 && (
      <div className={iconWrapperClasses}>
        <IconContainer Icon={OpportunityIcon} className='rounded-sm' paddingSize='none' size='sm' />
        {opportunitiesCount}
      </div>
    )}
    {virtualInternshipsCount > 0 && (
      <div className={iconWrapperClasses}>
        <IconContainer Icon={VIIcon} className='rounded-sm' paddingSize='none' size='sm' />
        {virtualInternshipsCount}
      </div>
    )}
    {virtualInternshipsCount === 0 && opportunitiesCount === 0 && <div className='px-base'>-</div>}
  </div>
);
