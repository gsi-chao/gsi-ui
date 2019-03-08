import React, { Component, ReactNode } from 'react';
import { IVWidgetTableProps } from '../components/Table/Widget/Widget';
import { Icon } from '@blueprintjs/core';
import { VTable } from '../components/Table';
import { showToastNotification } from '../components/ToastNotification';

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
      printColor: (value: string) => {
        return true;
      }
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
export const widgetsCell: IVWidgetTableProps[] = [
  dropDown,
  colorWidget,
  datetimeWidget,
  checkboxWidget,
  customerwidget
];

interface IProps {}

interface IState {
  changeColor: boolean;
  data: IData[];
}

interface IData {
  name: string;
  dropdown: string;
  other: string;
  fecha: string;
  checkbox: boolean;
  color: string;
  sinEditar: string;
  customer: string;
}

class TableWithWidgetDemo extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      changeColor: false,
      data: this.getData()
    };
  }

  doSomethingAwesomeWithTheValue = (value: any) => {
    // console.log(value);
  };
  render() {
    // validator example
    const nameValidation = (value: string) => {
      return value.length > 5;
    };

    const fechaValidation = (value: string) => {
      return value.length < 5;
    };

    return (
      <React.Fragment>
        <div>
          <VTable
            columnWidths={[200, 125, 150, 200, 100]}
            onSelectionChange={this.doSomethingAwesomeWithTheValue}
            edit={{
              editColumn: {
                columns: 'ALL',

              },

              onSave: this.onSave,
              invalidDataMessage: (invalidColumns: string[]) => {
                showToastNotification({
                  type: 'danger',
                  message: `No se puede guardar porq las siguiente columnas tienen datos invalidos: ${invalidColumns.join(
                    ' , '
                  )}`,
                  timeout:8000
                });
                console.log();
              },

              editToolbar: {
                textSave: 'Salvar',
                textCancel: 'Cancelar',
                iconCancel: 'cross',
                iconEdit: 'take-action',
                iconSave: 'share'
              }
            }}
            cellSelectionType={'FREE'}
            widgetsCell={widgetsCell}
            columns={[
              'name',
              'dropdown',
              'other',
              'fecha',
              'checkbox',
              'color',
              'sinEditar',
              'customer'
            ]}
            columns_name={{ name: 'Namesito' }}
            reordering={true}
            sortable={{ columns: ['name'], onSort: this.onSort }}
            contextual={{
              columns: [
                'name',
                'dropdown',
                'other',
                'fecha',
                'checkbox',
                'color',
                'customer'
              ],
              default_actions: ['copy', 'paste', 'export'],
              actions: [
                {
                  icon: 'export',
                  action: (item: any) => console.log(item),
                  text: 'Action Input'
                }
              ]
            }}
            data={this.state.data}
            configColumnsHeader={[
              {
                column: 'name',
                textColor: 'white',
                backgroundColor: '#DB2C6F'
              },
              {
                column: 'fecha',
                textColor: 'white',
                backgroundColor: '#634DBF'
              },
              {
                column: 'dropdown',
                textColor: 'white',
                backgroundColor: '#D13913'
              },
              {
                column: 'color',
                textColor: 'white',
                backgroundColor: '#238C2C'
              }
            ]}
            typeHeightRow={'HALF'}
            toolbar={
              <div
                style={{ width: '100%', height: 50, backgroundColor: 'teal' }}
              >
                Toolbar
              </div>
            }
            footer={
              <div
                style={{ width: '100%', height: 50, backgroundColor: 'blue' }}
              >
                Toolbar
              </div>
            }
          />
        </div>

        <br />

        <button onClick={this.handleChangeColor}>cambiar color</button>
        <button
          onClick={() => {
            this.changeData('red');
          }}
        >
          cambiar datos
        </button>
      </React.Fragment>
    );
  }

  onSave = (data: any) => {
    console.log('datos salvados..', data);
  };
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


  changeData =(colorFiltered?:string)=>{
    this.setState({
      data:this.getData(colorFiltered)
    })
  };

  getData = (colorFiltered?: string): IData[] => {
    const data = [
      {
        name: 'Arturo',
        dropdown: 'otro',
        other: 'OtherInfo',
        fecha: '10/11/2019',
        checkbox: false,
        color: 'red',
        sinEditar: 'another better text',
        customer: 'passenger'
      },
      {
        name: 'Carlos',
        dropdown: 'Lastname7',
        other: 'Lastname7',
        fecha: '12/05/2018',
        checkbox: false,
        color: 'red',
        sinEditar: ' some text',
        customer: 'customer'
      },
      {
        name: 'Manuel',
        dropdown: 'Lastname7',
        other: 'Lastname7',
        fecha: '12/05/2018',
        checkbox: true,
        color: 'color',
        sinEditar: ' some text',
        customer: 'customer'
      },
      {
        name: 'Pepe',
        dropdown: 'Lastname7',
        other: 'Lastname7',
        fecha: '12/05/2018',
        checkbox: false,
        color: 'blue',
        sinEditar: ' some text',
        customer: 'customer'
      }
    ];

    return colorFiltered ? data.filter(x => x.color === colorFiltered) : data;
  };
}

export default TableWithWidgetDemo;
