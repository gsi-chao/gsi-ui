import React, { Component, ReactNode } from 'react';
import { IVWidgetTableProps } from '../components/Table/Widget/Widget';
import { Button, Icon } from '@blueprintjs/core';
import { VTable } from '../components/Table';
import { showToastNotification } from '../components/ToastNotification';
import { CellSelectionType } from '../components/Table/type';

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
    },
    colorCell: {
      column: 'dropdown',
      row: 1,
      backgroundColor: 'blue',
      color: 'white',
      printColor: () => {
        return true;
      }
    }
  }
};

export const colorWidget: IVWidgetTableProps = {
  row: 1,
  widget: {
    type: 'COLOR',
    colorCell: {
      backgroundColor: 'orange',
      color: 'white',
      printColor: () => {
        return true;
      }
    }
  }
};

export const checkboxWidget: IVWidgetTableProps = {
  column: 'checkbox',
  widget: {
    type: 'CHECKBOX',
    colorCell: {
      column: 'checkbox',
      row: 1,
      backgroundColor: 'orange',
      color: 'white',
      printColor: () => {
        return true;
      }
    }
  }
};

export const editWidget: IVWidgetTableProps = {
  column: 'name',
  row: 1,
  widget: {
    type: 'EDIT',
    colorCell: {
      column: 'name',
      row: 1,
      backgroundColor: 'orange',
      color: 'white',
      printColor: () => {
        return true;
      }
    }
  }
};

export const datetimeWidget: IVWidgetTableProps = {
  column: 'fecha',
  widget: {
    type: 'DATETIME',
    dateTimeCell: {
      icon: 'calendar'
    },
    colorCell: {
      column: 'fecha',
      backgroundColor: 'orange',
      color: 'white',
      printColor: () => {
        return true;
      }
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
    },
    colorCell: {
      row: 1,
      backgroundColor: 'orange',
      color: 'white',
      printColor: () => {
        return true;
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
  clearSelection: boolean | undefined;
  typeSelection: CellSelectionType;
  filterColumn: boolean;
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
      ],
      clearSelection: undefined,
      typeSelection: 'FREE',
      filterColumn: false
    };
  }

  doSomethingAwesomeWithTheValue = (value: any) => {
    console.log(value);
  };

  handleFilter = (value1: any, value2: string) => {
    console.log(value1, value2);
  };

  toggleFilterColumn = () => {
    this.setState({ filterColumn: !this.state.filterColumn });
  };

  render() {
    // validator example
    return (
      <React.Fragment>
        <div>
          <VTable
            striped
            selectionStyle={{
              backgroundColor: 'rgba(34, 220, 72, 0.16);',
              borderColor: 'green',
              borderRadius: '15'
            }}
            tableHeight="350px"
            columnWidths={[200, 125, 150, 200]}
            onSelectionChange={this.doSomethingAwesomeWithTheValue}
            actionsSelection={{
              onSelectionChange: this.doSomethingAwesomeWithTheValue,
              onSelectionCleaned: (value: any) => {
                console.log('onSelectionCleaned', value);
              },
              clearSelection: this.state.clearSelection,
              onDoubleClick: (
                value: any,
                rowIndex: number,
                columnIndex: number,
                columnName: string
              ) => {
                console.log(
                  'doble click',
                  value,
                  rowIndex,
                  columnIndex,
                  columnName
                );
              }
            }}
            filterByColumn={{
              filterable: this.state.filterColumn,
              handleFilter: this.handleFilter,
              filterType: 'INPUT'
            }}
            edit={{
              editColumn: {
                columns: ['name', 'other']
              },
              resultDataEdited: 'CELL',
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
            cellSelectionType={this.state.typeSelection}
            widgetsCell={widgetsCell}
            columns={this.state.columns}
            onOrderColumns={(columns: string[]) => this.setState({ columns })}
            columns_name={{ name: 'Namesito' }}
            reordering={true}
            sortable={{
              columns: ['name', 'color', 'sinEditar'],
              onSort: this.onSort,
              setupsOrden: [
                {
                  order: 'ASC',
                  columnName: 'color',
                  columnIndex: 0
                }
              ]
            }}
            contextual={{
              columnsContextual: [
                {
                  columns: ['name'],
                  default_actions: ['copy', 'paste'],
                  actions: [
                    {
                      action: (item: any) => console.log(item),
                      text: 'Action Input'
                    }
                  ]
                },
                {
                  columns: ['color'],
                  default_actions: ['copy', 'paste'],
                  actions: [
                    {
                      icon: 'export',
                      action: (item: any) => console.log(item),
                      text: 'Pio,Pio'
                    }
                  ]
                }
              ]
            }}
            data={this.state.data}
            textAlignColumn={[
              {
                columns: 'ALL',
                textAlign: 'end'
              },
              {
                columns: 'name',
                textAlign: 'left'
              }
            ]}
            configColumnsHeader={[
              {
                column: 'name',
                textColor: 'white',
                backgroundColor: '#DB2C6F',
                textAlign: 'left'
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
                backgroundColor: '#238C2C',
                textAlign: 'end'
              }
            ]}
            typeHeightRow={'SHORT'}
            enableColumnResizing={true}
            toolbar={
              <div
                style={{ width: '100%', height: 50, backgroundColor: 'teal' }}
              >
                <Button
                  minimal
                  text={'Filter by column'}
                  icon={'filter'}
                  onClick={this.toggleFilterColumn}
                />
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <button onClick={this.handleChangeColor}>cambiar color</button>
        <button onClick={this.changeColumn}>cambiar columnas</button>
        <button onClick={this.addColumn}>add columnas</button>
        <button
          onClick={() => {
            this.changeData('blue');
          }}
        >
          cambiar datos
        </button>
        <br />
        <span> tipo de seleccion </span>
        <select onChange={this.handleChangeType}>
          <option value={'CELL'}>CELL</option>
          <option value={'FREE'}>FREE</option>
          <option value={'ENTIRE_ROW'}>ENTIRE_ROW</option>
          <option value={'DISABLED'}>DISABLED</option>
        </select>
        <button
          onClick={() => {
            this.handleDeleteSelection(true);
          }}
        >
          {' '}
          Borrar seleccion
        </button>
        <button
          onClick={() => {
            this.handleDeleteSelection(false);
          }}
        >
          {' '}
          habilitar seleccion
        </button>
        <br />
        <br />
      </React.Fragment>
    );
  }

  handleChangeType = (e: any) => {
    console.log(e.target.value);
    this.setState({
      typeSelection: e.target.value
    });
  };

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

  onSort = (index: any) => {
    console.log(index);
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
  addColumn = () => {
    this.setState({
      columns: ['name', 'dropdown', 'other', 'fecha', 'checkbox', 'sinEditar']
    });
  };

  handleDeleteSelection = (clearSelection: boolean) => {
    this.setState({
      clearSelection
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
        color: 'blue',
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
