import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import {
  IItem,
  SearchSelect,
  Validators,
  VSearchSelectField,
  VColorPicker
} from './components';
import { FieldState, FormState } from 'formstate';
import { Button } from '@blueprintjs/core';

const validator = (value: number[]) => value.length <= 2 && 'Error a';
const form = new FormState({
  data: new FieldState([1, 2])
});
const TestComponent = observer(() => {
  const [value, setValue] = useState<any[]>([1]);
  const [value1, setValue1] = useState<any>(1);

  const onChange1 = (value: any) => {
    console.log(value);
    setValue1(value);
  };
  const options: IItem[] = Array(2000)
    .fill(1)
    .map((val, index) => {
      return {
        label: `i${index}`,
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
      <Button
        onClick={() => setValue1(Math.floor(Math.random() * (2000 - 0)) + 0)}
      />
      <VSearchSelectField
        label={'Label'}
        tipLabel={'Label'}
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
        fixedInputWidthPx={175}
        onChange={onChange1}
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
        fixedInputWidthPx={100}
      />
      <VColorPicker
        Color={'#fafafa'}
        typePickerColor={'ChromePicker'}
        position={'right'}
        width={30}
        height={30}
        disableAlpha={true}
        onChange={() => {}}
        //addButton={{text:'Set choosen color', intent:'primary'}}
      />
    </>
  );
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
