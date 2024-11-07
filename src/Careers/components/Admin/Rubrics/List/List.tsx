import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryOptions, useMutation } from '@apollo/client';

import AdminRubricsListItem from '@dc/components/Admin/Rubrics/List/Item/Item';
import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import archiveRubricMutation from '@dc/graphql/user/mutations/archiveRubric';
import CreateModal from '@dc/components/Admin/Rubrics/CreateModal/CreateModal';
import useForm from '@dc/hooks/useForm';
import { TRubricsData } from '@dc/graphql/user/queries/rubrics';

import SharedButton from '@shared/components/Button/Button';
import { callToast } from '@shared/components/Toaster/Toaster';
import { TPaginatedLoaderParams } from '@shared/components/PaginatedLoader/PaginatedLoader';

type Props = {
  pagingProps: TPaginatedLoaderParams<TRubricsData>;
  refetchQuery: QueryOptions;
  showCopies: boolean;
};

function AdminRubricsList({ pagingProps, refetchQuery, showCopies }: Props) {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const { recordToArchive } = useForm();
  const { t } = useTranslation();
  const [mutateArchiveRubric] = useMutation(archiveRubricMutation);

  const toggleModal = () => setCreateModalVisible(!createModalVisible);
  const archiveRubric = async () => {
    await mutateArchiveRubric({
      variables: {
        input: {
          id: recordToArchive.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.archived', { name: t('admin.rubrics.label') })
    );
  };

  const headers = [
    { label: t('common.fields.common.name'), id: 'name' },
    { label: t('common.fields.common.displayName'), id: 'displayName' },
    showCopies && { label: t('common.fields.common.owner'), id: 'owner' },
    { label: '', id: 'actionButtons' },
  ].filter(Boolean);

  return (
    <>
      <div className='admin-list__footer'>
        <SharedButton
          className='admin-list__new-button'
          data-testid='admin-list-new-button'
          variant='primary'
          onClick={toggleModal}>
          {t('common.actions.new')}
        </SharedButton>
      </div>
      <AdminSharedList
        headers={headers}
        itemsKey='rubrics'
        pagingProps={pagingProps}
        skipManagement={true}
        onArchive={archiveRubric}>
        {(item) => <AdminRubricsListItem key={item.id} rubric={item} />}
      </AdminSharedList>
      <div className='admin-list__footer' />
      {createModalVisible && <CreateModal onClose={toggleModal} />}
    </>
  );
}

export default AdminRubricsList;
