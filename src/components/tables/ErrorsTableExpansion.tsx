'use client';

import { InterfaceTableExpansion } from '@/interfaces/general.interface';
import { FC } from 'react';

export const ErrorsTableExpansion: FC<InterfaceTableExpansion> = ({ data }) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 text-muted mb-3'>
          <h5 className='text-uppercase mt-3'>Error Description</h5>

          <hr />

          {data?.description}
        </div>
      </div>
    </div>
  );
};
