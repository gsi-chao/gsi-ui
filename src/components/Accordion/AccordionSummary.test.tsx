import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { AccordionSummary } from './AccordionSummary';
import { Segment } from 'semantic-ui-react';
import React from 'react';

it('renders without crashing Accordion Summary less properties', () => {
  const div = document.createElement('div');
  const amount = 5;
  ReactDOM.render(
    <AccordionSummary
      iconActive={'plus' as 'plus'}
      iconDeactivate={'minus' as 'minus'}
      title={`Delivery Summary (${amount})`}
    >
      <Segment>
        <p>Hi world it's me from here!!!!!!!!!!</p>
      </Segment>
    </AccordionSummary>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing Accordion Summary All properties', () => {
  const div = document.createElement('div');
  const amount = 5;
  ReactDOM.render(
    <AccordionSummary
      iconActive={'plus' as 'plus'}
      iconDeactivate={'minus' as 'minus'}
      title={`Delivery Summary (${amount})`}
      titleBackgroundColor={'#cbe8ba'}
      titleBorderColor={'#4c7a34'}
    >
      <Segment>
        <p>Hi world it's me from here!!!!!!!!!!</p>
      </Segment>
    </AccordionSummary>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('render correctly Accordion All properties', () => {
  const amount = 5;
  const AccordionTest = renderer
    .create(
      <AccordionSummary
        iconActive={'plus' as 'plus'}
        iconDeactivate={'minus' as 'minus'}
        title={`Delivery Summary (${amount})`}
        titleBackgroundColor={'#cbe8ba'}
        titleBorderColor={'#4c7a34'}
      >
        <Segment>
          <p>Hi world it's me from here!!!!!!!!!!</p>
        </Segment>
      </AccordionSummary>
    )
    .toJSON();
  expect(AccordionTest).toMatchSnapshot();
});

it('render correctly Accordion less properties', () => {
  const amount = 5;
  const AccordionTest = renderer
    .create(
      <AccordionSummary
        iconActive={'plus' as 'plus'}
        iconDeactivate={'minus' as 'minus'}
        title={`Delivery Summary (${amount})`}
      >
        <Segment>
          <p>Hi world it's me from here!!!!!!!!!!</p>
        </Segment>
      </AccordionSummary>
    )
    .toJSON();
  expect(AccordionTest).toMatchSnapshot();
});
