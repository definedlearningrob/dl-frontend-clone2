import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { ListItemActions } from '@dc/shared/ListItemActions/ListItemActions';

AdminLessonItemsTextsListItem.propTypes = {
  item: PropTypes.shape({
    archivedAt: PropTypes.string,
    content: PropTypes.string,
    displayName: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

function AdminLessonItemsTextsListItem({ item }) {
  const { setRecordToArchive } = useForm();
  const history = useHistory();

  const onArchiveClick = () => {
    setRecordToArchive(item);
  };

  const onShowClick = () => {
    history.push(`/admin/lesson-items/texts/${item.id}`);
  };

  return (
    <SharedTableList.Row>
      <SharedTableList.Cell>{item.name}</SharedTableList.Cell>
      <SharedTableList.Cell>{item.displayName}</SharedTableList.Cell>
      <SharedTableList.Cell>
        <ListItemActions
          editUrl={`/admin/lesson-items/texts/${item.id}/edit`}
          onArchiveClick={onArchiveClick}
          onShowClick={onShowClick}
        />
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminLessonItemsTextsListItem;
