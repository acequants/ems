'use client';

import { FC, useMemo } from 'react';
import { InterfaceDataTable } from '@/interfaces/general.interface';

import dynamic from 'next/dynamic';

export const DataTable: FC<InterfaceDataTable> = (props) => {
  const DataTable = useMemo(
    () =>
      dynamic<any>(
        () =>
          import('react-data-table-component').then((DataTable) => DataTable),
        { ssr: false }
      ),
    []
  );
  const { columns, data, tableExpansion, subHeaderComponent } = props;

  return (
    <DataTable
      columns={columns}
      data={data}
      expandableRows={tableExpansion ? true : false}
      expandableRowsComponent={tableExpansion}
      subHeader={subHeaderComponent ? true : false}
      subHeaderComponent={subHeaderComponent}
    />
  );
};
