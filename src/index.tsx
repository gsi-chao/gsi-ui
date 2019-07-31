import React from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { VNumericField } from './components/Form';
import { FieldState, FormState } from 'formstate';

const TestComponent = () => {
  const form = new FormState<any>({
    age: new FieldState(undefined)
  });

  return (
    <VNumericField
      id="age"
      fieldState={form.$.age}
      label=""
      noLabel
      layer={{
        labelOrientation: 'end',
        inputOrientation: 'center'
      }}
      inline
      min={6}
      max={10}
      onChange={(value: string) => console.log(value)}
    />
  );
};

ReactDOM.render(<TestComponent />, document.getElementById('root'));
