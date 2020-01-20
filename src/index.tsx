import React from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { observer } from 'mobx-react-lite';
import SetupLayout from './tabs';

const TestComponent = observer(() => {
  return (
    <>
      <SetupLayout/>
    </>
  );
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
