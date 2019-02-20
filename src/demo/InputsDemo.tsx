import React, { Component } from 'react';

import { FieldState, FormState } from 'formstate';
import { observer } from 'mobx-react';
import { required } from '../components/Form/Validators';
import { Icon } from '@blueprintjs/core';
import {
  VInputField,
  VBasicSelectField,
  VBasicSliderField,
  VTextAreaField,
  VTagInputField,
  VNumericField,
  VCheckboxField,
  VRadioGroupField, VSelectField
} from '../components/Form';

const store = [
  {
    label: 'Store 1',
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
      username: new FieldState('').validators(required),
      search: new FieldState('').validators(required),
      description: new FieldState('').validators(required),
      store: new FieldState('').validators(required),
      tags: new FieldState('').validators(required),
      age: new FieldState('').validators(required),
      have_job: new FieldState('').validators(required),
      sex: new FieldState('').validators(required),
      range: new FieldState('').validators(required),
      places: new FieldState(sex[0]).validators(required)
    });
  }
  render() {
    return (
      <React.Fragment>
        <VInputField
          fieldState={this.form.$.username}
          id="username"
          label={'Username'}
          inline={true}
        />
        <VInputField
          fieldState={this.form.$.search}
          id="username"
          label={'Search'}
          inline={true}
          type="search"
          leftIcon="search"
        />
        <VBasicSelectField
          options={store}
          inline
          label={'Store List'}
          fill
          fieldState={this.form.$.store}
          id="store"
          icon={{ icon: 'search', iconSize: Icon.SIZE_STANDARD }}
        />
        <VTextAreaField
          id="description"
          label="Description"
          inline
          fieldState={this.form.$.description}
        />
        <VTagInputField
          id="tags"
          fieldState={this.form.$.tags}
          inline
          label="Tags"
        />
        <VNumericField
          id="age"
          fieldState={this.form.$.age}
          label="Edad"
          inline
        />
        <VCheckboxField
          fieldState={this.form.$.have_job}
          id="have_job"
          label="Have a job?"
          inline
          alignIndicator="left"
        />
        <VRadioGroupField
          id="Sex"
          options={sex}
          label="Sex"
          inline
          fieldState={this.form.$.sex}
        />
        <VBasicSliderField
          id="range"
          fieldState={this.form.$.range}
          label="Range"
          inline
        />
        <VSelectField inline label="Places" options={sex} id="places" fieldState={this.form.$.places}/>
      </React.Fragment>
    );
  }
}

export default InputsDemo;
