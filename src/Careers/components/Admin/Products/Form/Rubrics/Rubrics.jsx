import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import RubricsDetailsModal from '@dc/components/Admin/Products/Form/Rubrics/Modal/Modal';
import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';
import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';
import { assignSteps } from '@dc/utils/assignSteps';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import Card from '@shared/components/Card/Card';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import { ReactComponent as TableIcon } from '@shared/svg/table.svg';
import Switch from '@shared/components/Switch/Switch';

AdminProductsFormRubrics.propTypes = {
  isWithCopies: PropTypes.bool,
  pagingProps: PropTypes.object,
  SearchBar: PropTypes.func,
  toggleIsWithCopies: PropTypes.func,
};

function AdminProductsFormRubrics({ pagingProps, SearchBar, toggleIsWithCopies, isWithCopies }) {
  const [activeProduct, setActiveProduct] = useState(null);
  const { t } = useTranslation();
  const [rubricsInput, , rubricsHelper] = useField('rubrics');
  const isDetailsModalOpen = activeProduct !== null;
  const sortedByStep = rubricsInput.value.slice().sort((a, b) => a.step - b.step);

  const closeDetailsModal = () => setActiveProduct(null);
  const openItemDetails = (product) => setActiveProduct(product);

  const removeItem = (item) => {
    const newTasks = rubricsInput.value.filter((existingItem) => {
      if (item.__typename) {
        return item.__typename !== existingItem.__typename || existingItem.id !== item.id;
      }

      return existingItem.id !== item.id;
    });

    rubricsHelper.setValue(assignSteps(newTasks));
  };
  const getKicker = (item) => {
    if (item.owner) {
      return {
        text: item.owner.name,
        type: 'secondary',
      };
    }
  };

  const handleEditClick = (rubric) => {
    window.open(`/admin/rubrics/${rubric.id}/edit`, '_blank', 'noreferrer');
  };

  return (
    <Card className='product-rubrics'>
      <h4>{t('admin.products.rubrics.label')}</h4>

      <div className='flex gap-sm items-center mr-xxs'>
        <ListWrapper
          actions={
            <div className='flex gap-xs items-center'>
              <Switch
                label={t('common.withCopies')}
                labelFirst={true}
                value={isWithCopies}
                onChange={toggleIsWithCopies}
              />
              <SearchBar
                field='name'
                placeholder={t('common.placeholders.searchBy', {
                  field: t('common.fields.common.name').toLowerCase(),
                })}
              />
            </div>
          }
          title={t('admin.products.rubrics.allRubrics')}>
          <div className='min-h-0 flex-1'>
            <SharedPaginatedLoader.Content
              SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
              {...pagingProps}>
              {({ rubrics }) => (
                <SortableAvailableList
                  ListItemIcon={TableIcon}
                  field='rubrics'
                  getKicker={getKicker}
                  items={rubrics.nodes}
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
            ListItemIcon={TableIcon}
            field='rubrics'
            getKicker={getKicker}
            isDragDisabled={true}
            items={sortedByStep}
            onChange={removeItem}
            onDetailsOpen={openItemDetails}
            onEditClick={handleEditClick}
          />
        </ListWrapper>
      </div>
      {isDetailsModalOpen && (
        <RubricsDetailsModal
          isOpen={isDetailsModalOpen}
          rubricId={activeProduct?.id}
          onClose={closeDetailsModal}
        />
      )}
    </Card>
  );
}

export default AdminProductsFormRubrics;
