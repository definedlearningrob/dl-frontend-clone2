import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import ProductsDetailsModal from '@dc/components/Admin/Tasks/Form/Products/Modal/Modal';
import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';
import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';

import { ReactComponent as ProductIcon } from '@shared/svg/product.svg';
import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import Card from '@shared/components/Card/Card';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import Switch from '@shared/components/Switch/Switch';

AdminTasksFormProducts.propTypes = {
  pagingProps: PropTypes.object,
  SearchBar: PropTypes.func,
  showCopies: PropTypes.bool,
  toggleShowCopies: PropTypes.func,
};

const getKicker = (item) => {
  if (item.owner) {
    return {
      text: item.owner.name,
      type: 'secondary',
    };
  }
};

function AdminTasksFormProducts({ pagingProps, SearchBar, showCopies, toggleShowCopies }) {
  const [activeProduct, setActiveProduct] = useState(null);
  const { t } = useTranslation();
  const [productsInput] = useField('products');
  const isDetailsModalOpen = activeProduct !== null;
  const sortedByStep = productsInput.value.slice().sort((a, b) => a.step - b.step);

  const closeDetailsModal = () => setActiveProduct(null);
  const openItemDetails = (product) => setActiveProduct(product);

  const handleEditClick = (product) => {
    window.open(`/admin/products/${product.id}/edit`, '_blank', 'noreferrer');
  };

  return (
    <Card>
      <h4>{t('admin.tasks.products.label')}</h4>
      <div className='flex gap-sm'>
        <ListWrapper
          actions={
            <div className='flex gap-xs'>
              <Switch
                className='flex items-center gap-xs border-neutral-300 rounded-lg !basis-auto'
                label={t('common.withCopies')}
                labelFirst={true}
                value={showCopies}
                onChange={toggleShowCopies}
              />
              <SearchBar
                field='name'
                placeholder={t('common.placeholders.searchBy', {
                  field: t('common.fields.common.name').toLowerCase(),
                })}
              />
            </div>
          }
          title={t('admin.tasks.products.allProducts')}>
          <div className='min-h-0 flex-1'>
            <SharedPaginatedLoader.Content
              SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
              {...pagingProps}>
              {({ products }) => (
                <SortableAvailableList
                  ListItemIcon={ProductIcon}
                  field='products'
                  getKicker={getKicker}
                  items={products.nodes}
                  onDetailsOpen={openItemDetails}
                  onEditClick={handleEditClick}
                />
              )}
            </SharedPaginatedLoader.Content>
          </div>
          <PaginationBar pagingProps={pagingProps} />
        </ListWrapper>
        <ListWrapper title={`${t('common.statuses.selected')} (${sortedByStep.length})`}>
          <SortableSelectedList
            ListItemIcon={ProductIcon}
            field='products'
            getKicker={getKicker}
            items={sortedByStep}
            onDetailsOpen={openItemDetails}
            onEditClick={handleEditClick}
          />
        </ListWrapper>
      </div>

      {isDetailsModalOpen && (
        <ProductsDetailsModal
          isOpen={isDetailsModalOpen}
          productId={activeProduct?.id}
          onClose={closeDetailsModal}
        />
      )}
    </Card>
  );
}

export default AdminTasksFormProducts;
