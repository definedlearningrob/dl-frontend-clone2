import { useTranslation } from 'react-i18next';

import SharedAvatar from '@shared/components/Avatar/Avatar';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { ReactComponent as RemoveIcon } from '@shared/svg/close.svg';
import { Tooltip } from '@shared/components/Tooltip';

import { TreeSelectOption } from './TreeSelectListItem';

type Props = {
  option: TreeSelectOption;
  onRemove: (value: string) => void;
};

export const SelectedValueChip = ({ option, onRemove }: Props) => {
  const { t } = useTranslation();
  const { label, value, withAvatar } = option;

  const handleRemove = () => {
    onRemove(value);
  };

  return (
    <div
      className='flex gap-xxs items-center p-xxs rounded-xs bg-neutral-200'
      data-testid='selected-value-chip'>
      <div className='flex items-center gap-xs'>
        {withAvatar && (
          <div className='rounded-full outline outline-1 outline-neutral-300'>
            <SharedAvatar label={label} size='24' theme='light' />
          </div>
        )}
        <span className='whitespace-nowrap text-xs text-font-secondary'>{label}</span>
      </div>
      <Tooltip delayDuration={500} message={t('common.actions.remove')}>
        <DeprecatedIconButton
          aria-label={t('components.treeSelectList.removeOption', { option: label })}
          className='!p-0'
          icon={<RemoveIcon />}
          onClick={handleRemove}
        />
      </Tooltip>
    </div>
  );
};
