import { useTranslation } from 'react-i18next';

import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as RemoveIcon } from '@shared/svg/close.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { Option } from '@shared/components/MultilineSelect/MultilineSelect';

type Props = {
  option: Option;
  onRemove: (value: string) => void;
};

export const SelectedValueChip = ({ option, onRemove }: Props) => {
  const { t } = useTranslation();

  const { label, value } = option;

  return (
    <div
      className='flex gap-xxs items-center p-xxs rounded-xs bg-neutral-200'
      data-testid='selected-value-chip'>
      <div className='flex items-center gap-xs whitespace-pre-line text-xxs xxxl:text-xs text-font-secondary'>
        {label}
      </div>
      <Tooltip delayDuration={500} message={t('common.actions.remove')}>
        <DeprecatedIconButton
          aria-label={t('components.treeSelectList.removeOption', { option: label })}
          className='!p-0'
          icon={<RemoveIcon />}
          onClick={(e) => {
            e.preventDefault();
            onRemove(value);
          }}
        />
      </Tooltip>
    </div>
  );
};
