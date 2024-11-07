import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash-es';

import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';
import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';
import { AdminEntityCatalogsModal } from '@dc/components/Admin/Entity/Catalogs/Modal/Modal';

import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import { SERVICE_NAME } from '@shared/resources/enums';
import { Select } from '@shared/components/Select';

export const CatalogListWrapper = ({
  SearchBar,
  pagingProps,
  selectedCatalogType,
  setSelectedCatalogType,
}) => {
  const { t } = useTranslation();
  const [catalogsInput] = useField('catalogs');
  const [activeCatalog, setActiveCatalog] = useState(null);
  const sortedByStep = catalogsInput.value.slice().sort((a, b) => a.step - b.step);
  const catalogWithUnderline = sortedByStep.map((catalog) =>
    catalog.service === SERVICE_NAME.CAREERS
      ? {
          ...catalog,
          underlineClass: 'border-b border-solid border-neutral-300 rounded-b-none',
        }
      : catalog
  );
  const sortedByService = sortBy(catalogWithUnderline, 'service');

  const serviceOptions = [
    { value: null, label: t('common.services.all') },
    { value: SERVICE_NAME.LEARNING, label: t('common.services.learning') },
    { value: SERVICE_NAME.CAREERS, label: t('common.services.careers') },
  ];

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

  const getBadge = (item) => badgeDetails[item.service];
  const searchBarPlaceholder = t('common.placeholders.searchBy', {
    field: t('common.fields.common.name').toLowerCase(),
  });

  const isCareerSelected = sortedByService[0]?.service === SERVICE_NAME.CAREERS;

  const handleEditClick = (catalog) => {
    window.open(`/admin/catalogs/${catalog.id}/edit`, '_blank', 'noreferrer');
  };

  return (
    <>
      <div className='flex gap-sm'>
        <ListWrapper
          actions={
            <div className='flex items-end gap-xs xxxl:gap-sm'>
              <Select
                field='service'
                menuPortalTarget={document.body}
                options={serviceOptions}
                value={selectedCatalogType}
                onChange={(value) => {
                  setSelectedCatalogType(value);
                }}
              />
              <div className='!w-[180px] xxxl:!w-[240px]'>
                <SearchBar field='name' placeholder={searchBarPlaceholder} />
              </div>
            </div>
          }
          title={t('admin.catalogs.manage.allCatalogs')}>
          <div className='min-h-0 flex-1'>
            <SharedPaginatedLoader.Content
              SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
              {...pagingProps}>
              {({ catalogs }) => {
                const normalizedData = catalogs.nodes.map((catalog) => ({
                  ...catalog,
                  isDisabled: catalog.service === SERVICE_NAME.CAREERS && isCareerSelected,
                  tooltipMessage: t('admin.catalogs.manage.disabledCatalogTooltipMessage'),
                }));

                return (
                  <SortableAvailableList
                    field='catalogs'
                    getBadge={getBadge}
                    items={normalizedData}
                    onDetailsOpen={setActiveCatalog}
                    onEditClick={handleEditClick}
                  />
                );
              }}
            </SharedPaginatedLoader.Content>
          </div>
          <PaginationBar pagingProps={pagingProps} />
        </ListWrapper>
        <ListWrapper title={`${t('common.statuses.selected')} (${sortedByService.length})`}>
          <SortableSelectedList
            field='catalogs'
            getBadge={getBadge}
            items={sortedByService}
            onDetailsOpen={setActiveCatalog}
            onEditClick={handleEditClick}
          />
        </ListWrapper>
      </div>

      {activeCatalog && (
        <AdminEntityCatalogsModal catalog={activeCatalog} onClose={() => setActiveCatalog(null)} />
      )}
    </>
  );
};

CatalogListWrapper.propTypes = {
  pagingProps: PropTypes.shape({
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
  }),
  SearchBar: PropTypes.elementType,
  selectedCatalogType: PropTypes.object,
  setSelectedCatalogType: PropTypes.func,
};
