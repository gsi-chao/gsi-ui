import React, { Component } from "react";
import "./App.css";
import { VTable } from "./components/Table/Table";
import { SelectionList } from "./components/SelectionList/";

class App extends Component {
  render() {

    return (
      <SelectionList
          elements={[{text:'first', value:'firstv', icon:'git-branch'},
              {text:'second', value:'secondv', icon:'cut', active:true}]}
          header={{text:'Header'}}
          onSelect={(list:any)=>console.log(list)}
      />
    );
  }

  onSort = (index: number, order: string) => {
    console.log(index);
    console.log(order);
  }
}

export default App;
