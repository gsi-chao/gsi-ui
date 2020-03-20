import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';

const TestComponent = observer(() => {

  return (
    <>
      Test Component!!!
    </>
  );
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
