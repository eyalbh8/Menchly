import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/open-sauce-one/latin-300.css';
import '@fontsource/open-sauce-one/latin-400.css';
import '@fontsource/open-sauce-one/latin-500.css';
import '@fontsource/open-sauce-one/latin-600.css';
import '@fontsource/open-sauce-one/latin-700.css';
import '@fontsource/open-sauce-one/latin-900.css';
import '@fontsource/poppins/latin-500.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-700.css';
import App from './App.jsx';
import './index.css';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
