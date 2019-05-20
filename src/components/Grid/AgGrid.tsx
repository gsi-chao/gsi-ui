import React, { Component } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const VAgGrid = (props: AgGridReactProps) => {
  return (
    <div
      className="ag-theme-balham"
      style={{
        height: '500px',
        width: '600px'
      }}
    >
      <AgGridReact {...props} />
    </div>
  );
};

export default VAgGrid;
