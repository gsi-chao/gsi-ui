import React from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


interface IProps extends AgGridReactProps {
  height?: string,
  width?: string,
}


export const VAgGrid = (props: IProps) => {
  return (
    <div
      className="ag-theme-balham"
      style={{
        height: props.height ? props.height : '100%',
        width: props.width ? props.width : '100%'
      }}
    >
      <AgGridReact reactNext={true} {...props} />
    </div>
  );
};

export default VAgGrid;
