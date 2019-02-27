import React, { Component } from 'react';

import { FieldState, FormState } from 'formstate';
import { observer } from 'mobx-react';
import {
  VInputField,
  VBasicSliderField,
  VTextAreaField,
  VTagInputField,
  VNumericField,
  VCheckboxField,
  VRadioGroupField,
  VSelectField
} from '../components/Form';
import { email, lt, exact } from '../components/Form/Validators';

const store = [
  {
    label: 'This is a store with a very big large text',
    value: 's1'
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
  constructor(props: any) {
    super(props);
    this.form = new FormState<any>({
      username: new FieldState(''),
      search: new FieldState(''),
      description: new FieldState(''),
      store: new FieldState(''),
      tags: new FieldState(''),
      age: new FieldState(''),
      have_job: new FieldState(''),
      sex: new FieldState(''),
      range: new FieldState(''),
      places: new FieldState(sex[0].value)
    });
  }
  /**
   * Example of validations functions, look in the search field
   * */
  searchingAnime = (value: any) =>
    value.toString().indexOf('anime') !== -1 &&
    `Can't search anime in work dude!!!!`;
  render() {
    return (
      <React.Fragment>
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
          fieldState={this.form.$.store}
          id="store"
          icon={'search'}
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
        <div>
          <VSelectField
            defaultText={'Please enter a text'}
            layer={{
              labelWidth: 6,
              inputWidth: 2,
              labelOrientation: 'end',
              inputOrientation: 'start'
            }}
            inline
            label="Places"
            options={sex}
            id="places"
            fieldState={this.form.$.places}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default InputsDemo;
