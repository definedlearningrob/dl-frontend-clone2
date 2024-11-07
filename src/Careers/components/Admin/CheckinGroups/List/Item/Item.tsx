import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { TCheckInGroup } from '@dc/graphql/user/queries/checkInGroups';

import SharedButton from '@shared/components/Button/Button';

type Props = {
  group: TCheckInGroup;
  setDetailsModalOpen: (arg: boolean) => void;
};

function AdminCheckinGroupsListItem({ group, setDetailsModalOpen }: Props) {
  const { t } = useTranslation();
  const { setRecordToShow, setRecordToArchive } = useForm();
  const history = useHistory();

  const onEditClick = () => {
    history.push(`/admin/checkin-groups/${group.id}/edit`);
  };

  const onArchiveClick = () => {
    setRecordToArchive(group);
  };

  const onShowClick = () => {
    setRecordToShow(group);
    setDetailsModalOpen(true);
  };

  return (
    <SharedTableList.Row data-testid='checkin-group-item'>
      <SharedTableList.Cell data-testid='checkin-group-item-name'>
        {group.name}
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='checkin-group-item-name'>
        {group.displayName}
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <div className='admin-list-item__actions'>
          <SharedButton variant='success' onClick={onShowClick}>
            <>{t('common.actions.show')}</>
          </SharedButton>
          <SharedButton data-testid='lessons-edit-button' variant='primary' onClick={onEditClick}>
            <>{t('common.actions.edit')}</>
          </SharedButton>
          <SharedButton
            data-testid='checkin-group-archive-button'
            disabled={!!group.archivedAt}
            variant='danger'
            onClick={onArchiveClick}>
            <>{t('common.actions.archive')}</>
          </SharedButton>
        </div>
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminCheckinGroupsListItem;
