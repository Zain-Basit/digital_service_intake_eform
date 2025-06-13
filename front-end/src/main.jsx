import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';

import { defineCustomElements } from '@ongov/ontario-design-system-component-library/loader';
defineCustomElements(window);

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);
