import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LicenseManager } from 'ag-grid-enterprise';
const licence = process.env.REACT_APP_AGGRID_LICENCE ? process.env.REACT_APP_AGGRID_LICENCE : '';
LicenseManager.setLicenseKey(licence);
ReactDOM.render(<App />, document.getElementById('root'));
