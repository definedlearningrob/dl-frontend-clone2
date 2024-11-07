import { ApplicationStatus } from '@graphql/dc/shared/types';
import { VirtualInternshipStatuses } from '@graphql/dc/students/types';

import { getOpportunityBadgeType } from '@dc/components/Opportunities/helpers';

const testCases = [
  ['info', ApplicationStatus.PENDING, undefined],
  ['secondary', ApplicationStatus.STARTED, undefined],
  ['success', ApplicationStatus.ACCEPTED, undefined],
  ['danger', ApplicationStatus.REJECTED, undefined],
  ['neutral', 'EXPIRED', undefined],
  ['success', ApplicationStatus.FINISHED, undefined],
  ['neutral', ApplicationStatus.ACCEPTED, VirtualInternshipStatuses.NOT_STARTED],
  ['secondary', ApplicationStatus.ACCEPTED, VirtualInternshipStatuses.IN_PROGRESS],
  ['success', ApplicationStatus.ACCEPTED, VirtualInternshipStatuses.COMPLETED],
  ['danger', ApplicationStatus.REJECTED, VirtualInternshipStatuses.COMPLETED],
];

describe('getOpportunityBadgeType', () => {
  it.each(testCases)(
    'should return "%s" for "%s" opportunity status and "%s" virtual internship status',
    (expected, status, virtualInternshipStatus) => {
      expect(
        getOpportunityBadgeType(
          status as ApplicationStatus | 'EXPIRED',
          virtualInternshipStatus as VirtualInternshipStatuses
        )
      ).toBe(expected);
    }
  );
});
