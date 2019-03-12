import React, { Component } from 'react';
import { VSuspenseLoading } from '../components/SuspenseLoading';

const Table = React.lazy(() => {
  return Promise.all([
    import('./TableWithWidgetDemo'),
    new Promise(resolve => setTimeout(resolve, 3000))
  ]).then(([moduleExports]) => moduleExports);
});

class SuspenseDemo extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div style={{ width: 600 }}>
        <VSuspenseLoading>
          <Table />
        </VSuspenseLoading>
      </div>
    );
  }
}

export default SuspenseDemo;
