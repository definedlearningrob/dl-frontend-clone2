import cx from 'classnames';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from 'react';

import { type TableCell, type TableHeader } from './TableTypes';
import styles from './Table.module.sass';

type SharedTableProps = PropsWithChildren<{
  className?: string;
  fixed?: boolean;
  footer?: ReactNode;
  header?: ReactElement;
  selectable?: boolean;
  tableStyles?: ReactNode;
}>;

type TableContextValues = {
  selectable: boolean;
  selectedIds: string[];
  setSelectedIds: (ids: string[]) => void;
};

const TableContext = createContext<TableContextValues>({
  selectable: false,
  selectedIds: [],
  setSelectedIds: () => {},
});

const useTableContext = () => useContext(TableContext);

const SharedTable = ({
  children,
  className,
  fixed,
  footer,
  header,
  selectable,
  tableStyles,
}: SharedTableProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const wrapperClasses = cx(styles.wrapper, className);
  const tableClasses = cx(
    styles.table,
    (fixed || selectable) && styles.fixed,
    selectable && styles.selectable,
    tableStyles
  );

  return (
    <TableContext.Provider value={{ selectable: Boolean(selectable), selectedIds, setSelectedIds }}>
      <div className={wrapperClasses}>
        {header}
        <table className={tableClasses}>{children}</table>
        {footer}
      </div>
    </TableContext.Provider>
  );
};

type TableHeadProps = {
  className?: string;
  cols: TableHeader[];
  cellClassName?: string;
  rowClassName?: string;
};

SharedTable.Head = function ({ className, cellClassName, cols, rowClassName }: TableHeadProps) {
  const { selectable } = useTableContext();
  const headClasses = cx(styles.tableHead, styles.tableHeaderColumn, className);
  const rowClasses = cx(styles.tableHeadRow, rowClassName);
  const headerCellClasses = cx(styles.tableHeadCell, cellClassName);
  const headerCheckboxClasses = cx(styles.tableHeadCell, styles.tableHeadCheckbox, cellClassName);

  const renderSelectCheckbox = useMemo(
    () =>
      selectable ? (
        <th className={headerCheckboxClasses}>
          <input type='checkbox' />
        </th>
      ) : null,
    [selectable]
  );

  return (
    <thead className={headClasses}>
      <tr className={rowClasses}>
        {renderSelectCheckbox}
        {cols.map((headerItem) => (
          <th key={headerItem.id} className={headerCellClasses}>
            {headerItem.render()}
          </th>
        ))}
      </tr>
    </thead>
  );
};

type RequiredDataObject = {
  id: string;
};

type TableBodyProps<T extends RequiredDataObject> = {
  className?: string;
  cellClassName?: string;
  cols: TableCell<T>[];
  data: T[];
  fetchMore?: () => void;
  hasNextPage?: boolean;
  rowSelected: (item: T['id']) => boolean;
  onRowClick?: (item: T) => void;
  rowClassName?: string;
};

SharedTable.Body = function <T extends RequiredDataObject>({
  className,
  cellClassName,
  cols,
  data,
  fetchMore,
  hasNextPage,
  rowClassName,
  rowSelected,
  onRowClick,
}: TableBodyProps<T>) {
  const { selectable, selectedIds, setSelectedIds } = useTableContext();
  const isSelected = useCallback(
    (id: string) => selectedIds?.includes(id) || rowSelected(id),
    [rowSelected, selectedIds]
  );

  const bodyClasses = cx(styles.tableBody, styles.tableBodyCell, 'scrollbar', className);
  const rowClasses = cx(styles.tableBodyRow, onRowClick && styles.rowClickable, rowClassName);
  const cellClasses = cx(styles.tableBodyCell, cellClassName);
  const checkboxClasses = cx(styles.tableBodyCell, styles.tableBodyCheckbox, cellClassName);

  const handleScrollNearEnd = useCallback(
    (event) => {
      if (fetchMore) {
        const hitBottom =
          event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight;

        if (hitBottom && hasNextPage) {
          fetchMore();
        }
      }
    },
    [hasNextPage, fetchMore]
  );

  const handleSelection = (id: string) => () => {
    if (isSelected(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const renderSelectCheckbox = useCallback(
    (id: string) =>
      selectable ? (
        <td className={checkboxClasses}>
          <input type='checkbox' onChange={handleSelection(id)} />
        </td>
      ) : null,
    [selectable]
  );

  const onRowClickHandler = (item: T) => () => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  return (
    <tbody className={bodyClasses} onScroll={handleScrollNearEnd}>
      {data.map((item, index) => (
        <tr
          key={index}
          className={cx(rowClasses, isSelected(item.id) && styles.rowSelected)}
          data-testid={`table-row-${item.id}`}
          onClick={onRowClickHandler(item)}>
          {renderSelectCheckbox(item.id)}
          {cols.map((col, key) => (
            <td key={key} className={cellClasses}>
              {col.render(item)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default SharedTable;
