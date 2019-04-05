import React, { Component } from 'react';
import './App.css';
import { VTable } from './components/Table/Table';
import InputsDemo from './demo/InputsDemo';
import TableWithWidgetDemo from './demo/TableWithWidgetDemo';
import TabsPanelDemo from './demo/TabsPanelDemo';
import VLoadProgressTaskDemo from './demo/VLoadProgressTaskDemo';
import ColorPickerDemo from './demo/ColorPickerDemo';
import NotificationToastDemo from './demo/NotificationToastDemo';
import DNDDemo from './demo/DNDDemo';
import SuspenseDemo from './demo/SuspenseDemo';
import VPaginator from './components/Table/Paginator/VPaginator';

class App extends Component {
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
            edit={{
              editColumn: { columns: 'ALL' },
              onSave: (value: any) => {}
            }}
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
            data={data}
            enableColumnResizing={true}
            enableRowHeader={true}
            enableRowResizing={true}
            columnWidths={[200, 200, 250, 250, 250]}
            numFrozenRows={2}
            numFrozenColumns={1}
          />
        </div>

         <br/>

        <VPaginator/>

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
