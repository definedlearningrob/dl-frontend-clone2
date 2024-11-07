import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { isEmpty } from 'lodash-es';

import { PaginationBar } from '@dc/components/Admin/Shared/List/PaginationBar/PaginationBar';
import SharedTableList from '@dc/shared/TableList/TableList';
import useForm from '@dc/hooks/useForm';
import { getByStringKey } from '@dc/utils';
import { affectedResourcesConfig } from '@dc/utils/affectedResourcesConfig';
import { ARCHIVABLE_STATUSES } from '@dc/resources/constants';
import { ListModals } from '@dc/components/Admin/Shared/List/Modals';

import SharedPaginatedLoader from '@shared/components/PaginatedLoader/PaginatedLoader';
import SharedButton from '@shared/components/Button/Button';
import useQueryParams from '@shared/hooks/useQueryParams';

AdminSharedList.propTypes = {
  children: PropTypes.func,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      classNames: PropTypes.string,
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  itemsKey: PropTypes.string,
  onArchive: PropTypes.func,
  onDuplicate: PropTypes.func,
  onRestore: PropTypes.func,
  pagingProps: PropTypes.object,
  skipManagement: PropTypes.bool,
};

function AdminSharedList({
  children,
  itemsKey,
  onArchive,
  onDuplicate,
  onRestore,
  headers,
  pagingProps,
  skipManagement,
}) {
  const {
    recordToArchive,
    setRecordToArchive,
    recordToRestore,
    setRecordToRestore,
    recordToDuplicate,
    setRecordToDuplicate,
  } = useForm();
  const { t } = useTranslation();
  const { removeQueryParams, params } = useQueryParams();
  const history = useHistory();
  const { scope } = params;

  const createLink = () => {
    if (!history.location.pathname.includes('lesson-items')) {
      return `${history.location.pathname}/new`;
    }
    const lessonItemType = params.type;

    return `${history.location.pathname}/${lessonItemType || 'assignment'}/new`;
  };

  const closeModal = () => {
    setRecordToArchive(null);
    setRecordToRestore(null);
    setRecordToDuplicate(null);
    removeQueryParams(['archiveId']);
  };

  const archiveItem = (nodesLength) => async () => {
    await onArchive();
    setRecordToArchive(null);
    removeQueryParams(['archiveId']);

    const lastRecordOnPage = nodesLength === 1;
    const furtherThanFirstPage = pagingProps.page > 1;
    const activeScope = scope === ARCHIVABLE_STATUSES.ACTIVE.value || !scope;

    const shouldSwitchToPreviousPage = lastRecordOnPage && furtherThanFirstPage && activeScope;

    if (shouldSwitchToPreviousPage) {
      pagingProps.selectPage(pagingProps.page - 1);
    }
  };

  const restoreItem = (nodesLength) => async () => {
    await onRestore();
    setRecordToRestore(null);
    removeQueryParams(['archiveId']);

    const lastRecordOnPage = nodesLength === 1;
    const furtherThanFirstPage = pagingProps.page > 1;
    const activeScope = scope === ARCHIVABLE_STATUSES.ACTIVE.value || !scope;

    const shouldSwitchToPreviousPage = lastRecordOnPage && furtherThanFirstPage && activeScope;

    if (shouldSwitchToPreviousPage) {
      pagingProps.selectPage(pagingProps.page - 1);
    }
  };

  const duplicateItem = () => async () => {
    const results = await onDuplicate();
    setRecordToDuplicate(null);
    removeQueryParams(['duplicateId']);

    const data = results?.data;

    if (!isEmpty(data)) {
      const nestedData = Object.values(data)[0];
      const id = nestedData?.[Object.keys(nestedData)[0]]?.id;
      if (id) {
        history.push(`/admin/courses/${id}/edit`);
      }
    }
  };

  const affectedResources = useMemo(
    () => affectedResourcesConfig(recordToArchive || recordToRestore),
    [recordToArchive, recordToRestore]
  );

  return (
    <>
      {!skipManagement && (
        <div className='admin-list__footer'>
          <Link to={createLink}>
            <SharedButton
              className='admin-list__new-button'
              data-testid='admin-list-new-button'
              size='md'
              variant='primary'>
              {t('common.actions.new')}
            </SharedButton>
          </Link>
        </div>
      )}
      <div className='admin-list'>
        <SharedPaginatedLoader.Content {...pagingProps}>
          {(data) => (
            <>
              <div className='max-w-full overflow-auto'>
                <SharedTableList data-testid='admin-list-content'>
                  <SharedTableList.Head>
                    {headers.map(({ label, id, classNames }) => (
                      <SharedTableList.Header
                        key={id}
                        className={cx('admin-list__header', classNames)}>
                        {label}
                      </SharedTableList.Header>
                    ))}
                  </SharedTableList.Head>
                  <SharedTableList.Body items={getByStringKey(data, itemsKey).nodes}>
                    {({ item }) => children(item)}
                  </SharedTableList.Body>
                </SharedTableList>
              </div>
              <ListModals
                affectedResources={affectedResources}
                archiveItem={archiveItem}
                closeModal={closeModal}
                data={data}
                duplicateItem={duplicateItem}
                itemsKey={itemsKey}
                recordToArchive={recordToArchive}
                recordToDuplicate={recordToDuplicate}
                recordToRestore={recordToRestore}
                restoreItem={restoreItem}
              />
            </>
          )}
        </SharedPaginatedLoader.Content>
        <PaginationBar pagingProps={pagingProps} />
      </div>
    </>
  );
}

export default AdminSharedList;
