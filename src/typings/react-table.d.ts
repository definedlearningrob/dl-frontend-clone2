import '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface ColumnMeta {
    ellipsis?: boolean;
    className?: string;
    headerClassName?: string;
  }
}
