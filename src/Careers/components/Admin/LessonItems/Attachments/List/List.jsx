import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import ListItem from '@dc/components/Admin/LessonItems/Attachments/List/Item/Item';
import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import archiveAttachmentMutation from '@dc/graphql/user/mutations/archiveAttachment';
import useForm from '@dc/hooks/useForm';

AdminLessonItemsAttachmentsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  pagingProps: PropTypes.object,
  refetchQuery: PropTypes.object,
  selectPage: PropTypes.func,
};

function AdminLessonItemsAttachmentsList({ items, pagingProps, refetchQuery, selectPage }) {
  const { recordToArchive } = useForm();
  const { t } = useTranslation();
  const [mutateArchive] = useMutation(archiveAttachmentMutation);

  const archive = async () => {
    await mutateArchive({
      variables: {
        input: {
          id: recordToArchive.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    if (items.length === 1 && refetchQuery.variables.page !== 1) {
      selectPage(refetchQuery.variables.page - 1);
    }
  };

  const headers = [
    { label: t('common.fields.common.name'), id: 'name' },
    { label: t('common.fields.common.displayName'), id: 'display-name' },
    { label: t('common.fields.attachment.files'), id: 'files' },
  ];

  return (
    <AdminSharedList
      headers={headers}
      itemsKey='attachments'
      pagingProps={pagingProps}
      onArchive={archive}>
      {(item) => <ListItem key={item.id} item={item} />}
    </AdminSharedList>
  );
}

export default AdminLessonItemsAttachmentsList;
