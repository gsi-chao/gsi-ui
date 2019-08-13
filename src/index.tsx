import React from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { VInputField, VTextAreaField } from './components/Form';
import { FieldState } from 'formstate';

const TestComponent = () => {
  return <div>
    <VInputField id={'id'} fieldState={new FieldState<any>('initial value')} upperCaseFormat/>
    <VTextAreaField id={'id2'} fieldState={new FieldState<any>('initial value')} upperCaseFormat/>
  </div>;
};

ReactDOM.render(<TestComponent />, document.getElementById('root'));
