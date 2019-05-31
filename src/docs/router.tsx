import React from 'react';
import { IRiftRoute } from 'rift-router';
import AgGridDemo from '../demo/AgGridDemo';
import { VBlueprintTable } from './components/table/VBlueprint';
import PaginatorDemo from '../demo/PaginatorDemo';
import InputsDemo from '../demo/InputsDemo';
import TabsPanelDemo from '../demo/TabsPanelDemo';
import ColorPickerDemo from '../demo/ColorPickerDemo';
import NotificationToastDemo from '../demo/NotificationToastDemo';
import DNDDemo from '../demo/DNDDemo';
import SuspenseDemo from '../demo/SuspenseDemo';
import VLoadProgressTaskDemo from '../demo/VLoadProgressTaskDemo';
import { VOrgChartDemo } from '../demo/VOrgChartDemo';
import { VCarouselDemo } from '../demo/VCarouselDemo';
import { VSelectUnselectItemsDemo } from '../demo/SelectUnselectItemsDemo';

export const routes: IRiftRoute[] = [
  {
    component: () => '',
    onEnter: () => '/table/ag-grid',
    path: '*'
  },
  { path: '/table/ag-grid', component: <AgGridDemo/> },
  { path: '/table/blueprint', component: <VBlueprintTable/> },
  { path: '/table/blueprint/suspense', component: <SuspenseDemo /> },
  { path: '/table/pagination', component: <PaginatorDemo />},
  { path: '/forms', component: () => <InputsDemo /> },
  { path: '/forms/color-picker', component: () => <ColorPickerDemo /> },
  { path: '/forms/select-unselect', component: () => <VSelectUnselectItemsDemo /> },
  { path: '/tabs-panel', component: () => <TabsPanelDemo /> },
  { path: '/toast', component: () => <NotificationToastDemo /> },
  { path: '/dnd', component: () => <DNDDemo /> },
  { path: '/load-progress', component: () => <VLoadProgressTaskDemo /> },
  { path: '/hierarchy', component: () => <VOrgChartDemo /> },
  { path: '/carousel', component: () => <VCarouselDemo /> },
];