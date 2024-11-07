import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import ListItem from '@dc/components/Admin/LessonItems/Videos/List/Item/Item';
import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import archiveVideoMutation from '@dc/graphql/user/mutations/archiveVideo';
import useForm from '@dc/hooks/useForm';

AdminLessonItemsVideosList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      archivedAt: PropTypes.string,
      description: PropTypes.string,
      displayName: PropTypes.string,
      filename: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
      utl: PropTypes.string,
    })
  ),
  pagingProps: PropTypes.object,
  refetchQuery: PropTypes.object,
  selectPage: PropTypes.func,
};

function AdminLessonItemsVideosList({ items, pagingProps, refetchQuery, selectPage }) {
  const { recordToArchive } = useForm();
  const { t } = useTranslation();
  const [mutateArchive] = useMutation(archiveVideoMutation);

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
    { label: t('common.fields.video.fileName'), id: 'file-name' },
  ];

  return (
    <AdminSharedList
      headers={headers}
      itemsKey='videos'
      pagingProps={pagingProps}
      onArchive={archive}>
      {(item) => <ListItem key={item.id} item={item} />}
    </AdminSharedList>
  );
}

export default AdminLessonItemsVideosList;
