import React, { Component } from 'react';

import { FieldState, FormState } from 'formstate';
import { observer } from 'mobx-react';
import moment from 'moment';
import { action, observable } from 'mobx';
import { Button } from '@blueprintjs/core';

import {
  getFormValue,
  VBasicSliderField,
  VCheckboxField,
  VInputField,
  VNumericField,
  VRadioGroupField,
  VSelectField,
  VSelectMultiple,
  VTagInputField,
  VTextAreaField
} from '../components/Form';
import { Validators } from '../components/Form/Validators';
import { VDateTimePicker } from '../components/Form/Inputs/DateTimePicker';

import { SelectUnselectItems } from '../components/SelectItems/SelectUnselectItems';
import { IItemsList } from '../components/SelectionList';
import { VCarousel } from '../components/Scroll';
import { VOrgChart } from '../components/VOrgChart/VOrgChart';
import { VSelectMultipleTags } from '../components/Form/Inputs/SelectMultipleTags';
import { FileUpload } from '../components/FileUpload';

const store = [
  {
    label: 'This is a store with a very big large text',
    value: 0
  },
  {
    label: 'Store 2',
    value: 1
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
      age: new FieldState(null),
      have_job: new FieldState(''),
      sex: new FieldState(''),
      range: new FieldState(0),
      places: new FieldState(sex[0].value),
      date: new FieldState(moment().toDate()),
      multiple: new FieldState([]),
      movies: new FieldState([])
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
    const rightButton = <Button minimal icon={'lock'} />;
    return (
      <React.Fragment>
        <Button
          text={'Change Movies Value'}
          onClick={() => {
            this.form.$.movies.onChange([1]);
          }}
        />
        <VSelectMultiple
          inline
          fill
          required
          label={'Select movies:'}
          options={[
            { label: 'The Shawshank Redemption', value: 1 },
            { label: 'The Godfather', value: 2 },
            { label: 'The Godfather: Part II', value: 3 },
            { label: 'The Dark Knight', value: 4 }
          ]}
          id={'selectMultipleTags'}
          layer={{
            labelWidth: 6,
            inputWidth: 5,
            labelOrientation: 'end',
            inputOrientation: 'center'
          }}
          placeholder={'evil placeholder...'}
          fieldState={this.form.$.movies}
          onChange={() => {
            console.log(this.form.$.movies.value);
          }}
        />

        <FileUpload />
        <VInputField
          fieldState={this.form.$.username}
          fill
          tipLabel={'Username'}
          layer={{
            labelWidth: 6,
            inputWidth: 5,
            labelOrientation: 'end',
            inputOrientation: 'start'
          }}
          rightElement={rightButton}
          id="username"
          noLabel
          inline={true}
        />
        <VInputField
          required
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
          validators={[this.searchingAnime, Validators.lt(10), Validators.exact(9)]}
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
          fill
          tipLabel={'Movies'}
          layer={{
            labelWidth: 6,
            inputWidth: 6,
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
          required
          fill
          inline
          layer={{
            inputWidth: 5,
            labelWidth: 6,
            labelOrientation: 'end',
            inputOrientation: 'start'
          }}
          label={'TimePicker'}
          dateType="DATE"
          format={'MM/DD/YYYY'}
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
