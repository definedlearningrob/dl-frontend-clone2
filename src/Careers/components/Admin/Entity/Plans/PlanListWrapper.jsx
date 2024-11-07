import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';
import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';
import PreviewPlanModal from '@dc/components/Admin/Entity/Plans/Modal/Modal';
import planQuery from '@dc/graphql/user/queries/plan';

import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import SharedDataLoader from '@shared/components/DataLoader/DataLoader';

export const PlanListWrapper = ({ pagingProps }) => {
  const { t } = useTranslation();
  const [plansInput] = useField('plans');
  const [planForPreview, setPlanForPreview] = useState(false);
  const sortedByStep = plansInput.value.slice().sort((a, b) => a.step - b.step);

  return (
    <>
      <div className='flex gap-sm'>
        <ListWrapper title={t('admin.plans.manage.allPlans')}>
          <div className='min-h-0 flex-1'>
            <SharedPaginatedLoader.Content
              SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
              {...pagingProps}>
              {({ plans }) => {
                const normalizedData = plans.nodes.map((plan) => ({
                  ...plan,
                }));

                return (
                  <SortableAvailableList
                    field='plans'
                    items={normalizedData}
                    onDetailsOpen={setPlanForPreview}
                  />
                );
              }}
            </SharedPaginatedLoader.Content>
          </div>
          <PaginationBar pagingProps={pagingProps} />
        </ListWrapper>
        <ListWrapper title={`${t('common.statuses.selected')} (${sortedByStep.length})`}>
          <SortableSelectedList
            field='plans'
            items={sortedByStep}
            onDetailsOpen={setPlanForPreview}
          />
        </ListWrapper>
      </div>

      {planForPreview && (
        <SharedDataLoader options={{ variables: { id: planForPreview.id } }} query={planQuery}>
          {({ plan }) => <PreviewPlanModal plan={plan} onClose={() => setPlanForPreview(null)} />}
        </SharedDataLoader>
      )}
    </>
  );
};

PlanListWrapper.propTypes = {
  pagingProps: PropTypes.shape({
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
  }),
  SearchBar: PropTypes.elementType,
  selectedPlanType: PropTypes.object,
  setSelectedPlanType: PropTypes.func,
};
