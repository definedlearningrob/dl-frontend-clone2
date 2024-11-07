import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import ListItem from '@dc/components/Admin/LessonItems/ResearchLinks/List/Item/Item';
import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import archiveResearchLinkMutation from '@dc/graphql/user/mutations/archiveResearchLink';
import useForm from '@dc/hooks/useForm';

AdminLessonItemsResearchLinksList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      archivedAt: PropTypes.string,
      author: PropTypes.string,
      displayName: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
      resourceLink: PropTypes.string,
      sourceName: PropTypes.string,
    })
  ),
  pagingProps: PropTypes.object,
  refetchQuery: PropTypes.object,
  selectPage: PropTypes.func,
};

function AdminLessonItemsResearchLinksList({ items, pagingProps, refetchQuery, selectPage }) {
  const { recordToArchive } = useForm();
  const { t } = useTranslation();
  const [mutateArchive] = useMutation(archiveResearchLinkMutation);

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
    { label: t('common.fields.researchLink.author'), id: 'author' },
    { label: t('common.fields.researchLink.resourceLink'), id: 'resource-link' },
    { label: t('common.fields.researchLink.sourceName'), id: 'source-name' },
  ];

  return (
    <AdminSharedList
      headers={headers}
      itemsKey='researchLinks'
      pagingProps={pagingProps}
      onArchive={archive}>
      {(item) => <ListItem key={item.id} item={item} />}
    </AdminSharedList>
  );
}

export default AdminLessonItemsResearchLinksList;
