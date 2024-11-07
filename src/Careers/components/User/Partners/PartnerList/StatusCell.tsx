import { useTranslation } from 'react-i18next';
import { Partner, PartnerStatuses } from '@graphql/dc/users/types';
import React, { SVGProps } from 'react';

import { ReactComponent as ArchiveIcon } from '@shared/assets/icons/archive.svg';
import { ReactComponent as DraftIcon } from '@shared/assets/icons/file.svg';
import { ReactComponent as PublishedIcon } from '@shared/assets/icons/checkmark_circle_outlined.svg';
import { Badge, BadgeType } from '@shared/components/Badge/Badge';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

type StatusProp = PartnerStatuses;

type PartnerColumn = Pick<
  Partner,
  | 'thumbnailUrl'
  | 'name'
  | 'visibilityScope'
  | 'status'
  | 'opportunitiesCount'
  | 'virtualInternshipsCount'
  | 'coursesCount'
  | 'email'
  | 'url'
  | 'isArchived'
>;

type Props = {
  cellParams: PartnerColumn;
};
export const StatusCell = ({ cellParams }: Props) => {
  const { status, isArchived } = cellParams;
  const isStatusArchived = isArchived && (PartnerStatuses.PUBLISHED || PartnerStatuses.DRAFT);
  const archivedStatus = isStatusArchived ? status : 'ARCHIVED';
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const statusMap: {
    [key in StatusProp]: {
      icon: React.FC<SVGProps<SVGSVGElement>>;
      type: BadgeType;
      label: string;
    };
  } = {
    [PartnerStatuses.PUBLISHED]: {
      icon: PublishedIcon,
      type: 'primary',
      label: t('partners.published').toUpperCase(),
    },
    [PartnerStatuses.DRAFT]: {
      icon: DraftIcon,
      type: 'secondary',
      label: t('partners.draft').toUpperCase(),
    },
    [archivedStatus]: {
      icon: ArchiveIcon,
      type: 'danger',
      label: t('partners.archived').toUpperCase(),
    },
  } as const;

  return (
    <Badge
      className='!text-xxs xxxl:!text-xs w-fit group-hover/row:!bg-white px-xxs xxxl:px-xs'
      size='small'
      type={statusMap[status].type}>
      <IconContainer
        Icon={statusMap[status].icon}
        className='rounded-full group-hover/row:bg-white transition-colors'
        paddingSize='none'
        size={isFullHD ? 'base' : 'sm'}
      />
      {t(`user.partners.statusType.${statusMap[status].label}`)}
    </Badge>
  );
};
