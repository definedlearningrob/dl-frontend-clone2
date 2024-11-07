import { useCallback, useMemo, useState } from 'react';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';
import { sortBy } from 'lodash-es';

import List from '@dc/components/Admin/PlanGroups/Form/Statements/List/List';

import SharedButton from '@shared/components/Button/Button';
import { ReactComponent as Plus } from '@shared/svg/add.svg';
import { PlanGroup, PlanStatement as BasePlanStatement } from '@shared/resources/types';
import { IconContainer } from '@shared/components/IconContainer/IconContainer';
import Card from '@shared/components/Card/Card';

import { EditStatementModal } from './StatementModal/EditStatementModal';
import { CreateStatementModal } from './StatementModal/CreateStatementModal';

export type PlanStatement = Pick<
  BasePlanStatement,
  'id' | 'name' | 'archivedAt' | 'step' | 'isRequired' | 'question'
>;

type Props = {
  group: Pick<PlanGroup, 'id' | 'description' | 'displayName' | 'name'> & {
    statements: PlanStatement[];
  };
};

export const Statements = ({ group }: Props) => {
  const [statementToEdit, setStatementToEdit] = useState<PlanStatement | null>(null);
  const { t } = useTranslation();
  const [statementsInput] = useField('statements');
  const [isModalOpen, toggleModalOpen] = useToggle(false);

  const handleCloseModal = useCallback(() => {
    toggleModalOpen(false);
    setStatementToEdit(null);
  }, []);

  const handleOpenModal = (record: PlanStatement) => {
    toggleModalOpen(true);
    if (record.id) {
      setStatementToEdit(record);
    }
  };

  const sortedStatements = useMemo(() => sortBy(statementsInput.value, 'step'), [statementsInput]);

  return (
    <Card>
      <div className='flex justify-between items-center mb-base'>
        <h4 className='mb-0'>{t('admin.planGroups.statements.sectionLabel')}</h4>
        <div className='flex justify-end'>
          <SharedButton
            data-testid='new-lesson-item'
            size='md'
            variant='primary'
            onClick={() => toggleModalOpen(true)}>
            <span className='flex items-center gap-xs'>
              <IconContainer Icon={Plus} paddingSize='none' />
              {t('common.actions.createNew')}
            </span>
          </SharedButton>
        </div>
      </div>
      <List group={group} openForm={handleOpenModal} statements={sortedStatements} />
      {statementToEdit && (
        <EditStatementModal
          isOpen={isModalOpen}
          statement={statementToEdit}
          onClose={handleCloseModal}
        />
      )}
      {!statementToEdit && (
        <CreateStatementModal
          isOpen={isModalOpen}
          statementsCount={sortedStatements.length}
          onClose={handleCloseModal}
        />
      )}
    </Card>
  );
};
