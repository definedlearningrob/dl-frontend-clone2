import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { TCheckInQuestion } from '@dc/graphql/user/queries/checkinQuestions';

import SharedButton from '@shared/components/Button/Button';

type Props = {
  checkin: TCheckInQuestion;
};

function AdminCheckInQuestionsListItem({ checkin }: Props) {
  const { t } = useTranslation();
  const { setRecordToArchive } = useForm();
  const history = useHistory();

  const onEditClick = () => {
    history.push(`/admin/check-ins/${checkin.id}/edit`);
  };

  const onArchiveClick = () => {
    setRecordToArchive(checkin);
  };

  return (
    <SharedTableList.Row data-testid='lessons-list-item'>
      <SharedTableList.Cell data-testid='lessons-list-item-name'>
        {checkin.question}
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <div className='admin-list-item__actions'>
          <SharedButton
            data-testid='checkin-question-edit-button'
            variant='primary'
            onClick={onEditClick}>
            <>{t('common.actions.edit')}</>
          </SharedButton>
          <SharedButton
            data-testid='checkin-question-archive-button'
            disabled={!!checkin.archivedAt}
            variant='danger'
            onClick={onArchiveClick}>
            <>{t('common.actions.archive')}</>
          </SharedButton>
        </div>
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminCheckInQuestionsListItem;
