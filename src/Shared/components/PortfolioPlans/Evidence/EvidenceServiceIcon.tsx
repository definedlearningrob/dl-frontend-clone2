import { SERVICE_NAME } from '@shared/resources/enums';
import { cx } from '@shared/utils/cx';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as DefinedLogo } from '@shared/assets/icons/definedLogo.svg';

type Props = {
  service: SERVICE_NAME | 'PERSONAL';
};

export const EvidenceServiceIcon = ({ service }: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const badgeClassName = cx(
    'h-md flex justify-center items-center rounded-sm text-xs font-medium leading-lg group-hover/evidence-item:bg-white',
    {
      'w-md': !isFullHD,
      'w-[80px]': isFullHD,
    }
  );

  if (service === 'PERSONAL') {
    return isFullHD ? (
      <div className={cx(badgeClassName, 'bg-info-100 text-info-500')}>Defined</div>
    ) : (
      <IconContainer
        Icon={DefinedLogo}
        className='rounded-sm text-primary-500 bg-primary-200 group-hover/evidence-item:bg-white '
        paddingSize='xxs'
      />
    );
  }

  const serviceMap = {
    [SERVICE_NAME.CAREERS]: {
      label: isFullHD ? 'Careers' : 'DC',
      className: 'bg-danger-100 text-danger-500',
    },
    [SERVICE_NAME.LEARNING]: {
      label: isFullHD ? 'Learning' : 'DL',
      className: 'bg-info-100 text-info-500',
    },
  };

  return (
    <div className={cx(badgeClassName, serviceMap[service].className)}>
      {serviceMap[service].label}
    </div>
  );
};
