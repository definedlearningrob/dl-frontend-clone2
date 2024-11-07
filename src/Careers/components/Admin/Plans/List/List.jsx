import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminPlansListItem from '@dc/components/Admin/Plans/List/Item/Item';
import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import archivePlanMutation from '@dc/graphql/user/mutations/archivePlan';
import useForm from '@dc/hooks/useForm';

import { callToast } from '@shared/components/Toaster/Toaster';

AdminPlansList.propTypes = {
  pagingProps: PropTypes.object,
  refetchQuery: PropTypes.object,
};

function AdminPlansList({ pagingProps, refetchQuery }) {
  const { recordToArchive } = useForm();
  const { t } = useTranslation();
  const [mutateArchivePlan] = useMutation(archivePlanMutation);

  const archivePlan = async () => {
    await mutateArchivePlan({
      variables: {
        input: {
          id: recordToArchive.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.archived', { name: t('admin.plans.label') })
    );
  };

  const headers = [
    { label: t('common.fields.common.name'), id: 'name' },
    { label: '', id: 'actionButtons' },
  ];

  return (
    <AdminSharedList
      headers={headers}
      itemsKey='plans'
      pagingProps={pagingProps}
      onArchive={archivePlan}>
      {(item) => <AdminPlansListItem key={item.id} plan={item} />}
    </AdminSharedList>
  );
}

export default AdminPlansList;
