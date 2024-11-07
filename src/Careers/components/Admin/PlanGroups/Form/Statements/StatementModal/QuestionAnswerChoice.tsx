import { useTranslation } from 'react-i18next';
import { useField } from 'formik';

import { ReactComponent as DragIcon } from '@dc/svg/temp/drag_handle.svg';

import { ReactComponent as DeleteIcon } from '@shared/svg/delete_outlined.svg';
import SharedFormTextInput from '@shared/components/FormTextInput/FormTextInput';
import { cx } from '@shared/utils/cx';
import { Tooltip } from '@shared/components/Tooltip';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';

type Props = {
  name: string;
  step: number;
  isDragging?: boolean;
  isDeleteDisabled?: boolean;
  onDelete: () => void;
};

export const QuestionAnswerChoice = ({
  name,
  step,
  isDragging,
  onDelete,
  isDeleteDisabled,
}: Props) => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const [answerField] = useField(`${name}.option`);

  const visibleOnHoverClasses = cx('invisible group-hover:visible', { visible: isDragging });

  return (
    <div
      className={cx(
        'group p-xs xxxl:p-x flex items-center gap-xs rounded-sm hover:bg-neutral-200 transition-colors',
        { 'bg-neutral-200': isDragging }
      )}>
      <div className='flex items-center gap-xxs'>
        <IconContainer
          Icon={DragIcon}
          className={visibleOnHoverClasses}
          paddingSize='none'
          size='sm'
        />
        <div
          className={cx(
            'p-xxs xxxl:p-xs rounded-sm bg-neutral-200 group-hover:bg-white transition-colors',
            {
              'bg-white': isDragging,
            }
          )}>
          <div className='h-base w-base text-center text-sm font-medium flex items-center justify-center'>
            {step}
          </div>
        </div>
      </div>
      <SharedFormTextInput
        {...answerField}
        className='flex-1'
        placeholder={t('admin.planGroups.statements.enterText')}
        size={isFullHD ? 'md' : 'sm'}
      />
      <Tooltip delayDuration={500} disabled={isDeleteDisabled} message={t('common.actions.remove')}>
        <DeprecatedIconButton
          className={visibleOnHoverClasses}
          disabled={isDeleteDisabled}
          icon={<DeleteIcon />}
          square={true}
          variant='danger'
          onClick={onDelete}
        />
      </Tooltip>
    </div>
  );
};
