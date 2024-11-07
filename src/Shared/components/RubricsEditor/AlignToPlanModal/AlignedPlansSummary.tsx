import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import { difference, isEmpty } from 'lodash-es';
import cx from 'classnames';

import { TPlanStatement } from '@dc/graphql/user/queries/plansWithAlignmentStatement';

import Button from '@shared/components/Button/Button';
import { ReactComponent as AddIconIcon } from '@shared/assets/icons/add.svg';
import { AlignToFormAlignmentDetails } from '@shared/components/RubricsEditor/AlignToPlanModal/AlignToFormAlignmentDetails';
import { EmptyAlignmentState } from '@shared/components/RubricsEditor/AlignToPlanModal/EmptyAlignmentState';

export type NormalizedStatement = {
  groupName: string;
  statement: TPlanStatement;
  planName: string;
};

type Props = {
  onAction: () => void;
  onAdd: () => void;
  normalizedStatements: NormalizedStatement[];
};

export const AlignedPlansSummary = ({ onAction, normalizedStatements, onAdd }: Props) => {
  const { t } = useTranslation();
  const [statementIdsField, statementIdsMeta] = useField('statementIds');
  const { initialValue } = statementIdsMeta;
  const alignmentsToShow = normalizedStatements
    .filter((normalizedStatement) =>
      statementIdsField.value.includes(normalizedStatement.statement.id)
    )
    .sort((a) => (initialValue.includes(a.statement.id) ? 1 : -1));

  if (isEmpty(statementIdsField.value)) {
    return <EmptyAlignmentState onCreateNewPlan={onAction} />;
  }

  return (
    <div className='flex flex-col h-full gap-base'>
      <div className='flex items-center justify-between'>
        <h5 className='text-neutral-800 block text-base mb-0'>
          {t('components.rubric.alignPlans.alignmentTitle')}{' '}
          <span className='text-neutral-600'>({alignmentsToShow.length})</span>
        </h5>
        <div className='flex gap-sm justify-end items-center pb-0'>
          <Button Icon={AddIconIcon} size='sm' variant='primary-outlined' onClick={onAdd}>
            {t('admin.performanceIndicators.addNew')}
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-xs overflow-auto min-h-0 scrollbar'>
        <div>
          {alignmentsToShow.map((alignment) => {
            const isNewAlignment = difference(statementIdsField.value, initialValue).includes(
              alignment.statement.id
            );
            const newAlignmentClass = cx({
              'bg-secondary-200 border-l-2 border-l-secondary-500': isNewAlignment,
            });

            return (
              <div key={alignment.statement.id} className={newAlignmentClass}>
                <AlignToFormAlignmentDetails
                  groupName={alignment.groupName}
                  isNewAligned={isNewAlignment}
                  planName={alignment.planName}
                  statement={alignment.statement}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
