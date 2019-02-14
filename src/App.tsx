import React, { Component } from "react";
import "./App.css";
import { VTable } from "./components/Table/Table";
import { SelectionList } from "./components/SelectionList/";

class App extends Component {
  render() {
    const data = [
      { name: "Carlos", lastname: "Chao" },
      { name: "Name1", lastname: "Lastname1" },
      { name: "Name2", lastname: "Lastname2" },
      { name: "Name3", lastname: "Lastname3" },
      { name: "Name4", lastname: "Lastname4" },
      { name: "Name5", lastname: "Lastname5" },
      { name: "Name6", lastname: "Lastname6" },
      { name: "Name7", lastname: "Lastname7" },
      { name: "Name7", lastname: "Lastname7" },
      { name: "Name7", lastname: "Lastname7" },
      { name: "Name7", lastname: "Lastname7" },
      { name: "Name7", lastname: "Lastname7" },
    ];

    // validator example
    const nameValidation = (value: string) => {
      return value.length > 5;
    };

    return (
      <SelectionList
      elements={[{text:'first', value:'firstv', icon:'folder'}, {text:'second', value:'secondv', active:true}]}
      header={{text:'Header', color:'#fbbd08'}}
      onSelect={(list:any)=>console.log(list)}
      selection={{background:'#00b5ad', textColor:'#fbbd08'}}
      />
      /*<VTable
          edit={{ columns: ["name"], validation: {name: nameValidation} }}
          columns={["name", "lastname"]}
          reordering={true}
          sortable={{columns: ["name"], onSort: this.onSort}}
          contextual={{columns: ["name"], default_actions: ["copy", "paste", "export"], actions: [{
            icon: 'export', action: (item: any) => console.log(item), text: "Action Input"
              }]}}
          data={data}
      />*/
    );
  }

  onSort = (index: number, order: string) => {
    console.log(index);
    console.log(order);
  }
}

export default App;
