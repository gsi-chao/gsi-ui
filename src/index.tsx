import React from 'react';
import ReactDOM from 'react-dom';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import {VTabsPanel} from './components/'
import CarouselMultiple from './components/Scroll/CarouselMultiple/VCarouselMultiple';
import ItemSC from './components/Scroll/CarouselMultiple/components/Item';

export interface ITabsPanelTypes {
  key: string;
  icon?:  React.ReactNode;
  label?: string;
  content: any;
  textColorBadge?: string;
  backgroundColorBadge?: string;
  dataBadge?: any;
  activeBorderColor?: any;
}

const tabList: ITabsPanelTypes[] = [
  {
    label: 'Locations',
    content: <div></div>,
    key: '0',
    icon: <div></div>
  },
  {
    label: 'Driver/Contractor',
    content:<div></div>,
    key: '1',
    icon: <div></div>
  },
  {
    label: 'Truck/Trailer',
    content: <div></div>,
    key: '2',
    icon: <div></div>
  },
  {
    label: 'Account',
    content:<div></div>,
    key: '3',
    icon: (
      <div></div>
    )
  },
  {
    label: 'Hierarchy',
    content: <div></div>,
    key: '4',
    icon: <div></div>
  },
  {
    label: 'Administration',
    content: <div></div>,
    key: '5',
    icon: <div></div>
  },
  {
    label: 'Definitions',
    content: <div></div>,
    key: '6',
    icon: <div></div>
  }
];
const TestComponent = () => {
  return <div>Test Component!!
    <div>
      <VTabsPanel
        size={'normal'}
        padding={'10px'}
        tabList={tabList}
        activeColor={'#E3E4E2'}
        active={'0'}
        handleChange={() => {}}
      />
    </div>
    <div>
      <CarouselMultiple>
        {tabList.map(movie => (
          <ItemSC className='item'>{movie.label}</ItemSC>
        ))}
      </CarouselMultiple>
    </div>
  </div>;
};

ReactDOM.render(<TestComponent />, document.getElementById('root'));
