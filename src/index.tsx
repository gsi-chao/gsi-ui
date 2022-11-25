import React from 'react';
import { observer } from 'mobx-react';
import { createRoot } from 'react-dom/client';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import {TestMultipleTags} from './docs/TestMultipleTags';

const TestComponent = observer(() => {
  return <TestMultipleTags />; //<>Test Component!!!</>
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<TestComponent />);
