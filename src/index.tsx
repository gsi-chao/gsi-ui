import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import {
  VSelectField,
  VSelectMultiple,
  VSelectMultipleTags
} from './components/Form';
import { FieldState } from 'formstate';
import { IItemMultiple } from './components/Form/Inputs/SelectMultipleField';
import { uniqueId } from 'lodash';

const TestComponent = observer(() => {
  const [options, setOptions] = useState<IItemMultiple[]>([]);
  useEffect(() => {
    const otherNEwOptions: IItemMultiple[] = [];
    let cont = 0;
    while (cont < 5000) {
      const value = uniqueId('option_');
      otherNEwOptions.push({
        value,
        label: value
      });
      cont++;
    }
    setOptions(otherNEwOptions);
  }, []);

  return (
    <>
      <VSelectMultipleTags
        options={[
          { value: '1', label: 'val 1' },
          { value: '2', label: 'va 2' },
          { value: '3', label: 'valor 3' },
          { value: '4', label: 'valus 4' },
          { value: '5', label: 'vil 5' }
        ]}
        id={'asdasdasd'}
        fieldState={new FieldState<any>('')}
        onChange={console.log}
        allowOrder
      />
      <VSelectMultiple
        options={[
          { value: '1', label: 'val 1' },
          { value: '2', label: 'va 2' },
          { value: '3', label: 'valor 3' },
          { value: '4', label: 'valus 4' },
          { value: '5', label: 'vil 5' }
        ]}
        id={'asdasdasd1'}
        fieldState={new FieldState<any>('')}
        onChange={console.log}
        allowEmptyItem
      />
      <VSelectField
        options={options}
        id={'asdasdasd2'}
        fieldState={new FieldState<any>('')}
        onChange={console.log}
        allowEmptyItem
      />
    </>
  );
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
