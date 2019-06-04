import React from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import VTableWithWidgetDoc from './docs/components/Sample';

const TestComponent = () => {
  return <span>Test Component</span>;
};

ReactDOM.render(<VTableWithWidgetDoc />, document.getElementById('root'));
