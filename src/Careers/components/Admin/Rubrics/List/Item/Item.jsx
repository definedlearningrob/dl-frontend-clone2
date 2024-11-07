import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';

import duplicateRubricMutation from '@dc/graphql/user/mutations/duplicateRubric';
import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { shapeRubric } from '@dc/resources/typeDefs';

import SharedButton from '@shared/components/Button/Button';
import { callToast } from '@shared/components/Toaster/Toaster';

AdminRubricsListItem.propTypes = {
  rubric: shapeRubric,
};

function AdminRubricsListItem({ rubric }) {
  const { t } = useTranslation();
  const { setRecordToArchive } = useForm();
  const history = useHistory();
  const [duplicateRubric] = useMutation(duplicateRubricMutation);

  const onEditClick = () => {
    history.push(`/admin/rubrics/${rubric.id}/edit`);
  };

  const onDuplicateClick = async () => {
    try {
      const { data } = await duplicateRubric({
        variables: {
          input: {
            id: rubric.id,
          },
        },
      });
      callToast('success', t('admin.rubrics.duplicate.success'));
      const newId = data.duplicateRubric.rubric.id;
      history.push(`/admin/rubrics/${newId}/edit`);
    } catch (error) {
      callToast('error', t('admin.rubrics.duplicate.error'));
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
  const isOwner = rubric.owner && rubric.owner.name;
  const onArchiveClick = () => {
    setRecordToArchive(rubric);
  };

  return (
    <SharedTableList.Row data-testid='rubrics-list-item'>
      <SharedTableList.Cell data-testid='rubrics-list-item-name'>
        {rubric.name}
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='rubrics-list-item-name'>
        {rubric.displayName}
      </SharedTableList.Cell>
      <SharedTableList.Cell data-testid='rubrics-list-item-name'>{isOwner}</SharedTableList.Cell>
      <SharedTableList.Cell>
        <div className='admin-list-item__actions'>
          <SharedButton data-testid='rubrics-edit-button' variant='primary' onClick={onEditClick}>
            {t('common.actions.edit')}
          </SharedButton>
          <SharedButton
            data-testid='rubrics-duplicate-button'
            disabled={!!rubric.archivedAt}
            variant='primary'
            onClick={onDuplicateClick}>
            {t('common.actions.duplicate')}
          </SharedButton>
          <SharedButton
            data-testid='rubrics-archive-button'
            disabled={!!rubric.archivedAt}
            variant='danger'
            onClick={onArchiveClick}>
            {t('common.actions.archive')}
          </SharedButton>
        </div>
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminRubricsListItem;
