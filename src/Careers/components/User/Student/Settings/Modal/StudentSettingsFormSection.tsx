import { ReactNode, ChangeEvent, FC, SVGProps } from 'react';
import cx from 'classnames';

import SharedSwitch from '@shared/components/Switch/Switch';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  isEnabled: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  children: ReactNode;
  additionalSwitchLabel?: string;
  switchLabel?: string;
  alwaysEnabled?: boolean;
  activeBackground?: boolean | string;
  Icon: FC<SVGProps<SVGSVGElement>>;
};

export const StudentSettingsFormSection = ({
  isEnabled,
  name,
  children,
  onChange,
  additionalSwitchLabel,
  switchLabel,
  alwaysEnabled,
  Icon,
  activeBackground,
}: Props) => {
  const activeRow = cx(
    'flex justify-between items-center gap-base',
    'p-sm mb-sm',
    'border border-neutral-600 rounded-xs',
    'font-regular text-base leading-base ',
    {
      'rounded-lg border border-solid border-primary-500 bg-primary-200': activeBackground,
    }
  );

  return (
    <section className={activeRow}>
      <div className='flex items-center gap-base flex-grow flex-shrink-0 basis-0'>
        <div className='flex gap-sm items-start flex-grow flex-shrink-0 basis-0'>
          <div className='bg-primary-200 rounded-sm flex self-start'>
            {Icon && (
              <IconContainer
                Icon={Icon}
                className='text-primary-500'
                paddingSize='xs'
                size='base'
              />
            )}
          </div>
          <div className='flex gap-base items-start'>{children}</div>
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
      </div>
    </section>
  );
};
