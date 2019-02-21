import React, { Component, ReactNode } from 'react';
import { IVWidgetTableProps } from '../components/Table/Widget/Widget';
import { Icon } from '@blueprintjs/core';
import { VTable } from '../components/Table';
import { Cell } from '@blueprintjs/table';

export const dropDown: IVWidgetTableProps = {
  column: 'dropdown',
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

export const colorWidget: IVWidgetTableProps = {
  column: 'color',
  widget: {
    type: 'COLOR',
    colorCell: {
      backgroundColor: 'orange',
      color: 'white',
      printColor: (value: string) => {return true}
    }
  }
};

export const checkboxWidget: IVWidgetTableProps = {
  column: 'checkbox',
  widget: {
    type: 'CHECKBOX'
  }
};

export const datetimeWidget: IVWidgetTableProps = {
  column: 'fecha',
  widget: {
    type: 'DATETIME',
    dateTimeCell: {
      icon: 'calendar'
    }
  }
};

export const customerwidget: IVWidgetTableProps = {
  column: 'customer',
  widget: {
    type: 'CUSTOMERCOMPONENT',
    cusmtomerCell: {
      renderCustomer: (value: string): ReactNode => {
        return (
          <div>
            <Icon icon={'phone'} iconSize={15} intent={'success'} /> {value}
          </div>
        );
      }
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
export const widgetsCell: IVWidgetTableProps[] = [dropDown,colorWidget,datetimeWidget,checkboxWidget,customerwidget];

class TableWithWidgetDemo extends Component {
  state = {
    changeColor: false
  };
  render() {
    const data = [
      { name: 'Carlos', dropdown: 'Lastname7', other: 'Lastname7', fecha: '12/05/2018', checkbox:true, color:'color', sinEditar:' some text' ,customer:'customer'},
      { name: 'Carlos', dropdown: 'Lastname7', other: 'Lastname7', fecha: '12/05/2018', checkbox:false, color:'color', sinEditar:' some text',customer:'customer' },
      { name: 'Carlos', dropdown: 'Lastname7', other: 'Lastname7', fecha: '12/05/2018', checkbox:true, color:'color', sinEditar:' some text',customer:'customer' },
      { name: 'Carlos', dropdown: 'Lastname7', other: 'Lastname7', fecha: '12/05/2018', checkbox:false, color:'color', sinEditar:' some text', customer:'customer' },
      { name: 'Carlos', dropdown: 'Lastname7', other: 'Lastname7', fecha: '12/05/2018', checkbox:true, color:'color', sinEditar:' some text', customer:'customer' },


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
            columns={['name', 'dropdown', 'other','fecha','checkbox','color','sinEditar','customer']}
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
            enableColumnResizing={true}
            enableRowResizing={true}
            typeHeightRow={'HALF'}
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
      widgetsCell[1] &&
      widgetsCell[1].widget &&
      widgetsCell[1].widget.colorCell
    ) {
      widgetsCell[1].widget.colorCell.backgroundColor = 'green';
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
