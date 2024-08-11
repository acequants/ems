import { ChangeEventHandler, ReactNode } from 'react';

export interface InterfaceNavigation {
  label: string;
  route: string;
  icon: string;
}

export interface InterfaceFetchMany {
  records: any[];
}

export interface InterfaceDataTable {
  columns: any[];
  data: any[];
  tableExpansion?: any;
  subHeaderComponent?: ReactNode;
}

export interface InterfaceTableExpansion {
  data: any;
}

export interface DataTableFilterProps {
  filterText: string;
  onFilter: ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
}
