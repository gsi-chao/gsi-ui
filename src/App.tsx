import React, { Component } from 'react';
import './App.css';
import { VTable } from './components/Table/Table';
import { VTabsMenu } from './components/index';
import {ITabsTypes} from './components/TabsMenu/types';

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
      { name: 'Name7', lastname: 'Lastname7' },
      { name: 'Name7', lastname: 'Lastname7' },
      { name: 'Name7', lastname: 'Lastname7' },
      { name: 'Name7', lastname: 'Lastname7' }
    ];

    // validator example
    const nameValidation = (value: string) => {
      return value.length > 5;
    };
    const tabList: ITabsTypes[] = [{
      icon: { intent: 'primary', icon: 'home', iconSize: 16 },
      label: 'Home',
      key: '1',
      color: 'red',
      navbarTabId: 'home'
    }, {
      label: 'Hogar',
      key: '2',
      color: 'red',
      navbarTabId: 'hogar'
    }, {
      icon: { intent: 'primary', icon: 'home', iconSize: 16 },
      label: 'Casa',
      key: '3',
      color: 'red',
      navbarTabId: 'casa'
    }];
    return (
      <React.Fragment>
        <VTabsMenu tabList={tabList} handleChange={this.handleChangeTabMenu}/>
        <VTable
          edit={{ columns: ['name'], validation: { name: nameValidation } }}
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