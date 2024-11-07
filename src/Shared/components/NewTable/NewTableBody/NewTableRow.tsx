import { Cell, Row, flexRender } from '@tanstack/react-table';
import { MouseEvent, memo, KeyboardEventHandler } from 'react';

import { cx } from '@shared/utils/cx';
import { Tooltip } from '@shared/components/Tooltip';

import { CHECKBOX_COLUMN_ID } from '../NewTable';

type Props<T> = {
  row: Row<T>;
  isSelected: boolean;
  isExpanded?: boolean;
  SubRowRenderer?: any;
  onRowClick?: (rowId: string) => void;
};

export const NewTableRow = memo(
  <T extends Record<string, unknown>>({
    row,
    onRowClick,
    isSelected,
    isExpanded,
    SubRowRenderer,
  }: Props<T>) => {
    const isClickable = !!onRowClick;

    const handleRowClick = (rowId: string) => {
      if (isClickable) {
        onRowClick(rowId);
      }
    };

    const handleCellClick = (event: MouseEvent<HTMLTableCellElement>, cell: Cell<T, unknown>) => {
      const isCheckboxColumn = cell.column.id === CHECKBOX_COLUMN_ID;
      if (isCheckboxColumn) {
        event.stopPropagation();
        cell.row.toggleSelected();
      }
    };

    const handleKeyDown: KeyboardEventHandler<HTMLTableRowElement> = (event) => {
      if (event.key === 'Enter') {
        handleRowClick(row.id);
      }
    };

    const tableRowClasses = cx('group/row border-b border-neutral-300 transition-colors', {
      'cursor-pointer': isClickable,
      'hover:bg-primary-200': isClickable || row.getCanSelect(),
      'bg-primary-200': isSelected,
      'bg-neutral-200 group/expandedRow': isExpanded,
    });

    if (SubRowRenderer && row.parentId) {
      return <SubRowRenderer row={row} />;
    }

    return (
      <tr
        key={row.id}
        {...(isExpanded && { 'aria-expanded': isExpanded })}
        className={tableRowClasses}
        tabIndex={isClickable ? 0 : -1}
        onClick={() => handleRowClick(row.id)}
        onKeyDown={handleKeyDown}>
        {row.getVisibleCells().map((cell) => {
          const hasEllipsis = !!cell.column.columnDef.meta?.ellipsis;

          return (
            <td
              key={cell.id}
              className={cx(
                'text-xxs xxxl:text-xs leading-lg',
                'p-xs xxxl:px-x first:pl-base last:pr-base xxxl:first:pl-md xxxl:last:pr-md',
                cell.column.columnDef.meta?.className
              )}
              onClick={(event) => handleCellClick(event, cell)}>
              {hasEllipsis && (
                <Tooltip
                  className='truncate block max-w-fit'
                  delayDuration={500}
                  disabled={!hasEllipsis}
                  message={cell.getValue()}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Tooltip>
              )}
              {!hasEllipsis && flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        })}
      </tr>
    );
  }
);
