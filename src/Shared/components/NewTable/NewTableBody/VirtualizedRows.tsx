import { Row } from '@tanstack/react-table';
import { useVirtual } from 'react-virtual';
import { RefObject } from 'react';

import { NewTableRow } from './NewTableRow';

type Props<T> = {
  rows: Row<T>[];
  onRowClick?: (rowId: string) => void;
  tableContainerRef: RefObject<HTMLDivElement>;
};

export const VirtualizedRows = <T extends Record<string, unknown>>({
  rows,
  onRowClick,
  tableContainerRef,
}: Props<T>) => {
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
  const paddingTop = virtualRows?.[0]?.start || 0;
  const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows?.at(-1)?.end || 0) : 0;

  return (
    <tbody>
      {paddingTop > 0 && (
        <tr>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {virtualRows.map((virtualRow) => {
        const row = rows[virtualRow.index];

        return (
          <NewTableRow
            key={row.id}
            isSelected={row.getIsSelected()}
            // @ts-ignore
            row={row}
            onRowClick={onRowClick}
          />
        );
      })}
      {paddingBottom > 0 && (
        <tr>
          <td style={{ height: `${paddingBottom}px` }} />
        </tr>
      )}
    </tbody>
  );
};
