import { TOpportunity } from '@dc/resources/types';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as ArrowIcon } from '@shared/svg/arrow_forward.svg';

import { OpportunityContextMenu } from './OpportunityContextMenu/OpportunityContextMenu';

type Props = {
  canManageOpportunities: boolean;
  opportunity: Pick<TOpportunity, 'id' | 'visibilityScope' | 'opportunityType' | 'periodEnd'>;
  onArchive: () => void;
};

export const OpportunityActions = ({ canManageOpportunities, opportunity, onArchive }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  if (canManageOpportunities) {
    return <OpportunityContextMenu opportunity={opportunity} onArchive={onArchive} />;
  }

  return (
    <IconContainer
      Icon={ArrowIcon}
      className='text-primary-500 hidden group-hover/row:block ml-auto'
      paddingSize='none'
      size={isFullHD ? 'md' : 'base'}
    />
  );
};
