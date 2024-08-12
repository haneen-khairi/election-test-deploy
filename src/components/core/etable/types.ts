export interface TableColumn {
  Header: string;
  accessor?: string;
  Cell?: React.FC<{ cell: unknown }>;
  disableSortBy?: boolean;
}
