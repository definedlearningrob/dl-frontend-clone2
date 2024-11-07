import cx from 'classnames';
import { startCase } from 'lodash-es';

import { Badge } from '@shared/components/Badge/Badge';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type Props = {
  type?: string | null;
  isRowSelected?: boolean;
  isOpportunity?: boolean;
};

export const PartnerListBadge = ({ isOpportunity, type, isRowSelected }: Props) => {
  const isFullHD = useBreakpointUp({
    breakpoint: 'xxxl',
  });
  const badgeSize = isFullHD ? 'base' : 'small';

  const badgeType = isOpportunity ? 'primary' : 'secondary';
  const badgeClassName = cx('whitespace-nowrap !inline-block', {
    '!bg-white !text-primary-500': isRowSelected,
  });

  if (!type) {
    return null;
  }

  return (
    <Badge className={badgeClassName} size={badgeSize} type={badgeType}>
      {startCase(type?.toLowerCase())}
    </Badge>
  );
};
