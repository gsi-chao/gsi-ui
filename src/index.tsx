import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import { VCustomDateTimePicker, VDateRangePicker } from './components';
import { DateRange } from '@blueprintjs/datetime';
import { FieldState } from 'formstate';
import moment from 'moment';

const TestComponent = observer(() => {
  return (
    <>
      <VCustomDateTimePicker
        dateType={'DATETIME'}
        id={'asdasd'}
        autoComplete={'off'}
        format={'MM/DD/YYYY'}
        fieldState={
          new FieldState<DateRange>([
            moment().toDate(),
            moment()
              .add(1, 'week')
              .toDate()
          ])
        }
      />
    </>
  );
});

ReactDOM.render(<TestComponent />, document.getElementById('root'));
