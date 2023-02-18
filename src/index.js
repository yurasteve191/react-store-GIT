import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import Buyer from './class/Buyer';
import Shop from './class/Shop';

const buyerObj = new Buyer();
const shopObj = new Shop();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App variables={{buyerObj:buyerObj, shopObj:shopObj}}  />
  </React.StrictMode>
);
