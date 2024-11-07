import { useTranslation } from 'react-i18next';

import { Tooltip } from '@shared/components/Tooltip';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import SharedSwitch from '@shared/components/Switch/Switch';

type Props = {
  onChange: () => void;
  value: boolean;
};

export const GlobalSwitch = ({ onChange, value }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col gap-xxxs xxxl:gap-xs'>
      <label className='flex items-center gap-xxs text-xxs xxxl:text-xs' htmlFor='includeGlobal'>
        {t('user.opportunities.global')}:
        <Tooltip delayDuration={300} message={t('user.opportunities.globalDescription')}>
          <IconContainer
            Icon={InfoIcon}
            className='text-neutral-400 hover:text-primary-500 transition-colors'
            paddingSize='none'
            size='sm'
          />
        </Tooltip>
      </label>
      <SharedSwitch
        className='h-md xxxl:h-[40px]'
        inputId='includeGlobal'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
