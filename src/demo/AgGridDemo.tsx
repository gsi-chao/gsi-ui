import React from 'react';
import {VAgGrid, setLicenceManager} from '../components/Grid';
import { ICellRendererParams } from 'ag-grid-community';
import { VSelectField } from '../components/Form';

class MakeCellRender extends React.Component<ICellRendererParams> {
  render() {
    // put in render logic
    return (
      <span onClick={event => this.onClick()}>{`${this.props.value} LOL`}</span>
    );
  }

  onClick = () => {
    console.log('click');
  };
}

const store = [
  {
    label: 'Toyota',
    value: 'Toyota'
  },
  {
    label: 'Ford',
    value: 'Ford'
  },
  {
    label: 'Porsche',
    value: 'Porsche'
  }
];

class SelectCellRender extends React.Component<ICellRendererParams> {
  render() {
    console.log(this.props.value);
    return (
      <VSelectField
        minimal
        fill
        options={store}
        inline
        value={this.props.value}
        id="store"
        // onChange={this.setSelectedValue}
      />
    );
  }
}

const AgGridDemo = () => {
  const state = {
    columnDefs: [
      {
        headerName: 'Make',
        field: 'make',
        sortable: true,
        filter: true,
        cellRendererFramework: SelectCellRender,
        editable: true
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
      pagination={true}
      enableFilter={true}
      enableSorting={true}
    />
  );
};

export default AgGridDemo;
