import type { ReactNode } from 'react';

export type TableHeader = {
  id: string;
  render: () => ReactNode;
};

export type TableHeadData = TableHeader[];

export type TableCell<T> = {
  render: (item: T) => ReactNode;
};

export type TableBodyData<T> = TableCell<T>[];
