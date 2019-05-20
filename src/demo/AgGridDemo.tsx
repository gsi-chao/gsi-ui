import React from 'react';
import VAgGrid from '../components/Grid/AgGrid';

const AgGridDemo = () => {
  const state = {
    columnDefs: [
      {
        headerName: 'Make',
        field: 'make',
        sortable: true,
        filter: true
      },
      {
        headerName: 'Model',
        field: 'model',
        sortable: true,
        filter: true
      },
      {
        headerName: 'Price',
        field: 'price',
        sortable: true,
        filter: true
      }
    ],
    rowData: [
      {
        make: 'Toyota',
        model: 'Celica',
        price: 35000
      },
      {
        make: 'Ford',
        model: 'Mondeo',
        price: 32000
      },
      {
        make: 'Porsche',
        model: 'Boxter',
        price: 72000
      }
    ]
  };
  return (
    <VAgGrid
      rowSelection="multiple"
      columnDefs={state.columnDefs}
      rowData={state.rowData}
    />
  );
};

export default AgGridDemo;
