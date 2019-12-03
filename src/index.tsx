import React from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { observer } from 'mobx-react-lite';

const TestComponent = observer(() => {
  return (
    <>
      Test Component!!!!
    </>
  );
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
