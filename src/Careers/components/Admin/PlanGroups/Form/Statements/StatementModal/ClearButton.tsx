import { useTranslation } from 'react-i18next';
import { useFormikContext } from 'formik';
import { isEmpty } from 'lodash-es';

import { EMPTY_STATEMENT_QUESTION } from '@dc/components/Admin/PlanGroups/Form/Statements/StatementModal/CreateStatementModal';

import Button from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { ReactComponent as ClearIcon } from '@shared/svg/ant-design_clear-outlined.svg';
import DeprecatedIconButton from '@shared/components/DeprecatedIconButton/DeprecatedIconButton';
import { Tooltip } from '@shared/components/Tooltip';
import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';

import { FormValues } from './StatementModal';

export const ClearButton = () => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { values, setFieldValue } = useFormikContext<FormValues>();

  const hideClearButton =
    isEmpty(values.question.text) &&
    values.question.options.every((option) => isEmpty(option.option)) &&
    values.question.questionType === STATEMENT_QUESTION_TYPE.SHORT_TEXT;

  const handleClear = () => {
    setFieldValue('question', EMPTY_STATEMENT_QUESTION);
  };

  if (hideClearButton) {
    return null;
  }

  if (isFullHD) {
    return (
      <Button Icon={ClearIcon} size='sm' variant='primary-outlined' onClick={handleClear}>
        {t('common.actions.clear')}
      </Button>
    );
  }

  return (
    <Tooltip delayDuration={500} message={t('common.actions.clear')}>
      <DeprecatedIconButton
        className='mt-[1px]'
        icon={<ClearIcon />}
        iconSize='sm'
        square={true}
        variant='primary-outlined'
        onClick={handleClear}
      />
    </Tooltip>
  );
};
