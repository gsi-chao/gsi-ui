import React from 'react';

export const MainHeader = () => {
  return (
    <React.Fragment>
      <div className="header" />
      <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
      <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
        <div className="spinner diagonal part-1" />
        <div className="spinner horizontal" />
        <div className="spinner diagonal part-2" />
      </label>

    </React.Fragment>
  );
};
