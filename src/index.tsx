import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { IItem, SearchSelect } from './components/Form';

const TestComponent = observer(() => {
  const [value, setValue] = useState<any>(1);
  const onChange = (value: any) => {
    console.log(value);
    setValue(value);
  };
  const options: IItem[] = Array(2000).fill(1).map((val, index) => {
    return {
      label: `Item ${index}`,
      value: index
    };
  });
  return (
    <>
      <SearchSelect value={value} options={options} onChange={onChange} />
    </>
  );
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
