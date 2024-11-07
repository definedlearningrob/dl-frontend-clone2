import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import ListItem from '@dc/components/Admin/LessonItems/Vocabularies/List/Item/Item';
import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import archiveVocabularyMutation from '@dc/graphql/user/mutations/archiveVocabulary';
import useForm from '@dc/hooks/useForm';

AdminLessonItemsVocabulariesList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      archivedAt: PropTypes.string,
      definition: PropTypes.string,
      id: PropTypes.string,
      term: PropTypes.string,
    })
  ),
  pagingProps: PropTypes.object,
  refetchQuery: PropTypes.object,
  selectPage: PropTypes.func,
};

function AdminLessonItemsVocabulariesList({ items, pagingProps, refetchQuery, selectPage }) {
  const { recordToArchive } = useForm();
  const { t } = useTranslation();
  const [mutateArchive] = useMutation(archiveVocabularyMutation);

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
    { label: t('common.fields.vocabulary.term'), id: 'term' },
    {
      label: t('admin.lessons.items.vocabulary.definition'),
      id: 'definition',
    },
  ];

  return (
    <AdminSharedList
      headers={headers}
      itemsKey='vocabularies'
      pagingProps={pagingProps}
      onArchive={archive}>
      {(item) => <ListItem key={item.id} item={item} />}
    </AdminSharedList>
  );
}

export default AdminLessonItemsVocabulariesList;
