import React, { Component, ReactNode } from 'react';
import { IVWidgetTableProps } from '../components/Table/Widget/Widget';
import { Icon } from '@blueprintjs/core';
import { VTable } from '../components/Table';
import { Cell } from '@blueprintjs/table';

export const dropDown: IVWidgetTableProps = {
  row: 9,
  column: 'lastname',
  widget: {
    type: 'DROPDOWN',
    dropdownCell: {
      options: [
        { index: 1, value: 'otro' },
        { index: 2, value: 'Lastname7' },
        { index: 3, value: 'lucia alvares' },
        { index: 4, value: 'jajajojo jujuju' }
      ],
      filterable: true
    }
  }
};
export const renderCustomer = (value: string): ReactNode => {
  return (
    <div>
      <Icon icon={'phone'} iconSize={15} intent={'success'} /> {value}
    </div>
  );
};
export const widgetsCell: IVWidgetTableProps[] = [
  {
    row: 3,
    column: 'lastname',
    widget: {
      type: 'COLOR',
      colorCell: { backgroundColor: 'orange', color: 'white' }
    }
  },
  {
    row: 5,
    column: 'lastname',
    widget: {
      type: 'CUSTOMERCOMPONENT',
      cusmtomerCell: {
        renderCustomer
      }
    }
  },
  {
    row: 7,
    column: 'name',
    widget: {
      type: 'CHECKBOX'
    }
  },
  dropDown,
  {
    row: 10,
    column: 'name',
    widget: {
      type: 'DATETIME',
      dateTimeCell: {
        icon: 'calendar'
      }
    }
  }
];

class TableWithWidgetDemo extends Component {
  state = {
    changeColor: false
  };
  render() {
    const data = [
      { name: 'Carlos', lastname: 'Chao' },
      { name: 'Name1', lastname: 'Lastname1' },
      { name: 'Name2', lastname: 'Lastname2' },
      { name: 'Name3', lastname: 'Lastname3' },
      { name: 'Name4', lastname: 'Lastname4' },
      { name: 'Name5', lastname: 'Lastname5' },
      { name: 'Name6', lastname: 'Lastname6' },
      { name: true, lastname: 'Lastname7' },
      { name: 'name7', lastname: 'Lastname7' },
      { name: 'Name7', lastname: 'Lastname7' },
      { name: '12/05/2018', lastname: 'Lastname7' },
      { name: '12/05/2018', lastname: 'Lastname7' }
    ];

    // validator example
    const nameValidation = (value: string) => {
      return value.length > 5;
    };

    const cellRenderer = (rowIndex: number) => {
      return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>;
    };

    return (
      <React.Fragment>
        <div>
          <VTable
            edit={{ columns: ['name'], validation: { name: nameValidation } }}
            widgetsCell={widgetsCell}
            columns={['name', 'lastname']}
            columns_name={{ name: 'Namesito' }}
            reordering={true}
            sortable={{ columns: ['name'], onSort: this.onSort }}
            contextual={{
              columns: ['name'],
              default_actions: ['copy', 'paste', 'export'],
              actions: [
                {
                  icon: 'export',
                  action: (item: any) => console.log(item),
                  text: 'Action Input'
                }
              ]
            }}
            data={data}
          />
        </div>

        <br />

        <button onClick={this.handleChangeColor}>cambiar color</button>
        <div style={{ display: 'flex' }}>
          {/*<Table numRows={10} enableRowHeader={false} defaultRowHeight={100}>*/}
          {/*<Column name="Dollars" cellRenderer={cellRenderer}/>*/}
          {/*<Column name="Dollarsss" cellRenderer={cellRenderer}/>*/}
          {/*</Table>*/}
          {/*<Table numRows={10}  enableRowHeader={false}>*/}
          {/*<Column name="other" cellRenderer={cellRenderer}/>*/}
          {/*<Column name="other2" cellRenderer={cellRenderer}/>*/}
          {/*</Table>*/}
        </div>
      </React.Fragment>
    );
  }
  handleChangeColor = () => {
    if (
      widgetsCell[0] &&
      widgetsCell[0].widget &&
      widgetsCell[0].widget.colorCell
    ) {
      widgetsCell[0].widget.colorCell.backgroundColor = 'green';
      this.setState({
        changeColor: !this.state.changeColor
      });
    }
  };

  onSort = (index: number, order: string) => {
    console.log(index);
    console.log(order);
  };
}

export default TableWithWidgetDemo;
