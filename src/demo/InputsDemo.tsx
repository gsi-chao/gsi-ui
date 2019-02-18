import React, { Component } from 'react';

import { FieldState, FormState } from 'formstate';
import { observer } from 'mobx-react';
import { required } from '../components/Form/Validators';
import InputField from '../components/Form/Inputs/InputField';
import BasicSelectField from '../components/Form/Inputs/BasicSelectField';
import { Icon, IconName } from '@blueprintjs/core';
import TextAreaField from '../components/Form/Inputs/TextAreaField';
import TagInputField from '../components/Form/Inputs/TagInputField';
import NumericField from '../components/Form/Inputs/NumericField';
import CheckboxField from '../components/Form/Inputs/CheckboxField';
import RadioGroupField from '../components/Form/Inputs/RadioGroupField';
import BasicSliderField from '../components/Form/Inputs/BasicSliderField';

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
      range: new FieldState('').validators(required)
    });
  }
  render() {
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
        value: 'm'
      },
      {
        label: 'Female',
        value: 'f'
      }
    ];
    return (
      <React.Fragment>
        <InputField
          fieldState={this.form.$.username}
          id="username"
          label={'Username'}
          inline={true}
        />
        <InputField
          fieldState={this.form.$.search}
          id="username"
          label={'Search'}
          inline={true}
          type="search"
          leftIcon="search"
        />
        <BasicSelectField
          options={store}
          inline
          label={'Store List'}
          fill
          fieldState={this.form.$.store}
          id="store"
          icon={{ icon: 'search', iconSize: Icon.SIZE_STANDARD }}
        />
        <TextAreaField
          id="description"
          label="Description"
          inline
          fieldState={this.form.$.description}
        />
        <TagInputField
          id="tags"
          fieldState={this.form.$.tags}
          inline
          label="Tags"
        />
        <NumericField
          id="age"
          fieldState={this.form.$.age}
          label="Edad"
          inline
        />
        <CheckboxField
          fieldState={this.form.$.have_job}
          id="have_job"
          label="Have a job?"
          inline
        />
        <RadioGroupField
          id="Sex"
          options={sex}
          label="Sex"
          inline
          fieldState={this.form.$.sex}
        />
        <BasicSliderField
          id="range"
          fieldState={this.form.$.range}
          label="Range"
          inline
        />
      </React.Fragment>
    );
  }
}

export default InputsDemo;
