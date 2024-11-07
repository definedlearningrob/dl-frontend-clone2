import { VirtualInternshipHeader } from '@dc/components/VirtualInternship/VirtualInternshipHeader';

import { cleanInjection } from '@shared/utils/cleanInjection';

import { VirtualInternshipSummaryCardSkeleton } from './VirtualInternshipSummaryCardSkeleton';

type Props = {
  opportunity:
    | {
        imageUrl: string;
        name: string;
        description: string;
      }
    | undefined;
};

export const VirtualInternshipSummaryCard = ({ opportunity }: Props) => {
  if (!opportunity) {
    return <VirtualInternshipSummaryCardSkeleton />;
  }

  return (
    <VirtualInternshipHeader imageUrl={opportunity.imageUrl} title={opportunity.name}>
      {/* eslint-disable-next-line react/no-danger */}
      <p dangerouslySetInnerHTML={cleanInjection(opportunity.description)} />
    </VirtualInternshipHeader>
  );
};
