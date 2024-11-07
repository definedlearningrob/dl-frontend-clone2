import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, FormEventHandler } from 'react';

import { TextInput } from '@shared/components/TextInput/TextInput';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import SharedSwitch from '@shared/components/Switch/Switch';
import { ReactComponent as DeleteIcon } from '@shared/svg/delete_outlined.svg';
import { MonthRangePicker } from '@shared/MonthRangePicker/MonthRangePicker';
import { Tooltip } from '@shared/components/Tooltip';

import styles from './ComboPrompt.module.sass';

type Data = {
  description: string;
  id?: string;
  name: string;
  periodEnd: Date | null;
  periodStart: Date | null;
  show: boolean;
};

type Props = {
  errors: { name?: string; period?: string };
  placeholders: { name: string; description: string; period: string };
  data: Data;
  handleDelete: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handlePeriodChange: (dates: [Date, Date]) => void;
  groupName: string;
  showPresent?: boolean;
};

export const ComboPrompt = ({
  data,
  handleChange,
  handleDelete,
  handlePeriodChange,
  groupName,
  errors,
  placeholders,
  showPresent = false,
}: Props) => {
  const { t } = useTranslation();
  const { description, name, periodEnd, periodStart, show } = data;

  return (
    <div
      className={cx(
        styles.comboPromptWrapper,
        'flex flex-col border border-neutral-300 rounded-xs p-base bg-neutral-200 text-xs gap-sm'
      )}>
      <div className='flex w-full gap-sm'>
        <TextInput
          className='basis-1/2'
          errorMessage={errors.name}
          isRequired={true}
          label={t('comboPrompt.name')}
          name={`${groupName}.name`}
          placeholder={placeholders.name}
          value={name}
          onChange={handleChange as FormEventHandler<HTMLInputElement>}
        />
        <MonthRangePicker
          className='basis-1/2'
          dateFormat='MMM yyyy'
          isRequired={true}
          label={t('comboPrompt.period')}
          monthsShown={1}
          periodEnd={periodEnd}
          periodError={errors.period}
          periodStart={periodStart}
          placeholderText={placeholders.period}
          showMonthYearPicker={true}
          showPresent={showPresent}
          onChange={handlePeriodChange}
        />
      </div>
      <div className='flex flex-col gap-xs'>
        <label htmlFor='description'>{t('comboPrompt.description')}</label>
        <textarea
          className={cx(styles.textarea, 'border border-neutral-300 rounded-sm p-xs leading-base')}
          defaultValue={description}
          name={`${groupName}.description`}
          placeholder={placeholders.description}
          onBlur={handleChange}
        />
      </div>
      <div className='flex justify-between'>
        <SharedSwitch
          additionalLabel={t('common.actions.hide')}
          label={t('common.actions.show')}
          name={`${groupName}.visible`}
          value={show}
          onChange={handleChange}
        />
        <Tooltip delayDuration={300} message={t('common.actions.delete')}>
          <DeprecatedIconButton
            icon={<DeleteIcon />}
            size='sm'
            square={true}
            variant='danger'
            onClick={handleDelete}
          />
        </Tooltip>
      </div>
    </div>
  );
};
