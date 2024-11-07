import { match } from 'ts-pattern';
import { ApplicationStatus } from '@graphql/dc/shared/types';
import { VirtualInternshipStatuses } from '@graphql/dc/students/types';

import { BadgeType } from '@shared/components/Badge/Badge';

export const getOpportunityBadgeType = (
  status: ApplicationStatus | 'EXPIRED' | undefined | null,
  virtualInternshipStatus: VirtualInternshipStatuses | undefined
) =>
  match({ status, virtualInternshipStatus })
    .returnType<BadgeType>()
    .with(
      {
        status: 'EXPIRED',
      },
      () => 'neutral'
    )
    .with(
      {
        status: ApplicationStatus.STARTED,
        virtualInternshipStatus: undefined,
      },
      {
        status: ApplicationStatus.ACCEPTED,
        virtualInternshipStatus: VirtualInternshipStatuses.IN_PROGRESS,
      },
      () => 'secondary'
    )
    .with(
      {
        status: ApplicationStatus.PENDING,
        virtualInternshipStatus: undefined,
      },
      () => 'info'
    )
    .with(
      {
        status: ApplicationStatus.ACCEPTED,
        virtualInternshipStatus: undefined,
      },
      {
        status: ApplicationStatus.ACCEPTED,
        virtualInternshipStatus: VirtualInternshipStatuses.COMPLETED,
      },
      {
        status: ApplicationStatus.FINISHED,
      },
      () => 'success'
    )
    .with(
      {
        status: ApplicationStatus.REJECTED,
      },
      () => 'danger'
    )
    .otherwise(() => 'neutral');
