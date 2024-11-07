import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import { ChangeEvent } from 'react';

import SharedSwitch from '@shared/components/Switch/Switch';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import { ReactComponent as InfoIcon } from '@shared/svg/info_outlined.svg';
import { Tooltip } from '@shared/components/Tooltip';

export const AutomaticAcceptanceSwitch = () => {
  const { t } = useTranslation();
  const [field, , helpers] = useField('automaticAcceptance');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(event.target.checked);
  };

  return (
    <div className='flex items-center gap-xxs'>
      <SharedSwitch
        className='text-xs'
        label={t('user.opportunities.form.setAutomaticAcceptance')}
        value={field.value}
        onChange={handleChange}
      />
      <Tooltip message={t('user.opportunities.form.automaticAcceptanceInfo')} side='bottom'>
        <IconContainer Icon={InfoIcon} className='text-font-secondary' paddingSize='none' />
      </Tooltip>
    </div>
  );
};
