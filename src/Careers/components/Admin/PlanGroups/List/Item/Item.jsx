import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { shapePlanGroup } from '@dc/resources/typeDefs';

import SharedButton from '@shared/components/Button/Button';

AdminPlanGroupsListItem.propTypes = {
  group: shapePlanGroup,
};

function AdminPlanGroupsListItem({ group }) {
  const { t } = useTranslation();
  const { setRecordToArchive } = useForm();
  const history = useHistory();

  const onEditClick = () => {
    history.push(`/admin/plan-groups/${group.id}/edit`);
  };

  const onArchiveClick = () => {
    setRecordToArchive(group);
  };

  return (
    <SharedTableList.Row data-testid='lessons-list-item'>
      <SharedTableList.Cell data-testid='lessons-list-item-name'>{group.name}</SharedTableList.Cell>
      <SharedTableList.Cell data-testid='lessons-list-item-displayName'>
        {group.displayName}
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <div className='admin-list-item__actions'>
          <SharedButton data-testid='lessons-edit-button' variant='primary' onClick={onEditClick}>
            {t('common.actions.edit')}
          </SharedButton>
          <SharedButton
            data-testid='lessons-archive-button'
            disabled={!!group.archivedAt}
            variant='danger'
            onClick={onArchiveClick}>
            {t('common.actions.archive')}
          </SharedButton>
        </div>
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminPlanGroupsListItem;
