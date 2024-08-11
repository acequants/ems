'use client';

import { DataTableFilterProps } from '@/interfaces/general.interface';
import { FC } from 'react';

const DataTableFilter: FC<DataTableFilterProps> = ({
  filterText,
  onFilter,
  onClear,
}) => {
  return (
    <div className='row'>
      <div className='col-md-12 p-0'>
        <div className='input-group input-group-sm m-0'>
          <input
            className='form-control'
            id='search'
            placeholder='Filter by name, user or state'
            aria-label='Filter by name, user or state'
            type='text'
            value={filterText}
            onChange={onFilter}
          />
          <button className='btn btn-primary' type='button' onClick={onClear}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTableFilter;
