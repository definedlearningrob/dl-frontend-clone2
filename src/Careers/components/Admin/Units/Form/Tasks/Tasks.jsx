import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { capitalize } from 'lodash-es';

import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import { SortableAvailableList } from '@dc/components/Admin/Shared/SortableAvailableList/SortableAvailableList';
import { SortableSelectedList } from '@dc/components/Admin/Shared/SortableSelectedList/SortableSelectedList';
import TasksDetailsModal from '@dc/components/Admin/Units/Form/Tasks/Modal/Modal';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedLoadingSpinner from '@shared/components/LoadingSpinner/LoadingSpinner';
import Switch from '@shared/components/Switch/Switch';
import { ListWrapper } from '@shared/components/SelectableList/ListWrapper/ListWrapper';
import Card from '@shared/components/Card/Card';

AdminUnitsFormTasks.propTypes = {
  isWithCopies: PropTypes.bool,
  pagingProps: PropTypes.object,
  SearchBar: PropTypes.func,
  toggleIsWithCopies: PropTypes.func,
};

function AdminUnitsFormTasks({ pagingProps, SearchBar, toggleIsWithCopies, isWithCopies }) {
  const [activeTask, setActiveTask] = useState(null);
  const { t } = useTranslation();
  const [tasksInput] = useField('tasks');
  const isDetailsModalOpen = activeTask !== null;
  const sortedByStep = tasksInput.value.slice().sort((a, b) => a.step - b.step);

  const closeDetailsModal = () => setActiveTask(null);
  const openItemDetails = (task) => setActiveTask(task);

  const getBadge = (item) => ({
    text: capitalize(item.status),
    type: item.status === 'DRAFT' ? 'secondary' : 'primary',
  });

  const getKicker = (item) => {
    if (item.owner) {
      return {
        text: item.owner.name,
        type: 'secondary',
      };
    }
  };

  const handleEditClick = (task) => {
    window.open(`/admin/tasks/${task.id}/edit`, '_blank', 'noreferrer');
  };

  return (
    <Card data-testid='tasks-section'>
      <Card.Header>
        <h4>{t('admin.units.tasks.tasks')}</h4>
      </Card.Header>
      <div className='flex gap-sm'>
        <ListWrapper
          actions={
            <div className='flex gap-xs'>
              <Switch
                className='flex items-center gap-xs border-neutral-300 rounded-lg !basis-auto'
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
          title={t('admin.units.tasks.allTasks')}>
          <div className='min-h-0 flex-1'>
            <SharedPaginatedLoader.Content
              SpinnerComponent={<SharedLoadingSpinner className='sortable-list-spinner' />}
              {...pagingProps}>
              {({ tasks }) => (
                <SortableAvailableList
                  field='tasks'
                  getBadge={getBadge}
                  getKicker={getKicker}
                  items={tasks.nodes}
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
            field='tasks'
            getBadge={getBadge}
            getKicker={getKicker}
            items={sortedByStep}
            onDetailsOpen={openItemDetails}
            onEditClick={handleEditClick}
          />
        </ListWrapper>
      </div>

      {isDetailsModalOpen && (
        <TasksDetailsModal
          isOpen={isDetailsModalOpen}
          taskId={activeTask?.id}
          onClose={closeDetailsModal}
        />
      )}
    </Card>
  );
}

export default AdminUnitsFormTasks;
