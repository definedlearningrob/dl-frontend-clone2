import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import archiveCheckInQuestionsMutation from '@dc/graphql/user/mutations/archiveCheckInQuestion';
import useForm from '@dc/hooks/useForm';

import { callToast } from '@shared/components/Toaster/Toaster';

import AdminCheckinsItem from './Item/Item';

AdminCheckinQuestionsList.propTypes = {
  pagingProps: PropTypes.object,
  planGroups: PropTypes.arrayOf(
    PropTypes.shape({
      archivedAt: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  refetchQuery: PropTypes.object,
};

function AdminCheckinQuestionsList({ pagingProps, refetchQuery }) {
  const { recordToArchive } = useForm();
  const { t } = useTranslation();
  const [mutateArchiveGroup] = useMutation(archiveCheckInQuestionsMutation);

  const archiveGroup = async () => {
    await mutateArchiveGroup({
      variables: {
        input: {
          id: recordToArchive.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.archived', { name: t('admin.checkInQuestions.label') })
    );
  };

  const headers = [
    { label: t('common.fields.checkins.question'), id: 'question' },
    { label: '', id: 'actionButtons' },
  ];

  return (
    <AdminSharedList
      headers={headers}
      itemsKey='checkInQuestions'
      pagingProps={pagingProps}
      onArchive={archiveGroup}>
      {(item) => <AdminCheckinsItem key={item.id} checkin={item} />}
    </AdminSharedList>
  );
}

export default AdminCheckinQuestionsList;
