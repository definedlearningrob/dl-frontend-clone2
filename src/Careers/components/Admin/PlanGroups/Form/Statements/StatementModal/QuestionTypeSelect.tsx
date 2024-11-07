import { useTranslation } from 'react-i18next';
import { getIn, useField, useFormikContext } from 'formik';
import { useMemo } from 'react';
import { isEmpty, range } from 'lodash-es';
import { makeUniqueId } from '@apollo/client/utilities';
import { SingleValue } from 'react-select';

import { STATEMENT_QUESTION_TYPE } from '@shared/resources/enums';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';
import { Select } from '@shared/components/Select';

import { QuestionAnswerChoices } from './QuestionAnswerChoices';
import { QUESTION_TYPES_WITH_OPTIONS } from './constants';

type SelectOption = { value: string; label: string };

export const QuestionTypeSelect = () => {
  const { t } = useTranslation();
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { values, setFieldValue } = useFormikContext();
  const [selectField, , selectFieldHelpers] = useField('question.questionType');

  const questionValue = getIn(values, 'question.text');

  const questionTypeOptions = useMemo(
    () =>
      Object.values(STATEMENT_QUESTION_TYPE).map((questionType) => ({
        value: questionType,
        label: t(`admin.planGroups.statementQuestionTypes.${questionType}`),
      })),
    []
  );

  const handleChange = (newValue: SingleValue<SelectOption>) => {
    selectFieldHelpers.setValue(newValue?.value);
    setFieldValue(
      'question.options',
      range(5).map(() => ({ option: '', id: makeUniqueId('StatementOption') }))
    );
  };

  const showAnswerChoices = QUESTION_TYPES_WITH_OPTIONS.includes(selectField.value);

  return (
    <>
      <Select
        className='mb-xs xxxl:mb-sm'
        isDisabled={isEmpty(questionValue)}
        label={t('admin.planGroups.statements.questionType')}
        menuPortalTarget={document.body}
        options={questionTypeOptions}
        size={isFullHD ? 'md' : 'sm'}
        value={questionTypeOptions.find((question) => question.value === selectField.value)}
        onChange={handleChange}
      />
      {showAnswerChoices && <QuestionAnswerChoices />}
    </>
  );
};
