import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  PaginationState,
  SortingState,
  ColumnDef,
  ExpandedState,
  getExpandedRowModel,
} from '@tanstack/react-table';
import {
  SetStateAction,
  Dispatch,
  RefObject,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { useUpdateEffect } from 'react-use';
import { useTranslation } from 'react-i18next';
import { isEmpty, isNil, noop } from 'lodash-es';

import { ReactComponent as ChevronDown } from '@shared/assets/icons/chevron_down.svg';
import { ReactComponent as ChevronUp } from '@shared/assets/icons/chevron_up.svg';
import SharedCheckbox from '@shared/components/Checkbox/Checkbox';
import { cx } from '@shared/utils/cx';
import { IconButton } from '@shared/components/IconButton/IconButton';
import { useBreakpointUp } from '@shared/hooks/useBreakpointUp';

import { NewTablePagination } from './NewTablePagination/NewTablePagination';
import { SortIcon } from './SortIcon';
import styles from './NewTable.module.sass';
import { NewTableBody } from './NewTableBody/NewTableBody';
import { NewTableContainer } from './NewTableContainer';

export const PAGE_SIZE_OPTIONS = [25, 50, 75, 100] as const;
export const DEFAULT_PAGE_SIZE = PAGE_SIZE_OPTIONS[0];
export const CHECKBOX_COLUMN_ID = 'select';
export const EXPAND_COLUMN_ID = 'expand';

export type NewTableRef = {
  setRowSelection: Dispatch<SetStateAction<Record<string, boolean>>>;
  setPageIndex: (pageIndex: number) => void;
  clearSelectedRows: () => void;
  scrollTableTop: () => void;
};

export type TableColumns<T> = ColumnDef<T>[];

export type OnTableStateChangeParams = {
  pagination: PaginationState;
  sorting?: SortingState;
};

export type OnTableSortingChangeParams = {
  sorting: SortingState;
};

type Props<T> = {
  onTableStateChange?: (props: OnTableStateChangeParams) => void;
  onTableSortingChange?: (props: OnTableSortingChangeParams) => void;
  columns: TableColumns<T>;
  data: T[];
  pagesCount?: number;
  nodesCount?: number;
  fetchMore?: (nextPage: number) => void;
  onRowClick?: (rowId: string) => void;
  enableSorting?: boolean;
  enableSortingRemoval?: boolean;
  enableRowSelection?: boolean;
  enableVirtualization?: boolean;
  defaultPageSize?: typeof PAGE_SIZE_OPTIONS[number];
  SubRowRenderer?: ReactNode;
  defaultSortingState?: SortingState;
  initialSelectedRows?: string[];
  keyField?: keyof T;
  selectColumnSize?: number;
  apiRef?: RefObject<NewTableRef>;
  emptyMessage?: string;
} & (
  | {
      enableRowSelection: true;
      onSelectRow: (selectedRows: string[]) => void;
    }
  | { enableRowSelection?: false; onSelectRow?: never }
);

export const NewTable = <T extends Record<string, unknown>>({
  data,
  columns,
  pagesCount,
  nodesCount,
  fetchMore,
  onTableStateChange = noop,
  onTableSortingChange = noop,
  onSelectRow,
  onRowClick,
  enableSorting = false,
  enableSortingRemoval,
  enableRowSelection,
  enableVirtualization,
  selectColumnSize = 60,
  SubRowRenderer,
  keyField = 'id',
  defaultPageSize = DEFAULT_PAGE_SIZE,
  initialSelectedRows = [],
  defaultSortingState = [],
  apiRef,
  emptyMessage,
}: Props<T>) => {
  const initialRowSelection = useMemo(
    () =>
      initialSelectedRows.reduce((acc, curr) => {
        acc[curr] = true;

        return acc;
      }, {} as Record<string, boolean>),
    []
  );

  const { t } = useTranslation();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const isFullHD = useBreakpointUp({ breakpoint: 'xxxl' });

  const [sorting, setSorting] = useState<SortingState>(defaultSortingState);
  const [rowSelection, setRowSelection] = useState(initialRowSelection);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const hasPaginationEnabled = !isNil(nodesCount) && !isNil(pagesCount);

  useUpdateEffect(() => {
    if (hasPaginationEnabled) {
      onTableStateChange({ pagination, sorting });
    }
  }, [pagination, sorting]);

  useUpdateEffect(() => {
    if (!hasPaginationEnabled) {
      onTableSortingChange({ sorting });
    }
  }, [sorting]);

  useUpdateEffect(() => {
    if (enableRowSelection) {
      const selectedRows = Object.keys(rowSelection);
      onSelectRow(selectedRows);
    }
  }, [rowSelection, enableRowSelection]);

  const hasInfiniteScroll = !!fetchMore && !isNil(pagesCount);

  const hasExpandableRows = data.some((data) => !isEmpty(data.subRows));

  const computedColumns: TableColumns<T> = useMemo(
    () => [
      ...([
        hasExpandableRows && {
          id: EXPAND_COLUMN_ID,
          size: 30,
          // @ts-ignore
          cell: (params) =>
            params.row.getCanExpand() && (
              <IconButton
                Icon={params.row.getIsExpanded() ? ChevronUp : ChevronDown}
                size={isFullHD ? 'md' : 'sm'}
                onClick={params.row.getToggleExpandedHandler()}
              />
            ),
        },
        enableRowSelection && {
          id: CHECKBOX_COLUMN_ID,
          visible: enableRowSelection,
          size: selectColumnSize,
          // @ts-ignore
          header: (params) =>
            !hasInfiniteScroll ? (
              <SharedCheckbox
                checked={params.table.getIsAllPageRowsSelected()}
                id='select-all'
                indeterminate={params.table.getIsSomePageRowsSelected()}
                onChange={params.table.getToggleAllPageRowsSelectedHandler()}
              />
            ) : null,
          // @ts-ignore
          cell: (params) => (
            <SharedCheckbox
              checked={params.row.getIsSelected()}
              id={params.row.id}
              labelOnClick={(e) => e.stopPropagation()}
              onChange={params.row.getToggleSelectedHandler()}
              onClick={(e) => e.stopPropagation()}
            />
          ),
        },
      ].filter(Boolean) as TableColumns<T>),
      ...columns,
    ],
    [columns, hasExpandableRows]
  );

  const table = useReactTable({
    data,
    // @ts-ignore
    columns: computedColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    // @ts-ignore
    getSubRows: (row) => row.subRows,
    onExpandedChange: setExpanded,
    state: {
      pagination: hasPaginationEnabled ? pagination : undefined,
      sorting,
      rowSelection,
      expanded,
    },
    pageCount: pagesCount,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    manualSorting: true,
    enableSorting,
    enableRowSelection,
    getRowId: (row) => row[keyField] as string,
    enableSortingRemoval,
  });

  const setPageIndex = (pageIndex: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex,
    }));
  };

  const clearSelectedRows = useCallback(() => {
    setRowSelection({});
  }, []);

  const scrollTableTop = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  };

  useImperativeHandle(
    apiRef,
    () => ({ setPageIndex, clearSelectedRows, setRowSelection, scrollTableTop }),
    [setPageIndex, clearSelectedRows, setRowSelection, scrollTableTop]
  );

  const tableHeadClasses = cx('sticky top-0 bg-white z-lower', styles.tableHead);
  const columnHeaderClasses = cx(
    'text-xxs xxxl:text-xs font-medium text-left leading-lg',
    'p-xs xxxl:px-x first:pl-base last:pr-base xxxl:first:pl-md xxxl:last:pr-md'
  );

  return (
    <div className='overflow-hidden flex flex-col h-full min-h-0'>
      <div ref={tableContainerRef} className='grow z-lowest scrollbar'>
        <NewTableContainer
          columnsCount={enableRowSelection ? columns.length + 1 : columns.length}
          fetchMore={fetchMore}
          pagesCount={pagesCount}
          pagination={pagination}
          setPagination={setPagination}>
          <>
            <thead className={tableHeadClasses}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={columnHeaderClasses}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                      onClick={header.column.getToggleSortingHandler()}>
                      {!header.isPlaceholder && (
                        <div
                          className={cx(
                            {
                              'flex items-center gap-xxs cursor-pointer select-none':
                                header.column.getCanSort(),
                            },
                            header.column.columnDef.meta?.headerClassName
                          )}>
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <SortIcon sortingDirection={header.column.getIsSorted()} />
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <NewTableBody
              SubRowRenderer={SubRowRenderer}
              enableVirtualization={enableVirtualization}
              table={table}
              tableContainerRef={tableContainerRef}
              onRowClick={onRowClick}
            />
          </>
        </NewTableContainer>
        {isEmpty(data) && (
          <div className='text-center py-base text-xs'>
            {emptyMessage ?? t('components.table.noResultsFound')}
          </div>
        )}
      </div>
      {hasPaginationEnabled && (
        <NewTablePagination
          defaultPageSize={defaultPageSize}
          nodesCount={nodesCount}
          table={table}
        />
      )}
    </div>
  );
};
