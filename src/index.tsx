import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { VDraggableModal } from './components';
import { Button } from '@blueprintjs/core';
import { VDraggableModalProvider } from './components/Dialog/VDraggableModal';
import { GridExample } from './table';

const TestComponent = () => {
  const [visible, setVisible] = useState(false);
  const onOk = useCallback(() => setVisible(true), []);
  const onCancel = useCallback(() => setVisible(false), []);

  return (
    <>
      <Button onClick={onOk}>Open</Button>
      <VDraggableModalProvider>
        <VDraggableModal isOpen={visible} onSave={onOk} onCancel={onCancel}>
          <TestComponent />
          <GridExample />
        </VDraggableModal>
      </VDraggableModalProvider>
    </>
  );
};

ReactDOM.render(<TestComponent />, document.getElementById('root'));
