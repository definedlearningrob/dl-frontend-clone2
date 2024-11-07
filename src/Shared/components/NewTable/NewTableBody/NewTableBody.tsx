import { Table } from '@tanstack/react-table';
import { ReactNode, RefObject } from 'react';

import { NewTableRow } from './NewTableRow';
import { VirtualizedRows } from './VirtualizedRows';

type Props<T> = {
  enableVirtualization?: boolean;
  table: Table<T>;
  onRowClick?: (rowId: string) => void;
  SubRowRenderer?: ReactNode;
  tableContainerRef: RefObject<HTMLDivElement>;
};

export const NewTableBody = <T extends Record<string, unknown>>({
  enableVirtualization,
  table,
  onRowClick,
  SubRowRenderer,
  tableContainerRef,
}: Props<T>) => {
  const { rows } = table.getRowModel();

  if (enableVirtualization) {
    return (
      <VirtualizedRows rows={rows} tableContainerRef={tableContainerRef} onRowClick={onRowClick} />
    );
  }

  return (
    <tbody>
      {rows.map((row) => (
        <NewTableRow
          key={row.id}
          SubRowRenderer={SubRowRenderer}
          isExpanded={row.getIsExpanded()}
          isSelected={row.getIsSelected()}
          // @ts-ignore
          row={row}
          onRowClick={onRowClick}
        />
      ))}
    </tbody>
  );
};
