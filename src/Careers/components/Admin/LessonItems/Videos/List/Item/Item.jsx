import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { ListItemActions } from '@dc/shared/ListItemActions/ListItemActions';

AdminLessonItemsVideosListItem.propTypes = {
  item: PropTypes.shape({
    archivedAt: PropTypes.string,
    description: PropTypes.string,
    displayName: PropTypes.string,
    filename: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  }),
};

function AdminLessonItemsVideosListItem({ item }) {
  const { setRecordToArchive } = useForm();
  const history = useHistory();

  const onArchiveClick = () => {
    setRecordToArchive(item);
  };

  const onShowClick = () => {
    history.push(`/admin/lesson-items/videos/${item.id}`);
  };

  return (
    <SharedTableList.Row>
      <SharedTableList.Cell>{item.name}</SharedTableList.Cell>
      <SharedTableList.Cell>{item.displayName}</SharedTableList.Cell>
      <SharedTableList.Cell>
        <a href={item.url}>{item.filename}</a>
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <ListItemActions
          editUrl={`/admin/lesson-items/videos/${item.id}/edit`}
          onArchiveClick={onArchiveClick}
          onShowClick={onShowClick}
        />
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminLessonItemsVideosListItem;
