import React, { Component } from 'react';
import './App.css';
import { VTable } from './components/Table/Table';
import { DateInput, IDateFormatProps } from '@blueprintjs/datetime';
import 'semantic-ui-css/semantic.min.css';
import { IVDropdownCell, IVWidgetTableProps } from './components/Table/Widget/Widget';
import { ItemPredicate, ItemRenderer, Select } from '@blueprintjs/select';
import { Button } from '@blueprintjs/core';
import DropdownWidget from './components/Table/Widget/Field/DropdownWidget/DropdownWidget';

export interface IFilm {
  /** Title of film. */
  title: string;
  /** Release year. */
  year: number;
  /** IMDb ranking. */
  rank: number;
}

const TOP_100_FILMS: IFilm[] = [
  { rank: 1, title: 'otro', year: 2019 },
  { rank: 2, title: 'mas', year: 2019 },
  { rank: 3, title: 'lucia alvares', year: 2019 },
  { rank: 4, title: 'jajajojo jujuju', year: 2019 }
];

export const FilmSelect = Select.ofType<IFilm>();

export const dropDown  = {
  row: 9,
  column: 'lastname',
  widget: {
    type: 'DROPDOWN',
    dropdownCell: {
      options:[
        { index: 1, value: 'otro' },
        { index: 2, value: 'Lastname7' },
        { index: 3, value: 'lucia alvares' },
        { index: 4, value: 'jajajojo jujuju' }
      ],
      filterable:false
    }
  }
};

export const widgetsCell: IVWidgetTableProps[] = [
  {
    row: 3,
    column: 'lastname',
    widget: {
      type: 'COLOR',
      colorCell: { backgroundColor: 'orange' ,color:'white'}
    }
  },
  {
    row: 5,
    column: 'lastname',
    widget: {
      type: 'COLOR',
      colorCell: { backgroundColor: 'blue' }
    }
  },
  {
    row: 7,
    column: 'name',
    widget: {
      type: 'CHECKBOX'

    }
  },
  dropDown
,
  ,
  {
    row: 11,
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

class App extends Component {

  state ={
    changeColor:false
  };
  render() {
    const data = [
      { name: 'Carlos', lastname: 'Chao' },
      { name: 'Name1', lastname: 'Lastname1' },
      { name: 'Name2', lastname: 'Lastname2' },
      { name: 'Name3', lastname: 'Lastname3' },
      { name: 'Name4', lastname: 'Lastname4' },
      { name: 'Name5', lastname: 'Lastname5' },
      { name: 'Name6', lastname: 'Lastname6' },
      { name: true, lastname: 'Lastname7' },
      { name: '12/05/2018', lastname: 'Lastname7' },
      { name: 'Name7', lastname: 'Lastname7' },
      { name: 'name8', lastname: 'Lastname7' },
      { name: '12/05/2018', lastname: 'Lastname7' }
    ];

    // validator example
    const nameValidation = (value: string) => {
      return value.length > 5;
    };



    const jsDateFormatter: IDateFormatProps = {
      // note that the native implementation of Date functions differs between browsers
      formatDate: date => date.toLocaleDateString(),
      parseDate: str => new Date(str),
      placeholder: 'M/D/YYYY'
    };

    return (
      <React.Fragment>
        <div>
          <VTable
            edit={{ columns: ['name'], validation: { name: nameValidation } }}
            widgetsCell={widgetsCell}
            columns={['name', 'lastname']}
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
          />
        </div>

        <br />
        <DateInput {...jsDateFormatter} />
        <button onClick={this.handleChangeColor} >cambiar color</button>
      {/*<DropdownWidget/>*/}

      </React.Fragment>
    );
  }

  handleChangeColor = ()=>{
    if( widgetsCell[0] &&   widgetsCell[0].widget && widgetsCell[0].widget.colorCell){
      widgetsCell[0].widget.colorCell.backgroundColor = 'green';
      this.setState({
        changeColor:!this.state.changeColor
      })

    }


};

  onSort = (index: number, order: string) => {
    console.log(index);
    console.log(order);
  };



  filterFilm: ItemPredicate<IFilm> = (query, film) => {
    return (
      `${film.rank}. ${film.title.toLowerCase()} ${film.year}`.indexOf(
        query.toLowerCase()
      ) >= 0
    );
  };

  renderFilm: ItemRenderer<IFilm> = (
    film,
    { handleClick, modifiers, query }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    const text = `${film.rank}. ${film.title}`;
    return <p>{text}</p>;
  };

  handleValueChange = (film: IFilm) => this.setState({ film });
}

export default App;
