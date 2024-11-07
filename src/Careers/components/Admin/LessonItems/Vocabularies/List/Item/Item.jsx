import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { ListItemActions } from '@dc/shared/ListItemActions/ListItemActions';

import { removeTags } from '@shared/utils/removeTags';

AdminLessonItemsVocabulariesListItem.propTypes = {
  item: PropTypes.shape({
    archivedAt: PropTypes.string,
    definition: PropTypes.string,
    id: PropTypes.string,
    term: PropTypes.string,
  }),
};

function AdminLessonItemsVocabulariesListItem({ item }) {
  const { setRecordToArchive } = useForm();
  const history = useHistory();

  const onArchiveClick = () => {
    setRecordToArchive(item);
  };

  const onShowClick = () => {
    history.push(`/admin/lesson-items/vocabularies/${item.id}`);
  };

  return (
    <SharedTableList.Row>
      <SharedTableList.Cell>{item.term}</SharedTableList.Cell>
      <SharedTableList.Cell>
        <p className='mb-0'>{removeTags(item.definition)}</p>
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <ListItemActions
          editUrl={`/admin/lesson-items/vocabularies/${item.id}/edit`}
          onArchiveClick={onArchiveClick}
          onShowClick={onShowClick}
        />
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminLessonItemsVocabulariesListItem;
