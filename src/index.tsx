import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

const TestComponent = observer(() => {
  return <>Test Index</>;
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
