import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import { AdminTasksListItem } from '@dc/components/Admin/Tasks/List/Item/Item';
import archiveTaskMutation from '@dc/graphql/user/mutations/archiveTask';
import DetailsModal from '@dc/components/Admin/Tasks/List/Item/DetailsModal/DetailsModal';
import useForm from '@dc/hooks/useForm';

import useQueryParams from '@shared/hooks/useQueryParams';
import { callToast } from '@shared/components/Toaster/Toaster';

AdminTasksList.propTypes = {
  pagingProps: PropTypes.object,
  refetchQuery: PropTypes.object,
  showCopies: PropTypes.bool,
};

function AdminTasksList({ pagingProps, refetchQuery, showCopies }) {
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const { params, removeQueryParams } = useQueryParams();
  const { recordToArchive, recordToShow, setRecordToShow } = useForm();
  const [mutateArchiveTask] = useMutation(archiveTaskMutation);
  const history = useHistory();
  const { showId } = params;
  const { t } = useTranslation();

  useEffect(() => {
    showId && setDetailsModalOpen(true);
  }, [showId]);

  const archiveTask = async () => {
    await mutateArchiveTask({
      variables: {
        input: {
          id: recordToArchive.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.archived', { name: t('admin.tasks.typeName') })
    );
  };

  const redirectFromAffectedResource = () => showId && history.goBack();

  const onCloseDetailsModal = () => {
    redirectFromAffectedResource();
    removeQueryParams(['showId']);
    setRecordToShow(null);
    setDetailsModalOpen(false);
  };

  const headers = [
    { label: '', id: 'image', classNames: '!w-[100px]' },
    { label: t('common.fields.common.name'), id: 'name' },
    showCopies && { label: t('common.fields.common.owner'), id: 'name' },
    { label: t('common.fields.common.status'), id: 'status' },
    { label: '', id: 'actionButtons' },
  ].filter(Boolean);

  return (
    <>
      <AdminSharedList
        headers={headers}
        itemsKey='tasks'
        pagingProps={pagingProps}
        onArchive={archiveTask}>
        {(item) => (
          <AdminTasksListItem
            key={item.id}
            setDetailsModalOpen={setDetailsModalOpen}
            showCopies={showCopies}
            task={item}
          />
        )}
      </AdminSharedList>
      {isDetailsModalOpen && (
        <DetailsModal
          isDetailsModalOpen={isDetailsModalOpen}
          isOpen={isDetailsModalOpen}
          taskId={showId || recordToShow.id}
          onClose={onCloseDetailsModal}
        />
      )}
    </>
  );
}

export default AdminTasksList;
