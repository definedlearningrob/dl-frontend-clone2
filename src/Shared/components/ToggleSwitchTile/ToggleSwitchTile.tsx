import { ChangeEvent, FC, ReactNode, SVGProps } from 'react';

import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import SharedSwitch from '@shared/components/Switch/Switch';
import { cx } from '@shared/utils/cx';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { Tooltip } from '../Tooltip';

type Props = {
  isEnabled: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  title?: string;
  additionalInfo?: string | ReactNode;
  description?: string;
  additionalSwitchLabel?: string;
  switchLabel?: string;
  alwaysEnabled?: boolean;
  Icon: FC<SVGProps<SVGSVGElement>>;
  variant?: 'sm' | 'base';
};

export const ToggleSwitchTile = ({
  isEnabled,
  name,
  title,
  additionalInfo,
  description,
  onChange,
  additionalSwitchLabel,
  switchLabel,
  alwaysEnabled,
  Icon,
  variant = 'base',
}: Props) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const isSmall = variant === 'sm';
  const isBaseSize = variant === 'base';

  const sectionClassnames = cx(
    'flex justify-between items-center gap-xs bg-white transition-colors',
    'border border-neutral-300 rounded-xs hover:border-neutral-400',
    {
      '!border-primary-500 bg-primary-200': isEnabled,
      'py-x px-sm xxxl:p-sm': isSmall,
      'p-sm xxxl:p-base': isBaseSize,
    }
  );
  const contentClassnames = cx('flex items-start flex-grow flex-shrink-0 basis-0', {
    'gap-xs xxxl:gap-sm': isSmall,
    'gap-sm': isBaseSize,
  });

  const iconClassnames = cx('text-primary-500 rounded-sm bg-primary-200 transition-colors', {
    'bg-white': isEnabled,
  });

  const titleClassnames = cx('flex items-center gap-xs mb-xxs text-xs', {
    'xxxl:text-sm': isBaseSize,
  });

  const descriptionClassnames = cx({
    'text-xxs xxxl:text-xs': isSmall,
    'text-xs xxxl:text-sm': isBaseSize,
  });

  return (
    <section className={sectionClassnames}>
      <div className={contentClassnames}>
        {Icon && (
          <IconContainer
            Icon={Icon}
            className={iconClassnames}
            paddingSize='xs'
            size={isFullHD || isBaseSize ? 'base' : 'sm'}
          />
        )}
        <div className='leading-lg'>
          {title && (
            <h6 className={titleClassnames}>
              {title}
              {additionalInfo && (
                <Tooltip message={additionalInfo}>
                  <IconContainer
                    Icon={InfoIcon}
                    className='text-primary-500'
                    paddingSize='none'
                    size='sm'
                  />
                </Tooltip>
              )}
            </h6>
          )}
          {description && <span className={descriptionClassnames}>{description}</span>}
        </div>
      </div>
      <SharedSwitch
        additionalLabel={additionalSwitchLabel}
        alwaysEnabled={alwaysEnabled}
        data-testid={`${name}-switch`}
        label={switchLabel}
        name={name}
        value={isEnabled}
        onChange={onChange}
      />
    </section>
  );
};
