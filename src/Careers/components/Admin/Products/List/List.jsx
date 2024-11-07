import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import AdminSharedList from '@dc/components/Admin/Shared/List/List';
import { AdminProductsListItem } from '@dc/components/Admin/Products/List/Item/Item';
import archiveProductMutation from '@dc/graphql/user/mutations/archiveProduct';
import DetailsModal from '@dc/components/Admin/Products/List/Item/DetailsModal/DetailsModal';
import useForm from '@dc/hooks/useForm';

import useQueryParams from '@shared/hooks/useQueryParams';
import { callToast } from '@shared/components/Toaster/Toaster';

AdminProductsList.propTypes = {
  pagingProps: PropTypes.object,
  refetchQuery: PropTypes.object,
  showCopies: PropTypes.bool,
};

function AdminProductsList({ pagingProps, refetchQuery, showCopies }) {
  const { t } = useTranslation();
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const { recordToArchive, recordToShow, setRecordToShow } = useForm();
  const [mutateArchiveProduct] = useMutation(archiveProductMutation);
  const history = useHistory();
  const {
    params: { showId },
    removeQueryParams,
  } = useQueryParams();

  useEffect(() => {
    showId && setDetailsModalOpen(true);
  }, [showId]);

  const archiveProduct = async () => {
    await mutateArchiveProduct({
      variables: {
        input: {
          id: recordToArchive.id,
        },
      },
      refetchQueries: [refetchQuery],
    });

    callToast(
      'success',
      t('common.notifications.success.archived', { name: t('admin.products.typeName') })
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
    { label: t('common.fields.common.name'), id: 'name' },
    showCopies && { label: t('common.fields.common.owner'), id: 'owner' },
    { label: t('common.fields.common.status'), id: 'status' },
    { label: '', id: 'actionButtons' },
  ].filter(Boolean);

  const renderAdminProductsListItems = () => (item) =>
    (
      <AdminProductsListItem
        key={item.id}
        product={item}
        setDetailsModalOpen={setDetailsModalOpen}
        showCopies={showCopies}
      />
    );

  return (
    <>
      <AdminSharedList
        headers={headers}
        itemsKey='products'
        pagingProps={pagingProps}
        onArchive={archiveProduct}>
        {renderAdminProductsListItems()}
      </AdminSharedList>
      {isDetailsModalOpen && (
        <DetailsModal
          isOpen={isDetailsModalOpen}
          productId={showId || recordToShow.id}
          onClose={onCloseDetailsModal}
        />
      )}
    </>
  );
}

export default AdminProductsList;
