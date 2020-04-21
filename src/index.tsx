import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import {
  Validators,
  VDateTimePicker,
  VInputField,
  VNumericField,
  VNumericFieldRounded,
  VSelectField
} from './components/Form';
import { FieldState } from 'formstate';

const TestComponent = observer(() => {
  return (
    <>
      <VNumericField
        id={'asdasd'}
        required
        fieldState={new FieldState<any>(0)}
      />
      <VNumericFieldRounded
        id={'asdasd'}
        required
        validators={[Validators.ltNumber(4)]}
        fieldState={new FieldState<any>(0)}
        maxDecimals={2}
        roundTo={2}
      />
      <VDateTimePicker
        id={'asdasd'}
        required
        fieldState={new FieldState<any>(null)}
        format={'MM/DD/YYYY'}
        dateType={'DATE'}
      />
      <VInputField id={'aas'} required fieldState={new FieldState<any>('')} />
      <VSelectField
        id={'asdaddsd'}
        required
        allowEmptyItem
        options={[
          {
            value: '1',
            label: '1'
          },
          {
            value: '2',
            label: '2'
          }
        ]}
        fieldState={new FieldState<any>('')}
      />
    </>
  );
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
