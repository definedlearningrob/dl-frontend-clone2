import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { ListItemActions } from '@dc/shared/ListItemActions/ListItemActions';

AdminLessonItemsResearchLinksListItem.propTypes = {
  item: PropTypes.shape({
    archivedAt: PropTypes.string,
    author: PropTypes.string,
    displayName: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    resourceLink: PropTypes.string,
    sourceName: PropTypes.string,
  }),
};

function AdminLessonItemsResearchLinksListItem({ item }) {
  const { setRecordToArchive } = useForm();
  const history = useHistory();

  const onArchiveClick = () => {
    setRecordToArchive(item);
  };

  const onShowClick = () => {
    history.push(`/admin/lesson-items/research-links/${item.id}`);
  };

  return (
    <SharedTableList.Row>
      <SharedTableList.Cell>{item.name}</SharedTableList.Cell>
      <SharedTableList.Cell>{item.displayName}</SharedTableList.Cell>
      <SharedTableList.Cell>{item.author}</SharedTableList.Cell>
      <SharedTableList.Cell>
        <a href={item.resourceLink} rel='noopener noreferrer' target='_blank'>
          {item.name}
        </a>
      </SharedTableList.Cell>
      <SharedTableList.Cell>{item.sourceName}</SharedTableList.Cell>
      <SharedTableList.Cell>
        <ListItemActions
          editUrl={`/admin/lesson-items/research-links/${item.id}/edit`}
          onArchiveClick={onArchiveClick}
          onShowClick={onShowClick}
        />
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminLessonItemsResearchLinksListItem;
