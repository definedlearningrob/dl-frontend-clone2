import { match } from 'ts-pattern';
import { useTranslation } from 'react-i18next';
import { UnitResourceTypes } from '@graphql/dc/shared/types';

import { ReactComponent as OpportunityIcon } from '@dc/svg/match.svg';

import { ReactComponent as CourseIcon } from '@shared/svg/book_opened.svg';
import { ReactComponent as VirtualInternshipIcon } from '@shared/svg/laptop.svg';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { Tooltip } from '@shared/components/Tooltip';

type Props = {
  resourceType: UnitResourceTypes;
  isVirtualInternship: boolean | null;
};

export const ResourceTypeIcon = ({ resourceType, isVirtualInternship }: Props) => {
  const { t } = useTranslation();

  const { Icon, label } = match({ resourceType, isVirtualInternship })
    .with({ resourceType: UnitResourceTypes.COURSE }, () => ({
      Icon: CourseIcon,
      label: t('catalogs.track.course'),
    }))
    .with({ resourceType: UnitResourceTypes.OPPORTUNITY, isVirtualInternship: false }, () => ({
      Icon: OpportunityIcon,
      label: t('catalogs.track.opportunity'),
    }))
    .with({ resourceType: UnitResourceTypes.OPPORTUNITY, isVirtualInternship: true }, () => ({
      Icon: VirtualInternshipIcon,
      label: t('catalogs.track.virtualInternship'),
    }))
    .otherwise(() => ({
      Icon: CourseIcon,
      label: t('catalogs.track.course'),
    }));

  return (
    <Tooltip className='absolute top-sm left-sm' delayDuration={500} message={label}>
      <IconContainer Icon={Icon} className='rounded-sm bg-white text-primary-500' />
    </Tooltip>
  );
};
