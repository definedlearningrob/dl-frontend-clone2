import { useField, useFormikContext } from 'formik';
import { ChangeEvent, useEffect } from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash-es';

import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import { useAlignToPlan } from '@shared/components/RubricsEditor/AlignToPlanModal/AlignToPlanProvider';
import { StatementValues } from '@shared/components/RubricsEditor/AlignToPlanModal/AlignToPlanModal';

type PlanStatementValues = {
  id: string;
  name: string;
  isAligned?: boolean;
};

type Props = {
  statement: PlanStatementValues;
};

export const AlignToFormPlanStatement = ({ statement }: Props) => {
  const { initialValues } = useFormikContext<StatementValues>();
  const [checkedStatementIdsInput, , helpers] = useField('statementIds');
  const { setIsDisabledAlignButton } = useAlignToPlan();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      helpers.setValue([...checkedStatementIdsInput.value, event.target.value]);
    } else {
      helpers.setValue(
        checkedStatementIdsInput.value.filter((value: string) => value !== event.target.value)
      );
    }
  };

  useEffect(() => {
    !isEmpty(checkedStatementIdsInput.value)
      ? setIsDisabledAlignButton(false)
      : setIsDisabledAlignButton(true);
  }, [checkedStatementIdsInput.value]);

  const isIdIncluded = checkedStatementIdsInput.value.includes(statement.id);

  const selectedStatementsClassname = cx('border-neutral-300 border-b px-x !m-0', {
    'bg-primary-200': isIdIncluded,
  });

  return (
    <div className={selectedStatementsClassname}>
      <div className='pl-md'>
        <SharedCheckbox
          checked={isIdIncluded}
          disabled={initialValues.statementIds.includes(statement.id)}
          label={statement.name}
          labelClassName='gap-xs text-xs xxxl:text-sm py-xs border-primary-500'
          name='checked'
          type='checkbox'
          value={statement.id}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
