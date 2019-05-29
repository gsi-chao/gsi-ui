import React, { useState } from 'react';
import { CompanyName, SidebarContainer } from './styled';
import { Collapse, Icon } from '@blueprintjs/core';
import { RiftLink } from 'rift-router';

export const MainSidebar = () => {
  const [state, setState] = useState({
    table: false,
    forms: false
  });
  return (
    <SidebarContainer>
      <div className="header" />
      <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
      <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
        <div className="spinner diagonal part-1" />
        <div className="spinner horizontal" />
        <div className="spinner diagonal part-2" />
      </label>
      <div id="sidebarMenu">
        <ul className="sidebarMenuInner">
          <li>
            <a
              onClick={() =>
                setState({ ...state, ...{ table: !state['table'] } })
              }
            >
              Table
            </a>
            <Collapse isOpen={state['table']}>
              <ul className="sidebarMenuInner">
                <li>
                  <RiftLink to="/table/ag-grid">Ag-Grid</RiftLink>
                </li>
                <li>
                  <RiftLink to="/table/blueprint">Blueprint</RiftLink>
                </li>
                <li>
                  <RiftLink to="/table/blueprint/suspense">
                    Blueprint Suspense
                  </RiftLink>
                </li>
                <li>
                  <RiftLink to="/table/pagination">Pagination</RiftLink>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <a
              onClick={() =>
                setState({ ...state, ...{ forms: !state['forms'] } })
              }
            >
              Forms
            </a>
            <Collapse isOpen={state['forms']}>
              <ul className="sidebarMenuInner">
                <li>
                  <RiftLink to="/forms">Example</RiftLink>
                </li>
                <li>
                  <RiftLink to="/forms/color-picker">Color Picker</RiftLink>
                </li>
                <li>
                  <RiftLink to="/forms/select-unselect">
                    Select Unselect
                  </RiftLink>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <RiftLink to="/tabs-panel">Tabs Panel</RiftLink>
          </li>
          <li>
            <RiftLink to="/toast">Toast</RiftLink>
          </li>
          <li>
            <RiftLink to="/dnd">Drag&Drop</RiftLink>
          </li>
          <li>
            <RiftLink to="/load-progress">Load Progress</RiftLink>
          </li>
          <li>
            <RiftLink to="/carousel">Carousel</RiftLink>
          </li>
          <li>
            <RiftLink to="/hierarchy">Hierarchy</RiftLink>
          </li>
        </ul>
        <CompanyName>
          General Software Inc.
        </CompanyName>
      </div>
    </SidebarContainer>
  );
};
