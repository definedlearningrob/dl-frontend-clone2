import { useCallback, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useUpdateEffect } from 'react-use';
import '@dc/shared/Table/Table.sass';

SharedTable.propTypes = {
  children: PropTypes.node.isRequired,
};

function SharedTable({ children, tableWrapperClassname, tableClassname }) {
  const tableWrapperClasses = cx('shared-table', tableWrapperClassname);
  const tableClasses = cx('shared-table__table', tableClassname);

  return (
    <div className={tableWrapperClasses}>
      <table className={tableClasses}>{children}</table>
    </div>
  );
}

SharedTable.propTypes = {
  tableClassname: PropTypes.string,
  tableWrapperClassname: PropTypes.string,
};

SharedTable.Head = function ({ cols, headClassname, rowClassName, columnClassname }) {
  const headClasses = cx(
    'shared-table__head',
    `shared-table__head-cols-${cols.length}`,
    headClassname
  );
  const rowClasses = (index) => cx('shared-table__row', `shared-table__row-${index}`, rowClassName);
  const columnClasses = (index) =>
    cx('shared-table__column', '-header-cell', `shared-table__column-${index}`, columnClassname);

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

SharedTable.Head.propTypes = {
  cols: PropTypes.array.isRequired,
  columnClassname: PropTypes.string,
  headClassname: PropTypes.string,
  rowClassName: PropTypes.string,
};

SharedTable.Body = function ({
  cols,
  data,
  fetchMore,
  hasNextPage,
  onRowClick,
  columnClassname,
  rowClassname,
  selectedRowClassname = '',
  bodyClassname,
  selectedRowIndex,
  isRowDisabled,
}) {
  const [selectedRow, setSelectedRow] = useState(selectedRowIndex || 0);

  useUpdateEffect(() => {
    setSelectedRow(selectedRowIndex);
  }, [selectedRowIndex]);

  const handleRowClick = (index, item, event) => {
    if (isRowDisabled && isRowDisabled(index)) {
      return;
    }
    setSelectedRow(index);
    onRowClick(index, item, event);
  };

  const bodyClasses = cx(
    'shared-table__body',
    `shared-table__body-cols-${cols.length}`,
    bodyClassname
  );
  const rowClasses = (index) =>
    cx('shared-table__row', `shared-table__row-${index + 1}`, rowClassname, {
      ...(selectedRowClassname && {
        [selectedRowClassname]: selectedRow === index,
      }),
    });

  const columnClasses = (index, rowIndex) =>
    cx('shared-table__column', `shared-table__column-${index}`, columnClassname, {
      '!cursor-default': isRowDisabled && isRowDisabled(rowIndex),
    });

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

  return (
    <tbody className={bodyClasses} onScroll={handleScrollNearEnd}>
      {data.map((item, index) => (
        <tr
          key={index}
          className={rowClasses(index)}
          data-testid='list-item'
          {...(onRowClick && { onClick: (event) => handleRowClick(index, item, event) })}>
          {cols.map((col, key) => (
            <td
              key={key}
              className={columnClasses(key + 1, index)}
              data-testid='shared-table-column'>
              {col.render(item, index)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

SharedTable.Body.propTypes = {
  bodyClassname: PropTypes.string,
  cols: PropTypes.array.isRequired,
  columnClassname: PropTypes.string,
  data: PropTypes.array.isRequired,
  fetchMore: PropTypes.func,
  hasNextPage: PropTypes.bool,
  isRowDisabled: PropTypes.func,
  onHover: PropTypes.func,
  onRowClick: PropTypes.func,
  rowClassname: PropTypes.string,
  selectedRowClassname: PropTypes.string,
  selectedRowIndex: PropTypes.number,
};

export default SharedTable;
