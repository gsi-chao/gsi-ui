import React, { Component } from 'react';
import './App.css';
import { VTable } from './components/Table';
import InputsDemo from './demo/InputsDemo';
import TableWithWidgetDemo from './demo/TableWithWidgetDemo';
import TabsPanelDemo from './demo/TabsPanelDemo';
import VLoadProgressTaskDemo from './demo/VLoadProgressTaskDemo';
import ColorPickerDemo from './demo/ColorPickerDemo';
import NotificationToastDemo from './demo/NotificationToastDemo';
import DNDDemo from './demo/DNDDemo';
import SuspenseDemo from './demo/SuspenseDemo';
import PaginatorDemo from './demo/PaginatorDemo';
import { showToastNotification } from './components/ToastNotification';

class App extends Component {

  onSave = (data: any) => {
    console.log(data)
  };

  render() {
    const data = [
      {
        name: 'Carlos',
        lastname: 'Chao',
        age: 28,
        age1: 28,
        age2: 28,
        age3: 28,
        age4: 28,
        age5: 28
      },
      {
        name: 'Carlos',
        lastname: 'Chao',
        age: 28,
        age1: 28,
        age2: 28,
        age3: 28,
        age4: 28,
        age5: 28
      },
      {
        name: 'Carlos',
        lastname: 'Chao',
        age: 28,
        age1: 28,
        age2: 28,
        age3: 28,
        age4: 28,
        age5: 28
      }
    ];

    // validator example
    const nameValidation = (value: string) => {
      return value.length > 5;
    };

    return (
      <React.Fragment>
        <div style={{ width: '100%' }}>
          <VTable
            striped
            columns={[
              'name',
              'lastname',
              'age',
              'age1',
              'age2',
              'age3',
              'age4',
              'age5'
            ]}
            cellSelectionType={'ENTIRE_ROW'}
            columns_name={{ name: 'mi nombre' }}
            reordering={true}
            sortable={{ columns: ['name'], onSort: this.onSort }}
            contextual={{
              columnsContextual: [
                {
                  columns: ['name'],
                  default_actions: ['copy', 'paste'],
                  actions: [
                    {
                      icon: 'export',
                      action: (item: any) => console.log(item),
                      text: 'Action Input'
                    }
                  ]
                }
              ]
            }}
            edit={{
              onSave: this.onSave,
              editColumn: {
                columns: ['lastname']
              },
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
            data={data}
            enableColumnResizing={true}
            enableRowHeader={true}
            enableRowResizing={true}
            columnWidths={[200, 200, 250, 250, 250]}
            numFrozenRows={2}
            numFrozenColumns={1}
            actionsSelection={{
              onDoubleClick: (
                value: any,
                rowIndex: number,
                columnIndex: number,
                columnName: string
              ) => {
                console.log('doble click');
              }
            }}
          />
        </div>

        <br />

        <PaginatorDemo />

        <InputsDemo />
        <TabsPanelDemo />
        <TableWithWidgetDemo />

        <br />
        <ColorPickerDemo />

        <VLoadProgressTaskDemo />
        <NotificationToastDemo />
        <DNDDemo />
        <SuspenseDemo />
      </React.Fragment>
    );
  }

  handleChangeTabMenu = (data: any) => {
    console.log(data);
  };

  onSort = (index: number, order: string) => {
    console.log(index);
    console.log(order);
  };
}

export default App;
