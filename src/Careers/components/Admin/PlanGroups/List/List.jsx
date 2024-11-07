import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminPlanGroupsItem from '@dc/components/Admin/PlanGroups/List/Item/Item';
import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import archivePlanGroupMutation from '@dc/graphql/user/mutations/archivePlanGroup';
import useForm from '@dc/hooks/useForm';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminPlanGroups.propTypes = {
  pagingProps: PropTypes.object,
  planGroups: PropTypes.arrayOf(
    PropTypes.shape({
      archivedAt: PropTypes.string,
      description: PropTypes.string,
      displayName: PropTypes.string,
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  refetchQuery: PropTypes.object,
};

function AdminPlanGroups({ pagingProps, refetchQuery }) {
  const { recordToArchive } = useForm();
  const { t } = useTranslation();
  const [mutateArchiveGroup] = useMutation(archivePlanGroupMutation);

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
      t('common.notifications.success.archived', { name: t('admin.planGroups.label') })
    );
  };

  const headers = [
    { label: t('common.fields.common.name'), id: 'name' },
    { label: t('common.fields.common.displayName'), id: 'displayName' },
    { label: '', id: 'actionButtons' },
  ];

  return (
    <AdminSharedList
      headers={headers}
      itemsKey='planGroups'
      pagingProps={pagingProps}
      onArchive={archiveGroup}>
      {(item) => <AdminPlanGroupsItem key={item.id} group={item} />}
    </AdminSharedList>
  );
}

export default AdminPlanGroups;
