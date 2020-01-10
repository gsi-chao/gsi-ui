import React from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { observer } from 'mobx-react-lite';
import { SelectUnselectItems } from './components/SelectItems';

const TestComponent = observer(() => {
  return (
    <>
      <SelectUnselectItems
        handleSave={(list: any[]) => {console.log(list)}}
        handleCancel={() => {}}
        itemsUnassigned={[
          { value: `1`, text: 'primero' },
          { value: `2`, text: 'segundo' },
          { value: `3`, text: 'tercero' },
          { value: `4`, text: 'cuarto' },
          { value: `5`, text: 'quinto' },
          { value: `6`, text: 'sexto' }
        ]}
        itemsAssigned={[]}
        enableSelectedOrdering

      />
    </>
  );
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
