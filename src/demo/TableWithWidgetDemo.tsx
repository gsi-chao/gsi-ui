import React, { Component, ReactNode } from 'react';
import { IVWidgetTableProps } from '../components/Table/Widget/Widget';
import { Button, Icon, Popover } from '@blueprintjs/core';
import { VTable } from '../components/Table';
import { showToastNotification } from '../components/ToastNotification';

export const dropDown: IVWidgetTableProps = {
  column: 'dropdown',
  widget: {
    type: 'DROPDOWN',
    dropdownCell: {
      options: [
        { index: 1, value: 4, label: 'otro' },
        { index: 2, value: 3, label: 'Lastname7' },
        { index: 3, value: 2, label: 'lucia alvares' },
        { index: 4, value: 1, label: 'jajajojo jujuju' }
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
  columns: string[];
}

interface IData {
  name: string;
  dropdown: string | number;
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
      data: this.getData(),
      columns: [
        'name',
        'dropdown',
        'other',
        'fecha',
        'checkbox',
        'color',
        'sinEditar',
        'customer'
      ]
    };
  }

  doSomethingAwesomeWithTheValue = (value: any) => {
     console.log(value);
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
            columnWidths={[200, 125, 150, 200]}
            onSelectionChange={this.doSomethingAwesomeWithTheValue}
            edit={{
              editColumn: {
                columns: 'ALL'
              },
              onSave: this.onSave,
              invalidDataMessage: (invalidColumns: string[]) => {
                showToastNotification({
                  type: 'danger',
                  message: `No se puede guardar porq las siguiente columnas tienen datos invalidos: ${invalidColumns.join(
                    ' , '
                  )}`,
                  timeout: 8000
                });
              },

              editToolbar: {
                textSave: 'Salvar',
                textCancel: 'Cancelar',
                iconCancel: 'cross',
                iconEdit: 'take-action',
                iconSave: 'share'
              }
            }}
            cellSelectionType={'CELL'}
            widgetsCell={widgetsCell}
            columns={this.state.columns}
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
            data={this.getData()}
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
            typeHeightRow={'SHORT'}
            enableColumnResizing={true}
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
        <button onClick={this.changeColumn}>cambiar columnas</button>
        <button
          onClick={() => {
            this.changeData('red');
          }}
        >
          cambiar datos
        </button>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div style={{ height: '50px' }}>
          <Popover
            content={
              <div style={{ padding: '0px 40px' }}>
                <p>sdfsf</p>
                <p>sdfsf</p>
                <p>sdfsf</p>
                <p>sdfsf</p>
                <p>sdfsf</p>
                <p>sdfsf</p>
              </div>
            }
            usePortal={true}
            target={
              <div id={'mio'}>
                {' '}
                <Button text="Open" />{' '}
              </div>
            }
          />
        </div>
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

  changeData = (colorFiltered?: string) => {
    this.setState({
      data: this.getData(colorFiltered)
    });
  };

  changeColumn = () => {
    this.setState({
      columns: ['name', 'dropdown', 'other', 'fecha', 'checkbox']
    });
  };

  getData = (colorFiltered?: string): IData[] => {
    const data = [
      {
        name: 'Arturo',
        dropdown: 1,
        other: 'OtherInfo',
        fecha: '10/11/2019',
        checkbox: false,
        color: 'red',
        sinEditar: 'another better text',
        customer: 'passenger'
      },
      {
        name: 'Carlos',
        dropdown: 2,
        other: 'Lastname7',
        fecha: '12/05/2018',
        checkbox: false,
        color: 'red',
        sinEditar: ' some text',
        customer: 'customer'
      },
      {
        name: 'Manuel',
        dropdown: 2,
        other: 'Lastname7',
        fecha: '12/05/2018',
        checkbox: true,
        color: 'color',
        sinEditar: ' some text',
        customer: 'customer'
      },
      {
        name: 'Pepe',
        dropdown: 2,
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
