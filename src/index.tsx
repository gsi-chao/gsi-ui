import React, { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';

const TestComponent = () => {
  return <span>Test Component</span>;
};

ReactDOM.render(<TestComponent />, document.getElementById('root'));
