import React from 'react';
import { DocsContainer, MainContainer } from './styled';
import { MainSidebar } from './MainSidebar';
import { RiftGate, RiftProvider } from 'rift-router';
import { routes } from '../router';
import './main.css';

export const Main = () => {
  return (
    <DocsContainer>
      <RiftProvider routes={routes}>
        <MainSidebar />
        <MainContainer>
          <div id="center" className="main center">
            <RiftGate />
          </div>
        </MainContainer>
      </RiftProvider>
    </DocsContainer>
  );
};
