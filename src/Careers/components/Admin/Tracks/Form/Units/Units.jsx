import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from 'react-use';

import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';
import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';
import UnitsDetailsModal from '@dc/components/Admin/Tracks/Form/Units/Modal/Modal';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import Card from '@shared/components/Card/Card';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import { SERVICE_NAME } from '@shared/resources/enums';

AdminTracksFormUnits.propTypes = {
  pagingProps: PropTypes.object,
  SearchBar: PropTypes.func,
};

function AdminTracksFormUnits({ pagingProps, SearchBar }) {
  const [activeUnit, setActiveUnit] = useState(null);
  const { t } = useTranslation();
  const [unitsInput, , unitHelper] = useField('units');
  const [serviceInput] = useField('service');
  const isDetailsModalOpen = activeUnit !== null;

  useUpdateEffect(() => {
    unitHelper.setValue([]);
  }, [serviceInput.value.value]);

  const getBadge = (item) => {
    const badgeDetails = {
      [SERVICE_NAME.CAREERS]: {
        text: t('admin.tracks.label.careers'),
        type: 'danger',
      },
      [SERVICE_NAME.LEARNING]: {
        text: t('admin.tracks.label.learning'),
        type: 'primary',
      },
    };

    return badgeDetails[item.service];
  };

  const closeDetailsModal = () => setActiveUnit(null);
  const openItemDetails = (unitId) => setActiveUnit(unitId);
  const sortedByStep = unitsInput.value.slice().sort((a, b) => a.step - b.step);
  const handleEditClick = (unit) => {
    window.open(`/admin/units/${unit.id}/edit`, '_blank', 'noreferrer');
  };

  return (
    <Card data-testid='units-section'>
      <h4>{t('admin.tracks.units.label')}</h4>
      <div className='flex gap-sm'>
        <ListWrapper
          actions={
            <SearchBar
              field='name'
              placeholder={t('common.placeholders.searchBy', {
                field: t('common.fields.common.name').toLowerCase(),
              })}
            />
          }
          title={t('admin.tracks.units.allUnits')}>
          <div className='min-h-0 flex-1'>
            <SharedPaginatedLoader.Content
              SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
              {...pagingProps}>
              {({ units }) => (
                <SortableAvailableList
                  field='units'
                  getBadge={getBadge}
                  items={units.nodes}
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
            field='units'
            getBadge={getBadge}
            items={sortedByStep}
            onDetailsOpen={openItemDetails}
            onEditClick={handleEditClick}
          />
        </ListWrapper>
      </div>

      {isDetailsModalOpen && (
        <UnitsDetailsModal
          isOpen={isDetailsModalOpen}
          unitId={activeUnit?.id}
          onClose={closeDetailsModal}
        />
      )}
    </Card>
  );
}

export default AdminTracksFormUnits;
