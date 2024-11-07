// @ts-nocheck
import { ReactNode, JSX, useCallback, useState } from 'react';
import cx from 'classnames';

import './Table.sass';

import SharedLoadingSpinner from '../LoadingSpinner/LoadingSpinner';

type TableProps = {
  children: ReactNode;
};

type TableCols<T> = {
  title?: string;
  render?: (rowData: T) => JSX.Element;
};

type TableHeaderProps = {
  className?: string;
  cols: TableCols[];
};

type TablesPropsBody<T> = {
  className?: string;
  cols: TableCols<T>[];
  data: T[];
  fetchMore?: () => void;
  hasNextPage?: boolean | string;
};

function SharedTable({ children }: TableProps) {
  return (
    <div className='shared-table'>
      <table className='shared-table__table'>{children}</table>
    </div>
  );
}

SharedTable.Head = function ({ className, cols }: TableHeaderProps) {
  const headClasses = cx(className, 'shared-table__head', `shared-table__head-cols-${cols.length}`);
  const rowClasses = (index) => cx('shared-table__row', `shared-table__row-${index}`);
  const columnClasses = (index) =>
    cx('shared-table__column', '-header-cell', `shared-table__column-${index}`);

  return (
    <thead className={headClasses}>
      <tr className={rowClasses(0)}>
        {cols.map((headerItem, index) => (
          <th key={index} className={columnClasses(index + 1)}>
            {headerItem.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

SharedTable.Body = function <T>({
  className,
  cols,
  data,
  fetchMore,
  hasNextPage,
}: TablesPropsBody<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const bodyClasses = cx(
    className,
    'shared-table__body',
    'scrollbar',
    `shared-table__body-cols-${cols.length}`
  );
  const rowClasses = (index) => cx('shared-table__row', `shared-table__row-${index}`);
  const columnClasses = (index) => cx('shared-table__column', `shared-table__column-${index}`);
  const handleScrollNearEnd = useCallback(
    async (event) => {
      if (fetchMore) {
        const hitBottom =
          event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight;

        if (hitBottom && hasNextPage) {
          setIsLoading(true);
          await fetchMore();
          setIsLoading(false);
        }
      }
    },
    [hasNextPage, fetchMore]
  );

  return (
    <tbody className={bodyClasses} onScroll={handleScrollNearEnd}>
      {data.map((item, index) => (
        <tr key={index} className={rowClasses(index + 1)} data-testid='list-item'>
          {cols.map((col, key) => (
            <td key={key} className={columnClasses(key + 1)}>
              {col.render(item)}
            </td>
          ))}
        </tr>
      ))}
      {isLoading && (
        <tr className='shared-table__fetch-more'>
          <td
            className='shared-table__fetch-more-cell'
            style={{
              gridColumnEnd: cols.length + 1,
            }}>
            <SharedLoadingSpinner size='small' />
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default SharedTable;
