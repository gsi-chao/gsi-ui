import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { observer } from 'mobx-react-lite';
import { Button } from '@blueprintjs/core';
import { getFormValue } from './components/Form/utils';
import { FieldState, FormState } from 'formstate';

const TestComponent = observer(() => {
  const [form] = useState<FormState<any>>(
    new FormState({
      one: new FieldState<any>(1),
      two: new FieldState<any>(2),
      three: new FieldState<any>(3)
    })
  );
  return (
    <>
      <Button
        text={'Click Me'}
        onClick={() => {
          console.log(getFormValue(form));
        }}
      />
    </>
  );
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
