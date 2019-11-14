import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { VColorPicker } from './components/ColorPicker';
const TestComponent = () => {
  const [color, setColor] = useState<any>('#fff');

  const onChange = (color: any) => {
    setColor(color.hex);
  };
  return (
    <div>
      <VColorPicker
        Color={color}
        onChange={onChange}
        typePickerColor={'ChromePicker'}
        addButton={{
          text: 'add',
          intent: 'success'
        }}
      />
    </div>
  );
};

ReactDOM.render(<TestComponent />, document.getElementById('root'));
