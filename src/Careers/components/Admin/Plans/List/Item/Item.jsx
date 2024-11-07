import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { shapePlan } from '@dc/resources/typeDefs';

import SharedButton from '@shared/components/Button/Button';

AdminPlansListItem.propTypes = {
  plan: shapePlan,
};

function AdminPlansListItem({ plan }) {
  const { t } = useTranslation();
  const { setRecordToArchive } = useForm();
  const history = useHistory();

  const onEditClick = () => {
    history.push(`/admin/plans/${plan.id}/edit`);
  };

  const onArchiveClick = () => {
    setRecordToArchive(plan);
  };

  return (
    <SharedTableList.Row data-testid='courses-list-item'>
      <SharedTableList.Cell data-testid='courses-list-item-name'>{plan.name}</SharedTableList.Cell>
      <SharedTableList.Cell>
        <div className='admin-list-item__actions'>
          <SharedButton data-testid='courses-edit-button' variant='primary' onClick={onEditClick}>
            {t('common.actions.edit')}
          </SharedButton>
          <SharedButton
            data-testid='courses-archive-button'
            disabled={!!plan.archivedAt}
            variant='danger'
            onClick={onArchiveClick}>
            {t('common.actions.archive')}
          </SharedButton>
        </div>
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminPlansListItem;
