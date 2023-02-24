import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { observer } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';
import VSearchSelectField2Component from './docs/VSearchSelectField2Componets';

const TestComponent = observer(() => {
  return <>Test Component!!!</>;
});

ReactDOM.render(
  <VSearchSelectField2Component />,
  document.getElementById('root')
);
