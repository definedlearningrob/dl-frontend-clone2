import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { TTask } from '@dc/graphql/user/queries/tasks';

import SharedImage from '@shared/components/Image/Image';
import { ReactComponent as ShowIcon } from '@shared/assets/icons/eye.svg';
import { ReactComponent as EditIcon } from '@shared/assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '@shared/assets/icons/delete_outlined.svg';
import { Tooltip } from '@shared/components/Tooltip';
import { IconButton } from '@shared/components/IconButton/IconButton';

type Props = {
  setDetailsModalOpen: (value: boolean) => void;
  showCopies: boolean;
  task: TTask;
};

export const AdminTasksListItem = ({ setDetailsModalOpen, task, showCopies }: Props) => {
  const { archivedAt, id, name, status, thumbnailUrl, owner } = task;

  const history = useHistory();
  const { t } = useTranslation();
  const { setRecordToArchive, setRecordToShow } = useForm();

  const onEditClick = () => {
    history.push(`/admin/tasks/${id}/edit`);
  };

  const onArchiveClick = () => {
    setRecordToArchive(task);
  };

  const onShowClick = () => {
    setRecordToShow(task);
    setDetailsModalOpen(true);
  };

  return (
    <SharedTableList.Row data-testid='tasks-list-item'>
      <SharedTableList.Cell>
        <SharedImage
          alt={t('admin.catalogs.list.item.altImage')}
          className='w-[86px] h-lg object-cover'
          src={thumbnailUrl}
        />
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='tasks-list-item-name'>{name}</SharedTableList.Cell>
      {showCopies && <SharedTableList.Cell>{owner?.name}</SharedTableList.Cell>}
      <SharedTableList.Cell>{status}</SharedTableList.Cell>
      <SharedTableList.Cell>
        <div className='flex items-center gap-xs justify-end'>
          <Tooltip message={t('common.actions.show')}>
            <IconButton
              Icon={ShowIcon}
              data-testid='task-show-button'
              size='md'
              variant='primary-outlined'
              onClick={onShowClick}
            />
          </Tooltip>
          <Tooltip message={t('common.actions.edit')}>
            <IconButton
              Icon={EditIcon}
              data-testid='task-edit-button'
              size='md'
              variant='primary-outlined'
              onClick={onEditClick}
            />
          </Tooltip>
          <Tooltip message={t('common.actions.archive')}>
            <IconButton
              Icon={DeleteIcon}
              data-testid='task-archive-button'
              disabled={!!archivedAt}
              size='md'
              variant='danger-outlined'
              onClick={onArchiveClick}
            />
          </Tooltip>
        </div>
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
};
