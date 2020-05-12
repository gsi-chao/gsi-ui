import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import {
  IItem,
  SearchSelect,
  Validators,
  VSearchSelectField
} from './components';
import { FieldState, FormState } from 'formstate';

const validator = (value: number[]) => value.length <= 2 && 'Error a';
const form = new FormState({
  data: new FieldState([1, 2])
});
const TestComponent = observer(() => {
  const [value, setValue] = useState<any[]>([1]);
  const [value1, setValue1] = useState<any>(1);

  const onChange1 = (value: any) => {
    setValue1(value);
  };
  const options: IItem[] = Array(2000)
    .fill(1)
    .map((val, index) => {
      return {
        label: `Item Item Item Item Item Item ItemvItem ${index}`,
        value: index
      };
    });

  const onAddNewItem = (v: string) => {
    options.push({
      value: v,
      label: v
    });
    value.push(v);
  };
  return (
    <>
      {form.$.data.$}
      <VSearchSelectField
        label={'Label'}
        inline
        id={'example'}
        fieldState={form.$.data}
        options={options}
        multi
        allowNewItem
        onAddNewItem={onAddNewItem}
        sort={'asc'}
        required
        validators={[Validators.required, validator]}
        allowEmpty
      />
      <VSearchSelectField
        id={'example'}
        value={value1}
        options={options}
        onChange={onChange1}
        label={'lolo'}
        required
        validators={[Validators.required]}
        allowEmpty
        inline
      />
    </>
  );
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
