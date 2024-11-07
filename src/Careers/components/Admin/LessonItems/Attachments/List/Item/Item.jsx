import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { ListItemActions } from '@dc/shared/ListItemActions/ListItemActions';

AdminLessonItemsAttachmentsListItem.propTypes = {
  item: PropTypes.shape({
    archivedAt: PropTypes.string,
    description: PropTypes.string,
    displayName: PropTypes.string,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.string,
        id: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

function AdminLessonItemsAttachmentsListItem({ item }) {
  const { setRecordToArchive } = useForm();
  const history = useHistory();

  const onArchiveClick = () => {
    setRecordToArchive(item);
  };

  const onShowClick = () => {
    history.push(`/admin/lesson-items/attachments/${item.id}`);
  };

  return (
    <SharedTableList.Row>
      <SharedTableList.Cell>{item.name}</SharedTableList.Cell>
      <SharedTableList.Cell>{item.displayName}</SharedTableList.Cell>
      <SharedTableList.Cell className='admin-list-item__expandable-list-container'>
        <ul className='admin-list-item__expandable-list'>
          {item.files.map((file) => (
            <li
              key={file.id}
              className='admin-list-item__expandable-list-item'
              data-testid='contract-entity-item'>
              <a href={file.url} rel='noopener noreferrer' target='_blank'>
                {file.filename}
              </a>
            </li>
          ))}
        </ul>
      </SharedTableList.Cell>
      <SharedTableList.Cell>
        <ListItemActions
          editUrl={`/admin/lesson-items/attachments/${item.id}/edit`}
          onArchiveClick={onArchiveClick}
          onShowClick={onShowClick}
        />
      </SharedTableList.Cell>
    </SharedTableList.Row>
  );
}

export default AdminLessonItemsAttachmentsListItem;
