import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import ListItem from '@dc/components/Admin/LessonItems/ExternalPresentations/List/Item/Item';
import archivePresentationMutation from '@dc/graphql/user/mutations/archiveExternalPresentation';
import useForm from '@dc/hooks/useForm';

AdminLessonItemsExternalPresentationsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      archivedAt: PropTypes.string,
      content: PropTypes.string,
      displayName: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  pagingProps: PropTypes.object,
  refetchQuery: PropTypes.object,
  selectPage: PropTypes.func,
};

function AdminLessonItemsExternalPresentationsList({
  items,
  pagingProps,
  refetchQuery,
  selectPage,
}) {
  const { recordToArchive } = useForm();
  const { t } = useTranslation();
  const [mutateArchive] = useMutation(archivePresentationMutation);

  const archive = async () => {
    await mutateArchive({
      variables: {
        input: {
          id: recordToArchive.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    if (items && items.length === 1 && refetchQuery.variables.page !== 1) {
      selectPage(refetchQuery.variables.page - 1);
    }
  };

  const headers = [
    { label: t('common.fields.common.name'), id: 'name' },
    { label: t('common.fields.common.displayName'), id: 'display-name' },
  ];

  return (
    <AdminSharedList
      headers={headers}
      itemsKey='externalPresentations'
      pagingProps={pagingProps}
      onArchive={archive}>
      {(item) => <ListItem key={item.id} item={item} />}
    </AdminSharedList>
  );
}

export default AdminLessonItemsExternalPresentationsList;
