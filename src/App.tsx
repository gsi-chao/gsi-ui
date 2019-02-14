import React, { Component } from 'react';
import './App.css';
import { IVWidgetTableProps, VTable } from './components/Table/Table';
import { DateInput, IDateFormatProps } from "@blueprintjs/datetime";
import { Dropdown, Header, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    const data = [
      { name: 'Carlos', lastname: 'Chao' },
      { name: 'Name1', lastname: 'Lastname1' },
      { name: 'Name2', lastname: 'Lastname2' },
      { name: 'Name3', lastname: 'Lastname3' },
      { name: 'Name4', lastname: 'Lastname4' },
      { name: 'Name5', lastname: 'Lastname5' },
      { name: 'Name6', lastname: 'Lastname6' },
      { name: 'Name7', lastname: 'Lastname7' },
      { name: '12/05/2018', lastname: 'Lastname7' },
      { name: 'Name7', lastname: 'Lastname7' },
      { name: 'Name7', lastname: 'Lastname7' },
      { name: 'Name7', lastname: 'Lastname7' }
    ];

    // validator example
    const nameValidation = (value: string) => {
      return value.length > 5;
    };

    const widgetsCell: IVWidgetTableProps[] = [
      {
        row: 3,
        column: 'lastname',
        widget: {
          type: 'COLOR',
          colorCell: { color: 'red' }
        }
      },
      {
        row: 5,
        column: 'lastname',
        widget: {
          type: 'COLOR',
          colorCell: { color: 'blue' }
        }
      },
      {
        row: 7,
        column: 'name',
        widget: {
          type: 'CHECKBOX',
          dropdownCell: [{
            key: 'today',
            text: 'today',
            value: 'today',
            content: 'Today'
          },
            {
              key: 'other asdasdf ',
              text: 'other  ',
              value: 'other ',
              content: 'other '
            }
          ]
        }
      },
      {
        row: 6,
        column: 'lastname',
        widget: {
          type: 'DROPDOWN',
          dropdownCell: [{
            key: 'today',
            text: 'today',
            value: 'today',
            content: 'Today'
          },
            {
              key: 'other asdasdf ',
              text: 'other  ',
              value: 'other ',
              content: 'other '
            }
          ]
        }
      },
      {
        row: 8,
        column: 'name',
        widget: {
          type: 'DATETIME',
          dateTimeCell: {
            formatDate: date => date.toLocaleDateString(),
            parseDate: str => new Date(str),
            placeholder: 'M/D/YYYY',
            defaultValue: new Date('12-05-2018')
          }
        }
      }
    ];

    const jsDateFormatter: IDateFormatProps = {
      // note that the native implementation of Date functions differs between browsers
      formatDate: date => date.toLocaleDateString(),
      parseDate: str => new Date(str),
      placeholder: "M/D/YYYY",
    };

    return (
      <React.Fragment>
        <VTable
          edit={{ columns: ['name'], validation: { name: nameValidation } }}
          widgetsCell={widgetsCell}
          columns={['name', 'lastname']}
          reordering={true}
          sortable={{ columns: ['name'], onSort: this.onSort }}
          contextual={{
            columns: ['name'], default_actions: ['copy', 'paste', 'export'], actions: [{
              icon: 'export', action: (item: any) => console.log(item), text: 'Action Input'
            }]
          }}
          data={data}
        />
        <br />
        <DateInput  {...jsDateFormatter} />
      </React.Fragment>

    );
  }

  onSort = (index: number, order: string) => {
    console.log(index);
    console.log(order);
  };
}

export default App;
