import { useTranslation } from 'react-i18next';
import { Table } from '@tanstack/react-table';

import SharedSelect from '@dc/shared/Select/Select';

import { ReactComponent as ChevronLeftIcon } from '@shared/svg/chevron_left.svg';
import { ReactComponent as ChevronRightIcon } from '@shared/svg/chevron_right.svg';
import { generatePaginationItems } from '@shared/utils/generatePaginationItems';
import SharedButton from '@shared/components/Button/Button';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { PAGE_SIZE_OPTIONS } from '../NewTable';

import { NewTablePaginationItem } from './NewTablePaginationItem';
import styles from './NewTablePagination.module.sass';

type Props<T> = {
  table: Table<T>;
  nodesCount: number;
  defaultPageSize: typeof PAGE_SIZE_OPTIONS[number];
};

export const NewTablePagination = <T extends Record<string, unknown>>({
  table,
  nodesCount,
  defaultPageSize,
}: Props<T>) => {
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });
  const { t } = useTranslation();

  const pageSizeOptions = PAGE_SIZE_OPTIONS.map((option) => ({
    label: option,
    value: option,
  }));
  const defaultPageSizeOption = pageSizeOptions.find(({ value }) => value === defaultPageSize);

  const pagesCount = table.getPageCount();
  const { pagination } = table.getState();
  const paginationItems = generatePaginationItems(pagesCount, pagination.pageIndex + 1);

  const lastResultOnPage = Math.min(
    pagination.pageSize + pagination.pageIndex * pagination.pageSize,
    nodesCount
  );
  const firstResultOnPage = Math.min(
    pagination.pageIndex * pagination.pageSize + 1,
    lastResultOnPage
  );

  const buttonSize = isFullHD ? 'md' : 'sm';

  return (
    <div className='flex justify-between px-base py-xs xxxl:px-md'>
      <div className='flex items-center gap-sm'>
        <span className='text-xxs xxxl:text-xs text-font-secondary'>
          {t('components.table.paginationResults', {
            firstResult: firstResultOnPage,
            lastResult: lastResultOnPage,
            totalResults: nodesCount,
          })}
        </span>
        <SharedSelect
          className={styles.pageSizeSelect}
          defaultValue={defaultPageSizeOption}
          menuPlacement='top'
          options={pageSizeOptions}
          selectProps={{ 'aria-label': t('components.table.selectPageSize') }}
          showError={false}
          size={isFullHD ? 'md' : 'sm'}
          onChange={(option) => {
            table.setPageSize(option.value);
          }}
        />
      </div>
      <div className='flex items-center gap-sm'>
        <SharedButton
          Icon={ChevronLeftIcon}
          className='!text-primary-500 !font-regular !gap-xxs !p-xs hover:!shadow-none'
          disabled={!table.getCanPreviousPage()}
          size={buttonSize}
          onClick={table.previousPage}>
          {t('components.table.prev')}
        </SharedButton>
        <nav aria-label={t('components.table.tablePagination')}>
          <ul className='flex gap-xs'>
            {paginationItems.map((paginationItem, index) => (
              <NewTablePaginationItem
                key={index}
                paginationItem={paginationItem}
                selectedPage={pagination.pageIndex}
                onClick={table.setPageIndex}
              />
            ))}
          </ul>
        </nav>
        <SharedButton
          Icon={ChevronRightIcon}
          className='!text-primary-500 !font-regular !gap-xxs !p-xs hover:!shadow-none'
          disabled={!table.getCanNextPage()}
          iconPlacement='end'
          size={buttonSize}
          onClick={table.nextPage}>
          {t('components.table.next')}
        </SharedButton>
      </div>
    </div>
  );
};
