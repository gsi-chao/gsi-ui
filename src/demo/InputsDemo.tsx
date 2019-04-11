import React, { Component } from 'react';

import { FieldState, FormState } from 'formstate';
import { observer } from 'mobx-react';
import moment from 'moment';
import { action, observable } from 'mobx';
import { Button } from '@blueprintjs/core';

import {
  VBasicSliderField,
  VCheckboxField,
  VInputField,
  VNumericField,
  VRadioGroupField,
  VSelectField,
  VTagInputField,
  VTextAreaField
} from '../components/Form';
import { exact, lt } from '../components/Form/Validators';
import { VDateTimePicker } from '../components/Form/Inputs/DateTimePicker';

import { SelectUnselectItems } from '../components/SelectItems/SelectUnselectItems';
import { IItemsList } from '../components/SelectionList';
import { VSelectMultiple } from '../components/Form/Inputs/SelectMultipleField';
import { VCarousel } from '../components/Scroll';

const store = [
  {
    label: 'This is a store with a very big large text',
    value: 0
  },
  {
    label: 'Store 2',
    value: 's2'
  }
];

const sex = [
  {
    label: 'Male',
    value: 'm',
    rep: 'M'
  },
  {
    label: 'Female',
    value: 'f',
    rep: 'F'
  }
];

@observer
class InputsDemo extends Component {
  form: FormState<any>;
  @observable selectValue: any;
  constructor(props: any) {
    super(props);
    this.form = new FormState<any>({
      username: new FieldState(''),
      search: new FieldState(''),
      description: new FieldState(''),
      store: new FieldState(''),
      tags: new FieldState(''),
      age: new FieldState(2),
      have_job: new FieldState(''),
      sex: new FieldState(''),
      range: new FieldState(''),
      places: new FieldState(sex[0].value),
      date: new FieldState(moment().toDate()),
      multiple: new FieldState([])
    });
    this.selectValue = store[0].value;
  }
  /**
   * Example of validations functions, look in the search field
   * */
  searchingAnime = (value: any) =>
    value.toString().indexOf('anime') !== -1 &&
    `Can't search anime in work dude!!!!`;

  @action setSelectedValue = (value: any) => {
    this.selectValue = value;
  };
  render() {
    const itemsUnassigned: IItemsList[] = [
      { active: false, text: 'Item1', value: 'item1' },
      { active: false, text: 'Item2', value: 'item2' },
      { active: false, text: 'Item3', value: 'item3' },
      { active: false, text: 'Item4', value: 'item4' }
    ];
    const itemsAssigned: IItemsList[] = [
      { active: false, text: 'Item5', value: 'item5' },
      { active: false, text: 'Item6', value: 'item6' },
      { active: false, text: 'Item7', value: 'item7' },
      { active: false, text: 'Item8', value: 'item8' }
    ];

    const options = [
      {
        value: 1,
        label: 'First Value'
      },
      {
        value: 2,
        label: 'Second Value'
      },
      {
        value: 3,
        label: 'Third Value'
      },
      {
        value: 4,
        label: 'Fourth Value'
      }
    ];
    const elementsCarousel: any = [
      <VInputField
        layer={{
          labelWidth: 6,
          inputWidth: 6,
          labelOrientation: 'end',
          inputOrientation: 'center'
        }}
        fieldState={this.form.$.username}
        id="username"
        label={'Username'}
        inline={true}
      />,
      <VTextAreaField
        fill
        layer={{
          labelWidth: 6,
          inputWidth: 3,
          labelOrientation: 'end',
          inputOrientation: 'start'
        }}
        id="description"
        label="Description"
        inline
        fieldState={this.form.$.description}
      />,
      <VSelectField
        minimal
        defaultText={'Please enter a text'}
        fixedInputWidthPx={200}
        fill
        layer={{
          labelWidth: 6,
          inputWidth: 3,
          labelOrientation: 'end',
          inputOrientation: 'center'
        }}
        options={store}
        inline
        label={'Store List'}
        value={this.selectValue}
        id="store"
        icon={'search'}
        onChange={this.setSelectedValue}
      />
    ];

    return (
      <React.Fragment>
        <VCarousel height={'200px'} width={'500px'} elements={elementsCarousel} buttonsJustify={'flex-end'} />
        <VInputField
          fieldState={this.form.$.username}
          fill
          layer={{
            labelWidth: 6,
            inputWidth: 5,
            labelOrientation: 'end',
            inputOrientation: 'start'
          }}
          id="username"
          label={'Username'}
          inline={true}
        />
        <VInputField
          layer={{
            labelWidth: 6,
            inputWidth: 6,
            labelOrientation: 'end',
            inputOrientation: 'center'
          }}
          fieldState={this.form.$.username}
          id="username"
          label={'Username'}
          inline={true}
        />
        <VInputField
          required
          validators={[this.searchingAnime, lt(10), exact(9)]}
          fill
          layer={{
            labelWidth: 6,
            labelOrientation: 'end',
            inputOrientation: 'start'
          }}
          fieldState={this.form.$.search}
          id="username"
          label={'Search'}
          inline={true}
          type="search"
          leftIcon="search"
        />
        <VSelectField
          minimal
          defaultText={'Please enter a text'}
          fixedInputWidthPx={200}
          fill
          layer={{
            labelWidth: 6,
            inputWidth: 3,
            labelOrientation: 'end',
            inputOrientation: 'center'
          }}
          options={store}
          inline
          label={'Store List'}
          value={this.selectValue}
          id="store"
          icon={'search'}
          onChange={this.setSelectedValue}
        />
        <Button
          text={'Change Select'}
          onClick={() => {
            this.setSelectedValue('s2');
          }}
        />
        <VTextAreaField
          fill
          layer={{
            labelWidth: 6,
            inputWidth: 3,
            labelOrientation: 'end',
            inputOrientation: 'start'
          }}
          id="description"
          label="Description"
          inline
          fieldState={this.form.$.description}
        />
        <VTagInputField
          fill
          limit={5}
          tagValidation={{
            regex: /[a-z0-9]/,
            errorMessage: 'Is a not valid value'
          }}
          layer={{
            labelWidth: 6,
            inputWidth: 4,
            labelOrientation: 'end',
            inputOrientation: 'start'
          }}
          id="tags"
          fieldState={this.form.$.tags}
          inline
          label="Tags"
        />
        <VNumericField
          id="age"
          fieldState={this.form.$.age}
          label=""
          noLabel
          layer={{
            labelOrientation: 'end',
            inputOrientation: 'center'
          }}
          inline
        />
        <VCheckboxField
          checkBoxAtLeft
          layer={{
            labelWidth: 6,
            labelOrientation: 'start',
            inputOrientation: 'end'
          }}
          fieldState={this.form.$.have_job}
          id="have_job"
          label="Have a job?"
          inline
          alignIndicator="right"
        />
        <VRadioGroupField
          layer={{
            labelWidth: 6,
            labelOrientation: 'end',
            inputOrientation: 'start'
          }}
          id="Sex"
          options={sex}
          label="Sex"
          inline
          fieldState={this.form.$.sex}
        />
        <VBasicSliderField
          fill
          layer={{
            labelWidth: 6,
            labelOrientation: 'end',
            inputOrientation: 'start'
          }}
          id="range"
          fieldState={this.form.$.range}
          label="Range"
          inline
        />
        <VDateTimePicker
          dateType="DATE"
          id="date"
          fieldState={this.form.$.date}
          icon={{ iconName: 'calendar' }}
        />
        <div>
          <VSelectField
            defaultText={'Please enter a text'}
            layer={{
              labelWidth: 6,
              inputWidth: 2,
              labelOrientation: 'end',
              inputOrientation: 'start'
            }}
            iconOnly
            icon={'search'}
            inline
            label="Places"
            options={sex}
            id="places"
            fieldState={this.form.$.places}
          />
          <button onClick={this.changeValueSelect}>change value select</button>
        </div>
        <SelectUnselectItems
          listsHeights={'142px'}
          handleCancel={() => console.log('cancelled')}
          handleSave={this.handleSave}
          itemsUnassigned={itemsUnassigned}
          itemsAssigned={itemsAssigned}
        />
      </React.Fragment>
    );
  }

  handleSave = (element: any) => {
    console.log(element);
  };

  changeValueSelect = (value: any) => {
    this.form.$.places.onChange('f');
  };
}

export default InputsDemo;
